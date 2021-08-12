import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  CloseButton,
  SuccessNavigateChatModal,
  BlueButton,
  UnsuccessfulModal,
  SuccessfulModal,
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';

import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/Ionicons';
import {API, Storage} from 'aws-amplify';

import {
  createProductsInPurchaseOrder,
  deleteProductsInPurchaseOrder,
  updateProductsInPurchaseOrder,
  createMessage,
  createChatGroup,
  updateChatGroup,
  updateSupplierCompany,
} from '../../../../../graphql/mutations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import {
  getSupplierCompany,
  getRetailerCompany,
} from '../../../../../graphql/queries';

import {log} from '_utils';

const ProductCard = props => {
  const [productModal, setProductModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const getImage = async () => {
    try {
      const imageURL = await Storage.get(props.productPicture);
      setImageSource({
        uri: imageURL,
      });
    } catch (e) {
      log(e);
    }
  };
  useEffect(() => {
    getImage();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => setProductModal(true)}
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('43%'),
        margin: wp('2%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('2%'),
      }}>
      <Image
        source={imageSource}
        style={{
          height: hp('10%'),
          width: hp('10%'),
          borderRadius: 100,
        }}></Image>
      <Text style={[Typography.normal, {top: hp('2%')}]}>
        {props.productName}
      </Text>
      <Text
        style={[
          Typography.small,
          {
            marginTop: hp('2%'),
            width: wp('39%'),
            alignSelf: 'center',
          },
        ]}>
        {Strings.price}: {props.lowPrice} - {props.highPrice} /{props.siUnit}
        {'\n'}MOQ: {props.minimumQuantity} {props.siUnit}
        {'\n'}
        {Strings.grade}: {props.grade}
        {'\n'}
        {Strings.variety}: {props.variety}
      </Text>
      <Modal isVisible={productModal}>
        <ProductPopUp
          navigation={props.navigation}
          productName={props.productName}
          variety={props.variety}
          quantityAvailable={props.quantityAvailable}
          grade={props.grade}
          siUnit={props.siUnit}
          productPicture={imageSource}
          lowPrice={props.lowPrice}
          highPrice={props.highPrice}
          farmName={props.farmName} //need to add
          farmLocation={props.farmLocation} //need to add
          minimumQuantity={props.minimumQuantity}
          supplierID={props.supplierID}
          setProductModal={setProductModal}
          purchaseOrder={props.purchaseOrder}
          POList={props.POList}
          storeName={props.storeName}
          setPOList={props.setPOList}
          id={props.id}
          setTrigger={props.setTrigger}
          trigger={props.trigger}
          user={props.user}></ProductPopUp>
      </Modal>
    </TouchableOpacity>
  );
};

export const MarketplaceList = props => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={props.productList}
      numColumns={2}
      ListEmptyComponent={
        <View
          style={{
            width: wp('90%'),
            height: hp('70%'),
            top: hp('5%'),
            alignItems: 'center',
          }}>
          <Image
            style={{resizeMode: 'cover', width: wp('90%')}}
            source={require('_assets/images/produce.png')}></Image>
        </View>
      }
      renderItem={({item}) => {
        return (
          <ProductCard
            navigation={props.navigation}
            productName={item.productName}
            variety={item.variety}
            quantityAvailable={item.quantityAvailable}
            grade={item.grade}
            siUnit={item.siUnit}
            productPicture={item.productPicture}
            lowPrice={item.lowPrice}
            highPrice={item.highPrice}
            farmName={item.farmName} //need to add
            farmLocation={item.farmLocation} //need to add
            minimumQuantity={item.minimumQuantity}
            supplierID={item.supplierID}
            id={item.id}
            purchaseOrder={props.purchaseOrder}
            POList={props.POList}
            storeName={props.storeName}
            setPOList={props.setPOList}
            user={props.user}
            trigger={props.trigger}
            setTrigger={props.setTrigger}
          />
        );
      }}
    />
  );
};

const ProductPopUp = props => {
  const [desiredQuantity, setDesiredQuantity] = useState('');
  const [inquirySuccessfulModal, setInquirySuccessfulModal] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [addPO, setAddPO] = useState(false);
  const [productInquire, setProductInquire] = useState(false);

  const sendProductInquiry = async () => {
    try {
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.purchaseOrder,
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: props.user.name,
          },
        },
      });
      log('chat group already exist');
    } catch (e) {
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const chatGroup = {
            id: props.purchaseOrder,
            name: props.user.retailerCompany.name + '+' + props.storeName,
            retailerID: props.user.retailerCompany.id,
            supplierID: props.purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: props.user.name,
          };

          const createdChatGroup = await API.graphql({
            query: createChatGroup,
            variables: {input: chatGroup},
          });
        } catch (e) {
          log(e.errors[0].errorType);
        }
      } else {
        log(e.errors[0].errorType);
      }
    }

    log('creating product inquiry');

    const inquiry = {
      chatGroupID: props.purchaseOrder,
      type: 'inquiry',
      content:
        props.productName +
        '+' +
        props.lowPrice +
        '-' +
        props.highPrice +
        '+' +
        props.variety +
        '+' +
        props.grade,
      sender: props.user.name,
      senderID: props.user.id,
    };
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: inquiry},
      });

      setInquirySuccessfulModal(true);
    } catch {
      e => log(e);
    }
    setProductInquire(false);
  };
  const addToPurchaseOrder = async () => {
    log('addingToPO ' + props.purchaseOrder);
    try {
      const added = await API.graphql({
        query: createProductsInPurchaseOrder,
        variables: {
          input: {
            id: props.id + '@' + props.purchaseOrder,
            purchaseOrderID: props.purchaseOrder,
            name: props.productName,
            quantity: parseInt(desiredQuantity),
            siUnit: props.siUnit,
            grade: props.grade,
            variety: props.variety,
          },
        },
      });

      var poList = props.POList;

      poList.push(added.data.createProductsInPurchaseOrder);

      props.setPOList(poList);
      setSuccessfulModal(true);
    } catch (e) {
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const updated = await API.graphql({
            query: updateProductsInPurchaseOrder,
            variables: {
              input: {
                id: props.id + '@' + props.purchaseOrder,
                quantity: parseInt(desiredQuantity),
              },
            },
          });

          var poList = props.POList;

          poList.forEach((item, index, arr) => {
            if (item.id == props.id + '@' + props.purchaseOrder) {
              log('found');
              arr[index] = updated.data.updateProductsInPurchaseOrder;
            }
          });
          log('\n hey \n');
          log(poList);

          if (props.trigger) {
            props.setTrigger(false);
          } else {
            props.setTrigger(true);
          }
          props.setPOList(poList);

          setSuccessfulModal(true);
        } catch (e) {
          log(e);
        }
      }
      log(e);
    }
    setAddPO(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('-20%') : hp('-20%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <View
        style={{
          height: hp('80%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            right: wp('1%'),
            top: hp('1%'),
          }}>
          <CloseButton setModal={props.setProductModal}></CloseButton>
        </View>
        <View
          style={{
            left: wp('0%'),
            top: hp('1.5%'),
            position: 'absolute',
            width: wp('77%'),
            flexDirection: 'row',
          }}>
          <Text style={[Typography.header, {left: wp('5%')}]}>
            {props.productName}
          </Text>

          <TouchableOpacity
            onPress={() => [sendProductInquiry()]}
            onPressIn={() => setProductInquire(true)}
            disabled={productInquire}
            style={{marginLeft: wp('7%')}}>
            <Icon name="chatbox-outline" size={wp('8%')}></Icon>
          </TouchableOpacity>
        </View>

        <Image
          style={{
            top: hp('8%'),
            height: hp('20%'),
            width: hp('20%'),
            borderRadius: 10,
          }}
          source={props.productPicture}></Image>
        <View
          style={{
            flexDirection: 'row',
            height: hp('13%'),
            top: hp('11%'),
            alignSelf: 'center',
          }}>
          {/* <Rating
            imageSize={wp('6%')}
            readonly={true}
            startingValue={3.5}></Rating> */}
          <Text style={[Typography.large, {color: Colors.PALE_BLUE}]}>
            RM {props.lowPrice}-{props.highPrice}/{props.siUnit}
          </Text>
        </View>
        <View
          style={{
            width: wp('65%'),
            height: hp('18%'),
            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 20,
            alignItems: 'center',
            top: hp('3%'),
          }}>
          <Text
            style={[
              Typography.normal,
              {
                lineHeight: hp('3%'),
                top: hp('3%'),
                left: wp('5%'),
                position: 'absolute',
              },
            ]}>
            {Strings.grade}:{'\n'}
            {Strings.variety}: {'\n'}
            {Strings.available}: {'\n'}MOQ:
          </Text>
          <Text
            style={[
              Typography.normal,
              {
                lineHeight: hp('3%'),
                top: hp('3%'),
                right: wp('5%'),
                position: 'absolute',
                textAlign: 'right',
              },
            ]}>
            {props.grade}
            {'\n'}
            {props.variety}
            {'\n'}
            {props.quantityAvailable}
            {'\n'}
            {props.minimumQuantity}
          </Text>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            width: wp('75%'),
            top: hp('5%'),
          }}></View>
        <View
          style={{
            width: wp('70%'),
            top: hp('8%'),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text style={Typography.normal}>{Strings.quantityToBuy}:</Text>
          <TextInput
            keyboardType="number-pad"
            value={desiredQuantity}
            onChangeText={item => setDesiredQuantity(item)}
            underlineColorAndroid="transparent"
            style={{
              left: wp('3%'),
              width: wp('20%'),
              height: hp('6%'),
              /* 20 works for IOS but we need a 25 for android */
              borderWidth: 1,
              borderRadius: 20,
              textAlign: 'center',
              textAlignVertical: 'bottom',
              borderBottomColor: 'black',
              color: 'black',
            }}></TextInput>
        </View>
        <BlueButton
          text={Strings.purchaseOrder}
          font={Typography.normal}
          icon="add-outline"
          flexDirection="row-reverse"
          offsetCenter={wp('5%')}
          borderRadius={10}
          onPress={() => {
            desiredQuantity > 0
              ? addToPurchaseOrder()
              : setUnsuccessfulModal(true),
              setAddPO(false);
          }}
          top={hp('12%')}
          onPressIn={() => setAddPO(true)}
          disabled={addPO}
        />
      </View>
      <Modal
        isVisible={unsuccessfulModal}
        onBackdropPress={() => setUnsuccessfulModal(false)}>
        <UnsuccessfulModal text={'Only positive numbers are allowed'} />
      </Modal>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setProductModal(false),
        ]}>
        <SuccessfulModal
          text={'You have successfully added the items to your purchase order'}
        />
      </Modal>
      <Modal
        isVisible={inquirySuccessfulModal}
        onBackdropPress={() => setInquirySuccessfulModal(false)}>
        <SuccessNavigateChatModal
          chatGroupID={props.purchaseOrder}
          chatName={props.storeName}
          navigation={props.navigation}
          onPress={() => [
            props.navigation.navigate('chatroom', {
              itemID: props.purchaseOrder,
              chatName: props.storeName,
            }),
            props.setProductModal(false),
            setInquirySuccessfulModal(false),
          ]}
          text="Your product inquiry has been sent"
        />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export const PurchaseOrderButton = props => {
  const [purchaseOrderModal, setPurchaseOrderModal] = useState(false);

  return (
    <View>
      <BlueButton
        onPress={() => setPurchaseOrderModal(true)}
        text={Strings.purchaseOrder}
        font={Typography.normal}
        borderRadius={10}
        backgroundColor={Colors.PALE_BLUE}
        minWidth={wp('44%')}
        paddingVertical={hp('1.5%')}
      />

      <Modal isVisible={purchaseOrderModal}>
        <PurchaseOrder
          setPurchaseOrderModal={setPurchaseOrderModal}
          POList={props.POList}
          setPOList={props.setPOList}
          user={props.user}
          purchaseOrder={props.purchaseOrder}
          navigation={props.navigation}
          trigger={props.trigger}
          storeName={props.storeName}></PurchaseOrder>
      </Modal>
    </View>
  );
};

const PurchaseOrder = props => {
  const [poSuccessfulModal, setpoSuccessfulModal] = useState(false);
  const [poUnsuccessfulModal, setpoUnsuccessfulModal] = useState(false);
  const [sendPOButton, setSendPOButton] = useState(false);
  log('PO \n \n \n');
  log(props.POList);
  const sendPO = async () => {
    var message = '';
    var positiveQuantity = true;
    const arrLength = props.POList.length;
    props.POList.forEach((item, index, arr) => {
      message = message + (item.id + '+');
      message = message + (item.name + '+');
      message = message + (item.quantity + '+');
      message = message + (item.siUnit + '+');
      message = message + (item.variety + '+');
      message = message + item.grade;
      if (item.quantity <= 0 || isNaN(item.quantity)) {
        positiveQuantity = false;
      }
      if (index < arrLength - 1) {
        message = message + '/';
      }
    });
    if (positiveQuantity) {
      try {
        const updateChat = await API.graphql({
          query: updateChatGroup,
          variables: {
            input: {
              id: props.purchaseOrder,
              mostRecentMessage: 'Purchase Order',
              mostRecentMessageSender: props.user.name,
            },
          },
        });
        log('chat group already exist');
      } catch (e) {
        if (
          e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException'
        ) {
          try {
            const chatGroup = {
              id: props.purchaseOrder,
              name: props.user.retailerCompany.name + '+' + props.storeName,
              retailerID: props.user.retailerCompany.id,
              supplierID: props.purchaseOrder.slice(36, 72),
              mostRecentMessage: 'Purchase Order',
              mostRecentMessageSender: props.user.name,
            };

            const createdChatGroup = await API.graphql({
              query: createChatGroup,
              variables: {input: chatGroup},
            });
          } catch (e) {
            log(e.errors[0].errorType);
          }
        } else {
          log(e.errors[0].errorType);
        }
      }

      var mostRecentPurchaseOrderNumber;
      try {
        const response = await API.graphql({
          query: getSupplierCompany,
          variables: {id: props.purchaseOrder.slice(36, 72)},
        });
        mostRecentPurchaseOrderNumber =
          response.data.getSupplierCompany.mostRecentPurchaseOrderNumber;

        if (mostRecentPurchaseOrderNumber) {
          if (
            dayjs().format('YYYY-MM') ==
            mostRecentPurchaseOrderNumber.slice(4, 11)
          ) {
            var number = parseInt(mostRecentPurchaseOrderNumber.slice(12, 16));
            var numberString = (number + 1).toString().padStart(4, '0');
            mostRecentPurchaseOrderNumber =
              'P.O-' + dayjs().format('YYYY-MM-') + numberString;
          } else {
            mostRecentPurchaseOrderNumber =
              'P.O-' + dayjs().format('YYYY-MM-') + '0001';
          }
        } else {
          mostRecentPurchaseOrderNumber =
            'P.O-' + dayjs().format('YYYY-MM-') + '0001';
        }

        log('creating purchase order');
        const supplierCompanyUpdate = await API.graphql({
          query: updateSupplierCompany,
          variables: {
            input: {
              id: props.purchaseOrder.slice(36, 72),
              mostRecentPurchaseOrderNumber: mostRecentPurchaseOrderNumber,
            },
          },
        });
      } catch (e) {
        log(e);
      }
      try {
        const inquiry = {
          chatGroupID: props.purchaseOrder,
          type: mostRecentPurchaseOrderNumber,
          content: message,
          sender: props.user.name,
          senderID: props.user.id,
        };
        const messageSent = await API.graphql({
          query: createMessage,
          variables: {input: inquiry},
        });

        setpoSuccessfulModal(true);
      } catch (e) {
        log(e);
      }
    } else {
      setpoUnsuccessfulModal(true);
      //TODO add inappropriate addition modal
    }

    setSendPOButton(false);
  };
  return (
    <View
      style={{
        height: hp('80%'),
        width: wp('90%'),
        backgroundColor: Colors.GRAY_LIGHT,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={[
            Typography.large,
            {
              fontFamily: 'Poppins-SemiBold',
              top: hp('2%'),
            },
          ]}>
          {Strings.purchaseOrderFor}
        </Text>
        <Text
          style={[
            Typography.header,
            {
              fontFamily: 'Poppins-Bold',
              color: Colors.LIME_GREEN,
              top: hp('2%'),
            },
          ]}>
          {props.storeName}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: Colors.GRAY_DARK,
          height: hp('55%'),
          top: hp('5%'),
          borderRadius: 10,
          width: wp('85%'),
        }}>
        <PurchaseOrderList
          POList={props.POList}
          trigger={props.trigger}
          setPOList={props.setPOList}></PurchaseOrderList>
      </View>
      <BlueButton
        text={Strings.sendPOtoSupplier}
        font={Typography.normal}
        icon="paper-plane-outline"
        offsetCenter={wp('5%')}
        borderRadius={10}
        onPress={() => sendPO()}
        top={hp('8%')}
        onPressIn={() => setSendPOButton(true)}
        disabled={sendPOButton}
      />

      <View
        style={{
          position: 'absolute',
          right: wp('1%'),
          top: hp('1%'),
        }}>
        <CloseButton setModal={props.setPurchaseOrderModal} />
      </View>
      <Modal
        isVisible={poSuccessfulModal}
        onBackdropPress={() => [
          setpoSuccessfulModal(false),
          props.setPurchaseOrderModal(false),
        ]}>
        <SuccessNavigateChatModal
          chatGroupID={props.purchaseOrder}
          chatName={props.storeName}
          navigation={props.navigation}
          onPress={() => [
            props.navigation.navigate('chatroom', {
              itemID: props.purchaseOrder,
              chatName: props.storeName,
            }),
            props.setPurchaseOrderModal(false),
          ]}
          text="You have successfully sent your purchase order, wait for the supplier to get back"
        />
        {/*TRANSLATION successful */}
      </Modal>
      <Modal
        isVisible={poUnsuccessfulModal}
        onBackdropPress={() => setpoUnsuccessfulModal(false)}>
        <UnsuccessfulModal text="One or more of your orders does not have a valid input. Please check and try again" />
        {/*TRANSLATION unsunccessful */}
      </Modal>
    </View>
  );
};

const PurchaseOrderList = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          width: wp('85%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={props.POList}
      extraData={props.trigger}
      numColumns={1}
      ItemSeparatorComponent={Seperator}
      ListEmptyComponent={
        <View
          style={{
            width: wp('70%'),
            height: hp('60%'),
            top: hp('5%'),
            alignItems: 'center',
          }}>
          <Text>PO is empty, start by adding a product from this store</Text>
        </View>
      }
      renderItem={({item}) => {
        return (
          <PurchaseOrderComponent
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            variety={item.variety}
            grade={item.grade}
            siUnit={item.siUnit}
            setPOList={props.setPOList}
            POList={props.POList}
          />
        );
      }}
    />
  );
};

const PurchaseOrderComponent = props => {
  const [edit, setEdit] = useState(false);
  const [number, setNumber] = useState(props.quantity.toString());
  const deleteItemFromPO = async () => {
    log('deleting item: ' + props.id);
    try {
      const deleted = await API.graphql({
        query: deleteProductsInPurchaseOrder,
        variables: {input: {id: props.id}},
      });
      var poList = props.POList;
      const tempList = poList.filter(item => item.id !== props.id);

      props.setPOList(tempList);
    } catch {
      e => log(e);
    }
  };
  const updateitemFromPO = async () => {
    try {
      const updated = await API.graphql({
        query: updateProductsInPurchaseOrder,
        variables: {input: {id: props.id, quantity: number}},
      });
      var tempList = props.POList;
      tempList.forEach((item, index, arr) => {
        if (item.id == props.id) {
          arr[index] = updated.data.updateProductsInPurchaseOrder;
        }
      });
      props.setPOList(tempList);
    } catch (e) {
      log(e);
    }
  };
  log(typeof props.quantity);
  return (
    <View
      style={{
        height: hp('8%'),
        width: wp('80%'),
        justifyContent: 'center',
        paddingVertical: hp('2%'),
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text
            style={[
              Typography.normal,
              {
                left: wp('5%'),
                minWidth: wp('35%'),
                height: hp('3%'),
              },
            ]}>
            {props.name} ({props.grade})
          </Text>
          {/* TODO word length */}
          <Text
            style={[
              Typography.normal,
              {
                left: wp('5%'),
                minWidth: wp('35%'),
                height: hp('3%'),
              },
            ]}>
            {Strings.variety}: {props.variety}
          </Text>
          {edit ? (
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  position: 'absolute',
                  flexDirection: 'row',
                  top: hp('1.5%'),
                }}>
                <TextInput
                  style={{
                    left: wp('50%'),
                    backgroundColor: 'white',
                    width: wp('10%'),
                    height: hp('3%'),
                    padding: 0,
                    color: 'black',
                  }}
                  onChangeText={item => setNumber(item)}
                  value={number}
                  keyboardType="number-pad"
                />
                <Text style={[Typography.normal, {left: wp('50%')}]}>
                  {props.siUnit}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => [setEdit(false), updateitemFromPO()]}
                style={{
                  left: wp('70%'),
                  top: hp('1.2%'),
                }}>
                <Icon
                  name="checkmark-circle-outline"
                  size={wp('7%')}
                  style={{color: 'green'}}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{position: 'absolute', flexDirection: 'row'}}>
              <Text
                style={[
                  Typography.normal,
                  {
                    position: 'absolute',
                    right: wp('-68%'),
                    top: hp('1.5%'),
                  },
                ]}>
                {number} {props.siUnit}
              </Text>
              <View
                style={{
                  left: wp('88%'),
                  top: hp('1.3%'),
                }}>
                <TouchableOpacity
                  onPress={() => setEdit(true)}
                  style={{
                    position: 'absolute',
                    right: wp('12%'),
                  }}>
                  <Icon
                    name="create-outline"
                    size={wp('6%')}
                    style={{color: 'black'}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => deleteItemFromPO()}
                  style={{
                    position: 'absolute',
                    right: wp('5%'),
                  }}>
                  <Icon
                    name="trash-outline"
                    size={wp('6%')}
                    color={Colors.FAIL}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export const DetailsModal = props => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [imageSource, setImageSource] = useState(null);

  const getStoreDetails = async () => {
    if (props.companyType == 'retailer') {
      try {
        var storeDetails = await API.graphql({
          query: getSupplierCompany,
          variables: {id: props.id},
        });
        log('retailer');
        setCompanyDetails(storeDetails.data.getSupplierCompany);
      } catch (e) {
        log(e);
      }
    } else if (props.companyType == 'supplier') {
      try {
        var storeDetails = await API.graphql({
          query: getRetailerCompany,
          variables: {id: props.id},
        });
        log('supplier');
        setCompanyDetails(storeDetails.data.getRetailerCompany);
      } catch (e) {
        log(e);
      }
    }
  };
  useEffect(() => {
    getStoreDetails();
    log('Fetching Details');
  }, []);
  useEffect(async () => {
    if (companyDetails.logo) {
      try {
        const imageURL = await Storage.get(companyDetails.logo);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        log(e);
      }
    }
  }, [companyDetails]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: wp('90%'),
        height: hp('85%'),
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View style={{position: 'absolute', right: hp('1%'), top: hp('1%')}}>
        <CloseButton setModal={props.setDetailsModal} />
      </View>
      <View style={{alignItems: 'center', top: hp('3%')}}>
        <Text style={[Typography.header, {top: hp('2%')}]}>{props.name}</Text>

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('80%'),
            height: hp('25%'),
          }}>
          {imageSource == null ? (
            <Image
              source={require('_assets/images/company-logo.png')}
              style={{
                resizeMode: 'contain',
                width: wp('80%'),
                height: hp('20%'),
              }}
            />
          ) : (
            <Image
              source={imageSource}
              style={{
                resizeMode: 'contain',
                width: wp('80%'),
                height: hp('20%'),
              }}
            />
          )}
        </View>
        {companyDetails.rating == null ? (
          <Text style={[Typography.normal]}>No ratings yet</Text>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Rating
              imageSize={wp('6%')}
              readonly={true}
              startingValue={companyDetails.rating.currentRating}></Rating>
            <Text style={[Typography.normal, {left: wp('1%')}]}>
              ( {companyDetails.rating.numberOfRatings} )
            </Text>
          </View>
        )}
        <View
          style={{
            alignItems: 'flex-start',
            backgroundColor: Colors.GRAY_LIGHT,
            width: wp('80%'),
            height: hp('33%'),
            top: hp('3%'),
            borderRadius: 10,
          }}>
          <View
            style={{alignItems: 'flex-start', top: hp('2%'), left: wp('5%')}}>
            <View>
              <Text style={[Typography.placeholder]}>
                {Strings.companyRegistrationNum}
              </Text>
              <Text style={[Typography.normal]}>
                {companyDetails.registrationNumber}
              </Text>
            </View>
            <View style={{top: hp('1%')}}>
              <Text style={[Typography.placeholder]}>
                {Strings.companyAddress}
              </Text>
              <Text style={[Typography.normal, {width: wp('70%')}]}>
                {companyDetails.address}
              </Text>
            </View>
            <View style={{top: hp('2%')}}>
              <Text style={[Typography.placeholder]}>
                {Strings.contactNumber}
              </Text>
              {companyDetails.contactDetails != null ? (
                <Text style={[Typography.normal]}>
                  {companyDetails.contactDetails.phone}
                </Text>
              ) : (
                <Text style={[Typography.normal]}>Not Added Yet</Text>
              )}
            </View>
          </View>
        </View>
        {props.button == 'true' ? (
          <BlueButton
            top={hp('5%')}
            borderRadius={10}
            text={'Send Catalog'}
            font={Typography.normal}
            onPress={props.onSend}
            onPressIn={props.onOut}
            disabled={props.disabled}
          />
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};
