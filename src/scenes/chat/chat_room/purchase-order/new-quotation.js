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
import {userStore, companyStore} from '_store';
import {chatRoom} from '_utils';
import {Font} from '_components';

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
    {label: Strings.no, value: false},
    {label: Strings.yes, value: true},
  ]);
  const [openPayment, setOpenPayment] = useState(false);
  const [paymentValue, setPaymentValue] = useState('creditTerm');
  const [paymentMethod, setPaymentMethod] = useState([
    {label: Strings.Cash, value: 'cashOnDelivery'},
    {label: Strings.creditTerm, value: 'creditTerm'},
  ]);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [sendQuoteButton, setSendQuoteButton] = useState(false);

  const companyType = companyStore(state => state.companyType);

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
      var product = parseFloat(
        (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2),
      );
      tempSum = tempSum + product;
    });
    setSum(tempSum);
    log(tempSum);
  }, [trigger, quotationItems]);

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
        <Font.Large>{Strings.orderQuotationFrom}</Font.Large>

        <Font.Header style={{color: Colors.LIME_GREEN, bottom: hp('1%')}}>
          {props.chatName}
        </Font.Header>

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
        <Font.Normal
          style={{
            fontFamily: 'Poppins-SemiBold',
          }}>
          {Strings.totalCost}: RM {sum}
        </Font.Normal>
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
          <Font.Normal style={{top: hp('0.5%'), right: wp('3%')}}>
            {Strings.logisticsProvided}:
          </Font.Normal>
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
          <Font.Normal style={{top: hp('0.5%'), right: wp('3%')}}>
            {Strings.paymentTerms}:
          </Font.Normal>
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
          onPress={() => {
            if (!isNaN(sum)) {
              chatRoom
                .sendQuotation(
                  props.chatGroupID,
                  companyType,
                  quotationItems,
                  userName,
                  userID,
                  sum,
                  deliveryValue,
                  paymentValue,
                )
                .then([setSendQuoteButton(false), setSuccessfulModal(true)]);
            } else {
              setUnsuccessfulModal(true);
            }
          }}
          text={Strings.sendQuotation}
          borderRadius={10}
          font={Typography.normal}
          disabled={sendQuoteButton}
          onPressIn={() => setSendQuoteButton(true)}
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
            text={Strings.sentOrderQuotation}
          />
        </Modal>

        <Modal
          isVisible={unsuccessfulModal}
          onBackdropPress={() => setUnsuccessfulModal(false)}>
          <UnsuccessfulModal text={Strings.inputItemPrice} />
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
        <Font.Normal style={{width: wp(200)}}>{props.name} </Font.Normal>
        <Font.Small>
          {Strings.grade}: {props.grade}
        </Font.Small>

        <Font.Small>{props.variety}</Font.Small>
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
        <Font.Small
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          {props.siUnit}
        </Font.Small>
      </View>
      <View style={{flexDirection: 'row', left: wp('5%')}}>
        <Font.Small
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          RM
        </Font.Small>
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
        <Font.Small
          style={{
            top: hp('1%'),
            left: wp('1%'),
          }}>
          /{props.siUnit}
        </Font.Small>
      </View>

      <Font.Small
        style={{
          textAlign: 'right',
          right: wp('1%'),
          position: 'absolute',
        }}>
        RM {parseFloat((price * quantity).toFixed(2))}
      </Font.Small>
    </View>
  );
};

export default NewOrderQuotation;
