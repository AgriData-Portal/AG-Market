import React, {useState, useEffect, useRef} from 'react';
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
  invoiceForRetailerByDate,
  invoiceRetailerForSupplierByDate,
  invoiceForFarmerByDate,
  invoiceFarmerForSupplierByDate,
} from '../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {API} from 'aws-amplify';
import dayjs from 'dayjs';
import {createPDF} from './deprecated-create-pdf';
import {createCSV} from './deprecated-create-csv';
import {BlueButton} from '_components';
import {log, orders} from '_utils';
import {companyStore} from '_store';
import {Font} from '_components';

import ViewShot from 'react-native-view-shot';

export const OrderList = props => {
  const [refreshing, setRefreshing] = useState(false);
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);

  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.invoiceList}
        extraData={props.sellerState}
        numColumns={1}
        onEndReached={() => {
          props.setRefresh(state => state + 1);
          log('endReached');
        }}
        onEndReachedThreshold={0.6}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              if (companyType == 'supplier') {
                try {
                  if (props.sellerState == false) {
                    const invoice = await API.graphql({
                      query: invoiceRetailerForSupplierByDate,
                      variables: {
                        supplierID: companyID,
                        sortDirection: 'DESC',
                      },
                    });
                    log(invoice.data.invoiceRetailerForSupplierByDate.items);
                    props.setInvoiceList(
                      invoice.data.invoiceRetailerForSupplierByDate.items,
                    );
                    props.setLoading(false);
                    log('supplierCompanyWithRetailerInvoices');
                  } else {
                    const invoice = await API.graphql({
                      query: invoiceFarmerForSupplierByDate,
                      variables: {
                        supplierID: companyID,
                        sortDirection: 'DESC',
                      },
                    });
                    log(invoice.data.invoiceFarmerForSupplierByDate.items);
                    props.setInvoiceList(
                      invoice.data.invoiceFarmerForSupplierByDate.items,
                    );
                    props.setLoading(false);
                    log('supplierCompanyWithFarmerInvoices');
                  }
                } catch (e) {
                  log(e);
                }
              } else if (companyType == 'retailer') {
                try {
                  const invoice = await API.graphql({
                    query: invoiceForRetailerByDate,
                    variables: {
                      retailerID: companyID,
                      sortDirection: 'DESC',
                    },
                  });
                  log(invoice.data.invoiceForRetailerByDate.items);
                  props.setInvoiceList(
                    invoice.data.invoiceForRetailerByDate.items,
                  );
                  props.setLoading(false);
                  log('retailerCompanyInvoices');
                } catch (e) {
                  log(e);
                }
              } else {
                try {
                  const invoice = await API.graphql({
                    query: invoiceForFarmerByDate,
                    variables: {
                      farmerID: companyID,
                      sortDirection: 'DESC',
                    },
                  });
                  log(invoice.data.invoiceForFarmerByDate.items);
                  props.setInvoiceList(
                    invoice.data.invoiceForFarmerByDate.items,
                  );
                  props.setLoading(false);
                  log('farmerCompanyInvoices');
                } catch (e) {
                  log(e);
                }
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
            <Order
              id={item.id}
              trackingNum={item.trackingNum}
              amount={item.amount}
              supplier={item.supplier}
              retailer={item.retailer}
              farmer={item.farmer}
              goods={item.items}
              paid={item.paid}
              amount={item.amount}
              receivedBy={item.receivedBy}
              createdAt={item.createdAt}
              sellerState={props.sellerState}
            />
          );
        }}
      />
    </View>
  );
};

const Order = props => {
  const [invoiceModal, setInvoiceModal] = useState(false);
  const companyType = companyStore(state => state.companyType);
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
        <Font.Small
          style={{
            color: Colors.LIME_GREEN,
            top: hp('1%'),
            left: wp('25%'),
            position: 'absolute',
            fontWeight: 'bold',
          }}>
          {companyType == 'retailer'
            ? props.supplier.name
            : companyType == 'supplier' && props.sellerState == true
            ? props.farmer.name
            : companyType == 'supplier' && props.sellerState == false
            ? props.retailer.name
            : props.supplier.name}
        </Font.Small>
        <Font.Small
          style={{left: wp('25%'), top: hp('3%'), position: 'absolute'}}>
          {props.trackingNum}
        </Font.Small>
        <Font.Normal
          style={{
            color: 'grey',
            top: hp('4.5%'),
            left: wp('25%'),
            position: 'absolute',
          }}>
          {Strings.amount}: {props.amount}
        </Font.Normal>
        {props.paid ? (
          <Font.Small
            style={{
              color: Colors.LIME_GREEN,
              top: hp('2%'),
              right: wp('5%'),
              position: 'absolute',
              fontStyle: 'italic',
            }}>
            {Strings.paid}
          </Font.Small>
        ) : (
          <Font.Small
            style={{
              color: 'red',
              top: hp('2%'),
              right: wp('2%'),
              position: 'absolute',
              fontStyle: 'italic',
            }}>
            {Strings.notPaid}
          </Font.Small>
        )}
        <View style={{flexDirection: 'row', top: hp('8%'), left: wp('-1%')}}>
          <Font.PlaceholderSmall
            style={{
              color: 'grey',
              fontStyle: 'italic',
            }}>
            {Strings.invoiceDate}:
          </Font.PlaceholderSmall>
          <Font.PlaceholderSmall
            style={{
              color: 'grey',
              fontStyle: 'italic',
              marginHorizontal: wp('1%'),
            }}>
            {dayjs(props.createdAt).format('DD MMM YYYY')}
          </Font.PlaceholderSmall>
        </View>
      </View>
      <Modal isVisible={invoiceModal}>
        <InvoiceModal
          setInvoiceModal={setInvoiceModal}
          id={props.id}
          trackingNum={props.trackingNum}
          amount={props.amount}
          supplier={props.supplier}
          retailer={props.retailer}
          farmer={props.farmer}
          goods={props.goods}
          paid={props.paid}
          amount={props.amount}
          receivedBy={props.receivedBy}
          createdAt={props.createdAt}
          sellerState={props.sellerState}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const InvoiceModal = props => {
  const companyType = companyStore(state => state.companyType);
  if (
    companyType == 'retailer' ||
    (companyType == 'supplier' && !props.sellerState)
  ) {
    var rAddress = props.retailer.address;
    var sAddress = props.supplier.address;
    var buyerName = props.retailer.name;
    var sellerName = props.supplier.name;
    var buyerRegistration = props.retailer.registrationNumber;
    var sellerRegistration = props.supplier.registrationNumber;
  } else if (
    companyType == 'farmer' ||
    (companyType == 'supplier' && props.sellerState)
  ) {
    var rAddress = props.supplier.address;
    var sAddress = props.farmer.address;
    var buyerName = props.supplier.name;
    var sellerName = props.farmer.name;
    var buyerRegistration = props.supplier.registrationNumber;
    var sellerRegistration = props.farmer.registrationNumber;
  }
  // const rAddress = props.retailer.address;
  // const sAddress = props.supplier.address;
  const [retailerUnit, retailerStreet, retailerCity] = rAddress.split(',');
  const [supplierUnit, supplierStreet, supplierCity] = sAddress.split(',');
  const [pdfLoading, setpdfLoading] = useState(false);
  const buyerChopref = useRef();
  const sellerChopref = useRef();
  async function captureBuyerChop() {
    const bChop = await buyerChopref.current.capture();
    // console.log(typeof imageURI);
    // console.log(imageURI);
    // const shareOptions = {
    //   url: imageURI,
    // };
    // try {
    //   const ShareResponse = await Share.open(shareOptions);
    // } catch (error) {
    //   log('Error: ', error);
    // }
    return bChop;
  }
  async function captureSellerChop() {
    const sChop = await sellerChopref.current.capture();
    // console.log(typeof imageURI);
    // console.log(imageURI);
    // const shareOptions = {
    //   url: imageURI,
    // };
    // try {
    //   const ShareResponse = await Share.open(shareOptions);
    // } catch (error) {
    //   log('Error: ', error);
    // }
    return sChop;
  }
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
      <Font.Header
        style={{
          position: 'absolute',
          top: hp('4%'),
          left: wp('5%'),
        }}>
        {Strings.invoice} <Font.Normal>#{props.trackingNum}</Font.Normal>
      </Font.Header>
      <Font.Placeholder
        style={{
          position: 'absolute',
          right: wp('5%'),
          top: hp('8%'),
        }}>
        {dayjs(props.createdAt).format('hh:mm a DD MMMM YYYY')}
      </Font.Placeholder>
      <Font.Normal
        style={{
          top: hp('8.5%'),
          left: wp('5%'),
        }}>
        {companyType == 'retailer'
          ? props.supplier.name
          : companyType == 'supplier' && props.sellerState
          ? props.farmer.name
          : companyType == 'supplier' && !props.sellerState
          ? props.retailer.name
          : props.supplier.name}
      </Font.Normal>
      {props.paid ? (
        <Font.Normal
          style={{
            position: 'absolute',
            textAlign: 'right',
            top: hp('11%'),
            right: wp('5%'),
            color: Colors.LIME_GREEN,
          }}>
          {Strings.paid}
        </Font.Normal>
      ) : (
        <Font.Normal
          style={{
            position: 'absolute',
            textAlign: 'right',
            top: hp('11%'),
            right: wp('5%'),
            color: 'red',
          }}>
          {Strings.notPaid}
        </Font.Normal>
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
            maxHeight: hp('40%'),
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
              log(item);
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
        <Font.Normal
          style={{
            fontFamily: 'Poppins-SemiBold',
            textAlign: 'right',
            marginTop: hp('2%'),
            right: wp('5%'),
          }}>
          {Strings.total}: RM {props.amount}
        </Font.Normal>
      </View>
      <ViewShot
        ref={buyerChopref}
        style={{top: hp('200%'), backgroundColor: 'white'}}
        options={{format: 'png', quality: 0.8}}>
        <View
          style={{
            width: wp('80%'),
            borderColor: '#0C5E99',
            borderWidth: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: hp('1%'),
          }}>
          <View
            style={{
              width: wp('70%'),
              borderColor: '#0C5E99',
              borderWidth: 2,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: '#0C5E99',
                fontSize: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              {buyerName}
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                width: wp('60%'),
                alignSelf: 'center',
                borderColor: '#0C5E99',
              }}></View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#0C5E99',
                fontSize: 8,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {retailerUnit}, {retailerStreet}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#0C5E99',
                fontSize: 8,
                alignSelf: 'center',
                textAlign: 'center',
              }}>
              {retailerCity}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: '#0C5E99',
                  fontSize: 8,
                }}>
                Registration No:
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#0C5E99',
                  fontSize: 8,
                }}>
                {buyerRegistration}
              </Text>
            </View>
          </View>
        </View>
      </ViewShot>
      <ViewShot
        ref={sellerChopref}
        style={{top: hp('200%'), backgroundColor: 'white'}}
        options={{format: 'png', quality: 0.8}}>
        <View
          style={{
            width: wp('80%'),
            borderColor: '#0C5E99',
            borderWidth: 5,
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: hp('1%'),
          }}>
          <View
            style={{
              width: wp('70%'),
              borderColor: '#0C5E99',
              borderWidth: 2,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                color: '#0C5E99',
                fontSize: 20,
                alignSelf: 'center',
                justifyContent: 'center',
                textAlign: 'center',
              }}>
              {sellerName}
            </Text>
            <View
              style={{
                borderBottomWidth: 2,
                width: wp('60%'),
                alignSelf: 'center',
                borderColor: '#0C5E99',
              }}></View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#0C5E99',
                fontSize: 8,
                alignSelf: 'center',
              }}>
              {supplierUnit}, {supplierStreet}
            </Text>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#0C5E99',
                fontSize: 8,
                alignSelf: 'center',
              }}>
              {supplierCity}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* TRANSLATION */}
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: '#0C5E99',
                  fontSize: 8,
                }}>
                Registration No:
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#0C5E99',
                  fontSize: 8,
                }}>
                {sellerRegistration}
              </Text>
            </View>
          </View>
        </View>
      </ViewShot>
      <Font.Normal
        style={{
          position: 'absolute',
          textAlign: 'right',
          top: hp('65%'),
          right: wp('5%'),
        }}>
        {Strings.recievedBy}: {props.receivedBy}
      </Font.Normal>
      <BlueButton
        position={'absolute'}
        borderRadius={10}
        text={'PDF'}
        disabled={pdfLoading}
        font={Typography.normal}
        icon="cloud-download-outline"
        offsetCenter={wp('2%')}
        top={hp('70%')}
        left={wp('61%')}
        onPressIn={() => setpdfLoading(true)}
        onPress={async () => {
          const buyerChop = await captureBuyerChop();
          const sellerChop = await captureSellerChop();
          if (companyType == 'supplier') {
            log('supplier');
            if (props.sellerState == false) {
              await orders.createPDF(
                (id = props.trackingNum),
                (buyer = props.retailer),
                (seller = props.supplier),
                (createdAt = props.createdAt),
                (items = props.goods),
                (amount = props.amount),
                (receivedBy = props.receivedBy),
                buyerChop,
                sellerChop,
              );
            } else {
              await orders.createPDF(
                (id = props.trackingNum),
                (buyer = props.supplier),
                (seller = props.farmer),
                (createdAt = props.createdAt),
                (items = props.goods),
                (amount = props.amount),
                (receivedBy = props.receivedBy),
                buyerChop,
                sellerChop,
              );
            }
          } else if (companyType == 'retailer') {
            await orders.createPDF(
              (id = props.trackingNum),
              (buyer = props.retailer),
              (seller = props.supplier),
              (createdAt = props.createdAt),
              (items = props.goods),
              (amount = props.amount),
              (receivedBy = props.receivedBy),
              buyerChop,
              sellerChop,
            );
          } else {
            await orders.createPDF(
              (id = props.trackingNum),
              (buyer = props.supplier),
              (seller = props.farmer),
              (createdAt = props.createdAt),
              (items = props.goods),
              (amount = props.amount),
              (receivedBy = props.receivedBy),
              buyerChop,
              sellerChop,
            );
          }
          setpdfLoading(false);
        }}
      />
      <BlueButton
        position={'absolute'}
        backgroundColor={Colors.PALE_GREEN}
        text="CSV"
        font={Typography.normal}
        borderRadius={10}
        icon="cloud-download-outline"
        offsetCenter={wp('2%')}
        top={hp('70%')}
        onPress={() =>
          orders.createCSV(
            (id = props.trackingNum),
            (createdAt = props.createdAt),
            (items = props.goods),
            (amount = props.amount),
            (receivedBy = props.receivedBy),
          )
        }
      />
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
      <Font.Small style={{position: 'absolute', left: wp('3%')}}>
        {props.name}
      </Font.Small>
      <Font.Small style={{position: 'absolute', left: wp('25%')}}>
        |{props.quantity}
        {props.siUnit}
      </Font.Small>
      <Font.Small style={{position: 'absolute', left: wp('40%')}}>
        @ RM{props.price}/{props.siUnit}
      </Font.Small>
      <Font.Small
        style={{
          position: 'absolute',
          right: wp('3%'),
        }}>
        RM {props.price * props.quantity}
      </Font.Small>
    </View>
  );
};

export const SortModal = props => {
  return (
    <View
      style={{
        position: 'absolute',
        right: wp('6%'),
        top: hp('9%'),
        backgroundColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
      }}>
      <Font.NormalBold
        style={{left: wp('5%'), marginBottom: hp('2%'), top: hp('1%')}}>
        Sort By
      </Font.NormalBold>
      <TouchableOpacity
        style={{
          width: wp('45%'),
          height: hp('4%'),
        }}>
        <Font.Normal style={{left: wp('5%')}}>Newest to Oldest</Font.Normal>
        {/*TRANSLATION*/}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: wp('45%'),
          height: hp('4%'),
        }}>
        <Font.Normal style={{left: wp('5%')}}>Oldest to Newest</Font.Normal>
      </TouchableOpacity>
    </View>
  );
};
