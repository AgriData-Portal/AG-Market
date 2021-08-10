import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';

import Modal from 'react-native-modal';

import {API, Storage} from 'aws-amplify';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {OrderQuotationModal} from '../order-quotation/order-quotation';
import {PurchaseOrder} from '../purchase-order/purchase-order';
import {BlueButton} from '_components';
import {log} from '_utils';
import {userStore} from '_store';

var dayjs = require('dayjs');

const ChatBubble = props => {
  const userID = userStore(state => state.userID);
  const [orderQuotationModal, setOrderQuotationModal] = useState(false);
  const [purchaseOrderModal, setPurchaseOrderModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [nameColour, setNameColour] = useState('black');

  const mapColour = () => {
    var colourObject = props.colourID;
    var counter = 0;

    //get the user id
    //check whether user id is a value in the JSON
    //if yes, get the key of that value
    //if no

    if (props.senderID != userID)
      try {
        for (let i = 0; i < colourObject.length; i++) {
          counter = counter + 1;
          if (colourObject[i].id == props.senderID) {
            setNameColour(colourObject[i].colour);
            return false;
          } else if (colourObject[i].id == '') {
            setNameColour(colourObject[i].colour);
            colourObject[i].id = props.senderID;
            props.setColourID(colourObject);
            return false;
          }
        }
      } catch (e) {
        log(e);
      }
  };
  useEffect(() => mapColour(), []);
  const createdAt = dayjs(props.createdAt).format('HH:mm D/M');
  const isMyMessage = () => {
    if (props.senderID == userID) return true;
    else return false;
  };
  const contentType = props.contentType;
  if (contentType == 'text') {
    return (
      <View style={{width: wp('100%')}}>
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
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
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
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
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
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
          <Text style={Typography.normal}>{props.id}</Text>
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
            id={props.id}
            content={props.content}
            chatName={props.chatName}
            setPurchaseOrderModal={setPurchaseOrderModal}
            chatGroupID={props.chatGroupID}
            setMessages={props.setMessages}
            messages={props.messages}></PurchaseOrder>
        </Modal>
      </View>
    );
  } else if (contentType == 'quotation') {
    //DESIGN the colour and position
    return (
      <View>
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
        <View
          style={{
            justifyContent: 'space-evenly',
            alignItems: 'center',
            backgroundColor: isMyMessage() ? '#DCF8C5' : Colors.GRAY_DARK,
            left: isMyMessage() ? wp('-4%') : wp('4%'),
            borderRadius: 10,
            paddingHorizontal: wp('4%'),
            paddingVertical: hp('1%'),
            alignSelf: isMyMessage() ? 'flex-end' : 'flex-start',
            marginVertical: hp('1%'),
          }}>
          <View
            style={{
              position: 'absolute',
              right: 0,
              height: hp('2%'),
              width: hp('2%'),
              borderRadius: 100,
              backgroundColor: props.content.includes('Accepted')
                ? Colors.LIME_GREEN
                : props.content.includes('Declined')
                ? Colors.FAIL
                : Colors.GRAY_LIGHT,
            }}
          />
          <View style={{flexDirection: 'row'}}>
            <Text style={[Typography.large]}>{Strings.orderQuotation}</Text>
          </View>

          {/* DESIGN decide how to display the PO and Quotation chat bubble*/}
          <Text style={Typography.normal}>{props.id}</Text>
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
            id={props.id}
            chatName={props.chatName}
            content={props.content}
            sender={props.sender}
            content={props.content}
            senderID={props.senderID}
            contentType={props.contentType}
            createdAt={props.createdAt}
            messages={props.messages}
            setMessages={props.setMessages}
            setOrderQuotationModal={setOrderQuotationModal}
            chatGroupID={props.chatGroupID}></OrderQuotationModal>
        </Modal>
      </View>
    );
  } //BUG image not appearing properly on click
  else if (contentType == 'image') {
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
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
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

    return (
      <View>
        {!isMyMessage() && (
          <Text
            style={{
              color: nameColour,
              fontWeight: 'bold',
              textAlign: 'left',
              left: isMyMessage() ? wp('-4%') : wp('4%'),
              top: hp('1%'),
            }}>
            {props.sender}
          </Text>
        )}
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

const ChatBubbleList = props => {
  //TODO build a store for containing all the messages
  const [trigger, setTrigger] = useState(false);
  const [colourID, setColourID] = useState([
    {colour: '#D25BD2', id: ''},
    {colour: '#D25B7B', id: ''},
    {colour: '#E0912C', id: ''},
    {colour: '#9CD25B', id: ''},
    {colour: '#D2CE5B', id: ''},
    {colour: '#FA7D7D', id: ''},
    {colour: '#765BD2', id: ''},
    {colour: '#5BB9D2', id: ''},
  ]);
  return (
    <View>
      <FlatList
        inverted={true}
        keyExtractor={item => item.id}
        data={props.data}
        initialNumToRender={10}
        numColumns={1}
        onEndReached={() => {
          props.setRefresh(state => state + 1);
          log('endReached');
        }}
        onEndReachedThreshold={0.6}
        renderItem={({item}) => {
          return (
            <ChatBubble
              id={item.id}
              sender={item.sender}
              content={item.content}
              senderID={item.senderID}
              createdAt={item.createdAt}
              contentType={item.type}
              chatName={props.chatName}
              chatGroupID={props.chatGroupID}
              setMessages={props.setMessages}
              messages={props.messages}
              navigation={props.navigation}
              colourID={colourID}
              setColourID={setColourID}
            />
          );
        }}
      />
      {/* </ScrollView> */}
    </View>
  );
};

export default ChatBubbleList;
