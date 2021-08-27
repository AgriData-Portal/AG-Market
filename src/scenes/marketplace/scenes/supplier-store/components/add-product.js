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
  SuccessNavigateChatModal,
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  deleteSupplierListing,
  updateSupplierListing,
  createSupplierListing,
  updateChatGroup,
  createChatGroup,
  createMessage,
  createFarmerListing,
} from '../../../../../graphql/mutations';
import {API, Storage} from 'aws-amplify';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {listRetailerCompanys} from '../../../../../graphql/queries';
import {BlueButton} from '_components';
import {listSupplierCompanys} from '../../../../../graphql/queries';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {log} from '_utils';
import {DetailsModal} from '_components';
import {companyStore} from '_store';
import {Font} from '_components';

const AddItemModal = props => {
  const companyID = companyStore(state => state.companyID);
  const companyName = companyStore(state => state.companyName);
  const companyType = companyStore(state => state.companyType);
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
  const [unsuccessfulModal2, setUnsuccessfulModal2] = useState(false);

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

      if (companyType == 'supplier') {
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
          query: createSupplierListing,
          variables: {input: listing},
        });

        listing.productPicture = {uri: photo.uri};

        props.setProducts(products => [
          productListing.data.createSupplierListing,
          ...products,
        ]);
      } else {
        var listing = {
          farmerID: companyID,
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
      }
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
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}
      extraHeight={hp('20%')}>
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
                <Font.Large style={{width: wp('50%'), textAlign: 'center'}}>
                  {Strings.addPhoto}
                </Font.Large>
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
          <Font.Large
            style={{
              left: wp('6%'),
              top: hp('1.5%'),
              width: wp('70%'),
            }}>
            {Strings.enterProductDetails}
          </Font.Large>
          <View
            style={{
              left: wp('5%'),
              top: hp('2%'),
            }}>
            <View style={{bottom: hp('3%')}}>
              <Input
                keyboardType="default"
                placeholder={Strings.productName}
                state={productName}
                setState={setProductName}
                width={wp('69%')}
                height={hp('7%')}
                boxWidth={wp('69%')}
                boxHeight={hp('6%')}></Input>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                bottom: hp('2%'),
              }}>
              <Font.Large style={{top: hp('3%')}}>RM</Font.Large>
              <View style={{left: wp('3%')}}>
                <Input
                  keyboardType="numeric"
                  placeholder={Strings.minPrice}
                  state={minPrice}
                  setState={setMinPrice}
                  width={wp('25%')}
                  height={hp('7%')}
                  boxWidth={wp('26%')}
                  boxHeight={hp('6%')}></Input>
              </View>
              <View
                style={{
                  width: wp('3%'),
                  borderWidth: wp('0.5%'),
                  borderColor: Colors.GRAY_DARK,
                  top: hp('3%'),
                  left: wp('5%'),
                }}></View>
              <View style={{left: wp('7%')}}>
                <Input
                  keyboardType="numeric"
                  placeholder={Strings.maxPrice}
                  state={maxPrice}
                  setState={setMaxPrice}
                  width={wp('25%')}
                  height={hp('7%')}
                  boxWidth={wp('26%')}
                  boxHeight={hp('6%')}></Input>
              </View>
            </View>
            <View style={{flexDirection: 'row', bottom: hp('1%')}}>
              <Input
                keyboardType="default"
                placeholder={Strings.grade}
                state={grade}
                setState={setGrade}
                width={wp('22%')}
                height={hp('6%')}
                boxWidth={wp('23%')}
                boxHeight={hp('6%')}></Input>
              <View style={{left: wp('5%')}}>
                <Input
                  keyboardType="default"
                  placeholder={Strings.variety}
                  state={variety}
                  setState={setVariety}
                  width={wp('40%')}
                  height={hp('7%')}
                  boxWidth={wp('41%')}
                  boxHeight={hp('6%')}></Input>
              </View>
            </View>
            <Input
              keyboardType="numeric"
              placeholder={Strings.quantityAvailable}
              state={quantityAvailable}
              setState={setQuantityAvailable}
              width={wp('35%')}
              height={hp('7%')}
              boxWidth={wp('36%')}
              boxHeight={hp('6%')}></Input>
            <View style={{flexDirection: 'row', top: hp('1%')}}>
              <Input
                keyboardType="numeric"
                placeholder={Strings.minimumOrder}
                state={moq}
                setState={setMOQ}
                width={wp('35%')}
                height={hp('7%')}
                boxWidth={wp('36%')}
                boxHeight={hp('6%')}></Input>
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
            } else if (
              minPrice <= 0 ||
              maxPrice <= 0 ||
              quantityAvailable <= 0 ||
              moq <= 0
            ) {
              setUnsuccessfulModal2(true);
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
      <Modal
        isVisible={unsuccessfulModal2}
        onBackdropPress={() => setUnsuccessfulModal2(false)}>
        <UnsuccessfulModal text={'Only positive numbers are allowed'} />
      </Modal>
    </KeyboardAwareScrollView>
  );
};

const AddItemsButton = props => {
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

export default AddItemsButton;
