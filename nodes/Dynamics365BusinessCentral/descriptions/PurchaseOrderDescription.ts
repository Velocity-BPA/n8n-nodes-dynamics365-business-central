/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const purchaseOrderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new purchase order',
				action: 'Create a purchase order',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line item to a purchase order',
				action: 'Create a purchase order line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a purchase order',
				action: 'Delete a purchase order',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Delete a purchase order line',
				action: 'Delete a purchase order line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a purchase order by ID',
				action: 'Get a purchase order',
			},
			{
				name: 'Get Lines',
				value: 'getLines',
				description: 'Get line items for a purchase order',
				action: 'Get purchase order lines',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many purchase orders',
				action: 'Get many purchase orders',
			},
			{
				name: 'Receive',
				value: 'receive',
				description: 'Receive items from a purchase order',
				action: 'Receive items',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a purchase order',
				action: 'Update a purchase order',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a purchase order line',
				action: 'Update a purchase order line',
			},
		],
		default: 'getAll',
	},
];

export const purchaseOrderFields: INodeProperties[] = [
	// ----------------------------------
	//         purchaseOrder: create
	// ----------------------------------
	{
		displayName: 'Vendor ID',
		name: 'vendorId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		description: 'The ID of the vendor (GUID)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the order',
			},
			{
				displayName: 'Order Date',
				name: 'orderDate',
				type: 'dateTime',
				default: '',
				description: 'Order date',
			},
			{
				displayName: 'Pay-To Name',
				name: 'payToName',
				type: 'string',
				default: '',
				description: 'Pay-to vendor name',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'Posting date',
			},
			{
				displayName: 'Purchaser Code',
				name: 'purchaserCode',
				type: 'string',
				default: '',
				description: 'Purchaser code',
			},
			{
				displayName: 'Requested Receipt Date',
				name: 'requestedReceiptDate',
				type: 'dateTime',
				default: '',
				description: 'Requested receipt date',
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
			{
				displayName: 'Vendor Invoice Number',
				name: 'vendorInvoiceNumber',
				type: 'string',
				default: '',
				description: 'Vendor invoice number',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder: get, delete, update, getLines, etc.
	// ----------------------------------
	{
		displayName: 'Purchase Order ID',
		name: 'purchaseOrderId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['get', 'delete', 'update', 'getLines', 'createLine', 'receive'],
			},
		},
		description: 'The ID of the purchase order (GUID)',
	},

	// ----------------------------------
	//         purchaseOrder: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
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
			{
				displayName: 'Vendor ID',
				name: 'vendorId',
				type: 'string',
				default: '',
				description: 'Filter by vendor ID',
			},
			{
				displayName: 'Vendor Number',
				name: 'vendorNumber',
				type: 'string',
				default: '',
				description: 'Filter by vendor number',
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
				resource: ['purchaseOrder'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand Lines',
				name: 'expandLines',
				type: 'boolean',
				default: false,
				description: 'Whether to include purchase order lines in the response',
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
	//         purchaseOrder: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the order',
			},
			{
				displayName: 'Order Date',
				name: 'orderDate',
				type: 'dateTime',
				default: '',
				description: 'Order date',
			},
			{
				displayName: 'Pay-To Name',
				name: 'payToName',
				type: 'string',
				default: '',
				description: 'Pay-to vendor name',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'Posting date',
			},
			{
				displayName: 'Purchaser Code',
				name: 'purchaserCode',
				type: 'string',
				default: '',
				description: 'Purchaser code',
			},
			{
				displayName: 'Requested Receipt Date',
				name: 'requestedReceiptDate',
				type: 'dateTime',
				default: '',
				description: 'Requested receipt date',
			},
			{
				displayName: 'Ship-To Name',
				name: 'shipToName',
				type: 'string',
				default: '',
				description: 'Ship-to name',
			},
			{
				displayName: 'Vendor Invoice Number',
				name: 'vendorInvoiceNumber',
				type: 'string',
				default: '',
				description: 'Vendor invoice number',
			},
		],
	},

	// ----------------------------------
	//         purchaseOrder: createLine
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
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
				resource: ['purchaseOrder'],
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
				displayName: 'Direct Unit Cost',
				name: 'directUnitCost',
				type: 'number',
				default: 0,
				description: 'Direct unit cost',
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
		],
	},

	// ----------------------------------
	//         purchaseOrder: updateLine, deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		description: 'The ID of the purchase order line (GUID)',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseOrder'],
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
				displayName: 'Direct Unit Cost',
				name: 'directUnitCost',
				type: 'number',
				default: 0,
				description: 'Direct unit cost',
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
		],
	},
];
