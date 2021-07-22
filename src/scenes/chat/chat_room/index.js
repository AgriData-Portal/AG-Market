import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  AppState,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {LoadingModal} from '_components';
import {ChatBubbleList, MessageInput, ChatInfo} from './components';
import BackgroundTimer from 'react-native-background-timer';
import {messagesInChatByDate} from '../../../graphql/queries';
import {onCreateMessage} from '../../../graphql/subscriptions';
import {
  updateChatGroupUsers,
  createChatGroupUsers,
} from '../../../graphql/mutations';
import Modal from 'react-native-modal';
var dayjs = require('dayjs');
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import {API, graphqlOperation} from 'aws-amplify';

export const ChatRoom = props => {
  if (props.user.retailerCompanyID != null) {
    var type = 'retailer';
  } else if (props.user.supplierCompanyID != null) {
    var type = 'supplier';
  } else {
    var type = 'farmer';
  }

  const {itemID, chatName} = props.route.params; //props.route.params; //chatgroupid
  console.log('chatID: ' + itemID);
  const [messages, setMessages] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [nextToken, setNextToken] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [loading, setLoading] = useState(false);
  const handleAppStateChange = state => {
    setAppState(state);
  };
  const fetchMessages = async () => {
    try {
      const message = await API.graphql({
        query: messagesInChatByDate,
        variables: {
          chatGroupID: itemID,
          sortDirection: 'DESC',
          limit: 10,
        },
      });
      console.log('fetching messages');
      setNextToken(message.data.messagesInChatByDate.nextToken);
      var tempMessage = message.data.messagesInChatByDate.items;
      setMessages(tempMessage);
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
  };
  useEffect(() => {
    if (nextToken != null) {
      getMoreMessages();
    }
  }, [refresh]);
  useEffect(() => {
    fetchMessages();
    console.log('useEffect Triggered');
  }, [itemID]);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage),
    ).subscribe({
      next: data => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatGroupID != itemID) {
          console.log('Message is in another room!');
          return;
        }
        console.log(newMessage.senderID, props.user.id);

        setMessages(messages => [newMessage, ...messages]);
      },
    });

    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const updateLastSeen = async () => {
    const uniqueID = props.user.id + itemID;
    try {
      const updatedLastSeen = await API.graphql({
        query: updateChatGroupUsers,
        variables: {input: {id: uniqueID, lastOnline: dayjs()}},
      });
      console.log('updated last seen');
    } catch (e) {
      console.log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        console.log('no special connection created, creating one now');
        const createLastSeen = await API.graphql({
          query: createChatGroupUsers,
          variables: {
            input: {
              id: uniqueID,
              lastOnline: dayjs(),
              userID: props.user.id,
              chatGroupID: itemID,
            },
          },
        });
      }
    }
  };

  let a = 0;
  useEffect(() => {
    console.log(appState);
    if (Platform.OS === 'ios') {
      if (appState == 'inactive') {
        BackgroundTimer.runBackgroundTimer(() => {
          console.log('3 seconds');
          updateLastSeen();
        }, 100);
        setTimeout(() => {
          BackgroundTimer.stopBackgroundTimer();
          console.log('stop');
        }, 150);
      }
    }
    if (Platform.OS === 'android') {
      if (a == 0) {
        if (appState == 'background') {
          BackgroundTimer.runBackgroundTimer(() => {
            if (a == 0) {
              console.log('3seconds');
              updateLastSeen();
            }
            a = 1;
          }, 100);
          if (a == 1) {
            BackgroundTimer.stopBackgroundTimer();
            console.log('stop');
          }
        }
      }
    }
  }, [appState]);

  const getMoreMessages = async () => {
    setLoading(true);
    try {
      console.log(nextToken);
      const message = await API.graphql({
        query: messagesInChatByDate,
        variables: {
          chatGroupID: itemID,
          sortDirection: 'DESC',
          limit: 10,
          nextToken: nextToken,
        },
      });
      console.log('getting more messages');
      setNextToken(message.data.messagesInChatByDate.nextToken);

      var tempMessage = message.data.messagesInChatByDate.items;
      console.log(tempMessage);
      setMessages(oldmessages => oldmessages.concat(tempMessage));
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      {/* This is the Immovable chat name 
      {Platform.OS == 'ios' ? (
        <View // This is for status bar on ios chat
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            top: hp('-1%'),
            height: hp('7%'),
            width: wp('100%'),
            zIndex: 5,
          }}></View>
      ) : (
        <View></View>
      )}

      <View
        style={{
          zIndex: 2,
          height: hp('10%'),
          width: wp('100%'),
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            left: wp('6%'),
            top: hp('3.5%'),
          }}>
          <TouchableOpacity
            onPress={() => [updateLastSeen(), console.log('test123')]}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="arrow-back-outline" size={wp('7%')} />
          </TouchableOpacity>
        </View>
        {props.user.retailerCompanyID == null ? (
          <Text style={[Typography.header, {top: hp('3%')}]}>{chatName}</Text>
        ) : (
          <TouchableOpacity
            style={{top: hp('3%')}}
            onPress={() =>
              props.navigation.navigate('store', {
                itemId: itemID.slice(36, 72),
              })
            }>
            <Text style={[Typography.header]}>{chatName}</Text>
          </TouchableOpacity>
        )}

        <View
          style={{
            position: 'absolute',
            top: hp('-1%'),
            right: wp('5%'),
          }}>
          <ChatInfo chatGroupID={itemID} />
        </View>

        <View
          style={{
            top: hp('6%'),
            width: wp('100%'),
            borderBottomWidth: 1,
            height: 0,
            borderColor: Colors.GRAY_MEDIUM,
          }}></View>
      </View>*/}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? hp('14%') : hp('12%')
        } /* Keyboard Offset needs to be tested against multiple phones */
        style={{
          top: hp('3%'),
          height: hp('85%'),
          width: wp('95%'),
        }}>
        <View
          style={{
            height: hp('75%'),
          }}>
          <ChatBubbleList
            data={messages}
            userID={props.user.id}
            userName={props.user.name}
            chatName={chatName}
            chatGroupID={itemID}
            type={type}
            setMessages={setMessages}
            messages={messages}
            setRefresh={setRefresh}
            navigation={props.navigation}
          />
        </View>
        <View style={{top: hp('2.5%')}}>
          <MessageInput
            userID={props.user.id}
            chatGroupID={itemID}
            userName={props.user.name}
            setMessages={setMessages}
            messages={messages}></MessageInput>
        </View>
      </KeyboardAvoidingView>
      <Modal isVisible={loading}>
        <LoadingModal />
      </Modal>
    </SafeAreaView>
  );
};
