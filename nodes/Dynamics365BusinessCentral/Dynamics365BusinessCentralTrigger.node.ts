/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IHookFunctions,
	IWebhookFunctions,
	IDataObject,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';

import { businessCentralApiRequest, logLicenseNotice } from './GenericFunctions';

// Log license notice once on module load
logLicenseNotice();

function getResourceFromEvent(event: string): string {
	const [resource] = event.split('.');
	const resourceMap: { [key: string]: string } = {
		customer: 'customers',
		vendor: 'vendors',
		item: 'items',
		salesOrder: 'salesOrders',
		salesInvoice: 'salesInvoices',
		purchaseOrder: 'purchaseOrders',
		purchaseInvoice: 'purchaseInvoices',
		payment: 'customerPayments',
	};
	return resourceMap[resource] || resource;
}

function getChangeTypesFromEvent(event: string): string {
	const [, action] = event.split('.');
	const actionMap: { [key: string]: string } = {
		created: 'created',
		updated: 'updated',
		deleted: 'deleted',
		posted: 'updated',
	};
	return actionMap[action] || 'updated';
}

async function getCompanyIdFromCredentials(context: IHookFunctions | IWebhookFunctions): Promise<string> {
	const credentials = await context.getCredentials('dynamics365BusinessCentralOAuth2Api');
	if (credentials.companyId) {
		return credentials.companyId as string;
	}
	throw new Error('Company ID is required. Please specify it in the credentials.');
}

export class Dynamics365BusinessCentralTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dynamics 365 Business Central Trigger',
		name: 'dynamics365BusinessCentralTrigger',
		icon: 'file:dynamics365bc.svg',
		group: ['trigger'],
		version: 1,
		subtitle: '={{$parameter["event"]}}',
		description: 'Listens for Business Central webhook events',
		defaults: {
			name: 'Dynamics 365 BC Trigger',
		},
		inputs: [],
		outputs: ['main'],
		credentials: [
			{
				name: 'dynamics365BusinessCentralOAuth2Api',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		properties: [
			{
				displayName: 'Event',
				name: 'event',
				type: 'options',
				required: true,
				default: 'customer.created',
				options: [
					{
						name: 'Customer - Created',
						value: 'customer.created',
						description: 'Triggered when a new customer is created',
					},
					{
						name: 'Customer - Deleted',
						value: 'customer.deleted',
						description: 'Triggered when a customer is deleted',
					},
					{
						name: 'Customer - Updated',
						value: 'customer.updated',
						description: 'Triggered when a customer is modified',
					},
					{
						name: 'Item - Created',
						value: 'item.created',
						description: 'Triggered when a new item is created',
					},
					{
						name: 'Item - Updated',
						value: 'item.updated',
						description: 'Triggered when an item is modified',
					},
					{
						name: 'Payment - Created',
						value: 'payment.created',
						description: 'Triggered when a payment is created',
					},
					{
						name: 'Purchase Invoice - Created',
						value: 'purchaseInvoice.created',
						description: 'Triggered when a purchase invoice is created',
					},
					{
						name: 'Purchase Order - Created',
						value: 'purchaseOrder.created',
						description: 'Triggered when a purchase order is created',
					},
					{
						name: 'Sales Invoice - Created',
						value: 'salesInvoice.created',
						description: 'Triggered when a sales invoice is created',
					},
					{
						name: 'Sales Invoice - Posted',
						value: 'salesInvoice.posted',
						description: 'Triggered when a sales invoice is posted',
					},
					{
						name: 'Sales Order - Created',
						value: 'salesOrder.created',
						description: 'Triggered when a sales order is created',
					},
					{
						name: 'Sales Order - Updated',
						value: 'salesOrder.updated',
						description: 'Triggered when a sales order is modified',
					},
					{
						name: 'Vendor - Created',
						value: 'vendor.created',
						description: 'Triggered when a new vendor is created',
					},
					{
						name: 'Vendor - Updated',
						value: 'vendor.updated',
						description: 'Triggered when a vendor is modified',
					},
				],
			},
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Client State',
						name: 'clientState',
						type: 'string',
						default: '',
						description: 'A secret value included in webhook notifications for validation',
					},
					{
						displayName: 'Fetch Full Record',
						name: 'fetchFullRecord',
						type: 'boolean',
						default: true,
						description: 'Whether to fetch the full record details when a webhook is received',
					},
				],
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const event = this.getNodeParameter('event') as string;
				const companyId = await getCompanyIdFromCredentials(this);

				try {
					const response = await businessCentralApiRequest.call(
						this,
						'GET',
						`/companies(${companyId})/subscriptions`,
					) as IDataObject;

					const subscriptions = (response.value as IDataObject[]) || [];
					const resource = getResourceFromEvent(event);

					for (const subscription of subscriptions) {
						if (
							subscription.notificationUrl === webhookUrl &&
							(subscription.resource as string).includes(resource)
						) {
							// Store subscription ID for later deletion
							const webhookData = this.getWorkflowStaticData('node');
							webhookData.subscriptionId = subscription.subscriptionId;
							return true;
						}
					}

					return false;
				} catch {
					return false;
				}
			},

			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default') as string;
				const event = this.getNodeParameter('event') as string;
				const options = this.getNodeParameter('options', {}) as IDataObject;
				const companyId = await getCompanyIdFromCredentials(this);

				const resource = getResourceFromEvent(event);
				const changeTypes = getChangeTypesFromEvent(event);

				const body: IDataObject = {
					notificationUrl: webhookUrl,
					resource: `/companies(${companyId})/${resource}`,
					changeType: changeTypes,
				};

				if (options.clientState) {
					body.clientState = options.clientState;
				}

				try {
					const response = await businessCentralApiRequest.call(
						this,
						'POST',
						'/subscriptions',
						body,
					) as IDataObject;

					const webhookData = this.getWorkflowStaticData('node');
					webhookData.subscriptionId = response.subscriptionId;

					return true;
				} catch {
					return false;
				}
			},

			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const subscriptionId = webhookData.subscriptionId as string;

				if (!subscriptionId) {
					return true;
				}

				try {
					await businessCentralApiRequest.call(
						this,
						'DELETE',
						`/subscriptions('${subscriptionId}')`,
					);
				} catch {
					return false;
				}

				delete webhookData.subscriptionId;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;
		const options = this.getNodeParameter('options', {}) as IDataObject;

		// Handle validation request from Business Central
		if (bodyData.validationToken) {
			return {
				webhookResponse: bodyData.validationToken as string,
			};
		}

		// Process webhook notifications
		const notifications = (bodyData.value as IDataObject[]) || [bodyData];
		const returnData: IDataObject[] = [];

		for (const notification of notifications) {
			// Validate client state if configured
			if (options.clientState && notification.clientState !== options.clientState) {
				continue;
			}

			let data: IDataObject = notification;

			// Fetch full record if option is enabled
			if (options.fetchFullRecord && notification.resource) {
				try {
					const resourcePath = notification.resource as string;
					const fullRecord = await businessCentralApiRequest.call(
						this,
						'GET',
						resourcePath,
					);
					data = {
						...notification,
						record: fullRecord,
					};
				} catch (error) {
					data = {
						...notification,
						fetchError: (error as Error).message,
					};
				}
			}

			returnData.push(data);
		}

		return {
			workflowData: [this.helpers.returnJsonArray(returnData)],
		};
	}
}
