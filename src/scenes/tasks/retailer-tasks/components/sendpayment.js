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
import {updatePaymentTaskBetweenRandS} from '../../../../graphql/mutations';
import Strings from '_utils';
const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};
import {paymentsTaskForRetailerByDate} from '../../../../graphql/queries';
import {BlueButton} from '_components';

//Retailer upload receipt
const UploadReceiptModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const sendReceipt = async () => {
    try {
      const updated = await API.graphql({
        query: updatePaymentTaskBetweenRandS,
        variables: {input: {id: props.id, receipt: 'some receipt'}},
      });
      console.log(updated);
      setSuccessfulModal(true);
      var tempList = props.payTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == props.id) {
          arr[index] = updated.data.updatePaymentTaskBetweenRandS;
        }
      });
      if (props.trigger) {
        props.setTrigger(false);
      } else {
        props.setTrigger(true);
      }
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
        <CloseButton setModal={props.setUploadReceiptModal} />
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
        {Strings.sendBefore}: {''}
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
        {Strings.paymentTo}:
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            top: hp('23%'),
            left: wp('43%'),
          },
        ]}>
        {props.supplier.name}
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
            left: wp('43%'),
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
            left: wp('43%'),
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
        {Strings.bankName}:
      </Text>
      {props.supplier.bankAccount == null ? (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              top: hp('38%'),
              left: wp('43%'),
            },
          ]}>
          Not Added Yet
        </Text>
      ) : (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              top: hp('38%'),
              left: wp('43%'),
            },
          ]}>
          {props.supplier.bankAccount.bankName}
        </Text>
      )}
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('43%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.bankDetails}:
      </Text>
      {props.supplier.bankAccount == null ? (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              top: hp('43%'),
              left: wp('43%'),
            },
          ]}>
          Not Added Yet
        </Text>
      ) : (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              top: hp('43%'),
              left: wp('43%'),
            },
          ]}>
          {props.supplier.bankAccount.accountNumber}
        </Text>
      )}
      <Text
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
            left: wp('43%'),
          },
        ]}>
        9065 7756 8989
      </Text>
      <BlueButton
        onPress={() => sendReceipt()}
        text={Strings.paid}
        font={Typography.normal}
        borderRadius={10}
        icon="receipt-outline"
        offsetCenter={wp('5%')}
        top={hp('65%')}
      />

      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setUploadReceiptModal(false),
        ]}>
        <SuccessfulModal text={Strings.successfullyUploaded} />
      </Modal>
    </View>
  );
};

const UploadReceipt = props => {
  const [uploadReceiptModal, setUploadReceiptModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setUploadReceiptModal(true)}
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
            height: hp('12%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{bottom: hp('0.5%')}}>
            <Icon name="cash-outline" size={wp('11%')} color="black" />
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
              top: hp('7.5%'),
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
              top: hp('9%'),
              right: hp('2%'),
              position: 'absolute',
              fontStyle: 'italic',
            },
          ]}>
          {dayjs(props.payBefore, 'DD-MM-YYYY').format('DD MMMM YYYY')}
        </Text>
      </View>
      <Modal isVisible={uploadReceiptModal}>
        <UploadReceiptModal
          setUploadReceiptModal={setUploadReceiptModal}
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
          payTask={props.payTask}
          setPayTask={props.setPayTask}></UploadReceiptModal>
      </Modal>
    </TouchableOpacity>
  );
};

export const UploadReceiptList = props => {
  const [refreshing, setRefreshing] = useState(false);
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.UploadReceiptList}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              try {
                const task = await API.graphql({
                  query: paymentsTaskForRetailerByDate,
                  variables: {
                    retailerID: props.user.retailerCompanyID,
                    sortDirection: 'ASC',
                  },
                });
                console.log(task.data.paymentsTaskForRetailerByDate.items);
                props.setPayTask(task.data.paymentsTaskForRetailerByDate.items);
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
            <UploadReceipt
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
              payTask={props.payTask}
              setPayTask={props.setPayTask}
            />
          );
        }}
      />
    </View>
  );
};
