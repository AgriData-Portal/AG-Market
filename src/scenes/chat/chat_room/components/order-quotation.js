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
import {API} from 'aws-amplify';
import {
  createMessage,
  deleteChatGroupUsers,
  updateChatGroup,
  createGoodsTask,
} from '../../../../graphql/mutations';
import {listUsersInChat, getOrderQuotation} from '../../../../graphql/queries';

import {abs} from 'react-native-reanimated';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {SuccessfulModal, UnsuccessfulModal} from '_components/modals';

export const OrderQuotationModal = props => {
  const [orderDetails, setOrderDetails] = useState(null);
  useEffect(() => {
    fetchQuotation();
  }, []);
  const [succesfulModal, setSuccesfulModal] = useState(false);
  const [unsuccesfulModal, setUnsuccesfulModal] = useState(false);

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
        query: createGoodsTask,
        variables: {
          input: {
            items: orderDetails.items,
            retailerID: props.chatGroupID.slice(0, 36),
            supplierID: props.chatGroupID.slice(36, 72),
          },
        },
      });
      console.log('goods task created');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View>
      {orderDetails != null ? (
        <View
          style={{
            flexDirection: 'column',
            width: wp('100%'),
            height: hp('95%'),
            right: wp('5%'),
            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 15,
            alignItems: 'center',
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

              height: hp('10%'),
              width: wp('75%'),
              backgroundColor: 'white',
              borderRadius: 10,

              justifyContent: 'center',
            }}>
            <Text style={[Typography.normal, {left: wp('10%')}]}>
              Logistics Provided: {'\t'}
              {'\t'}
              {'\t'}
              <Text style={{left: wp('20%')}}>
                {orderDetails.logisticsProvided ? 'Provided' : 'Not Provided'}
              </Text>
            </Text>
            <Text style={[Typography.normal, {left: wp('10%')}]}>
              Payment Terms:{'\t'}
              {'\t'}
              {'\t'}
              <Text style={{left: wp('20%')}}>{orderDetails.paymentTerms}</Text>
            </Text>
          </View>

          {props.type != 'supplier' ? (
            <View
              style={{
                flexDirection: 'row',
                top: hp('55%'),
              }}>
              <TouchableOpacity
                onPress={() => [accept(), setSuccesfulModal(true)]}
                style={{
                  backgroundColor: Colors.LIGHT_BLUE,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  right: wp('5%'),
                  width: wp('25%'),
                  height: hp('4%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={[Typography.small]}>{Strings.accept}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => [reject(), setUnsuccesfulModal(true)]}
                style={{
                  backgroundColor: Colors.LIGHT_BLUE,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                  left: wp('5%'),
                  width: wp('25%'),
                  height: hp('4%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <Text style={[Typography.small]}>{Strings.decline}</Text>
              </TouchableOpacity>
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
