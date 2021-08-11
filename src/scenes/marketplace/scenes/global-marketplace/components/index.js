import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
  TextInput,
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
import {log} from '_utils';
import {userStore} from '_store';

export const ProductCard = props => {
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
  const [productModal, setProductModal] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setProductModal(true)}
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('36%'),
        height: hp('25%'),
        margin: wp('5%'),
        marginTop: hp('1%'),
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
          top: hp('2%'),
        }}></Image>
      <Text style={[Typography.normal, {top: hp('2.5%')}]}>
        {props.productName}
      </Text>
      <Text style={[Typography.small, {top: hp('3%'), width: wp('25%')}]}>
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
          sellerID={props.sellerID}
          siUnit={props.siUnit}
          supplier={props.supplier}
          user={props.user}></ProductPopUp>
      </Modal>
    </TouchableOpacity>
  );
};

export const MarketplaceList = props => {
  const companyType = userStore(state => state.companyType);
  const OpenWhatsapp = () => {
    let url =
      'https://wa.me/601165691998?text=Hi%20I%20am%20interested%20to%20purchase%20' +
      props.searchValue +
      '%20but%20your%20platform%20does%20not%20currently%20have%20it.%20Please%20help%20me%20source%20it.%20Thank%20you';
    Linking.openURL(url)
      .then(data => {
        log('WhatsApp Opened successfully ' + data); //<---Success
      })
      .catch(() => {
        alert('Make sure WhatsApp installed on your device'); //<---Error
      });
  };
  return (
    <FlatList
      // refreshControl={
      //   <RefreshControl
      //     refreshing={props.refreshing}
      //     onRefresh={props.onRefresh}
      //   />
      // }
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
            sellerID={
              companyType == 'retailer' ? item.supplierID : item.farmerID
            }
            supplier={companyType == 'retailer' ? item.supplier : item.farmer}
          />
        );
      }}
    />
  );
};

export const ProductPopUp = props => {
  const userName = userStore(state => state.userName);
  const companyID = userStore(state => state.companyID);
  const companyType = userStore(state => state.companyType);
  const userID = userStore(state => state.userID);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const sendProductInquiry = async () => {
    try {
      if (companyType == 'retailer') {
        const updateChat = await API.graphql({
          query: updateChatGroup,
          variables: {
            input: {
              id: companyID + props.sellerID,
              mostRecentMessage: 'Product Inquiry',
              mostRecentMessageSender: userName,
            },
          },
        });
      } else {
        const updateChat = await API.graphql({
          query: updateChatGroup,
          variables: {
            input: {
              id: props.sellerID + companyID,
              mostRecentMessage: 'Product Inquiry',
              mostRecentMessageSender: userName,
            },
          },
        });
      }
      log('chat group already exist');
    } catch (e) {
      log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          if (companytype == 'retailer') {
            const chatGroup = {
              id: companyID + props.sellerID,
              name: userName + '+' + props.supplier.name,
              retailerID: userID,
              supplierID: props.sellerID,
              mostRecentMessage: 'Product Inquiry',
              mostRecentMessageSender: userName,
            };
            log(chatGroup);
            const createdChatGroup = await API.graphql({
              query: createChatGroup,
              variables: {input: chatGroup},
            });
          } else {
            const chatGroup = {
              id: props.sellerID + companyID,
              name: userName + '+' + props.supplier.name,
              retailerID: userID,
              supplierID: props.sellerID,
              mostRecentMessage: 'Product Inquiry',
              mostRecentMessageSender: userName,
            };
            log(chatGroup);
            const createdChatGroup = await API.graphql({
              query: createChatGroup,
              variables: {input: chatGroup},
            });
          }
          log(createdChatGroup);
        } catch (e) {
          log(e.errors[0].errorType);
        }
      } else {
        log(e.errors[0].errorType);
      }
    }

    log('creating product inquiry');

    const inquiry = {
      chatGroupID: props.user.retailerCompanyID + props.sellerID,
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
      setSuccessfulModal(true);
    } catch {
      e => log(e);
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
              onPress={() => [
                props.navigation.navigate('store', {
                  itemId: props.sellerID,
                  storeName: props.supplier.name,
                }),
                props.setProductModal(false),
              ]}
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
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setProductModal(false),
        ]}>
        <SuccessfulModal text="You have successfully sent an inquiry to the supplier. Go to chats to continue your conversation" />
      </Modal>
    </View>
  );
};

export const FavouritesList = props => {
  return (
    <FlatList
      // refreshControl={
      //   <RefreshControl
      //     refreshing={props.refreshing}
      //     onRefresh={props.onRefresh}
      //   />
      // }
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
  log(props);
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

export const ProductSearchBar = props => {
  const [focus, setFocus] = useState(false);
  const [productChosen, setProductChosen] = useState('');
  const searchBar = useRef();
  var theProduct = props.searchable.filter(name =>
    name.includes(props.searchValue),
  );

  return (
    <View>
      <View
        style={{
          backgroundColor: Colors.GRAY_MEDIUM,
          borderRadius: 30,
          width: wp('90%'),
          height: hp('5%'),
          flexDirection: 'row',
        }}>
        <View
          style={{
            position: 'absolute',
            left: wp('5%'),
            height: hp('5%'),
            justifyContent: 'center',
          }}>
          <Icon name="search" size={wp('7%')} color={Colors.GRAY_DARK} />
        </View>
        <View
          style={{
            left: wp('13%'),
            justifyContent: 'center',

            height: hp('5%'),
          }}>
          <TextInput
            ref={searchBar}
            onFocus={() => [setFocus(true), log('into focus')]}
            onBlur={() => [setFocus(false), log('out of focus')]}
            placeholder={Strings.search}
            onChangeText={item => [
              setProductChosen(item.toUpperCase()),
              props.setSearchValue(item.toUpperCase()),
              log(item.toUpperCase()),
            ]}
            underlineColorAndroid="transparent"
            value={productChosen}
            style={{
              flex: 1,
              width: wp('55%'),
              height: hp('5%'),
              padding: 0,
              color: 'black',
            }}></TextInput>
        </View>

        <TouchableOpacity
          style={{
            position: 'absolute',
            left: wp('70%'),
            top: hp('1%'),
          }}
          onPress={() => {
            if (props.searchValue != '') {
              props.setSearchPressed(true);
              searchBar.current.blur();
              log(props.searchValue);
            }
          }}>
          <Text style={[Typography.normal]}>{Strings.search}</Text>
        </TouchableOpacity>
      </View>
      {focus == true ? (
        <View
          style={{
            backgroundColor: 'white',
            left: wp('13%'),
            maxHeight: hp('50%'),
            width: wp('55%'),
            alignItems: 'center',
          }}>
          <FlatList
            keyExtractor={item => item}
            keyboardShouldPersistTaps="always"
            data={theProduct}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: 0,
                    width: wp('55%'),
                    borderBottomColor: Colors.GRAY_DARK,
                    borderBottomWidth: 1,
                  }}
                />
              );
            }}
            renderItem={({item}) => {
              return (
                <ListOfItems
                  text={item}
                  setFocus={setFocus}
                  setProductChosen={setProductChosen}
                  setSearchValue={props.setSearchValue}
                  searchBar={searchBar}
                />
              );
            }}></FlatList>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};

const ListOfItems = props => {
  return (
    <TouchableOpacity
      style={{
        width: wp('55%'),
        left: wp('2%'),
        height: hp('5%'),
        backgroundColor: 'white',
        justifyContent: 'center',
      }}
      disabled={false}
      onPress={() => [
        props.setProductChosen(props.text),
        props.setSearchValue(props.text),
        props.searchBar.current.blur(),
      ]}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
  );
};
