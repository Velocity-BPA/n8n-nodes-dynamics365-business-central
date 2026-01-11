/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const paymentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['payment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer payment',
				action: 'Create a payment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a draft payment',
				action: 'Delete a payment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a payment by ID',
				action: 'Get a payment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many payments',
				action: 'Get many payments',
			},
			{
				name: 'Post',
				value: 'post',
				description: 'Post a payment',
				action: 'Post a payment',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a payment',
				action: 'Update a payment',
			},
		],
		default: 'getAll',
	},
];

export const paymentFields: INodeProperties[] = [
	// ----------------------------------
	//         payment: create
	// ----------------------------------
	{
		displayName: 'Journal Name',
		name: 'journalDisplayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create', 'getAll'],
			},
		},
		description: 'The display name of the payment journal',
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'The ID of the customer (GUID)',
	},
	{
		displayName: 'Posting Date',
		name: 'postingDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		description: 'The posting date for the payment',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		typeOptions: {
			numberPrecision: 2,
		},
		description: 'The payment amount',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Applies to Invoice ID',
				name: 'appliesToInvoiceId',
				type: 'string',
				default: '',
				description: 'The ID of the invoice to apply this payment to (GUID)',
			},
			{
				displayName: 'Applies to Invoice Number',
				name: 'appliesToInvoiceNumber',
				type: 'string',
				default: '',
				description: 'The number of the invoice to apply this payment to',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Additional comment for the payment',
			},
			{
				displayName: 'Contact ID',
				name: 'contactId',
				type: 'string',
				default: '',
				description: 'The ID of the contact associated with this payment',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the payment',
			},
			{
				displayName: 'Document Number',
				name: 'documentNumber',
				type: 'string',
				default: '',
				description: 'The document number for this payment',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External document reference (e.g., check number)',
			},
		],
	},

	// ----------------------------------
	//         payment: get
	// ----------------------------------
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['get', 'delete', 'post'],
			},
		},
		description: 'The ID of the payment (GUID)',
	},

	// ----------------------------------
	//         payment: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['payment'],
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
				resource: ['payment'],
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
				resource: ['payment'],
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
				displayName: 'Document Number',
				name: 'documentNumber',
				type: 'string',
				default: '',
				description: 'Filter by document number',
			},
			{
				displayName: 'Posting Date From',
				name: 'postingDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter payments from this posting date',
			},
			{
				displayName: 'Posting Date To',
				name: 'postingDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter payments to this posting date',
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
				resource: ['payment'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Amount', value: 'amount' },
					{ name: 'Applies To Invoice ID', value: 'appliesToInvoiceId' },
					{ name: 'Applies To Invoice Number', value: 'appliesToInvoiceNumber' },
					{ name: 'Contact ID', value: 'contactId' },
					{ name: 'Customer ID', value: 'customerId' },
					{ name: 'Customer Number', value: 'customerNumber' },
					{ name: 'Description', value: 'description' },
					{ name: 'Document Number', value: 'documentNumber' },
					{ name: 'External Document Number', value: 'externalDocumentNumber' },
					{ name: 'ID', value: 'id' },
					{ name: 'Journal Display Name', value: 'journalDisplayName' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
					{ name: 'Line Number', value: 'lineNumber' },
					{ name: 'Posting Date', value: 'postingDate' },
				],
				default: [],
				description: 'Fields to include in the response',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'Field to sort by',
				placeholder: 'postingDate desc',
			},
		],
	},

	// ----------------------------------
	//         payment: update
	// ----------------------------------
	{
		displayName: 'Payment ID',
		name: 'paymentId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['update'],
			},
		},
		description: 'The ID of the payment to update (GUID)',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['payment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				typeOptions: {
					numberPrecision: 2,
				},
				description: 'The payment amount',
			},
			{
				displayName: 'Applies to Invoice ID',
				name: 'appliesToInvoiceId',
				type: 'string',
				default: '',
				description: 'The ID of the invoice to apply this payment to',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Additional comment',
			},
			{
				displayName: 'Customer ID',
				name: 'customerId',
				type: 'string',
				default: '',
				description: 'The ID of the customer',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the payment',
			},
			{
				displayName: 'Document Number',
				name: 'documentNumber',
				type: 'string',
				default: '',
				description: 'The document number',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External document reference',
			},
			{
				displayName: 'Posting Date',
				name: 'postingDate',
				type: 'dateTime',
				default: '',
				description: 'The posting date for the payment',
			},
		],
	},
];
