/*
 * Copyright (c) Velocity BPA, LLC
 * Licensed under the Business Source License 1.1
 * Commercial use requires a separate commercial license.
 * See LICENSE file for details.
 */

import {
	buildODataQuery,
	formatDate,
	isValidGuid,
	buildFilterExpression,
} from '../../nodes/Dynamics365BusinessCentral/GenericFunctions';

describe('GenericFunctions', () => {
	describe('buildODataQuery', () => {
		it('should return empty object when no filters or options', () => {
			const result = buildODataQuery({}, {});
			expect(result).toEqual({});
		});

		it('should build $filter from filters', () => {
			const filters = {
				displayName: 'Test Customer',
				customFilter: "type eq 'Company'",
			};
			const result = buildODataQuery(filters, {});
			expect(result.$filter).toContain("contains(displayName,'Test Customer')");
			expect(result.$filter).toContain("type eq 'Company'");
		});

		it('should build $select from options', () => {
			const options = {
				select: ['id', 'displayName', 'email'],
			};
			const result = buildODataQuery({}, options);
			expect(result.$select).toBe('id,displayName,email');
		});

		it('should build $orderby from options', () => {
			const options = {
				orderBy: 'displayName desc',
			};
			const result = buildODataQuery({}, options);
			expect(result.$orderby).toBe('displayName desc');
		});

		it('should handle date range filters', () => {
			const filters = {
				postingDateFrom: '2024-01-01T00:00:00Z',
				postingDateTo: '2024-12-31T23:59:59Z',
			};
			const result = buildODataQuery(filters, {});
			expect(result.$filter).toContain('postingDate ge 2024-01-01');
			expect(result.$filter).toContain('postingDate le 2024-12-31');
		});

		it('should handle boolean filters', () => {
			const filters = {
				blocked: true,
			};
			const result = buildODataQuery(filters, {});
			expect(result.$filter).toBe('blocked eq true');
		});
	});

	describe('formatDate', () => {
		it('should format ISO date string to YYYY-MM-DD', () => {
			const result = formatDate('2024-06-15T10:30:00Z');
			expect(result).toBe('2024-06-15');
		});

		it('should handle date without time', () => {
			const result = formatDate('2024-06-15');
			expect(result).toBe('2024-06-15');
		});

		it('should return empty string for empty input', () => {
			const result = formatDate('');
			expect(result).toBe('');
		});
	});

	describe('isValidGuid', () => {
		it('should return true for valid GUID', () => {
			expect(isValidGuid('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
			expect(isValidGuid('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
		});

		it('should return false for invalid GUID', () => {
			expect(isValidGuid('not-a-guid')).toBe(false);
			expect(isValidGuid('550e8400-e29b-41d4-a716')).toBe(false);
			expect(isValidGuid('')).toBe(false);
		});
	});

	describe('buildFilterExpression', () => {
		it('should build contains filter for string fields', () => {
			const result = buildFilterExpression('displayName', 'Test', 'contains');
			expect(result).toBe("contains(displayName,'Test')");
		});

		it('should build eq filter for exact match', () => {
			const result = buildFilterExpression('number', '10000', 'eq');
			expect(result).toBe("number eq '10000'");
		});

		it('should build gt/lt filters for numbers', () => {
			const gtResult = buildFilterExpression('amount', 100, 'gt');
			const ltResult = buildFilterExpression('amount', 500, 'lt');
			expect(gtResult).toBe('amount gt 100');
			expect(ltResult).toBe('amount lt 500');
		});

		it('should build ge/le filters for dates', () => {
			const geResult = buildFilterExpression('postingDate', '2024-01-01', 'ge');
			const leResult = buildFilterExpression('postingDate', '2024-12-31', 'le');
			expect(geResult).toBe("postingDate ge '2024-01-01'");
			expect(leResult).toBe("postingDate le '2024-12-31'");
		});
	});
});
