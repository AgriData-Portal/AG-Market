import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  KeyboardAvoidingView,
  AppState,
  SliderComponent,
  Platform,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {ChatBubbleList, MessageInput, ChatInfo} from './components';
import {NavBar, BackButton} from '_components';
import BackgroundTimer from 'react-native-background-timer';
import {listMessagesInChat} from '../../../graphql/queries';

import {API} from 'aws-amplify';

export const ChatRoom = props => {
  const userID = '461b570f-2557-4859-a450-76dd0e16ed35';

  const {itemID} = props.route.params; //chatgroupid
  const [messages, setMessages] = useState(null);
  const [appState, setAppState] = useState(AppState.currentState);
  const handleAppStateChange = state => {
    setAppState(state);
  };
  const fetchMessages = async () => {
    try {
      const message = await API.graphql({
        query: listMessagesInChat,
        variables: {
          filter: {chatGroupID: {eq: itemID}},
          sortDirection: 'ASC',
        },
      });
      if (message.data) {
        setMessages(message.data.listMessages.items);
      }
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
  };
  useEffect(() => {
    fetchMessages();
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
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}>
      {/* This is the Immovable chat name */}
      <View // This is for status bar on ios chat
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          top: Mixins.scaleHeight(-5),
          height: Mixins.scaleHeight(40),
          width: Mixins.scaleWidth(360),
          zIndex: 5,
        }}></View>

      <View
        style={{
          zIndex: 2,
          height: Mixins.scaleHeight(65),
          width: Mixins.scaleWidth(360),
          backgroundColor: 'white',
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            left: Mixins.scaleWidth(Spacing.BackButtonLeft),
            top: Mixins.scaleHeight(Spacing.BackButtonTop),
            backgroundColor: 'white',
          }}>
          <BackButton navigation={props.navigation} />
        </View>
        <Text style={[Typography.header, {top: Mixins.scaleHeight(30)}]}>
          Name of chat
        </Text>
        <View
          style={{
            position: 'absolute',
            top: Mixins.scaleHeight(30),
            right: Mixins.scaleWidth(15),
          }}>
          <ChatInfo />
        </View>

        <View
          style={{
            top: Mixins.scaleHeight(35),
            width: Mixins.scaleWidth(360),
            borderBottomWidth: 1,
            height: 0,
            borderColor: Colors.GRAY_MEDIUM,
          }}></View>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'ios'
            ? Mixins.scaleHeight(10)
            : Mixins.scaleHeight(40)
        } /* Keyboard Offset needs to be tested against multiple phones */
        style={{
          top: Mixins.scaleHeight(10),
          width: Mixins.scaleWidth(340),
        }}>
        <View
          style={{
            height: Mixins.scaleHeight(460),
          }}>
          <ChatBubbleList data={[{}, {}]} userID={userID} />
        </View>

        <View style={{top: Mixins.scaleHeight(0)}}>
          <MessageInput
            userID={userID}
            chatGroupID={itemID}
            user={'user'}
            setMessages={setMessages}
            messages={messages}></MessageInput>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const data = [
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
  {name: '1'},
];
