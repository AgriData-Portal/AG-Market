import React, {useState, useEffect, useContext} from 'react';
import {View, TextInput, FlatList, Text, Platform} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';

import Modal from 'react-native-modal';
import {CloseButton, SuccessfulModal} from '_components';

import {
  QuotationItemsContext,
  QuotationItemsProvider,
} from './quotationContext';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Strings from '_utils';
import {BlueButton} from '_components';
import NewOrderQuotation from './new-quotation';
import {userStore} from '_store';

export const PurchaseOrder = props => {
  const [orderQuotation, setOrderQuotation] = useState(false);
  const companyType = userStore(state => state.companyType);

  const companyID = userStore(state => state.companyID);
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
          <Text
            style={[
              Typography.normal,
              {
                top: hp('3%'),
              },
            ]}>
            {props.contentType}
          </Text>
        </View>
        <View
          style={{
            height: hp('50%'),
            top: hp('5%'),
            borderRadius: 10,
          }}>
          <PurchaseOrderList
            content={props.content}
            chatGroupID={props.chatGroupID}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            right: wp('2%'),
            top: hp('0.5%'),
          }}>
          <CloseButton setModal={props.setPurchaseOrderModal} />
        </View>
        {companyType == 'farmer' ||
        (companyType == 'supplier' &&
          props.chatGroupID.slice(36, 72) == companyID) ? (
          <BlueButton
            onPress={() => [setOrderQuotation(true)]}
            text={'Create Order Quotation'}
            font={Typography.normal}
            borderRadius={10}
            position={'absolute'}
            top={hp('70%')}
          />
        ) : (
          <View></View>
        )}
        <Modal isVisible={orderQuotation}>
          <NewOrderQuotation
            chatName={props.chatName}
            chatGroupID={props.chatGroupID}
            setOrderQuotation={setOrderQuotation}
            setPurchaseOrderModal={props.setPurchaseOrderModal}
            setMessages={props.setMessages}
            messages={props.messages}
          />
        </Modal>
      </View>
    </QuotationItemsProvider>
  );
};

const PurchaseOrderList = props => {
  const [quotationItems, setQuotationItems] = useContext(QuotationItemsContext);
  const fetchPO = () => {
    var poArray = props.content.split('/');
    poArray.forEach((item, index, arr) => {
      var temp = item.split('+');
      var itemObject = {};
      itemObject['id'] = temp[0];
      itemObject['name'] = temp[1];
      itemObject['quantity'] = temp[2];
      itemObject['siUnit'] = temp[3];
      itemObject['variety'] = temp[4];
      itemObject['grade'] = temp[5];
      itemObject['index'] = index;
      arr[index] = itemObject;
    });
    setQuotationItems(poArray);
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
