/* Queries */
//list receiving tasks by retailer
export const listReceivingTasksByRetailer = /* GraphQL */ `
  query GetRetailerCompany($id: ID!) {
    getRetailerCompany(id: $id) {
      id
      goodsTask {
        items {
          id
          retailerID
          supplierID
          createdAt
          deliveryDate
          updatedAt
        }
        nextToken
      }
    }
  }
`;
//list payment tasks by retailer
export const listPaymentTasksByRetailer = /* GraphQL */ `
  query GetRetailerCompany($id: ID!) {
    getRetailerCompany(id: $id) {
      id
      paymentTask {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          createdAt
          invoiceID
          updatedAt
        }
        nextToken
      }
    }
  }
`;
//list receiving tasks by supplier
export const listSendingTasksBySupplier = /* GraphQL */ `
  query GetSupplierCompany($id: ID!) {
    getSupplierCompany(id: $id) {
      id
      goodsTask {
        items {
          id
          retailerID
          supplierID
          createdAt
          deliveryDate
          updatedAt
        }
        nextToken
      }
    }
  }
`;
//list payment tasks by supplier
export const listPaymentTasksBySupplier = /* GraphQL */ `
  query GetSupplierCompany($id: ID!) {
    getSupplierCompany(id: $id) {
      id
      paymentTask {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          createdAt
          invoiceID
          updatedAt
        }
        nextToken
      }
    }
  }
`;

/* Mutations */
//create receiving task
export const createGoodsTask = /* GraphQL */ `
  mutation CreateGoodsTask(
    $input: CreateGoodsTaskInput!
    $condition: ModelGoodsTaskConditionInput
  ) {
    createGoodsTask(input: $input, condition: $condition) {
      id
      retailerID
      supplierID
      items {
        name
        quantity
        price
      }
      createdAt
    }
  }
`;
//update receiving task
export const updateGoodsTask = /* GraphQL */ `
  mutation UpdateGoodsTask(
    $input: UpdateGoodsTaskInput!
    $condition: ModelGoodsTaskConditionInput
  ) {
    updateGoodsTask(input: $input, condition: $condition) {
      id
      retailerID
      supplierID
      createdAt
      deliveryDate
      updatedAt
    }
  }
`;
//create payment task
export const createPaymentTask = /* GraphQL */ `
  mutation CreatePaymentTask(
    $input: CreatePaymentTaskInput!
    $condition: ModelPaymentTaskConditionInput
  ) {
    createPaymentTask(input: $input, condition: $condition) {
      id
      retailerID
      supplierID
      paid
      amount
      payBefore
      receipt
    }
  }
`;
export const updatePaymentTask = /* GraphQL */ `
  mutation UpdatePaymentTask(
    $input: UpdatePaymentTaskInput!
    $condition: ModelPaymentTaskConditionInput
  ) {
    updatePaymentTask(input: $input, condition: $condition) {
      id
      paid
      amount
      payBefore
    }
  }
`;
