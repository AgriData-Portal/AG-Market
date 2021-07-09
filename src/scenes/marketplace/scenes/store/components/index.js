import React, {useState} from 'react';
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
import {CloseButton, AddButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {ChatButton} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {API, Storage} from 'aws-amplify';

import {
  createProducts,
  deleteProducts,
  updateProducts,
  createMessage,
  createChatGroup,
  updateChatGroup,
} from '../../../../../graphql/mutations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

const ProductCard = props => {
  const [productModal, setProductModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setProductModal(true)}
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('36%'),
        height: hp('20%'),
        margin: wp('5%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
      }}>
      {/*<Image
        style={{
          height: Mixins.scaleHeight(70),
          width: Mixins.scaleHeight(70),
          borderRadius: 100,
          top: Mixins.scaleHeight(10),
        }}></Image>*/}
      <Text style={[Typography.normal, {top: hp('3%')}]}>
        {props.productName}
      </Text>
      <Text style={[Typography.small, {top: hp('4%'), width: wp('20%')}]}>
        {Strings.price}: 3{props.priceMin} - 8{props.priceMax}
        {'\n'}MOQ: {props.moq}
        {'\n'}Grade: {props.grade}
      </Text>
      <Modal isVisible={productModal}>
        <ProductPopUp
          setProductModal={setProductModal}
          purchaseOrder={props.purchaseOrder}
          POList={props.POList}
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
            productName={item.produce}
            type={item.variety}
            availableQuantity={item.quantity}
            date={item.updatedAt}
            image={item.image}
            priceMin={item.listedPrice}
            priceMax={item.listedPrice}
            farmName={item.farmName} //need to add
            farmLocation={item.farmLocation} //need to add
            availdate={item.delivery} //need to add
            moq={item.moq}
            farmerID={item.farmerID}
            id={item.id}
            purchaseOrder={props.purchaseOrder}
            POList={props.POList}
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
  const sendProductInquiry = async () => {
    console.log('creating product inquiry');
    console.log(props.user);
    console.log(props.id);
    console.log(props.purchaseOrder);
    const inquiry = {
      chatGroupID: props.purchaseOrder,
      type: 'inquiry',
      content: props.id,
      sender: props.user.name,
      senderID: props.user.id,
    };
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: inquiry},
      });
      console.log(message.data.createMessage);
      setInquirySuccessfulModal(true);
    } catch {
      e => console.log(e);
    }
  };
  const addToPurchaseOrder = async () => {
    console.log('addingToPO ' + props.purchaseOrder);
    try {
      const added = await API.graphql({
        query: createProducts,
        variables: {
          input: {
            purchaseOrderID: props.purchaseOrder,
            name: props.productName,
            quantity: parseInt(desiredQuantity),
            siUnit: 'kg',
          },
        },
      });
      console.log(added.data.createProducts);
      var poList = props.POList;
      console.log(poList);
      poList.push(added.data.createProducts);
      console.log(poList);
      props.setPOList(poList);
    } catch {
      e => console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? -120 : -180
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
            {props.productName}Ginger
          </Text>
          <View style={{position: 'absolute', right: wp('2%')}}>
            <TouchableOpacity onPress={() => sendProductInquiry()}>
              <Icon name="chatbox-outline" size={wp('8%')}></Icon>
            </TouchableOpacity>
          </View>
        </View>
        {/** 
        <Image
          style={{
            top: hp('5%'),
            height: hp('20%'),
            width: hp('20%'),
            borderRadius: 100,
          }}
          source={{uri: ''}}></Image>*/}
        <View
          onPress={() => console.log('navigate')}
          style={{
            width: wp('35%'),
            flexDirection: 'row',
            height: hp('13%'),
            top: hp('6%'),
            alignSelf: 'center',
            right: wp('15%'),
          }}>
          <Rating
            imageSize={wp('7%')}
            readonly={true}
            startingValue={3.5}></Rating>
          <Text
            style={[
              Typography.large,
              {color: Colors.PALE_BLUE, left: wp('5%')},
            ]}>
            RM 25-18/kg
          </Text>
        </View>
        <View
          style={{
            top: hp('3%'),
            width: wp('65%'),
            height: hp('25%'),
            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <Text
            style={[
              Typography.small,
              {
                lineHeight: hp('3%'),
                top: hp('3%'),
                left: wp('5%'),
                position: 'absolute',
              },
            ]}>
            {Strings.variety}:{'\n'}
            {Strings.available}:{'\n'}MOQ:{'\n'}
            {Strings.otherDetails}:
          </Text>
          <Text
            style={[
              Typography.small,
              {
                lineHeight: hp('3%'),
                top: hp('3%'),
                right: wp('5%'),
                position: 'absolute',
                textAlign: 'right',
              },
            ]}>
            1{'\n'}30{'\n'}10
          </Text>
          <View
            style={{
              width: wp('60%'),
              height: hp('7%'),
              backgroundColor: 'white',
              top: hp('15.5%'),
            }}></View>
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
        <View style={{position: 'absolute', bottom: hp('5%')}}>
          <TouchableOpacity
            onPress={() => addToPurchaseOrder()}
            style={{
              width: wp('50%'),
              backgroundColor: Colors.GRAY_LIGHT,
              borderRadius: 20,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              height: hp('5%'),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}>
            <View>
              <Icon name="add-outline" size={wp('5.5%')}></Icon>
            </View>
            <Text style={[Typography.normal, {left: wp('3%')}]}>
              {Strings.purchaseOrder}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        isVisible={inquirySuccessfulModal}
        onBackdropPress={() => setInquirySuccessfulModal(false)}>
        <InquirySuccessfulModal />
      </Modal>
    </KeyboardAvoidingView>
  );
};

const InquirySuccessfulModal = props => {
  return (
    <View
      style={{
        height: Mixins.scaleHeight(330),
        width: Mixins.scaleWidth(290),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: Mixins.scaleWidth(30)}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: Mixins.scaleWidth(200),
            height: Mixins.scaleHeight(150),
          }}
        />
      </View>
      <View style={{top: Mixins.scaleHeight(15)}}>
        <Text style={[Typography.header]}>SUCCESS!</Text>
      </View>
      <View
        style={{width: Mixins.scaleWidth(260), top: Mixins.scaleHeight(25)}}>
        <Text
          style={[
            {textAlign: 'center', lineHeight: Mixins.scaleHeight(15)},
            Typography.small,
          ]}>
          You have successfully sent your product inquiry, wait for the supplier
          to get back
        </Text>
      </View>
    </View>
  );
};

export const PurchaseOrderButton = props => {
  const [purchaseOrderModal, setPurchaseOrderModal] = useState(false);

  return (
    <TouchableOpacity
      style={{
        height: hp('6%'),
        width: wp('38%'),
        backgroundColor: Colors.PALE_BLUE,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
      onPress={() => setPurchaseOrderModal(true)}>
      <Text style={[Typography.normal]}>{Strings.purchaseOrder}</Text>
      <Modal isVisible={purchaseOrderModal}>
        <PurchaseOrder
          setPurchaseOrderModal={setPurchaseOrderModal}
          POList={props.POList}
          setPOList={props.setPOList}
          user={props.user}
          purchaseOrder={props.purchaseOrder}
          storeName={props.storeName}></PurchaseOrder>
      </Modal>
    </TouchableOpacity>
  );
};

const PurchaseOrder = props => {
  const [poSuccessfulModal, setpoSuccessfulModal] = useState(false);
  const sendPO = async () => {
    const chatGroups = props.user.retailerCompany.chatGroups.items;
    const chatGroupExists = chatGroups.filter(
      item => item.id == props.purchaseOrder,
    );

    const inquiry = {
      chatGroupID: props.purchaseOrder,
      type: 'purchaseorder',
      content: props.purchaseOrder,
      sender: props.user.name,
      senderID: props.user.id,
    };
    if (!chatGroupExists.length) {
      console.log(chatGroupExists + 'chat group does not exist');
      try {
        const chatGroup = {
          id: props.purchaseOrder,
          name: props.user.retailerCompany.name + '+' + props.storeName,
          retailerID: props.user.retailerCompany.id,
          supplierID: props.purchaseOrder.slice(36, 72),
          mostRecentMessage: 'Purchase Order',
          mostRecentMessageSender: props.user.name,
        };
        console.log(chatGroup);
        const createdChatGroup = await API.graphql({
          query: createChatGroup,
          variables: {input: chatGroup},
        });
        console.log(createdChatGroup);
      } catch {
        e => console.log(e);
      }
    } else {
      console.log(chatGroupExists + 'chat group already exist');
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
      } catch {
        e => console.log(e);
      }
    }

    console.log('creating product inquiry');
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: inquiry},
      });
      console.log(message.data.createMessage);

      setpoSuccessfulModal(true);
    } catch {
      e => console.log(e);
    }
  };
  return (
    <View
      style={{
        height: hp('70%'),
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
          backgroundColor: Colors.GRAY_WHITE,
          height: hp('30%'),
          top: hp('5%'),
          borderRadius: 10,
          width: wp('60%'),
        }}>
        <PurchaseOrderList
          POList={props.POList}
          setPOList={props.setPOList}></PurchaseOrderList>
      </View>
      <TouchableOpacity
        style={{
          bottom: hp('2%'),
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('65%'),
          alignItems: 'center',
          justifyContent: 'center',
          height: hp('5%'),
          borderRadius: 10,
          shadowColor: 'grey',
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 3,
          shadowRadius: 5,
          position: 'absolute',
        }}
        onPress={() => sendPO()}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[Typography.normal]}>{Strings.sendPOtoSupplier}</Text>
          <View style={{right: wp('-2%')}}>
            <Icon name="paper-plane-outline" size={wp('5%')}></Icon>
          </View>
        </View>
      </TouchableOpacity>
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
        onBackdropPress={() => setpoSuccessfulModal(false)}>
        <POSuccessfulModal />
      </Modal>
    </View>
  );
};

const POSuccessfulModal = props => {
  return (
    <View
      style={{
        height: Mixins.scaleHeight(330),
        width: Mixins.scaleWidth(290),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: Mixins.scaleWidth(30)}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: Mixins.scaleWidth(200),
            height: Mixins.scaleHeight(150),
          }}
        />
      </View>
      <View style={{top: Mixins.scaleHeight(15)}}>
        <Text style={[Typography.header]}>SUCCESS!</Text>
      </View>
      <View
        style={{width: Mixins.scaleWidth(260), top: Mixins.scaleHeight(25)}}>
        <Text
          style={[
            {textAlign: 'center', lineHeight: Mixins.scaleHeight(15)},
            Typography.small,
          ]}>
          You have successfully sent your purchase order, wait for the supplier
          to get back
        </Text>
      </View>
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
          width: wp('55%'),
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
  const deleteItemFromPO = async () => {
    console.log('deleting item: ' + props.id);
    try {
      const deleted = await API.graphql({
        query: deleteProducts,
        variables: {input: {id: props.id}},
      });
      var poList = props.POList;
      const tempList = poList.filter(item => item.id !== props.id);
      console.log(tempList);
      props.setPOList(tempList);
      console.log(deleted.data.deleteProducts);
    } catch {
      e => console.log(e);
    }
  };
  return (
    <View
      style={{
        height: hp('5%'),
        justifyContent: 'center',
        backgroundColor: Colors.GRAY_WHITE,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View>
          <Text
            style={[Typography.small, {position: 'absolute', left: wp('2%')}]}>
            {props.name}
          </Text>
          <Text
            style={[
              Typography.normal,
              {
                position: 'absolute',
                left: Mixins.scaleWidth(5),
                top: Mixins.scaleWidth(20),
              },
            ]}>
            Grade: {props.name}
          </Text>
          <Text
            style={[
              Typography.normal,
              {
                position: 'absolute',
                left: Mixins.scaleWidth(70),
                top: Mixins.scaleWidth(20),
              },
            ]}>
            Variety: {props.name}
          </Text>
          <Text style={[Typography.small, {left: wp('25%')}]}>
            {props.quantity}kg
          </Text>
        </View>

        <TouchableOpacity style={{position: 'absolute', left: wp('28%')}}>
          <Icon name="create-outline" size={wp('5%')} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => deleteItemFromPO()}
          style={{position: 'absolute', left: wp('33%')}}>
          <Icon name="trash-outline" size={wp('5%')} color={Colors.FAIL} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const DATA = [
  {name: 'Ginger', quantity: '30'},
  {name: 'Bananas', quantity: '40'},
  {name: 'Avacadoes', quantity: '50'},
  {name: 'Durian', quantity: '60'},
];
