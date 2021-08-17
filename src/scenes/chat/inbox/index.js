import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';

import {ChatList} from './components';
import {Searchbar} from './components';

import {
  getChatGroupsContainingRetailersByUpdatedAt,
  getChatGroupsContainingSuppliersByUpdatedAt,
  getChatGroupsContainingFarmersByUpdatedAt,
} from '../../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import {DismissKeyboardView} from '_components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {onUpdateChatGroup} from '../../../graphql/subscriptions';
import {log} from '_utils';
import {versionStore, companyStore} from '_store';
import {UpdateAppModal} from '_components';
import Modal from 'react-native-modal';

export const Inbox = props => {
  const companyType = companyStore(state => state.companyType);
  const companyID = companyStore(state => state.companyID);
  const [chatRooms, setChatRooms] = useState(null);
  const updateStatus = versionStore(state => state.updateStatus);
  const [updateModal, setUpdateModal] = useState(false);

  useEffect(() => {
    if (updateStatus == 'forceUpdate' || updateStatus == 'updateLater') {
      setUpdateModal(true);
    }
  }, [updateStatus]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      log('Refreshed!');
      fetchChats();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    log(chatRooms);
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatGroup),
    ).subscribe({
      next: data => {
        const newMessage = data.value.data.onUpdateChatGroup;
        fetchChats();
      },
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchChats = async () => {
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
        setChatRooms(
          chats.data.getChatGroupsContainingRetailersByUpdatedAt.items,
        );
      } else if (companyType == 'supplier') {
        const chats = await API.graphql({
          query: getChatGroupsContainingSuppliersByUpdatedAt,
          variables: {
            supplierID: companyID,
            sortDirection: 'DESC',
          },
        });
        log('fetching chats');
        setChatRooms(
          chats.data.getChatGroupsContainingSuppliersByUpdatedAt.items,
        );
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
        setChatRooms(
          chats.data.getChatGroupsContainingFarmersByUpdatedAt.items,
        );
      }
    } catch (e) {
      log(e);
      log("there's a problem");
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <DismissKeyboardView>
        <View style={{top: hp('0%')}}>
          <Searchbar />
        </View>
      </DismissKeyboardView>

      <View
        style={{
          height: hp('70%'),
          width: wp('95%'),
          top: hp('0%'),
        }}>
        <ChatList data={chatRooms} navigation={props.navigation} />
      </View>
      <Modal isVisible={updateModal}>
        <UpdateAppModal setUpdateModal={setUpdateModal} />
      </Modal>
    </SafeAreaView>
  );
};
