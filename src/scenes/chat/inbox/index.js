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

export const Inbox = props => {
  //console.log(props.user.role);
  const [chatRooms, setChatRooms] = useState(null);
  if (props.user.supplierCompanyID != null) {
    var companyID = props.user.supplierCompanyID;
    var companyType = 'supplier';
  } else if (props.user.retailerCompanyID != null) {
    var companyID = props.user.retailerCompanyID;
    var companyType = 'retailer';
  } else {
    var companyID = props.user.farmerCompanyID;
    var companyType = 'farmer';
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('Refreshed!');
      fetchChats();
    });
    return unsubscribe;
  }, [props.navigation]);

  useEffect(() => {
    console.log(chatRooms);
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
        console.log('fetching chats');
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
        console.log('fetching chats');
        setChatRooms(
          chats.data.getChatGroupsContainingSuppliersByUpdatedAt.items,
        );
      } else {
        const chats = await API.graphql({
          query: getChatGroupsContainingFarmersByUpdatedAt,
          variables: {
            farmerID: companyID,
            sortDirection: 'DESC',
          },
        });
        console.log('fetching chats');
        setChatRooms(
          chats.data.getChatGroupsContainingFarmersByUpdatedAt.items,
        );
      }
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
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
        <View style={{top: hp('2%')}}>
          <Searchbar />
        </View>
      </DismissKeyboardView>

      <View
        style={{
          height: hp('70%'),

          width: wp('95%'),
          top: hp('2%'),
        }}>
        <ChatList
          data={chatRooms}
          navigation={props.navigation}
          companyType={companyType}
          userID={props.user.id}
        />
      </View>
    </SafeAreaView>
  );
};
