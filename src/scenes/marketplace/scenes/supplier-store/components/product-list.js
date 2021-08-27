import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {
  CloseButton,
  SuccessfulModal,
  UnsuccessfulModal,
  LoadingModal,
} from '_components';
import {Typography, Colors} from '_styles';
import Modal from 'react-native-modal';

import {
  deleteSupplierListing,
  updateSupplierListing,
  deleteFarmerListing,
  updateFarmerListing,
} from '../../../../../graphql/mutations';
import {API, Storage} from 'aws-amplify';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {listRetailerCompanys} from '../../../../../graphql/queries';
import {BlueButton} from '_components';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {log} from '_utils';
import {companyStore} from '_store';
import {Font} from '_components';

const ProductModal = props => {
  const [lowPrice, setLowPrice] = useState(props.lowPrice.toString());
  const [highPrice, setHighPrice] = useState(props.highPrice.toString());
  const [available, setAvailable] = useState(
    props.quantityAvailable.toString(),
  );
  const [moq, setMOQ] = useState(props.minimumQuantity.toString());
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [successfulModal2, setSuccessfulModal2] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unsuccessfulModal2, setUnsuccessfulModal2] = useState(false);
  const companyType = companyStore(state => state.companyType);

  const deleteListing = async () => {
    try {
      setLoading(true);
      if (companyType == 'supplier') {
        const deletedListing = await API.graphql({
          query: deleteSupplierListing,
          variables: {input: {id: props.id}},
        });
      } else {
        const deletedListing = await API.graphql({
          query: deleteFarmerListing,
          variables: {input: {id: props.id}},
        });
      }

      var products = props.productList;
      log(products.length);
      for (let [i, product] of products.entries()) {
        if (product.id == props.id) {
          products.splice(i, 1);
        }
      }

      log(products.length);

      props.setProducts(products);
      log('test');
      setSuccessfulModal2(true);
      props.setTrigger(!props.trigger);

      setLoading(false);
    } catch (e) {
      log(e);
    }
  };

  const updateListing = async () => {
    try {
      var updatedListing;
      if (companyType == 'supplier') {
        updatedListing = await API.graphql({
          query: updateSupplierListing,
          variables: {
            input: {
              id: props.id,
              lowPrice: parseFloat(lowPrice),
              highPrice: parseFloat(highPrice),
              quantityAvailable: parseInt(available),
              minimumQuantity: parseInt(moq),
            },
          },
        });
        updatedListing = updatedListing.data.updateSupplierListing;
      } else {
        updatedListing = await API.graphql({
          query: updateFarmerListing,
          variables: {
            input: {
              id: props.id,
              lowPrice: parseFloat(lowPrice),
              highPrice: parseFloat(highPrice),
              quantityAvailable: parseInt(available),
              minimumQuantity: parseInt(moq),
            },
          },
        });
        updatedListing = updatedListing.data.updateFarmerListing;
      }
      var products = props.productList;
      console.log(products);
      for (let [i, product] of products.entries()) {
        if (product.id == props.id) {
          products.splice(i, 1);
        }
      }

      products.push(updatedListing);
      console.log(products);
      props.setProducts(products);
      props.setTrigger(!props.trigger);
      setSuccessfulModal(true);
      setEditMode(false);
    } catch (e) {
      log(e);
    }
  };

  return (
    <View>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        resetScrollToCoords={{x: 0, y: 0}}
        scrollEnabled={false}
        extraHeight={hp('20%')}
        // behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        // keyboardVerticalOffset={
        //   Platform.OS === 'ios' ? hp('-8%') : hp('-8%')
        // } /* Keyboard Offset needs to be tested against multiple phones */
      >
        <View
          style={{
            height: hp('90%'),
            width: wp('90%'),
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            /* taking into account the margin from Product Card */
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
            style={{top: hp('5%'), alignSelf: 'flex-start', left: wp('5%')}}>
            <Font.Welcome>{props.productName}</Font.Welcome>
          </View>
          <View style={{top: hp('5%')}}>
            <Image
              source={props.productPicture}
              style={{
                resizeMode: 'contain',
                width: wp('70%'),
                height: hp('25%'),
              }}
            />
          </View>
          <View
            style={{
              top: hp('7%'),
              backgroundColor: Colors.GRAY_LIGHT,
              borderRadius: 15,
              width: wp('80%'),
              alignItems: 'center',
              zIndex: 10,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.23,
              shadowRadius: 2.62,
              elevation: 3,
              paddingBottom: hp('2%'),
            }}>
            {editMode ? (
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  margin: wp('0.5%'),
                }}>
                <Font.Large style={{margin: wp('0.5%')}}>
                  {Strings.editProductDetails}
                </Font.Large>
                <Font.Normal style={{margin: wp('0.5%')}}>
                  {Strings.grade}: {props.grade}
                </Font.Normal>
                <Font.Normal style={{margin: wp('0.5%')}}>
                  {Strings.variety}: {props.variety}
                </Font.Normal>
                <View
                  style={{
                    margin: wp('1%'),
                    flexDirection: 'row',
                  }}>
                  <Font.Normal>{Strings.priceRange}: RM</Font.Normal>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: wp('14%'),
                      height: hp('4%'),
                      marginHorizontal: wp('1%'),
                      justifyContent: 'center',
                      borderRadius: 5,
                      bottom: hp('0.5%'),
                    }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{
                        left: wp('1%'),
                        height: hp('6%'),
                        borderBottomColor: 'black',
                        color: 'black',
                      }}
                      value={lowPrice}
                      onChangeText={item => setLowPrice(item)}></TextInput>
                  </View>
                  <Text style={{top: hp('0.5%')}}>-</Text>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: wp('14%'),
                      height: hp('4%'),
                      marginHorizontal: wp('1%'),
                      justifyContent: 'center',
                      borderRadius: 5,
                      bottom: hp('0.5%'),
                    }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{
                        left: wp('1%'),
                        height: hp('6%'),
                        borderBottomColor: 'black',
                        color: 'black',
                      }}
                      value={highPrice}
                      onChangeText={item => setHighPrice(item)}></TextInput>
                  </View>
                </View>

                <View
                  style={{
                    margin: wp('1%'),
                    flexDirection: 'row',
                  }}>
                  <Font.Normal style={{marginHorizontal: wp('1%')}}>
                    {Strings.available}:
                  </Font.Normal>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: wp('18%'),
                      height: hp('4%'),
                      margin: wp('1%'),
                      justifyContent: 'center',
                      borderRadius: 5,
                      left: wp('2%'),
                      bottom: hp('0.5%'),
                    }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{
                        left: wp('3%'),
                        height: hp('6%'),
                        borderBottomColor: 'black',
                        color: 'black',
                      }}
                      value={available}
                      onChangeText={item => setAvailable(item)}></TextInput>
                  </View>
                  <Text
                    style={{
                      top: hp('0.5%'),
                      left: wp('5%'),
                    }}>
                    {props.siUnit}
                  </Text>
                </View>

                <View
                  style={{
                    margin: wp('1%'),
                    flexDirection: 'row',
                  }}>
                  <Font.Normal style={{marginHorizontal: wp('1%')}}>
                    MOQ:
                  </Font.Normal>
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: wp('18%'),
                      height: hp('4%'),
                      marginHorizontal: wp('1%'),
                      justifyContent: 'center',
                      borderRadius: 5,
                      left: wp('2%'),
                      bottom: hp('0.5%'),
                    }}>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={{
                        left: wp('2%'),
                        height: hp('6%'),
                        borderBottomColor: 'black',
                        color: 'black',
                      }}
                      value={moq}
                      onChangeText={item => setMOQ(item)}></TextInput>
                  </View>
                  <Text
                    style={{
                      top: hp('0.5%'),
                      left: wp('5%'),
                    }}>
                    {props.siUnit}
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: wp('1%'),
                  top: hp('1%'),
                  marginVertical: hp('1%'),
                }}>
                <Font.Large style={{margin: wp('1%')}}>
                  {Strings.productDetails}
                </Font.Large>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('60%'),
                  }}>
                  <Font.NormalBold style={{margin: wp('1%')}}>
                    {Strings.grade}:
                  </Font.NormalBold>
                  <Font.Normal style={{margin: wp('1%')}}>
                    {props.grade}
                  </Font.Normal>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('60%'),
                  }}>
                  <Font.NormalBold style={{margin: wp('1%')}}>
                    {Strings.variety}:
                  </Font.NormalBold>
                  <Font.Normal style={{margin: wp('1%')}}>
                    {props.variety}
                  </Font.Normal>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('60%'),
                  }}>
                  <Font.NormalBold style={{margin: wp('1%')}}>
                    {Strings.priceRange}:
                  </Font.NormalBold>
                  <Font.Normal style={{margin: wp('1%')}}>
                    RM {lowPrice} - {highPrice}
                  </Font.Normal>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('60%'),
                  }}>
                  <Font.NormalBold style={{margin: wp('1%')}}>
                    {Strings.available}:
                  </Font.NormalBold>
                  <Font.Normal style={{margin: wp('1%')}}>
                    {available} {props.siUnit}
                  </Font.Normal>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: wp('60%'),
                  }}>
                  <Font.NormalBold style={{margin: wp('1%')}}>
                    MOQ:
                  </Font.NormalBold>

                  <Font.Normal style={{margin: wp('1%')}}>
                    {moq} {props.siUnit}
                  </Font.Normal>
                </View>
              </View>
            )}
          </View>
          {editMode ? (
            <BlueButton
              onPress={() => {
                if (
                  lowPrice == '' ||
                  highPrice == '' ||
                  available == '' ||
                  moq == ''
                ) {
                  log('empty field');
                  setUnsuccessfulModal(true);
                } else if (
                  lowPrice <= 0 ||
                  highPrice <= 0 ||
                  available <= 0 ||
                  moq <= 0
                ) {
                  setUnsuccessfulModal2(true);
                } else {
                  updateListing();
                }
              }}
              text={Strings.saveChanges}
              top={hp('10%')}
              borderRadius={10}
              font={Typography.normal}
            />
          ) : (
            <View style={{alignItems: 'center'}}>
              <BlueButton
                onPress={() => setEditMode(true)}
                text={Strings.editListing}
                icon="create-outline"
                top={hp('10%')}
                borderRadius={10}
                offsetCenter={wp('5%')}
                font={Typography.normal}
              />
              <BlueButton
                onPress={() => deleteListing()}
                text={Strings.removeListing}
                backgroundColor={Colors.LIGHT_RED}
                icon="remove-circle-outline"
                borderRadius={10}
                offsetCenter={wp('5%')}
                font={Typography.normal}
                top={hp('12%')}
              />
            </View>
          )}
          <Modal
            isVisible={unsuccessfulModal2}
            onBackdropPress={() => setUnsuccessfulModal2(false)}>
            <UnsuccessfulModal text={'Only positive number'} />
          </Modal>
          <Modal
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal text={Strings.pleaseFillIn} />
          </Modal>
          <Modal
            isVisible={successfulModal}
            onBackdropPress={() => [setSuccessfulModal(false)]}>
            <SuccessfulModal text={Strings.successfullyUpdated} />
          </Modal>
          <Modal
            isVisible={successfulModal2}
            onBackdropPress={() => [setSuccessfulModal2(false)]}>
            <SuccessfulModal text={Strings.successfullyDeleted} />
          </Modal>
        </View>
      </KeyboardAwareScrollView>
      <LoadingModal isVisible={loading} />
    </View>
  );
};

const ProductCard = props => {
  const [productModal, setProductModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);

  const getImage = async () => {
    try {
      if (typeof props.productPicture == 'string') {
        log(props.productPicture);
        const imageURL = await Storage.get(props.productPicture);
        setImageSource({
          uri: imageURL,
        });
      } else {
        log('found a bogey');
        setImageSource(props.productPicture);
      }
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
        height: hp('28%'),
        margin: wp('5%'),
        borderRadius: 20,
        elevation: 3,
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: wp('14%'),
          width: wp('14%'),
          borderRadius: 100,
          top: hp('2%'),
        }}
        source={imageSource}></Image>
      <Font.Normal style={{top: hp('3%')}}>{props.productName}</Font.Normal>
      <Font.Small style={{top: hp('3%'), width: wp('30%')}}>
        {Strings.price}: {props.lowPrice} - {props.highPrice}
        {'\n'}MOQ: {props.minimumQuantity}
        {'\n'}
        {Strings.grade}: {props.grade}
        {'\n'}
        {Strings.variety}: {props.variety}
      </Font.Small>
      <Modal isVisible={productModal}>
        <ProductModal
          setProductModal={setProductModal}
          setProducts={props.setProducts}
          productList={props.productList}
          productName={props.productName}
          variety={props.variety}
          quantityAvailable={props.quantityAvailable}
          productPicture={imageSource}
          lowPrice={props.lowPrice}
          highPrice={props.highPrice}
          minimumQuantity={props.minimumQuantity}
          siUnit={props.siUnit}
          grade={props.grade}
          setTrigger={props.setTrigger}
          trigger={props.trigger}
          id={props.id}></ProductModal>
      </Modal>
    </TouchableOpacity>
  );
};

const SupplierplaceList = props => {
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={props.productList}
      //extraData={props.trigger}
      numColumns={2}
      ListEmptyComponent={
        <View
          style={{
            top: hp('8%'),
            width: wp('80%'),
            height: hp('25%'),
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: Colors.LIGHT_BLUE,
          }}>
          <Font.Large
            style={{
              textAlign: 'center',
              width: wp('70%'),
            }}>
            {Strings.youHaveZeroItems}
          </Font.Large>
        </View>
      }
      renderItem={({item}) => {
        return (
          <ProductCard
            setProducts={props.setProducts}
            productList={props.productList}
            productName={item.productName}
            variety={item.variety}
            quantityAvailable={item.quantityAvailable}
            productPicture={item.productPicture}
            lowPrice={item.lowPrice}
            highPrice={item.highPrice}
            minimumQuantity={item.minimumQuantity}
            siUnit={item.siUnit}
            grade={item.grade}
            id={item.id}
            setTrigger={props.setTrigger}
            trigger={props.trigger}
          />
        );
      }}
    />
  );
};

const Input = props => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={
        focus == true
          ? {
              backgroundColor: 'white',
              width: props.boxWidth,
              borderColor: Colors.GRAY_DARK,
              borderWidth: wp('0.2%'),
              height: props.boxHeight,
              justifyContent: 'center',
              top: hp('3%'),
              borderRadius: 3,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 7,
            }
          : {
              backgroundColor: 'white',
              width: props.boxWidth,
              borderColor: Colors.GRAY_DARK,
              borderWidth: wp('0.2%'),
              height: props.boxHeight,
              justifyContent: 'center',
              top: hp('3%'),
              borderRadius: 3,
            }
      }>
      <TextInput
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        keyboardType={props.keyboardType}
        placeholderTextColor={Colors.GRAY_DARK}
        placeholder={props.placeholder}
        underlineColorAndroid="transparent"
        value={props.state}
        onChangeText={item => props.setState(item)}
        style={{
          left: wp('1%'),
          width: props.width,
          height: hp('7%'),
          justifyContent: 'center',
          borderBottomColor: 'transparent',
          color: 'black',
        }}></TextInput>
    </View>
  );
};

export default SupplierplaceList;
