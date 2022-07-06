import React, {useState, useContext, useEffect} from 'react';
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
import {BlueButton} from '_components';
import Strings from '_utils';
import {API} from 'aws-amplify';
import {
  updateGoodsTaskBetweenSandF,
  updateSupplierCompany,
  deleteGoodsTaskBetweenSandF,
} from '../../../../graphql/mutations';
import {goodsTaskForFarmerByDate} from '../../../../graphql/queries';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {log} from '_utils';
import {userStore} from '_store';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const now = () => {
  const now = dayjs().format('DD MMM YYYY');
  return now;
};

export const SendTaskList = props => {
  const [refreshing, setRefreshing] = useState(false);
  const companyID = userStore(state => state.companyID);
  log('send task list render');
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        extraData={props.trigger}
        data={props.data}
        numColumns={1}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              try {
                const task = await API.graphql({
                  query: goodsTaskForFarmerByDate,
                  variables: {
                    farmerID: companyID,
                    sortDirection: 'ASC',
                  },
                });
                props.setSendTask(task.data.goodsTaskForFarmerByDate.items);
                log(task.data.goodsTaskForFarmerByDate.items);
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
          return (
            <SendTask
              supplier={item.supplier}
              farmer={item.farmer}
              goods={item.items}
              createdAt={item.createdAt}
              trackingNum={item.trackingNum}
              deliverydate={item.deliveryDate}
              taskID={item.id}
              trigger={props.trigger}
              setTrigger={props.setTrigger}
              sendTask={props.sendTask}
              status={item.status}
              setSendTask={props.setSendTask}
            />
          );
        }}
        ListEmptyComponent={() => {
          return <View></View>;
        }}
      />
    </View>
  );
};

// Supplier create invoice
const SendTask = props => {
  const [sendTaskModal, setSendTaskModal] = useState(false);
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() =>
        props.status == 'received'
          ? setRatingModal(true)
          : setSendTaskModal(true)
      }
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
            height: hp('12%'),
            width: wp('24%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{bottom: hp('0.5%')}}>
            {props.status == 'sent' ? (
              <Icon
                name="cube-outline"
                size={wp('11%')}
                color={Colors.LIME_GREEN}
              />
            ) : props.status == 'received' ? (
              <Icon name="cube-outline" size={wp('11%')} color="gold" />
            ) : (
              <Icon name="cube-outline" size={wp('11%')} />
            )}
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
      <Modal isVisible={sendTaskModal}>
        <SendTaskModal
          taskID={props.taskID}
          goods={props.goods}
          supplier={props.supplier}
          createdAt={props.createdAt}
          deliverydate={props.deliverydate}
          setInvoiceModal={setInvoiceModal}
          invoiceModal={invoiceModal}
          setSendTaskModal={setSendTaskModal}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          sendTask={props.sendTask}
          trackingNum={props.trackingNum}
          setSendTask={props.setSendTask}></SendTaskModal>
      </Modal>

      <Modal isVisible={ratingModal}>
        <RatingModal
          taskID={props.taskID}
          setRatingModal={setRatingModal}
          setSuccessfulModal={setSuccessfulModal}
          supplier={props.supplier}
          sendTask={props.sendTask}
          setSendTask={props.setSendTask}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const SendTaskModal = props => {
  const [deliverydate, setDate] = useState(props.deliverydate);
  const [confirmedDate, setConfirmedDate] = useState(false);
  const [qrScannerModal, setQrScannerModal] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  useEffect(() => {
    if (value === props.trackingNum) setInvoiceModal(true);
    if (value && value !== props.trackingNum) {
      setError(true);
      setQrScannerModal(false);
    }
  }, [value]);

  var sum = 0;
  var tempList = props.goods.forEach((item, index, array) => {
    var product = parseFloat((item.price * item.quantity).toFixed(2));
    sum = parseFloat((sum + product).toFixed(2));
  });
  log(sum);

  return (
    <SafeAreaView style={{height: hp('100%'), width: wp('100%')}}>
      <View
        style={{
          width: wp('90%'),
          height: hp('80%'),
          top: hp('10%'),
          backgroundColor: Colors.GRAY_WHITE,
          borderRadius: 10,
        }}>
        <View
          style={{
            position: 'absolute',
            right: wp('1%'),
            top: hp('1%'),
          }}>
          <CloseButton setModal={props.setSendTaskModal} />
        </View>
        <Text
          style={[
            Typography.normal,
            {
              marginTop: hp('4%'),
            },
          ]}>
          {Strings.orderCreated}
        </Text>
        <Text
          style={[
            Typography.placeholder,
            {
              fontStyle: 'italic',
            },
          ]}>
          {Strings.order} #{props.trackingNum}
        </Text>
        <Text style={[Typography.header]}>
          {dayjs(props.createdAt).add(8, 'hour').format('DD MMM YYYY')}
        </Text>
        <View
          style={{
            borderBottomWidth: wp('1%'),
            width: wp('80%'),
            alignSelf: 'center',
            marginTop: 5,
            borderColor: Colors.GRAY_MEDIUM,
          }}></View>
        {qrScannerModal ? (
          <View
            style={{
              height: hp('45%'),
              borderRadius: 10,
              padding: 2,
              marginBottom: 400,
            }}>
            <View style={{height: hp('45%')}}>
              <QRCodeScanner
                cameraStyle={{width: wp('80%')}}
                onRead={qr => setValue(qr.data)}
              />
            </View>

            <BlueButton
              onPress={() => setQrScannerModal(false)}
              marginTop={20}
              text="Close QR Code Scanner"></BlueButton>
          </View>
        ) : null}
        {error ? (
          <>
            <Text>
              The QR Code you are scanning is not for this task, please try
              again
            </Text>
            <BlueButton
              onPress={() => setQrScannerModal(true)}
              marginTop={20}
              text="Scan QR Code"></BlueButton>
          </>
        ) : null}
        <Text
          style={[
            Typography.placeholder,
            {
              marginTop: 5,
            },
          ]}>
          {Strings.items}: {props.goods.length}
        </Text>
        <View
          style={{
            marginTop: 5,
            height: hp('45%'),
          }}>
          <ProductList data={props.goods}></ProductList>
        </View>
        <Text
          style={[
            Typography.placeholder,
            {
              marginTop: 10,
              left: wp('45%'),
            },
          ]}>
          {Strings.total}: RM {sum}
        </Text>

        <Text
          style={[
            Typography.placeholder,
            {
              marginTop: 5,
            },
          ]}>
          {Strings.buyer}: {props.supplier.name}
        </Text>

        <BlueButton
          onPress={() => {
            [setQrScannerModal(true)];
          }}
          text={'Scan QR Code'}
          font={Typography.normal}
          borderRadius={10}
          marginTop={10}
        />
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [setSuccessfulModal(false)]}>
        <SuccessfulModal text={'Successfully chosen delivery date!'} />
      </Modal>
      <Modal isVisible={props.invoiceModal}>
        <InvoiceModal
          setSendTaskModal={props.setSendTaskModal}
          setInvoiceModal={props.setInvoiceModal}
          goods={props.goods}
          supplier={props.supplier}
          deliverydate={props.deliverydate}
          taskID={props.taskID}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          sendTask={props.sendTask}
          setSendTask={props.setSendTask}></InvoiceModal>
      </Modal>
    </SafeAreaView>
  );
};

const InvoiceModal = props => {
  const [itemList, setItemList] = useState(props.goods);
  const [toggle, setToggle] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [sum, setSum] = useState(0);
  const [verifyDoubleButton, setVerifyDoubleButton] = useState(false);
  var tempSum = 0;
  useEffect(() => {
    log(itemList);
    var tempList = itemList.forEach((item, index, array) => {
      var product = parseFloat((item.price * item.quantity).toFixed(2));
      tempSum = parseFloat((tempSum + product).toFixed(2));
    });
    log(tempSum);
    setSum(tempSum);
  }, [itemList, toggle]);

  const sendForVerfication = async () => {
    try {
      const response = await API.graphql({
        query: updateGoodsTaskBetweenSandF,
        variables: {
          input: {
            id: props.taskID,
            status: 'sent',
            items: itemList,
          },
        },
      });
      setSuccessfulModal(true);
      var tempList = props.sendTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == props.taskID) {
          arr[index] = response.data.updateGoodsTaskBetweenSandF;
        }
      });
      if (props.trigger) {
        props.setTrigger(false);
      } else {
        props.setTrigger(true);
      }
    } catch (e) {
      log(e);
    }
    setVerifyDoubleButton(false);
  };

  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          width: wp('95%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
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
        <CloseButton setModal={props.setInvoiceModal} />
      </View>
      <Text
        style={[
          Typography.header,
          {
            position: 'absolute',
            top: hp('5%'),
            left: wp('5%'),
          },
        ]}>
        Invoice {props.taskID.slice(0, 6)}
      </Text>
      <Text
        style={[
          Typography.placeholder,
          {
            position: 'absolute',
            right: wp('5%'),
            top: hp('6%'),
          },
        ]}>
        {dayjs().format('DD MMM YYYY')}
      </Text>
      <Text
        style={
          ([Typography.normal],
          {
            position: 'absolute',
            top: hp('9%'),
            left: wp('5%'),
          })
        }>
        {props.supplier.name}
      </Text>
      <View
        style={{
          borderBottomWidth: 2,
          width: wp('80%'),
          alignSelf: 'center',
          top: hp('14%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
      <View style={{top: hp('15%')}}>
        <View
          style={{
            width: wp('90%'),
            maxHeight: hp('50%'),
          }}>
          <FlatList
            keyExtractor={item => item.id}
            data={props.goods}
            numColumns={1}
            ItemSeparatorComponent={Seperator}
            renderItem={({item}) => {
              return (
                <InvoiceItem
                  name={item.name}
                  quantity={item.quantity}
                  price={item.price}
                  amount={item.quantity}
                  grade={item.grade}
                  variety={item.variety}
                  siUnit={item.siUnit}
                  setItemList={setItemList}
                  itemList={itemList}
                  toggle={toggle}
                  setToggle={setToggle}
                />
              );
            }}
          />
        </View>
        <View style={{flexDirection: 'row', left: wp('45%')}}>
          <Text
            style={[
              Typography.normal,
              {
                fontFamily: 'Poppins-SemiBold',
                left: wp('3%'),
                textAlign: 'right',
              },
            ]}>
            TOTAL: RM {sum}
          </Text>
        </View>
      </View>
      <BlueButton
        onPress={() => [sendForVerfication()]}
        text={Strings.sendToVerify}
        borderRadius={10}
        font={Typography.normal}
        position={'absolute'}
        top={hp('70%')}
        right={wp('5%')}
        onPressIn={() => setVerifyDoubleButton(true)}
        disabled={verifyDoubleButton}
      />
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setInvoiceModal(false),
        ]}>
        <SuccessfulModal />
      </Modal>
    </View>
  );
};

const InvoiceItem = props => {
  const [quantity, setQuantity] = useState(props.quantity.toString());
  const updateQuantity = item2 => {
    var tempList = props.itemList;
    tempList.forEach((item, index, array) => {
      if (
        item.name == props.name &&
        item.grade == props.grade &&
        item.price == props.price &&
        item.variety == props.variety
      ) {
        item['quantity'] = parseFloat(item2);
        array[index] = item;
      }
    });
    log('updating quantity to the list');
    props.setItemList(tempList);
    setQuantity(item2);
    if (props.toggle) {
      props.setToggle(false);
    } else {
      props.setToggle(true);
    }
  };
  return (
    <View
      style={{
        width: wp('85%'),
        height: hp('5%'),
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text style={[Typography.small, {position: 'absolute', left: wp('4%')}]}>
        {props.name}
      </Text>
      <TextInput
        style={[
          Typography.small,
          {position: 'absolute', left: wp('30%'), height: hp('10%')},
        ]}
        onChangeText={item => updateQuantity(item)}
        value={quantity}
        keyboardType="numeric"
      />
      <Text style={[Typography.small, {position: 'absolute', left: wp('40%')}]}>
        kg
      </Text>
      <Text style={[Typography.small, {position: 'absolute', left: wp('45%')}]}>
        @ RM {props.price}/{props.siUnit}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            position: 'absolute',
            right: wp('4%'),
          },
        ]}>
        RM {parseFloat((props.price * parseFloat(quantity)).toFixed(2))}
      </Text>
    </View>
  );
};

const ProductList = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: wp('70%'),
        }}></View>
    );
  };
  return (
    <View>
      <FlatList
        numColumns={1}
        keyExtractor={item => {
          item.name + item.variety + item.grade;
        }}
        data={props.data}
        ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          log(item.name + item.variety + item.grade);
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
            bottom: hp('2.5%'),
          },
        ]}>
        @ RM {props.price}/{props.siUnit}
      </Text>
      <View style={{top: hp('3%'), left: wp('2%')}}>
        <Text
          style={[
            Typography.small,
            {
              textAlign: 'left',
              left: wp('60%'),
              position: 'absolute',
              bottom: hp('2.5%'),
              right: wp('1%'),

              width: wp('12%'),
            },
          ]}>
          | {props.quantity}
          {props.siUnit}
        </Text>
      </View>
    </View>
  );
};

const RatingModal = props => {
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
    } catch (e) {
      log(e);
    }
    try {
      const invoiceResponse = await API.graphql({
        query: deleteGoodsTaskBetweenSandF,
        variables: {input: {id: props.taskID}},
      });
      log('done');
      var tempList = props.sendTask;
      for (let [i, temp] of tempList.entries()) {
        if (temp.id == props.taskID) {
          tempList.splice(i, 1);
        }
      }
      props.setSendTask(tempList);
      props.setRatingModal(false);
      props.setSuccessfulModal(true);
    } catch (e) {
      log('failed to delete');
      log(e);
    }
    if (props.trigger) {
      props.setTrigger(false);
    } else {
      props.setTrigger(true);
    }
  };
  return (
    <View
      style={{
        width: wp('80%'),
        height: wp('70%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 10,
        alignSelf: 'center',
      }}>
      <View>
        <Text
          style={[
            Typography.large,
            {
              justifyContent: 'center',
              alignSelf: 'center',
              top: hp('5%'),
              marginRight: wp('5%'),
              marginLeft: wp('5%'),
            },
          ]}>
          Transaction completed. Please give the supplier a rating.
        </Text>
        {/* TRANSLATION */}
      </View>
      <View style={{top: hp('4%')}}>
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
      <TouchableOpacity
        onPress={() => [updateRating()]}
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('30%'),
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
        }}>
        <Text style={[Typography.normal, {}]}>Submit rating</Text>
      </TouchableOpacity>
    </View>
  );
};
