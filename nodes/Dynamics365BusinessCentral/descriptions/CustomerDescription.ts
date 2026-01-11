/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const customerOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['customer'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new customer',
				action: 'Create a customer',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a customer',
				action: 'Delete a customer',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a customer by ID',
				action: 'Get a customer',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many customers',
				action: 'Get many customers',
			},
			{
				name: 'Get Default Dimensions',
				value: 'getDefaultDimensions',
				description: 'Get default dimensions for a customer',
				action: 'Get default dimensions',
			},
			{
				name: 'Get Financial Details',
				value: 'getFinancialDetails',
				description: 'Get financial details for a customer',
				action: 'Get financial details',
			},
			{
				name: 'Get Picture',
				value: 'getPicture',
				description: 'Get customer picture',
				action: 'Get customer picture',
			},
			{
				name: 'Set Default Dimension',
				value: 'setDefaultDimension',
				description: 'Set a default dimension for a customer',
				action: 'Set default dimension',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a customer',
				action: 'Update a customer',
			},
			{
				name: 'Update Picture',
				value: 'updatePicture',
				description: 'Update customer picture',
				action: 'Update customer picture',
			},
		],
		default: 'getAll',
	},
];

export const customerFields: INodeProperties[] = [
	// ----------------------------------
	//         customer: create
	// ----------------------------------
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		description: 'The customer display name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address City',
				name: 'addressCity',
				type: 'string',
				default: '',
				description: 'City of the customer address',
			},
			{
				displayName: 'Address Country',
				name: 'addressCountry',
				type: 'string',
				default: '',
				description: 'Country letter code (e.g., US, GB)',
			},
			{
				displayName: 'Address Postal Code',
				name: 'addressPostalCode',
				type: 'string',
				default: '',
				description: 'Postal code of the customer address',
			},
			{
				displayName: 'Address State',
				name: 'addressState',
				type: 'string',
				default: '',
				description: 'State of the customer address',
			},
			{
				displayName: 'Address Street',
				name: 'addressStreet',
				type: 'string',
				default: '',
				description: 'Street of the customer address',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'options',
				options: [
					{ name: 'Not Blocked', value: ' ' },
					{ name: 'Ship', value: 'Ship' },
					{ name: 'Invoice', value: 'Invoice' },
					{ name: 'All', value: 'All' },
				],
				default: ' ',
				description: 'Blocked status for the customer',
			},
			{
				displayName: 'Credit Limit',
				name: 'creditLimit',
				type: 'number',
				default: 0,
				description: 'Credit limit for the customer',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Default currency code for the customer',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the customer',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Customer number (if not auto-generated)',
			},
			{
				displayName: 'Payment Terms ID',
				name: 'paymentTermsId',
				type: 'string',
				default: '',
				description: 'ID of the payment terms',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Phone number of the customer',
			},
			{
				displayName: 'Tax Area ID',
				name: 'taxAreaId',
				type: 'string',
				default: '',
				description: 'ID of the tax area',
			},
			{
				displayName: 'Tax Liable',
				name: 'taxLiable',
				type: 'boolean',
				default: true,
				description: 'Whether the customer is tax liable',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Company', value: 'Company' },
					{ name: 'Person', value: 'Person' },
				],
				default: 'Company',
				description: 'Type of customer',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website of the customer',
			},
		],
	},

	// ----------------------------------
	//         customer: get
	// ----------------------------------
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['get', 'delete', 'update', 'getFinancialDetails', 'getDefaultDimensions', 'setDefaultDimension', 'getPicture', 'updatePicture'],
			},
		},
		description: 'The ID of the customer (GUID)',
	},

	// ----------------------------------
	//         customer: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['customer'],
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
				resource: ['customer'],
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'options',
				options: [
					{ name: 'Not Blocked', value: ' ' },
					{ name: 'Ship', value: 'Ship' },
					{ name: 'Invoice', value: 'Invoice' },
					{ name: 'All', value: 'All' },
				],
				default: ' ',
				description: 'Filter by blocked status',
			},
			{
				displayName: 'City',
				name: 'city',
				type: 'string',
				default: '',
				description: 'Filter by city',
			},
			{
				displayName: 'Country',
				name: 'countryLetterCode',
				type: 'string',
				default: '',
				description: 'Filter by country letter code',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Filter by currency code',
			},
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				description: 'Custom OData filter expression',
				placeholder: "displayName eq 'Contoso'",
			},
			{
				displayName: 'Display Name Contains',
				name: 'displayNameContains',
				type: 'string',
				default: '',
				description: 'Filter customers whose name contains this value',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Filter by email address',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Filter by customer number',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Company', value: 'Company' },
					{ name: 'Person', value: 'Person' },
				],
				default: 'Company',
				description: 'Filter by customer type',
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
				resource: ['customer'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Address', value: 'address' },
					{ name: 'Balance', value: 'balance' },
					{ name: 'Blocked', value: 'blocked' },
					{ name: 'Credit Limit', value: 'creditLimit' },
					{ name: 'Currency Code', value: 'currencyCode' },
					{ name: 'Display Name', value: 'displayName' },
					{ name: 'Email', value: 'email' },
					{ name: 'ID', value: 'id' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
					{ name: 'Number', value: 'number' },
					{ name: 'Phone Number', value: 'phoneNumber' },
					{ name: 'Type', value: 'type' },
				],
				default: [],
				description: 'Fields to include in the response',
			},
			{
				displayName: 'Order By',
				name: 'orderBy',
				type: 'string',
				default: '',
				description: 'Field to sort by (e.g., displayName asc, number desc)',
				placeholder: 'displayName asc',
			},
		],
	},

	// ----------------------------------
	//         customer: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address City',
				name: 'addressCity',
				type: 'string',
				default: '',
				description: 'City of the customer address',
			},
			{
				displayName: 'Address Country',
				name: 'addressCountry',
				type: 'string',
				default: '',
				description: 'Country letter code (e.g., US, GB)',
			},
			{
				displayName: 'Address Postal Code',
				name: 'addressPostalCode',
				type: 'string',
				default: '',
				description: 'Postal code of the customer address',
			},
			{
				displayName: 'Address State',
				name: 'addressState',
				type: 'string',
				default: '',
				description: 'State of the customer address',
			},
			{
				displayName: 'Address Street',
				name: 'addressStreet',
				type: 'string',
				default: '',
				description: 'Street of the customer address',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'options',
				options: [
					{ name: 'Not Blocked', value: ' ' },
					{ name: 'Ship', value: 'Ship' },
					{ name: 'Invoice', value: 'Invoice' },
					{ name: 'All', value: 'All' },
				],
				default: ' ',
				description: 'Blocked status for the customer',
			},
			{
				displayName: 'Credit Limit',
				name: 'creditLimit',
				type: 'number',
				default: 0,
				description: 'Credit limit for the customer',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Default currency code for the customer',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				description: 'The customer display name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the customer',
			},
			{
				displayName: 'Payment Terms ID',
				name: 'paymentTermsId',
				type: 'string',
				default: '',
				description: 'ID of the payment terms',
			},
			{
				displayName: 'Phone Number',
				name: 'phoneNumber',
				type: 'string',
				default: '',
				description: 'Phone number of the customer',
			},
			{
				displayName: 'Tax Area ID',
				name: 'taxAreaId',
				type: 'string',
				default: '',
				description: 'ID of the tax area',
			},
			{
				displayName: 'Tax Liable',
				name: 'taxLiable',
				type: 'boolean',
				default: true,
				description: 'Whether the customer is tax liable',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website of the customer',
			},
		],
	},

	// ----------------------------------
	//         customer: setDefaultDimension
	// ----------------------------------
	{
		displayName: 'Dimension ID',
		name: 'dimensionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['setDefaultDimension'],
			},
		},
		description: 'The ID of the dimension',
	},
	{
		displayName: 'Dimension Value ID',
		name: 'dimensionValueId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['setDefaultDimension'],
			},
		},
		description: 'The ID of the dimension value',
	},

	// ----------------------------------
	//         customer: updatePicture
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['customer'],
				operation: ['updatePicture'],
			},
		},
		description: 'Name of the binary property containing the image data',
	},
];
