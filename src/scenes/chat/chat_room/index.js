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
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChatBubbleList, MessageInput, ChatInfo} from './components';
import BackgroundTimer from 'react-native-background-timer';
import {messagesInChatByDate} from '../../../graphql/queries';
import {onCreateMessage} from '../../../graphql/subscriptions';
import {
  createChatGroupUsers,
  updateChatGroupUsers,
} from '../../../graphql/mutations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import {API, graphqlOperation} from 'aws-amplify';

var dayjs = require('dayjs');

export const ChatRoom = props => {
  const type = props.type;
  const {itemID, chatName} = props.route.params; //props.route.params; //chatgroupid
  console.log('chatID: ' + itemID);
  const [messages, setMessages] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const [nextToken, setNextToken] = useState(null);
  const [refresh, setRefresh] = useState(0);
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
        /*var messageList = messages;

        messageList = messageList.reverse();
        messageList.push(newMessage);
        messageList = messageList.reverse();
        setMessages(messageList);*/
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
  let a = 0;
  useEffect(() => {
    console.log(appState);
    if (Platform.OS === 'ios') {
      if (appState == 'inactive') {
        BackgroundTimer.runBackgroundTimer(() => {
          console.log('3 seconds');
        }, 3000);
        setTimeout(() => {
          BackgroundTimer.stopBackgroundTimer();
          console.log('stop');
        }, 4000);
      }
    }
    if (Platform.OS === 'android') {
      if (a == 0) {
        if (appState == 'background') {
          BackgroundTimer.runBackgroundTimer(() => {
            if (a == 0) {
              console.log('3seconds');
            }
            a = 1;
          }, 3000);
          if (a == 1) {
            BackgroundTimer.stopBackgroundTimer();
            console.log('stop');
          }
        }
      }
    }
  }, [appState]);

  const updateLastSeen = async () => {
    const uniqueID = props.user.id + itemID;
    try {
      const updatedLastSeen = await API.graphql({
        query: updateChatGroupUsers,
        variables: {input: {id: uniqueID, lastOnline: dayjs()}},
      });
      console.log('updated last seen');
      props.navigation.navigate('inbox');
    } catch (e) {
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
        props.navigation.navigate('inbox');
      }
    }
  };

  const getMoreMessages = async () => {
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
          Platform.OS === 'ios' ? hp('3%') : hp('3%')
        } /* Keyboard Offset needs to be tested against multiple phones */
        style={{
          top: hp('6%'),
          width: wp('95%'),
        }}>
        <View
          style={{
            height: hp('72%'),
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
          />
        </View>

        <View style={{top: hp('3%')}}>
          <MessageInput
            userID={props.user.id}
            chatGroupID={itemID}
            userName={props.user.name}
            setMessages={setMessages}
            messages={messages}></MessageInput>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
