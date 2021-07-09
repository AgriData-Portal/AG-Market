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
import {CloseButton} from '_components';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {DismissKeyboard} from '_components';
import Strings from '_utils';
const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

//Retailer upload receipt
const UploadReceiptModal = props => {
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
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('12%'),
            right: wp('4%'),
          },
        ]}>
        11:00 AM
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            right: wp('4%'),
            top: hp('15%'),
            fontStyle: 'italic',
          },
        ]}>
        22 July, 2021
      </Text>
      <Text
        style={[
          Typography.welcome,
          {
            position: 'absolute',
            fontFamily: 'Poppins-SemiBold',
            top: hp('6%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.paymentAlert}
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
            top: hp('23%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.paymentTo}:
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            top: hp('23%'),
            left: wp('43%'),
          },
        ]}>
        Matthew's Farm
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
          Typography.small,
          {
            position: 'absolute',
            top: hp('28%'),
            left: wp('43%'),
          },
        ]}>
        #12345
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
        {Strings.dateOfPayment}:
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            top: hp('33%'),
            left: wp('43%'),
          },
        ]}>
        22 July, 2021
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
        Bank:
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            top: hp('38%'),
            left: wp('43%'),
          },
        ]}>
        MayBank
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
          Typography.small,
          {
            position: 'absolute',
            top: hp('43%'),
            left: wp('43%'),
          },
        ]}>
        9065 7756 8989
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('45%'),
          height: hp('5%'),
          alignSelf: 'center',
          justifyContent: 'center',
          elevation: 5,
          position: 'absolute',
          bottom: hp('10%'),
          borderRadius: 10,
          flexDirection: 'row',
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
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text style={[Typography.normal, {textAlign: 'center'}]}>
            {Strings.uploadReciept}
          </Text>
          <Icon
            name="receipt-outline"
            size={wp('5%')}
            style={{left: wp('3%')}}
          />
        </View>
      </TouchableOpacity>
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
            <Icon name="cash-outline" size={wp('11%')} />
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
          {props.supplierName}
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
          {props.items} {Strings.items}
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
          {props.createdAt}
        </Text>
      </View>
      <Modal isVisible={uploadReceiptModal}>
        <UploadReceiptModal
          setUploadReceiptModal={setUploadReceiptModal}
          uploadReceiptList={props}></UploadReceiptModal>
      </Modal>
    </TouchableOpacity>
  );
};

export const UploadReceiptList = props => {
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.UploadReceiptList}
        numColumns={1}
        renderItem={({item}) => {
          return (
            <UploadReceipt
              createdAt={item.createdAt}
              items={item.items}
              supplierName={item.supplierName}
            />
          );
        }}
      />
    </View>
  );
};
