import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  RefreshControl,
} from 'react-native';
import {CloseButton, SuccessfulModal} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import {Rating} from 'react-native-ratings';

import {API, Storage} from 'aws-amplify';
import {
  createMessage,
  createChatGroup,
  updateChatGroup,
} from '../../../../../graphql/mutations';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const ProductCard = props => {
  const [imageSource, setImageSource] = useState(null);
  const getImage = async () => {
    try {
      const imageURL = await Storage.get(props.productPicture);
      setImageSource({
        uri: imageURL,
      });
      console.log(imageSource);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getImage();
    console.log('Image...');
  }, []);
  const [productModal, setProductModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setProductModal(true)}
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('36%'),
        height: hp('25%'),
        margin: wp('5%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
      }}>
      <Image
        source={imageSource}
        style={{
          height: hp('8%'),
          width: hp('8%'),
          borderRadius: 100,
          top: Mixins.scaleHeight(10),
        }}></Image>
      <Text style={[Typography.normal, {top: hp('2.5%')}]}>
        {props.productName}
      </Text>
      <Text style={[Typography.small, {top: hp('2%'), width: wp('25%')}]}>
        {Strings.variety}: {props.variety}
        {'\n'}
        {Strings.price}: {props.lowPrice} - {props.highPrice}
        {'\n'}
        {Strings.grade}: {props.grade}
      </Text>
      <Modal isVisible={productModal}>
        <ProductPopUp
          setProductModal={setProductModal}
          navigation={props.navigation}
          productName={props.productName}
          grade={props.grade}
          variety={props.variety}
          quantityAvailable={props.quantityAvailable}
          date={props.updatedAt}
          productPicture={imageSource}
          lowPrice={props.lowPrice}
          highPrice={props.highPrice}
          minimumQuantity={props.minimumQuantity}
          supplierID={props.supplierID}
          siUnit={props.siUnit}
          chatGroups={props.chatGroups}
          supplier={props.supplier}
          user={props.user}></ProductPopUp>
      </Modal>
    </TouchableOpacity>
  );
};

export const MarketplaceList = props => {
  const OpenWhatsapp = () => {
    let url =
      'https://wa.me/601165691998?text=Hi%20I%20am%20interested%20to%20purchase%20' +
      props.searchValue +
      '%20but%20your%20platform%20does%20not%20currently%20have%20it.%20Please%20help%20me%20source%20it.%20Thank%20you';
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      keyExtractor={item => item.id}
      data={props.productList}
      numColumns={2}
      ListEmptyComponent={
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('40%'),
              top: hp('10%'),
              alignItems: 'center',
            }}>
            <Icon name="warning-outline" size={wp('40%')} />
          </View>
          <View style={{width: wp('70%'), bottom: hp('8%')}}>
            <Text style={[Typography.normal, {textAlign: 'center'}]}>
              {Strings.sorryTheItem}
            </Text>
          </View>
          <View
            style={{
              width: wp('70%'),
              bottom: hp('8%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={[Typography.normal]}>{Strings.doesNotExist}</Text>
            <TouchableOpacity
              style={{marginLeft: wp('1%')}}
              onPress={() => OpenWhatsapp()}>
              <Text
                style={[Typography.normal, {textDecorationLine: 'underline'}]}>
                {Strings.whatsappUs}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{width: wp('70%'), bottom: hp('8%')}}>
            <Text style={[Typography.normal, {textAlign: 'center'}]}>
              {Strings.soWeCanSource}
            </Text>
          </View>
        </View>
      }
      renderItem={({item}) => {
        return (
          <ProductCard
            chatGroups={props.chatGroups}
            navigation={props.navigation}
            productName={item.productName}
            grade={item.grade}
            variety={item.variety}
            quantityAvailable={item.quantityAvailable}
            date={item.updatedAt}
            siUnit={item.siUnit}
            productPicture={item.productPicture}
            lowPrice={item.lowPrice}
            highPrice={item.highPrice}
            minimumQuantity={item.minimumQuantity}
            supplierID={item.supplierID}
            supplier={item.supplier}
            user={props.user}
          />
        );
      }}
    />
  );
};

export const ProductPopUp = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const sendProductInquiry = async () => {
    try {
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.user.retailerCompanyID + props.supplierID,
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: props.user.name,
          },
        },
      });
      console.log('chat group already exist');
    } catch (e) {
      console.log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const chatGroup = {
            id: props.user.retailerCompanyID + props.supplierID,
            name: props.user.retailerCompany.name + '+' + props.supplier.name,
            retailerID: props.user.retailerCompanyID,
            supplierID: props.supplierID,
            mostRecentMessage: 'Product Inquiry',
            mostRecentMessageSender: props.user.name,
          };
          console.log(chatGroup);
          const createdChatGroup = await API.graphql({
            query: createChatGroup,
            variables: {input: chatGroup},
          });
          console.log(createdChatGroup);
        } catch (e) {
          console.log(e.errors[0].errorType);
        }
      } else {
        console.log(e.errors[0].errorType);
      }
    }

    console.log('creating product inquiry');

    const inquiry = {
      chatGroupID: props.user.retailerCompanyID + props.supplierID,
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
      console.log(message.data.createMessage);
      setSuccessfulModal(true);
    } catch {
      e => console.log(e);
    }
  };
  return (
    <View
      style={{
        right: wp('5%'),
        height: hp('70%'),
        width: wp('100%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          height: hp('60%'),
          width: wp('80%'),
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
            left: wp('7%'),
            top: hp('3%'),
            position: 'absolute',
            width: wp('50%'),
            flexDirection: 'row',
            zIndex: 2,
          }}>
          <Text style={[Typography.header]}>{props.productName}</Text>
        </View>

        <Image
          style={{
            top: hp('8%'),
            height: hp('18%'),
            width: wp('38%'),
            borderRadius: 100,
          }}
          source={props.productPicture}></Image>
        <View
          style={{
            top: hp('29%'),
            left: wp('4%'),
            position: 'absolute',
            width: wp('80%'),
            flexDirection: 'row',
          }}>
          <View>
            <Rating
              imageSize={wp('6%')}
              readonly={true}
              startingValue={3.5}></Rating>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('store', {
                  itemId: props.supplierID,
                  storeName: props.supplier.name,
                })
              }
              style={{
                width: wp('40%'),
                flexDirection: 'row',
                flexWrap: 'wrap',
                height: hp('3%'),
                left: wp('4%'),
                marginTop: hp('0.5%'),
              }}>
              <Icon name="rocket-outline" size={wp('5%')}></Icon>
              <Text
                style={[
                  Typography.normal,
                  {
                    fontFamily: 'Poppins-SemiBold',
                    left: wp('3%'),
                    width: wp('30%'),
                  },
                ]}>
                {Strings.visitStore}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('30%'),
              right: wp('-1%'),
            }}>
            <Text
              style={[
                Typography.normal,
                {top: wp('6%'), color: Colors.PALE_BLUE},
              ]}>
              RM {props.lowPrice}-{props.highPrice}/{props.siUnit}
            </Text>
          </View>
        </View>
        <View
          style={{
            top: hp('18%'),
            width: wp('70%'),
            height: hp('22%'),
            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 20,
            alignItems: 'center',
          }}>
          <View
            style={{
              left: wp('25%'),
              top: hp('2%'),
            }}>
            <TouchableOpacity>
              <Icon
                name="chatbox-outline"
                size={wp('8%')}
                onPress={() => sendProductInquiry()}></Icon>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              Typography.normal,
              {
                lineHeight: hp('3%'),
                top: hp('2%'),
                left: wp('5%'),
                position: 'absolute',
              },
            ]}>
            {Strings.variety}:{props.variety}
            {'\n'}
            {Strings.grade}: {props.grade}
            {'\n'}
            {Strings.available}: {props.quantityAvailable}
            {'\n'}MOQ: {props.minimumQuantity}
            {'\n'}
            {Strings.otherDetails}:
          </Text>
        </View>
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => setSuccessfulModal(false)}>
        <SuccessfulModal text="You have successfully sent an inquiry to the supplier. Go to chats to continue your conversation" />
      </Modal>
    </View>
  );
};

export const FavouritesList = props => {
  return (
    <FlatList
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing}
          onRefresh={props.onRefresh}
        />
      }
      keyExtractor={item => item.id}
      data={props.data}
      numColumns={2}
      ListEmptyComponent={
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              width: wp('100%'),
              height: hp('40%'),
              top: hp('10%'),
              alignItems: 'center',
            }}>
            <Icon name="warning-outline" size={wp('40%')} />
          </View>
          <View style={{width: wp('70%'), bottom: hp('8%')}}>
            <Text style={[Typography.normal, {textAlign: 'center'}]}>
              {Strings.sorryYouHaveNot}
            </Text>
          </View>
        </View>
      }
      renderItem={({item}) => {
        return (
          <StoreCard
            navigation={props.navigation}
            id={item.id}
            storeName={item.name}
          />
        );
      }}
    />
  );
};

const StoreCard = props => {
  console.log(props);
  const image = null;
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate('store', {
          itemId: props.id,
          storeName: props.storeName,
        })
      }
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('40%'),
        height: hp('18%'),
        margin: wp('3%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        top: hp('3%'),
      }}>
      <View
        style={{
          width: wp('30%'),
          height: hp('12%'),
          top: hp('1%'),
          right: wp('0%'),

          alignItems: 'center',
        }}>
        {image == null ? (
          <Image
            source={require('_assets/images/online-store.png')}
            style={{
              width: wp('24%'),
              height: hp('12%'),
              resizeMode: 'contain',
            }}
          />
        ) : (
          <Image
            source={require('_assets/images/agridata.png')}
            style={{
              width: wp('24%'),
              height: hp('12%'),
              resizeMode: 'contain',
            }}
          />
        )}
      </View>
      <Text style={[Typography.normal, {top: hp('1%')}]}>
        {props.storeName}
      </Text>
    </TouchableOpacity>
  );
};
