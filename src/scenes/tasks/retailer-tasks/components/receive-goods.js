import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton, SuccessfulModal} from '_components';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  createInvoice,
  createPaymentTask,
  deleteGoodsTask,
} from '../../../../graphql/mutations';
import {API} from 'aws-amplify';
import {DismissKeyboard} from '_components';
import Strings from '_utils';

const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

//Retailer receive
const ReceiveModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  var sum = 0;
  var tempList = props.goods.forEach((item, index, array) => {
    var product = item.price * item.quantity;
    sum = sum + product;
  });
  const received = async () => {
    var input = {
      id: props.taskID,
      retailerID: props.retailerID,
      supplierID: props.supplierID,
      paid: false,
      amount: sum,
      payBefore: dayjs().add(8, 'hour').add(30, 'day').format('DD-MM-YYYY'),
      receipt: null,
    };
    try {
      const paymentTaskResponse = API.graphql({
        query: createPaymentTask,
        variables: {input: input},
      });
      console.log('payment success!');
    } catch (e) {
      console.log(e);
    }
    var input = {
      id: props.taskID,
      retailerID: props.retailerID,
      supplierID: props.supplierID,
      items: props.goods,
      paid: false,
      amount: sum,
      receivedBy: props.user.name,
    };
    try {
      const invoiceResponse = API.graphql({
        query: createInvoice,
        variables: {input: input},
      });
      console.log('success!');
    } catch (e) {
      console.log(e);
    }
    try {
      const invoiceResponse = await API.graphql({
        query: deleteGoodsTask,
        variables: {input: {id: props.taskID}},
      });
      var tempList = props.receiveTask;
      for (let [i, temp] of tempList.entries()) {
        if (temp.id == props.taskID) {
          tempList.splice(i, 1);
        }
      }
      props.setReceiveTask(tempList);
      setSuccessfulModal(true);
      console.log('deleted!');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('80%'),
        backgroundColor: Colors.GRAY_WHITE,
        borderRadius: 10,
      }}>
      <View
        style={{
          position: 'absolute',
          right: wp('1%'),
          top: hp('1%'),
        }}>
        <CloseButton setModal={props.setReceiveModal} />
      </View>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('7%'),
            left: wp('8%'),
          },
        ]}>
        Order Created
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            right: wp('7%'),
            top: hp('7%'),
            fontStyle: 'italic',
          },
        ]}>
        Order #{props.taskID.slice(0, 6)}
      </Text>
      <Text
        style={[
          Typography.header,
          {
            position: 'absolute',
            top: hp('11%'),
            left: wp('8%'),
          },
        ]}>
        {dayjs(props.createdAt).add(8, 'hour').format('DD MMMM, YYYY')}
      </Text>
      <View
        style={{
          borderBottomWidth: wp('1%'),
          width: wp('80%'),
          alignSelf: 'center',
          top: hp('18%'),
          borderColor: Colors.GRAY_MEDIUM,
          position: 'absolute',
        }}></View>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('19%'),
            left: wp('8%'),
          },
        ]}>
        {Strings.items}: {props.goods.length}
      </Text>
      <View
        style={{
          position: 'absolute',
          top: hp('23%'),
          left: wp('8%'),
          width: wp('75%'),
          height: hp('24%'),
        }}>
        <ProductList data={props.goods}></ProductList>
      </View>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('50%'),
            left: wp('55%'),
          },
        ]}>
        Total: RM {sum}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('55%'),
            left: wp('8%'),
          },
        ]}>
        {Strings.deliveryDate}:
      </Text>
      {props.deliverydate ? (
        <Text
          style={[
            Typography.small,
            {
              position: 'absolute',
              top: hp('55%'),
              left: wp('40%'),
            },
          ]}>
          {props.deliverydate}
        </Text>
      ) : (
        <Text
          style={[
            Typography.small,
            {
              position: 'absolute',
              top: hp('55%'),
              left: wp('40%'),
            },
          ]}>
          Supplier has not indicated delivery date yet
        </Text>
      )}

      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('60%'),
            left: wp('8%'),
          },
        ]}>
        Seller:
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            top: hp('60%'),
            left: wp('40%'),
          },
        ]}>
        {props.supplier.name}
      </Text>
      {props.sentByRetailer ? (
        <TouchableOpacity
          onPress={() => {
            if (props.trigger) {
              props.setTrigger(false);
            } else {
              props.setTrigger(true);
            }
            received();
          }}
          style={{
            backgroundColor: Colors.LIGHT_BLUE,
            width: wp('40%'),
            height: hp('5%'),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 5,
            position: 'absolute',
            bottom: hp('8%'),
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 3,
            flexDirection: 'row',
          }}>
          <Text style={[Typography.normal, {}]}>
            {Strings.recieved}
            {'\t\t'}
          </Text>
          <Icon name="checkmark-circle-outline" size={wp('5%')}></Icon>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setReceiveModal(false),
        ]}>
        <SuccessfulModal
          text={
            'You have successfully received your products from ' +
            props.supplier.name
          }
        />
      </Modal>
    </View>
  );
};

const Receive = props => {
  const [receiveModal, setReceiveModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setReceiveModal(true)}
      style={{
        marginBottom: hp('2%'),
        width: wp('85%'),
        height: hp('12%'),
      }}>
      <View
        style={{
          backgroundColor: Colors.GRAY_LIGHT,
          borderRadius: 10,
          flexDirection: 'row',
          width: wp('85%'),
          height: hp('12.5%'),
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}>
        <View
          style={{
            backgroundColor: Colors.GRAY_BLACK,
            height: hp('12.5%'),
            width: wp('4.5%'),
            borderRadius: 10,
          }}></View>
        <View
          style={{
            backgroundColor: Colors.GRAY_LIGHT,
            height: hp('12.5%'),
            width: wp('23%'),
            right: wp('2%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{bottom: hp('0.5%')}}>
            {props.sentByRetailer ? (
              <Icon
                name="cube-outline"
                color={Colors.LIME_GREEN}
                size={wp('11%')}
              />
            ) : (
              <Icon name="cube-outline" size={wp('11%')} />
            )}
          </View>
        </View>
        <Text
          style={[
            Typography.normal,
            {
              color: Colors.LIME_GREEN,
              top: hp('3%'),
              left: wp('25%'),
              position: 'absolute',
            },
          ]}>
          {props.supplier.name}
        </Text>
        <Text
          style={[
            Typography.small,
            {
              color: 'grey',
              top: hp('7%'),
              left: wp('25%'),
              position: 'absolute',
            },
          ]}>
          {props.goods.length} {Strings.items}
        </Text>
        <Text
          style={[
            Typography.small,
            {
              color: 'grey',
              top: hp('6%'),
              right: hp('2%'),
              position: 'absolute',
            },
          ]}>
          {Strings.dateCreated}:
        </Text>
        <Text
          style={[
            Typography.small,
            {
              color: 'grey',
              top: hp('8%'),
              right: hp('2%'),
              position: 'absolute',
              fontStyle: 'italic',
            },
          ]}>
          {dayjs(props.createdAt).add(8, 'hours').format('DD MM YYYY')}
        </Text>
      </View>
      <Modal isVisible={receiveModal}>
        <ReceiveModal
          setReceiveModal={setReceiveModal}
          taskID={props.taskID}
          goods={props.goods}
          supplier={props.supplier}
          retailer={props.retailer}
          retailerID={props.retailerID}
          supplierID={props.supplierID}
          sentByRetailer={props.sentByRetailer}
          createdAt={props.createdAt}
          deliverydate={props.deliverydate}
          user={props.user}
          receiveList={props}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          receiveTask={props.receiveTask}
          setReceiveTask={props.setReceiveTask}></ReceiveModal>
      </Modal>
    </TouchableOpacity>
  );
};

export const ReceiveList = props => {
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.receiveTask}
        extraData={props.trigger}
        numColumns={1}
        renderItem={({item}) => {
          return (
            <Receive
              retailer={item.retailer}
              supplier={item.supplier}
              retailerID={item.retailerID}
              supplierID={item.supplierID}
              goods={item.items}
              createdAt={item.createdAt}
              deliverydate={item.deliveryDate}
              taskID={item.id}
              sentByRetailer={item.sentByRetailer}
              user={props.user}
              trigger={props.trigger}
              setTrigger={props.setTrigger}
              receiveTask={props.receiveTask}
              setReceiveTask={props.setReceiveTask}
            />
          );
        }}
      />
    </View>
  );
};

const ProductList = props => {
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
        keyExtractor={item => {
          console.log('productss;' + item);
          return (
            item.name + item.grade + item.variety + item.quantity.toString()
          );
        }}
        ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          return (
            <Product
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              grade={item.grade}
              variety={item.variety}
              siUnit={item.siUnit}
            />
          );
        }}></FlatList>
    </View>
  );
};

const Product = props => {
  return (
    <View
      style={{
        height: hp('6%'),
        width: wp('75%'),
        justifyContent: 'center',
      }}>
      <Text
        style={[
          Typography.normal,
          {
            textAlign: 'left',
            position: 'absolute',
            bottom: hp('2.5%'),
            left: wp('3%'),
          },
        ]}>
        {props.name}
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            textAlign: 'left',
            position: 'absolute',
            bottom: hp('2.5%'),
            left: wp('25%'),
          },
        ]}>
        {props.grade}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            textAlign: 'left',
            position: 'absolute',
            top: hp('2.5%'),
            left: wp('3%'),
          },
        ]}>
        {props.variety}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            textAlign: 'left',
            left: wp('60%'),
            position: 'absolute',
          },
        ]}>
        | {props.quantity}
        {props.siUnit}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            textAlign: 'left',
            left: wp('40%'),
            position: 'absolute',
          },
        ]}>
        @ RM {props.price}/{props.siUnit}
      </Text>
    </View>
  );
};
