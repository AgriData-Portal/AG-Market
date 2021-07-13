import React, {useState, useContext} from 'react';
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
import {CloseButton} from '_components';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import dayjs from 'dayjs';
import {createPDF, createCSV} from './file-creation';

export const OrderList = props => {
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.invoiceList}
        numColumns={1}
        renderItem={({item}) => {
          if (props.user.retailerCompanyID == null) {
            var company = item.retailer;
          } else {
            var company = item.supplier;
          }
          return (
            <Order
              id={item.id}
              amount={item.amount}
              company={company}
              goods={item.items}
              paid={item.paid}
              amount={item.amount}
              receivedBy={item.receivedBy}
              createdAt={item.createdAt}
              user={props.user}
            />
          );
        }}
      />
    </View>
  );
};

const Order = props => {
  const [invoiceModal, setInvoiceModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setInvoiceModal(true)}
      style={{
        marginBottom: 10,
        width: wp('90%'),
        height: hp('13%'),
        alignItems: 'center',
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
            height: hp('12%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name="clipboard-outline" size={wp('11%')} />
        </View>
        <Text
          style={[
            Typography.normal,
            {
              color: Colors.LIME_GREEN,
              top: hp('2%'),
              left: wp('25%'),
              position: 'absolute',
            },
          ]}>
          {props.company.name}
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
          Amount: {props.amount}
        </Text>
        {props.paid ? (
          <Text
            style={[
              Typography.normal,
              {
                color: Colors.LIME_GREEN,
                top: hp('1%'),
                right: wp('2%'),
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
                color: 'red',
                top: hp('1%'),
                right: wp('2%'),
                position: 'absolute',
              },
            ]}>
            NOT PAID
          </Text>
        )}
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
          Invoice Date:
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
          {dayjs(props.createdAt).format('DD MMM YYYY')}
        </Text>
      </View>
      <Modal isVisible={invoiceModal}>
        <InvoiceModal
          setInvoiceModal={setInvoiceModal}
          id={props.id}
          amount={props.amount}
          company={props.company}
          goods={props.goods}
          paid={props.paid}
          amount={props.amount}
          receivedBy={props.receivedBy}
          createdAt={props.createdAt}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const InvoiceModal = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          width: wp('90%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('82%'),
        backgroundColor: Colors.GRAY_WHITE,
        borderRadius: 10,
      }}>
      <View
        style={{
          position: 'absolute',
          right: wp('1%'),
          top: hp('1%'),
        }}>
        <CloseButton setModal={props.setInvoiceModal} />
      </View>
      <Text
        style={[
          Typography.header,
          {
            position: 'absolute',
            top: hp('4%'),
            left: wp('5%'),
          },
        ]}>
        {Strings.invoice} #{props.id.slice(0, 6)}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            right: wp('5%'),
            top: hp('8%'),
          },
        ]}>
        {dayjs(props.createdAt).add(8, 'hour').format('DD MMMM YYYY')}
      </Text>
      <Text
        style={[
          Typography.normal,
          {
            top: hp('8.5%'),
            left: wp('5%'),
          },
        ]}>
        {props.company.name}
      </Text>
      {props.paid ? (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              textAlign: 'right',
              top: hp('10%'),
              right: wp('5%'),
              color: Colors.LIME_GREEN,
            },
          ]}>
          PAID
        </Text>
      ) : (
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              textAlign: 'right',
              top: hp('10%'),
              right: wp('5%'),
              color: Colors.LIGHT_RED,
            },
          ]}>
          NOT PAID
        </Text>
      )}
      <View
        style={{
          borderBottomWidth: 2,
          width: wp('80%'),
          alignSelf: 'center',
          top: hp('13%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
      <View style={{top: hp('14%')}}>
        <View
          style={{
            width: wp('90%'),
            maxHeight: hp('50%'),
          }}>
          <FlatList
            keyExtractor={item =>
              item.name +
              item.price.toString() +
              item.quantity.toString() +
              item.variety
            }
            data={props.goods}
            numColumns={1}
            ItemSeparatorComponent={Seperator}
            renderItem={({item}) => {
              console.log(item);
              return (
                <InvoiceItem
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  siUnit={item.siUnit}
                  variety={item.variety}
                  grade={item.grade}
                />
              );
            }}
          />
        </View>
        <Text
          style={[
            Typography.normal,
            {
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'right',
              marginTop: hp('2%'),
              right: wp('5%'),
            },
          ]}>
          {Strings.total}: RM {props.amount}
        </Text>
      </View>

      <Text
        style={[
          Typography.normal,
          {
            position: 'absolute',
            textAlign: 'right',
            top: hp('65%'),
            right: wp('5%'),
          },
        ]}>
        Received By: {props.receivedBy}
      </Text>

      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('23%'),
          height: hp('5%'),
          bottom: hp('5%'),
          right: wp('7%'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() =>
          createPDF(
            (id = props.id),
            (company = props.company),
            (createdAt = props.createdAt),
            (items = props.goods),
            (amount = props.amount),
            (receivedBy = props.receivedBy),
          )
        }>
        <Text style={[Typography.normal, {left: wp('3%')}]}>PDF</Text>
        <View style={{position: 'absolute', right: wp('3%')}}>
          <Icon name="cloud-download-outline" size={wp('5.5%')} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: 'absolute',
          backgroundColor: Colors.PALE_GREEN,
          width: wp('23%'),
          height: hp('5%'),
          bottom: hp('5%'),
          right: wp('35%'),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() =>
          createCSV(
            (id = props.id),
            (company = props.company),
            (createdAt = props.createdAt),
            (items = props.goods),
            (amount = props.amount),
            (receivedBy = props.receivedBy),
          )
        }>
        <Text style={[Typography.normal, {left: wp('3%')}]}>CSV</Text>
        <View style={{position: 'absolute', right: wp('3%')}}>
          <Icon name="cloud-download-outline" size={wp('5.5%')} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const InvoiceItem = props => {
  return (
    <View
      style={{
        width: wp('85%'),
        height: hp('6%'),
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text style={[Typography.small, {position: 'absolute', left: wp('3%')}]}>
        {props.name}
      </Text>
      <Text style={[Typography.small, {position: 'absolute', left: wp('25%')}]}>
        |{props.quantity}
        {props.siUnit}
      </Text>
      <Text style={[Typography.small, {position: 'absolute', left: wp('40%')}]}>
        @ RM{props.price}/{props.siUnit}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            right: wp('3%'),
          },
        ]}>
        RM {props.price * props.quantity}
      </Text>
    </View>
  );
};
export const SortModal = props => {
  return (
    <View
      style={{
        position: 'absolute',
        right: wp('8%'),
        top: hp('18%'),
        backgroundColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
        width: wp('53%'),
        height: hp('17%'),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('50%'),
          height: hp('3.3%'),
          borderRadius: 20,
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="time-outline" size={wp('6%')} />
          <Icon name="arrow-up-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.oldest}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('50%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="time-outline" size={wp('6%')} />
          <Icon name="arrow-down-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.latest}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('50%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="pricetags-outline" size={wp('6%')} />
          <Icon name="arrow-up-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.leastExpensive}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('50%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="pricetags-outline" size={wp('6%')} />
          <Icon name="arrow-down-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.mostExpensive}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
