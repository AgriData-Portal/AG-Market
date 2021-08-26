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

import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  createInvoiceBetweenRandS,
  createPaymentTaskBetweenRandS,
  updateGoodsTaskBetweenRandS,
  updateSupplierCompany,
  updateGoodsTaskBetweenSandF,
  createGoodsTaskBetweenSandF,
  createInvoiceBetweenSandF,
  createPaymentTaskBetweenSandF,
  updateFarmerCompany,
} from '../../../../graphql/mutations';
import {API} from 'aws-amplify';
import Strings from '_utils';
import {
  goodsTaskForRetailerByDate,
  getSupplierCompany,
  goodsTaskFarmerForSupplierByDate,
  getFarmerCompany,
} from '../../../../graphql/queries';
import {Rating} from 'react-native-ratings';
import {log, tasks} from '_utils';
import {BlueButton} from '_components';
import {userStore, companyStore} from '_store';

//Retailer receive
const ReceiveModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const userName = userStore(state => state.userName);
  const companyType = companyStore(state => state.companyType);

  var sum = 0;
  var tempList = props.goods.forEach((item, index, array) => {
    var product = item.price * item.quantity;
    sum = sum + product;
  });

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
        {Strings.order}

        <Text
          style={[
            Typography.placeholder,
            {
              fontStyle: 'italic',
            },
          ]}>
          {'  '}#{props.trackingNum}
        </Text>
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
        {dayjs(props.createdAt).format('DD MMM YYYY')}
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
            left: wp('50%'),
          },
        ]}>
        {Strings.total}: RM {sum}
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
              width: wp('50%'),
            },
          ]}>
          {Strings.supplierHasNot}
        </Text>
      )}

      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            top: hp('65%'),
            left: wp('8%'),
          },
        ]}>
        {Strings.seller}:
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            top: hp('65%'),
            left: wp('40%'),
          },
        ]}>
        {companyType == 'retailer' ? props.supplier.name : props.farmer.name}
      </Text>
      {props.status == 'sent' ? (
        <TouchableOpacity
          onPress={() => {
            if (props.trigger) {
              props.setTrigger(false);
            } else {
              props.setTrigger(true);
            }
            tasks
              .received(
                companyType,
                props.supplierID,
                props.farmerID,
                props.taskID,
                props.retailerID,
                sum,
                props.goods,
                userName,
                props.receiveTask,
              )
              .then(data => [props.setReceiveTask(data), setRatingModal(true)]);
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
            bottom: hp('5%'),
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
      <TouchableOpacity
        onPress={() => {
          setRatingModal(true);
        }}
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('10%'),
          top: hp('50%'),
          left: wp('20%'),
        }}></TouchableOpacity>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setReceiveModal(false),
        ]}>
        {companyType == 'retailer' ? (
          <SuccessfulModal
            text={
              'You have successfully received your products from ' +
              props.supplier.name
            }
          />
        ) : (
          <SuccessfulModal
            text={
              'You have successfully received your products from ' +
              props.farmer.name
            }
          />
        )}
      </Modal>
      <Modal isVisible={ratingModal}>
        <RatingModal
          setRatingModal={setRatingModal}
          setSuccessfulModal={setSuccessfulModal}
          supplier={props.supplier}
          farmer={props.farmer}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
        />
      </Modal>
    </View>
  );
};

const Receive = props => {
  const [receiveModal, setReceiveModal] = useState(false);
  const companyType = companyStore(state => state.companyType);
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
          backgroundColor:
            props.status == 'sent' ? '#d4f8d4' : Colors.GRAY_LIGHT,
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
              props.status == 'sent' ? '#d4f8d4' : Colors.GRAY_LIGHT,
            height: hp('12%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{bottom: hp('0.5%')}}>
            <Icon name="cube-outline" size={wp('11%')} color="black" />
          </View>
        </View>
        <Text
          style={[
            Typography.normal,
            {
              color: Colors.LIME_GREEN,
              top: hp('1.5%'),
              left: wp('25%'),
              position: 'absolute',
            },
          ]}>
          {companyType == 'retailer' ? props.supplier.name : props.farmer.name}
        </Text>
        <Text
          style={[
            Typography.small,
            {left: wp('25%'), top: hp('4%'), position: 'absolute'},
          ]}>
          {props.trackingNum}
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
          {dayjs(props.createdAt).format('DD MMM YYYY')}
        </Text>
      </View>
      <Modal isVisible={receiveModal}>
        <ReceiveModal
          setReceiveModal={setReceiveModal}
          taskID={props.taskID}
          goods={props.goods}
          supplier={props.supplier}
          retailer={props.retailer}
          farmer={props.farmer}
          retailerID={props.retailerID}
          supplierID={props.supplierID}
          farmerID={props.farmerID}
          status={props.status}
          trackingNum={props.trackingNum}
          createdAt={props.createdAt}
          deliverydate={props.deliverydate}
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
  const [refreshing, setRefreshing] = useState(false);
  log('render flatlist');
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        data={props.receiveTask}
        extraData={props.trigger}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);

              try {
                if (companyType == 'retailer') {
                  const task = await API.graphql({
                    query: goodsTaskForRetailerByDate,
                    variables: {
                      retailerID: companyID,
                      sortDirection: 'ASC',
                    },
                  });
                  log(task.data.goodsTaskForRetailerByDate.items);
                  props.setReceiveTask(
                    task.data.goodsTaskForRetailerByDate.items,
                  );
                } else {
                  const task = await API.graphql({
                    query: goodsTaskFarmerForSupplierByDate,
                    variables: {
                      supplierID: companyID,
                      sortDirection: 'ASC',
                    },
                  });
                  log(task.data.goodsTaskFarmerForSupplierByDate.items);
                  props.setReceiveTask(
                    task.data.goodsTaskFarmerForSupplierByDate.items,
                  );
                }
                log('goods task');
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
          log(item);
          if (item.status == 'received') {
            return <View />;
          } else {
            return (
              <Receive
                retailer={item.retailer}
                supplier={item.supplier}
                farmer={item.farmer}
                retailerID={item.retailerID}
                supplierID={item.supplierID}
                farmerID={item.farmerID}
                goods={item.items}
                createdAt={item.createdAt}
                deliverydate={item.deliveryDate}
                taskID={item.id}
                status={item.status}
                trackingNum={item.trackingNum}
                trigger={props.trigger}
                setTrigger={props.setTrigger}
                receiveTask={props.receiveTask}
                setReceiveTask={props.setReceiveTask}
              />
            );
          }
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
          log('productss;' + item);
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
            left: wp('40%'),
            position: 'absolute',
          },
        ]}>
        @ RM {props.price}/{props.siUnit}
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
    </View>
  );
};

export const RatingModal = props => {
  const [rating, setRating] = useState(2.5);
  const companyType = companyStore(state => state.companyType);

  return (
    <View
      style={{
        width: wp('80%'),
        minHeight: hp('40%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 10,
        alignSelf: 'center',
      }}>
      <View>
        <Text
          style={[
            Typography.large,
            {textAlign: 'center', top: hp('5%'), marginHorizontal: wp('5%')},
          ]}>
          {Strings.ratingsTransactionDone}
        </Text>
      </View>
      <View style={{top: hp('5%')}}>
        <Rating
          showRating
          count={5}
          size={wp('15%')}
          reviews={['']}
          fractions={1}
          onSwipeRating={item => [setRating(item)]}
          tintColor={Colors.PALE_GREEN}
        />
      </View>
      <BlueButton
        onPress={() => {
          if (props.trigger) {
            props.setTrigger(false);
          } else {
            props.setTrigger(true);
          }
          tasks
            .updateRating(companyType, props.supplier, rating, props.farmer)
            .then([props.setRatingModal]);
        }}
        text={'Submit Rating'}
        font={Typography.normal}
        borderRadius={10}
        top={hp('8%')}
      />
    </View>
  );
};
