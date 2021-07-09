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
import {CloseButton, AddButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const ForgetPassword = props => {
  const [changePassword, setChangePassword] = useState(false);
  const [phoneNumberModal, setPhoneNumberModal] = useState(false);
  const [search, setSearch] = useState('');

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
              height: hp('32%'),
              width: wp('80%'),
              backgroundColor: 'white',
              borderRadius: 20,
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  textAlign: 'center',
                  margin: wp('5%'),
                  top: hp('1%'),
                  width: wp('60%'),
                },
              ]}>
              {Strings.enterPhoneResetPass}
            </Text>
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
                    setSearch(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.phoneNumber}
                  style={{height: hp('5%')}}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => [
                search == ''
                  ? setPhoneNumberModal(true)
                  : setChangePassword(true),
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
            <PhoneNumberModal setPhoneNumberModal={setPhoneNumberModal} />
          </Modal>
          <Modal isVisible={changePassword}>
            <ChangePassword
              setChangePassword={setChangePassword}
              setForgetPassword={props.setForgetPassword}
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
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
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
            <Text
              style={[
                Typography.normal,
                {
                  textAlign: 'center',
                  margin: wp('3%'),
                  top: hp('4%'),
                },
              ]}>
              {Strings.resetPasswordByEntering}
            </Text>
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
                  placeholder={Strings.authenticationCode}
                  style={{height: hp('5%')}}></TextInput>
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
                  style={{height: hp('5%')}}></TextInput>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => setResendCodeModal(true)}
              style={{top: hp('9%')}}>
              <Text
                style={[Typography.small, {textDecorationLine: 'underline'}]}>
                {Strings.resendCode}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => [
                code == '' || password == ''
                  ? setPasswordCodeModal(true)
                  : setPasswordCodeModal(false),
                code != '' && password != ''
                  ? setResendCodeSuccessModal(true)
                  : setResendCodeSuccessModal(false),
              ]}
              style={{top: hp('13%')}}>
              <Text
                style={[Typography.small, {textDecorationLine: 'underline'}]}>
                {Strings.changePass}
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={passwordCodeModal}
            onBackdropPress={() => setPasswordCodeModal(false)}>
            <PasswordCodeModal setPasswordCodeModal={setPasswordCodeModal} />
          </Modal>
          <Modal
            isVisible={resendCodeModal}
            onBackdropPress={() => setResendCodeModal(false)}>
            <ResendCodeModal setResendCodeModal={setResendCodeModal} />
          </Modal>
          <Modal
            isVisible={resendCodeSuccessModal}
            onBackdropPress={() => setResendCodeSuccessModal(false)}>
            <ResendCodeSuccessModal
              setResendCodeSuccessModal={setResendCodeSuccessModal}
              setForgetPassword={props.setForgetPassword}
            />
          </Modal>
        </DismissKeyboardView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export const PhoneNumberModal = props => {
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
        <Text
          style={[
            Typography.large,
            {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
          ]}>
          {Strings.pleaseEnterPhoneNum}
        </Text>

        <View style={{top: hp('8%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const PasswordCodeModal = props => {
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          height: hp('50%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 20,
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={[
            Typography.large,
            {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
          ]}>
          {Strings.pleaseEnterBothAuth}
        </Text>
        <View style={{top: hp('8%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('45%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export const ResendCodeSuccessModal = props => {
  return (
    <SafeAreaView>
      <DismissKeyboardView>
        <View
          style={{
            height: hp('50%'),
            width: wp('90%'),
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text
            style={[
              Typography.header,
              {top: hp('3%'), textAlign: 'center', width: wp('80%')},
            ]}>
            {Strings.passwordSuccess}
          </Text>
          <View style={{top: hp('4%'), justifyContent: 'center'}}>
            <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
          </View>
          <TouchableOpacity
            onPress={() => props.setForgetPassword(false)}
            style={{
              top: hp('5%'),
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('40%'),
              height: hp('5%'),
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 10,
            }}>
            <Text>{Strings.logInScreen}</Text>
          </TouchableOpacity>
        </View>
      </DismissKeyboardView>
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
        <Text
          style={[
            Typography.header,
            {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
          ]}>
          {Strings.codeSent}
        </Text>
        <View style={{top: hp('10%'), justifyContent: 'center'}}>
          <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};
