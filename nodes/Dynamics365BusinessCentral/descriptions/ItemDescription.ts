/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const itemOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['item'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new item',
				action: 'Create an item',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an item',
				action: 'Delete an item',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get an item by ID',
				action: 'Get an item',
			},
			{
				name: 'Get Default Dimensions',
				value: 'getDefaultDimensions',
				description: 'Get default dimensions for an item',
				action: 'Get default dimensions',
			},
			{
				name: 'Get Inventory',
				value: 'getInventory',
				description: 'Get inventory levels for an item',
				action: 'Get inventory levels',
			},
			{
				name: 'Get Item Variants',
				value: 'getItemVariants',
				description: 'Get variants for an item',
				action: 'Get item variants',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many items',
				action: 'Get many items',
			},
			{
				name: 'Get Picture',
				value: 'getPicture',
				description: 'Get item picture',
				action: 'Get item picture',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an item',
				action: 'Update an item',
			},
			{
				name: 'Update Picture',
				value: 'updatePicture',
				description: 'Update item picture',
				action: 'Update item picture',
			},
		],
		default: 'getAll',
	},
];

export const itemFields: INodeProperties[] = [
	// ----------------------------------
	//         item: create
	// ----------------------------------
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['create'],
			},
		},
		description: 'The item description/display name',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Base Unit of Measure',
				name: 'baseUnitOfMeasure',
				type: 'string',
				default: '',
				description: 'Base unit of measure code (e.g., PCS, EA)',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Whether the item is blocked',
			},
			{
				displayName: 'GTIN',
				name: 'gtin',
				type: 'string',
				default: '',
				description: 'Global Trade Item Number (barcode)',
			},
			{
				displayName: 'Item Category Code',
				name: 'itemCategoryCode',
				type: 'string',
				default: '',
				description: 'Item category code',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Item number/SKU (if not auto-generated)',
			},
			{
				displayName: 'Tax Group Code',
				name: 'taxGroupCode',
				type: 'string',
				default: '',
				description: 'Tax group code',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Inventory', value: 'Inventory' },
					{ name: 'Non-Inventory', value: 'Non-Inventory' },
					{ name: 'Service', value: 'Service' },
				],
				default: 'Inventory',
				description: 'Type of item',
			},
			{
				displayName: 'Unit Cost',
				name: 'unitCost',
				type: 'number',
				default: 0,
				description: 'Unit cost of the item',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				default: 0,
				description: 'Unit selling price of the item',
			},
		],
	},

	// ----------------------------------
	//         item: get, delete, update, etc.
	// ----------------------------------
	{
		displayName: 'Item ID',
		name: 'itemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['get', 'delete', 'update', 'getDefaultDimensions', 'getItemVariants', 'getInventory', 'getPicture', 'updatePicture'],
			},
		},
		description: 'The ID of the item (GUID)',
	},

	// ----------------------------------
	//         item: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['item'],
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
				resource: ['item'],
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
				resource: ['item'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Filter by blocked status',
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
				description: 'Filter items whose name contains this value',
			},
			{
				displayName: 'Item Category Code',
				name: 'itemCategoryCode',
				type: 'string',
				default: '',
				description: 'Filter by item category code',
			},
			{
				displayName: 'Number',
				name: 'number',
				type: 'string',
				default: '',
				description: 'Filter by item number',
			},
			{
				displayName: 'Type',
				name: 'type',
				type: 'options',
				options: [
					{ name: 'Inventory', value: 'Inventory' },
					{ name: 'Non-Inventory', value: 'Non-Inventory' },
					{ name: 'Service', value: 'Service' },
				],
				default: 'Inventory',
				description: 'Filter by item type',
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
				resource: ['item'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Base Unit of Measure', value: 'baseUnitOfMeasure' },
					{ name: 'Blocked', value: 'blocked' },
					{ name: 'Display Name', value: 'displayName' },
					{ name: 'GTIN', value: 'gtin' },
					{ name: 'ID', value: 'id' },
					{ name: 'Inventory', value: 'inventory' },
					{ name: 'Item Category Code', value: 'itemCategoryCode' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
					{ name: 'Number', value: 'number' },
					{ name: 'Type', value: 'type' },
					{ name: 'Unit Cost', value: 'unitCost' },
					{ name: 'Unit Price', value: 'unitPrice' },
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
	//         item: update
	// ----------------------------------
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Base Unit of Measure',
				name: 'baseUnitOfMeasure',
				type: 'string',
				default: '',
				description: 'Base unit of measure code',
			},
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Whether the item is blocked',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				description: 'Item description/display name',
			},
			{
				displayName: 'GTIN',
				name: 'gtin',
				type: 'string',
				default: '',
				description: 'Global Trade Item Number',
			},
			{
				displayName: 'Item Category Code',
				name: 'itemCategoryCode',
				type: 'string',
				default: '',
				description: 'Item category code',
			},
			{
				displayName: 'Tax Group Code',
				name: 'taxGroupCode',
				type: 'string',
				default: '',
				description: 'Tax group code',
			},
			{
				displayName: 'Unit Cost',
				name: 'unitCost',
				type: 'number',
				default: 0,
				description: 'Unit cost of the item',
			},
			{
				displayName: 'Unit Price',
				name: 'unitPrice',
				type: 'number',
				default: 0,
				description: 'Unit selling price of the item',
			},
		],
	},

	// ----------------------------------
	//         item: updatePicture
	// ----------------------------------
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		required: true,
		default: 'data',
		displayOptions: {
			show: {
				resource: ['item'],
				operation: ['updatePicture'],
			},
		},
		description: 'Name of the binary property containing the image data',
	},
];
