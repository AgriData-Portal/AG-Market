import React, {useState} from 'react';
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
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {SuccesfulChangesModal} from '_components/modals';
import Modal from 'react-native-modal';
import {
  DismissKeyboardView,
  UnsuccessfulModal,
  SuccessfulModal,
} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {API, Storage} from 'aws-amplify';
import {
  updateRetailerCompany,
  updateSupplierCompany,
} from '../../../../graphql/mutations';
import {BlueButton} from '_components';
import {log} from '_utils';

export const EditCompany = props => {
  const [imageSource, setImageSource] = useState(props.route.params.logo);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [number, setNumber] = useState(props.route.params.contactNumber);
  const [email, setEmail] = useState(props.route.params.email);
  const [bankDetails, setBankDetails] = useState(props.route.params.bankNumber);
  const [bankName, setBankName] = useState(props.route.params.bankName);
  const [errorText, setErrorText] = useState('');

  if (number.includes('+60')) {
    var temp = number.slice(3);
    setNumber(temp);
  }

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 256,
      maxHeight: 256,
    };

    launchImageLibrary(options, response => {
      log(response);
      if (response.didCancel) {
        log('User cancelled photo picker');
      } else if (response.error) {
        log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        log('User tapped custom button: ', response.customButton);
      } else {
        let photo = {uri: response.assets[0].uri};
        setImageSource(photo);
      }
    });
  }

  const saveChanges = async () => {
    if (props.user.retailerCompanyID == null) {
      var photo;
      try {
        if (imageSource) {
          photo = imageSource;
          log('here');
          log(photo);
          const response = await fetch(photo.uri);
          const blob = await response.blob();
          log('FileName: \n');
          photo.fileName = props.user.supplierCompany.name + '_logo';
          await Storage.put(photo.fileName, blob, {
            contentType: 'image/jpeg',
          });
        }
        var companyProfile = await API.graphql({
          query: updateSupplierCompany,
          variables: {
            input: {
              id: props.user.supplierCompanyID,
              logo: imageSource == null ? null : photo.fileName,
              contactDetails: {email: email, phone: '+60' + number},
              bankAccount: {
                bankName: bankName,
                accountNumber: bankDetails,
              },
            },
          },
        });

        setSuccessfulModal(true);
      } catch (e) {
        log(e);
        log(props.user.supplierCompanyID);
      }
    } else if (props.user.supplierCompanyID == null) {
      try {
        if (imageSource) {
          let photo = imageSource;
          log(photo);
          const response = await fetch(photo.uri);
          const blob = await response.blob();
          log('FileName: \n');
          photo.fileName = props.user.retailerCompany.name + '_logo';
          await Storage.put(photo.fileName, blob, {
            contentType: 'image/jpeg',
          });
        }
        var companyProfile = await API.graphql({
          query: updateRetailerCompany,
          variables: {
            input: {
              id: props.user.retailerCompanyID,
              logo: imageSource == null ? null : photo.fileName,
              contactDetails: {email: email, phone: number},
              bankAccount: {bankName: bankName, accountNumber: bankDetails},
            },
          },
        });

        setSuccessfulModal(true);
      } catch (e) {
        log(e);
        log(props.user.retailerCompanyID);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('0%') : null
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <DismissKeyboardView>
        <SafeAreaView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('100%'),
            height: hp('100%'),
            backgroundColor: 'white',
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: hp('-14%'),
            }}>
            <View
              style={{
                top: hp('0%'),
                alignItems: 'center',
                justifyContent: 'center',
                width: wp('50%'),
                height: hp('20%'),
              }}>
              {imageSource === null ? (
                <View>
                  <Image
                    source={require('_assets/images/company-logo.png')}
                    style={{
                      resizeMode: 'cover',
                      width: wp('50%'),
                      height: hp('20%'),
                      borderRadius: 10,
                    }}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    source={imageSource}
                    style={{
                      resizeMode: 'cover',
                      width: wp('50%'),
                      height: hp('20%'),
                      borderRadius: 10,
                    }}
                  />
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  selectImage();
                }}
                style={{top: hp('1%')}}>
                <Text style={{textAlign: 'center'}}>{Strings.changeImage}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                top: hp('4%'),
                backgroundColor: Colors.GRAY_MEDIUM,
                width: wp('85%'),
                height: hp('40%'),
                borderRadius: 10,
              }}>
              <View
                style={{
                  top: hp('3%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.contactNumber}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: hp('6%'),
                  }}>
                  <Text>+60</Text>
                  <TextInput
                    underlineColorAndroid="transparent"
                    value={number}
                    keyboardType={'number-pad'}
                    onChangeText={item => setNumber(item)}
                    style={{
                      borderBottomColor: 'transparent',
                      width: wp('75%'),
                      height: hp('6%'),
                      color: 'black',
                    }}></TextInput>
                </View>
              </View>
              <View
                style={{
                  top: hp('6%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.email}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={item => setEmail(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('6%'),
                    color: 'black',
                  }}></TextInput>
              </View>
              <View
                style={{
                  top: hp('9%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  Bank Account Number {/*FIXME translation for bankDetails */}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={bankDetails}
                  onChangeText={item => setBankDetails(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('6%'),
                    color: 'black',
                  }}></TextInput>
              </View>
              <View
                style={{
                  top: hp('12%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.bankName}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={bankName}
                  onChangeText={item => setBankName(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('6%'),
                    color: 'black',
                  }}></TextInput>
              </View>
            </View>
            <BlueButton
              onPress={() => {
                if (
                  email == '' ||
                  number == '' ||
                  bankDetails == '' ||
                  bankName == ''
                ) {
                  log('empty field');
                  setErrorText('Please fill in all empty spaces!');
                  setUnsuccessfulModal(true);
                } else if (!number.length > 7 || isNaN(number)) {
                  setUnsuccessfulModal(true);
                  setErrorText(
                    'Sorry you have entered an invalid phone number. Please try again.',
                  );
                } else if (!email.includes('@')) {
                  setUnsuccessfulModal(true);
                  setErrorText(
                    'Sorry you have entered an invalid email address. Please try again.',
                  );
                } else if (isNaN(bankDetails)) {
                  setUnsuccessfulModal(true);
                  setErrorText(
                    'Sorry you have entered an invalid bank number . Please try again.',
                  );
                } else {
                  saveChanges();
                }
              }}
              text={Strings.saveChanges}
              icon={'checkmark-circle-outline'}
              offsetCenter={wp('5%')}
              borderRadius={10}
              top={hp('10%')}
              font={Typography.small}
            />

            <Modal
              isVisible={unsuccessfulModal}
              onBackdropPress={() => setUnsuccessfulModal(false)}>
              <UnsuccessfulModal text={errorText} />
            </Modal>
            <Modal
              isVisible={successfulModal}
              onBackdropPress={() => setSuccessfulModal(false)}>
              <SuccessfulModal
                setSuccessfulModal={setSuccessfulModal}
                text={
                  'Your account will be updated in a few minutes. Please refresh the app to check on the changes'
                }
              />
            </Modal>
          </View>
        </SafeAreaView>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
