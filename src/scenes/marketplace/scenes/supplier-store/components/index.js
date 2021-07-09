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
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {ChatButton} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  deleteProductListing,
  updateProductListing,
  createProductListing,
} from '../../../../../graphql/mutations';
import {API, Storage} from 'aws-amplify';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const ProductPopUp = props => {
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

  async function addListing() {
    try {
      let photo = imageSource;
      const response = await fetch(photo.uri);
      const blob = await response.blob();
      console.log('FileName: \n');
      photo.fileName =
        productName + '_' + variety + '_' + props.user.supplierCompany.name;
      await Storage.put(photo.fileName, blob, {
        contentType: 'image/jpeg',
      });
      console.log('image passed');

      var listing = {
        supplierID: props.user.supplierCompanyID,
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
        query: createProductListing,
        variables: {input: listing},
      });

      listing.productPicture = photo.uri;

      var products = props.productList;
      products.push(listing);
      props.setProducts(products);
      console.log('Added product');
      setSuccessfulModal(true);
    } catch (e) {
      console.log(e);
    }
  }

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 256,
      maxHeight: 256,
    };

    launchImageLibrary(options, response => {
      console.log({response});

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let photo = {uri: response.uri};
        console.log(response.assets);
        console.log(response.assets[0].uri);
        setImageSource(response.assets[0]);
      }
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? 100 : -180
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
                    {width: wp('40%'), textAlign: 'center'},
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
            style={([Typography.normal], {left: wp('6%'), top: hp('1.5%')})}>
            {Strings.enterProductDetails}
          </Text>
          <View
            style={{
              left: wp('5%'),
              top: hp('2%'),
            }}>
            <TextInput
              keyboardType="default"
              placeholderTextColor={Colors.GRAY_DARK}
              placeholder={Strings.productName}
              value={productName}
              onChangeText={item => setProductName(item)}
              underlineColorAndroid="transparent"
              style={{
                left: wp('1%'),
                backgroundColor: 'white',
                width: wp('65%'),
                height: hp('7%'),
                borderRadius: 3,
                justifyContent: 'center',
                marginBottom: hp('1%'),
                marginTop: hp('0.5%'),
                borderBottomColor: 'transparent',
                color: 'black',
              }}></TextInput>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={[
                  Typography.large,
                  {bottom: hp('0.5%'), marginRight: wp('1%'), left: wp('1%')},
                ]}>
                RM
              </Text>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.minPrice}
                underlineColorAndroid="transparent"
                value={minPrice}
                onChangeText={item => setMinPrice(item)}
                style={{
                  left: wp('3%'),
                  backgroundColor: 'white',
                  width: wp('22.3%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  width: wp('3%'),
                  borderWidth: wp('0.2%'),
                  borderColor: 'black',
                  bottom: hp('1%'),
                  left: wp('7%'),
                  zIndex: 10,
                }}></View>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.maxPrice}
                underlineColorAndroid="transparent"
                value={maxPrice}
                onChangeText={item => setMaxPrice(item)}
                style={{
                  left: wp('11%'),
                  backgroundColor: 'white',
                  width: wp('22.3%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="default"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder="Grade"
                underlineColorAndroid="transparent"
                value={grade}
                onChangeText={item => setGrade(item)}
                style={{
                  backgroundColor: 'white',
                  width: wp('20%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                  left: wp('1%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
              <TextInput
                keyboardType="default"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.variety}
                underlineColorAndroid="transparent"
                value={variety}
                onChangeText={item => setVariety(item)}
                style={{
                  left: wp('7%'),
                  backgroundColor: 'white',
                  width: wp('40%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),

                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.quantityAvailable}
                underlineColorAndroid="transparent"
                value={quantityAvailable}
                onChangeText={item => setQuantityAvailable(item)}
                style={{
                  left: wp('1%'),
                  backgroundColor: 'white',
                  width: wp('35%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
            </View>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="numeric"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.minimumOrder}
                underlineColorAndroid="transparent"
                value={moq}
                onChangeText={item => setMOQ(item)}
                style={{
                  left: wp('1%'),
                  backgroundColor: 'white',
                  width: wp('35%'),
                  height: hp('7%'),
                  borderRadius: 3,
                  justifyContent: 'center',
                  marginBottom: hp('1%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                }}></TextInput>
              <View style={{marginLeft: wp('3%'), bottom: hp('3%')}}>
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
        <TouchableOpacity
          onPress={() => addListing()}
          style={{
            height: hp('5%'),
            height: hp('7%'),
            width: wp('37%'),
            backgroundColor: Colors.LIGHT_BLUE,
            borderRadius: 10,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 5,
            shadowRadius: 3,
            shadowColor: 'grey',
            justifyContent: 'center',
            alignItems: 'center',
            top: hp('15%'),
            flexDirection: 'row',
          }}>
          <Text style={[Typography.normal]}>
            {Strings.addProduct}
            {'\t'}
          </Text>
          <Icon name="add-circle-outline" size={wp('5%')} />
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => setSuccessfulModal(false)}>
        <SuccessfulModal />
      </Modal>
    </KeyboardAvoidingView>
  );
};

export const AddItemsButton = props => {
  const [addItemsButton, setAddItemsButton] = useState(false);
  return (
    <TouchableOpacity
      style={{
        height: hp('8%'),
        width: wp('30%'),
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      }}
      onPress={() => setAddItemsButton(true)}>
      <Text style={[Typography.large, {textAlign: 'center'}]}>
        {Strings.addItems}
      </Text>
      <Modal isVisible={addItemsButton}>
        <ProductPopUp
          setAddItemsButton={setAddItemsButton}
          user={props.user}
          productList={props.productList}
          setProducts={props.setProducts}></ProductPopUp>
      </Modal>
    </TouchableOpacity>
  );
};

export const ProductModal = props => {
  const [lowPrice, setLowPrice] = useState(props.lowPrice.toString());
  const [highPrice, setHighPrice] = useState(props.highPrice.toString());
  const [available, setAvailable] = useState(
    props.quantityAvailable.toString(),
  );
  const [moq, setMOQ] = useState(props.minimumQuantity.toString());
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);

  const deleteListing = async () => {
    const deletedListing = await API.graphql({
      query: deleteProductListing,
      variables: {input: {id: props.id}},
    });
    var products = props.productList;
    console.log(products.length);
    for (let [i, product] of products.entries()) {
      if (product.id == props.id) {
        products.splice(i, 1);
      }
    }
    console.log(products.length);
    console.log(deletedListing);
    props.setProducts(products);
  };
  const updateListing = async () => {
    console.log(props);
    const updatedListing = await API.graphql({
      query: updateProductListing,
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
    console.log(products);
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
      grade: props.grade,
      variety: props.variety,
      productPicture: props.productPicture,
      siUnit: props.siUnit,
    };
    products.push(item);
    console.log(products);
    props.setProducts(products);
    setSuccessfulModal(true);
  };

  return (
    <View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'position'}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? Mixins.scaleHeight(-230) : -180
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
                height: hp('30%'),
              }}
            />
          </View>
          <View
            style={{
              top: hp('5%'),
              backgroundColor: Colors.GRAY_LIGHT,
              borderRadius: 15,
              width: wp('80%'),
              height: hp('30%'),
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
                  margin: wp('1%'),
                }}>
                <Text style={[Typography.large, {margin: wp('1%')}]}>
                  Edit Product Details
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Grade: {props.grade}
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Variety: {props.variety}
                </Text>
                <View
                  style={{
                    margin: wp('1%'),
                    flexDirection: 'row',
                  }}>
                  <Text style={[Typography.normal]}>Price Range: RM</Text>
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
                  <Text style={{top: hp('1%')}}>-</Text>
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
                    Available:
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
                    MOQ
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
                }}>
                <Text style={[Typography.large, {margin: wp('1%')}]}>
                  Product Details
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Grade: {props.grade}
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Variety: {props.variety}
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Price Range: RM {lowPrice} - {highPrice}
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  Available: {available} {props.siUnit}
                </Text>
                <Text style={[Typography.normal, {margin: wp('1%')}]}>
                  MOQ: {moq} {props.siUnit}
                </Text>
              </View>
            )}
          </View>
          {editMode ? (
            <TouchableOpacity
              onPress={() => updateListing()}
              style={{
                backgroundColor: Colors.LIGHT_BLUE,
                width: wp('45%'),
                height: hp('5%'),
                borderRadius: 10,
                top: hp('9%'),
                zIndex: 0,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,
                elevation: 4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={[Typography.normal]}>Save Changes</Text>
            </TouchableOpacity>
          ) : (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setEditMode(true)}
                style={{
                  backgroundColor: Colors.LIGHT_BLUE,
                  width: wp('45%'),
                  height: hp('5%'),
                  borderRadius: 10,
                  top: hp('9%'),
                  zIndex: 0,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,

                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[Typography.normal]}>Edit Listing</Text>
                <Icon
                  name="create-outline"
                  size={wp('5%')}
                  style={{left: wp('3%')}}></Icon>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteListing()}
                style={{
                  backgroundColor: Colors.LIGHT_RED,
                  width: wp('60%'),
                  height: hp('5%'),
                  borderRadius: 10,
                  top: hp('10%'),
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,

                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={[Typography.normal]}>Remove Listing</Text>
                <Icon
                  name="remove-circle-outline"
                  size={wp('5%')}
                  style={{left: wp('3%')}}></Icon>
              </TouchableOpacity>
            </View>
          )}
          <Modal
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal setUnsuccessfulModal={setUnsuccessfulModal} />
          </Modal>
          <Modal
            isVisible={successfulModal}
            onBackdropPress={() => [
              setSuccessfulModal(false),
              setEditMode(false),
            ]}>
            <SuccessfulModal setSuccessfulModal={setSuccessfulModal} />
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const ProductCard = props => {
  const [productModal, setProductModal] = useState(false);
  const [imageSource, setImageSource] = useState(null);
  const getImage = async () => {
    try {
      if (typeof props.productPicture == 'string') {
        console.log(props.productPicture);
        const imageURL = await Storage.get(props.productPicture);
        setImageSource({
          uri: imageURL,
        });
        console.log(imageSource);
      } else {
        setImageSource({uri: props.productPicture});
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getImage();
    console.log('Image...');
  }, []);
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
        Price: {props.lowPrice} - {props.highPrice}
        {'\n'}MOQ: {props.minimumQuantity}
        {'\n'}Grade: {props.grade}
        {'\n'}Variety: {props.variety}
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
      extraData={props.productList.length}
      numColumns={2}
      ListEmptyComponent={
        <View
          style={{
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
          />
        );
      }}
    />
  );
};
