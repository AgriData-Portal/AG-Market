import {API, Storage} from 'aws-amplify';

import {
  listSupplierListings,
  listFarmerListings,
  supplierListingByNameStartingWithLowestPrice,
  farmerListingByNameStartingWithLowestPrice,
  getSupplierCompany,
  getFarmerCompany,
  listRetailerCompanys,
  listSupplierCompanys,
} from '_graphql/queries';

import {
  createMessage,
  createChatGroup,
  updateChatGroup,
  createProductsInPurchaseOrder,
  updateSupplierCompany,
  updateFarmerCompany,
  updateRetailerCompany,
  updateProductsInPurchaseOrder,
  createSupplierListing,
  createFarmerListing,
} from '_graphql/mutations';
import {log} from '_utils';

var dayjs = require('dayjs');

//global marketplace functions

export const fetchProducts = async (companyType, searchValue) => {
  try {
    if (companyType == 'retailer') {
      const products = await API.graphql({
        query: supplierListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase().trim(),
          sortDirection: 'ASC',
        },
      });
      log(products);
      if (products.data.supplierListingByNameStartingWithLowestPrice) {
        log('Products: \n');
        log(products.data.supplierListingByNameStartingWithLowestPrice.items);

        return products.data.supplierListingByNameStartingWithLowestPrice.items;
      }
    } else if (companyType == 'supplier') {
      const products = await API.graphql({
        query: farmerListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase().trim(),
          sortDirection: 'ASC',
        },
      });
      log(products);
      if (products.data.farmerListingByNameStartingWithLowestPrice) {
        log('Products: \n');
        log(products.data.farmerListingByNameStartingWithLowestPrice.items);

        return products.data.farmerListingByNameStartingWithLowestPrice.items;
      }
    }
  } catch (e) {
    log(e);
    log("there's a problem");
  }
};

export const getAllListings = async companyType => {
  //EDIT NODEMODULES FOR SEARCHABLE DROPDOWN AND DELETE ALL NAME IN ITEM.NAME
  try {
    if (companyType == 'retailer') {
      const listings = await API.graphql({
        query: listSupplierListings,
      });
      log(listings.data.listSupplierListings.items);
      var responseList = listings.data.listSupplierListings.items;
      responseList = responseList.map(item => {
        return item.productName.toUpperCase();
      });

      log(responseList);
      var array = Array.from(new Set(responseList));
      array.sort();
      return array;
    } else if (companyType) {
      const listings = await API.graphql({
        query: listFarmerListings,
      });
      log(listings.data.listFarmerListings.items);
      var responseList = listings.data.listFarmerListings.items;
      responseList = responseList.map(item => {
        return item.productName.toUpperCase();
      });

      log(responseList);
      var array = Array.from(new Set(responseList));
      array.sort();
      return array;
    }
  } catch (e) {
    log(e);
  }
};

export const getFirstTenListings = async companyType => {
  try {
    if (companyType == 'retailer') {
      const listings = await API.graphql({
        query: listSupplierListings,
        variables: {
          limit: 10,
        },
      });
      log(listings.data.listSupplierListings.items);

      return listings.data.listSupplierListings.items;
    } else if (companyType == 'supplier') {
      const listings = await API.graphql({
        query: listFarmerListings,
        variables: {
          limit: 10,
        },
      });
      log(listings.data.listFarmerListings.items);

      return listings.data.listFarmerListings.items;
    }
  } catch (e) {
    log(e);
  }
};

export const sendProductInquiry = async (
  companyType,
  companyName,
  companyID,
  sellerID,
  userName,
  userID,
  seller,
  productName,
  lowPrice,
  highPrice,
  variety,
  grade,
) => {
  log(seller, 'cyan');
  try {
    log('test', 'cyan');

    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: companyID + sellerID,
          mostRecentMessage: 'Product Inquiry',
          mostRecentMessageSender: userName,
        },
      },
    });

    log('chat group already exist');
  } catch (e) {
    log('tester');
    log(e, 'magenta');
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      try {
        var chatGroup;
        if (companyType == 'retailer') {
          chatGroup = {
            id: companyID + sellerID,
            name: companyName + '+' + seller.name,
            retailerID: companyID,
            supplierID: sellerID,
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: userName,
          };
          log(chatGroup, 'red');
        } else if (companyType == 'supplier') {
          chatGroup = {
            id: companyID + sellerID,
            name: companyName + '+' + seller.name,
            supplierID: companyID,
            farmerID: sellerID,
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: userName,
          };
          log(chatGroup, 'red');
        }
        log(chatGroup, 'red');
        const createdChatGroup = await API.graphql({
          query: createChatGroup,
          variables: {input: chatGroup},
        });

        log(createdChatGroup);
      } catch (e) {
        log(e, 'yellow');
      }
    } else {
      log(e, 'blue');
    }
  }

  log('creating product inquiry');

  const inquiry = {
    chatGroupID: companyID + sellerID,
    type: 'inquiry',
    content:
      productName +
      '+' +
      lowPrice +
      '-' +
      highPrice +
      '+' +
      variety +
      '+' +
      grade,
    sender: userName,
    senderID: userID,
  };
  try {
    const message = await API.graphql({
      query: createMessage,
      variables: {input: inquiry},
    });
    log(message.data.createMessage);
  } catch {
    e => log(e);
  }
};

//store functions

export const fetchStoreProducts = async (companyType, itemId) => {
  try {
    if (companyType == 'retailer') {
      const supplier = await API.graphql({
        query: getSupplierCompany,
        variables: {id: itemId},
      });
      return supplier.data.getSupplierCompany;
    } else {
      const supplier = await API.graphql({
        query: getFarmerCompany,
        variables: {id: itemId},
      });
      return supplier.data.getFarmerCompany;
    }
  } catch (e) {
    log(e);
  }
};

export const updateFavourites = async (
  companyFavouriteStores,
  itemId,
  storeName,
  companyID,
  companyType,
) => {
  try {
    var currentFavList = companyFavouriteStores;
    if (currentFavList != null) {
      currentFavList.push({id: itemId, name: storeName});
      if (companyType == 'retailer') {
        var updated = await API.graphql({
          query: updateRetailerCompany,
          variables: {
            input: {
              id: companyID,
              favouriteStores: currentFavList,
            },
          },
        });
      } else {
        var updated = await API.graphql({
          query: updateSupplierCompany,
          variables: {
            input: {
              id: companyID,
              favouriteStores: currentFavList,
            },
          },
        });
      }

      log('success');
    } else {
      if (companyType == 'retailer') {
        var updated = await API.graphql({
          query: updateRetailerCompany,
          variables: {
            input: {
              id: companyID,
              favouriteStores: [{id: itemId, name: storeName}],
            },
          },
        });
      } else {
        var updated = await API.graphql({
          query: updateSupplierCompany,
          variables: {
            input: {
              id: companyID,
              favouriteStores: [{id: itemId, name: storeName}],
            },
          },
        });
      }

      log('success');
    }
  } catch (e) {
    log(e);
  }
};

export const unfavourite = async (
  companyFavouriteStores,
  itemId,
  companyID,
) => {
  try {
    var currentFavList = companyFavouriteStores;
    log(currentFavList.length);
    currentFavList.forEach((item, index, arr) => {
      if (item.id == itemId) {
        arr.splice(index, 1);
      }
    });
    log(currentFavList.length);
    if (companyType == 'retailer') {
      var updated = await API.graphql({
        query: updateRetailerCompany,
        variables: {
          input: {
            id: companyID,
            favouriteStores: currentFavList,
          },
        },
      });
    } else {
      var updated = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: companyID,
            favouriteStores: currentFavList,
          },
        },
      });
    }

    log('success');
  } catch (e) {
    log(e);
  }
};

export const sendStoreProductInquiry = async (
  purchaseOrder,
  userName,
  companyName,
  storeName,
  companyID,
  userID,
  productName,
  lowPrice,
  highPrice,
  variety,
  grade,
) => {
  try {
    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: purchaseOrder,
          mostRecentMessage: 'Product Inquiry',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('chat group already exist');
  } catch (e) {
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      try {
        var chatGroup;
        if (companyType == 'retailer') {
          chatGroup = {
            id: purchaseOrder,
            name: companyName + '+' + storeName,
            retailerID: companyID,
            supplierID: purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: userName,
          };
        } else {
          chatGroup = {
            id: purchaseOrder,
            name: companyName + '+' + storeName,
            supplierID: companyID,
            farmerID: purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: userName,
          };
        }

        const createdChatGroup = await API.graphql({
          query: createChatGroup,
          variables: {input: chatGroup},
        });
      } catch (e) {
        log(e.errors[0].errorType);
      }
    } else {
      log(e.errors[0].errorType);
    }
  }

  log('creating product inquiry');

  const inquiry = {
    chatGroupID: purchaseOrder,
    type: 'inquiry',
    content:
      productName +
      '+' +
      lowPrice +
      '-' +
      highPrice +
      '+' +
      variety +
      '+' +
      grade,
    sender: userName,
    senderID: userID,
  };
  try {
    const message = await API.graphql({
      query: createMessage,
      variables: {input: inquiry},
    });

    setInquirySuccessfulModal(true);
  } catch {
    e => log(e);
  }
  setProductInquire(false);
};

export const addToPurchaseOrder = async (
  purchaseOrder,
  id,
  productName,
  siUnit,
  grade,
  variety,
  POList,
  desiredQuantity,
) => {
  log('addingToPO ' + purchaseOrder);
  try {
    const added = await API.graphql({
      query: createProductsInPurchaseOrder,
      variables: {
        input: {
          id: id + '@' + purchaseOrder,
          purchaseOrderID: purchaseOrder,
          name: productName,
          quantity: parseInt(desiredQuantity),
          siUnit: siUnit,
          grade: grade,
          variety: variety,
        },
      },
    });

    var poList = POList;

    poList.push(added.data.createProductsInPurchaseOrder);
    return poList;
  } catch (e) {
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      try {
        const updated = await API.graphql({
          query: updateProductsInPurchaseOrder,
          variables: {
            input: {
              id: id + '@' + purchaseOrder,
              quantity: parseInt(desiredQuantity),
            },
          },
        });

        var poList = POList;

        poList.forEach((item, index, arr) => {
          if (item.id == id + '@' + purchaseOrder) {
            log('found');
            arr[index] = updated.data.updateProductsInPurchaseOrder;
          }
        });
        log('\n hey \n');
        log(poList);

        //this was for fixing the front end instant update

        // if (trigger) {
        //   setTrigger(false);
        // } else {
        //   setTrigger(true);
        // }
        // setPOList(poList);
        return poList;
      } catch (e) {
        log(e);
      }
    }
    log(e);
  }
};

export const sendPO = async (
  POList,
  purchaseOrder,
  storeName,
  companyType,
  companyID,
  userName,
  userID,
) => {
  var message = '';
  const arrLength = POList.length;
  POList.forEach((item, index, arr) => {
    message = message + (item.id + '+');
    message = message + (item.name + '+');
    message = message + (item.quantity + '+');
    message = message + (item.siUnit + '+');
    message = message + (item.variety + '+');
    message = message + item.grade;
    if (index < arrLength - 1) {
      message = message + '/';
    }
  });

  try {
    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: purchaseOrder,
          mostRecentMessage: 'Purchase Order',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('chat group already exist');
  } catch (e) {
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      try {
        var chatGroup;
        if (companyType == 'retailer') {
          log('retailer here!');
          chatGroup = {
            id: purchaseOrder,
            name: companyName + '+' + storeName,
            retailerID: companyID,
            supplierID: purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Purchase Order',
            mostRecentMessageSender: userName,
          };
        } else {
          log('supplier here!');
          chatGroup = {
            id: purchaseOrder,
            name: companyName + '+' + storeName,
            supplierID: companyID,
            farmerID: purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Purchase Order',
            mostRecentMessageSender: userName,
          };
        }
        log(chatGroup);
        log('created');
        const createdChatGroup = await API.graphql({
          query: createChatGroup,
          variables: {input: chatGroup},
        });
        log(createdChatGroup);
      } catch (e) {
        log(e.errors[0].errorType);
      }
    }
  }
  var mostRecentPurchaseOrderNumber;
  try {
    if (companyType == 'retailer') {
      const response = await API.graphql({
        query: getSupplierCompany,
        variables: {id: purchaseOrder.slice(36, 72)},
      });
      mostRecentPurchaseOrderNumber =
        response.data.getSupplierCompany.mostRecentPurchaseOrderNumber;

      if (mostRecentPurchaseOrderNumber) {
        if (
          dayjs().format('YYYY-MM') ==
          mostRecentPurchaseOrderNumber.slice(4, 11)
        ) {
          var number = parseInt(mostRecentPurchaseOrderNumber.slice(12, 16));
          var numberString = (number + 1).toString().padStart(4, '0');
          mostRecentPurchaseOrderNumber =
            'P.O-' + dayjs().format('YYYY-MM-') + numberString;
        } else {
          mostRecentPurchaseOrderNumber =
            'P.O-' + dayjs().format('YYYY-MM-') + '0001';
        }
      } else {
        mostRecentPurchaseOrderNumber =
          'P.O-' + dayjs().format('YYYY-MM-') + '0001';
      }

      log('creating purchase order');
      const supplierCompanyUpdate = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: purchaseOrder.slice(36, 72),
            mostRecentPurchaseOrderNumber: mostRecentPurchaseOrderNumber,
          },
        },
      });
    } else {
      const response = await API.graphql({
        query: getFarmerCompany,
        variables: {id: purchaseOrder.slice(36, 72)},
      });
      mostRecentPurchaseOrderNumber =
        response.data.getFarmerCompany.mostRecentPurchaseOrderNumber;

      if (mostRecentPurchaseOrderNumber) {
        if (
          dayjs().format('YYYY-MM') ==
          mostRecentPurchaseOrderNumber.slice(4, 11)
        ) {
          var number = parseInt(mostRecentPurchaseOrderNumber.slice(12, 16));
          var numberString = (number + 1).toString().padStart(4, '0');
          mostRecentPurchaseOrderNumber =
            'P.O-' + dayjs().format('YYYY-MM-') + numberString;
        } else {
          mostRecentPurchaseOrderNumber =
            'P.O-' + dayjs().format('YYYY-MM-') + '0001';
        }
      } else {
        mostRecentPurchaseOrderNumber =
          'P.O-' + dayjs().format('YYYY-MM-') + '0001';
      }

      log('creating purchase order');
      const supplierCompanyUpdate = await API.graphql({
        query: updateFarmerCompany,
        variables: {
          input: {
            id: purchaseOrder.slice(36, 72),
            mostRecentPurchaseOrderNumber: mostRecentPurchaseOrderNumber,
          },
        },
      });
    }
  } catch (e) {
    log(e);
  }

  try {
    const inquiry = {
      chatGroupID: purchaseOrder,
      type: mostRecentPurchaseOrderNumber,
      content: message,
      sender: userName,
      senderID: userID,
    };
    const messageSent = await API.graphql({
      query: createMessage,
      variables: {input: inquiry},
    });
  } catch (e) {
    log(e);
    log('fail');
  }
};

export const checkPOForInvalidInputs = POList => {
  var positiveQuantity = true;

  POList.forEach((item, index, arr) => {
    if (item.quantity <= 0 || isNaN(item.quantity)) {
      positiveQuantity = false;
    }
  });
  return positiveQuantity;
};

//supplier store

export const fetchSupplierStoreProducts = async (companyType, companyID) => {
  try {
    if (companyType == 'supplier') {
      const products = await API.graphql({
        query: listSupplierListings,
        variables: {filter: {supplierID: {eq: companyID}}},
      });

      if (products.data.listSupplierListings) {
        log('Products: \n');
        log(products);
        return products.data.listSupplierListings.items;
      }
    } else {
      const products = await API.graphql({
        query: listFarmerListings,
        variables: {filter: {farmerID: {eq: companyID}}},
      });

      if (products.data.listFarmerListings) {
        log('Products: \n');
        log(products);
        return products.data.listFarmerListings.items;
      }
    }
  } catch (e) {
    log(e);
    log("there's a problem");
  }
};

export const addListing = async (
  imageSource,
  productName,
  variety,
  companyName,
  companyType,
  companyID,

  quantityAvailable,
  minPrice,
  maxPrice,
  grade,
  value2,
  moq,
) => {
  try {
    let photo = imageSource;
    const response = await fetch(photo.uri);
    const blob = await response.blob();
    log('FileName: \n');
    photo.fileName = productName + '_' + variety + '_' + companyName;
    await Storage.put(photo.fileName, blob, {
      contentType: 'image/jpeg',
    });

    if (companyType == 'supplier') {
      var listing = {
        supplierID: companyID,
        productName: productName.toUpperCase(),
        variety: variety,
        quantityAvailable: parseInt(quantityAvailable),
        lowPrice: parseFloat(minPrice),
        highPrice: parseFloat(maxPrice),
        minimumQuantity: parseInt(moq),
        productPicture: photo.fileName,
        grade: grade,
        siUnit: value2,
      };
      const productListing = await API.graphql({
        query: createSupplierListing,
        variables: {input: listing},
      });

      listing.productPicture = {uri: photo.uri};

      return productListing.data.createSupplierListing;
    } else {
      var listing = {
        farmerID: companyID,
        productName: productName.toUpperCase(),
        variety: variety,
        quantityAvailable: parseInt(quantityAvailable),
        lowPrice: parseFloat(minPrice),
        highPrice: parseFloat(maxPrice),
        minimumQuantity: parseInt(moq),
        productPicture: photo.fileName,
        grade: grade,
        siUnit: value2,
      };
      const productListing = await API.graphql({
        query: createFarmerListing,
        variables: {input: listing},
      });

      listing.productPicture = {uri: photo.uri};

      return productListing.data.createFarmerListing;
    }
    log('Added product');
  } catch (e) {
    log(e);
  }
};

export const sendStoreDetails = async (
  companyID,
  id,
  userName,
  name,
  companyName,
  userID,
) => {
  try {
    log(id + companyID);
    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: id + companyID,
          mostRecentMessage: 'Store Catalog',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('chat group already exist');
    log(name);
  } catch (e) {
    log(e);
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      try {
        const chatGroup = {
          id: id + companyID,
          name: name + '+' + companyName,
          retailerID: id,
          supplierID: companyID,
          mostRecentMessage: 'Store Catalog',
          mostRecentMessageSender: userName,
        };
        log(chatGroup);
        const createdChatGroup = await API.graphql({
          query: createChatGroup,
          variables: {input: chatGroup},
        });
        log(createdChatGroup);
      } catch (e) {
        log(e.errors[0].errorType);
      }
    } else {
      log(e.errors[0].errorType);
    }
  }

  log('creating store ' + companyName);

  const store = {
    chatGroupID: id + companyID,
    type: 'store',
    content: companyID + '+' + companyName,
    sender: userName,
    senderID: userID,
  };
  try {
    const message = await API.graphql({
      query: createMessage,
      variables: {input: store},
    });
    log(message.data.createMessage);
  } catch {
    e => log(e);
  }
};

export const getAllSupermarkets = async companyType => {
  try {
    if (companyType == 'supplier') {
      const listRetailer = await API.graphql({
        query: listRetailerCompanys,
      });

      return listRetailer.data.listRetailerCompanys.items;
    } else {
      const listSupplier = await API.graphql({
        query: listSupplierCompanys,
      });

      return listSupplier.data.listSupplierCompanys.items;
    }
  } catch (e) {
    log(e);
  }
};
