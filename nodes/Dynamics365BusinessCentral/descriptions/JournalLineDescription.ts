/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const journalLineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['journalLine'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new journal line',
				action: 'Create a journal line',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a journal line',
				action: 'Delete a journal line',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a journal line by ID',
				action: 'Get a journal line',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many journal lines',
				action: 'Get many journal lines',
			},
			{
				name: 'Post',
				value: 'post',
				description: 'Post a journal batch',
				action: 'Post a journal',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a journal line',
				action: 'Update a journal line',
			},
		],
		default: 'getAll',
	},
];

export const journalLineFields: INodeProperties[] = [
	// ----------------------------------
	//         journalLine: create
	// ----------------------------------
	{
		displayName: 'Journal Name',
		name: 'journalDisplayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create', 'getAll', 'post'],
			},
		},
		description: 'The display name of the journal batch',
	},
	{
		displayName: 'Account Type',
		name: 'accountType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Bank Account', value: 'Bank Account' },
			{ name: 'Customer', value: 'Customer' },
			{ name: 'Employee', value: 'Employee' },
			{ name: 'G/L Account', value: 'G/L Account' },
			{ name: 'Vendor', value: 'Vendor' },
		],
		default: 'G/L Account',
		description: 'The type of account for this journal line',
	},
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create'],
			},
		},
		description: 'The ID of the account (GUID)',
	},
	{
		displayName: 'Posting Date',
		name: 'postingDate',
		type: 'dateTime',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create'],
			},
		},
		description: 'The posting date for the journal entry',
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create'],
			},
		},
		description: 'The amount for this journal line (positive for debit, negative for credit)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Bal. Account ID',
				name: 'balAccountId',
				type: 'string',
				default: '',
				description: 'The ID of the balancing account (GUID)',
			},
			{
				displayName: 'Bal. Account Type',
				name: 'balAccountType',
				type: 'options',
				options: [
					{ name: 'Bank Account', value: 'Bank Account' },
					{ name: 'Customer', value: 'Customer' },
					{ name: 'Employee', value: 'Employee' },
					{ name: 'G/L Account', value: 'G/L Account' },
					{ name: 'Vendor', value: 'Vendor' },
				],
				default: 'G/L Account',
				description: 'The type of balancing account',
			},
			{
				displayName: 'Comment',
				name: 'comment',
				type: 'string',
				default: '',
				description: 'Additional comment for the journal line',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the journal entry',
			},
			{
				displayName: 'Document Number',
				name: 'documentNumber',
				type: 'string',
				default: '',
				description: 'The document number for this entry',
			},
			{
				displayName: 'Document Type',
				name: 'documentType',
				type: 'options',
				options: [
					{ name: 'Blank', value: ' ' },
					{ name: 'Credit Memo', value: 'Credit Memo' },
					{ name: 'Finance Charge Memo', value: 'Finance Charge Memo' },
					{ name: 'Invoice', value: 'Invoice' },
					{ name: 'Payment', value: 'Payment' },
					{ name: 'Refund', value: 'Refund' },
					{ name: 'Reminder', value: 'Reminder' },
				],
				default: ' ',
				description: 'The document type',
			},
			{
				displayName: 'External Document Number',
				name: 'externalDocumentNumber',
				type: 'string',
				default: '',
				description: 'External document reference number',
			},
		],
	},

	// ----------------------------------
	//         journalLine: get
	// ----------------------------------
	{
		displayName: 'Journal Line ID',
		name: 'journalLineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['get', 'delete'],
			},
		},
		description: 'The ID of the journal line (GUID)',
	},

	// ----------------------------------
	//         journalLine: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['journalLine'],
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
				resource: ['journalLine'],
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
				resource: ['journalLine'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'Bank Account', value: 'Bank Account' },
					{ name: 'Customer', value: 'Customer' },
					{ name: 'Employee', value: 'Employee' },
					{ name: 'G/L Account', value: 'G/L Account' },
					{ name: 'Vendor', value: 'Vendor' },
				],
				default: 'G/L Account',
				description: 'Filter by account type',
			},
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				description: 'Custom OData filter expression',
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
				description: 'Filter lines from this posting date',
			},
			{
				displayName: 'Posting Date To',
				name: 'postingDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter lines to this posting date',
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
				resource: ['journalLine'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Account ID', value: 'accountId' },
					{ name: 'Account Number', value: 'accountNumber' },
					{ name: 'Account Type', value: 'accountType' },
					{ name: 'Amount', value: 'amount' },
					{ name: 'Description', value: 'description' },
					{ name: 'Document Number', value: 'documentNumber' },
					{ name: 'Document Type', value: 'documentType' },
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
				placeholder: 'lineNumber asc',
			},
		],
	},

	// ----------------------------------
	//         journalLine: update
	// ----------------------------------
	{
		displayName: 'Journal Line ID',
		name: 'journalLineId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['update'],
			},
		},
		description: 'The ID of the journal line to update (GUID)',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['journalLine'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Account ID',
				name: 'accountId',
				type: 'string',
				default: '',
				description: 'The ID of the account (GUID)',
			},
			{
				displayName: 'Account Type',
				name: 'accountType',
				type: 'options',
				options: [
					{ name: 'Bank Account', value: 'Bank Account' },
					{ name: 'Customer', value: 'Customer' },
					{ name: 'Employee', value: 'Employee' },
					{ name: 'G/L Account', value: 'G/L Account' },
					{ name: 'Vendor', value: 'Vendor' },
				],
				default: 'G/L Account',
				description: 'The type of account',
			},
			{
				displayName: 'Amount',
				name: 'amount',
				type: 'number',
				default: 0,
				description: 'The amount for this journal line',
			},
			{
				displayName: 'Bal. Account ID',
				name: 'balAccountId',
				type: 'string',
				default: '',
				description: 'The ID of the balancing account (GUID)',
			},
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Description of the journal entry',
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
				description: 'The posting date for the journal entry',
			},
		],
	},
];
