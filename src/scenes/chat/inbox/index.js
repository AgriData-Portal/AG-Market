import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {ChatList} from './components';
import {Searchbar} from './components';
import {NavBar, BackButton} from '_components';
import {
  getChatGroupsContainingRetailersByUpdatedAt,
  getChatGroupsContainingSuppliersByUpdatedAt,
} from '../../../graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';
import {DismissKeyboardView} from '_components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {onUpdateChatGroup} from '../../../graphql/subscriptions';
import {MenuButton} from '_components';

export const Inbox = props => {
  //console.log(props.user.role);
  const [chatRooms, setChatRooms] = useState(null);
  if (props.user.supplierCompanyID != null) {
    var companyID = props.user.supplierCompany.id;
    var companyType = 'supplier';
  } else if (props.user.retailerCompanyID != null) {
    var companyID = props.user.retailerCompany.id;
    var companyType = 'retailer';
  } else {
    var companyID = props.user.farmerCompany.id;
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
            supplierID: companyID,
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
      {/*<View
        style={{
          flexDirection: 'row',
          width: wp('100%'),
          height: hp('10%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            top: hp('3%'),
            left: wp('5%'),
          }}>
          <MenuButton
            navigation={props.navigation}
            updateAuthState={props.updateAuthState}
            userType={props.user.role}></MenuButton>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[Typography.header, {}]}>{Strings.inbox}</Text>
          <Text style={[Typography.normal, {color: Colors.GRAY_DARK}]}>
            5 {Strings.newMessages}
          </Text>
        </View>
        </View>*/}
      {/* <View
        style={{
          top: hp('1%'),
          width: wp('85%'),
          borderBottomWidth: 1,
          height: 0,
          borderColor: Colors.GRAY_MEDIUM,
        }}></View> */}
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
      {/*<View style={{position: 'absolute', top: hp('80%')}}>
        <NavBar navigation={props.navigation} />
      </View>*/}
    </SafeAreaView>
  );
};
