import {API, graphqlOperation} from 'aws-amplify';

import {
  getChatGroupsContainingRetailersByUpdatedAt,
  getChatGroupsContainingSuppliersByUpdatedAt,
  getChatGroupsContainingFarmersByUpdatedAt,
} from '_graphql/queries';
import {log} from '_utils';

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
