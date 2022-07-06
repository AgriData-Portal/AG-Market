import React, {useState, useEffect, useContext} from 'react';
import {View, TextInput, FlatList, Text, Platform} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import dayjs from 'dayjs';

import Modal from 'react-native-modal';
import {CloseButton, SuccessfulModal} from '_components';
import {API} from 'aws-amplify';
import {
  createMessage,
  updateChatGroup,
  updateSupplierCompany,
  updateFarmerCompany,
} from '../../../../graphql/mutations';
import {
  getSupplierCompany,
  getFarmerCompany,
} from '../../../../graphql/queries';
import {
  QuotationItemsContext,
  QuotationItemsProvider,
} from './quotationContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Strings from '_utils';
import {BlueButton} from '_components';
import {log} from '_utils';
import {UnsuccessfulModal} from '_components';
import {userStore} from '_store';

const NewOrderQuotation = props => {
  const userID = userStore(state => state.userID);
  const userName = userStore(state => state.userName);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);
  const [quotationItems, setQuotationItems] = useContext(QuotationItemsContext);
  const [trigger, setTrigger] = useState(true);
  const [sum, setSum] = useState(0);
  const [deliveryValue, setDeliveryValue] = useState(true);
  const [deliveryMethod, setDeliveryMethod] = useState([
    {label: 'No', value: false},
    {label: 'Yes', value: true},
  ]);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentValue, setPaymentValue] = useState('creditTerm');
  const [paymentMethod, setPaymentMethod] = useState([
    {label: 'Cash', value: 'cashOnDelivery'},
    {label: 'Credit Term', value: 'creditTerm'},
  ]);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const companyType = userStore(state => state.companyType);

  var productsWIndex = quotationItems;
  productsWIndex.forEach((item, index, arr) => {
    log('adding index to check back later');
    item['index'] = index;
    arr[index] = item;
  });
  setQuotationItems(productsWIndex);
  log('printing productsWIndex');
  var tempSum = 0;
  useEffect(() => {
    log('useEffect to calculate sum Triggered');
    quotationItems.forEach((item, index, arr) => {
      var product = parseFloat((item.price * item.quantity).toFixed(2));
      tempSum = parseFloat((tempSum + product).toFixed(2));
    });
    setSum(tempSum);
    log(tempSum);
  }, [trigger, quotationItems]);

  const sendQuotation = async () => {
    if (isNaN(sum)) {
      setUnsuccessfulModal(true);
      var valid = false;
    } else {
      var valid = true;
    }

    log(valid);
    if (valid == true) {
      var mostRecentQuotationNumber;
      try {
        if (companyType == 'supplier') {
          const response = await API.graphql({
            query: getSupplierCompany,
            variables: {id: props.chatGroupID.slice(36, 72)},
          });
          mostRecentQuotationNumber =
            response.data.getSupplierCompany.mostRecentQuotationNumber;
          log('newnum: ' + mostRecentQuotationNumber);
          if (mostRecentQuotationNumber) {
            if (
              dayjs().format('YYYY-MM') ==
              mostRecentQuotationNumber.slice(4, 11)
            ) {
              var number = parseInt(mostRecentQuotationNumber.slice(12, 16));
              var numberString = (number + 1).toString().padStart(4, '0');
              mostRecentQuotationNumber =
                'QUO-' + dayjs().format('YYYY-MM-') + numberString;
            } else {
              mostRecentQuotationNumber =
                'QUO-' + dayjs().format('YYYY-MM-') + '0001';
            }
          } else {
            mostRecentQuotationNumber =
              'QUO-' + dayjs().format('YYYY-MM-') + '0001';
          }
          log('updatednum: ' + mostRecentQuotationNumber);

          log('creating purchase order');
          const supplierCompanyUpdate = await API.graphql({
            query: updateSupplierCompany,
            variables: {
              input: {
                id: props.chatGroupID.slice(36, 72),
                mostRecentQuotationNumber: mostRecentQuotationNumber,
              },
            },
          });
        } else if (companyType == 'farmer') {
          const response = await API.graphql({
            query: getFarmerCompany,
            variables: {id: props.chatGroupID.slice(36, 72)},
          });
          mostRecentQuotationNumber =
            response.data.getFarmerCompany.mostRecentQuotationNumber;
          log('newnum: ' + mostRecentQuotationNumber);
          if (mostRecentQuotationNumber) {
            if (
              dayjs().format('YYYY-MM') ==
              mostRecentQuotationNumber.slice(4, 11)
            ) {
              var number = parseInt(mostRecentQuotationNumber.slice(12, 16));
              var numberString = (number + 1).toString().padStart(4, '0');
              mostRecentQuotationNumber =
                'QUO-' + dayjs().format('YYYY-MM-') + numberString;
            } else {
              mostRecentQuotationNumber =
                'QUO-' + dayjs().format('YYYY-MM-') + '0001';
            }
          } else {
            mostRecentQuotationNumber =
              'QUO-' + dayjs().format('YYYY-MM-') + '0001';
          }
          log('updatednum: ' + mostRecentQuotationNumber);

          log('creating purchase order');
          const farmerCompanyUpdate = await API.graphql({
            query: updateFarmerCompany,
            variables: {
              input: {
                id: props.chatGroupID.slice(36, 72),
                mostRecentQuotationNumber: mostRecentQuotationNumber,
              },
            },
          });
        }
      } catch (e) {
        log(e);
      }

      var message = '';
      var tempList = quotationItems;
      tempList.forEach((item, index, array) => {
        message = message + (item.id + '+');
        message = message + (item.name + '+');
        message = message + (item.quantity + '+');
        message = message + (item.siUnit + '+');
        message = message + (item.variety + '+');
        message = message + (item.grade + '+');
        message = message + (item.price + '+');
        if (index < tempList.length - 1) {
          message = message + '/';
        }
      });
      message =
        message +
        ':' +
        sum.toString() +
        ':' +
        deliveryValue +
        ':' +
        paymentValue;
      log('removing key and value pairs like index for order quotation');
      log(message);

      try {
        log('sending order quotation');
        const createdMessage = await API.graphql({
          query: createMessage,
          variables: {
            input: {
              chatGroupID: props.chatGroupID,
              type: mostRecentQuotationNumber,
              content: message,
              sender: userName,
              senderID: userID,
            },
          },
        });
        log('message created');
        const updatedChat = await API.graphql({
          query: updateChatGroup,
          variables: {
            input: {
              id: props.chatGroupID,
              mostRecentMessage: 'Quotation',
              mostRecentMessageSender: userName,
            },
          },
        });
        log('Updated chat');

        setSuccessfulModal(true);
      } catch (e) {
        log(e);
      }
    }
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        width: wp('95%'),
        right: wp('2%'),
        height: hp('90%'),
        backgroundColor: Colors.GRAY_LIGHT,
        borderRadius: 15,
        alignItems: 'center',
      }}>
      <View
        style={{
          top: hp('4%'),
          alignItems: 'center',
        }}>
        <Text style={[Typography.large]}>{Strings.orderQuotationFrom}</Text>

        <Text
          style={[
            Typography.header,
            {color: Colors.LIME_GREEN, bottom: hp('1%')},
          ]}>
          {props.chatName}
        </Text>

        {/* <Text style={[Typography.small, {bottom: hp('1%')}]}>
            #{props.chatGroupID.slice(0, 8)}
          </Text> */}
      </View>
      <View
        style={{
          position: 'absolute',
          right: wp('2%'),
          top: hp('1%'),
        }}>
        <CloseButton setModal={props.setOrderQuotation} />
      </View>
      <View
        style={{
          height: hp('35%'),
          top: hp('14%'),
          alignItems: 'center',
          position: 'absolute',
        }}>
        <OrderList trigger={trigger} setTrigger={setTrigger}></OrderList>
      </View>
      <View style={{position: 'absolute', left: wp('50%'), top: hp('50%')}}>
        <Text
          style={[
            Typography.normal,
            {
              fontFamily: 'Poppins-SemiBold',
            },
          ]}>
          {Strings.totalCost}: RM {sum}
        </Text>
      </View>
      <View
        style={{
          top: hp('55%'),
          alignItems: 'center',
          height: hp('24%'),
          width: wp('85%'),
          backgroundColor: 'white',
          borderRadius: 10,
          position: 'absolute',
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: wp('20%'),
            width: wp('70%'),
            top: hp('2%'),
          }}>
          <Text style={[Typography.normal, {top: hp('0.5%'), right: wp('3%')}]}>
            {Strings.logisticsProvided}:
          </Text>
          <DropDownPicker
            open={openDelivery}
            value={deliveryValue}
            items={deliveryMethod}
            placeholderTextColor={Colors.GRAY_DARK}
            placeholder={Strings.yes}
            setOpen={setOpenDelivery}
            setValue={setDeliveryValue}
            setItems={setDeliveryMethod}
            style={{
              position: 'absolute',
              width: wp('25%'),
              right: wp('45%'),
              height: hp('4%'),
              borderColor: 'white',
              borderRadius: 5,
              backgroundColor: Colors.GRAY_LIGHT,
            }}
            text
            dropDownDirection="BOTTOM"
            listItemContainerStyle={{height: hp('3%')}}
            dropDownContainerStyle={{
              borderWidth: 1,
              position: 'absolute',

              width: wp('25%'),
              backgroundColor: Colors.GRAY_LIGHT,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: wp('20%'),
            width: wp('70%'),
            top: hp('3%'),
          }}>
          <Text style={[Typography.normal, {top: hp('0.5%'), right: wp('3%')}]}>
            {Strings.paymentTerms}:
          </Text>
          <DropDownPicker
            open={openPayment}
            value={paymentValue}
            items={paymentMethod}
            placeholderTextColor={Colors.GRAY_DARK}
            placeholder={Strings.creditTerm}
            setOpen={setOpenPayment}
            setValue={setPaymentValue}
            setItems={setPaymentMethod}
            style={{
              position: 'absolute',
              width: wp('35%'),
              left: wp('0%'),
              height: hp('4%'),
              borderColor: 'white',
              borderRadius: 5,
              backgroundColor: Colors.GRAY_LIGHT,
            }}
            dropDownDirection="BOTTOM"
            listItemContainerStyle={{height: hp('3%')}}
            dropDownContainerStyle={{
              position: 'absolute',
              borderWidth: 1,
              left: wp('0%'),
              width: wp('35%'),
              backgroundColor: Colors.GRAY_LIGHT,
            }}
          />
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          top: hp('81%'),
        }}>
        <BlueButton
          onPress={() => [sendQuotation()]}
          text={Strings.sendQuotation}
          borderRadius={10}
          font={Typography.normal}
        />
        <Modal
          isVisible={successfulModal}
          onBackdropPress={() => [
            setSuccessfulModal(false),
            props.setOrderQuotation(false),
            props.setPurchaseOrderModal(false),
          ]}>
          <SuccessfulModal
            setSuccessfulModal={setSuccessfulModal}
            text={
              'You have successfully sent the order quotation to the customer!'
            }
          />
        </Modal>
        {/*TRANSLATION */}
        <Modal
          isVisible={unsuccessfulModal}
          onBackdropPress={() => setUnsuccessfulModal(false)}>
          <UnsuccessfulModal text={'Please input the price for your items'} />
        </Modal>
      </View>
    </View>
  );
};

const OrderList = props => {
  const [quotationItems, setQuotationItems] = useContext(QuotationItemsContext);
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
        data={quotationItems}
        ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          return (
            <OrderCard
              name={item.name}
              variety={item.variety}
              grade={item.grade}
              quantity={item.quantity}
              siUnit={item.siUnit}
              index={item.index}
              products={props.products}
              setProducts={props.setProducts}
              trigger={props.trigger}
              setTrigger={props.setTrigger}
            />
          );
        }}></FlatList>
    </View>
  );
};

const OrderCard = props => {
  const [quotationItems, setQuotationItems] = useContext(QuotationItemsContext);
  const [quantity, setQuantity] = useState(props.quantity.toString());
  const [price, setPrice] = useState('');
  const updatePrice = item2 => {
    var tempList = quotationItems;
    try {
      tempList.forEach((item, index, array) => {
        if (index == props.index) {
          item['price'] = parseFloat(item2);
          array[index] = item;
        }
      });
    } catch (e) {
      log(e);
    }
    log('updating Price to the list');
    setQuotationItems(tempList);
    setPrice(item2);
    if (props.trigger) {
      props.setTrigger(false);
    } else {
      props.setTrigger(true);
    }
  };
  const updateQuantity = item2 => {
    var tempList = quotationItems;
    tempList.forEach((item, index, array) => {
      if (index == props.index) {
        item['quantity'] = parseFloat(item2);
        array[index] = item;
      }
    });
    log('updating quantity to the list');
    setQuotationItems(tempList);
    setQuantity(item2);
    if (props.trigger) {
      props.setTrigger(false);
    } else {
      props.setTrigger(true);
    }
  };
  return (
    <View
      style={{
        height: hp('9%'),
        width: wp('80%'),
        marginBottom: hp('0.5%'),
        borderBottomColor: Colors.GRAY_DARK,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{left: wp('1%'), width: wp('22%')}}>
        <Text style={[Typography.normal, {width: wp(200)}]}>{props.name} </Text>
        <Text style={[Typography.small]}>
          {Strings.grade}: {props.grade}
        </Text>

        <Text style={[Typography.small]}>{props.variety}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          left: wp('3%'),
        }}>
        <TextInput
          value={quantity}
          underlineColorAndroid="transparent"
          onChangeText={item => updateQuantity(item)}
          keyboardType="numeric"
          style={{
            top: Platform.OS == 'ios' ? hp('1%') : hp('0%'),
            padding: 0,
            width: wp('10%'),
            borderBottomColor: 'transparent',
            color: 'black',
            alignSelf: 'center',
          }}></TextInput>
        <View
          style={{
            width: wp('7%'),
            height: 0,
            top: hp('4%'),
            borderTopWidth: 1,
            borderColor: Colors.LIME_GREEN,
            position: 'absolute',
          }}></View>
        <Text
          style={[
            Typography.small,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          {props.siUnit}
        </Text>
      </View>
      <View style={{flexDirection: 'row', left: wp('5%')}}>
        <Text
          style={[
            Typography.small,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          RM
        </Text>
        <TextInput
          value={price}
          underlineColorAndroid="transparent"
          onChangeText={item => updatePrice(item)}
          keyboardType="numeric"
          style={{
            top: Platform.OS == 'ios' ? hp('1%') : hp('0%'),
            padding: 0,
            left: wp('1%'),
            width: wp('9%'),
            borderBottomColor: 'transparent',
            alignSelf: 'center',
            color: 'black',
          }}></TextInput>
        <View
          style={{
            width: wp('8%'),
            left: wp('5%'),
            height: 0,
            top: hp('4%'),
            borderTopWidth: 1,
            borderColor: Colors.LIME_GREEN,
            position: 'absolute',
          }}></View>
        <Text
          style={[
            Typography.small,
            {
              top: hp('1%'),
              left: wp('1%'),
            },
          ]}>
          /{props.siUnit}
        </Text>
      </View>

      <Text
        style={[
          Typography.small,
          {
            textAlign: 'right',
            right: wp('1%'),
            position: 'absolute',
          },
        ]}>
        RM {parseFloat((price * quantity).toFixed(2))}
      </Text>
    </View>
  );
};

export default NewOrderQuotation;
