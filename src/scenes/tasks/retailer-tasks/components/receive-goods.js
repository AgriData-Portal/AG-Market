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
import {log} from '_utils';
import {BlueButton} from '_components';
import {userStore} from '_store';

//Retailer receive
const ReceiveModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const userName = userStore(state => state.userName);
  const companyType = userStore(state => state.companyType);

  var sum = 0;
  var tempList = props.goods.forEach((item, index, array) => {
    var product = item.price * item.quantity;
    sum = sum + product;
  });
  const received = async () => {
    var mostRecentInvoiceNum = null;
    try {
      if (companyType == 'retailer') {
        const response = await API.graphql({
          query: getSupplierCompany,
          variables: {id: props.supplierID},
        });
        mostRecentInvoiceNum =
          response.data.getSupplierCompany.mostRecentInvoiceNumber;
      } else {
        const response = await API.graphql({
          query: getFarmerCompany,
          variables: {id: props.farmerID},
        });
        mostRecentInvoiceNum =
          response.data.getFarmerCompany.mostRecentInvoiceNumber;
      }
      log('newnum: ' + mostRecentInvoiceNum);
      if (mostRecentInvoiceNum) {
        if (dayjs().format('YYYY-MM') == mostRecentInvoiceNum.slice(4, 11)) {
          var number = parseInt(mostRecentInvoiceNum.slice(12, 16));
          var numberString = (number + 1).toString().padStart(4, '0');
          mostRecentInvoiceNum =
            'INV-' + dayjs().format('YYYY-MM-') + numberString;
        } else {
          mostRecentInvoiceNum = 'INV-' + dayjs().format('YYYY-MM-') + '0001';
        }
      } else {
        mostRecentInvoiceNum = 'INV-' + dayjs().format('YYYY-MM-') + '0001';
      }
      log('updatednum: ' + mostRecentInvoiceNum);
    } catch (e) {
      log(e);
    }
    if (companyType == 'retailer') {
      var input = {
        id: props.taskID,
        trackingNum: mostRecentInvoiceNum,
        retailerID: props.retailerID,
        supplierID: props.supplierID,
        paid: false,
        amount: sum,
        payBefore: dayjs().add(30, 'day').format('DD-MM-YYYY'),
        receipt: null,
      };
    } else {
      var input = {
        id: props.taskID,
        trackingNum: mostRecentInvoiceNum,
        supplierID: props.supplierID,
        farmerID: props.farmerID,
        paid: false,
        amount: sum,
        payBefore: dayjs().add(30, 'day').format('DD-MM-YYYY'),
        receipt: null,
      };
    }

    try {
      if (companyType == 'retailer') {
        const paymentTaskResponse = API.graphql({
          query: createPaymentTaskBetweenRandS,
          variables: {input: input},
        });
      } else {
        const paymentTaskResponse = API.graphql({
          query: createPaymentTaskBetweenSandF,
          variables: {input: input},
        });
      }
      log('payment success!');
    } catch (e) {
      log(e);
    }

    if (companyType == 'retailer') {
      var input = {
        id: props.taskID,
        trackingNum: mostRecentInvoiceNum,
        retailerID: props.retailerID,
        supplierID: props.supplierID,
        items: props.goods,
        paid: false,
        amount: sum,
        receivedBy: userName,
      };
    } else {
      var input = {
        id: props.taskID,
        trackingNum: mostRecentInvoiceNum,
        farmerID: props.farmerID,
        supplierID: props.supplierID,
        items: props.goods,
        paid: false,
        amount: sum,
        receivedBy: userName,
      };
    }

    try {
      if (companyType == 'retailer') {
        const invoiceResponse = API.graphql({
          query: createInvoiceBetweenRandS,
          variables: {input: input},
        });
      } else {
        const invoiceResponse = API.graphql({
          query: createInvoiceBetweenSandF,
          variables: {input: input},
        });
      }
      log('success!');
    } catch (e) {
      log(e);
    }

    try {
      if (companyType == 'retailer') {
        const supplierCompanyUpdate = await API.graphql({
          query: updateSupplierCompany,
          variables: {
            input: {
              id: props.supplierID,
              mostRecentInvoiceNumber: mostRecentInvoiceNum,
            },
          },
        });
      } else {
        const farmerCompanyUpdate = await API.graphql({
          query: updateFarmerCompany,
          variables: {
            input: {
              id: props.farmerID,
              mostRecentInvoiceNumber: mostRecentInvoiceNum,
            },
          },
        });
      }
      log('update success');
    } catch (e) {
      log(e);
    }

    try {
      if (companyType == 'retailer') {
        const invoiceResponse = await API.graphql({
          query: updateGoodsTaskBetweenRandS,
          variables: {input: {id: props.taskID, status: 'received'}},
        });
        var tempList = props.receiveTask;
        tempList.forEach((item, index, arr) => {
          if (item.id == props.taskID) {
            arr[index] = invoiceResponse.data.updateGoodsTaskBetweenRandS;
          }
        });
      } else {
        const invoiceResponse = await API.graphql({
          query: updateGoodsTaskBetweenSandF,
          variables: {input: {id: props.taskID, status: 'received'}},
        });
        var tempList = props.receiveTask;
        tempList.forEach((item, index, arr) => {
          if (item.id == props.taskID) {
            arr[index] = invoiceResponse.data.updateGoodsTaskBetweenSandF;
          }
        });
      }
      props.setReceiveTask(tempList);
      setRatingModal(true);
      log('deleted!');
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
        {props.supplier.name}
      </Text>
      {props.status == 'sent' ? (
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
        <SuccessfulModal
          text={
            'You have successfully received your products from ' +
            props.supplier.name
          }
        />
      </Modal>
      <Modal isVisible={ratingModal}>
        <RatingModal
          setRatingModal={setRatingModal}
          setSuccessfulModal={setSuccessfulModal}
          supplier={props.supplier}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
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
          {props.supplier.name}
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
  const companyID = userStore(state => state.companyID);
  const companyType = userStore(state => state.companyType);
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

  const updateRating = async () => {
    try {
      if (props.supplier.rating == null) {
        var sendRating = {
          numberOfRatings: 1,
          currentRating: rating,
        };
      } else {
        var newNumberOfRating = props.supplier.rating.numberOfRatings + 1;
        var newRating =
          (props.supplier.rating.currentRating *
            props.supplier.rating.numberOfRatings +
            rating) /
          newNumberOfRating;
        var sendRating = {
          numberOfRatings: newNumberOfRating,
          currentRating: newRating,
        };
      }
      log(props.supplier, sendRating);
      const update = await API.graphql({
        query: updateSupplierCompany,
        variables: {
          input: {
            id: props.supplier.id,
            rating: sendRating,
          },
        },
      });
      props.setRatingModal(false);
      log(rating);
      props.setSuccessfulModal(true);
    } catch (e) {
      log(e);
    }
    if (props.trigger) {
      props.setTrigger(false);
    } else {
      props.setTrigger(true);
    }
  };
  return (
    // TRANSLATION ratingsmodal
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
          Transaction completed. Please give the supplier a rating.
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
        onPress={() => updateRating()}
        text={'Submit Rating'}
        font={Typography.normal}
        borderRadius={10}
        top={hp('8%')}
      />
    </View>
  );
};
