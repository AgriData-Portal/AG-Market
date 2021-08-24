//Library Imports
import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {API, graphqlOperation} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

//Component Imports
import {ChatList} from './components';
import {Searchbar} from './components';
import {DismissKeyboardView} from '_components';
import {UpdateAppModal} from '_components';

//Function Imports
import {onUpdateChatGroup} from '_graphql/subscriptions';
import {chatRoom, log} from '_utils';

//Store Imports
import {versionStore, companyStore} from '_store';

//Translation Imports
import Strings from '_utils';

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
      chatRoom
        .fetchChats(companyType, companyID)
        .then(data => setChatRooms(data));
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onUpdateChatGroup),
    ).subscribe({
      next: data => {
        const newMessage = data.value.data.onUpdateChatGroup;
        chatRoom
          .fetchChats(companyType, companyID)
          .then(data => setChatRooms(data));
      },
    });

    return () => subscription.unsubscribe();
  }, []);

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
