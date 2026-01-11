/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import type { IDataObject } from 'n8n-workflow';

// Address type used across multiple resources
export interface IAddress {
	street?: string;
	city?: string;
	state?: string;
	countryLetterCode?: string;
	postalCode?: string;
}

// Customer types
export interface ICustomer extends IDataObject {
	id?: string;
	number?: string;
	displayName?: string;
	type?: 'Person' | 'Company';
	email?: string;
	phoneNumber?: string;
	address?: IAddress;
	currencyCode?: string;
	paymentTermsId?: string;
	taxAreaId?: string;
	creditLimit?: number;
	blocked?: string;
	balance?: number;
	lastModifiedDateTime?: string;
}

// Vendor types
export interface IVendor extends IDataObject {
	id?: string;
	number?: string;
	displayName?: string;
	email?: string;
	phoneNumber?: string;
	address?: IAddress;
	currencyCode?: string;
	paymentTermsId?: string;
	taxRegistrationNumber?: string;
	blocked?: string;
	balance?: number;
	lastModifiedDateTime?: string;
}

// Item types
export interface IItem extends IDataObject {
	id?: string;
	number?: string;
	displayName?: string;
	type?: 'Inventory' | 'Service' | 'Non-Inventory';
	itemCategoryCode?: string;
	unitPrice?: number;
	unitCost?: number;
	baseUnitOfMeasure?: string;
	inventory?: number;
	blocked?: boolean;
	gtin?: string;
	lastModifiedDateTime?: string;
}

// Sales Order types
export interface ISalesOrder extends IDataObject {
	id?: string;
	number?: string;
	externalDocumentNumber?: string;
	orderDate?: string;
	postingDate?: string;
	customerId?: string;
	customerNumber?: string;
	customerName?: string;
	billToName?: string;
	shipToName?: string;
	currencyCode?: string;
	status?: 'Draft' | 'Open' | 'Released' | 'Pending Approval';
	totalAmountExcludingTax?: number;
	totalTaxAmount?: number;
	totalAmountIncludingTax?: number;
	lastModifiedDateTime?: string;
}

export interface ISalesOrderLine extends IDataObject {
	id?: string;
	documentId?: string;
	sequence?: number;
	itemId?: string;
	accountId?: string;
	lineType?: 'Comment' | 'Account' | 'Item' | 'Resource' | 'Fixed Asset' | 'Charge';
	description?: string;
	unitOfMeasureId?: string;
	quantity?: number;
	unitPrice?: number;
	discountPercent?: number;
	taxCode?: string;
	lineAmount?: number;
	netAmount?: number;
	netTaxAmount?: number;
	netAmountIncludingTax?: number;
}

// Sales Invoice types
export interface ISalesInvoice extends IDataObject {
	id?: string;
	number?: string;
	externalDocumentNumber?: string;
	invoiceDate?: string;
	postingDate?: string;
	dueDate?: string;
	customerId?: string;
	customerNumber?: string;
	customerName?: string;
	currencyCode?: string;
	status?: 'Draft' | 'Open' | 'Paid' | 'Canceled' | 'Corrective';
	totalAmountExcludingTax?: number;
	totalTaxAmount?: number;
	totalAmountIncludingTax?: number;
	lastModifiedDateTime?: string;
}

export interface ISalesInvoiceLine extends IDataObject {
	id?: string;
	documentId?: string;
	sequence?: number;
	itemId?: string;
	accountId?: string;
	lineType?: 'Comment' | 'Account' | 'Item' | 'Resource' | 'Fixed Asset' | 'Charge';
	description?: string;
	unitOfMeasureId?: string;
	quantity?: number;
	unitPrice?: number;
	discountPercent?: number;
	taxCode?: string;
	lineAmount?: number;
	netAmount?: number;
	netTaxAmount?: number;
	netAmountIncludingTax?: number;
}

// Purchase Order types
export interface IPurchaseOrder extends IDataObject {
	id?: string;
	number?: string;
	vendorId?: string;
	vendorNumber?: string;
	vendorName?: string;
	orderDate?: string;
	postingDate?: string;
	status?: 'Draft' | 'Open' | 'Released' | 'Pending Approval';
	currencyCode?: string;
	totalAmountExcludingTax?: number;
	totalTaxAmount?: number;
	totalAmountIncludingTax?: number;
	lastModifiedDateTime?: string;
}

export interface IPurchaseOrderLine extends IDataObject {
	id?: string;
	documentId?: string;
	sequence?: number;
	itemId?: string;
	accountId?: string;
	lineType?: 'Comment' | 'Account' | 'Item' | 'Resource' | 'Fixed Asset' | 'Charge';
	description?: string;
	unitOfMeasureId?: string;
	quantity?: number;
	directUnitCost?: number;
	discountPercent?: number;
	lineAmount?: number;
}

// Purchase Invoice types
export interface IPurchaseInvoice extends IDataObject {
	id?: string;
	number?: string;
	vendorInvoiceNumber?: string;
	vendorId?: string;
	vendorNumber?: string;
	vendorName?: string;
	invoiceDate?: string;
	postingDate?: string;
	dueDate?: string;
	status?: 'Draft' | 'Open' | 'Paid';
	currencyCode?: string;
	totalAmountExcludingTax?: number;
	totalTaxAmount?: number;
	totalAmountIncludingTax?: number;
	lastModifiedDateTime?: string;
}

export interface IPurchaseInvoiceLine extends IDataObject {
	id?: string;
	documentId?: string;
	sequence?: number;
	itemId?: string;
	accountId?: string;
	lineType?: 'Comment' | 'Account' | 'Item' | 'Resource' | 'Fixed Asset' | 'Charge';
	description?: string;
	unitOfMeasureId?: string;
	quantity?: number;
	directUnitCost?: number;
	discountPercent?: number;
	lineAmount?: number;
}

// General Ledger Entry types
export interface IGeneralLedgerEntry extends IDataObject {
	id?: string;
	entryNumber?: number;
	postingDate?: string;
	documentNumber?: string;
	documentType?: string;
	accountId?: string;
	accountNumber?: string;
	description?: string;
	debitAmount?: number;
	creditAmount?: number;
	lastModifiedDateTime?: string;
}

// Journal Line types
export interface IJournalLine extends IDataObject {
	id?: string;
	journalDisplayName?: string;
	lineNumber?: number;
	accountType?: 'G/L Account' | 'Customer' | 'Vendor' | 'Bank Account' | 'Fixed Asset' | 'IC Partner' | 'Employee';
	accountId?: string;
	accountNumber?: string;
	postingDate?: string;
	documentNumber?: string;
	externalDocumentNumber?: string;
	amount?: number;
	description?: string;
	comment?: string;
	lastModifiedDateTime?: string;
}

// Payment types
export interface IPayment extends IDataObject {
	id?: string;
	journalDisplayName?: string;
	lineNumber?: number;
	customerId?: string;
	customerNumber?: string;
	vendorId?: string;
	vendorNumber?: string;
	postingDate?: string;
	documentNumber?: string;
	externalDocumentNumber?: string;
	amount?: number;
	appliesToInvoiceId?: string;
	appliesToInvoiceNumber?: string;
	description?: string;
	comment?: string;
	lastModifiedDateTime?: string;
}

// Company types
export interface ICompany extends IDataObject {
	id?: string;
	systemVersion?: string;
	name?: string;
	displayName?: string;
	businessProfileId?: string;
	systemCreatedAt?: string;
	systemCreatedBy?: string;
	systemModifiedAt?: string;
	systemModifiedBy?: string;
}

// Dimension types
export interface IDimension extends IDataObject {
	id?: string;
	code?: string;
	displayName?: string;
	lastModifiedDateTime?: string;
}

export interface IDimensionValue extends IDataObject {
	id?: string;
	code?: string;
	dimensionId?: string;
	displayName?: string;
	lastModifiedDateTime?: string;
}

export interface IDefaultDimension extends IDataObject {
	id?: string;
	parentId?: string;
	dimensionId?: string;
	dimensionCode?: string;
	dimensionValueId?: string;
	dimensionValueCode?: string;
	postingValidation?: string;
}

// OData response types
export interface IODataResponse<T> {
	'@odata.context'?: string;
	'@odata.nextLink'?: string;
	'@odata.count'?: number;
	value: T[];
}

// Webhook subscription types
export interface IWebhookSubscription extends IDataObject {
	subscriptionId?: string;
	resource?: string;
	notificationUrl?: string;
	clientState?: string;
	expirationDateTime?: string;
}

export interface IWebhookNotification {
	subscriptionId: string;
	clientState?: string;
	changeType: 'created' | 'updated' | 'deleted';
	resource: string;
	resourceData: {
		id: string;
		'@odata.etag'?: string;
		'@odata.id'?: string;
	};
}

// Business Central resources enum
export type BusinessCentralResource =
	| 'customer'
	| 'salesOrder'
	| 'item'
	| 'salesInvoice'
	| 'vendor'
	| 'purchaseOrder'
	| 'purchaseInvoice'
	| 'generalLedgerEntry'
	| 'journalLine'
	| 'payment'
	| 'company'
	| 'dimension';

// Error response type
export interface IBusinessCentralError {
	error: {
		code: string;
		message: string;
		target?: string;
		details?: Array<{
			code: string;
			message: string;
			target?: string;
		}>;
	};
}
