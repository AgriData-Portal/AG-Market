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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {log} from '_utils';

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
  log('chatID: ' + itemID);
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
          limit: 50,
        },
      });
      log('fetching messages');
      setNextToken(message.data.messagesInChatByDate.nextToken);
      var tempMessage = message.data.messagesInChatByDate.items;
      setMessages(tempMessage);
    } catch (e) {
      log(e);
      log("there's a problem");
    }
  };
  useEffect(() => {
    if (nextToken != null) {
      getMoreMessages();
    }
  }, [refresh]);
  useEffect(() => {
    fetchMessages();
    log('useEffect Triggered');
  }, []);

  useEffect(() => {
    const subscription = API.graphql(
      graphqlOperation(onCreateMessage),
    ).subscribe({
      next: data => {
        const newMessage = data.value.data.onCreateMessage;

        if (newMessage.chatGroupID != itemID) {
          log('Message is in another room!');
          return;
        }
        log(newMessage.senderID, props.user.id);

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
      log('updated last seen');
    } catch (e) {
      log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        log('no special connection created, creating one now');
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
    log(appState);
    if (Platform.OS === 'ios') {
      if (appState == 'inactive') {
        BackgroundTimer.runBackgroundTimer(() => {
          log('3 seconds');
          updateLastSeen();
        }, 100);
        setTimeout(() => {
          BackgroundTimer.stopBackgroundTimer();
          log('stop');
        }, 150);
      }
    }
    if (Platform.OS === 'android') {
      if (a == 0) {
        if (appState == 'background') {
          BackgroundTimer.runBackgroundTimer(() => {
            if (a == 0) {
              log('3seconds');
              updateLastSeen();
            }
            a = 1;
          }, 100);
          if (a == 1) {
            BackgroundTimer.stopBackgroundTimer();
            log('stop');
          }
        }
      }
    }
  }, [appState]);

  const getMoreMessages = async () => {
    setLoading(true);
    try {
      log(nextToken);
      const message = await API.graphql({
        query: messagesInChatByDate,
        variables: {
          chatGroupID: itemID,
          sortDirection: 'DESC',
          limit: 50,
          nextToken: nextToken,
        },
      });
      log('getting more messages');
      setNextToken(message.data.messagesInChatByDate.nextToken);

      var tempMessage = message.data.messagesInChatByDate.items;
      log(tempMessage);
      setMessages(oldmessages => oldmessages.concat(tempMessage));
    } catch (e) {
      log(e);
      log("there's a problem");
    }
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{
        height: hp('100%'),
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      <View style={{height: hp('80%')}}>
        <KeyboardAvoidingView
          style={{
            width: wp('100%'),
          }}
          behavior={Platform.OS === 'ios' ? 'position' : null}
          extraScrollHeight={Platform.OS == 'ios' ? hp('25%') : 0}
          keyboardVerticalOffset={Platform.OS === 'ios' ? hp('7%') : null}>
          {/* <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? hp('14%') : hp('12%')
        }  Keyboard Offset needs to be tested against multiple phones 
        style={{
          top: hp('3%'),
          height: hp('85%'),
          width: wp('95%'),
        }}> */}
          <View
            style={{
              height: hp('88%'),
            }}>
            <View
              style={{
                height: hp('80%'),
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
          </View>
          {/* </KeyboardAvoidingView> */}
        </KeyboardAvoidingView>
      </View>
      <View
        style={{
          width: wp('100%'),
        }}>
        <MessageInput
          userID={props.user.id}
          chatGroupID={itemID}
          userName={props.user.name}
          setMessages={setMessages}
          messages={messages}></MessageInput>
      </View>

      <Modal isVisible={loading}>
        <LoadingModal />
      </Modal>
    </SafeAreaView>
  );
};
