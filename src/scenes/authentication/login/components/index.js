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
import {
  CloseButton,
  UnsuccessfulModal,
  SuccessfulModal,
  DismissKeyboardView,
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Auth} from 'aws-amplify';
import Strings from '_utils';
import {log} from '_utils';
import {Font} from '_components';

export const ForgetPassword = props => {
  const [changePassword, setChangePassword] = useState(false);
  const [phoneNumberModal, setPhoneNumberModal] = useState(false);
  const [phone, setPhone] = useState('+6' + props.phone);

  const sendConfirmation = async props => {
    await Auth.forgotPassword(phone)
      .then(data => {
        log(data);
        log(phone);
      })
      .catch(err => {
        log(err);
        log(phone);
      });
    setChangePassword(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('10%') : null}>
      <SafeAreaView>
        <DismissKeyboardView>
          <View
            style={{
              position: 'absolute',
              top: hp('0.5%'),
              right: wp('6%'),
              zIndex: 1000,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <CloseButton setModal={props.setForgetPassword} />
          </View>

          <View
            style={{
              height: hp('35%'),
              width: wp('80%'),
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Font.Normal
              style={{
                textAlign: 'center',
                margin: wp('5%'),
                top: hp('1%'),
                width: wp('60%'),
              }}>
              {Strings.enterPhoneResetPass}
            </Font.Normal>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('60%'),
                  top: hp('3%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  onChangeText={value => {
                    setPhone(value);
                  }}
                  underlineColorAndroid="transparent"
                  placeholderTextColor={Colors.GRAY_DARK}
                  value={phone}
                  placeholder={Strings.phoneNumber}
                  style={{
                    height: hp('6%'),
                    borderBottomWidth: 0,
                    color: 'black',
                  }}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => [
                phone == '' ? setPhoneNumberModal(true) : sendConfirmation(),
              ]}
              style={{
                top: hp('7%'),
                width: wp('30%'),
                height: hp('5%'),
                backgroundColor: Colors.LIGHT_BLUE,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }}>
              <Text>{Strings.confirm}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={phoneNumberModal}
            onBackdropPress={() => setPhoneNumberModal(false)}>
            <UnsuccessfulModal text={Strings.pleaseEnterPhoneNum} />
          </Modal>
          <Modal isVisible={changePassword}>
            <ChangePassword
              setChangePassword={setChangePassword}
              setForgetPassword={props.setForgetPassword}
              phone={phone}
            />
          </Modal>
        </DismissKeyboardView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export const ChangePassword = props => {
  const [passwordCodeModal, setPasswordCodeModal] = useState(false);
  const [resendCodeModal, setResendCodeModal] = useState(false);
  const [resendCodeSuccessModal, setResendCodeSuccessModal] = useState(false);
  const [wrongAuthCode, setWrongAuthCode] = useState(false);
  const [passwordFormat, setPasswordFormat] = useState(false);
  const [limitExceeded, setLimitExceeded] = useState(false);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');

  const changePassword = async () => {
    try {
      await Auth.forgotPasswordSubmit(props.phone, code, password);
      setResendCodeModal(true);
    } catch (e) {
      if (e.code == 'CodeMismatchException') {
        setWrongAuthCode(true);
        log('code error');
      } else if (e.code == 'InvalidPasswordException') {
        setPasswordFormat(true);
        log('code error');
      } else if (e.code == 'LimitExceededException') {
        setLimitExceeded(true);
        log('code error');
      }
      log(e);
    }
  };

  const sendConfirmation = async => {
    // await Auth.forgotPassword(props.phone)
    //   .then(data => {
    //     log(data);
    //     log(phone);
    //   })
    //   .catch(err => {
    //     log(err);
    //     log(phone);
    //   });
    setResendCodeModal(true);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('10%') : -180}>
      <SafeAreaView>
        <DismissKeyboardView>
          <View
            style={{
              position: 'absolute',
              top: hp('0.5%'),
              right: wp('4%'),
              zIndex: 1000,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
            }}>
            <CloseButton setModal={props.setChangePassword} />
          </View>

          <View
            style={{
              height: hp('45%'),
              width: wp('85%'),
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Font.Normal
              style={{
                textAlign: 'center',
                margin: wp('3%'),
                top: hp('4%'),
              }}>
              {Strings.resetPasswordByEntering}
            </Font.Normal>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('40%'),
                  top: hp('5%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  onChangeText={value => {
                    setCode(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  keyboardType="numeric"
                  underlineColorAndroid="transparent"
                  placeholder={Strings.authenticationCode}
                  style={{
                    height: hp('6%'),
                    borderBottomWidth: 0,
                    color: 'black',
                  }}></TextInput>
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('40%'),
                  top: hp('6%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  onChangeText={value => {
                    setPassword(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.newPassword}
                  underlineColorAndroid="transparent"
                  style={{
                    height: hp('6%'),
                    borderBottomWidth: 0,
                    color: 'black',
                  }}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => sendConfirmation()}
              style={{top: hp('6%'), left: wp('10%')}}>
              <Font.PlaceholderSmall>
                {Strings.resendCode}
              </Font.PlaceholderSmall>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (code == '' || password == '') {
                  setPasswordCodeModal(true);
                } else {
                  changePassword();
                }
              }}
              style={{top: hp('10%')}}>
              <Font.Small style={{textDecorationLine: 'underline'}}>
                {Strings.changePass}
              </Font.Small>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={passwordCodeModal}
            onBackdropPress={() => setPasswordCodeModal(false)}>
            <UnsuccessfulModal text={Strings.pleaseEnterBothAuth} />
          </Modal>
          <Modal
            isVisible={wrongAuthCode}
            onBackdropPress={() => setWrongAuthCode(false)}>
            <UnsuccessfulModal
              text={'Wrong Auth Code. Please exit and try again'}
            />
          </Modal>
          <Modal
            isVisible={passwordFormat}
            onBackdropPress={() => setPasswordFormat(false)}>
            <UnsuccessfulModal
              text={'Password must contain a number and be 8 characters long'}
            />
          </Modal>
          <Modal
            isVisible={limitExceeded}
            onBackdropPress={() => setLimitExceeded(false)}>
            <UnsuccessfulModal
              text={
                'The number of requests have exceeded the limit. Please wait for 30 minutes and try again. You can contact us in the meantime'
              }
            />
          </Modal>
          <Modal
            isVisible={resendCodeModal}
            onBackdropPress={() => setResendCodeModal(false)}>
            <ResendCodeModal setResendCodeModal={setResendCodeModal} />
          </Modal>
          <Modal
            isVisible={resendCodeSuccessModal}
            onBackdropPress={() => [
              setResendCodeSuccessModal(false),
              props.setForgetPassword(false),
            ]}>
            <SuccessfulModal text={Strings.passwordSuccess} />
          </Modal>
        </DismissKeyboardView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
          {Strings.codeSent}
        </Font.Header>
        <View style={{top: hp('10%'), justifyContent: 'center'}}>
          <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

// export const PhoneNumberModal = props => {
//   return (
//     <SafeAreaView
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <View
//         style={{
//           height: hp('40%'),
//           width: wp('90%'),
//           backgroundColor: 'white',
//           borderRadius: 20,
//           alignItems: 'center',
//           alignSelf: 'center',
//         }}>
//         <Text
//           style={[
//             Typography.large,
//             {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
//           ]}>
//           {}
//         </Text>

//         <View style={{top: hp('8%'), justifyContent: 'center'}}>
//           <Icon name="warning" color={'red'} size={wp('40%')} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export const PasswordCodeModal = props => {
//   return (
//     <SafeAreaView
//       style={{
//         alignItems: 'center',
//         justifyContent: 'center',
//       }}>
//       <View
//         style={{
//           height: hp('50%'),
//           width: wp('90%'),
//           backgroundColor: 'white',
//           borderRadius: 20,
//           alignItems: 'center',
//           alignSelf: 'center',
//         }}>
//         <Text
//           style={[
//             Typography.large,
//             {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
//           ]}>
//           {Strings.pleaseEnterBothAuth}
//         </Text>
//         <View style={{top: hp('8%'), justifyContent: 'center'}}>
//           <Icon name="warning" color={'red'} size={wp('45%')} />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };
// export const ResendCodeSuccessModal = props => {
//   return (
//     <SafeAreaView>
//       <DismissKeyboardView>
//         <View
//           style={{
//             height: hp('50%'),
//             width: wp('90%'),
//             backgroundColor: 'white',
//             borderRadius: 20,
//             alignItems: 'center',
//             alignSelf: 'center',
//           }}>
//           <Text
//             style={[
//               Typography.header,
//               {top: hp('3%'), textAlign: 'center', width: wp('80%')},
//             ]}>
//             {Strings.passwordSuccess}
//           </Text>
//           <View style={{top: hp('4%'), justifyContent: 'center'}}>
//             <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
//           </View>
//           <TouchableOpacity
//             onPress={() => props.setForgetPassword(false)}
//             style={{
//               top: hp('5%'),
//               backgroundColor: Colors.LIGHT_BLUE,
//               width: wp('40%'),
//               height: hp('5%'),
//               alignItems: 'center',
//               justifyContent: 'center',
//               shadowColor: '#000',
//               shadowOffset: {
//                 width: 0,
//                 height: 2,
//               },
//               shadowOpacity: 0.25,
//               shadowRadius: 3.84,
//               elevation: 5,
//               borderRadius: 10,
//             }}>
//             <Text>{Strings.logInScreen}</Text>
//           </TouchableOpacity>
//         </View>
//       </DismissKeyboardView>
//     </SafeAreaView>
//   );
// };
