import {API, graphqlOperation, Storage} from 'aws-amplify';

import {
  getChatGroupsContainingRetailersByUpdatedAt,
  getChatGroupsContainingSuppliersByUpdatedAt,
  getChatGroupsContainingFarmersByUpdatedAt,
  getSupplierCompany,
  getFarmerCompany,
  messagesInChatByDate,
} from '_graphql/queries';

import {
  createMessage,
  updateChatGroup,
  updateMessage,
  createGoodsTaskBetweenRandS,
  createGoodsTaskBetweenSandF,
  updateSupplierCompany,
  updateFarmerCompany,
} from '_graphql/mutations';
import {log} from '_utils';

var dayjs = require('dayjs');
// Inbox Functions

export const fetchChats = async (companyType, companyID) => {
  log('fetching chats from the new function');
  try {
    if (companyType == 'retailer') {
      const chats = await API.graphql({
        query: getChatGroupsContainingRetailersByUpdatedAt,
        variables: {
          retailerID: companyID,
          sortDirection: 'DESC',
        },
      });
      log('fetching chats');
      return chats.data.getChatGroupsContainingRetailersByUpdatedAt.items;
    } else if (companyType == 'supplier') {
      const chats = await API.graphql({
        query: getChatGroupsContainingSuppliersByUpdatedAt,
        variables: {
          supplierID: companyID,
          sortDirection: 'DESC',
        },
      });
      log('fetching chats');
      return chats.data.getChatGroupsContainingSuppliersByUpdatedAt.items;
    } else {
      log('imafarmer');
      const chats = await API.graphql({
        query: getChatGroupsContainingFarmersByUpdatedAt,
        variables: {
          farmerID: companyID,
          sortDirection: 'DESC',
        },
      });
      log('fetching chats');
      log(chats.data.getChatGroupsContainingFarmersByUpdatedAt.items);
      return chats.data.getChatGroupsContainingFarmersByUpdatedAt.items;
    }
  } catch (e) {
    log(e);
    log("there's a problem");
  }
};

export const getChatName = (
  companyType,
  companyID,
  chatLongName,
  chatGroupID,
) => {
  var chatName;
  if (companyType == 'supplier') {
    if (chatGroupID.slice(0, 36) == companyID) {
      chatName = chatLongName[1];
    } else {
      chatName = chatLongName[0];
    }
  } else if (companyType == 'retailer') {
    chatName = chatLongName[1];
  } else if (companyType == 'farmer') {
    chatName = chatLongName[0];
  }

  return chatName;
};

// Chat Room Functions

export const createNewMessage = async (
  userID,
  chatGroupID,
  userName,
  message,
) => {
  log('creating new message');
  try {
    const newMessage = await API.graphql({
      query: createMessage,
      variables: {
        input: {
          senderID: userID,
          chatGroupID: chatGroupID,
          sender: userName,
          type: 'text',
          content: message,
        },
      },
    });
    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: chatGroupID,
          mostRecentMessage: message,
          mostRecentMessageSender: userName,
        },
      },
    });
  } catch (e) {
    log(e);
  }
};

export const uploadImage = async (
  imageSource,
  chatGroupID,
  userID,
  userName,
) => {
  try {
    let photo = imageSource;
    log(photo);
    const response = await fetch(photo);
    const blob = await response.blob();
    log('FileName: \n');
    var fileName = chatGroupID + dayjs().format('YYYYMMDDhhmmss');
    await Storage.put(fileName, blob, {
      contentType: 'image/jpeg',
    });
    log(userID, chatGroupID, userName, fileName);
    const newMessage = await API.graphql({
      query: createMessage,
      variables: {
        input: {
          senderID: userID,
          chatGroupID: chatGroupID,
          sender: userName,
          type: 'image',
          content: fileName,
        },
      },
    });
    const updateChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: chatGroupID,
          mostRecentMessage: 'Image',
          mostRecentMessageSender: userName,
        },
      },
    });
  } catch (e) {
    log(e);
  }
};

export const fetchQuotation = content => {
  log(content);
  try {
    var quotation = content.split(':');
    var items = quotation[0].split('/');
    items.forEach((item, index, arr) => {
      var temp = item.split('+');
      var itemObject = {};
      itemObject['id'] = temp[0];
      itemObject['name'] = temp[1];
      itemObject['quantity'] = temp[2];
      itemObject['siUnit'] = temp[3];
      itemObject['variety'] = temp[4];
      itemObject['grade'] = temp[5];
      itemObject['price'] = temp[6];
      arr[index] = itemObject;
    });
    var tempObject = {};
    tempObject['items'] = items;
    tempObject['sum'] = quotation[1];
    tempObject['logisticsProvided'] = quotation[2] == 'true' ? true : false;
    tempObject['paymentTerms'] = quotation[3];
    {
      quotation.length == 5
        ? (tempObject['status'] = quotation[4])
        : (tempObject['status'] = 'New');
    }
    return tempObject;
  } catch (e) {
    log(e);
  }
};

export const reject = async (
  chatGroupID,
  id,
  content,
  userName,
  userID,
  messages,
  contentType,
  sender,
  senderID,
  createdAt,
) => {
  try {
    const rejectionMessage = await API.graphql({
      query: createMessage,
      variables: {
        input: {
          chatGroupID: chatGroupID,
          type: 'text',
          content: 'The quotation has been rejected. Please re-negotiate',
          senderID: userID,
          sender: userName,
        },
      },
    });
    const updatedMessage = await API.graphql({
      query: updateMessage,
      variables: {
        input: {
          id: id,
          content: content + ':Declined',
        },
      },
    });
    log('message sent');
  } catch (e) {
    log(e);
  }
  try {
    const updatedChatGroup = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: chatGroupID,
          mostRecentMessage:
            'The quotation has been rejected. Please re-negotiate',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('chat group update successful');
  } catch (e) {
    log(e);
  }
  var messages = messages;
  log('messages', messages);
  messages.forEach((item, index, array) => {
    if (item.id == id) {
      log('found');
      array[index] = {
        id: id,
        chatGroupID: chatGroupID,
        type: contentType,
        content: content + ':Declined',
        sender: sender,
        senderID: senderID,
        createdAt: createdAt,
      };
    }
  });

  return messages;
};

export const accept = async (
  chatGroupID,
  userID,
  userName,
  id,
  content,
  contentType,
  sender,
  senderID,
  createdAt,
  messages,
  companyType,
  orderDetails,
) => {
  try {
    const acceptanceMessage = await API.graphql({
      query: createMessage,
      variables: {
        input: {
          chatGroupID: chatGroupID,
          type: 'text',
          content:
            'The quotation has been accepted. Task has been added to to-do',
          senderID: userID,
          sender: userName,
        },
      },
    });
    const updatedMessage = await API.graphql({
      query: updateMessage,
      variables: {
        input: {
          id: id,
          content: content + ':Accepted',
        },
      },
    });
    log('message sent');
  } catch (e) {
    log(e);
  }
  try {
    const updatedChatGroup = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: chatGroupID,
          mostRecentMessage:
            'The quotation has been accepted. Task has been added to to-do',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('chat group update successful');
  } catch (e) {
    log(e);
  }

  try {
    if (companyType == 'retailer') {
      const goodsTask = await API.graphql({
        query: createGoodsTaskBetweenRandS,
        variables: {
          input: {
            id: id,
            trackingNum: contentType,
            items: orderDetails.items,
            logisticsProvided: orderDetails.logisticsProvided,
            paymentTerms: orderDetails.paymentTerms,
            retailerID: chatGroupID.slice(0, 36),
            supplierID: chatGroupID.slice(36, 72),
          },
        },
      });
    } else {
      const goodsTask = await API.graphql({
        query: createGoodsTaskBetweenSandF,
        variables: {
          input: {
            id: id,
            trackingNum: contentType,
            items: orderDetails.items,
            logisticsProvided: orderDetails.logisticsProvided,
            paymentTerms: orderDetails.paymentTerms,
            supplierID: chatGroupID.slice(0, 36),
            farmerID: chatGroupID.slice(36, 72),
          },
        },
      });
    }
    log('goods task created');
    var messages = messages;
    log(messages);
    messages.forEach((item, index, array) => {
      if (item.id == id) {
        log('found');
        array[index] = {
          id: id,
          chatGroupID: chatGroupID,
          type: contentType,
          content: content + ':Accepted',
          sender: sender,
          senderID: senderID,
          createdAt: createdAt,
        };
      }
    });
    return messages;
  } catch (e) {
    log(e);
  }
};

export const sendQuotation = async (
  chatGroupID,
  companyType,
  quotationItems,
  userName,
  userID,
  sum,
  deliveryValue,
  paymentValue,
) => {
  var mostRecentQuotationNumber;
  try {
    if (companyType == 'supplier') {
      const response = await API.graphql({
        query: getSupplierCompany,
        variables: {id: chatGroupID.slice(36, 72)},
      });
      mostRecentQuotationNumber =
        response.data.getSupplierCompany.mostRecentQuotationNumber;
      log('newnum: ' + mostRecentQuotationNumber);
      if (mostRecentQuotationNumber) {
        if (
          dayjs().format('YYYY-MM') == mostRecentQuotationNumber.slice(4, 11)
        ) {
          var number = parseInt(mostRecentQuotationNumber.slice(12, 16));
          var numberString = (number + 1).toString().padStart(4, '0');
          mostRecentQuotationNumber =
            'QUO-' + dayjs().format('YYYY-MM-') + numberString;
        } else {
          mostRecentQuotationNumber =
            'QUO-' + dayjs().format('YYYY-MM-') + '0001';
        }
      } else {
        mostRecentQuotationNumber =
          'QUO-' + dayjs().format('YYYY-MM-') + '0001';
      }
      log('updatednum: ' + mostRecentQuotationNumber);

      log('creating purchase order');
      const supplierCompanyUpdate = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: chatGroupID.slice(36, 72),
            mostRecentQuotationNumber: mostRecentQuotationNumber,
          },
        },
      });
    } else if (companyType == 'farmer') {
      const response = await API.graphql({
        query: getFarmerCompany,
        variables: {id: chatGroupID.slice(36, 72)},
      });
      mostRecentQuotationNumber =
        response.data.getFarmerCompany.mostRecentQuotationNumber;
      log('newnum: ' + mostRecentQuotationNumber);
      if (mostRecentQuotationNumber) {
        if (
          dayjs().format('YYYY-MM') == mostRecentQuotationNumber.slice(4, 11)
        ) {
          var number = parseInt(mostRecentQuotationNumber.slice(12, 16));
          var numberString = (number + 1).toString().padStart(4, '0');
          mostRecentQuotationNumber =
            'QUO-' + dayjs().format('YYYY-MM-') + numberString;
        } else {
          mostRecentQuotationNumber =
            'QUO-' + dayjs().format('YYYY-MM-') + '0001';
        }
      } else {
        mostRecentQuotationNumber =
          'QUO-' + dayjs().format('YYYY-MM-') + '0001';
      }
      log('updatednum: ' + mostRecentQuotationNumber);

      log('creating purchase order');
      const farmerCompanyUpdate = await API.graphql({
        query: updateFarmerCompany,
        variables: {
          input: {
            id: chatGroupID.slice(36, 72),
            mostRecentQuotationNumber: mostRecentQuotationNumber,
          },
        },
      });
    }
  } catch (e) {
    log(e);
  }

  var message = '';
  var tempList = quotationItems;
  tempList.forEach((item, index, array) => {
    message = message + (item.id + '+');
    message = message + (item.name + '+');
    message = message + (item.quantity + '+');
    message = message + (item.siUnit + '+');
    message = message + (item.variety + '+');
    message = message + (item.grade + '+');
    message = message + (item.price + '+');
    if (index < tempList.length - 1) {
      message = message + '/';
    }
  });
  message =
    message + ':' + sum.toString() + ':' + deliveryValue + ':' + paymentValue;
  log('removing key and value pairs like index for order quotation');
  log(message);

  try {
    log('sending order quotation');
    const createdMessage = await API.graphql({
      query: createMessage,
      variables: {
        input: {
          chatGroupID: chatGroupID,
          type: mostRecentQuotationNumber,
          content: message,
          sender: userName,
          senderID: userID,
        },
      },
    });
    log('message created');
    const updatedChat = await API.graphql({
      query: updateChatGroup,
      variables: {
        input: {
          id: chatGroupID,
          mostRecentMessage: 'Quotation',
          mostRecentMessageSender: userName,
        },
      },
    });
    log('Updated chat');
  } catch (e) {
    log(e);
  }
};
