/* Queries */
//list products by name
export const listListingsBySearch = /* GraphQL */ `
  query ListProductListings(
    $filter: ModelProductListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        supplier {
          id
          name
          type
          registrationNumber
          createdAt
          updatedAt
        }
        supplierID
        productName
        variety
        quantityAvailable
        lowPrice
        highPrice
        minimumQuantity
        productPicture
      }
      nextToken
    }
  }
`;
//list products by supplier company
export const listListingsBySupplier = /* GraphQL */ `
  query GetSupplierCompany($id: ID!) {
    getSupplierCompany(id: $id) {
      id
      listings {
        items {
          id
          supplierID
          productName
          variety
          quantityAvailable
          lowPrice
          highPrice
          minimumQuantity
          productPicture
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
//get product info (called when pressing product inquiry)
export const getProductInquiry = /* GraphQL */ `
  query GetProductListing($id: ID!) {
    getProductListing(id: $id) {
      id
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
    }
  }
`;
//list favourite stores
export const listFavouriteStoresOfRetailers = /* GraphQL */ `
  query GetRetailerCompany($id: ID!) {
    getRetailerCompany(id: $id) {
      id
      favouriteStores {
        id
        name
      }
    }
  }
`;
//get PO
export const getPurchaseOrder = /* GraphQL */ `
  query GetPurchaseOrder($id: ID!) {
    getPurchaseOrder(id: $id) {
      id
      items {
        name
        quantity
      }
    }
  }
`;
//get DO
export const getOrderQuotation = /* GraphQL */ `
  query GetOrderQuotation($id: ID!) {
    getOrderQuotation(id: $id) {
      id
      items {
        name
        quantity
        price
      }
    }
  }
`;

/* Mutations */
//add product listing
export const createListing = /* GraphQL */ `
  mutation CreateProductListing(
    $input: CreateProductListingInput!
    $condition: ModelProductListingConditionInput
  ) {
    createProductListing(input: $input, condition: $condition) {
      id
      supplierID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      createdAt
      updatedAt
    }
  }
`;
//update product listing
export const updateListing = /* GraphQL */ `
  mutation UpdateProductListing(
    $input: UpdateProductListingInput!
    $condition: ModelProductListingConditionInput
  ) {
    updateProductListing(input: $input, condition: $condition) {
      id
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
    }
  }
`;
//remove product listing
export const deleteListing = /* GraphQL */ `
  mutation DeleteProductListing(
    $input: DeleteProductListingInput!
    $condition: ModelProductListingConditionInput
  ) {
    deleteProductListing(input: $input, condition: $condition) {
      id
    }
  }
`;
//create PO
export const createPurchaseOrder = /* GraphQL */ `
  mutation CreatePurchaseOrder(
    $input: CreatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    createPurchaseOrder(input: $input, condition: $condition) {
      id
      items {
        name
        quantity
      }
    }
  }
`;
//update PO
export const updatePurchaseOrder = /* GraphQL */ `
  mutation UpdatePurchaseOrder(
    $input: UpdatePurchaseOrderInput!
    $condition: ModelPurchaseOrderConditionInput
  ) {
    updatePurchaseOrder(input: $input, condition: $condition) {
      id
      items {
        name
        quantity
      }
    }
  }
`;
//create DO
export const createOrderQuotation = /* GraphQL */ `
  mutation CreateOrderQuotation(
    $input: CreateOrderQuotationInput!
    $condition: ModelOrderQuotationConditionInput
  ) {
    createOrderQuotation(input: $input, condition: $condition) {
      id
      items {
        name
        quantity
        price
      }
    }
  }
`;
//update DO
export const updateOrderQuotation = /* GraphQL */ `
  mutation UpdateOrderQuotation(
    $input: UpdateOrderQuotationInput!
    $condition: ModelOrderQuotationConditionInput
  ) {
    updateOrderQuotation(input: $input, condition: $condition) {
      id
      items {
        name
        quantity
        price
      }
    }
  }
`;
