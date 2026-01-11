/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const salesOrderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['salesOrder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new sales order',
				action: 'Create a sales order',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line item to a sales order',
				action: 'Create a sales order line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a sales order',
				action: 'Delete a sales order',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Delete a sales order line',
				action: 'Delete a sales order line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sales order by ID',
				action: 'Get a sales order',
			},
			{
				name: 'Get Invoices',
				value: 'getInvoices',
				description: 'Get invoices related to a sales order',
				action: 'Get related invoices',
			},
			{
				name: 'Get Lines',
				value: 'getLines',
				description: 'Get line items for a sales order',
				action: 'Get sales order lines',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many sales orders',
				action: 'Get many sales orders',
			},
			{
				name: 'Get Shipments',
				value: 'getShipments',
				description: 'Get shipments related to a sales order',
				action: 'Get related shipments',
			},
			{
				name: 'Ship and Invoice',
				value: 'shipAndInvoice',
				description: 'Ship and invoice a sales order',
				action: 'Ship and invoice',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sales order',
				action: 'Update a sales order',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a sales order line',
				action: 'Update a sales order line',
			},
		],
		default: 'getAll',
	},
];

export const salesOrderFields: INodeProperties[] = [
	// ----------------------------------
	//         salesOrder: create
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['create'],
			},
		},
		description: 'The ID of the customer (GUID)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Bill-To Name',
				name: 'billToName',
				type: 'string',
				default: '',
				description: 'Bill-to customer name',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the order',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External reference number',
			},
			{
				displayName: 'Order Date',
				name: 'orderDate',
				type: 'dateTime',
				default: '',
				description: 'Order date',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'Posting date',
			},
			{
				displayName: 'Requested Delivery Date',
				name: 'requestedDeliveryDate',
				type: 'dateTime',
				default: '',
				description: 'Requested delivery date',
			},
			{
				displayName: 'Salesperson Code',
				name: 'salespersonCode',
				type: 'string',
				default: '',
				description: 'Salesperson code',
			},
			{
				displayName: 'Ship-To Address City',
				name: 'shipToCity',
				type: 'string',
				default: '',
				description: 'Ship-to city',
			},
			{
				displayName: 'Ship-To Address Country',
				name: 'shipToCountry',
				type: 'string',
				default: '',
				description: 'Ship-to country code',
			},
			{
				displayName: 'Ship-To Address Postal Code',
				name: 'shipToPostCode',
				type: 'string',
				default: '',
				description: 'Ship-to postal code',
			},
			{
				displayName: 'Ship-To Address State',
				name: 'shipToState',
				type: 'string',
				default: '',
				description: 'Ship-to state',
			},
			{
				displayName: 'Ship-To Address Street',
				name: 'shipToAddressLine1',
				type: 'string',
				default: '',
				description: 'Ship-to street address',
			},
			{
				displayName: 'Ship-To Contact',
				name: 'shipToContact',
				type: 'string',
				default: '',
				description: 'Ship-to contact name',
			},
			{
				displayName: 'Ship-To Name',
				name: 'shipToName',
				type: 'string',
				default: '',
				description: 'Ship-to name',
			},
		],
	},

	// ----------------------------------
	//         salesOrder: get, delete, update, getLines, etc.
	// ----------------------------------
	{
		displayName: 'Sales Order ID',
		name: 'salesOrderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['get', 'delete', 'update', 'getLines', 'createLine', 'getShipments', 'getInvoices', 'shipAndInvoice'],
			},
		},
		description: 'The ID of the sales order (GUID)',
	},

	// ----------------------------------
	//         salesOrder: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 1000,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				description: 'Custom OData filter expression',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'Filter by customer ID',
			},
			{
				displayName: 'Customer Number',
				name: 'customerNumber',
				type: 'string',
				default: '',
				description: 'Filter by customer number',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'Filter by external document number',
			},
			{
				displayName: 'Order Date From',
				name: 'orderDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter orders from this date',
			},
			{
				displayName: 'Order Date To',
				name: 'orderDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter orders to this date',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'Draft' },
					{ name: 'Open', value: 'Open' },
					{ name: 'Pending Approval', value: 'Pending Approval' },
					{ name: 'Released', value: 'Released' },
				],
				default: 'Open',
				description: 'Filter by order status',
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand Lines',
				name: 'expandLines',
				type: 'boolean',
				default: false,
				description: 'Whether to include sales order lines in the response',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'Field to sort by',
				placeholder: 'orderDate desc',
			},
		],
	},

	// ----------------------------------
	//         salesOrder: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Bill-To Name',
				name: 'billToName',
				type: 'string',
				default: '',
				description: 'Bill-to customer name',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the order',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External reference number',
			},
			{
				displayName: 'Order Date',
				name: 'orderDate',
				type: 'dateTime',
				default: '',
				description: 'Order date',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'Posting date',
			},
			{
				displayName: 'Requested Delivery Date',
				name: 'requestedDeliveryDate',
				type: 'dateTime',
				default: '',
				description: 'Requested delivery date',
			},
			{
				displayName: 'Salesperson Code',
				name: 'salespersonCode',
				type: 'string',
				default: '',
				description: 'Salesperson code',
			},
			{
				displayName: 'Ship-To Name',
				name: 'shipToName',
				type: 'string',
				default: '',
				description: 'Ship-to name',
			},
		],
	},

	// ----------------------------------
	//         salesOrder: createLine
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['createLine'],
			},
		},
		description: 'The ID of the item (GUID)',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['createLine'],
			},
		},
		description: 'Quantity to order',
	},
	{
		displayName: 'Line Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['createLine'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
			{
				displayName: 'Discount Percent',
				name: 'discountPercent',
				type: 'number',
				default: 0,
				description: 'Discount percentage',
			},
			{
				displayName: 'Line Type',
				name: 'lineType',
				type: 'options',
				options: [
					{ name: 'Account', value: 'Account' },
					{ name: 'Charge', value: 'Charge' },
					{ name: 'Comment', value: 'Comment' },
					{ name: 'Fixed Asset', value: 'Fixed Asset' },
					{ name: 'Item', value: 'Item' },
					{ name: 'Resource', value: 'Resource' },
				],
				default: 'Item',
				description: 'Type of line',
			},
			{
				displayName: 'Tax Code',
				name: 'taxCode',
				type: 'string',
				default: '',
				description: 'Tax code for the line',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				default: 0,
				description: 'Unit price (overrides item price)',
			},
		],
	},

	// ----------------------------------
	//         salesOrder: updateLine, deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		description: 'The ID of the sales order line (GUID)',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesOrder'],
				operation: ['updateLine'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Line description',
			},
			{
				displayName: 'Discount Percent',
				name: 'discountPercent',
				type: 'number',
				default: 0,
				description: 'Discount percentage',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
				description: 'Quantity to order',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				default: 0,
				description: 'Unit price',
			},
		],
	},
];
