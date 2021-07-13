import React, {useState, useEffect, useContext} from 'react';
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
import {CloseButton, SuccessfulModal} from '_components';
import {API} from 'aws-amplify';
import {
  createMessage,
  deleteChatGroupUsers,
  updateChatGroup,
  updateOrderQuotation,
  createOrderQuotation,
} from '../../../../graphql/mutations';
import {listUsersInChat, purchaseOrderItems} from '../../../../graphql/queries';
import {
  QuotationItemsContext,
  QuotationItemsProvider,
} from './quotationContext';
import {abs} from 'react-native-reanimated';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';
import Strings from '_utils';
var dayjs = require('dayjs');

export const OrderList = props => {
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
      console.log(e);
    }
    console.log('updating Price to the list');
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
    console.log('updating quantity to the list');
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
        height: hp('8%'),
        width: wp('80%'),
        marginBottom: hp('0.5%'),
        borderBottomColor: Colors.GRAY_DARK,
        borderBottomWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <View style={{left: wp('1%'), width: wp('22%')}}>
        <Text style={[Typography.normal, {}]}>{props.name} </Text>
        <Text style={[Typography.small]}>Grade: {props.grade}</Text>

        <Text style={[Typography.small]}>{props.variety}</Text>
      </View>
      <View style={{flexDirection: 'row', left: wp('3%')}}>
        <TextInput
          value={quantity}
          underlineColorAndroid="transparent"
          onChangeText={item => updateQuantity(item)}
          keyboardType="numeric"
          style={{
            width: wp('10%'),
            top: hp('0.5%'),
            borderBottomColor: 'transparent',
          }}></TextInput>
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
            top: hp('0.5%'),
            left: wp('1%'),
            width: wp('9%'),
            borderBottomColor: 'transparent',
          }}></TextInput>
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

export const PurchaseOrder = props => {
  const [orderQuotation, setOrderQuotation] = useState(false);

  return (
    <QuotationItemsProvider>
      <View
        style={{
          height: hp('80%'),
          width: wp('90%'),
          backgroundColor: Colors.GRAY_MEDIUM,
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={[
              Typography.large,
              {
                fontFamily: 'Poppins-SemiBold',
                top: hp('3%'),
              },
            ]}>
            {Strings.purchaseOrderFrom}
          </Text>
          <Text
            style={[
              Typography.header,
              {
                fontFamily: 'Poppins-Bold',
                color: Colors.LIME_GREEN,
                top: hp('3%'),
              },
            ]}>
            {props.chatName}
          </Text>
        </View>
        <View
          style={{
            height: hp('50%'),
            top: hp('5%'),
            borderRadius: 10,
          }}>
          <PurchaseOrderList chatGroupID={props.chatGroupID} />
        </View>
        <View
          style={{
            position: 'absolute',
            right: wp('2%'),
            top: hp('0.5%'),
          }}>
          <CloseButton setModal={props.setPurchaseOrderModal} />
        </View>
        {props.type == 'supplier' ? (
          <TouchableOpacity
            onPress={() => [setOrderQuotation(true)]}
            style={{
              position: 'absolute',
              borderRadius: 15,
              bottom: hp('7%'),
              height: hp('5%'),
              width: wp('50%'),
              backgroundColor: Colors.LIGHT_BLUE,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={Typography.normal}>Create Order Quotation</Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
        <Modal isVisible={orderQuotation}>
          <NewOrderQuotation
            chatName={props.chatName}
            chatGroupID={props.chatGroupID}
            setOrderQuotation={setOrderQuotation}
            setPurchaseOrderModal={props.setPurchaseOrderModal}
            type={props.type}
            userName={props.userName}
            userID={props.userID}
            setMessages={props.setMessages}
            messages={props.messages}
          />
        </Modal>
      </View>
    </QuotationItemsProvider>
  );
};

const NewOrderQuotation = props => {
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

  var productsWIndex = quotationItems;
  productsWIndex.forEach((item, index, arr) => {
    console.log('adding index to check back later');
    item['index'] = index;
    arr[index] = item;
  });
  setQuotationItems(productsWIndex);
  console.log('printing productsWIndex');
  var tempSum = 0;
  useEffect(() => {
    console.log('useEffect to calculate sum Triggered');
    quotationItems.forEach((item, index, arr) => {
      var product = parseFloat(
        (parseFloat(item.price) * parseFloat(item.quantity)).toFixed(2),
      );
      tempSum = tempSum + product;
    });
    setSum(tempSum);
    console.log(tempSum);
  }, [trigger, quotationItems]);

  const sendQuotation = async () => {
    var tempList = quotationItems;
    tempList.forEach((item, index, array) => {
      delete item.createdAt;
      delete item.id;
      delete item.index;
      delete item.purchaseOrderID, delete item.updatedAt;
      array[index] = item;
    });
    console.log('removing key and value pairs like index for order quotation');
    try {
      const updatedValue = await API.graphql({
        query: updateOrderQuotation,
        variables: {
          input: {
            id: props.chatGroupID,
            items: tempList,
            sum: sum,
            logisticsProvided: deliveryValue,
            paymentTerms: paymentValue,
          },
        },
      });
    } catch (e) {
      console.log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        console.log('order quotation has not been created, creating now');
        const createdValue = await API.graphql({
          query: createOrderQuotation,
          variables: {
            input: {
              id: props.chatGroupID,
              items: tempList,
              sum: sum,
              logisticsProvided: deliveryValue,
              paymentTerms: paymentValue,
            },
          },
        });
      }
    }
    try {
      console.log('sending order quotation');
      const createdMessage = await API.graphql({
        query: createMessage,
        variables: {
          input: {
            chatGroupID: props.chatGroupID,
            type: 'quotation',
            content: props.chatGroupID,
            sender: props.userName,
            senderID: props.userID,
          },
        },
      });
      console.log('message created');
      const updatedChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.chatGroupID,
            mostRecentMessage: 'Quotation',
            mostRecentMessageSender: props.userName,
          },
        },
      });
      console.log('Updated chat');
      /*messages = props.messages;
      messages = messages.reverse();
      messages.push(input);
      messages = messages.reverse();
      setMessages = {messages};*/
      setSuccessfulModal(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        flexDirection: 'column',
        width: wp('90%'),
        height: hp('95%'),
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

        <Text style={[Typography.small, {bottom: hp('1%')}]}>
          #{props.chatGroupID.slice(0, 8)}
        </Text>
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
          height: hp('40%'),
          top: hp('17%'),
          alignItems: 'center',
          position: 'absolute',
        }}>
        <OrderList trigger={trigger} setTrigger={setTrigger}></OrderList>
      </View>
      <View style={{position: 'absolute', left: wp('50%'), top: hp('57%')}}>
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
          top: hp('50%'),
          alignItems: 'center',
          height: hp('24%'),
          width: wp('80%'),
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            height: wp('20%'),
            width: wp('70%'),
            top: hp('2%'),
          }}>
          <Text style={[Typography.small]}>Logistics Provided:</Text>
          <DropDownPicker
            open={openDelivery}
            value={deliveryValue}
            items={deliveryMethod}
            placeholderTextColor={Colors.GRAY_DARK}
            placeholder={'Yes'}
            setOpen={setOpenDelivery}
            setValue={setDeliveryValue}
            setItems={setDeliveryMethod}
            style={{
              width: wp('25%'),
              left: wp('17%'),
              height: hp('4%'),
              borderColor: 'white',
              borderRadius: 3,
              backgroundColor: Colors.GRAY_LIGHT,
            }}
            text
            dropDownDirection="BOTTOM"
            listItemContainerStyle={{height: hp('3%')}}
            dropDownContainerStyle={{
              borderWidth: 1,
              left: wp('17%'),
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
            top: hp('1%'),
          }}>
          <Text style={[Typography.small]}>Payment Terms:</Text>
          <DropDownPicker
            open={openPayment}
            value={paymentValue}
            items={paymentMethod}
            placeholderTextColor={Colors.GRAY_DARK}
            placeholder={'Credit Term'}
            setOpen={setOpenPayment}
            setValue={setPaymentValue}
            setItems={setPaymentMethod}
            style={{
              width: wp('35%'),
              left: wp('10%'),
              height: hp('4%'),
              borderColor: 'white',
              borderRadius: 3,
              backgroundColor: Colors.GRAY_LIGHT,
            }}
            dropDownDirection="BOTTOM"
            listItemContainerStyle={{height: hp('3%')}}
            dropDownContainerStyle={{
              borderWidth: 1,
              left: wp('10%'),
              width: wp('35%'),
              backgroundColor: Colors.GRAY_LIGHT,
            }}
          />
        </View>
      </View>
      <View
        style={{
          top: hp('52%'),
        }}>
        <TouchableOpacity
          onPress={() => [sendQuotation()]}
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
            width: wp('55%'),
            height: hp('4%'),
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={[Typography.small]}>Send Quotation to Retailer</Text>
        </TouchableOpacity>
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
      </View>
    </View>
  );
};

const PurchaseOrderList = props => {
  const [quotationItems, setQuotationItems] = useContext(QuotationItemsContext);
  const fetchPO = async () => {
    const prodList = await API.graphql({
      query: purchaseOrderItems,
      variables: {purchaseOrderID: props.chatGroupID},
    });

    console.log('successful fetch for PO items');
    setQuotationItems(prodList.data.purchaseOrderItems.items);
  };
  useEffect(() => {
    fetchPO();
  }, []);
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          borderRadius: 10,
          width: wp('70%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={quotationItems}
      numColumns={1}
      ItemSeparatorComponent={Seperator}
      ListEmptyComponent={
        <View
          style={{
            width: wp('80%'),
            height: hp('60%'),
            top: hp('2%'),
          }}></View>
      }
      renderItem={({item}) => {
        return (
          <PurchaseOrderComponent
            name={item.name}
            quantity={item.quantity}
            siUnit={item.siUnit}
            variety={item.variety}
            grade={item.grade}
          />
        );
      }}
    />
  );
};

const PurchaseOrderComponent = props => {
  return (
    <View
      style={{
        height: hp('5%'),
        borderRadius: 10,
        backgroundColor: Colors.GRAY_WHITE,
        width: wp('85%'),
      }}>
      <View style={{flexDirection: 'row', top: hp('1.5%')}}>
        <Text
          style={[Typography.small, {position: 'absolute', left: wp('2%')}]}>
          {props.name}
        </Text>
        <Text
          style={[Typography.small, {position: 'absolute', left: wp('45%')}]}>
          {props.variety}
        </Text>
        <Text
          style={[Typography.small, {position: 'absolute', left: wp('27%')}]}>
          Grade: {props.grade}
        </Text>

        <Text
          style={[Typography.small, {position: 'absolute', right: wp('5%')}]}>
          {props.quantity}
          {props.siUnit}
        </Text>
      </View>
    </View>
  );
};
