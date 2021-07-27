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
import {DismissKeyboard} from '_components';
import Strings from '_utils';
import {API} from 'aws-amplify';
import {
  updateGoodsTaskBetweenRandS,
  updateRetailerCompany,
  deleteGoodsTaskBetweenRandS,
} from '../../../../graphql/mutations';
import {goodsTaskRetailerForSupplierByDate} from '../../../../graphql/queries';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {BlueButton} from '_components';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

export const SendTaskList = props => {
  const [refreshing, setRefreshing] = useState(false);
  console.log('send task list render');
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
                  query: goodsTaskRetailerForSupplierByDate,
                  variables: {
                    supplierID: props.user.supplierCompanyID,
                    sortDirection: 'ASC',
                  },
                });
                props.setSendTask(
                  task.data.goodsTaskRetailerForSupplierByDate.items,
                );
                console.log(task.data.goodsTaskRetailerForSupplierByDate.items);
                console.log('goods task');
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
            <SendTask
              retailer={item.retailer}
              supplier={item.supplier}
              goods={item.items}
              createdAt={item.createdAt}
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
          {props.retailer.name}
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
          {dayjs(props.createdAt).add(8, 'hours').format('DD MM YYYY')}
        </Text>
      </View>
      <Modal isVisible={sendTaskModal}>
        <SendTaskModal
          taskID={props.taskID}
          goods={props.goods}
          retailer={props.retailer}
          createdAt={props.createdAt}
          deliverydate={props.deliverydate}
          setSendTaskModal={setSendTaskModal}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          sendTask={props.sendTask}
          setSendTask={props.setSendTask}></SendTaskModal>
      </Modal>

      <Modal isVisible={ratingModal}>
        <RatingModal
          taskID={props.taskID}
          setRatingModal={setRatingModal}
          setSuccessfulModal={setSuccessfulModal}
          retailer={props.retailer}
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
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);

  const updateDeliveryDate = async () => {
    try {
      const response = await API.graphql({
        query: updateGoodsTaskBetweenRandS,
        variables: {
          input: {
            id: props.taskID,
            deliveryDate: deliverydate,
          },
        },
      });

      setDate(deliverydate);
      setConfirmedDate(true);
      if (props.trigger) {
        props.setTrigger(false);
      } else {
        props.setTrigger(true);
      }

      var tempList = props.sendTask;

      tempList.forEach((item, index, array) => {
        if (item == props.taskID) {
          item.deliveryDate = deliverydate;
          array[index] = item;
        }
      });

      setSuccessfulModal(true);
    } catch (e) {
      console.log(e);
    }
  };

  var sum = 0;
  var tempList = props.goods.forEach((item, index, array) => {
    var product = item.price * item.quantity;
    sum = sum + product;
  });
  console.log(sum);

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
              position: 'absolute',
              top: hp('7%'),
              left: wp('8%'),
            },
          ]}>
          {Strings.orderCreated}
        </Text>
        <Text
          style={[
            Typography.placeholder,
            {
              position: 'absolute',
              right: wp('7%'),
              top: hp('7%'),
              fontStyle: 'italic',
            },
          ]}>
          {Strings.order} #{props.taskID.slice(0, 6)}
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
          {dayjs(props.createdAt).add(8, 'hour').format('DD MMMM, YYYY')}
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
              left: wp('55%'),
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
          {Strings.deliveryDate}
        </Text>
        {deliverydate == null ? (
          <View>
            <Text
              style={[
                Typography.small,
                {
                  position: 'absolute',
                  top: hp('55%'),
                  left: wp('35%'),
                  width: wp('50%'),
                },
              ]}>
              {Strings.pleaseAddDeliveryDate}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: hp('55%'),
                left: wp('80%'),
                elevation: 5,
              }}
              onPress={() => setDate(dayjs().format('DD-MM-YYYY'))}>
              <Icon name="add-circle-outline" size={wp('5%')} />
            </TouchableOpacity>
          </View>
        ) : !confirmedDate ? (
          <View>
            <DatePicker
              style={{
                backgroundColor: Colors.GRAY_WHITE,
                borderColor: 'black',
                borderRadius: 20,
                width: wp('40%'),
                height: hp('6%'),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                position: 'absolute',
                top: hp('53%'),
                left: wp('35%'),
                justifyContent: 'center',
              }}
              customStyles={{
                dateInput: {
                  position: 'absolute',
                  right: wp('5%'),
                  textAlignVertical: 'center',
                  borderColor: 'transparent',
                },
                dateIcon: {
                  position: 'absolute',
                  left: wp('1%'),
                  height: hp('5%'),
                  width: wp('7%'),
                },
                dateText: {fontSize: hp('2%')},
              }}
              format="DD-MM-YYYY"
              placeholderTextColor={Colors.GRAY_DARK}
              placeholder="Pick a date"
              showIcon={true}
              minDate={now()}
              date={deliverydate}
              onDateChange={item => setDate(item)}
              androidMode="spinner"
              confirmBtnText={Strings.confirm}
              cancelBtnText={Strings.cancel}></DatePicker>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: hp('55%'),
                left: wp('78%'),
                elevation: 5,
              }}
              onPress={item => [
                updateDeliveryDate(),
                console.log(deliverydate),
              ]}>
              <Icon name="checkmark-outline" size={wp('5%')} />
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text
              style={[
                Typography.small,
                {
                  position: 'absolute',
                  top: hp('55%'),
                  left: wp('35%'),
                },
              ]}>
              {deliverydate}
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: hp('55%'),
                left: wp('57%'),
                elevation: 5,
              }}
              onPress={() => setConfirmedDate(false)}>
              <Icon name="pencil-outline" size={wp('5%')} />
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={[
            Typography.placeholder,
            {
              position: 'absolute',
              top: hp('60%'),
              left: wp('8%'),
            },
          ]}>
          {Strings.buyer}:
        </Text>
        <Text
          style={[
            Typography.normal,
            {
              position: 'absolute',
              top: hp('60%'),
              left: wp('35%'),
            },
          ]}>
          {props.retailer.name}
        </Text>
        <BlueButton
          onPress={() => {
            [setInvoiceModal(true)];
          }}
          text={Strings.createInvoice}
          font={Typography.normal}
          borderRadius={10}
          top={hp('70%')}
          position={'absolute'}
        />
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [setSuccessfulModal(false)]}>
        <SuccessfulModal text={'Successfully chosen delivery date!'} />
      </Modal>
      <Modal isVisible={invoiceModal}>
        <InvoiceModal
          setSendTaskModal={props.setSendTaskModal}
          setInvoiceModal={setInvoiceModal}
          goods={props.goods}
          retailer={props.retailer}
          deliverydate={props.deliverydate}
          taskID={props.taskID}
          invoiceList={props}
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
  var tempSum = 0;
  useEffect(() => {
    console.log(itemList);
    var tempList = itemList.forEach((item, index, array) => {
      var product = parseFloat((item.price * item.quantity).toFixed(2));
      tempSum = tempSum + product;
    });
    console.log(tempSum);
    setSum(tempSum);
  }, [itemList, toggle]);

  const sendForVerfication = async () => {
    try {
      const response = await API.graphql({
        query: updateGoodsTaskBetweenRandS,
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
          arr[index] = response.data.updateGoodsTaskBetweenRandS;
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
        {dayjs().format('DD-MMM-YYYY')}
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
        {props.retailer.name}
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
      />
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setSendTaskModal(false),
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
    console.log('updating quantity to the list');
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
        height: hp('8%'),
        alignSelf: 'center',
        justifyContent: 'center',
      }}>
      <Text style={[Typography.small, {position: 'absolute', left: wp('4%')}]}>
        {props.name}
      </Text>

      <TextInput
        style={[
          Typography.small,
          {
            position: 'absolute',
            left: wp('35%'),
            height: hp('10%'),
            bottom: hp('1%'),
          },
        ]}
        onChangeText={item => updateQuantity(item)}
        value={quantity}
        keyboardType="numeric"
      />
      <View
        style={{
          height: 0,
          width: wp('9%'),
          borderColor: Colors.LIME_GREEN,
          borderTopWidth: 1,
          left: wp('35%'),
          bottom: hp('1%'),
        }}
      />

      <Text
        style={[
          Typography.small,
          {position: 'absolute', left: wp('45%'), bottom: hp('4.5%')},
        ]}>
        kg
      </Text>
      <Text
        style={[
          Typography.small,
          {position: 'absolute', left: wp('35%'), top: hp('4%')},
        ]}>
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
          console.log(item.name + item.variety + item.grade);
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
      if (props.retailer.rating == null) {
        var sendRating = {
          numberOfRatings: 1,
          currentRating: rating,
        };
      } else {
        var newNumberOfRating = props.retailer.rating.numberOfRatings + 1;
        var newRating =
          (props.retailer.rating.currentRating *
            props.retailer.rating.numberOfRatings +
            rating) /
          newNumberOfRating;
        var sendRating = {
          numberOfRatings: newNumberOfRating,
          currentRating: newRating,
        };
      }
      console.log(props.retailer, sendRating);
      const update = await API.graphql({
        query: updateRetailerCompany,
        variables: {
          input: {
            id: props.retailer.id,
            rating: sendRating,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const invoiceResponse = await API.graphql({
        query: deleteGoodsTaskBetweenRandS,
        variables: {input: {id: props.taskID}},
      });
      console.log('done');
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
      console.log('failed to delete');
      console.log(e);
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
          Transaction completed. Please give the retailer a rating.
        </Text>
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
