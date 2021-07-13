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
import {updateGoodsTask} from '../../../../graphql/mutations';
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

export const SendTaskList = props => {
  console.log('send task list render');
  return (
    <View>
      <FlatList
        keyExtractor={item => item.id}
        extraData={props.trigger}
        data={props.data}
        numColumns={1}
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
              sentByRetailer={item.sentByRetailer}
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
  return (
    <TouchableOpacity
      onPress={() => setSendTaskModal(true)}
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
          {props.sentByRetailer ? (
            <View style={{bottom: hp('0.5%')}}>
              <Icon
                name="cube-outline"
                size={wp('11%')}
                color={Colors.LIME_GREEN}
              />
            </View>
          ) : (
            <View style={{bottom: hp('0.5%')}}>
              <Icon name="cube-outline" size={wp('11%')} />
            </View>
          )}
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
          setInvoiceModal={setInvoiceModal}
          setSendTaskModal={setSendTaskModal}
          trigger={props.trigger}
          setTrigger={props.setTrigger}
          sendTask={props.sendTask}
          setSendTask={props.setSendTask}></SendTaskModal>
      </Modal>
      <Modal isVisible={invoiceModal}>
        <InvoiceModal
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
    </TouchableOpacity>
  );
};

const SendTaskModal = props => {
  const [deliverydate, setDate] = useState(props.deliverydate);
  const [confirmedDate, setConfirmedDate] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);

  const updateDeliveryDate = async () => {
    try {
      const response = await API.graphql({
        query: updateGoodsTask,
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
          Order Created
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
          Order #{props.taskID.slice(0, 6)}
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
          Total: RM {sum}
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
                },
              ]}>
              Please add a delivery date
            </Text>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: hp('54.5%'),
                left: wp('68%'),
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
                elevation: 2,
                position: 'absolute',
                top: hp('53%'),
                left: wp('35%'),
                justifyContent: 'center',
              }}
              customStyles={{
                dateInput: {
                  position: 'absolute',
                  right: wp('6%'),
                  textAlignVertical: 'center',
                  borderColor: 'transparent',
                },
                dateIcon: {
                  position: 'absolute',
                  left: wp('3%'),
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
              androidMode="spinner"></DatePicker>
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
            Typography.small,
            {
              position: 'absolute',
              top: hp('60%'),
              left: wp('35%'),
            },
          ]}>
          {props.retailer.name}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.LIGHT_BLUE,
            width: wp('30%'),
            height: hp('5%'),
            alignSelf: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            position: 'absolute',
            bottom: hp('8%'),
            borderRadius: 10,
          }}
          onPress={() => {
            [props.setInvoiceModal(true), props.setSendTaskModal(false)];
          }}>
          <Text style={[Typography.normal, {textAlign: 'center'}]}>
            {Strings.createInvoice}
          </Text>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [setSuccessfulModal(false)]}>
        <SuccessfulModal />
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
        query: updateGoodsTask,
        variables: {
          input: {
            id: props.taskID,
            sentByRetailer: true,
            items: itemList,
          },
        },
      });
      setSuccessfulModal(true);
      var tempList = props.sendTask;
      tempList.forEach((item, index, arr) => {
        if (item.id == props.taskID) {
          arr[index] = response.data.updateGoodsTask;
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
      <TouchableOpacity
        onPress={() => [sendForVerfication()]}
        style={{
          position: 'absolute',
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('35%'),
          height: hp('5%'),
          bottom: hp('5%'),
          right: wp('5%'),
          elevation: 3,
          borderRadius: 10,
          justifyContent: 'center',
        }}>
        <Text style={[Typography.normal, {left: wp('5%')}]}>
          Send to Verify
        </Text>
      </TouchableOpacity>
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
            left: wp('60%'),
            position: 'absolute',
          },
        ]}>
        | {props.quantity}
        {props.siUnit}
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
    </View>
  );
};
