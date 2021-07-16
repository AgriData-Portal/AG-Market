/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      name
      role
      retailerCompanyID
      supplierCompanyID
      chatGroup {
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          user {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
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
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      supplierCompany {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
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
        retailerCompanyID
        supplierCompanyID
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
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          retailerCompanyID
          supplierCompanyID
          chatGroup {
            nextToken
          }
          contactNumber
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
      type
      address
      rating {
        numberOfRatings
        currentRating
      }
      registrationNumber
      favouriteStores {
        id
        name
      }
      goodsTask {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
            registrationNumber
            verified
            logo
            updatedAt
            createdAt
          }
          supplierID
          items {
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
          sentByRetailer
        }
        nextToken
      }
      paymentTask {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
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
      invoice {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
            registrationNumber
            verified
            logo
            updatedAt
            createdAt
          }
          supplierID
          items {
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
      chatGroups {
        items {
          id
          name
          retailerID
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
      verified
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
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
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
          retailerCompanyID
          supplierCompanyID
          chatGroup {
            nextToken
          }
          contactNumber
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
      type
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
      listings {
        items {
          id
          supplier {
            id
            name
            type
            address
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
      goodsTask {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
            registrationNumber
            verified
            logo
            updatedAt
            createdAt
          }
          supplierID
          items {
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
          sentByRetailer
        }
        nextToken
      }
      paymentTask {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
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
      invoice {
        items {
          id
          retailer {
            id
            name
            type
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
            type
            address
            registrationNumber
            verified
            logo
            updatedAt
            createdAt
          }
          supplierID
          items {
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
      chatGroups {
        items {
          id
          name
          retailerID
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
      verified
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
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
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
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      supplierID
      supplierCompany {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
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
          chatGroup {
            id
            name
            retailerID
            supplierID
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          user {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
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
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
      user {
        id
        name
        role
        retailerCompanyID
        supplierCompanyID
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
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
          retailerCompanyID
          supplierCompanyID
          chatGroup {
            nextToken
          }
          contactNumber
          retailerCompany {
            id
            name
            type
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
            type
            address
            registrationNumber
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
      nextToken
    }
  }
`;
export const getProductListing = /* GraphQL */ `
  query GetProductListing($id: ID!) {
    getProductListing(id: $id) {
      id
      supplier {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
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
  }
`;
export const listProductListings = /* GraphQL */ `
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
          employees {
            nextToken
          }
          type
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
export const getProducts = /* GraphQL */ `
  query GetProducts($id: ID!) {
    getProducts(id: $id) {
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
export const listProductss = /* GraphQL */ `
  query ListProductss(
    $filter: ModelProductsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProductss(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getGoodsTask = /* GraphQL */ `
  query GetGoodsTask($id: ID!) {
    getGoodsTask(id: $id) {
      id
      retailer {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
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
      sentByRetailer
    }
  }
`;
export const listGoodsTasks = /* GraphQL */ `
  query ListGoodsTasks(
    $filter: ModelGoodsTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGoodsTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
        sentByRetailer
      }
      nextToken
    }
  }
`;
export const getPaymentTask = /* GraphQL */ `
  query GetPaymentTask($id: ID!) {
    getPaymentTask(id: $id) {
      id
      retailer {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
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
  }
`;
export const listPaymentTasks = /* GraphQL */ `
  query ListPaymentTasks(
    $filter: ModelPaymentTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPaymentTasks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
export const getInvoice = /* GraphQL */ `
  query GetInvoice($id: ID!) {
    getInvoice(id: $id) {
      id
      retailer {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
        address
        rating {
          numberOfRatings
          currentRating
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
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      retailerID
      supplier {
        id
        name
        employees {
          items {
            id
            name
            role
            retailerCompanyID
            supplierCompanyID
            contactNumber
            updatedAt
            createdAt
          }
          nextToken
        }
        type
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
        goodsTask {
          items {
            id
            retailerID
            supplierID
            updatedAt
            createdAt
            deliveryDate
            sentByRetailer
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
            updatedAt
            createdAt
            mostRecentMessage
            mostRecentMessageSender
          }
          nextToken
        }
        verified
        logo
        updatedAt
        createdAt
      }
      supplierID
      items {
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
export const listInvoices = /* GraphQL */ `
  query ListInvoices(
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvoices(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
        retailerCompanyID
        supplierCompanyID
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
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
        retailerCompanyID
        supplierCompanyID
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
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
export const productListingByRetailer = /* GraphQL */ `
  query ProductListingByRetailer(
    $supplierID: ID
    $productName: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productListingByRetailer(
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
          employees {
            nextToken
          }
          type
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
export const productListingByNameStartingWithLowestPrice = /* GraphQL */ `
  query ProductListingByNameStartingWithLowestPrice(
    $productName: String
    $lowPrice: ModelFloatKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelProductListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    productListingByNameStartingWithLowestPrice(
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
          employees {
            nextToken
          }
          type
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
export const purchaseOrderItems = /* GraphQL */ `
  query PurchaseOrderItems(
    $purchaseOrderID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelProductsFilterInput
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
    $filter: ModelGoodsTaskFilterInput
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
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
        sentByRetailer
      }
      nextToken
    }
  }
`;
export const goodsTaskForSupplierByDate = /* GraphQL */ `
  query GoodsTaskForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGoodsTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    goodsTaskForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
        sentByRetailer
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
    $filter: ModelPaymentTaskFilterInput
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
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
export const paymentsTaskForSupplierByDate = /* GraphQL */ `
  query PaymentsTaskForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPaymentTaskFilterInput
    $limit: Int
    $nextToken: String
  ) {
    paymentsTaskForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
    $filter: ModelInvoiceFilterInput
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
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
export const invoiceForSupplierByDate = /* GraphQL */ `
  query InvoiceForSupplierByDate(
    $supplierID: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelInvoiceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    invoiceForSupplierByDate(
      supplierID: $supplierID
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        retailer {
          id
          name
          employees {
            nextToken
          }
          type
          address
          rating {
            numberOfRatings
            currentRating
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
          type
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
          logo
          updatedAt
          createdAt
        }
        supplierID
        items {
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
