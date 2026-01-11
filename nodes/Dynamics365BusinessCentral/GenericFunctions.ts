/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type {
	ICredentialDataDecryptedObject,
	IDataObject,
	IExecuteFunctions,
	IHookFunctions,
	IHttpRequestMethods,
	ILoadOptionsFunctions,
	IPollFunctions,
	IRequestOptions,
	IWebhookFunctions,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeOperationError } from 'n8n-workflow';

import type { IODataResponse } from './types/Dynamics365BusinessCentralTypes';

/**
 * Get the base URL for Business Central API
 */
export function getBaseUrl(credentials: ICredentialDataDecryptedObject): string {
	const tenantId = credentials.tenantId as string;
	const environment = credentials.environment as string;
	return `https://api.businesscentral.dynamics.com/v2.0/${tenantId}/${environment}/api/v2.0`;
}

/**
 * Get the company-scoped endpoint
 */
export function getCompanyEndpoint(companyId: string, endpoint: string): string {
	return `/companies(${companyId})${endpoint}`;
}

/**
 * Make an API request to Business Central
 */
export async function businessCentralApiRequest(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions | IPollFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject | Buffer,
	query?: IDataObject,
	headers?: IDataObject,
): Promise<IDataObject> {
	const credentials = await this.getCredentials('dynamics365BusinessCentralOAuth2Api');
	const baseUrl = getBaseUrl(credentials);

	const options: IRequestOptions = {
		method,
		uri: `${baseUrl}${endpoint}`,
		json: true,
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json',
			...headers,
		},
	};

	if (body && ((Buffer.isBuffer(body)) || Object.keys(body).length > 0)) {
		if (Buffer.isBuffer(body)) {
			options.body = body;
			options.json = false;
		} else {
			options.body = body;
		}
	}

	if (query && Object.keys(query).length > 0) {
		options.qs = query;
	}

	try {
		const response = await this.helpers.requestOAuth2.call(
			this,
			'dynamics365BusinessCentralOAuth2Api',
			options,
		);
		return response as IDataObject;
	} catch (error) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: getErrorMessage(error),
		});
	}
}

/**
 * Make an API request with pagination support
 */
export async function businessCentralApiRequestAllItems(
	this: IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body?: IDataObject,
	query?: IDataObject,
	limit?: number,
): Promise<IDataObject[]> {
	const credentials = await this.getCredentials('dynamics365BusinessCentralOAuth2Api');
	const baseUrl = getBaseUrl(credentials);

	query = query || {};
	const results: IDataObject[] = [];
	let nextLink: string | undefined;

	// Set default page size
	if (!query['$top']) {
		query['$top'] = 100;
	}

	do {
		let response: IODataResponse<IDataObject>;

		if (nextLink) {
			const options: IRequestOptions = {
				method: 'GET',
				uri: nextLink,
				json: true,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			};

			response = await this.helpers.requestOAuth2.call(
				this,
				'dynamics365BusinessCentralOAuth2Api',
				options,
			) as IODataResponse<IDataObject>;
		} else {
			const options: IRequestOptions = {
				method,
				uri: `${baseUrl}${endpoint}`,
				json: true,
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				qs: query,
			};

			if (body && Object.keys(body).length > 0) {
				options.body = body;
			}

			response = await this.helpers.requestOAuth2.call(
				this,
				'dynamics365BusinessCentralOAuth2Api',
				options,
			) as IODataResponse<IDataObject>;
		}

		if (response.value && Array.isArray(response.value)) {
			results.push(...response.value);
		}

		nextLink = response['@odata.nextLink'];

		// Check if we've reached the limit
		if (limit && results.length >= limit) {
			return results.slice(0, limit);
		}
	} while (nextLink);

	return results;
}

/**
 * Build OData query parameters from filters and options
 */
export function buildODataQuery(filters: IDataObject, options: IDataObject): IDataObject {
	const query: IDataObject = {};
	const filterParts: string[] = [];

	// Process filters
	for (const [key, value] of Object.entries(filters)) {
		if (value === undefined || value === null || value === '') continue;

		// Handle special filter cases
		if (key === 'customFilter' && typeof value === 'string') {
			filterParts.push(value);
		} else if (key.endsWith('From') && typeof value === 'string') {
			const fieldName = key.replace('From', '');
			filterParts.push(`${fieldName} ge ${formatDate(value)}`);
		} else if (key.endsWith('To') && typeof value === 'string') {
			const fieldName = key.replace('To', '');
			filterParts.push(`${fieldName} le ${formatDate(value)}`);
		} else if (typeof value === 'string') {
			// For string values, use contains for name-like fields, eq for others
			if (key.toLowerCase().includes('name') || key.toLowerCase().includes('display')) {
				filterParts.push(`contains(${key},'${escapeODataValue(value)}')`);
			} else {
				filterParts.push(`${key} eq '${escapeODataValue(value)}'`);
			}
		} else if (typeof value === 'number') {
			filterParts.push(`${key} eq ${value}`);
		} else if (typeof value === 'boolean') {
			filterParts.push(`${key} eq ${value}`);
		}
	}

	if (filterParts.length > 0) {
		query.$filter = filterParts.join(' and ');
	}

	// Process options
	if (options.select && Array.isArray(options.select) && options.select.length > 0) {
		query.$select = (options.select as string[]).join(',');
	}

	if (options.expand && Array.isArray(options.expand) && options.expand.length > 0) {
		query.$expand = (options.expand as string[]).join(',');
	}

	if (options.orderBy && typeof options.orderBy === 'string') {
		query.$orderby = options.orderBy;
	}

	return query;
}

/**
 * Escape special characters in OData filter values
 */
export function escapeODataValue(value: string): string {
	return value.replace(/'/g, "''");
}

/**
 * Format date to YYYY-MM-DD format for Business Central
 */
export function formatDate(date: string | Date): string {
	if (!date) return '';
	if (date instanceof Date) {
		return date.toISOString().split('T')[0];
	}
	// If already in ISO format, extract date part
	if (typeof date === 'string' && date.includes('T')) {
		return date.split('T')[0];
	}
	return date;
}

/**
 * Get company ID from credentials or parameters
 */
export async function getCompanyId(
	this: IExecuteFunctions | ILoadOptionsFunctions | IHookFunctions | IWebhookFunctions,
	itemIndex?: number,
): Promise<string> {
	const credentials = await this.getCredentials('dynamics365BusinessCentralOAuth2Api');

	// First check if company ID is in credentials
	if (credentials.companyId) {
		return credentials.companyId as string;
	}

	// Then check if it's provided as a parameter
	if (itemIndex !== undefined && 'getNodeParameter' in this) {
		try {
			const execFunctions = this as IExecuteFunctions;
			const companyId = execFunctions.getNodeParameter('companyId', itemIndex, '') as string;
			if (companyId) {
				return companyId;
			}
		} catch {
			// Parameter not found, continue
		}
	}

	throw new NodeOperationError(
		this.getNode(),
		'Company ID is required. Please specify it in the credentials or as a parameter.',
	);
}

/**
 * Handle ETag for optimistic concurrency
 */
export function getIfMatchHeader(etag?: string): IDataObject {
	if (etag) {
		return { 'If-Match': etag };
	}
	return { 'If-Match': '*' };
}

/**
 * Extract error message from Business Central error response
 */
export function getErrorMessage(error: unknown): string {
	if (error && typeof error === 'object') {
		const errorObj = error as { error?: { message?: string }; message?: string };
		if (errorObj.error?.message) {
			return errorObj.error.message;
		}
		if (errorObj.message) {
			return errorObj.message;
		}
	}
	return 'An unknown error occurred';
}

/**
 * Clean object by removing undefined and null values
 */
export function cleanObject(obj: IDataObject): IDataObject {
	const cleaned: IDataObject = {};
	for (const [key, value] of Object.entries(obj)) {
		if (value !== undefined && value !== null && value !== '') {
			cleaned[key] = value;
		}
	}
	return cleaned;
}

/**
 * Build address object
 */
export function buildAddressObject(
	street?: string,
	city?: string,
	state?: string,
	country?: string,
	postalCode?: string,
): IDataObject | undefined {
	const address: IDataObject = {};

	if (street) address.street = street;
	if (city) address.city = city;
	if (state) address.state = state;
	if (country) address.countryLetterCode = country;
	if (postalCode) address.postalCode = postalCode;

	if (Object.keys(address).length === 0) {
		return undefined;
	}

	return address;
}

/**
 * Build filter expression from field, value and operator
 */
export function buildFilterExpression(field: string, value: string | number | boolean, operator: string): string {
	if (operator === 'contains' && typeof value === 'string') {
		return `contains(${field},'${escapeODataValue(value)}')`;
	}
	if (typeof value === 'string') {
		return `${field} ${operator} '${escapeODataValue(value)}'`;
	}
	return `${field} ${operator} ${value}`;
}

/**
 * Validate GUID format
 */
export function isValidGuid(value: string): boolean {
	const guidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
	return guidRegex.test(value);
}

/**
 * Validate and format GUID
 */
export function validateGuid(value: string, fieldName: string): string {
	if (!isValidGuid(value)) {
		throw new Error(`Invalid GUID format for ${fieldName}: ${value}`);
	}
	return value.toLowerCase();
}

/**
 * Handle binary data for pictures
 */
export async function handlePictureUpload(
	this: IExecuteFunctions,
	itemIndex: number,
	binaryPropertyName: string,
): Promise<{ contentType: string; body: Buffer }> {
	const binaryData = this.helpers.assertBinaryData(itemIndex, binaryPropertyName);
	const buffer = await this.helpers.getBinaryDataBuffer(itemIndex, binaryPropertyName);

	return {
		contentType: binaryData.mimeType || 'image/png',
		body: buffer,
	};
}

/**
 * Handle binary data for PDF
 */
export async function handlePdfDownload(
	this: IExecuteFunctions,
	response: Buffer | ArrayBuffer,
	fileName: string,
): Promise<IDataObject> {
	const buffer = Buffer.isBuffer(response) ? response : Buffer.from(response);

	return {
		json: { success: true, fileName },
		binary: {
			data: await this.helpers.prepareBinaryData(buffer, fileName, 'application/pdf'),
		},
	};
}

/**
 * Log licensing notice (called once per node load)
 */
let licenseNoticeLogged = false;
export function logLicenseNotice(): void {
	if (!licenseNoticeLogged) {
		// eslint-disable-next-line no-console
		console.warn(
			'[Velocity BPA Licensing Notice] This n8n node is licensed under the Business Source License 1.1 (BSL 1.1). ' +
			'Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA. ' +
			'For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.',
		);
		licenseNoticeLogged = true;
	}
}
