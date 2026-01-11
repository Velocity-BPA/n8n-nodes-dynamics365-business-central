/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import {
	businessCentralApiRequest,
	businessCentralApiRequestAllItems,
	buildODataQuery,
	getCompanyId,
	formatDate,
	logLicenseNotice,
} from './GenericFunctions';

import {
	customerOperations,
	customerFields,
} from './descriptions/CustomerDescription';
import {
	salesOrderOperations,
	salesOrderFields,
} from './descriptions/SalesOrderDescription';
import {
	itemOperations,
	itemFields,
} from './descriptions/ItemDescription';
import {
	salesInvoiceOperations,
	salesInvoiceFields,
} from './descriptions/SalesInvoiceDescription';
import {
	vendorOperations,
	vendorFields,
} from './descriptions/VendorDescription';
import {
	purchaseOrderOperations,
	purchaseOrderFields,
} from './descriptions/PurchaseOrderDescription';
import {
	purchaseInvoiceOperations,
	purchaseInvoiceFields,
} from './descriptions/PurchaseInvoiceDescription';
import {
	generalLedgerEntryOperations,
	generalLedgerEntryFields,
} from './descriptions/GeneralLedgerEntryDescription';
import {
	journalLineOperations,
	journalLineFields,
} from './descriptions/JournalLineDescription';
import {
	paymentOperations,
	paymentFields,
} from './descriptions/PaymentDescription';
import {
	companyOperations,
	companyFields,
} from './descriptions/CompanyDescription';
import {
	dimensionOperations,
	dimensionFields,
} from './descriptions/DimensionDescription';

// Log license notice once on module load
logLicenseNotice();

export class Dynamics365BusinessCentral implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Dynamics 365 Business Central',
		name: 'dynamics365BusinessCentral',
		icon: 'file:dynamics365bc.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Microsoft Dynamics 365 Business Central API',
		defaults: {
			name: 'Dynamics 365 Business Central',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'dynamics365BusinessCentralOAuth2Api',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{ name: 'Company', value: 'company' },
					{ name: 'Customer', value: 'customer' },
					{ name: 'Dimension', value: 'dimension' },
					{ name: 'General Ledger Entry', value: 'generalLedgerEntry' },
					{ name: 'Item', value: 'item' },
					{ name: 'Journal Line', value: 'journalLine' },
					{ name: 'Payment', value: 'payment' },
					{ name: 'Purchase Invoice', value: 'purchaseInvoice' },
					{ name: 'Purchase Order', value: 'purchaseOrder' },
					{ name: 'Sales Invoice', value: 'salesInvoice' },
					{ name: 'Sales Order', value: 'salesOrder' },
					{ name: 'Vendor', value: 'vendor' },
				],
				default: 'customer',
			},
			// Operations and fields for each resource
			...companyOperations,
			...companyFields,
			...customerOperations,
			...customerFields,
			...dimensionOperations,
			...dimensionFields,
			...generalLedgerEntryOperations,
			...generalLedgerEntryFields,
			...itemOperations,
			...itemFields,
			...journalLineOperations,
			...journalLineFields,
			...paymentOperations,
			...paymentFields,
			...purchaseInvoiceOperations,
			...purchaseInvoiceFields,
			...purchaseOrderOperations,
			...purchaseOrderFields,
			...salesInvoiceOperations,
			...salesInvoiceFields,
			...salesOrderOperations,
			...salesOrderFields,
			...vendorOperations,
			...vendorFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let responseData: IDataObject | IDataObject[] = {};

				// Company resource
				if (resource === 'company') {
					if (operation === 'get') {
						const companyId = this.getNodeParameter('companyId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								'/companies',
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								'/companies',
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					}
				}

				// Customer resource
				else if (resource === 'customer') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const displayName = this.getNodeParameter('displayName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { displayName, ...additionalFields };

						// Handle address fields
						if (additionalFields.addressStreet || additionalFields.addressCity) {
							body.address = {
								street: additionalFields.addressStreet || '',
								city: additionalFields.addressCity || '',
								state: additionalFields.addressState || '',
								countryLetterCode: additionalFields.addressCountry || '',
								postalCode: additionalFields.addressPostalCode || '',
							};
							delete body.addressStreet;
							delete body.addressCity;
							delete body.addressState;
							delete body.addressCountry;
							delete body.addressPostalCode;
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/customers`,
							body,
						);
					} else if (operation === 'get') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customers(${customerId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/customers`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/customers`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						// Get current record for ETag
						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customers(${customerId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/customers(${customerId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/customers(${customerId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getFinancialDetails') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customers(${customerId})/customerFinancialDetails`,
						);
					} else if (operation === 'getDefaultDimensions') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customers(${customerId})/defaultDimensions`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'setDefaultDimension') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const dimensionId = this.getNodeParameter('dimensionId', i) as string;
						const dimensionValueId = this.getNodeParameter('dimensionValueId', i) as string;
						const valuePosting = this.getNodeParameter('valuePosting', i, 'No Posting') as string;

						const body: IDataObject = {
							parentId: customerId,
							dimensionId,
							dimensionValueId,
							postingValidation: valuePosting,
						};

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/customers(${customerId})/defaultDimensions`,
							body,
						);
					} else if (operation === 'getPicture') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customers(${customerId})/picture`,
						);
					} else if (operation === 'updatePicture') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/customers(${customerId})/picture(${customerId})/pictureContent`,
							buffer as unknown as IDataObject,
							{},
							{ 'Content-Type': binaryData.mimeType },
						);
					}
				}

				// Vendor resource
				else if (resource === 'vendor') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const displayName = this.getNodeParameter('displayName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { displayName, ...additionalFields };

						if (additionalFields.addressStreet || additionalFields.addressCity) {
							body.address = {
								street: additionalFields.addressStreet || '',
								city: additionalFields.addressCity || '',
								state: additionalFields.addressState || '',
								countryLetterCode: additionalFields.addressCountry || '',
								postalCode: additionalFields.addressPostalCode || '',
							};
							delete body.addressStreet;
							delete body.addressCity;
							delete body.addressState;
							delete body.addressCountry;
							delete body.addressPostalCode;
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/vendors`,
							body,
						);
					} else if (operation === 'get') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/vendors(${vendorId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/vendors`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/vendors`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/vendors(${vendorId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/vendors(${vendorId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/vendors(${vendorId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getDefaultDimensions') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/vendors(${vendorId})/defaultDimensions`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'getOpenBalance') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const vendor = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/vendors(${vendorId})?$select=balance,balanceDue`,
						) as IDataObject;
						responseData = {
							vendorId,
							balance: vendor.balance,
							balanceDue: vendor.balanceDue,
						};
					} else if (operation === 'getPicture') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/vendors(${vendorId})/picture`,
						);
					} else if (operation === 'updatePicture') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/vendors(${vendorId})/picture(${vendorId})/pictureContent`,
							buffer as unknown as IDataObject,
							{},
							{ 'Content-Type': binaryData.mimeType },
						);
					}
				}

				// Item resource
				else if (resource === 'item') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const displayName = this.getNodeParameter('displayName', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { displayName, ...additionalFields };

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/items`,
							body,
						);
					} else if (operation === 'get') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/items`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/items`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/items(${itemId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/items(${itemId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getDefaultDimensions') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})/defaultDimensions`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'getItemVariants') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})/itemVariants`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'getInventory') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})?$select=id,number,displayName,inventory`,
						);
					} else if (operation === 'getPicture') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/items(${itemId})/picture`,
						);
					} else if (operation === 'updatePicture') {
						const itemId = this.getNodeParameter('itemId', i) as string;
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;

						const binaryData = this.helpers.assertBinaryData(i, binaryPropertyName);
						const buffer = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/items(${itemId})/picture(${itemId})/pictureContent`,
							buffer as unknown as IDataObject,
							{},
							{ 'Content-Type': binaryData.mimeType },
						);
					}
				}

				// Sales Order resource
				else if (resource === 'salesOrder') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { customerId, ...additionalFields };

						if (additionalFields.orderDate) {
							body.orderDate = formatDate(additionalFields.orderDate as string);
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesOrders`,
							body,
						);
					} else if (operation === 'get') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesOrders(${salesOrderId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/salesOrders`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/salesOrders`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesOrders(${salesOrderId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/salesOrders(${salesOrderId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/salesOrders(${salesOrderId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getLines') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesOrders(${salesOrderId})/salesOrderLines`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'createLine') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const lineType = this.getNodeParameter('lineType', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const body: IDataObject = { lineType, ...lineFields };

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesOrders(${salesOrderId})/salesOrderLines`,
							body,
						);
					} else if (operation === 'updateLine') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesOrders(${salesOrderId})/salesOrderLines(${lineId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/salesOrders(${salesOrderId})/salesOrderLines(${lineId})`,
							lineFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'deleteLine') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/salesOrders(${salesOrderId})/salesOrderLines(${lineId})`,
						);
						responseData = { success: true };
					} else if (operation === 'shipAndInvoice') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesOrders(${salesOrderId})/Microsoft.NAV.shipAndInvoice`,
						);
					} else if (operation === 'getShipments') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesShipments?$filter=orderNumber eq '${salesOrderId}'`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'getInvoices') {
						const salesOrderId = this.getNodeParameter('salesOrderId', i) as string;
						const order = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesOrders(${salesOrderId})?$select=number`,
						) as IDataObject;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices?$filter=orderNumber eq '${order.number}'`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					}
				}

				// Sales Invoice resource
				else if (resource === 'salesInvoice') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const customerId = this.getNodeParameter('customerId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { customerId, ...additionalFields };

						if (additionalFields.invoiceDate) {
							body.invoiceDate = formatDate(additionalFields.invoiceDate as string);
						}
						if (additionalFields.dueDate) {
							body.dueDate = formatDate(additionalFields.dueDate as string);
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesInvoices`,
							body,
						);
					} else if (operation === 'get') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/salesInvoices`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/salesInvoices`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getLines') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/salesInvoiceLines`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'createLine') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						const lineType = this.getNodeParameter('lineType', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const body: IDataObject = { lineType, ...lineFields };

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/salesInvoiceLines`,
							body,
						);
					} else if (operation === 'updateLine') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/salesInvoiceLines(${lineId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/salesInvoiceLines(${lineId})`,
							lineFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'deleteLine') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/salesInvoiceLines(${lineId})`,
						);
						responseData = { success: true };
					} else if (operation === 'post') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/Microsoft.NAV.post`,
						);
					} else if (operation === 'send') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/Microsoft.NAV.send`,
						);
					} else if (operation === 'getPdf') {
						const salesInvoiceId = this.getNodeParameter('salesInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/salesInvoices(${salesInvoiceId})/pdfDocument`,
						);
					}
				}

				// Purchase Order resource
				else if (resource === 'purchaseOrder') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { vendorId, ...additionalFields };

						if (additionalFields.orderDate) {
							body.orderDate = formatDate(additionalFields.orderDate as string);
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseOrders`,
							body,
						);
					} else if (operation === 'get') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/purchaseOrders`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/purchaseOrders`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getLines') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'createLine') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						const lineType = this.getNodeParameter('lineType', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const body: IDataObject = { lineType, ...lineFields };

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines`,
							body,
						);
					} else if (operation === 'updateLine') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines(${lineId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines(${lineId})`,
							lineFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'deleteLine') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/purchaseOrderLines(${lineId})`,
						);
						responseData = { success: true };
					} else if (operation === 'receive') {
						const purchaseOrderId = this.getNodeParameter('purchaseOrderId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseOrders(${purchaseOrderId})/Microsoft.NAV.receive`,
						);
					}
				}

				// Purchase Invoice resource
				else if (resource === 'purchaseInvoice') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const vendorId = this.getNodeParameter('vendorId', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = { vendorId, ...additionalFields };

						if (additionalFields.invoiceDate) {
							body.invoiceDate = formatDate(additionalFields.invoiceDate as string);
						}
						if (additionalFields.dueDate) {
							body.dueDate = formatDate(additionalFields.dueDate as string);
						}

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseInvoices`,
							body,
						);
					} else if (operation === 'get') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/purchaseInvoices`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/purchaseInvoices`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})`,
						);
						responseData = { success: true };
					} else if (operation === 'getLines') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/purchaseInvoiceLines`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					} else if (operation === 'createLine') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						const lineType = this.getNodeParameter('lineType', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const body: IDataObject = { lineType, ...lineFields };

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/purchaseInvoiceLines`,
							body,
						);
					} else if (operation === 'updateLine') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						const lineFields = this.getNodeParameter('lineFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/purchaseInvoiceLines(${lineId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/purchaseInvoiceLines(${lineId})`,
							lineFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'deleteLine') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						const lineId = this.getNodeParameter('lineId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/purchaseInvoiceLines(${lineId})`,
						);
						responseData = { success: true };
					} else if (operation === 'post') {
						const purchaseInvoiceId = this.getNodeParameter('purchaseInvoiceId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/purchaseInvoices(${purchaseInvoiceId})/Microsoft.NAV.post`,
						);
					}
				}

				// General Ledger Entry resource
				else if (resource === 'generalLedgerEntry') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'get') {
						const entryId = this.getNodeParameter('entryId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/generalLedgerEntries(${entryId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/generalLedgerEntries`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/generalLedgerEntries`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'getByAccount') {
						const accountId = this.getNodeParameter('accountId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						filters.accountId = accountId;
						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/generalLedgerEntries`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/generalLedgerEntries`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					}
				}

				// Journal Line resource
				else if (resource === 'journalLine') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const journalDisplayName = this.getNodeParameter('journalDisplayName', i) as string;
						const accountType = this.getNodeParameter('accountType', i) as string;
						const accountId = this.getNodeParameter('accountId', i) as string;
						const postingDate = this.getNodeParameter('postingDate', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							journalDisplayName,
							accountType,
							accountId,
							postingDate: formatDate(postingDate),
							amount,
							...additionalFields,
						};

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/journalLines`,
							body,
						);
					} else if (operation === 'get') {
						const journalLineId = this.getNodeParameter('journalLineId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/journalLines(${journalLineId})`,
						);
					} else if (operation === 'getAll') {
						const journalDisplayName = this.getNodeParameter('journalDisplayName', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						filters.journalDisplayName = journalDisplayName;
						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/journalLines`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/journalLines`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const journalLineId = this.getNodeParameter('journalLineId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/journalLines(${journalLineId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/journalLines(${journalLineId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const journalLineId = this.getNodeParameter('journalLineId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/journalLines(${journalLineId})`,
						);
						responseData = { success: true };
					} else if (operation === 'post') {
						const journalDisplayName = this.getNodeParameter('journalDisplayName', i) as string;
						// Get the journal and post it
						const journals = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/journals?$filter=displayName eq '${journalDisplayName}'`,
						) as IDataObject;
						const journalValues = journals.value as IDataObject[];
						if (journalValues && journalValues.length > 0) {
							const journalId = journalValues[0].id;
							responseData = await businessCentralApiRequest.call(
								this,
								'POST',
								`/companies(${companyId})/journals(${journalId})/Microsoft.NAV.post`,
							);
						} else {
							throw new NodeOperationError(this.getNode(), `Journal '${journalDisplayName}' not found`);
						}
					}
				}

				// Payment resource
				else if (resource === 'payment') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'create') {
						const journalDisplayName = this.getNodeParameter('journalDisplayName', i) as string;
						const customerId = this.getNodeParameter('customerId', i) as string;
						const postingDate = this.getNodeParameter('postingDate', i) as string;
						const amount = this.getNodeParameter('amount', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							journalDisplayName,
							customerId,
							postingDate: formatDate(postingDate),
							amount,
							...additionalFields,
						};

						responseData = await businessCentralApiRequest.call(
							this,
							'POST',
							`/companies(${companyId})/customerPayments`,
							body,
						);
					} else if (operation === 'get') {
						const paymentId = this.getNodeParameter('paymentId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customerPayments(${paymentId})`,
						);
					} else if (operation === 'getAll') {
						const journalDisplayName = this.getNodeParameter('journalDisplayName', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						filters.journalDisplayName = journalDisplayName;
						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/customerPayments`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/customerPayments`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'update') {
						const paymentId = this.getNodeParameter('paymentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const current = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customerPayments(${paymentId})`,
						) as IDataObject;

						responseData = await businessCentralApiRequest.call(
							this,
							'PATCH',
							`/companies(${companyId})/customerPayments(${paymentId})`,
							updateFields,
							{},
							{ 'If-Match': current['@odata.etag'] as string },
						);
					} else if (operation === 'delete') {
						const paymentId = this.getNodeParameter('paymentId', i) as string;
						await businessCentralApiRequest.call(
							this,
							'DELETE',
							`/companies(${companyId})/customerPayments(${paymentId})`,
						);
						responseData = { success: true };
					} else if (operation === 'post') {
						const paymentId = this.getNodeParameter('paymentId', i) as string;
						// Get the payment journal and post
						const payment = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customerPayments(${paymentId})`,
						) as IDataObject;
						const journals = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/customerPaymentJournals?$filter=displayName eq '${payment.journalDisplayName}'`,
						) as IDataObject;
						const journalValues = journals.value as IDataObject[];
						if (journalValues && journalValues.length > 0) {
							const journalId = journalValues[0].id;
							responseData = await businessCentralApiRequest.call(
								this,
								'POST',
								`/companies(${companyId})/customerPaymentJournals(${journalId})/Microsoft.NAV.post`,
							);
						} else {
							throw new NodeOperationError(this.getNode(), 'Payment journal not found');
						}
					}
				}

				// Dimension resource
				else if (resource === 'dimension') {
					const companyId = await getCompanyId.call(this);

					if (operation === 'get') {
						const dimensionId = this.getNodeParameter('dimensionId', i) as string;
						responseData = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/dimensions(${dimensionId})`,
						);
					} else if (operation === 'getAll') {
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const filters = this.getNodeParameter('filters', i, {}) as IDataObject;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;

						const query = buildODataQuery(filters, options);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/dimensions`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/dimensions`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'getValues') {
						const dimensionId = this.getNodeParameter('dimensionId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i) as boolean;
						const valueFilters = this.getNodeParameter('valueFilters', i, {}) as IDataObject;
						const valueOptions = this.getNodeParameter('valueOptions', i, {}) as IDataObject;

						const query = buildODataQuery(valueFilters, valueOptions);

						if (returnAll) {
							responseData = await businessCentralApiRequestAllItems.call(
								this,
								'GET',
								`/companies(${companyId})/dimensions(${dimensionId})/dimensionValues`,
								{},
								query,
							);
						} else {
							const limit = this.getNodeParameter('limit', i) as number;
							query.$top = limit;
							const response = await businessCentralApiRequest.call(
								this,
								'GET',
								`/companies(${companyId})/dimensions(${dimensionId})/dimensionValues`,
								{},
								query,
							);
							responseData = (response as IDataObject).value as IDataObject[] || [];
						}
					} else if (operation === 'getDefaultDimensions') {
						const entityType = this.getNodeParameter('entityType', i) as string;
						const entityId = this.getNodeParameter('entityId', i) as string;

						const entityPlural = entityType === 'customer' ? 'customers'
							: entityType === 'vendor' ? 'vendors'
							: entityType === 'item' ? 'items'
							: 'employees';

						const response = await businessCentralApiRequest.call(
							this,
							'GET',
							`/companies(${companyId})/${entityPlural}(${entityId})/defaultDimensions`,
						) as IDataObject;
						responseData = response.value as IDataObject[] || [];
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: (error as Error).message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
