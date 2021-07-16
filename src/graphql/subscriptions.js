/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateProductListing = /* GraphQL */ `
  subscription OnCreateProductListing {
    onCreateProductListing {
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
export const onUpdateProductListing = /* GraphQL */ `
  subscription OnUpdateProductListing {
    onUpdateProductListing {
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
export const onDeleteProductListing = /* GraphQL */ `
  subscription OnDeleteProductListing {
    onDeleteProductListing {
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
export const onCreateProducts = /* GraphQL */ `
  subscription OnCreateProducts {
    onCreateProducts {
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
export const onUpdateProducts = /* GraphQL */ `
  subscription OnUpdateProducts {
    onUpdateProducts {
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
export const onDeleteProducts = /* GraphQL */ `
  subscription OnDeleteProducts {
    onDeleteProducts {
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
export const onCreateGoodsTask = /* GraphQL */ `
  subscription OnCreateGoodsTask {
    onCreateGoodsTask {
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
export const onUpdateGoodsTask = /* GraphQL */ `
  subscription OnUpdateGoodsTask {
    onUpdateGoodsTask {
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
export const onDeleteGoodsTask = /* GraphQL */ `
  subscription OnDeleteGoodsTask {
    onDeleteGoodsTask {
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
export const onCreatePaymentTask = /* GraphQL */ `
  subscription OnCreatePaymentTask {
    onCreatePaymentTask {
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
export const onUpdatePaymentTask = /* GraphQL */ `
  subscription OnUpdatePaymentTask {
    onUpdatePaymentTask {
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
export const onDeletePaymentTask = /* GraphQL */ `
  subscription OnDeletePaymentTask {
    onDeletePaymentTask {
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
export const onCreateInvoice = /* GraphQL */ `
  subscription OnCreateInvoice {
    onCreateInvoice {
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
export const onUpdateInvoice = /* GraphQL */ `
  subscription OnUpdateInvoice {
    onUpdateInvoice {
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
export const onDeleteInvoice = /* GraphQL */ `
  subscription OnDeleteInvoice {
    onDeleteInvoice {
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
