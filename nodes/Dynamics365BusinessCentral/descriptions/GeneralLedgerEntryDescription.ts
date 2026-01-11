/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const generalLedgerEntryOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['generalLedgerEntry'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a general ledger entry by ID',
				action: 'Get a general ledger entry',
			},
			{
				name: 'Get by Account',
				value: 'getByAccount',
				description: 'Get general ledger entries for a specific account',
				action: 'Get entries by account',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many general ledger entries',
				action: 'Get many general ledger entries',
			},
		],
		default: 'getAll',
	},
];

export const generalLedgerEntryFields: INodeProperties[] = [
	// ----------------------------------
	//         generalLedgerEntry: get
	// ----------------------------------
	{
		displayName: 'Entry ID',
		name: 'entryId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['generalLedgerEntry'],
				operation: ['get'],
			},
		},
		description: 'The ID of the general ledger entry (GUID)',
	},

	// ----------------------------------
	//         generalLedgerEntry: getByAccount
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['generalLedgerEntry'],
				operation: ['getByAccount'],
			},
		},
		description: 'The ID of the G/L account (GUID)',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['generalLedgerEntry'],
				operation: ['getByAccount'],
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
				resource: ['generalLedgerEntry'],
				operation: ['getByAccount'],
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

	// ----------------------------------
	//         generalLedgerEntry: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['generalLedgerEntry'],
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
				resource: ['generalLedgerEntry'],
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
				resource: ['generalLedgerEntry'],
				operation: ['getAll', 'getByAccount'],
			},
		},
		options: [
			{
				displayName: 'Account Number',
				name: 'accountNumber',
				type: 'string',
				default: '',
				description: 'Filter by G/L account number',
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
				displayName: 'Document Type',
				name: 'documentType',
				type: 'options',
				options: [
					{ name: 'Credit Memo', value: 'Credit Memo' },
					{ name: 'Finance Charge Memo', value: 'Finance Charge Memo' },
					{ name: 'Invoice', value: 'Invoice' },
					{ name: 'Payment', value: 'Payment' },
					{ name: 'Refund', value: 'Refund' },
					{ name: 'Reminder', value: 'Reminder' },
					{ name: 'Blank', value: ' ' },
				],
				default: ' ',
				description: 'Filter by document type',
			},
			{
				displayName: 'Posting Date From',
				name: 'postingDateFrom',
				type: 'dateTime',
				default: '',
				description: 'Filter entries from this posting date',
			},
			{
				displayName: 'Posting Date To',
				name: 'postingDateTo',
				type: 'dateTime',
				default: '',
				description: 'Filter entries to this posting date',
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
				resource: ['generalLedgerEntry'],
				operation: ['getAll', 'getByAccount'],
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
					{ name: 'Credit Amount', value: 'creditAmount' },
					{ name: 'Debit Amount', value: 'debitAmount' },
					{ name: 'Description', value: 'description' },
					{ name: 'Document Number', value: 'documentNumber' },
					{ name: 'Document Type', value: 'documentType' },
					{ name: 'Entry Number', value: 'entryNumber' },
					{ name: 'ID', value: 'id' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
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
];
