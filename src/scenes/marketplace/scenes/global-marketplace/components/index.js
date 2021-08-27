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
import Strings, {log, marketPlace} from '_utils';

import {userStore, companyStore} from '_store';
import {Font} from '_components';

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
          height: hp('8%'),
          width: hp('8%'),
          borderRadius: 100,
        }}></Image>
      <Font.Small style={{top: hp('2%')}}>{props.productName}</Font.Small>
      <Font.Small
        style={{marginTop: hp('2%'), width: wp('39%'), alignSelf: 'center'}}>
        {Strings.variety}: {props.variety}
        {'\n'}
        {Strings.price}: {props.lowPrice} - {props.highPrice}
        {'\n'}
        {Strings.grade}: {props.grade}
      </Font.Small>
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
          seller={props.seller}
          user={props.user}></ProductPopUp>
      </Modal>
    </TouchableOpacity>
  );
};

export const MarketplaceList = props => {
  const companyType = companyStore(state => state.companyType);

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
            <Font.Normal style={{textAlign: 'center'}}>
              {Strings.sorryTheItem}
            </Font.Normal>
          </View>
          <View
            style={{
              width: wp('70%'),
              bottom: hp('8%'),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Font.Normal>{Strings.doesNotExist}</Font.Normal>
            <TouchableOpacity
              style={{marginLeft: wp('1%')}}
              onPress={() => OpenWhatsapp()}>
              <Font.Normal style={{textDecorationLine: 'underline'}}>
                {Strings.whatsappUs}
              </Font.Normal>
            </TouchableOpacity>
          </View>
          <View style={{width: wp('70%'), bottom: hp('8%')}}>
            <Font.Normal style={{textAlign: 'center'}}>
              {Strings.soWeCanSource}
            </Font.Normal>
          </View>
        </View>
      }
      renderItem={({item}) => {
        log(item.supplier, 'green');
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
            seller={companyType == 'retailer' ? item.supplier : item.farmer}
          />
        );
      }}
    />
  );
};

export const ProductPopUp = props => {
  const userName = userStore(state => state.userName);
  const companyID = companyStore(state => state.companyID);
  const companyName = companyStore(state => state.companyName);
  const companyType = companyStore(state => state.companyType);
  const userID = userStore(state => state.userID);
  const [successfulModal, setSuccessfulModal] = useState(false);

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
          <Font.Header>{props.productName}</Font.Header>

          <TouchableOpacity>
            <Icon
              name="chatbox-outline"
              size={wp('8%')}
              onPress={() => [
                marketPlace
                  .sendProductInquiry(
                    companyType,
                    companyName,
                    companyID,
                    props.sellerID,
                    userName,
                    userID,
                    props.seller,
                    props.productName,
                    props.lowPrice,
                    props.highPrice,
                    props.variety,
                    props.grade,
                  )
                  .then(setSuccessfulModal(true)),
              ]}></Icon>
          </TouchableOpacity>
        </View>
        <Image
          style={{
            top: hp('10%'),
            height: hp('18%'),
            width: wp('38%'),
            borderRadius: 10,
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
            {/* <Rating
              imageSize={wp('6%')}
              readonly={true}
              startingValue={3.5}></Rating> */}
            <TouchableOpacity
              onPress={() => [
                props.navigation.navigate('store', {
                  itemId: props.sellerID,
                  storeName: props.seller.name,
                }),
                props.setProductModal(false),
              ]}
              style={{
                width: wp('40%'),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                height: hp('3%'),
                left: wp('4%'),
                top: hp('3%'),
              }}>
              <Image
                style={{
                  resizeMode: 'contain',
                  height: hp('3%'),
                  width: wp('5%'),
                }}
                source={require('_assets/images/online-store.png')}
              />
              <Font.Normal
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  width: wp('30%'),
                }}>
                {Strings.visitStore}
              </Font.Normal>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: wp('30%'),
              right: wp('-1%'),
            }}>
            <Font.Normal style={{top: hp('3%'), color: Colors.PALE_BLUE}}>
              RM {props.lowPrice}-{props.highPrice}/{props.siUnit}
            </Font.Normal>
          </View>
        </View>
        <View
          style={{
            top: hp('18%'),
            width: wp('70%'),
            backgroundColor: Colors.GRAY_LIGHT,
            borderRadius: 20,
            alignItems: 'center',
            paddingVertical: hp('2%'),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('60%'),
            }}>
            <Font.NormalBold>{Strings.variety}:</Font.NormalBold>
            <Font.Normal>{props.variety}</Font.Normal>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('60%'),
            }}>
            <Font.NormalBold>{Strings.grade}:</Font.NormalBold>
            <Font.Normal>{props.grade}</Font.Normal>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('60%'),
            }}>
            <Font.NormalBold>{Strings.available}:</Font.NormalBold>
            <Font.Normal>{props.quantityAvailable}</Font.Normal>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('60%'),
            }}>
            <Font.NormalBold>MOQ:</Font.NormalBold>
            <Font.Normal>{props.minimumQuantity}</Font.Normal>
          </View>
        </View>
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setProductModal(false),
        ]}>
        <SuccessfulModal text="You have successfully sent an inquiry to the seller. Go to chats to continue your conversation" />
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
            <Font.Normal style={{textAlign: 'center'}}>
              {Strings.sorryYouHaveNot}
            </Font.Normal>
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
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
        top: hp('3%'),
        marginHorizontal: wp('4%'),
        marginVertical: hp('1%'),
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
      <View style={{paddingBottom: hp('3%')}}>
        <Font.Normal style={{top: hp('1%')}}>{props.storeName}</Font.Normal>
      </View>
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
          <Font.Normal>{Strings.search}</Font.Normal>
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
