import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {API} from 'aws-amplify';
import {
  createMessage,
  deleteChatGroupUsers,
  updateChatGroup,
} from '../../../../graphql/mutations';
import {listUsersInChat} from '../../../../graphql/queries';

import {abs, set} from 'react-native-reanimated';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {OrderQuotationModal} from './order-quotation';
import {PurchaseOrder} from './purchase-order';

var dayjs = require('dayjs');

const ChatBubble = props => {
  const [orderQuotationModal, setOrderQuotationModal] = useState(false);
  const [purchaseOrderModal, setPurchaseOrderModal] = useState(false);
  const [inquiryModal, setInquiryModal] = useState(false);
  const getInitials = name => {
    if (name) {
      let initials = name.split(' ');

      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }

      return initials.toUpperCase();
    } else {
      return null;
    }
  };

  const createdAt = dayjs(props.createdAt).add(8, 'hour').format('HH:mm D/M');
  const isMyMessage = () => {
    if (props.senderID == props.userID) return true;
    else return false;
  };
  const contentType = props.contentType;
  if (contentType == 'text') {
    return (
      <View style={{margin: wp('2%')}}>
        {!isMyMessage() && (
          <View
            style={{
              top: hp('3%'),
              borderColor: 'white',
              borderWidth: 0.2,
              width: wp('8%'),
              height: wp('8%'),
              position: 'absolute',
              borderRadius: 100,
              justifyContent: 'center',
              backgroundColor: Colors.GRAY_WHITE,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text
              style={{
                color: Colors.GRAY_DARK,
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              {getInitials(props.sender)}
            </Text>
          </View>
        )}
        <View
          style={{
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_LIGHT,
            marginLeft: isMyMessage() ? wp('13%') : wp('2%'),

            borderRadius: 15,
            left: isMyMessage() ? wp('20%') : wp('9%'),
            width: isMyMessage() ? wp('60%') : wp('50%'),
          }}>
          <View style={{marginTop: hp('2%')}}>
            <Text
              style={[Typography.normal, {margin: wp('1%'), left: wp('2%')}]}>
              {props.content}
            </Text>
            <Text
              style={[
                Typography.small,
                {alignSelf: 'flex-end', right: wp('3%')},
              ]}>
              {createdAt}
            </Text>
          </View>
        </View>
      </View>
    );
  } else if (contentType == 'inquiry') {
    var content = props.content.split('+');
    return (
      <View>
        <View>
          {!isMyMessage() && (
            <View
              style={{
                left: wp('1%'),
                top: hp('16%'),
                borderColor: 'white',
                borderWidth: 0.2,
                width: wp('8%'),
                height: wp('8%'),
                position: 'absolute',
                borderRadius: 100,
                justifyContent: 'center',
                backgroundColor: Colors.GRAY_WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Text
                style={{
                  color: Colors.GRAY_DARK,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {getInitials(props.sender)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            marginLeft: isMyMessage() ? wp('40%') : 0,
            marginRight: isMyMessage() ? 0 : wp('33%'),
            left: isMyMessage() ? wp('5%') : wp('12%'),
            marginTop: hp('1%'),
            width: wp('45%'),
            height: hp('19%'),
            borderRadius: 10,
          }}>
          <Text
            style={[
              Typography.normal,
              {
                top: hp('0%'),
                textAlign: 'center',
              },
            ]}>
            {content[0]}
          </Text>
          <View
            style={{
              backgroundColor: Colors.GRAY_LIGHT,
              width: wp('40%'),
              height: hp('11%'),
              alignItems: 'center',
              top: hp('0%'),
              borderRadius: 10,
            }}>
            <Text
              style={[
                Typography.small,
                {
                  top: hp('1%'),
                },
              ]}>
              {Strings.grade}: {content[3]}
              {'\n'}
              {Strings.variety}: {content[2]}
              {'\n'}
              {Strings.price}: <Text style={{color: 'red'}}> {content[1]}</Text>
              {'\n'}
              MOQ: 50
            </Text>
          </View>

          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                right: wp('3%'),
                top: hp('1%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
      </View>
    );
  } else if (contentType == 'purchaseorder') {
    return (
      <View>
        <View>
          {!isMyMessage() && (
            <View
              style={{
                left: wp('1%'),
                top: hp('8%'),
                borderColor: 'white',
                borderWidth: 0.2,
                width: wp('8%'),
                height: wp('8%'),
                position: 'absolute',
                borderRadius: 100,
                justifyContent: 'center',
                backgroundColor: Colors.GRAY_WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Text
                style={{
                  color: Colors.GRAY_DARK,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {getInitials(props.sender)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            width: wp('50%'),
            height: hp('13%'),
            marginLeft: isMyMessage() ? wp('40%') : 0,
            marginRight: isMyMessage() ? 0 : wp('33%'),
            left: isMyMessage() ? wp('5%') : wp('12%'),
            borderRadius: 15,
            marginTop: hp('1%'),
          }}>
          <Text style={[Typography.large]}>{Strings.purchaseOrder}</Text>

          <TouchableOpacity
            onPress={() => setPurchaseOrderModal(true)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('33%'),
              height: hp('3%'),
              top: hp('1%'),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text style={[Typography.small]}>{Strings.inspect}</Text>
          </TouchableOpacity>

          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                right: wp('3%'),
                top: hp('1.5%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
        <Modal isVisible={purchaseOrderModal}>
          <PurchaseOrder
            chatName={props.chatName}
            type={props.type}
            setPurchaseOrderModal={setPurchaseOrderModal}
            chatGroupID={props.chatGroupID}
            userID={props.userID}
            setMessages={props.setMessages}
            messages={props.messages}
            userName={props.userName}></PurchaseOrder>
        </Modal>
      </View>
    );
  } else if (contentType == 'quotation') {
    return (
      <View>
        <View>
          {!isMyMessage() && (
            <View
              style={{
                left: wp('1%'),
                top: hp('8%'),
                borderColor: 'white',
                borderWidth: 0.2,
                width: wp('8%'),
                height: wp('8%'),
                position: 'absolute',
                borderRadius: 100,
                justifyContent: 'center',
                backgroundColor: Colors.GRAY_WHITE,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}>
              <Text
                style={{
                  color: Colors.GRAY_DARK,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>
                {getInitials(props.sender)}
              </Text>
            </View>
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            width: wp('50%'),
            height: hp('13%'),
            marginLeft: isMyMessage() ? wp('40%') : 0,
            marginRight: isMyMessage() ? 0 : wp('33%'),
            left: isMyMessage() ? wp('5%') : wp('12%'),
            borderRadius: 15,
            marginTop: hp('1%'),
          }}>
          <Text style={[Typography.large]}>{Strings.orderQuotation}</Text>

          <TouchableOpacity
            onPress={() => setOrderQuotationModal(true)}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('33%'),
              height: hp('3%'),
              top: hp('1%'),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <Text style={[Typography.small]}>{Strings.inspect}</Text>
          </TouchableOpacity>

          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                right: wp('3%'),
                top: hp('1.5%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
        <Modal
          isVisible={orderQuotationModal}
          onBackdropPress={() => setOrderQuotationModal(false)}>
          <OrderQuotationModal
            chatName={props.chatName}
            type={props.type}
            userID={props.userID}
            userName={props.userName}
            setOrderQuotationModal={setOrderQuotationModal}
            chatGroupID={props.chatGroupID}></OrderQuotationModal>
        </Modal>
      </View>
    );
  }
};

export const ChatBubbleList = props => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    console.log('refreshing');
    setRefreshing(true);
    props.setRefresh(state => state + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <FlatList
          inverted={true}
          keyExtractor={item => item.id}
          data={props.data}
          numColumns={1}
          renderItem={item => {
            return (
              <ChatBubble
                sender={item.item.sender}
                content={item.item.content}
                senderID={item.item.senderID}
                createdAt={item.item.createdAt}
                userID={props.userID}
                contentType={item.item.type}
                contentID={item.item.uniqueContentID}
                chatName={props.chatName}
                chatGroupID={props.chatGroupID}
                type={props.type}
                userName={props.userName}
                setMessages={props.setMessages}
                messages={props.messages}
              />
            );
          }}
        />
      </ScrollView>
    </View>
  );
};
