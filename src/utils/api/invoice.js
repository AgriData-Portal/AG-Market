/* Queries */
//list invoice by supplier
export const listInvoiceBySupplier = /* GraphQL */ `
  query GetSupplierCompany($id: ID!) {
    getSupplierCompany(id: $id) {
      id
      invoice {
        items {
          id
          retailerID
          supplierID
          createdAt
          paid
          receivedBy
          updatedAt
        }
        nextToken
      }
    }
  }
`;
//list invoice by retailer
export const listInvoiceByRetailer = /* GraphQL */ `
  query GetRetailerCompany($id: ID!) {
    getRetailerCompany(id: $id) {
      id
      invoice {
        items {
          id
          retailerID
          supplierID
          createdAt
          paid
          receivedBy
          updatedAt
        }
        nextToken
      }
    }
  }
`;
/* Mutations */
//create invoice
export const createInvoice = /* GraphQL */ `
  mutation CreateInvoice(
    $input: CreateInvoiceInput!
    $condition: ModelInvoiceConditionInput
  ) {
    createInvoice(input: $input, condition: $condition) {
      id
      retailerID
      supplierID
      items {
        name
        quantity
        price
      }
      paid
      receivedBy
    }
  }
`;
