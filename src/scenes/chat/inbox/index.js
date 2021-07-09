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

export const Inbox = props => {
  const [chatRooms, setChatRooms] = useState(null);
  if (props.user.retailerCompanyID == null) {
    var companyID = props.user.supplierCompany.id;
    var companyType = 'supplier';
  } else {
    var companyID = props.user.retailerCompany.id;
    var companyType = 'retailer';
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
        /*try {
          console.log(chatRooms);
          var chatList = chatRooms;
          if (companyType == 'supplier') {
            if (chatRooms) {
              var removedList = chatList.filter(item => {
                console.log(item.id + '     ' + newMessage.id);
                return item.id != newMessage.id;
              });
              console.log('Updating chat');
              console.log(removedList);
              removedList = removedList.reverse();
              removedList.push(newMessage);
              removedList = removedList.reverse();
              console.log(removedList);
              setChatRooms(removedList);
            } else {
              console.log('chatroom is null');
            }
          } else {
            if (chatRooms) {
              var removedList = chatList.filter(item => {
                console.log(item.id + '     ' + newMessage.id);
                return item.id != newMessage.id;
              });
              console.log('Updating chat');
              console.log(removedList);
              removedList = removedList.reverse();
              removedList.push(newMessage);
              removedList = removedList.reverse();
              console.log(removedList);
              setChatRooms(removedList);
            } else {
              console.log('chatroom is null');
            }
          }
        } catch (e) {
          console.log(e);
        }*/
        /* 
      
        if (newMessage.id != itemID) {
          console.log('Message is in another room!');
          return;
        }
        console.log(newMessage.senderID, props.user.id);
        &*/

        /*var messageList = messages;

        messageList = messageList.reverse();
        messageList.push(newMessage);
        messageList = messageList.reverse();
        setMessages(messageList);*/
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
      } else {
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
      <Text style={[Typography.header, {top: hp('4%')}]}>{Strings.inbox}</Text>
      <Text
        style={[Typography.normal, {color: Colors.GRAY_DARK, top: hp('4%')}]}>
        5 {Strings.newMessages}
      </Text>
      <View
        style={{
          top: hp('5%'),
          width: wp('85%'),
          borderBottomWidth: 1,
          height: 0,
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
      <DismissKeyboardView>
        <View style={{top: hp('7%')}}>
          <Searchbar />
        </View>
      </DismissKeyboardView>

      <View
        style={{
          height: hp('62%'),
          width: wp('95%'),
          top: hp('9%'),
        }}>
        <ChatList
          data={chatRooms}
          navigation={props.navigation}
          companyType={companyType}
          userID={props.user.id}
        />
      </View>
      <View style={{position: 'absolute', top: hp('90%')}}>
        <NavBar navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
};
