/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getGlobalSettings = /* GraphQL */ `
  query GetGlobalSettings($id: ID!) {
    getGlobalSettings(id: $id) {
      id
      latestVersionNumber
      emergencyProblem
      forceUpdate
      backendFix
      backendFixWhen
      createdAt
      updatedAt
    }
  }
`;
export const listGlobalSettingss = /* GraphQL */ `
  query ListGlobalSettingss(
    $filter: ModelGlobalSettingsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGlobalSettingss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        latestVersionNumber
        emergencyProblem
        forceUpdate
        backendFix
        backendFixWhen
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      role
      email
      pushNotificationTokens {
        service
        deviceTokens
      }
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        role
        email
        pushNotificationTokens {
          service
          deviceTokens
        }
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getRetailerCompany = /* GraphQL */ `
  query GetRetailerCompany($id: ID!) {
    getRetailerCompany(id: $id) {
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
          trackingNum
          retailerID
          supplierID
          logisticsProvided
          paymentTerms
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
          trackingNum
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
          trackingNum
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
export const listRetailerCompanys = /* GraphQL */ `
  query ListRetailerCompanys(
    $filter: ModelRetailerCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRetailerCompanys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSupplierCompany = /* GraphQL */ `
  query GetSupplierCompany($id: ID!) {
    getSupplierCompany(id: $id) {
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
      mostRecentPurchaseOrderNumber
      mostRecentInvoiceNumber
      mostRecentQuotationNumber
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
          trackingNum
          retailerID
          supplierID
          logisticsProvided
          paymentTerms
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
          trackingNum
          farmerID
          supplierID
          logisticsProvided
          paymentTerms
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
          trackingNum
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
          trackingNum
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
          trackingNum
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
          trackingNum
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
export const listSupplierCompanys = /* GraphQL */ `
  query ListSupplierCompanys(
    $filter: ModelSupplierCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupplierCompanys(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
      nextToken
    }
  }
`;
export const getFarmerCompany = /* GraphQL */ `
  query GetFarmerCompany($id: ID!) {
    getFarmerCompany(id: $id) {
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
      mostRecentPurchaseOrderNumber
      mostRecentInvoiceNumber
      mostRecentQuotationNumber
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
          trackingNum
          farmerID
          supplierID
          logisticsProvided
          paymentTerms
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
          trackingNum
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
          trackingNum
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
export const listFarmerCompanys = /* GraphQL */ `
  query ListFarmerCompanys(
    $filter: ModelFarmerCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFarmerCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
      nextToken
    }
  }
`;
export const getChatGroup = /* GraphQL */ `
  query GetChatGroup($id: ID!) {
    getChatGroup(id: $id) {
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listChatGroups = /* GraphQL */ `
  query ListChatGroups(
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
      nextToken
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const getChatGroupUsers = /* GraphQL */ `
  query GetChatGroupUsers($id: ID!) {
    getChatGroupUsers(id: $id) {
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
        pushNotificationTokens {
          service
          deviceTokens
        }
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
export const listChatGroupUserss = /* GraphQL */ `
  query ListChatGroupUserss(
    $filter: ModelChatGroupUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatGroupUserss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userID
        chatGroupID
        lastOnline
        chatGroup {
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
        user {
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
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getSupplierListing = /* GraphQL */ `
  query GetSupplierListing($id: ID!) {
    getSupplierListing(id: $id) {
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listSupplierListings = /* GraphQL */ `
  query ListSupplierListings(
    $filter: ModelSupplierListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSupplierListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const getFarmerListing = /* GraphQL */ `
  query GetFarmerListing($id: ID!) {
    getFarmerListing(id: $id) {
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listFarmerListings = /* GraphQL */ `
  query ListFarmerListings(
    $filter: ModelFarmerListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFarmerListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
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
      nextToken
    }
  }
`;
export const getProductsInPurchaseOrder = /* GraphQL */ `
  query GetProductsInPurchaseOrder($id: ID!) {
    getProductsInPurchaseOrder(id: $id) {
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
export const listProductsInPurchaseOrders = /* GraphQL */ `
  query ListProductsInPurchaseOrders(
    $filter: ModelProductsInPurchaseOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductsInPurchaseOrders(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getOrderQuotation = /* GraphQL */ `
  query GetOrderQuotation($id: ID!) {
    getOrderQuotation(id: $id) {
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
export const listOrderQuotations = /* GraphQL */ `
  query ListOrderQuotations(
    $filter: ModelOrderQuotationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOrderQuotations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const getGoodsTaskBetweenRandS = /* GraphQL */ `
  query GetGoodsTaskBetweenRandS($id: ID!) {
    getGoodsTaskBetweenRandS(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
      logisticsProvided
      paymentTerms
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const listGoodsTaskBetweenRandSs = /* GraphQL */ `
  query ListGoodsTaskBetweenRandSs(
    $filter: ModelGoodsTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoodsTaskBetweenRandSs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const getGoodsTaskBetweenSandF = /* GraphQL */ `
  query GetGoodsTaskBetweenSandF($id: ID!) {
    getGoodsTaskBetweenSandF(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
      logisticsProvided
      paymentTerms
      updatedAt
      createdAt
      deliveryDate
      status
    }
  }
`;
export const listGoodsTaskBetweenSandFs = /* GraphQL */ `
  query ListGoodsTaskBetweenSandFs(
    $filter: ModelGoodsTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoodsTaskBetweenSandFs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const getPaymentTaskBetweenRandS = /* GraphQL */ `
  query GetPaymentTaskBetweenRandS($id: ID!) {
    getPaymentTaskBetweenRandS(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listPaymentTaskBetweenRandSs = /* GraphQL */ `
  query ListPaymentTaskBetweenRandSs(
    $filter: ModelPaymentTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentTaskBetweenRandSs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const getPaymentTaskBetweenSandF = /* GraphQL */ `
  query GetPaymentTaskBetweenSandF($id: ID!) {
    getPaymentTaskBetweenSandF(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listPaymentTaskBetweenSandFs = /* GraphQL */ `
  query ListPaymentTaskBetweenSandFs(
    $filter: ModelPaymentTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentTaskBetweenSandFs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const getInvoiceBetweenRandS = /* GraphQL */ `
  query GetInvoiceBetweenRandS($id: ID!) {
    getInvoiceBetweenRandS(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listInvoiceBetweenRandSs = /* GraphQL */ `
  query ListInvoiceBetweenRandSs(
    $filter: ModelInvoiceBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoiceBetweenRandSs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const getInvoiceBetweenSandF = /* GraphQL */ `
  query GetInvoiceBetweenSandF($id: ID!) {
    getInvoiceBetweenSandF(id: $id) {
      id
      trackingNum
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
        mostRecentPurchaseOrderNumber
        mostRecentInvoiceNumber
        mostRecentQuotationNumber
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
export const listInvoiceBetweenSandFs = /* GraphQL */ `
  query ListInvoiceBetweenSandFs(
    $filter: ModelInvoiceBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoiceBetweenSandFs(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const getUsersByRetailerCompany = /* GraphQL */ `
  query GetUsersByRetailerCompany(
    $retailerCompanyID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUsersByRetailerCompany(
      retailerCompanyID: $retailerCompanyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        role
        email
        pushNotificationTokens {
          service
          deviceTokens
        }
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUsersBySupplierCompany = /* GraphQL */ `
  query GetUsersBySupplierCompany(
    $supplierCompanyID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUsersBySupplierCompany(
      supplierCompanyID: $supplierCompanyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        role
        email
        pushNotificationTokens {
          service
          deviceTokens
        }
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getUsersByFarmerCompany = /* GraphQL */ `
  query GetUsersByFarmerCompany(
    $farmerCompanyID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUsersByFarmerCompany(
      farmerCompanyID: $farmerCompanyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        role
        email
        pushNotificationTokens {
          service
          deviceTokens
        }
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        updatedAt
        createdAt
      }
      nextToken
    }
  }
`;
export const getChatGroupsContainingRetailersByUpdatedAt = /* GraphQL */ `
  query GetChatGroupsContainingRetailersByUpdatedAt(
    $retailerID: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getChatGroupsContainingRetailersByUpdatedAt(
      retailerID: $retailerID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
          items {
            userID
            lastOnline
          }
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      nextToken
    }
  }
`;
export const getChatGroupsContainingSuppliersByUpdatedAt = /* GraphQL */ `
  query GetChatGroupsContainingSuppliersByUpdatedAt(
    $supplierID: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getChatGroupsContainingSuppliersByUpdatedAt(
      supplierID: $supplierID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
          items {
            userID
            lastOnline
          }
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      nextToken
    }
  }
`;
export const getChatGroupsContainingFarmersByUpdatedAt = /* GraphQL */ `
  query GetChatGroupsContainingFarmersByUpdatedAt(
    $farmerID: ID
    $updatedAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelChatGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getChatGroupsContainingFarmersByUpdatedAt(
      farmerID: $farmerID
      updatedAt: $updatedAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
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
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        chatParticipants {
          nextToken
          items {
            userID
            lastOnline
          }
        }
        messages {
          nextToken
        }
        updatedAt
        createdAt
        mostRecentMessage
        mostRecentMessageSender
      }
      nextToken
    }
  }
`;
export const messagesInChatByDate = /* GraphQL */ `
  query MessagesInChatByDate(
    $chatGroupID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesInChatByDate(
      chatGroupID: $chatGroupID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
export const productListingBySupplier = /* GraphQL */ `
  query ProductListingBySupplier(
    $supplierID: ID
    $productName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSupplierListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productListingBySupplier(
      supplierID: $supplierID
      productName: $productName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const supplierListingByNameStartingWithLowestPrice = /* GraphQL */ `
  query SupplierListingByNameStartingWithLowestPrice(
    $productName: String
    $lowPrice: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSupplierListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    supplierListingByNameStartingWithLowestPrice(
      productName: $productName
      lowPrice: $lowPrice
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const productListingByFarmer = /* GraphQL */ `
  query ProductListingByFarmer(
    $farmerID: ID
    $productName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFarmerListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productListingByFarmer(
      farmerID: $farmerID
      productName: $productName
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
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
      nextToken
    }
  }
`;
export const farmerListingByNameStartingWithLowestPrice = /* GraphQL */ `
  query FarmerListingByNameStartingWithLowestPrice(
    $productName: String
    $lowPrice: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFarmerListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    farmerListingByNameStartingWithLowestPrice(
      productName: $productName
      lowPrice: $lowPrice
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
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
      nextToken
    }
  }
`;
export const purchaseOrderItems = /* GraphQL */ `
  query PurchaseOrderItems(
    $purchaseOrderID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelProductsInPurchaseOrderFilterInput
    $limit: Int
    $nextToken: String
  ) {
    purchaseOrderItems(
      purchaseOrderID: $purchaseOrderID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const goodsTaskForRetailerByDate = /* GraphQL */ `
  query GoodsTaskForRetailerByDate(
    $retailerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGoodsTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goodsTaskForRetailerByDate(
      retailerID: $retailerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const goodsTaskRetailerForSupplierByDate = /* GraphQL */ `
  query GoodsTaskRetailerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGoodsTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goodsTaskRetailerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const goodsTaskForFarmerByDate = /* GraphQL */ `
  query GoodsTaskForFarmerByDate(
    $farmerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGoodsTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goodsTaskForFarmerByDate(
      farmerID: $farmerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const goodsTaskFarmerForSupplierByDate = /* GraphQL */ `
  query GoodsTaskFarmerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGoodsTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goodsTaskFarmerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
        logisticsProvided
        paymentTerms
        updatedAt
        createdAt
        deliveryDate
        status
      }
      nextToken
    }
  }
`;
export const paymentsTaskForRetailerByDate = /* GraphQL */ `
  query PaymentsTaskForRetailerByDate(
    $retailerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsTaskForRetailerByDate(
      retailerID: $retailerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const paymentsTaskRetailerForSupplierByDate = /* GraphQL */ `
  query PaymentsTaskRetailerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTaskBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsTaskRetailerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const paymentsTaskForFarmerByDate = /* GraphQL */ `
  query PaymentsTaskForFarmerByDate(
    $farmerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsTaskForFarmerByDate(
      farmerID: $farmerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const paymentsTaskFarmerForSupplierByDate = /* GraphQL */ `
  query PaymentsTaskFarmerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTaskBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsTaskFarmerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const invoiceForRetailerByDate = /* GraphQL */ `
  query InvoiceForRetailerByDate(
    $retailerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoiceForRetailerByDate(
      retailerID: $retailerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const invoiceRetailerForSupplierByDate = /* GraphQL */ `
  query InvoiceRetailerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceBetweenRandSFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoiceRetailerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        retailer {
          id
          name
          address
          registrationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        retailerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const invoiceForFarmerByDate = /* GraphQL */ `
  query InvoiceForFarmerByDate(
    $farmerID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoiceForFarmerByDate(
      farmerID: $farmerID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
export const invoiceFarmerForSupplierByDate = /* GraphQL */ `
  query InvoiceFarmerForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceBetweenSandFFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoiceFarmerForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        trackingNum
        farmer {
          id
          name
          address
          registrationNumber
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          verified
          logo
          updatedAt
          createdAt
        }
        farmerID
        supplier {
          id
          name
          address
          mostRecentPurchaseOrderNumber
          mostRecentInvoiceNumber
          mostRecentQuotationNumber
          registrationNumber
          verified
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
      nextToken
    }
  }
`;
