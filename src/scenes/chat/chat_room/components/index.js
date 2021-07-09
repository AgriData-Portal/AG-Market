import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {
  QuotationItemsContext,
  QuotationItemsProvider,
} from './quotationContext';
import {API} from 'aws-amplify';
import {
  createMessage,
  createOrderQuotation,
  deleteChatGroupUsers,
  updateOrderQuotation,
  updateChatGroup,
  createGoodsTask,
} from '../../../../graphql/mutations';
import {
  getOrderQuotation,
  listUsersInChat,
  purchaseOrderItems,
} from '../../../../graphql/queries';

var dayjs = require('dayjs');
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import {ChatBubbleList} from './chat-bubbles';
import {ChatInfo} from './chat-info';

export {ChatBubbleList, ChatInfo};

export const MessageInput = props => {
  const [message, setMessage] = useState('');
  const createNewMessage = async () => {
    console.log('creating new message');
    try {
      const newMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            senderID: props.userID,
            chatGroupID: props.chatGroupID,
            sender: props.userName,
            type: 'text',
            content: message,
          },
        },
      });
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage: message,
            mostRecentMessageSender: props.user,
          },
        },
      });
      /*var messages = props.messages;
      messages = messages.reverse();
      messages.push(newMessage.data.createMessage);
      messages = messages.reverse();
      props.setMessages(messages); */
      setMessage('');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
      <View
        style={{
          height: hp('7%'),
          borderRadius: 40,
          backgroundColor: Colors.GRAY_LIGHT,

          justifyContent: 'center',
        }}>
        <TextInput
          placeholderTextColor={Colors.GRAY_DARK}
          placeholder={Strings.typeMessage}
          underlineColorAndroid={'transparent'}
          multiline={true}
          onChangeText={text => setMessage(text)}
          value={message}
          style={{
            width: wp('74%'),
            height: hp('5%'),
            borderBottomColor: 'transparent',
            marginHorizontal: wp('3%'),
            color: 'black',
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          if (message.length > 0) {
            createNewMessage();
          }
        }}
        style={{
          height: hp('5.5%'),
          width: hp('5.5%'),
          borderRadius: 100,
          top: hp('1%'),
          left: wp('3%'),
          backgroundColor: Colors.PALE_BLUE,
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Icon
          name="paper-plane-outline"
          size={wp('6%')}
          color={Colors.LIGHT_BLUE}
        />
      </TouchableOpacity>
    </View>
  );
};

const ProductInquiry2 = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.GRAY_LIGHT,
        borderWidth: Mixins.scaleWidth(3),
        borderColor: Colors.GRAY_MEDIUM,
        width: Mixins.scaleWidth(230),
        height: Mixins.scaleHeight(100),
      }}>
      <Image
        style={{
          width: Mixins.scaleWidth(80),
          marginRight: Mixins.scaleWidth(10),
          resizeMode: 'contain',
        }}
        source={require('_assets/images/agridata.png')}></Image>
      <View>
        <Text
          style={[
            Typography.large,
            {
              margin: Mixins.scaleWidth(5),
              marginBottom: Mixins.scaleHeight(1),
              marginTop: Mixins.scaleHeight(-20),
            },
          ]}>
          Product
        </Text>
        <Text
          style={[
            Typography.small,
            {
              margin: Mixins.scaleWidth(5),
              marginTop: Mixins.scaleHeight(-3),
            },
          ]}>
          Price: <Text style={{color: 'red'}}> RM5-8/kg</Text> {'\n'}
          MOQ: 50 {'\n'}
          Available: 1000
        </Text>
        <Text
          style={[
            Typography.small,
            {
              alignSelf: 'flex-end',
              marginRight: Mixins.scaleWidth(5),
              marginBottom: Mixins.scaleHeight(-30),
            },
          ]}>
          16.50 - Read
        </Text>
      </View>
    </View>
  );
};
