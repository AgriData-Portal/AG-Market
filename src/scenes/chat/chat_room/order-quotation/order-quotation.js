import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import {Typography, Colors} from '_styles';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {SuccessfulModal, UnsuccessfulModal} from '_components/modals';
import {BlueButton} from '_components';

import {userStore, companyStore} from '_store';
import {chatRoom} from '_utils';

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
    setOrderDetails(chatRoom.fetchQuotation(props.content));
  }, []);

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
            <Text style={[Typography.header, {color: Colors.LIME_GREEN}]}>
              {props.chatName}
            </Text>
            <Text style={[Typography.normal]}>
              {props.contentType} #{orderDetails.status}
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
            <View
              style={{
                flexDirection: 'row',
                width: wp('80'),
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={[Typography.normal]}>Logistics Provided:</Text>
                <Text style={[Typography.normal]}>Payment Terms:</Text>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={[Typography.normal]}>
                  {orderDetails.logisticsProvided ? 'Provided' : 'Not Provided'}
                </Text>
                <Text style={[Typography.normal]}>
                  {orderDetails.paymentTerms == 'cashOnDelivery'
                    ? 'Cash on Delivery'
                    : 'Credit Terms'}
                </Text>
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
                onPress={() => [
                  chatRoom
                    .accept(
                      props.chatGroupID,
                      userID,
                      userName,
                      props.id,
                      props.content,
                      props.contentType,
                      props.sender,
                      props.senderID,
                      props.createdAt,
                      props.messages,
                      companyType,
                      orderDetails,
                    )
                    .then(data => [
                      props.setMessages(data),
                      setSuccesfulModal(true),
                      setAcceptButton(false),
                    ]),
                ]}
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
                onPress={() => [
                  chatRoom
                    .reject(
                      props.chatGroupID,
                      props.id,
                      props.content,
                      userName,
                      userID,
                      props.messages,
                      props.contentType,
                      props.sender,
                      props.senderID,
                      props.createdAt,
                    )
                    .then(data => [
                      props.setMessages(data),
                      setDeclineButton(false),
                    ]),
                  setUnsuccesfulModal(true),
                ]}
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
