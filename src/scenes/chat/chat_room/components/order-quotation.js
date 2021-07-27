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
} from '../../../../graphql/mutations';
import {listUsersInChat, getOrderQuotation} from '../../../../graphql/queries';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {SuccessfulModal, UnsuccessfulModal} from '_components/modals';
import {BlueButton} from '_components';

export const OrderQuotationModal = props => {
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    fetchQuotation();
  }, []);
  const [succesfulModal, setSuccesfulModal] = useState(false);
  const [unsuccesfulModal, setUnsuccesfulModal] = useState(false);
  const [acceptButton, setAcceptButton] = useState(false);
  const [declineButton, setDeclineButton] = useState(false);

  console.log('quotation' + props.chatGroupID);
  const fetchQuotation = async () => {
    try {
      const quotation = await API.graphql({
        query: getOrderQuotation,
        variables: {id: props.chatGroupID},
      });
      console.log(quotation.data.getOrderQuotation);
      setOrderDetails(quotation.data.getOrderQuotation);
    } catch (e) {
      console.log(e);
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
            senderID: props.userID,
            sender: props.userName,
          },
        },
      });
      console.log('message sent');
    } catch (e) {
      console.log(e);
    }
    try {
      const updatedChatGroup = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage:
              'The quotation has been rejected. Please re-negotiate',
            mostRecentMessageSender: props.userName,
          },
        },
      });
      console.log('chat group update successful');
    } catch (e) {
      console.log(e);
    }
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
            senderID: props.userID,
            sender: props.userName,
          },
        },
      });
      console.log('message sent');
    } catch (e) {
      console.log(e);
    }
    try {
      const updatedChatGroup = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage:
              'The quotation has been accepted. Task has been added to to-do',
            mostRecentMessageSender: props.userName,
          },
        },
      });
      console.log('chat group update successful');
    } catch (e) {
      console.log(e);
    }
    try {
      const goodsTask = await API.graphql({
        query: createGoodsTaskBetweenRandS,
        variables: {
          input: {
            items: orderDetails.items,
            retailerID: props.chatGroupID.slice(0, 36),
            supplierID: props.chatGroupID.slice(36, 72),
          },
        },
      });
      console.log('goods task created');
      setSuccesfulModal(true);
    } catch (e) {
      console.log(e);
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
            <Text style={[Typography.large, {}]}>
              {Strings.orderQuotationFrom}
            </Text>
            <Text style={[Typography.header]}>
              <Text style={{color: '#8EAB3D'}}>{props.chatName}</Text>
            </Text>
            <Text style={[Typography.small]}>
              #{orderDetails.id.slice(0, 8)}
            </Text>
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
          <Text style={[Typography.large, {top: hp('48%'), left: wp('20%')}]}>
            Total: RM {orderDetails.sum}
          </Text>
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
            <View style={{flexDirection: 'row', width: wp('80')}}>
              <Text style={[Typography.normal, {textAlign: 'left'}]}>
                Logistics Provided: {'\t'}
                {'\t'}
                {'\t'}
              </Text>
              <Text style={[Typography.normal, {textAlign: 'right'}]}>
                {orderDetails.logisticsProvided ? 'Provided' : 'Not Provided'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', width: wp('80')}}>
              <Text style={[Typography.normal]}>
                Payment Terms:{'\t'}
                {'\t'}
                {'\t'}
              </Text>
              <Text style={[Typography.normal]}>
                {orderDetails.paymentTerms == 'cashOnDelivery'
                  ? 'Cash on Delivery'
                  : 'Credit Terms'}
              </Text>
            </View>
          </View>

          {props.type != 'supplier' ? (
            <View
              style={{
                flexDirection: 'row',
                top: hp('53%'),
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
        <Text style={[Typography.normal, {}]}>
          {props.name}
          {'\t'}
          <Text style={[Typography.small]}>Grade: {props.grade}</Text>
        </Text>

        <Text style={[Typography.small]}>{props.variety}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          left: wp('50%'),
          position: 'absolute',
          bottom: hp('4.5%'),
        }}>
        <Text
          style={[
            Typography.normal,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          {props.quantity}
          {props.siUnit}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          left: wp('50%'),
          position: 'absolute',
          bottom: hp('1.5%'),
        }}>
        <Text
          style={[
            Typography.normal,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          RM
        </Text>
        <Text
          style={[
            Typography.normal,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          {props.price}/{props.siUnit}
        </Text>
      </View>
      <Text
        style={[
          Typography.normal,
          {
            textAlign: 'right',
            bottom: hp('2.5%'),
            left: wp('75%'),
            position: 'absolute',
          },
        ]}>
        RM
        {parseInt(parseInt(props.quantity) * parseFloat(props.price) * 100) /
          100}
      </Text>
    </View>
  );
};
