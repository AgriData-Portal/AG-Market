//library imports
import React, {useState, useEffect} from 'react';
import {View, FlatList, Text} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//styling imports
import {Typography, Colors} from '_styles';
//components
import Strings, {chatRoom} from '_utils';
import {SuccessfulModal, UnsuccessfulModal} from '_components/modals';
import {CloseButton} from '_components';
import {BlueButton} from '_components';
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
