/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      role
      email
      retailerCompanyID
      supplierCompanyID
      farmerCompanyID
      chatGroup {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      contactNumber
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      role
      email
      retailerCompanyID
      supplierCompanyID
      farmerCompanyID
      chatGroup {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      contactNumber
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      role
      email
      retailerCompanyID
      supplierCompanyID
      farmerCompanyID
      chatGroup {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      contactNumber
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const createRetailerCompany = /* GraphQL */ `
  mutation CreateRetailerCompany(
    $input: CreateRetailerCompanyInput!
    $condition: ModelRetailerCompanyConditionInput
  ) {
    createRetailerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      registrationNumber
      favouriteStores {
        id
        name
      }
      goodsTask {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const updateRetailerCompany = /* GraphQL */ `
  mutation UpdateRetailerCompany(
    $input: UpdateRetailerCompanyInput!
    $condition: ModelRetailerCompanyConditionInput
  ) {
    updateRetailerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      registrationNumber
      favouriteStores {
        id
        name
      }
      goodsTask {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const deleteRetailerCompany = /* GraphQL */ `
  mutation DeleteRetailerCompany(
    $input: DeleteRetailerCompanyInput!
    $condition: ModelRetailerCompanyConditionInput
  ) {
    deleteRetailerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      registrationNumber
      favouriteStores {
        id
        name
      }
      goodsTask {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const createSupplierCompany = /* GraphQL */ `
  mutation CreateSupplierCompany(
    $input: CreateSupplierCompanyInput!
    $condition: ModelSupplierCompanyConditionInput
  ) {
    createSupplierCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      mostRecentInvoiceNumber
      favouriteStores {
        id
        name
      }
      registrationNumber
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
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTaskRetailer {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      goodsTaskFarmer {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTaskRetailer {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      paymentTaskFarmer {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoiceRetailer {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      invoiceFarmer {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const updateSupplierCompany = /* GraphQL */ `
  mutation UpdateSupplierCompany(
    $input: UpdateSupplierCompanyInput!
    $condition: ModelSupplierCompanyConditionInput
  ) {
    updateSupplierCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      mostRecentInvoiceNumber
      favouriteStores {
        id
        name
      }
      registrationNumber
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
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTaskRetailer {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      goodsTaskFarmer {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTaskRetailer {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      paymentTaskFarmer {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoiceRetailer {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      invoiceFarmer {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const deleteSupplierCompany = /* GraphQL */ `
  mutation DeleteSupplierCompany(
    $input: DeleteSupplierCompanyInput!
    $condition: ModelSupplierCompanyConditionInput
  ) {
    deleteSupplierCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      rating {
        numberOfRatings
        currentRating
      }
      bankAccount {
        bankName
        accountNumber
      }
      mostRecentInvoiceNumber
      favouriteStores {
        id
        name
      }
      registrationNumber
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
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTaskRetailer {
        items {
          id
          retailerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      goodsTaskFarmer {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTaskRetailer {
        items {
          id
          retailerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      paymentTaskFarmer {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoiceRetailer {
        items {
          id
          retailerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      invoiceFarmer {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const createFarmerCompany = /* GraphQL */ `
  mutation CreateFarmerCompany(
    $input: CreateFarmerCompanyInput!
    $condition: ModelFarmerCompanyConditionInput
  ) {
    createFarmerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      bankAccount {
        bankName
        accountNumber
      }
      rating {
        numberOfRatings
        currentRating
      }
      registrationNumber
      mostRecentInvoiceNumber
      listings {
        items {
          id
          farmerID
          productName
          variety
          quantityAvailable
          lowPrice
          highPrice
          minimumQuantity
          productPicture
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTask {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const updateFarmerCompany = /* GraphQL */ `
  mutation UpdateFarmerCompany(
    $input: UpdateFarmerCompanyInput!
    $condition: ModelFarmerCompanyConditionInput
  ) {
    updateFarmerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      bankAccount {
        bankName
        accountNumber
      }
      rating {
        numberOfRatings
        currentRating
      }
      registrationNumber
      mostRecentInvoiceNumber
      listings {
        items {
          id
          farmerID
          productName
          variety
          quantityAvailable
          lowPrice
          highPrice
          minimumQuantity
          productPicture
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTask {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const deleteFarmerCompany = /* GraphQL */ `
  mutation DeleteFarmerCompany(
    $input: DeleteFarmerCompanyInput!
    $condition: ModelFarmerCompanyConditionInput
  ) {
    deleteFarmerCompany(input: $input, condition: $condition) {
      id
      name
      employees {
        items {
          id
          name
          role
          email
          retailerCompanyID
          supplierCompanyID
          farmerCompanyID
          contactNumber
          updatedAt
          createdAt
        }
        nextToken
      }
      address
      bankAccount {
        bankName
        accountNumber
      }
      rating {
        numberOfRatings
        currentRating
      }
      registrationNumber
      mostRecentInvoiceNumber
      listings {
        items {
          id
          farmerID
          productName
          variety
          quantityAvailable
          lowPrice
          highPrice
          minimumQuantity
          productPicture
          grade
          siUnit
          updatedAt
          createdAt
        }
        nextToken
      }
      goodsTask {
        items {
          id
          farmerID
          supplierID
          updatedAt
          createdAt
          deliveryDate
          status
        }
        nextToken
      }
      paymentTask {
        items {
          id
          farmerID
          supplierID
          paid
          amount
          payBefore
          receipt
          updatedAt
          createdAt
        }
        nextToken
      }
      invoice {
        items {
          id
          farmerID
          supplierID
          amount
          updatedAt
          createdAt
          paid
          receivedBy
        }
        nextToken
      }
      chatGroups {
        items {
          id
          name
          retailerID
          supplierID
          farmerID
          updatedAt
          createdAt
          mostRecentMessage
          mostRecentMessageSender
        }
        nextToken
      }
      verified
      contactDetails {
        email
        phone
      }
      logo
      updatedAt
      createdAt
    }
  }
`;
export const createChatGroup = /* GraphQL */ `
  mutation CreateChatGroup(
    $input: CreateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    createChatGroup(input: $input, condition: $condition) {
      id
      name
      retailerID
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      chatParticipants {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          chatGroupID
          type
          content
          senderID
          sender
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
      mostRecentMessage
      mostRecentMessageSender
    }
  }
`;
export const updateChatGroup = /* GraphQL */ `
  mutation UpdateChatGroup(
    $input: UpdateChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    updateChatGroup(input: $input, condition: $condition) {
      id
      name
      retailerID
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      chatParticipants {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          chatGroupID
          type
          content
          senderID
          sender
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
      mostRecentMessage
      mostRecentMessageSender
    }
  }
`;
export const deleteChatGroup = /* GraphQL */ `
  mutation DeleteChatGroup(
    $input: DeleteChatGroupInput!
    $condition: ModelChatGroupConditionInput
  ) {
    deleteChatGroup(input: $input, condition: $condition) {
      id
      name
      retailerID
      retailerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      supplierCompany {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      farmerCompany {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      chatParticipants {
        items {
          id
          userID
          chatGroupID
          lastOnline
          updatedAt
          createdAt
        }
        nextToken
      }
      messages {
        items {
          id
          chatGroupID
          type
          content
          senderID
          sender
          updatedAt
          createdAt
        }
        nextToken
      }
      updatedAt
      createdAt
      mostRecentMessage
      mostRecentMessageSender
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      chatGroupID
      type
      content
      senderID
      sender
      updatedAt
      createdAt
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      chatGroupID
      type
      content
      senderID
      sender
      updatedAt
      createdAt
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      chatGroupID
      type
      content
      senderID
      sender
      updatedAt
      createdAt
    }
  }
`;
export const createChatGroupUsers = /* GraphQL */ `
  mutation CreateChatGroupUsers(
    $input: CreateChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    createChatGroupUsers(input: $input, condition: $condition) {
      id
      userID
      chatGroupID
      lastOnline
      chatGroup {
        id
        name
        retailerID
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierID
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      user {
        id
        name
        role
        email
        retailerCompanyID
        supplierCompanyID
        farmerCompanyID
        chatGroup {
          nextToken
        }
        contactNumber
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const updateChatGroupUsers = /* GraphQL */ `
  mutation UpdateChatGroupUsers(
    $input: UpdateChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    updateChatGroupUsers(input: $input, condition: $condition) {
      id
      userID
      chatGroupID
      lastOnline
      chatGroup {
        id
        name
        retailerID
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierID
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      user {
        id
        name
        role
        email
        retailerCompanyID
        supplierCompanyID
        farmerCompanyID
        chatGroup {
          nextToken
        }
        contactNumber
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const deleteChatGroupUsers = /* GraphQL */ `
  mutation DeleteChatGroupUsers(
    $input: DeleteChatGroupUsersInput!
    $condition: ModelChatGroupUsersConditionInput
  ) {
    deleteChatGroupUsers(input: $input, condition: $condition) {
      id
      userID
      chatGroupID
      lastOnline
      chatGroup {
        id
        name
        retailerID
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierID
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      user {
        id
        name
        role
        email
        retailerCompanyID
        supplierCompanyID
        farmerCompanyID
        chatGroup {
          nextToken
        }
        contactNumber
        retailerCompany {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        supplierCompany {
          id
          name
          address
          mostRecentInvoiceNumber
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerCompany {
          id
          name
          address
          registrationNumber
          mostRecentInvoiceNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      updatedAt
      createdAt
    }
  }
`;
export const createSupplierListing = /* GraphQL */ `
  mutation CreateSupplierListing(
    $input: CreateSupplierListingInput!
    $condition: ModelSupplierListingConditionInput
  ) {
    createSupplierListing(input: $input, condition: $condition) {
      id
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const updateSupplierListing = /* GraphQL */ `
  mutation UpdateSupplierListing(
    $input: UpdateSupplierListingInput!
    $condition: ModelSupplierListingConditionInput
  ) {
    updateSupplierListing(input: $input, condition: $condition) {
      id
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const deleteSupplierListing = /* GraphQL */ `
  mutation DeleteSupplierListing(
    $input: DeleteSupplierListingInput!
    $condition: ModelSupplierListingConditionInput
  ) {
    deleteSupplierListing(input: $input, condition: $condition) {
      id
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const createFarmerListing = /* GraphQL */ `
  mutation CreateFarmerListing(
    $input: CreateFarmerListingInput!
    $condition: ModelFarmerListingConditionInput
  ) {
    createFarmerListing(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const updateFarmerListing = /* GraphQL */ `
  mutation UpdateFarmerListing(
    $input: UpdateFarmerListingInput!
    $condition: ModelFarmerListingConditionInput
  ) {
    updateFarmerListing(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const deleteFarmerListing = /* GraphQL */ `
  mutation DeleteFarmerListing(
    $input: DeleteFarmerListingInput!
    $condition: ModelFarmerListingConditionInput
  ) {
    deleteFarmerListing(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      productName
      variety
      quantityAvailable
      lowPrice
      highPrice
      minimumQuantity
      productPicture
      grade
      siUnit
      updatedAt
      createdAt
    }
  }
`;
export const createProductsInPurchaseOrder = /* GraphQL */ `
  mutation CreateProductsInPurchaseOrder(
    $input: CreateProductsInPurchaseOrderInput!
    $condition: ModelProductsInPurchaseOrderConditionInput
  ) {
    createProductsInPurchaseOrder(input: $input, condition: $condition) {
      id
      purchaseOrderID
      name
      quantity
      updatedAt
      createdAt
      siUnit
      variety
      grade
    }
  }
`;
export const updateProductsInPurchaseOrder = /* GraphQL */ `
  mutation UpdateProductsInPurchaseOrder(
    $input: UpdateProductsInPurchaseOrderInput!
    $condition: ModelProductsInPurchaseOrderConditionInput
  ) {
    updateProductsInPurchaseOrder(input: $input, condition: $condition) {
      id
      purchaseOrderID
      name
      quantity
      updatedAt
      createdAt
      siUnit
      variety
      grade
    }
  }
`;
export const deleteProductsInPurchaseOrder = /* GraphQL */ `
  mutation DeleteProductsInPurchaseOrder(
    $input: DeleteProductsInPurchaseOrderInput!
    $condition: ModelProductsInPurchaseOrderConditionInput
  ) {
    deleteProductsInPurchaseOrder(input: $input, condition: $condition) {
      id
      purchaseOrderID
      name
      quantity
      updatedAt
      createdAt
      siUnit
      variety
      grade
    }
  }
`;
export const createOrderQuotation = /* GraphQL */ `
  mutation CreateOrderQuotation(
    $input: CreateOrderQuotationInput!
    $condition: ModelOrderQuotationConditionInput
  ) {
    createOrderQuotation(input: $input, condition: $condition) {
      id
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      sum
      logisticsProvided
      paymentTerms
      createdAt
      updatedAt
    }
  }
`;
export const updateOrderQuotation = /* GraphQL */ `
  mutation UpdateOrderQuotation(
    $input: UpdateOrderQuotationInput!
    $condition: ModelOrderQuotationConditionInput
  ) {
    updateOrderQuotation(input: $input, condition: $condition) {
      id
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      sum
      logisticsProvided
      paymentTerms
      createdAt
      updatedAt
    }
  }
`;
export const deleteOrderQuotation = /* GraphQL */ `
  mutation DeleteOrderQuotation(
    $input: DeleteOrderQuotationInput!
    $condition: ModelOrderQuotationConditionInput
  ) {
    deleteOrderQuotation(input: $input, condition: $condition) {
      id
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      sum
      logisticsProvided
      paymentTerms
      createdAt
      updatedAt
    }
  }
`;
export const createGoodsTaskBetweenRandS = /* GraphQL */ `
  mutation CreateGoodsTaskBetweenRandS(
    $input: CreateGoodsTaskBetweenRandSInput!
    $condition: ModelGoodsTaskBetweenRandSConditionInput
  ) {
    createGoodsTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const updateGoodsTaskBetweenRandS = /* GraphQL */ `
  mutation UpdateGoodsTaskBetweenRandS(
    $input: UpdateGoodsTaskBetweenRandSInput!
    $condition: ModelGoodsTaskBetweenRandSConditionInput
  ) {
    updateGoodsTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const deleteGoodsTaskBetweenRandS = /* GraphQL */ `
  mutation DeleteGoodsTaskBetweenRandS(
    $input: DeleteGoodsTaskBetweenRandSInput!
    $condition: ModelGoodsTaskBetweenRandSConditionInput
  ) {
    deleteGoodsTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const createGoodsTaskBetweenSandF = /* GraphQL */ `
  mutation CreateGoodsTaskBetweenSandF(
    $input: CreateGoodsTaskBetweenSandFInput!
    $condition: ModelGoodsTaskBetweenSandFConditionInput
  ) {
    createGoodsTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const updateGoodsTaskBetweenSandF = /* GraphQL */ `
  mutation UpdateGoodsTaskBetweenSandF(
    $input: UpdateGoodsTaskBetweenSandFInput!
    $condition: ModelGoodsTaskBetweenSandFConditionInput
  ) {
    updateGoodsTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const deleteGoodsTaskBetweenSandF = /* GraphQL */ `
  mutation DeleteGoodsTaskBetweenSandF(
    $input: DeleteGoodsTaskBetweenSandFInput!
    $condition: ModelGoodsTaskBetweenSandFConditionInput
  ) {
    deleteGoodsTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const createPaymentTaskBetweenRandS = /* GraphQL */ `
  mutation CreatePaymentTaskBetweenRandS(
    $input: CreatePaymentTaskBetweenRandSInput!
    $condition: ModelPaymentTaskBetweenRandSConditionInput
  ) {
    createPaymentTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const updatePaymentTaskBetweenRandS = /* GraphQL */ `
  mutation UpdatePaymentTaskBetweenRandS(
    $input: UpdatePaymentTaskBetweenRandSInput!
    $condition: ModelPaymentTaskBetweenRandSConditionInput
  ) {
    updatePaymentTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const deletePaymentTaskBetweenRandS = /* GraphQL */ `
  mutation DeletePaymentTaskBetweenRandS(
    $input: DeletePaymentTaskBetweenRandSInput!
    $condition: ModelPaymentTaskBetweenRandSConditionInput
  ) {
    deletePaymentTaskBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const createPaymentTaskBetweenSandF = /* GraphQL */ `
  mutation CreatePaymentTaskBetweenSandF(
    $input: CreatePaymentTaskBetweenSandFInput!
    $condition: ModelPaymentTaskBetweenSandFConditionInput
  ) {
    createPaymentTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const updatePaymentTaskBetweenSandF = /* GraphQL */ `
  mutation UpdatePaymentTaskBetweenSandF(
    $input: UpdatePaymentTaskBetweenSandFInput!
    $condition: ModelPaymentTaskBetweenSandFConditionInput
  ) {
    updatePaymentTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const deletePaymentTaskBetweenSandF = /* GraphQL */ `
  mutation DeletePaymentTaskBetweenSandF(
    $input: DeletePaymentTaskBetweenSandFInput!
    $condition: ModelPaymentTaskBetweenSandFConditionInput
  ) {
    deletePaymentTaskBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      paid
      amount
      payBefore
      receipt
      updatedAt
      createdAt
    }
  }
`;
export const createInvoiceBetweenRandS = /* GraphQL */ `
  mutation CreateInvoiceBetweenRandS(
    $input: CreateInvoiceBetweenRandSInput!
    $condition: ModelInvoiceBetweenRandSConditionInput
  ) {
    createInvoiceBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
export const updateInvoiceBetweenRandS = /* GraphQL */ `
  mutation UpdateInvoiceBetweenRandS(
    $input: UpdateInvoiceBetweenRandSInput!
    $condition: ModelInvoiceBetweenRandSConditionInput
  ) {
    updateInvoiceBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
export const deleteInvoiceBetweenRandS = /* GraphQL */ `
  mutation DeleteInvoiceBetweenRandS(
    $input: DeleteInvoiceBetweenRandSInput!
    $condition: ModelInvoiceBetweenRandSConditionInput
  ) {
    deleteInvoiceBetweenRandS(input: $input, condition: $condition) {
      id
      retailer {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        registrationNumber
        favouriteStores {
          id
          name
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
export const createInvoiceBetweenSandF = /* GraphQL */ `
  mutation CreateInvoiceBetweenSandF(
    $input: CreateInvoiceBetweenSandFInput!
    $condition: ModelInvoiceBetweenSandFConditionInput
  ) {
    createInvoiceBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
export const updateInvoiceBetweenSandF = /* GraphQL */ `
  mutation UpdateInvoiceBetweenSandF(
    $input: UpdateInvoiceBetweenSandFInput!
    $condition: ModelInvoiceBetweenSandFConditionInput
  ) {
    updateInvoiceBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
export const deleteInvoiceBetweenSandF = /* GraphQL */ `
  mutation DeleteInvoiceBetweenSandF(
    $input: DeleteInvoiceBetweenSandFInput!
    $condition: ModelInvoiceBetweenSandFConditionInput
  ) {
    deleteInvoiceBetweenSandF(input: $input, condition: $condition) {
      id
      farmer {
        id
        name
        employees {
          nextToken
        }
        address
        bankAccount {
          bankName
          accountNumber
        }
        rating {
          numberOfRatings
          currentRating
        }
        registrationNumber
        mostRecentInvoiceNumber
        listings {
          nextToken
        }
        goodsTask {
          nextToken
        }
        paymentTask {
          nextToken
        }
        invoice {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      farmerID
      supplier {
        id
        name
        employees {
          nextToken
        }
        address
        rating {
          numberOfRatings
          currentRating
        }
        bankAccount {
          bankName
          accountNumber
        }
        mostRecentInvoiceNumber
        favouriteStores {
          id
          name
        }
        registrationNumber
        listings {
          nextToken
        }
        goodsTaskRetailer {
          nextToken
        }
        goodsTaskFarmer {
          nextToken
        }
        paymentTaskRetailer {
          nextToken
        }
        paymentTaskFarmer {
          nextToken
        }
        invoiceRetailer {
          nextToken
        }
        invoiceFarmer {
          nextToken
        }
        chatGroups {
          nextToken
        }
        verified
        contactDetails {
          email
          phone
        }
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
        id
        name
        quantity
        siUnit
        variety
        grade
        price
      }
      amount
      updatedAt
      createdAt
      paid
      receivedBy
    }
  }
`;
