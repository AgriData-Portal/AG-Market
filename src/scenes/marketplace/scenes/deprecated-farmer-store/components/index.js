import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  CloseButton,
  AddButton,
  SuccessfulModal,
  UnsuccessfulModal,
  LoadingModal,
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {ChatButton} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  deleteFarmerListing,
  updateFarmerListing,
  createFarmerListing,
  updateChatGroup,
  createChatGroup,
  createMessage,
} from '../../../../../graphql/mutations';
import {API, Storage} from 'aws-amplify';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {listSupplierCompanys} from '../../../../../graphql/queries';
import {BlueButton} from '_components';
import {log} from '_utils';
import {userStore} from '_store';

const AddItemModal = props => {
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState('kg');
  const [items2, setItems2] = useState([
    {label: 'kg', value: 'kg'},
    {label: 'units', value: 'units'},
  ]);
  const [imageSource, setImageSource] = useState(null);
  const [productName, setProductName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [moq, setMOQ] = useState('');
  const [quantityAvailable, setQuantityAvailable] = useState('');
  const [variety, setVariety] = useState('');
  const [grade, setGrade] = useState('');
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [focus, setFocus] = useState('');
  const [addProductButton, setAddProductButton] = useState(false);
  const companyName = userStore(state => state.companyName);
  const companyID = userStore(state => state.companyID);

  async function addListing() {
    try {
      let photo = imageSource;
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      log('FileName: \n');
      photo.fileName = productName + '_' + variety + '_' + companyName;
      await Storage.put(photo.fileName, blob, {
        contentType: 'image/jpeg',
      });

      var listing = {
        supplierID: companyID,
        productName: productName.toUpperCase(),
        variety: variety,
        quantityAvailable: parseInt(quantityAvailable),
        lowPrice: parseFloat(minPrice),
        highPrice: parseFloat(maxPrice),
        minimumQuantity: parseInt(moq),
        productPicture: photo.fileName,
        grade: grade,
        siUnit: value2,
      };
      const productListing = await API.graphql({
        query: createFarmerListing,
        variables: {input: listing},
      });

      listing.productPicture = {uri: photo.uri};

      props.setProducts(products => [
        productListing.data.createFarmerListing,
        ...products,
      ]);
      log('Added product');
      setSuccessfulModal(true);
    } catch (e) {
      log(e);
    }
    setAddProductButton(false);
  }

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 256,
      maxHeight: 256,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        log('User cancelled photo picker');
      } else if (response.error) {
        log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        log('User tapped custom button: ', response.customButton);
      } else {
        let photo = {uri: response.uri};
        setImageSource(response.assets[0]);
      }
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('0%') : -180
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <View
        style={{
          height: hp('90%'),
          width: wp('90%'),
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: 10,
        }}>
        <View
          style={{
            position: 'absolute',
            right: wp('1%'),
            top: hp('1%'),
          }}>
          <CloseButton setModal={props.setAddItemsButton} />
        </View>

        <View
          style={{
            top: hp('4%'),
            alignItems: 'center',
            width: wp('90%'),
          }}>
          <View
            style={{
              borderWidth: 1,
              width: wp('35%'),
              height: wp('35%'),
              borderRadius: 100,
              borderStyle: 'dashed',
            }}>
            {imageSource === null ? (
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => {
                    selectImage();
                  }}
                  style={{left: wp('1%'), bottom: hp('1%')}}>
                  <Icon name="add-outline" size={wp('35%')} />
                </TouchableOpacity>
                <Text
                  style={[
                    Typography.large,
                    {width: wp('50%'), textAlign: 'center'},
                  ]}>
                  {Strings.addPhoto}
                </Text>
              </View>
            ) : (
              <View>
                <Image
                  source={{uri: imageSource.uri}}
                  style={{
                    resizeMode: 'cover',
                    width: wp('35%'),
                    height: wp('35%'),
                    borderRadius: 100,
                  }}
                />
                <TouchableOpacity
                  onPress={() => {
                    selectImage();
                  }}
                  style={{
                    borderRadius: 100,
                    height: hp('5%'),
                    width: wp('10%'),
                    backgroundColor: Colors.LIGHT_BLUE,
                    bottom: hp('4%'),
                    left: wp('25%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: {
                      width: 1,
                      height: 1,
                    },
                    shadowOpacity: 2,
                    shadowRadius: 3,
                    shadowColor: 'grey',
                  }}>
                  <Icon type="ionicon" name="pencil" size={25} />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/*<View>
            <Text
            style={
              ([Typography.small],
              {
                color: Colors.GRAY_DARK,
                top: Mixins.scaleHeight(130),
                left: Mixins.scaleWidth(45),
              })
            }>
            You can only add up to 8 images
          </Text>
          </View>*/}
        </View>
        <View
          style={{
            top: hp('12%'),
            backgroundColor: Colors.GRAY,
            height: hp('45%'),
            width: wp('80%'),
            borderRadius: 15,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 5,
            shadowRadius: 3,
            shadowColor: 'grey',
          }}>
          <Text
            style={[
              Typography.large,
              {
                left: wp('6%'),
                top: hp('1.5%'),
                width: wp('50%'),
              },
            ]}>
            {Strings.enterProductDetails}
          </Text>
          <DismissKeyboardView>
            <View
              style={{
                left: wp('5%'),
                top: hp('2%'),
              }}>
              <View
                style={
                  focus == '1'
                    ? {
                        backgroundColor: 'white',
                        width: wp('69%'),
                        borderColor: Colors.GRAY_DARK,
                        borderWidth: wp('0.2%'),
                        height: hp('6%'),
                        justifyContent: 'center',
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
                        width: wp('69%'),
                        borderColor: Colors.GRAY_DARK,
                        borderWidth: wp('0.2%'),
                        height: hp('6%'),
                        justifyContent: 'center',
                        borderRadius: 3,
                      }
                }>
                <TextInput
                  onFocus={() => setFocus('1')}
                  onBlur={() => setFocus('')}
                  keyboardType="default"
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.productName}
                  value={productName}
                  onChangeText={item => setProductName(item)}
                  underlineColorAndroid="transparent"
                  style={{
                    left: wp('1%'),
                    width: wp('60%'),
                    height: hp('7%'),

                    justifyContent: 'center',
                    borderBottomColor: 'transparent',
                    color: 'black',
                  }}></TextInput>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  top: hp('1%'),
                }}>
                <Text
                  style={[
                    Typography.large,
                    {marginRight: wp('1%'), left: wp('1%')},
                  ]}>
                  RM
                </Text>
                <View
                  style={
                    focus == '2'
                      ? {
                          backgroundColor: 'white',
                          width: wp('23%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          borderRadius: 3,
                          left: wp('2%'),
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
                          width: wp('23%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          borderRadius: 3,
                          left: wp('2%'),
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('2')}
                    onBlur={() => setFocus('')}
                    keyboardType="numeric"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.minPrice}
                    underlineColorAndroid="transparent"
                    value={minPrice}
                    onChangeText={item => setMinPrice(item)}
                    style={{
                      left: wp('3%'),
                      width: wp('22%'),
                      height: hp('7%'),
                      borderRadius: 3,
                      justifyContent: 'center',

                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
                <View
                  style={{
                    width: wp('3%'),
                    borderWidth: wp('0.2%'),
                    borderColor: Colors.GRAY_DARK,
                    left: wp('6%'),
                    zIndex: 10,
                  }}></View>
                <View
                  style={
                    focus == '3'
                      ? {
                          backgroundColor: 'white',
                          width: wp('23%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          left: wp('9%'),
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
                          width: wp('23%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          left: wp('9%'),
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('3')}
                    onBlur={() => setFocus('')}
                    keyboardType="numeric"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.maxPrice}
                    underlineColorAndroid="transparent"
                    value={maxPrice}
                    onChangeText={item => setMaxPrice(item)}
                    style={{
                      width: wp('22%'),
                      height: hp('7%'),
                      left: wp('3%'),
                      justifyContent: 'center',

                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
              </View>
              <View style={{flexDirection: 'row', top: hp('1%')}}>
                <View
                  style={
                    focus == '4'
                      ? {
                          backgroundColor: 'white',
                          width: wp('21%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          top: hp('1%'),
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
                          width: wp('21%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          top: hp('1%'),
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('4')}
                    onBlur={() => setFocus('')}
                    keyboardType="default"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder="Grade"
                    underlineColorAndroid="transparent"
                    value={grade}
                    onChangeText={item => setGrade(item)}
                    style={{
                      width: wp('20%'),
                      height: hp('7%'),
                      borderRadius: 3,
                      justifyContent: 'center',

                      left: wp('1%'),
                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
                <View
                  style={
                    focus == '5'
                      ? {
                          backgroundColor: 'white',
                          width: wp('41%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          left: wp('7%'),
                          top: hp('1%'),
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
                          width: wp('41%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          left: wp('7%'),
                          top: hp('1%'),
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('5')}
                    onBlur={() => setFocus('')}
                    keyboardType="default"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.variety}
                    underlineColorAndroid="transparent"
                    value={variety}
                    onChangeText={item => setVariety(item)}
                    style={{
                      left: wp('1%'),
                      width: wp('40%'),
                      height: hp('7%'),
                      borderRadius: 3,
                      justifyContent: 'center',
                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  top: hp('1%'),
                }}>
                <View
                  style={
                    focus == '6'
                      ? {
                          backgroundColor: 'white',
                          width: wp('36%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          top: hp('2%'),
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
                          width: wp('36%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          top: hp('2%'),
                          borderRadius: 3,
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('6')}
                    onBlur={() => setFocus('')}
                    keyboardType="numeric"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.quantityAvailable}
                    underlineColorAndroid="transparent"
                    value={quantityAvailable}
                    onChangeText={item => setQuantityAvailable(item)}
                    style={{
                      left: wp('1%'),
                      width: wp('35%'),
                      height: hp('7%'),

                      justifyContent: 'center',
                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
              </View>
              <View style={{flexDirection: 'row', top: hp('1%')}}>
                <View
                  style={
                    focus == '7'
                      ? {
                          backgroundColor: 'white',
                          width: wp('36%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
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
                          width: wp('36%'),
                          borderColor: Colors.GRAY_DARK,
                          borderWidth: wp('0.2%'),
                          height: hp('6%'),
                          justifyContent: 'center',
                          top: hp('3%'),
                          borderRadius: 3,
                        }
                  }>
                  <TextInput
                    onFocus={() => setFocus('7')}
                    onBlur={() => setFocus('')}
                    keyboardType="numeric"
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.minimumOrder}
                    underlineColorAndroid="transparent"
                    value={moq}
                    onChangeText={item => setMOQ(item)}
                    style={{
                      left: wp('1%'),
                      width: wp('35%'),
                      height: hp('7%'),
                      justifyContent: 'center',
                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                </View>
                <View style={{marginLeft: wp('3%'), top: hp('0.5%')}}>
                  <DropDownPicker
                    open={open2}
                    value={value2}
                    items={items2}
                    setOpen={setOpen2}
                    setValue={setValue2}
                    setItems={setItems2}
                    defaultValue="kg"
                    style={{
                      width: wp('26%'),
                      height: hp('5%'),
                      borderRadius: 3,
                      borderColor: 'white',
                    }}
                    dropDownContainerStyle={{borderWidth: 0}}
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder="kg"
                  />
                </View>
              </View>
            </View>
          </DismissKeyboardView>
        </View>
        <BlueButton
          onPress={() => {
            if (
              imageSource == null ||
              productName == '' ||
              minPrice == '' ||
              maxPrice == '' ||
              grade == '' ||
              variety == '' ||
              quantityAvailable == '' ||
              moq == ''
            ) {
              log('empty field');
              setUnsuccessfulModal(true);
            } else {
              try {
                addListing();
              } catch {
                e => log('error ' + e);
              }
            }
          }}
          onPressIn={() => setAddProductButton(true)}
          disabled={addProductButton}
          text={Strings.addProduct}
          icon={'add-circle-outline'}
          offsetCenter={wp('5%')}
          font={Typography.normal}
          borderRadius={10}
          paddingVertical={hp('1.5%')}
          top={hp('17%')}
        />
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => [
          setSuccessfulModal(false),
          props.setAddItemsButton(false),
        ]}>
        <SuccessfulModal text={Strings.successfullyAddedCrops} />
      </Modal>
      <Modal
        isVisible={unsuccessfulModal}
        onBackdropPress={() => setUnsuccessfulModal(false)}>
        <UnsuccessfulModal text={Strings.pleaseFillIn} />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export const AddItemsButton = props => {
  const [addItemsButton, setAddItemsButton] = useState(false);
  return (
    <View>
      <BlueButton
        onPress={() => setAddItemsButton(true)}
        text={Strings.addItems}
        backgroundColor="grey"
        font={Typography.normal}
        borderRadius={10}
        paddingVertical={hp('1.5%')}
      />

      <Modal isVisible={addItemsButton}>
        <AddItemModal
          setAddItemsButton={setAddItemsButton}
          productList={props.productList}
          setProducts={props.setProducts}></AddItemModal>
      </Modal>
    </View>
  );
};

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

  const deleteListing = async () => {
    try {
      setLoading(true);
      const deletedListing = await API.graphql({
        query: deleteFarmerListing,
        variables: {input: {id: props.id}},
      });
      var products = props.productList;
      log(products.length);
      for (let [i, product] of products.entries()) {
        if (product.id == props.id) {
          products.splice(i, 1);
        }
      }
      log(products.length);
      log(deletedListing);
      props.setProducts(products);
      if (props.trigger) {
        props.setTrigger(false);
      } else {
        props.setTrigger(true);
      }
      log('test');
      setSuccessfulModal2(true);
      setLoading(false);
    } catch (e) {
      log(e);
    }
  };
  const updateListing = async () => {
    try {
      const updatedListing = await API.graphql({
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
      var products = props.productList;
      log(products);
      for (let [i, product] of products.entries()) {
        if (product.id == props.id) {
          products.splice(i, 1);
        }
      }

      var item = {
        id: props.id,
        lowPrice: parseFloat(lowPrice),
        highPrice: parseFloat(highPrice),
        quantityAvailable: parseInt(available),
        minimumQuantity: parseInt(moq),
        productName: props.productName,
        grade: props.grade,
        variety: props.variety,
        productPicture: props.productPicture,
        siUnit: props.siUnit,
      };
      products.push(item);
      log(products);
      props.setProducts(products);
      if (props.trigger) {
        props.setTrigger(false);
      } else {
        props.setTrigger(true);
      }
      setSuccessfulModal(true);
    } catch (e) {
      log(e);
    }
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? hp('-8%') : hp('-8%')
        } /* Keyboard Offset needs to be tested against multiple phones */
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
            <Text style={[Typography.welcome]}>{props.productName}</Text>
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
              height: hp('33%'),
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
            }}>
            {editMode ? (
              <View
                style={{
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  margin: wp('0.5%'),
                }}>
                <Text style={[Typography.large, {margin: wp('0.5%')}]}>
                  {Strings.editProductDetails}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.grade}: {props.grade}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.variety}: {props.variety}
                </Text>
                <View
                  style={{
                    margin: wp('1%'),
                    flexDirection: 'row',
                  }}>
                  <Text style={[Typography.normal]}>
                    {Strings.priceRange}: RM
                  </Text>
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
                  <Text
                    style={[Typography.normal, {marginHorizontal: wp('1%')}]}>
                    {Strings.available}:
                  </Text>
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
                  <Text
                    style={[Typography.normal, {marginHorizontal: wp('1%')}]}>
                    MOQ:
                  </Text>
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
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  margin: wp('1%'),
                  top: hp('1%'),
                }}>
                <Text style={[Typography.large, {margin: wp('0.5%')}]}>
                  {Strings.productDetails}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.grade}: {props.grade}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.variety}: {props.variety}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.priceRange}: RM {lowPrice} - {highPrice}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  {Strings.available}: {available} {props.siUnit}
                </Text>
                <Text style={[Typography.normal, {margin: wp('0.5%')}]}>
                  MOQ: {moq} {props.siUnit}
                </Text>
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
                } else {
                  try {
                    updateListing();
                    setEditMode(false);
                  } catch {
                    e => log('error ' + e);
                  }
                }
              }}
              text={Strings.saveChanges}
              top={hp('15%')}
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
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal text={Strings.pleaseFillIn} />
          </Modal>
          <Modal
            isVisible={successfulModal}
            onBackdropPress={() => [
              setSuccessfulModal(false),
              setEditMode(false),
              props.setProductModal(false),
            ]}>
            <SuccessfulModal text={Strings.successfullyUpdated} />
          </Modal>
          <Modal
            isVisible={successfulModal2}
            onBackdropPress={() => [
              setSuccessfulModal2(false),
              setEditMode(false),
              props.setProductModal(false),
            ]}>
            <SuccessfulModal text={Strings.successfullyDeleted} />
          </Modal>
        </View>
      </KeyboardAvoidingView>
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
      <Text style={[Typography.normal, {top: hp('3%')}]}>
        {props.productName}
      </Text>
      <Text style={[Typography.small, {top: hp('3%'), width: wp('30%')}]}>
        {Strings.price}: {props.lowPrice} - {props.highPrice}
        {'\n'}MOQ: {props.minimumQuantity}
        {'\n'}
        {Strings.grade}: {props.grade}
        {'\n'}
        {Strings.variety}: {props.variety}
      </Text>
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

export const SupplierplaceList = props => {
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
          <Text
            style={[
              Typography.large,
              {
                textAlign: 'center',
                width: wp('70%'),
              },
            ]}>
            {Strings.youHaveZeroItems}
          </Text>
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

export const RetailerList = props => {
  return (
    <FlatList
      data={props.supplier}
      renderItem={({item}) => {
        return (
          <RetailerCard
            name={item.name}
            id={item.id}
            user={user}></RetailerCard>
        );
      }}
    />
  );
};

const RetailerCard = props => {
  const companyID = userStore(state => state.companyID);
  const userName = userStore(state => state.userName);
  const userID = userStore(state => state.userID);
  const companyName = userStore(state => state.companyName);
  const sendStoreDetails = async () => {
    try {
      log(props.id + companyID);
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.id + companyID,
            mostRecentMessage: 'Store Catalog',
            mostRecentMessageSender: userName,
          },
        },
      });
      log('chat group already exist');
    } catch (e) {
      log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const chatGroup = {
            id: props.id + companyID,
            name: props.name + '+' + companyName,
            supplierID: props.id,
            farmerID: companyID,
            mostRecentMessage: 'Store Catalog',
            mostRecentMessageSender: userName,
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

    log('creating store ' + companyID);

    const store = {
      chatGroupID: props.id + companyID,
      type: 'store',
      content: companyID + '+' + companyName,
      sender: userName,
      senderID: userID,
    };
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: store},
      });
      log(message.data.createMessage);
      //setSuccessfulModal(true);
    } catch {
      e => log(e);
    }
  };
  return (
    <TouchableOpacity
      onPress={() => {
        sendStoreDetails();
      }}
      style={{
        marginBottom: hp('2%'),
        width: wp('80%'),
        alignSelf: 'center',
        height: hp('8%'),
        borderColor: Colors.GRAY_DARK,
        borderWidth: 0.2,

        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={require('_assets/images/supermarket.png')}
          style={{
            width: wp('20%'),
            height: hp('6%'),
            resizeMode: 'contain',
            left: wp('5%'),
          }}
        />
        <View style={{left: wp('10%'), justifyContent: 'center'}}>
          <Text style={[Typography.normal]}>{props.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const SupplierModalButton = props => {
  const [retailerModal, setRetailerModal] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setRetailerModal(true)}
        style={{right: wp('5%')}}>
        <Icon name="share-social-outline" size={wp('6%')} />
      </TouchableOpacity>
      <Modal
        isVisible={retailerModal}
        onBackdropPress={() => setRetailerModal(false)}>
        <RetailerModal setRetailerModal={setRetailerModal} />
      </Modal>
    </View>
  );
};

const RetailerModal = props => {
  const [supplier, setSupplier] = useState([]);
  const getAllSupplier = async () => {
    try {
      const listSupplier = await API.graphql({
        query: listSupplierCompanys,
      });

      setSupplier(listSupplier.data.listSupplierCompanys.items);
    } catch (e) {
      log(e);
    }
  };

  useEffect(() => {
    getAllSupplier();
  }, []);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: wp('90%'),
        height: hp('80%'),
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{alignItems: 'center', justifyContent: 'center', top: hp('2%')}}>
        <Text style={[Typography.large]}>Suppliers</Text>
      </View>
      <View style={{height: hp('60%'), top: hp('3%')}}>
        <RetailerList supplier={supplier} />
      </View>
    </View>
  );
};
