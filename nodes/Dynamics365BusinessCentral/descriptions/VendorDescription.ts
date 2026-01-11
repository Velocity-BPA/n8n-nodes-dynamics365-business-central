/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const vendorOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['vendor'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new vendor',
				action: 'Create a vendor',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a vendor',
				action: 'Delete a vendor',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a vendor by ID',
				action: 'Get a vendor',
			},
			{
				name: 'Get Default Dimensions',
				value: 'getDefaultDimensions',
				description: 'Get default dimensions for a vendor',
				action: 'Get default dimensions',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many vendors',
				action: 'Get many vendors',
			},
			{
				name: 'Get Open Balance',
				value: 'getOpenBalance',
				description: 'Get open balance for a vendor',
				action: 'Get open balance',
			},
			{
				name: 'Get Picture',
				value: 'getPicture',
				description: 'Get vendor picture',
				action: 'Get vendor picture',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a vendor',
				action: 'Update a vendor',
			},
			{
				name: 'Update Picture',
				value: 'updatePicture',
				description: 'Update vendor picture',
				action: 'Update vendor picture',
			},
		],
		default: 'getAll',
	},
];

export const vendorFields: INodeProperties[] = [
	// ----------------------------------
	//         vendor: create
	// ----------------------------------
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['create'],
			},
		},
		description: 'The vendor display name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Address City',
				name: 'addressCity',
				type: 'string',
				default: '',
				description: 'City of the vendor address',
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
				description: 'Postal code of the vendor address',
			},
			{
				displayName: 'Address State',
				name: 'addressState',
				type: 'string',
				default: '',
				description: 'State of the vendor address',
			},
			{
				displayName: 'Address Street',
				name: 'addressStreet',
				type: 'string',
				default: '',
				description: 'Street of the vendor address',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'options',
				options: [
					{ name: 'Not Blocked', value: ' ' },
					{ name: 'Payment', value: 'Payment' },
					{ name: 'All', value: 'All' },
				],
				default: ' ',
				description: 'Blocked status for the vendor',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Default currency code for the vendor',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the vendor',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Vendor number (if not auto-generated)',
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
				description: 'Phone number of the vendor',
			},
			{
				displayName: 'Tax Liable',
				name: 'taxLiable',
				type: 'boolean',
				default: true,
				description: 'Whether the vendor is tax liable',
			},
			{
				displayName: 'Tax Registration Number',
				name: 'taxRegistrationNumber',
				type: 'string',
				default: '',
				description: 'Tax registration number',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website of the vendor',
			},
		],
	},

	// ----------------------------------
	//         vendor: get, delete, update, etc.
	// ----------------------------------
	{
		displayName: 'Vendor ID',
		name: 'vendorId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['get', 'delete', 'update', 'getDefaultDimensions', 'getOpenBalance', 'getPicture', 'updatePicture'],
			},
		},
		description: 'The ID of the vendor (GUID)',
	},

	// ----------------------------------
	//         vendor: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['vendor'],
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
				resource: ['vendor'],
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
				resource: ['vendor'],
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
					{ name: 'Payment', value: 'Payment' },
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
			},
			{
				displayName: 'Display Name Contains',
				name: 'displayNameContains',
				type: 'string',
				default: '',
				description: 'Filter vendors whose name contains this value',
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
				resource: ['vendor'],
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
					{ name: 'Currency Code', value: 'currencyCode' },
					{ name: 'Display Name', value: 'displayName' },
					{ name: 'Email', value: 'email' },
					{ name: 'ID', value: 'id' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
					{ name: 'Number', value: 'number' },
					{ name: 'Phone Number', value: 'phoneNumber' },
					{ name: 'Tax Registration Number', value: 'taxRegistrationNumber' },
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
				placeholder: 'displayName asc',
			},
		],
	},

	// ----------------------------------
	//         vendor: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Address City',
				name: 'addressCity',
				type: 'string',
				default: '',
				description: 'City of the vendor address',
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
				description: 'Postal code of the vendor address',
			},
			{
				displayName: 'Address State',
				name: 'addressState',
				type: 'string',
				default: '',
				description: 'State of the vendor address',
			},
			{
				displayName: 'Address Street',
				name: 'addressStreet',
				type: 'string',
				default: '',
				description: 'Street of the vendor address',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'options',
				options: [
					{ name: 'Not Blocked', value: ' ' },
					{ name: 'Payment', value: 'Payment' },
					{ name: 'All', value: 'All' },
				],
				default: ' ',
				description: 'Blocked status for the vendor',
			},
			{
				displayName: 'Currency Code',
				name: 'currencyCode',
				type: 'string',
				default: '',
				description: 'Default currency code for the vendor',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				description: 'The vendor display name',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Email address of the vendor',
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
				description: 'Phone number of the vendor',
			},
			{
				displayName: 'Tax Liable',
				name: 'taxLiable',
				type: 'boolean',
				default: true,
				description: 'Whether the vendor is tax liable',
			},
			{
				displayName: 'Tax Registration Number',
				name: 'taxRegistrationNumber',
				type: 'string',
				default: '',
				description: 'Tax registration number',
			},
			{
				displayName: 'Website',
				name: 'website',
				type: 'string',
				default: '',
				description: 'Website of the vendor',
			},
		],
	},

	// ----------------------------------
	//         vendor: updatePicture
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['vendor'],
				operation: ['updatePicture'],
			},
		},
		description: 'Name of the binary property containing the image data',
	},
];
