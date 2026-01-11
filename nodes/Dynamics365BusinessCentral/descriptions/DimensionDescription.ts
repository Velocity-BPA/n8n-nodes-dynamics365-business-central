/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { INodeProperties } from 'n8n-workflow';

export const dimensionOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dimension'],
			},
		},
		options: [
			{
				name: 'Get',
				value: 'get',
				description: 'Get a dimension by ID',
				action: 'Get a dimension',
			},
			{
				name: 'Get Default Dimensions',
				value: 'getDefaultDimensions',
				description: 'Get default dimensions for an entity',
				action: 'Get default dimensions',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get all dimensions',
				action: 'Get many dimensions',
			},
			{
				name: 'Get Values',
				value: 'getValues',
				description: 'Get dimension values for a dimension',
				action: 'Get dimension values',
			},
		],
		default: 'getAll',
	},
];

export const dimensionFields: INodeProperties[] = [
	// ----------------------------------
	//         dimension: get
	// ----------------------------------
	{
		displayName: 'Dimension ID',
		name: 'dimensionId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['get', 'getValues'],
			},
		},
		description: 'The ID of the dimension (GUID)',
	},

	// ----------------------------------
	//         dimension: getDefaultDimensions
	// ----------------------------------
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['getDefaultDimensions'],
			},
		},
		options: [
			{ name: 'Customer', value: 'customer' },
			{ name: 'Employee', value: 'employee' },
			{ name: 'Item', value: 'item' },
			{ name: 'Vendor', value: 'vendor' },
		],
		default: 'customer',
		description: 'The type of entity to get default dimensions for',
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['getDefaultDimensions'],
			},
		},
		description: 'The ID of the entity (GUID)',
	},

	// ----------------------------------
	//         dimension: getAll
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['getAll', 'getValues'],
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
				resource: ['dimension'],
				operation: ['getAll', 'getValues'],
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
				resource: ['dimension'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Filter by dimension code (contains)',
			},
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				description: 'Custom OData filter expression',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				description: 'Filter by dimension display name (contains)',
			},
		],
	},
	{
		displayName: 'Value Filters',
		name: 'valueFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['getValues'],
			},
		},
		options: [
			{
				displayName: 'Blocked',
				name: 'blocked',
				type: 'boolean',
				default: false,
				description: 'Whether to filter by blocked status',
			},
			{
				displayName: 'Code',
				name: 'code',
				type: 'string',
				default: '',
				description: 'Filter by dimension value code (contains)',
			},
			{
				displayName: 'Custom Filter',
				name: 'customFilter',
				type: 'string',
				default: '',
				description: 'Custom OData filter expression',
			},
			{
				displayName: 'Display Name',
				name: 'displayName',
				type: 'string',
				default: '',
				description: 'Filter by dimension value display name (contains)',
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
				resource: ['dimension'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Code', value: 'code' },
					{ name: 'Display Name', value: 'displayName' },
					{ name: 'ID', value: 'id' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
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
				placeholder: 'code asc',
			},
		],
	},
	{
		displayName: 'Value Options',
		name: 'valueOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['dimension'],
				operation: ['getValues'],
			},
		},
		options: [
			{
				displayName: 'Fields',
				name: 'select',
				type: 'multiOptions',
				options: [
					{ name: 'Blocked', value: 'blocked' },
					{ name: 'Code', value: 'code' },
					{ name: 'Consolidation Code', value: 'consolidationCode' },
					{ name: 'Dimension ID', value: 'dimensionId' },
					{ name: 'Display Name', value: 'displayName' },
					{ name: 'ID', value: 'id' },
					{ name: 'Last Modified', value: 'lastModifiedDateTime' },
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
				placeholder: 'code asc',
			},
		],
	},
];
