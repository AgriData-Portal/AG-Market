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
import {CloseButton, SuccessNavigateChatModal, BlueButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';

import Icon from 'react-native-vector-icons/Ionicons';
import {API, Storage} from 'aws-amplify';

import {
  createProductsInPurchaseOrder,
  deleteProductsInPurchaseOrder,
  updateProductsInPurchaseOrder,
  createMessage,
  createChatGroup,
  updateChatGroup,
} from '../../../../../graphql/mutations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {SuccessfulModal} from '_components/modals';
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
      log(imageSource);
    } catch (e) {
      log(e);
    }
  };
  useEffect(() => {
    getImage();
    log('Image...');
  }, []);
  return (
    <TouchableOpacity
      onPress={() => setProductModal(true)}
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('36%'),
        height: hp('30%'),
        margin: wp('5%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
      }}>
      <Image
        source={imageSource}
        style={{
          height: Mixins.scaleHeight(70),
          width: Mixins.scaleHeight(70),
          borderRadius: 100,
          top: Mixins.scaleHeight(10),
        }}></Image>
      <Text style={[Typography.normal, {top: hp('2%')}]}>
        {props.productName}
      </Text>
      <Text
        style={[
          Typography.small,
          {top: hp('2%'), width: wp('33%'), alignSelf: 'center'},
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
          log(chatGroup);
          const createdChatGroup = await API.graphql({
            query: createChatGroup,
            variables: {input: chatGroup},
          });
          log(createdChatGroup);
        } catch (e) {
          log(e.errors[0].errorType);
        }
      } else {
        log(e.errors[0].errorType);
      }
    }

    log('creating product inquiry');
    log(props.user);
    log(props.id);
    log(props.purchaseOrder);
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
      log(message.data.createMessage);
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
            purchaseOrderID: props.purchaseOrder,
            name: props.productName,
            quantity: parseInt(desiredQuantity),
            siUnit: props.siUnit,
            grade: props.grade,
            variety: props.variety,
          },
        },
      });
      log(added.data.createProductsInPurchaseOrder);
      var poList = props.POList;
      log(poList);
      poList.push(added.data.createProductsInPurchaseOrder);
      log(poList);
      props.setPOList(poList);
      setSuccessfulModal(true);
    } catch {
      e => log(e);
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
          height: hp('90%'),
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
          <View style={{position: 'absolute', right: wp('2%')}}>
            <TouchableOpacity
              onPress={() => [sendProductInquiry()]}
              onPressIn={() => setProductInquire(true)}
              disabled={productInquire}>
              <Icon name="chatbox-outline" size={wp('8%')}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <Image
          style={{
            top: hp('5%'),
            height: hp('30%'),
            width: hp('30%'),
            borderRadius: 100,
          }}
          source={props.productPicture}></Image>
        <View
          onPress={() => log('navigate')}
          style={{
            width: wp('35%'),
            flexDirection: 'row',
            height: hp('13%'),
            top: hp('6%'),
            alignSelf: 'center',
            right: wp('15%'),
          }}>
          <Rating
            imageSize={wp('6%')}
            readonly={true}
            startingValue={3.5}></Rating>
          <Text
            style={[
              Typography.large,
              {color: Colors.PALE_BLUE, left: wp('6%')},
            ]}>
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
          onPress={() => addToPurchaseOrder()}
          top={hp('12%')}
          onPressIn={() => setAddPO(true)}
          disabled={addPO}
        />
      </View>

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
          storeName={props.storeName}></PurchaseOrder>
      </Modal>
    </View>
  );
};

const PurchaseOrder = props => {
  const [poSuccessfulModal, setpoSuccessfulModal] = useState(false);
  const [sendPOButton, setSendPOButton] = useState(false);
  const sendPO = async () => {
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
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const chatGroup = {
            id: props.purchaseOrder,
            name: props.user.retailerCompany.name + '+' + props.storeName,
            retailerID: props.user.retailerCompany.id,
            supplierID: props.purchaseOrder.slice(36, 72),
            mostRecentMessage: 'Purchase Order',
            mostRecentMessageSender: props.user.name,
          };
          log(chatGroup);
          const createdChatGroup = await API.graphql({
            query: createChatGroup,
            variables: {input: chatGroup},
          });
          log(createdChatGroup);
        } catch (e) {
          log(e.errors[0].errorType);
        }
      } else {
        log(e.errors[0].errorType);
      }
    }

    const inquiry = {
      chatGroupID: props.purchaseOrder,
      type: 'purchaseorder',
      content: props.purchaseOrder,
      sender: props.user.name,
      senderID: props.user.id,
    };

    log('creating purchase order');
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: inquiry},
      });
      log(message.data.createMessage);

      setpoSuccessfulModal(true);
    } catch {
      e => log(e);
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
          width: wp('80%'),
        }}>
        <PurchaseOrderList
          POList={props.POList}
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
          width: wp('80%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={props.POList}
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
      log(tempList);
      props.setPOList(tempList);
      log(deleted.data.deleteProductsInPurchaseOrder);
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
      log(updated.data.updateProductsInPurchaseOrder);
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
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text
            style={[
              Typography.normal,
              {
                position: 'absolute',
                left: wp('5%'),
                width: wp('30%'),
                bottom: hp('1%'),
              },
            ]}>
            {props.name} ({props.grade})
          </Text>

          <Text
            style={[
              Typography.normal,
              {
                position: 'absolute',
                left: wp('5%'),
                top: hp('1.5%'),
                width: wp('30%'),
              },
            ]}>
            {Strings.variety}: {props.variety}
          </Text>
          {edit ? (
            <View style={{flexDirection: 'row'}}>
              <TextInput
                style={{
                  left: wp('50%'),
                  backgroundColor: 'white',
                  width: wp('10%'),
                }}
                onChangeText={item => setNumber(item)}
                value={number}
                keyboardType="number-pad"
              />
              <Text style={[Typography.normal, {left: wp('51%')}]}>
                {props.siUnit}
              </Text>
            </View>
          ) : (
            <Text style={[Typography.normal, {left: wp('50%')}]}>
              {number} {props.siUnit}
            </Text>
          )}
        </View>

        {edit ? (
          <View>
            <TouchableOpacity
              onPress={() => [setEdit(false), updateitemFromPO()]}
              style={{
                left: wp('55%'),
                bottom: hp('0.2%'),
              }}>
              <Icon
                name="checkmark-circle-outline"
                size={wp('6%')}
                style={{color: 'green'}}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{left: wp('70%')}}>
            <TouchableOpacity
              onPress={() => setEdit(true)}
              style={{
                position: 'absolute',
                right: wp('12%'),
                bottom: hp('0.2%'),
              }}>
              <Icon name="create-outline" size={wp('6%')} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => deleteItemFromPO()}
              style={{
                position: 'absolute',
                right: wp('5%'),
                bottom: hp('0.2%'),
              }}>
              <Icon name="trash-outline" size={wp('6%')} color={Colors.FAIL} />
            </TouchableOpacity>
          </View>
        )}
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
        height: hp('80%'),
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
                {companyDetails.registrationNumber} 100200
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
      </View>
    </View>
  );
};
