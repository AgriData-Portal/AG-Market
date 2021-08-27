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
import {
  deletePaymentTaskBetweenSandF,
  updateInvoiceBetweenSandF,
} from '../../../../graphql/mutations';
import Strings from '_utils';
import {paymentsTaskForFarmerByDate} from '../../../../graphql/queries';
import {log} from '_utils';
import {Font} from '_components';

const now = () => {
  const now = dayjs().format('DD MMM YYYY');
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
                  query: paymentsTaskForFarmerByDate,
                  variables: {
                    supplierID: props.user.supplierCompanyID,
                    sortDirection: 'ASC',
                  },
                });
                props.setClaimTask(task.data.paymentsTaskForFarmerByDate.items);
                log(task.data.paymentsTaskForFarmerByDate.items);
                log('payment task');
              } catch (e) {
                log(e);
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
        <Font.Normal
          style={{
            color: Colors.LIME_GREEN,
            top: hp('3%'),
            left: wp('25%'),
            position: 'absolute',
          }}>
          {props.retailer.name}
        </Font.Normal>
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
        <Font.Normal
          style={{
            color: 'black',
            top: hp('5%'),
            left: wp('25%'),
            position: 'absolute',
          }}>
          {Strings.amount}: {props.amount}
        </Font.Normal>
        <Font.Small
          style={{
            color: 'grey',
            top: hp('6%'),
            right: hp('2%'),
            position: 'absolute',
          }}>
          {Strings.recieveBefore}:
        </Font.Small>
        <Font.Small
          style={{
            color: 'grey',
            top: hp('8%'),
            right: hp('2%'),
            position: 'absolute',
            fontStyle: 'italic',
          }}>
          {dayjs(props.payBefore, 'DD MMM YYYY').format('DD MMM YYYY')}
        </Font.Small>
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
        query: deletePaymentTaskBetweenSandF,
        variables: {input: {id: props.id}},
      });
      log(removed);
      var tempList = props.claimTask;
      for (let [i, temp] of tempList.entries()) {
        if (temp.id == props.id) {
          tempList.splice(i, 1);
        }
      }
      props.setClaimTask(tempList);
    } catch (e) {
      log(e);
    }
    try {
      const updated = await API.graphql({
        query: updateInvoiceBetweenSandF,
        variables: {input: {id: props.id, paid: true}},
      });
      log(updated);
      setSuccessfulModal(true);
    } catch (e) {
      log(e);
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

      <Font.Header
        style={{
          position: 'absolute',
          fontFamily: 'Poppins-SemiBold',
          top: hp('5%'),
          left: wp('5%'),
        }}>
        {Strings.paymentAlert}
      </Font.Header>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('11%'),
          left: wp('5%'),
        }}>
        {Strings.recieveBefore}:{' '}
        {dayjs(props.payBefore, 'DD MMM YYYY').format('DD MMM YYYY')}
      </Font.Placeholder>
      <View
        style={{
          borderBottomWidth: 2,
          width: wp('80%'),
          alignSelf: 'center',
          top: hp('17%'),
          borderColor: Colors.GRAY_MEDIUM,
          position: 'absolute',
        }}></View>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('23%'),
          left: wp('5%'),
        }}>
        {Strings.paymentFrom}:
      </Font.Placeholder>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('23%'),
          left: wp('45%'),
        }}>
        {props.retailer.name}
      </Font.Normal>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('28%'),
          left: wp('5%'),
        }}>
        {Strings.order} #:
      </Font.Placeholder>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('28%'),
          left: wp('45%'),
        }}>
        #{props.id.slice(0, 6)}
      </Font.Normal>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('33%'),
          left: wp('5%'),
        }}>
        {Strings.orderedOn}:
      </Font.Placeholder>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('33%'),
          left: wp('45%'),
        }}>
        {dayjs(props.createdAt).format('DD MMM YYYY')}
      </Font.Normal>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('38%'),
          left: wp('5%'),
        }}>
        {Strings.bank}:
      </Font.Placeholder>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('38%'),
          left: wp('45%'),
        }}>
        Bank
      </Font.Normal>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('43%'),
          left: wp('5%'),
        }}>
        {Strings.reference} #:
      </Font.Placeholder>
      {/* TODO */}
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('43%'),
          left: wp('45%'),
        }}>
        9065 7756 8989
      </Font.Normal>
      <BlueButton
        onPress={() => [receivedPayment()]}
        text={Strings.recieved}
        font={Typography.normal}
        borderRadius={10}
        icon="checkmark-circle-outline"
        position={'absolute'}
        offsetCenter={wp('5%')}
        top={hp('65%')}
      />
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
