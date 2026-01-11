/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const salesInvoiceOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new sales invoice',
				action: 'Create a sales invoice',
			},
			{
				name: 'Create Line',
				value: 'createLine',
				description: 'Add a line item to a sales invoice',
				action: 'Create a sales invoice line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a draft sales invoice',
				action: 'Delete a sales invoice',
			},
			{
				name: 'Delete Line',
				value: 'deleteLine',
				description: 'Delete a sales invoice line',
				action: 'Delete a sales invoice line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a sales invoice by ID',
				action: 'Get a sales invoice',
			},
			{
				name: 'Get Lines',
				value: 'getLines',
				description: 'Get line items for a sales invoice',
				action: 'Get sales invoice lines',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many sales invoices',
				action: 'Get many sales invoices',
			},
			{
				name: 'Get PDF',
				value: 'getPdf',
				description: 'Get sales invoice as PDF',
				action: 'Get invoice PDF',
			},
			{
				name: 'Post',
				value: 'post',
				description: 'Post a draft sales invoice',
				action: 'Post a sales invoice',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send sales invoice via email',
				action: 'Send sales invoice',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a sales invoice',
				action: 'Update a sales invoice',
			},
			{
				name: 'Update Line',
				value: 'updateLine',
				description: 'Update a sales invoice line',
				action: 'Update a sales invoice line',
			},
		],
		default: 'getAll',
	},
];

export const salesInvoiceFields: INodeProperties[] = [
	// ----------------------------------
	//         salesInvoice: create
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
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
				resource: ['salesInvoice'],
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
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External reference number',
			},
			{
				displayName: 'Invoice Date',
				name: 'invoiceDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice date',
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
	//         salesInvoice: get, delete, update, getLines, etc.
	// ----------------------------------
	{
		displayName: 'Sales Invoice ID',
		name: 'salesInvoiceId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
				operation: ['get', 'delete', 'update', 'getLines', 'createLine', 'post', 'send', 'getPdf'],
			},
		},
		description: 'The ID of the sales invoice (GUID)',
	},

	// ----------------------------------
	//         salesInvoice: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
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
				resource: ['salesInvoice'],
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
				resource: ['salesInvoice'],
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
					{ name: 'Canceled', value: 'Canceled' },
					{ name: 'Corrective', value: 'Corrective' },
					{ name: 'Draft', value: 'Draft' },
					{ name: 'Open', value: 'Open' },
					{ name: 'Paid', value: 'Paid' },
				],
				default: 'Open',
				description: 'Filter by invoice status',
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
				resource: ['salesInvoice'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Expand Lines',
				name: 'expandLines',
				type: 'boolean',
				default: false,
				description: 'Whether to include sales invoice lines in the response',
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
	//         salesInvoice: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
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
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External reference number',
			},
			{
				displayName: 'Invoice Date',
				name: 'invoiceDate',
				type: 'dateTime',
				default: '',
				description: 'Invoice date',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'Posting date',
			},
			{
				displayName: 'Salesperson Code',
				name: 'salespersonCode',
				type: 'string',
				default: '',
				description: 'Salesperson code',
			},
		],
	},

	// ----------------------------------
	//         salesInvoice: createLine
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
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
				resource: ['salesInvoice'],
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
				resource: ['salesInvoice'],
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
	//         salesInvoice: updateLine, deleteLine
	// ----------------------------------
	{
		displayName: 'Line ID',
		name: 'lineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
				operation: ['updateLine', 'deleteLine'],
			},
		},
		description: 'The ID of the sales invoice line (GUID)',
	},
	{
		displayName: 'Line Update Fields',
		name: 'lineUpdateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['salesInvoice'],
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
				description: 'Quantity to invoice',
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
