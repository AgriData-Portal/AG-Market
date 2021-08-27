import React, {useState} from 'react';
import {
  TextInput,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Spacing, Colors} from '_styles';
import {BackButton} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Strings from '_utils';
import {log, authentication} from '_utils';

import {Font} from '_components';

export const ConfirmSignUp = props => {
  const [phone, setPhone] = useState(props.route.params.phone);
  const [authCode, setAuthCode] = useState('');
  const [error, setError] = useState(false);
  const [successfulModal, setSuccessfulModal] = useState(false); //success modal
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false); //error modal
  const [resendCode, setResendCode] = useState(false);
  const [unsuccessfulModal2, setUnsuccessfulModal2] = useState(false);
  const [wrongCode, setWrongCode] = useState(false);
  log(phone);

  //TODO not sure if works
  // async function confirmSignUp() {
  //   try {
  //     const user = await Auth.confirmSignUp(phone, authCode);
  //     log('✅ Code confirmed' + phone);
  //     setSuccessfulModal(true);
  //     setTimeout(() => {
  //       props.navigation.navigate('signin');
  //     }, 3000);
  //   } catch (error) {
  //     setError(true);
  //     setWrongCode(true);
  //     log(
  //       '❌ Verification code does not match. Please enter a valid verification code.',
  //       error.code,
  //     );
  //   }
  // }

  // async function resendConfirmationCode() {
  //   try {
  //     await Auth.resendSignUp(phone);
  //     log('code resent successfully');
  //     setResendCode(true);
  //   } catch (err) {
  //     log('error resending code: ', err);
  //   }
  // }

  return (
    <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          position: 'absolute',
          top: Spacing.BackButtonTop,
          left: Spacing.BackButtonLeft,
        }}>
        <BackButton navigation={props.navigation} />
      </View>
      <View
        style={{
          position: 'absolute',
          right: wp('10%'),
          top: hp('5%'),
        }}>
        <Image
          style={{
            resizeMode: 'contain',
            height: hp('10%'),
            width: wp('20%'),
          }}
          source={require('_assets/images/agridata.png')}
        />
      </View>
      <View
        style={{
          width: wp('100%'),
          height: hp('90%'),
          top: hp('15%'),
          borderRadius: 40,
          backgroundColor: '#CDDCF3',
          alignItems: 'center',
        }}>
        <Font.Header
          style={{
            top: hp('3%'),
            color: '#444443',
          }}>
          {Strings.verificationWord}
        </Font.Header>
        <Font.Normal
          style={{
            top: hp('5%'),
            color: '#444443',
            width: wp('80%'),
            textAlign: 'center',
          }}>
          {Strings.sendCodeToPhone}
        </Font.Normal>
        <View style={{top: hp('12%')}}>
          <Font.Small>{Strings.authenticationCode}</Font.Small>
          <TextInput
            style={{
              width: wp('80%'),

              height: hp('7%'),
              color: 'black',
              borderBottomColor: 'transparent',
            }}
            underlineColorAndroid="transparent"
            keyboardType="numeric"
            value={authCode}
            onChangeText={text => setAuthCode(text)}
            placeholder="######"
            placeholderTextColor={Colors.GRAY_DARK}
          />
          <View
            style={{
              bottom: hp('1.5%'),
              width: wp('80%'),
              borderBottomWidth: 1,
              borderColor: Colors.GRAY_DARK,
            }}></View>
          <TouchableOpacity
            style={{
              bottom: hp('0.5%'),
              left: wp('25%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              authentication.resendConfirmationCode(phone).then(data => {
                if (data == true) {
                  log('code resent successfully');
                  setResendCode(true);
                } else if (data == false) {
                  log('error resending code: ', err);
                }
              });
            }}>
            <Font.Small>{Strings.resendCode}</Font.Small>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              top: hp('25%'),
              width: wp('40%'),
              height: hp('6%'),
              backgroundColor: 'white',
              borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            // TODO remove setTimeout
            onPress={() => {
              if (authCode == '') {
                setUnsuccessfulModal(true);
              } else {
                authentication.confirmSignUp(phone, authCode).then(data => {
                  if (data == true) {
                    log('✅ Code confirmed' + phone);
                    setSuccessfulModal(true);
                    setTimeout(() => {
                      props.navigation.navigate('signin');
                    }, 3000);
                  } else if (data == false) {
                    setError(true);
                    setWrongCode(true);
                    log(
                      '❌ Verification code does not match. Please enter a valid verification code.',
                      error.code,
                    );
                  }
                });
              }
            }}>
            <Font.Normal>{Strings.verify}</Font.Normal>
          </TouchableOpacity>
        </View>
      </View>
      {/* TRANSLATION */}
      <View style={{alignItems: 'center', top: hp('0%')}}>
        <TouchableOpacity
          onPress={() => {
            let url =
              'https://wa.me/601165691998?text=Hi%20I%20am%20experiencing%20problems%20verifying%20my%20phone%20number.%20Please%20help!%20Thank%20you';
            Linking.openURL(url)
              .then(data => {
                log('WhatsApp Opened successfully ' + data); //<---Success
              })
              .catch(() => {
                alert('Make sure WhatsApp installed on your device'); //<---Error
              });
          }}>
          <Font.Small>Having trouble receiving SMS verification?</Font.Small>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={unsuccessfulModal}
        onBackdropPress={() => setUnsuccessfulModal(false)}>
        <UnsuccessfulModal setUnsuccessfulModal={setUnsuccessfulModal} />
      </Modal>
      <Modal
        isVisible={unsuccessfulModal2}
        onBackdropPress={() => setUnsuccessfulModal2(false)}>
        <UnsuccessfulModal2 setUnsuccessfulModal2={setUnsuccessfulModal2} />
      </Modal>
      <Modal
        isVisible={successfulModal}
        onBackdropPress={() => setSuccessfulModal(false)}>
        <SuccessfulModal setSuccessfulModal={setSuccessfulModal} />
      </Modal>
      <Modal
        isVisible={resendCode}
        onBackdropPress={() => setResendCode(false)}>
        <ResendCodeModal setResendCode={setResendCode} />
      </Modal>
      <Modal isVisible={wrongCode} onBackdropPress={() => setWrongCode(false)}>
        <WrongCode setWrongCode={setWrongCode} />
      </Modal>
    </SafeAreaView>
  );
};

export const SuccessfulModal = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('40%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Font.Large
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          Phone Successfully Verified
        </Font.Large>

        <View style={{top: hp('10%'), justifyContent: 'center'}}>
          <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};
// TRANSLATION
export const UnsuccessfulModal2 = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('40%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Font.Large
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          Please Enter Phone Number!
        </Font.Large>

        <View style={{top: hp('5%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const UnsuccessfulModal = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('40%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Font.Large
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          Please Enter Both Phone Number and Authentication Code!
        </Font.Large>

        <View style={{top: hp('5%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const ResendCodeModal = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('45%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Font.Header
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          Code Sent!
        </Font.Header>
        <View style={{top: hp('10%'), justifyContent: 'center'}}>
          <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const WrongCode = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('40%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Font.Large
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          Wrong Authentication Code! Please Re-enter Code!
        </Font.Large>

        <View style={{top: hp('5%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};
