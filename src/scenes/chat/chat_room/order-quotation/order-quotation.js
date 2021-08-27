/*



need to add farmer ability



*/

import React, {useState, useContext, useEffect} from 'react';
import {View, TouchableOpacity, FlatList, Text} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';

import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {API} from 'aws-amplify';
import {
  createMessage,
  updateChatGroup,
  createGoodsTaskBetweenRandS,
  updateMessage,
  createGoodsTaskBetweenSandF,
} from '../../../../graphql/mutations';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {SuccessfulModal, UnsuccessfulModal} from '_components/modals';
import {BlueButton} from '_components';
import {log} from '_utils';
import {userStore, companyStore} from '_store';
import {Font} from '_components';

export const OrderQuotationModal = props => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [succesfulModal, setSuccesfulModal] = useState(false);
  const [unsuccesfulModal, setUnsuccesfulModal] = useState(false);
  const [acceptButton, setAcceptButton] = useState(false);
  const [declineButton, setDeclineButton] = useState(false);
  const companyType = companyStore(state => state.companyType);
  const userID = userStore(state => state.userID);
  const companyID = companyStore(state => state.companyID);
  const userName = userStore(state => state.userName);
  useEffect(() => {
    fetchQuotation();
  }, []);
  const fetchQuotation = () => {
    log(props.content);
    try {
      var quotation = props.content.split(':');
      var items = quotation[0].split('/');
      items.forEach((item, index, arr) => {
        var temp = item.split('+');
        var itemObject = {};
        itemObject['id'] = temp[0];
        itemObject['name'] = temp[1];
        itemObject['quantity'] = temp[2];
        itemObject['siUnit'] = temp[3];
        itemObject['variety'] = temp[4];
        itemObject['grade'] = temp[5];
        itemObject['price'] = temp[6];
        arr[index] = itemObject;
      });
      var tempObject = {};
      tempObject['items'] = items;
      tempObject['sum'] = quotation[1];
      tempObject['logisticsProvided'] = quotation[2] == 'true' ? true : false;
      tempObject['paymentTerms'] = quotation[3];
      {
        quotation.length == 5
          ? (tempObject['status'] = quotation[4])
          : (tempObject['status'] = 'New');
      }
      setOrderDetails(tempObject);
    } catch (e) {
      log(e);
    }
  };
  const reject = async () => {
    try {
      const rejectionMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            chatGroupID: props.chatGroupID,
            type: 'text',
            content: 'The quotation has been rejected. Please re-negotiate',
            senderID: userID,
            sender: userName,
          },
        },
      });
      const updatedMessage = await API.graphql({
        query: updateMessage,
        variables: {
          input: {
            id: props.id,
            content: props.content + ':Declined',
          },
        },
      });
      log('message sent');
    } catch (e) {
      log(e);
    }
    try {
      const updatedChatGroup = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage:
              'The quotation has been rejected. Please re-negotiate',
            mostRecentMessageSender: userName,
          },
        },
      });
      log('chat group update successful');
    } catch (e) {
      log(e);
    }
    var messages = props.messages;
    log(messages);
    messages.forEach((item, index, array) => {
      if (item.id == props.id) {
        log('found');
        array[index] = {
          id: props.id,
          chatGroupID: props.chatGroupID,
          type: props.contentType,
          content: props.content + ':Declined',
          sender: props.sender,
          senderID: props.senderID,
          createdAt: props.createdAt,
        };
      }
    });
    props.setMessages(messages);
    setDeclineButton(false);
  };

  const accept = async () => {
    try {
      const acceptanceMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            chatGroupID: props.chatGroupID,
            type: 'text',
            content:
              'The quotation has been accepted. Task has been added to to-do',
            senderID: userID,
            sender: userName,
          },
        },
      });
      const updatedMessage = await API.graphql({
        query: updateMessage,
        variables: {
          input: {
            id: props.id,
            content: props.content + ':Accepted',
          },
        },
      });
      log('message sent');
    } catch (e) {
      log(e);
    }
    try {
      const updatedChatGroup = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage:
              'The quotation has been accepted. Task has been added to to-do',
            mostRecentMessageSender: userName,
          },
        },
      });
      log('chat group update successful');
    } catch (e) {
      log(e);
    }

    try {
      if (companyType == 'retailer') {
        const goodsTask = await API.graphql({
          query: createGoodsTaskBetweenRandS,
          variables: {
            input: {
              id: props.id,
              trackingNum: props.contentType,
              items: orderDetails.items,
              logisticsProvided: orderDetails.logisticsProvided,
              paymentTerms: orderDetails.paymentTerms,
              retailerID: props.chatGroupID.slice(0, 36),
              supplierID: props.chatGroupID.slice(36, 72),
            },
          },
        });
      } else {
        const goodsTask = await API.graphql({
          query: createGoodsTaskBetweenSandF,
          variables: {
            input: {
              id: props.id,
              trackingNum: props.contentType,
              items: orderDetails.items,
              logisticsProvided: orderDetails.logisticsProvided,
              paymentTerms: orderDetails.paymentTerms,
              supplierID: props.chatGroupID.slice(0, 36),
              farmerID: props.chatGroupID.slice(36, 72),
            },
          },
        });
      }
      log('goods task created');
      var messages = props.messages;
      log(messages);
      messages.forEach((item, index, array) => {
        if (item.id == props.id) {
          log('found');
          array[index] = {
            id: props.id,
            chatGroupID: props.chatGroupID,
            type: props.contentType,
            content: props.content + ':Accepted',
            sender: props.sender,
            senderID: props.senderID,
            createdAt: props.createdAt,
          };
        }
      });
      props.setMessages(messages);
      setSuccesfulModal(true);
    } catch (e) {
      log(e);
    }

    setAcceptButton(false);
  };
  return (
    <View>
      {orderDetails != null ? (
        <View
          style={{
            flexDirection: 'column',
            width: wp('95%'),
            height: hp('90%'),

            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 15,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <View
            style={{
              top: hp('4%'),
              alignItems: 'center',
            }}>
            <Font.Large>{Strings.orderQuotationFrom}</Font.Large>
            <Font.Header style={{color: Colors.LIME_GREEN}}>
              {props.chatName}
            </Font.Header>
            <Font.Normal>
              {props.contentType} #{orderDetails.status}
            </Font.Normal>
          </View>
          <View
            style={{
              position: 'absolute',
              right: wp('2%'),
              top: hp('1%'),
            }}>
            <CloseButton setModal={props.setOrderQuotationModal} />
          </View>
          <View
            style={{
              top: hp('20%'),
              alignItems: 'center',
              position: 'absolute',

              height: hp('45%'),
            }}>
            <QuotationList data={orderDetails.items}></QuotationList>
          </View>
          {/* TRANSLATION */}
          <Font.Large style={{top: hp('48%'), left: wp('20%')}}>
            Total: RM {orderDetails.sum}
          </Font.Large>
          <View
            style={{
              top: hp('50%'),

              height: hp('15%'),
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* TRANSLATION */}
            <View
              style={{
                flexDirection: 'row',
                width: wp('80'),
                justifyContent: 'space-between',
              }}>
              <View>
                <Font.Normal>Logistics Provided:</Font.Normal>
                <Font.Normal>Payment Terms:</Font.Normal>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Font.Normal>
                  {orderDetails.logisticsProvided ? 'Provided' : 'Not Provided'}
                </Font.Normal>
                <Font.Normal>
                  {orderDetails.paymentTerms == 'cashOnDelivery'
                    ? 'Cash on Delivery'
                    : 'Credit Terms'}
                </Font.Normal>
              </View>
            </View>
          </View>

          {(companyType == 'retailer' ||
            (companyType == 'supplier' &&
              companyID == props.chatGroupID.slice(0, 36))) &&
          orderDetails.status == 'New' ? (
            <View
              style={{
                flexDirection: 'row',
                top: hp('52%'),
              }}>
              <BlueButton
                text={Strings.accept}
                font={Typography.small}
                borderRadius={10}
                onPress={() => [accept()]}
                minWidth={wp('25%')}
                right={wp('5%')}
                position={'absolute'}
                onPressIn={() => setAcceptButton(true)}
                disabled={acceptButton}
              />
              <BlueButton
                text={Strings.decline}
                font={Typography.small}
                borderRadius={10}
                onPress={() => [reject(), setUnsuccesfulModal(true)]}
                minWidth={wp('25%')}
                left={wp('5%')}
                position={'absolute'}
                onPressIn={() => setDeclineButton(true)}
                disabled={declineButton}
              />

              <Modal
                isVisible={succesfulModal}
                onBackdropPress={() => [
                  setSuccesfulModal(false),
                  props.setOrderQuotationModal(false),
                ]}>
                <SuccessfulModal
                  setSuccesfulModal={setSuccesfulModal}
                  text="Succesfully accepted quotation from seller!"></SuccessfulModal>
              </Modal>
              <Modal
                isVisible={unsuccesfulModal}
                onBackdropPress={() => [
                  setUnsuccesfulModal(false),
                  props.setOrderQuotationModal(false),
                ]}>
                <UnsuccessfulModal
                  setUnsuccesfulModal={setUnsuccesfulModal}
                  text="Succesfully rejected quotation from seller!"></UnsuccessfulModal>
              </Modal>
            </View>
          ) : (
            <View />
          )}
        </View>
      ) : (
        <View></View>
      )}
    </View>
  );
};

const QuotationList = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          alignSelf: 'center',
          width: wp('70%'),
        }}></View>
    );
  };
  return (
    <View>
      <FlatList
        numColumns={1}
        data={props.data}
        ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          return (
            <QuotationCard
              name={item.name}
              variety={item.variety}
              grade={item.grade}
              quantity={item.quantity}
              price={item.price}
              siUnit={item.siUnit}
            />
          );
        }}></FlatList>
    </View>
  );
};
const QuotationCard = props => {
  return (
    <View
      style={{
        height: hp('8%'),
        width: wp('95%'),
        marginBottom: hp('0.5%'),
        borderBottomColor: Colors.GRAY_DARK,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{left: wp('1%'), width: wp('47%')}}>
        <Font.Normal>
          {props.name}
          {'\t'}
          <Font.Small>
            {Strings.grade}: {props.grade}
          </Font.Small>
        </Font.Normal>

        <Font.Small>{props.variety}</Font.Small>
      </View>
      <View
        style={{
          flexDirection: 'row',
          left: wp('50%'),
          position: 'absolute',
          bottom: hp('4.5%'),
        }}>
        <Font.Normal
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          {props.quantity}
          {props.siUnit}
        </Font.Normal>
      </View>
      <View
        style={{
          flexDirection: 'row',
          left: wp('50%'),
          position: 'absolute',
          bottom: hp('1.5%'),
        }}>
        <Font.Normal
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          RM
        </Font.Normal>
        <Font.Normal
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          {props.price}/{props.siUnit}
        </Font.Normal>
      </View>
      <Font.Normal
        style={{
          textAlign: 'right',
          bottom: hp('2.5%'),
          left: wp('75%'),
          position: 'absolute',
        }}>
        RM
        {parseInt(parseInt(props.quantity) * parseFloat(props.price) * 100) /
          100}
      </Font.Normal>
    </View>
  );
};
