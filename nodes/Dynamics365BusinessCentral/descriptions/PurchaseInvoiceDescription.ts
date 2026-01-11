/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const purchaseInvoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new purchase invoice',
				action: 'Create a purchase invoice',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line item to a purchase invoice',
				action: 'Create a purchase invoice line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a draft purchase invoice',
				action: 'Delete a purchase invoice',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Delete a purchase invoice line',
				action: 'Delete a purchase invoice line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a purchase invoice by ID',
				action: 'Get a purchase invoice',
			},
			{
				name: 'Get Lines',
				value: 'getLines',
				description: 'Get line items for a purchase invoice',
				action: 'Get purchase invoice lines',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many purchase invoices',
				action: 'Get many purchase invoices',
			},
			{
				name: 'Post',
				value: 'post',
				description: 'Post a draft purchase invoice',
				action: 'Post a purchase invoice',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a purchase invoice',
				action: 'Update a purchase invoice',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a purchase invoice line',
				action: 'Update a purchase invoice line',
			},
		],
		default: 'getAll',
	},
];

export const purchaseInvoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         purchaseInvoice: create
	// ----------------------------------
	{
		displayName: 'Vendor ID',
		name: 'vendorId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
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
				resource: ['purchaseInvoice'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the invoice',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice due date',
			},
			{
				displayName: 'Invoice Date',
				name: 'invoiceDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice date',
			},
			{
				displayName: 'Pay-To Name',
				name: 'payToName',
				type: 'string',
				default: '',
				description: 'Pay-to vendor name',
			},
			{
				displayName: 'Payment Terms ID',
				name: 'paymentTermsId',
				type: 'string',
				default: '',
				description: 'Payment terms ID',
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
				displayName: 'Vendor Invoice Number',
				name: 'vendorInvoiceNumber',
				type: 'string',
				default: '',
				description: 'Vendor invoice number',
			},
		],
	},

	// ----------------------------------
	//         purchaseInvoice: get, delete, update, getLines, etc.
	// ----------------------------------
	{
		displayName: 'Purchase Invoice ID',
		name: 'purchaseInvoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
				operation: ['get', 'delete', 'update', 'getLines', 'createLine', 'post'],
			},
		},
		description: 'The ID of the purchase invoice (GUID)',
	},

	// ----------------------------------
	//         purchaseInvoice: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
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
				resource: ['purchaseInvoice'],
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
				resource: ['purchaseInvoice'],
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
				displayName: 'Invoice Date From',
				name: 'invoiceDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices from this date',
			},
			{
				displayName: 'Invoice Date To',
				name: 'invoiceDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter invoices to this date',
			},
			{
				displayName: 'Status',
				name: 'status',
				type: 'options',
				options: [
					{ name: 'Draft', value: 'Draft' },
					{ name: 'Open', value: 'Open' },
					{ name: 'Paid', value: 'Paid' },
				],
				default: 'Open',
				description: 'Filter by invoice status',
			},
			{
				displayName: 'Vendor ID',
				name: 'vendorId',
				type: 'string',
				default: '',
				description: 'Filter by vendor ID',
			},
			{
				displayName: 'Vendor Invoice Number',
				name: 'vendorInvoiceNumber',
				type: 'string',
				default: '',
				description: 'Filter by vendor invoice number',
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
				resource: ['purchaseInvoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand Lines',
				name: 'expandLines',
				type: 'boolean',
				default: false,
				description: 'Whether to include purchase invoice lines in the response',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'Field to sort by',
				placeholder: 'invoiceDate desc',
			},
		],
	},

	// ----------------------------------
	//         purchaseInvoice: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Currency code for the invoice',
			},
			{
				displayName: 'Due Date',
				name: 'dueDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice due date',
			},
			{
				displayName: 'Invoice Date',
				name: 'invoiceDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice date',
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
				displayName: 'Vendor Invoice Number',
				name: 'vendorInvoiceNumber',
				type: 'string',
				default: '',
				description: 'Vendor invoice number',
			},
		],
	},

	// ----------------------------------
	//         purchaseInvoice: createLine
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
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
				resource: ['purchaseInvoice'],
				operation: ['createLine'],
			},
		},
		description: 'Quantity to invoice',
	},
	{
		displayName: 'Line Additional Fields',
		name: 'lineAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
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
	//         purchaseInvoice: updateLine, deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		description: 'The ID of the purchase invoice line (GUID)',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['purchaseInvoice'],
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
				description: 'Quantity to invoice',
			},
		],
	},
];
