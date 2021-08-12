/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateGlobalSettings = /* GraphQL */ `
  subscription OnCreateGlobalSettings {
    onCreateGlobalSettings {
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
export const onUpdateGlobalSettings = /* GraphQL */ `
  subscription OnUpdateGlobalSettings {
    onUpdateGlobalSettings {
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
export const onDeleteGlobalSettings = /* GraphQL */ `
  subscription OnDeleteGlobalSettings {
    onDeleteGlobalSettings {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
      deviceEndpointID {
        service
        deviceTokens
      }
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
      deviceEndpointID {
        service
        deviceTokens
      }
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
      deviceEndpointID {
        service
        deviceTokens
      }
    }
  }
`;
export const onCreateRetailerCompany = /* GraphQL */ `
  subscription OnCreateRetailerCompany {
    onCreateRetailerCompany {
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
export const onUpdateRetailerCompany = /* GraphQL */ `
  subscription OnUpdateRetailerCompany {
    onUpdateRetailerCompany {
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
export const onDeleteRetailerCompany = /* GraphQL */ `
  subscription OnDeleteRetailerCompany {
    onDeleteRetailerCompany {
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
export const onCreateSupplierCompany = /* GraphQL */ `
  subscription OnCreateSupplierCompany {
    onCreateSupplierCompany {
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
export const onUpdateSupplierCompany = /* GraphQL */ `
  subscription OnUpdateSupplierCompany {
    onUpdateSupplierCompany {
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
export const onDeleteSupplierCompany = /* GraphQL */ `
  subscription OnDeleteSupplierCompany {
    onDeleteSupplierCompany {
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
export const onCreateFarmerCompany = /* GraphQL */ `
  subscription OnCreateFarmerCompany {
    onCreateFarmerCompany {
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
export const onUpdateFarmerCompany = /* GraphQL */ `
  subscription OnUpdateFarmerCompany {
    onUpdateFarmerCompany {
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
export const onDeleteFarmerCompany = /* GraphQL */ `
  subscription OnDeleteFarmerCompany {
    onDeleteFarmerCompany {
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
export const onCreateChatGroup = /* GraphQL */ `
  subscription OnCreateChatGroup {
    onCreateChatGroup {
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
export const onUpdateChatGroup = /* GraphQL */ `
  subscription OnUpdateChatGroup {
    onUpdateChatGroup {
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
export const onDeleteChatGroup = /* GraphQL */ `
  subscription OnDeleteChatGroup {
    onDeleteChatGroup {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage {
    onCreateMessage {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage {
    onUpdateMessage {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage {
    onDeleteMessage {
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
export const onCreateChatGroupUsers = /* GraphQL */ `
  subscription OnCreateChatGroupUsers {
    onCreateChatGroupUsers {
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
        deviceEndpointID {
          service
          deviceTokens
        }
      }
      updatedAt
      createdAt
    }
  }
`;
export const onUpdateChatGroupUsers = /* GraphQL */ `
  subscription OnUpdateChatGroupUsers {
    onUpdateChatGroupUsers {
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
        deviceEndpointID {
          service
          deviceTokens
        }
      }
      updatedAt
      createdAt
    }
  }
`;
export const onDeleteChatGroupUsers = /* GraphQL */ `
  subscription OnDeleteChatGroupUsers {
    onDeleteChatGroupUsers {
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
        deviceEndpointID {
          service
          deviceTokens
        }
      }
      updatedAt
      createdAt
    }
  }
`;
export const onCreateSupplierListing = /* GraphQL */ `
  subscription OnCreateSupplierListing {
    onCreateSupplierListing {
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
export const onUpdateSupplierListing = /* GraphQL */ `
  subscription OnUpdateSupplierListing {
    onUpdateSupplierListing {
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
export const onDeleteSupplierListing = /* GraphQL */ `
  subscription OnDeleteSupplierListing {
    onDeleteSupplierListing {
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
export const onCreateFarmerListing = /* GraphQL */ `
  subscription OnCreateFarmerListing {
    onCreateFarmerListing {
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
export const onUpdateFarmerListing = /* GraphQL */ `
  subscription OnUpdateFarmerListing {
    onUpdateFarmerListing {
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
export const onDeleteFarmerListing = /* GraphQL */ `
  subscription OnDeleteFarmerListing {
    onDeleteFarmerListing {
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
export const onCreateProductsInPurchaseOrder = /* GraphQL */ `
  subscription OnCreateProductsInPurchaseOrder {
    onCreateProductsInPurchaseOrder {
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
export const onUpdateProductsInPurchaseOrder = /* GraphQL */ `
  subscription OnUpdateProductsInPurchaseOrder {
    onUpdateProductsInPurchaseOrder {
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
export const onDeleteProductsInPurchaseOrder = /* GraphQL */ `
  subscription OnDeleteProductsInPurchaseOrder {
    onDeleteProductsInPurchaseOrder {
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
export const onCreateOrderQuotation = /* GraphQL */ `
  subscription OnCreateOrderQuotation {
    onCreateOrderQuotation {
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
export const onUpdateOrderQuotation = /* GraphQL */ `
  subscription OnUpdateOrderQuotation {
    onUpdateOrderQuotation {
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
export const onDeleteOrderQuotation = /* GraphQL */ `
  subscription OnDeleteOrderQuotation {
    onDeleteOrderQuotation {
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
export const onCreateGoodsTaskBetweenRandS = /* GraphQL */ `
  subscription OnCreateGoodsTaskBetweenRandS {
    onCreateGoodsTaskBetweenRandS {
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
export const onUpdateGoodsTaskBetweenRandS = /* GraphQL */ `
  subscription OnUpdateGoodsTaskBetweenRandS {
    onUpdateGoodsTaskBetweenRandS {
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
export const onDeleteGoodsTaskBetweenRandS = /* GraphQL */ `
  subscription OnDeleteGoodsTaskBetweenRandS {
    onDeleteGoodsTaskBetweenRandS {
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
export const onCreateGoodsTaskBetweenSandF = /* GraphQL */ `
  subscription OnCreateGoodsTaskBetweenSandF {
    onCreateGoodsTaskBetweenSandF {
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
export const onUpdateGoodsTaskBetweenSandF = /* GraphQL */ `
  subscription OnUpdateGoodsTaskBetweenSandF {
    onUpdateGoodsTaskBetweenSandF {
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
export const onDeleteGoodsTaskBetweenSandF = /* GraphQL */ `
  subscription OnDeleteGoodsTaskBetweenSandF {
    onDeleteGoodsTaskBetweenSandF {
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
export const onCreatePaymentTaskBetweenRandS = /* GraphQL */ `
  subscription OnCreatePaymentTaskBetweenRandS {
    onCreatePaymentTaskBetweenRandS {
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
export const onUpdatePaymentTaskBetweenRandS = /* GraphQL */ `
  subscription OnUpdatePaymentTaskBetweenRandS {
    onUpdatePaymentTaskBetweenRandS {
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
export const onDeletePaymentTaskBetweenRandS = /* GraphQL */ `
  subscription OnDeletePaymentTaskBetweenRandS {
    onDeletePaymentTaskBetweenRandS {
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
export const onCreatePaymentTaskBetweenSandF = /* GraphQL */ `
  subscription OnCreatePaymentTaskBetweenSandF {
    onCreatePaymentTaskBetweenSandF {
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
export const onUpdatePaymentTaskBetweenSandF = /* GraphQL */ `
  subscription OnUpdatePaymentTaskBetweenSandF {
    onUpdatePaymentTaskBetweenSandF {
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
export const onDeletePaymentTaskBetweenSandF = /* GraphQL */ `
  subscription OnDeletePaymentTaskBetweenSandF {
    onDeletePaymentTaskBetweenSandF {
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
export const onCreateInvoiceBetweenRandS = /* GraphQL */ `
  subscription OnCreateInvoiceBetweenRandS {
    onCreateInvoiceBetweenRandS {
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
export const onUpdateInvoiceBetweenRandS = /* GraphQL */ `
  subscription OnUpdateInvoiceBetweenRandS {
    onUpdateInvoiceBetweenRandS {
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
export const onDeleteInvoiceBetweenRandS = /* GraphQL */ `
  subscription OnDeleteInvoiceBetweenRandS {
    onDeleteInvoiceBetweenRandS {
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
export const onCreateInvoiceBetweenSandF = /* GraphQL */ `
  subscription OnCreateInvoiceBetweenSandF {
    onCreateInvoiceBetweenSandF {
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
export const onUpdateInvoiceBetweenSandF = /* GraphQL */ `
  subscription OnUpdateInvoiceBetweenSandF {
    onUpdateInvoiceBetweenSandF {
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
export const onDeleteInvoiceBetweenSandF = /* GraphQL */ `
  subscription OnDeleteInvoiceBetweenSandF {
    onDeleteInvoiceBetweenSandF {
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
