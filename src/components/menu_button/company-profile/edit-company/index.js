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
import {DismissKeyboardView, UnsuccessfulModal} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const EditCompany = props => {
  const [imageSource, setImageSource] = useState(null);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bankDetails, setBankDetails] = useState('');
  const [errorText, setErrorText] = useState('');

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
        console.log({photo});
        console.log(response.uri);
        setImageSource(response.uri);
      }
    });
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('0%') : hp('5%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <DismissKeyboardView>
        <SafeAreaView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('100%'),
            height: hp('100%'),
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              top: hp('-10%'),
            }}>
            {/*<View
              style={{
                width: wp('100%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{left: wp('3%'), position: 'absolute'}}>
                <BackButton navigation={props.navigation} />
              </View>
              <View>
                <Text style={[Typography.header]}>
                  Edit {Strings.companyProfile}
                </Text>
              </View>
            </View>*/}

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
                  <TouchableOpacity
                    onPress={() => {
                      selectImage();
                    }}
                    style={{top: hp('2%')}}>
                    <Text style={{textAlign: 'center'}}>
                      {Strings.changeImage}
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Image
                    source={{uri: imageSource}}
                    style={{
                      resizeMode: 'cover',
                      width: wp('50%'),
                      height: hp('20%'),
                      borderRadius: 10,
                    }}
                  />
                </View>
              )}
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
                  top: hp('6%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.companyAddress}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={address}
                  onChangeText={item => setAddress(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('5%'),
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
                  {Strings.contactNumber}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={number}
                  onChangeText={item => setNumber(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('5%'),
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
                  {Strings.email}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={email}
                  onChangeText={item => setEmail(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('5%'),
                    color: 'black',
                  }}></TextInput>
              </View>
              <View
                style={{
                  top: hp('15%'),
                  left: wp('5%'),
                  width: wp('75%'),
                  height: hp('5%'),
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                }}>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.bankDetails}
                </Text>
                <TextInput
                  underlineColorAndroid="transparent"
                  value={bankDetails}
                  onChangeText={item => setBankDetails(item)}
                  style={{
                    borderBottomColor: 'transparent',
                    width: wp('75%'),
                    height: hp('5%'),
                    color: 'black',
                  }}></TextInput>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (
                  email == '' ||
                  number == '' ||
                  address == '' ||
                  bankDetails == ''
                ) {
                  console.log('empty field');
                  setErrorText('Please fill in all empty spaces!');
                  setUnsuccessfulModal(true);
                } else if (
                  !number.startsWith('+') ||
                  !number.length > 5 ||
                  isNaN(number.slice(1))
                ) {
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
                    'Sorry you have entered an invalid bank detail . Please try again.',
                  );
                } else {
                  try {
                    setSuccesfulChangesModal(true);
                  } catch {
                    e => console.log('error ' + e);
                  }
                }
              }}
              style={{
                top: hp('8%'),
                width: wp('50%'),
                height: wp('11%'),
                backgroundColor: Colors.LIGHT_BLUE,
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
              }}>
              <Text>{Strings.saveChanges}</Text>
              <Icon
                name="checkmark-circle-outline"
                size={wp('5%')}
                style={{left: wp('3%')}}
              />
            </TouchableOpacity>
            <Modal
              isVisible={unsuccessfulModal}
              onBackdropPress={() => setUnsuccessfulModal(false)}>
              <UnsuccessfulModal text={errorText} />
            </Modal>
            <Modal
              isVisible={succesfulChangesModal}
              onBackdropPress={() => setSuccesfulChangesModal(false)}>
              <SuccesfulChangesModal
                setSuccesfulChangesModal={setSuccesfulChangesModal}
                navigation={props.navigation}
              />
            </Modal>
          </View>
        </SafeAreaView>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
