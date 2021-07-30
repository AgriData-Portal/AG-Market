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

import {API, Storage} from 'aws-amplify';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {OrderQuotationModal} from './order-quotation';
import {PurchaseOrder} from './purchase-order';
import {BlueButton} from '_components';
import {log} from '_utils';

var dayjs = require('dayjs');

const ChatBubble = props => {
  const [orderQuotationModal, setOrderQuotationModal] = useState(false);
  const [purchaseOrderModal, setPurchaseOrderModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
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

  const createdAt = dayjs(props.createdAt).format('HH:mm D/M');
  const isMyMessage = () => {
    if (props.senderID == props.userID) return true;
    else return false;
  };
  const contentType = props.contentType;
  if (contentType == 'text') {
    return (
      <View style={{width: wp('100%')}}>
        {/* {!isMyMessage() && (
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
        )} */}
        <View
          style={{
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            borderRadius: 10,
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('2%'),
            marginVertical: hp('1%'),
            justifyContent: 'space-evenly',
            minWidth: wp('20%'),
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          }}>
          <Text
            style={[
              Typography.normal,
              {
                alignSelf: 'flex-start',
                maxWidth: wp('60%'),
              },
            ]}>
            {props.content}
          </Text>
          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                marginLeft: wp('10%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
      </View>
    );
  } else if (contentType == 'inquiry') {
    var content = props.content.split('+');
    return (
      <View>
        <View>
          {/* {!isMyMessage() && (
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
          )} */}
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('2%'),
            marginVertical: hp('1%'),
            width: wp('45%'),
            height: hp('19%'),
            borderRadius: 10,
            minWidth: wp('20%'),
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          }}>
          <Text
            style={[
              Typography.normal,
              {
                alignSelf: 'center',
              },
            ]}>
            {content[0]}
          </Text>
          <View
            style={{
              backgroundColor: Colors.GRAY_LIGHT,
              minWidth: wp('30%'),
              height: hp('11%'),
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text
              style={[
                Typography.small,
                {
                  maxWidth: wp('60%'),
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
                marginLeft: wp('10%'),
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
          {/* {!isMyMessage() && (
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
          )} */}
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            borderRadius: 10,
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('1%'),
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
            marginVertical: hp('1%'),
          }}>
          <Text style={[Typography.large]}>{Strings.purchaseOrder}</Text>
          <BlueButton
            onPress={() => setPurchaseOrderModal(true)}
            text={Strings.inspect}
            font={Typography.small}
            minWidth={wp('33%')}
            top={hp('0%')}
            borderRadius={10}
          />
          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                marginTop: hp('1%'),
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
          {/* {!isMyMessage() && (
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
          )} */}
        </View>
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            borderRadius: 10,
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('1%'),
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
            marginVertical: hp('1%'),
          }}>
          <Text style={[Typography.large]}>{Strings.orderQuotation}</Text>
          <BlueButton
            onPress={() => setOrderQuotationModal(true)}
            text={Strings.inspect}
            font={Typography.small}
            minWidth={wp('33%')}
            borderRadius={10}
          />

          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                marginTop: hp('1%'),
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
  } else if (contentType == 'image') {
    const [imageSource, setImageSource] = useState('');
    const getImage = async () => {
      try {
        const imageURL = await Storage.get(props.content);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        log(e);
      }
    };
    useEffect(() => {
      getImage();
    }, []);
    return (
      <View>
        <View>
          {/* {!isMyMessage() && (
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
          )} */}
        </View>
        <View
          style={{
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('2%'),
            marginVertical: hp('1%'),
            justifyContent: 'space-evenly',
            borderRadius: 10,
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          }}>
          <TouchableOpacity
            style={{
              height: wp('40%'),
              width: wp('40%'),
            }}
            onPress={() => {
              setImageModal(true);
            }}>
            <Image
              resizeMode="cover"
              style={{
                height: wp('40%'),
                width: wp('40%'),
                alignSelf: 'center',
              }}
              source={imageSource}
            />
          </TouchableOpacity>
          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                marginTop: wp('2%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
        <Modal
          isVisible={imageModal}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={() => setImageModal(false)}>
          <Image
            source={imageSource}
            resizeMode="cover"
            style={{
              alignSelf: 'center',
              height: hp('75%'),
              width: wp('75%'),
            }}
          />
        </Modal>
      </View>
    );
  } else if (contentType == 'store') {
    const storeDetails = props.content.split('+');
    log(storeDetails);
    return (
      <View>
        <View>
          {/* {!isMyMessage() && (
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
          )} */}
        </View>
        <View
          style={{
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_MEDIUM,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            minWidth: wp('45%'),
            height: hp('19%'),
            borderRadius: 10,
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('2%'),
            marginVertical: hp('1%'),
            justifyContent: 'space-evenly',
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
          }}>
          <Text
            style={[
              Typography.small,
              {
                top: hp('-1%'),
                textAlign: 'center',
                width: wp('40%'),
              },
            ]}>
            Come and view my store by pressing the image!
          </Text>
          {isMyMessage() ? (
            <View>
              <Image
                source={require('_assets/images/supermarket.png')}
                style={{
                  width: wp('20%'),
                  height: hp('6%'),
                  resizeMode: 'contain',
                  top: hp('1%'),
                  alignSelf: 'center',
                }}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('store', {
                  itemId: storeDetails[0],
                  storeName: storeDetails[1],
                });
              }}>
              <Image
                source={require('_assets/images/supermarket.png')}
                style={{
                  width: wp('20%'),
                  height: hp('6%'),
                  resizeMode: 'contain',
                  top: hp('1%'),
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          )}

          <Text
            style={[
              Typography.small,
              {
                alignSelf: 'flex-end',
                marginTop: hp('2.5%'),
              },
            ]}>
            {createdAt}
          </Text>
        </View>
      </View>
    );
  }
};

export const ChatBubbleList = props => {
  return (
    <View>
      <FlatList
        inverted={true}
        keyExtractor={item => item.id}
        data={props.data}
        numColumns={1}
        onEndReached={() => {
          props.setRefresh(state => state + 1);
          log('endReached');
        }}
        onEndReachedThreshold={0.6}
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
              navigation={props.navigation}
            />
          );
        }}
      />
      {/* </ScrollView> */}
    </View>
  );
};
