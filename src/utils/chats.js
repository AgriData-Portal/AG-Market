import {API, graphqlOperation, Storage} from 'aws-amplify';

import {
  getChatGroupsContainingRetailersByUpdatedAt,
  getChatGroupsContainingSuppliersByUpdatedAt,
  getChatGroupsContainingFarmersByUpdatedAt,
} from '_graphql/queries';

import {
  createMessage,
  updateChatGroup,
  updateMessage,
  createGoodsTaskBetweenRandS,
  createGoodsTaskBetweenSandF,
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
