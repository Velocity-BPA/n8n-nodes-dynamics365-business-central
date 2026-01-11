# n8n-nodes-dynamics365-business-central

> **[Velocity BPA Licensing Notice]**
>
> This n8n node is licensed under the Business Source License 1.1 (BSL 1.1).
>
> Use of this node by for-profit organizations in production environments requires a commercial license from Velocity BPA.
>
> For licensing information, visit https://velobpa.com/licensing or contact licensing@velobpa.com.

A comprehensive n8n community node for Microsoft Dynamics 365 Business Central, providing seamless ERP automation for sales, purchasing, inventory, finance, and customer/vendor management through the REST API v2.0 with OAuth 2.0 authentication via Azure Active Directory.

![n8n version](https://img.shields.io/badge/n8n-%3E%3D1.0.0-blue)
![Node version](https://img.shields.io/badge/node-%3E%3D18.0.0-green)
![License](https://img.shields.io/badge/license-BSL--1.1-blue)

## Features

- **12 Resource Categories** with comprehensive operations for complete ERP automation
- **100+ Operations** covering all major Business Central entities
- **OAuth 2.0 Authentication** via Azure Active Directory with automatic token refresh
- **OData v4 Pagination** with server-driven paging support
- **Multi-Company Support** for organizations with multiple Business Central companies
- **Webhook Trigger** for real-time event notifications
- **ETag Support** for optimistic concurrency control
- **Bound Actions** for operations like Ship, Post, and Invoice

## Installation

### Community Nodes (Recommended)

1. Open n8n
2. Go to **Settings** > **Community Nodes**
3. Click **Install**
4. Enter `n8n-nodes-dynamics365-business-central`
5. Click **Install**

### Manual Installation

```bash
# Navigate to your n8n installation directory
cd ~/.n8n

# Install the package
npm install n8n-nodes-dynamics365-business-central

# Restart n8n
```

### Development Installation

```bash
# Clone the repository
git clone https://github.com/Velocity-BPA/n8n-nodes-dynamics365-business-central.git
cd n8n-nodes-dynamics365-business-central

# Install dependencies
npm install

# Build the project
npm run build

# Create symlink to n8n custom nodes
mkdir -p ~/.n8n/custom
ln -s $(pwd) ~/.n8n/custom/n8n-nodes-dynamics365-business-central

# Restart n8n
```

## Credentials Setup

### Azure AD App Registration

1. Navigate to [Azure Portal](https://portal.azure.com) > Azure Active Directory > App registrations
2. Click **New registration**
3. Enter a name for your application
4. Select the appropriate account type
5. Add a redirect URI: `https://your-n8n-instance.com/rest/oauth2-credential/callback`
6. Click **Register**

### Configure API Permissions

1. In your app registration, go to **API permissions**
2. Click **Add a permission**
3. Select **Dynamics 365 Business Central**
4. Add permissions:
   - `Financials.ReadWrite.All`
   - `API.ReadWrite.All`
5. Click **Grant admin consent**

### Create Client Secret

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Add a description and select expiry
4. Copy the secret value immediately

### n8n Credential Configuration

| Field | Description |
|-------|-------------|
| **Tenant ID** | Azure AD tenant ID (GUID or domain name) |
| **Environment** | Business Central environment name (e.g., `Production`, `Sandbox`) |
| **Client ID** | Azure AD application (client) ID |
| **Client Secret** | Azure AD client secret |
| **Company ID** | Business Central company ID (GUID) - optional, can be selected per operation |

## Resources & Operations

### Customer
| Operation | Description |
|-----------|-------------|
| Create | Create a new customer |
| Get | Retrieve a customer by ID |
| Get Many | List all customers with filtering |
| Update | Update customer information |
| Delete | Delete a customer |
| Get Financial Details | Retrieve customer financial details |
| Get Default Dimensions | Get default dimension values |
| Set Default Dimension | Set a default dimension value |
| Get Picture | Retrieve customer picture |
| Update Picture | Update customer picture |

### Vendor
| Operation | Description |
|-----------|-------------|
| Create | Create a new vendor |
| Get | Retrieve a vendor by ID |
| Get Many | List all vendors with filtering |
| Update | Update vendor information |
| Delete | Delete a vendor |
| Get Default Dimensions | Get default dimension values |
| Get Open Balance | Retrieve vendor open balance |
| Get/Update Picture | Manage vendor picture |

### Item
| Operation | Description |
|-----------|-------------|
| Create | Create a new item |
| Get | Retrieve an item by ID |
| Get Many | List all items with filtering |
| Update | Update item information |
| Delete | Delete an item |
| Get Default Dimensions | Get default dimension values |
| Get Item Variants | Retrieve item variants |
| Get Inventory | Get inventory levels |
| Get/Update Picture | Manage item picture |

### Sales Order
| Operation | Description |
|-----------|-------------|
| Create | Create a new sales order |
| Get | Retrieve a sales order by ID |
| Get Many | List sales orders with filtering |
| Update | Update sales order header |
| Delete | Delete a sales order |
| Get/Create/Update/Delete Lines | Manage order line items |
| Ship and Invoice | Ship and invoice the order |
| Get Shipments | Retrieve related shipments |
| Get Invoices | Retrieve related invoices |

### Sales Invoice
| Operation | Description |
|-----------|-------------|
| Create | Create a sales invoice |
| Get | Retrieve an invoice by ID |
| Get Many | List invoices with filtering |
| Update | Update invoice header |
| Delete | Delete a draft invoice |
| Get/Create/Update/Delete Lines | Manage invoice lines |
| Post | Post the invoice |
| Send | Send invoice via email |
| Get PDF | Retrieve invoice as PDF |

### Purchase Order
| Operation | Description |
|-----------|-------------|
| Create | Create a purchase order |
| Get | Retrieve a PO by ID |
| Get Many | List purchase orders |
| Update | Update PO header |
| Delete | Delete a purchase order |
| Get/Create/Update/Delete Lines | Manage PO lines |
| Receive | Receive items |

### Purchase Invoice
| Operation | Description |
|-----------|-------------|
| Create | Create a purchase invoice |
| Get | Retrieve an invoice by ID |
| Get Many | List invoices with filtering |
| Update | Update invoice header |
| Delete | Delete a draft invoice |
| Get/Create/Update/Delete Lines | Manage invoice lines |
| Post | Post the invoice |

### General Ledger Entry
| Operation | Description |
|-----------|-------------|
| Get | Retrieve an entry by ID |
| Get Many | List entries with filtering |
| Get by Account | Get entries for specific account |

### Journal Line
| Operation | Description |
|-----------|-------------|
| Create | Create a journal line |
| Get | Retrieve a journal line |
| Get Many | List journal lines |
| Update | Update a journal line |
| Delete | Delete a journal line |
| Post | Post the journal batch |

### Payment
| Operation | Description |
|-----------|-------------|
| Create | Create a customer payment |
| Get | Retrieve a payment by ID |
| Get Many | List payments |
| Update | Update a payment |
| Delete | Delete a draft payment |
| Post | Post the payment |

### Company
| Operation | Description |
|-----------|-------------|
| Get | Retrieve a company by ID |
| Get Many | List all companies in environment |

### Dimension
| Operation | Description |
|-----------|-------------|
| Get | Retrieve a dimension by ID |
| Get Many | List all dimensions |
| Get Values | Get dimension values |
| Get Default Dimensions | Get entity default dimensions |

## Trigger Node

The Dynamics 365 Business Central Trigger node listens for real-time webhook notifications.

### Supported Events

- Customer: created, updated, deleted
- Vendor: created, updated
- Item: created, updated
- Sales Order: created, updated
- Sales Invoice: created, posted
- Purchase Order: created
- Purchase Invoice: created
- Payment: created

### Configuration Options

| Option | Description |
|--------|-------------|
| **Event** | The type of event to listen for |
| **Client State** | Optional secret for webhook validation |
| **Fetch Full Record** | Whether to fetch complete record details on notification |

## Usage Examples

### Create a Customer

```json
{
  "displayName": "Acme Corporation",
  "type": "Company",
  "email": "info@acme.com",
  "phoneNumber": "555-1234",
  "address": {
    "street": "123 Main St",
    "city": "Seattle",
    "state": "WA",
    "postalCode": "98101",
    "countryLetterCode": "US"
  }
}
```

### Create a Sales Order with Lines

1. Use the **Sales Order: Create** operation to create the order header
2. Use the **Sales Order: Create Line** operation to add line items
3. Use the **Sales Order: Ship and Invoice** operation when ready to fulfill

### Post a Journal Entry

1. Use the **Journal Line: Create** operation for each line (debits and credits)
2. Ensure the journal balances (debits = credits)
3. Use the **Journal Line: Post** operation to post the batch

## Error Handling

The node handles common Business Central API errors:

| Error Code | Description | Resolution |
|------------|-------------|------------|
| 400 | Bad Request | Check request parameters and field values |
| 401 | Unauthorized | Verify credentials and token validity |
| 403 | Forbidden | Check API permissions in Azure AD |
| 404 | Not Found | Verify resource ID exists |
| 409 | Conflict | ETag mismatch - record was modified |
| 429 | Rate Limited | Wait and retry (respects Retry-After header) |

## Security Best Practices

1. **Use Azure AD Service Principal** - Avoid using personal accounts for automation
2. **Minimum Permissions** - Grant only the API permissions needed
3. **Rotate Secrets** - Set client secret expiry and rotate regularly
4. **Audit Logging** - Enable audit logs in Business Central
5. **Network Security** - Use IP restrictions in Azure AD when possible

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint
npm run lint

# Fix lint issues
npm run lint:fix
```

## Author

**Velocity BPA**
- Website: [velobpa.com](https://velobpa.com)
- GitHub: [Velocity-BPA](https://github.com/Velocity-BPA)

## Licensing

This n8n community node is licensed under the **Business Source License 1.1**.

### Free Use
Permitted for personal, educational, research, and internal business use.

### Commercial Use
Use of this node within any SaaS, PaaS, hosted platform, managed service, or paid automation offering requires a commercial license.

For licensing inquiries:
**licensing@velobpa.com**

See [LICENSE](LICENSE), [COMMERCIAL_LICENSE.md](COMMERCIAL_LICENSE.md), and [LICENSING_FAQ.md](LICENSING_FAQ.md) for details.

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## Support

- **Issues**: [GitHub Issues](https://github.com/Velocity-BPA/n8n-nodes-dynamics365-business-central/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Velocity-BPA/n8n-nodes-dynamics365-business-central/discussions)
- **Email**: support@velobpa.com

## Acknowledgments

- [n8n](https://n8n.io/) - The workflow automation platform
- [Microsoft Dynamics 365 Business Central](https://dynamics.microsoft.com/en-us/business-central/) - The ERP platform
- [Anthropic Claude](https://anthropic.com) - AI assistance in development
