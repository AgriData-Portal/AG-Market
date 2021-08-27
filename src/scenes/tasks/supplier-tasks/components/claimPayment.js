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
import {API} from 'aws-amplify';
import {
  deletePaymentTaskBetweenRandS,
  deletePaymentTaskBetweenSandF,
  updateInvoiceBetweenRandS,
  updateInvoiceBetweenSandF,
} from '../../../../graphql/mutations';
import Strings from '_utils';
import {
  paymentsTaskRetailerForSupplierByDate,
  paymentsTaskForFarmerByDate,
} from '../../../../graphql/queries';
import {BlueButton} from '_components';
import {log} from '_utils';
import {companyStore} from '_store';
import {Font} from '_components';

export const ReceivePaymentTaskList = props => {
  const [refreshing, setRefreshing] = useState(false);
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);
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
                if (companyType == 'supplier') {
                  const task = await API.graphql({
                    query: paymentsTaskRetailerForSupplierByDate,
                    variables: {
                      supplierID: companyID,
                      sortDirection: 'ASC',
                    },
                  });
                  props.setClaimTask(
                    task.data.paymentsTaskRetailerForSupplierByDate.items,
                  );
                } else {
                  const task = await API.graphql({
                    query: paymentsTaskForFarmerByDate,
                    variables: {
                      farmerID: companyID,
                      sortDirection: 'ASC',
                    },
                  });
                  props.setClaimTask(
                    task.data.paymentsTaskForFarmerByDate.items,
                  );
                }
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
              farmer={item.farmer}
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
              trackingNum={item.trackingNum}
            />
          );
        }}
      />
    </View>
  );
};

const ReceivePaymentTask = props => {
  const [receiveTaskModal, setReceiveTaskModal] = useState(false);
  const companyType = companyStore(state => state.companyType);
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
          backgroundColor:
            props.receipt != null ? '#d4f8d4' : Colors.GRAY_LIGHT,
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
            backgroundColor:
              props.receipt != null ? '#d4f8d4' : Colors.GRAY_LIGHT,
            height: hp('12.5%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{bottom: hp('0.5%')}}>
            <Icon name="cash-outline" size={wp('11%')} color="black" />
          </View>
        </View>
        <Font.Normal
          style={{
            color: Colors.LIME_GREEN,
            top: hp('1%'),
            left: wp('25%'),
            position: 'absolute',
          }}>
          {companyType == 'supplier'
            ? props.retailer.name
            : props.supplier.name}
        </Font.Normal>
        <Font.Small
          style={{left: wp('25%'), top: hp('3.5%'), position: 'absolute'}}>
          {props.trackingNum}
        </Font.Small>
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
            top: hp('7.5%'),
            right: hp('2%'),
            position: 'absolute',
          }}>
          {Strings.recieveBefore}:
        </Font.Small>
        <Font.Small
          style={{
            color: 'grey',
            top: hp('9%'),
            right: hp('2%'),
            position: 'absolute',
            fontStyle: 'italic',
          }}>
          {dayjs(props.payBefore, 'DD-MM-YYYY').format('DD MMM YYYY')}
        </Font.Small>
      </View>
      <Modal isVisible={receiveTaskModal}>
        <ReceivePaymentModal
          setReceiveTaskModal={setReceiveTaskModal}
          retailer={props.retailer}
          supplier={props.supplier}
          farmer={props.farmer}
          paid={props.paid}
          amount={props.amount}
          payBefore={props.payBefore}
          receipt={props.receipt}
          id={props.id}
          trackingNum={props.trackingNum}
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
  const companyType = companyStore(state => state.companyType);

  const receivedPayment = async () => {
    try {
      if (companyType == 'supplier') {
        await API.graphql({
          query: deletePaymentTaskBetweenRandS,
          variables: {input: {id: props.id}},
        });
      } else {
        await API.graphql({
          query: deletePaymentTaskBetweenSandF,
          variables: {input: {id: props.id}},
        });
      }

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
      if (companyType == 'supplier') {
        await API.graphql({
          query: updateInvoiceBetweenRandS,
          variables: {input: {id: props.id, paid: true}},
        });
      } else {
        await API.graphql({
          query: updateInvoiceBetweenSandF,
          variables: {input: {id: props.id, paid: true}},
        });
      }

      setSuccessfulModal(true);
    } catch (e) {
      log(e);
      log('fail to update');
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
        {Strings.recieveBefore}:
        {dayjs(props.payBefore, 'DD-MM-YYYY').format('DD MMM YYYY')}
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
      <Font.Small
        style={{
          position: 'absolute',
          top: hp('23%'),
          left: wp('5%'),
        }}>
        {Strings.paymentFrom}:
      </Font.Small>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('23%'),
          left: wp('40%'),
        }}>
        {companyType == 'supplier' ? props.retailer.name : props.supplier.name}
      </Font.Normal>
      <Font.Small
        style={{
          position: 'absolute',
          top: hp('28%'),
          left: wp('5%'),
        }}>
        {Strings.order} #:
      </Font.Small>
      <Font.Normal
        style={{
          position: 'absolute',
          top: hp('28%'),
          left: wp('40%'),
        }}>
        #{props.trackingNum}
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
          left: wp('40%'),
        }}>
        {dayjs(props.createdAt).format('DD MMM YYYY')}
      </Font.Normal>
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('38%'),
          left: wp('5%'),
        }}>
        {Strings.bankName}:
      </Font.Placeholder>

      {(companyType == 'supplier' && props.supplier.bankAccount == null) ||
      (companyType == 'farmer' && props.farmer.bankAccount == null) ? (
        <Font.Normal
          style={{
            position: 'absolute',
            top: hp('38%'),
            left: wp('40%'),
          }}>
          {Strings.notAddedYet}
        </Font.Normal>
      ) : (
        <Font.Normal
          style={{
            position: 'absolute',
            top: hp('38%'),
            left: wp('40%'),
          }}>
          {companyType == 'supplier'
            ? props.supplier.bankAccount.bankName
            : props.farmer.bankAccount.bankName}
        </Font.Normal>
      )}
      <Font.Placeholder
        style={{
          position: 'absolute',
          top: hp('43%'),
          left: wp('5%'),
        }}>
        {Strings.bankDetails}:
      </Font.Placeholder>

      {(companyType == 'supplier' && props.supplier.bankAccount == null) ||
      (companyType == 'farmer' && props.farmer.bankAccount == null) ? (
        <Font.Normal
          style={{
            position: 'absolute',
            top: hp('43%'),
            left: wp('40%'),
          }}>
          {Strings.notAddedYet}
        </Font.Normal>
      ) : (
        <Font.Normal
          style={{
            position: 'absolute',
            top: hp('43%'),
            left: wp('40%'),
          }}>
          {companyType == 'supplier'
            ? props.supplier.bankAccount.accountNumber
            : props.farmer.bankAccount.accountNumber}
        </Font.Normal>
      )}

      {/* <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('48%'),
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
            top: hp('48%'),
            left: wp('45%'),
          },
        ]}>
        9065 7756 8989
      </Text> */}
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
