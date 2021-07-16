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
import {DismissKeyboard} from '_components';
import {API} from 'aws-amplify';
import {deletePaymentTask, updateInvoice} from '../../../../graphql/mutations';
import Strings from '_utils';
import {
  listGoodsTasks,
  goodsTaskForSupplierByDate,
  paymentsTaskForSupplierByDate,
} from '../../../../graphql/queries';
import {Rating, AirbnbRating} from 'react-native-ratings';

const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

export const ReceivePaymentTaskList = props => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.data}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              try {
                const task = await API.graphql({
                  query: paymentsTaskForSupplierByDate,
                  variables: {
                    supplierID: props.user.supplierCompanyID,
                    sortDirection: 'ASC',
                  },
                });
                props.setClaimTask(
                  task.data.paymentsTaskForSupplierByDate.items,
                );
                console.log(task.data.paymentsTaskForSupplierByDate.items);
                console.log('payment task');
              } catch (e) {
                console.log(e);
              }
              if (props.trigger) {
                props.setTrigger(false);
              } else {
                props.setTrigger(true);
              }
              setRefreshing(false);
            }}
          />
        }
        renderItem={({item}) => {
          return (
            <ReceivePaymentTask
              retailer={item.retailer}
              supplier={item.supplier}
              paid={item.paid}
              amount={item.amount}
              payBefore={item.payBefore}
              receipt={item.receipt}
              createdAt={item.createdAt}
              id={item.id}
              trigger={props.trigger}
              setTrigger={props.setTrigger}
              claimTask={props.claimTask}
              setClaimTask={props.setClaimTask}
            />
          );
        }}
      />
    </View>
  );
};

const ReceivePaymentTask = props => {
  const [receiveTaskModal, setReceiveTaskModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setReceiveTaskModal(true)}
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
          height: hp('12%'),
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
            height: hp('12%'),
            width: wp('2%'),
            borderRadius: 10,
          }}></View>
        <View
          style={{
            backgroundColor: Colors.GRAY_LIGHT,
            height: hp('12.5%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {props.receipt != null ? (
            <View style={{bottom: hp('0.5%')}}>
              <Icon
                name="cash-outline"
                size={wp('11%')}
                color={Colors.LIME_GREEN}
              />
            </View>
          ) : (
            <View style={{bottom: hp('0.5%')}}>
              <Icon name="cash-outline" size={wp('11%')} />
            </View>
          )}
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
          {props.retailer.name}
        </Text>
        {/*} {props.paid ? (
          <Text
            style={[
              Typography.normal,
              {
                color: Colors.LIME_GREEN,
                bottom: hp('5%'),
                left: wp('50%'),
                position: 'absolute',
              },
            ]}>
            PAID
          </Text>
        ) : (
          <Text
            style={[
              Typography.normal,
              {
                color: Colors.LIME_GREEN,
                bottom: hp('8%'),
                left: wp('65%'),
                position: 'absolute',
              },
            ]}>
            NOT PAID
          </Text>
          )} */}
        <Text
          style={[
            Typography.normal,
            {
              color: 'black',
              top: hp('5%'),
              left: wp('25%'),
              position: 'absolute',
            },
          ]}>
          {Strings.amount}: {props.amount}
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
          {Strings.recieveBefore}:
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
          {dayjs(props.payBefore, 'DD-MM-YYYY').format('DD MMMM YYYY')}
        </Text>
      </View>
      <Modal isVisible={receiveTaskModal}>
        <ReceivePaymentModal
          setReceiveTaskModal={setReceiveTaskModal}
          retailer={props.retailer}
          supplier={props.supplier}
          paid={props.paid}
          amount={props.amount}
          payBefore={props.payBefore}
          receipt={props.receipt}
          id={props.id}
          createdAt={props.createdAt}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          claimTask={props.claimTask}
          setClaimTask={props.setClaimTask}></ReceivePaymentModal>
      </Modal>
    </TouchableOpacity>
  );
};

const ReceivePaymentModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const receivedPayment = async () => {
    try {
      const removed = await API.graphql({
        query: deletePaymentTask,
        variables: {input: {id: props.id}},
      });
      console.log(removed);
      var tempList = props.claimTask;
      for (let [i, temp] of tempList.entries()) {
        if (temp.id == props.id) {
          tempList.splice(i, 1);
        }
      }
      props.setClaimTask(tempList);
    } catch (e) {
      console.log(e);
    }
    try {
      const updated = await API.graphql({
        query: updateInvoice,
        variables: {input: {id: props.id, paid: true}},
      });
      console.log(updated);
      setSuccessfulModal(true);
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
        <CloseButton setModal={props.setReceiveTaskModal} />
      </View>

      <Text
        style={[
          Typography.header,
          {
            position: 'absolute',
            fontFamily: 'Poppins-SemiBold',
            top: hp('5%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.paymentAlert}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('11%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.recieveBefore}:{' '}
        {dayjs(props.payBefore, 'DD-MM-YYYY').format('DD MMMM YYYY')}
      </Text>
      <View
        style={{
          borderBottomWidth: 2,
          width: wp('80%'),
          alignSelf: 'center',
          top: hp('17%'),
          borderColor: Colors.GRAY_MEDIUM,
          position: 'absolute',
        }}></View>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('23%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.paymentFrom}:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('23%'),
            left: wp('45%'),
          },
        ]}>
        {props.retailer.name}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('28%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.order} #:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('28%'),
            left: wp('45%'),
          },
        ]}>
        #{props.id.slice(0, 6)}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('33%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.orderedOn}:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('33%'),
            left: wp('45%'),
          },
        ]}>
        {dayjs(props.createdAt).add(8, 'hour').format('DD MMMM YYYY')}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('38%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.bank}:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('38%'),
            left: wp('45%'),
          },
        ]}>
        Bank
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('43%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.reference} #:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('43%'),
            left: wp('45%'),
          },
        ]}>
        9065 7756 8989
      </Text>
      <TouchableOpacity
        onPress={() => [receivedPayment()]}
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('30%'),
          height: hp('5%'),
          alignSelf: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          position: 'absolute',
          bottom: hp('10%'),
          borderRadius: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={[Typography.normal, {textAlign: 'center'}]}>
            {Strings.recieved}
          </Text>
          <Icon
            name="checkmark-circle-outline"
            size={wp('5%')}
            style={{left: wp('2%')}}></Icon>
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => {
          if (props.trigger) {
            props.setTrigger(false);
          } else {
            props.setTrigger(true);
          }
          setSuccessfulModal(false);
          props.setReceiveTaskModal(false);
        }}>
        <SuccessfulModal text={Strings.recievedPayment} />
      </Modal>
    </View>
  );
};
