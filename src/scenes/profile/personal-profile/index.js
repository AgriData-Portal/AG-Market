import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton, CloseButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {EditPersonal} from './edit-personal';
import {API, Auth} from 'aws-amplify';
import {
  getUser,
  getUsersBySupplierCompany,
  getUsersByRetailerCompany,
} from '../../../graphql/queries';
import Modal from 'react-native-modal';
import {DismissKeyboardView, UnsuccessfulModal} from '_components';
import {BlueButton} from '_components';
import {log} from '_utils';
import {userStore} from '_store';
import {Font} from '_components';

export {EditPersonal};

export const PersonalProfile = props => {
  const [changePassword, setChangePassword] = useState(false);
  const roleInCompany = userStore(state => state.roleInCompany);
  const userEmail = userStore(state => state.userEmail);
  const userPhoneNumber = userStore(state => state.userPhoneNumber);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('0%') : hp('-20%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <SafeAreaView
        style={{
          alignItems: 'center',

          height: hp('100%'),
          backgroundColor: 'white',
        }}>
        <DismissKeyboardView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: hp('100%'),
            top: hp('-15%'),
          }}>
          {/*<View
        style={{
          flexDirection: 'row',
          top: hp('3%'),
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('100%'),
        }}>
        <View style={{left: wp('4%'), position: 'absolute'}}>
          <BackButton navigation={props.navigation} />
        </View>
        <View>
          <Text style={[Typography.header]}>{Strings.personalProfile}</Text>
        </View>
        <TouchableOpacity
          style={{
            right: wp('4%'),
            position: 'absolute',
          }}>
          <Icon
            name="create-outline"
            size={wp('6%')}
            onPress={() => props.navigation.navigate('editprofile')}
          />
        </TouchableOpacity>
        </View>*/}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('80%'),
              height: hp('25%'),
            }}>
            <Image
              source={require('_assets/images/agridata.png')}
              style={{
                resizeMode: 'contain',
                width: wp('50%'),
                height: hp('20%'),
                top: hp('5%'),
              }}
            />
            <Font.Header style={{top: hp('5%'), zIndex: 10}}>
              {props.user.name}
            </Font.Header>
          </View>
          <View
            style={{
              top: hp('5%'),
              backgroundColor: Colors.GRAY_MEDIUM,
              width: wp('85%'),
              height: hp('35%'),
              borderRadius: 10,
            }}>
            <View
              style={{
                top: hp('3%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Font.PlaceholderSmall>
                {Strings.companyRole}
              </Font.PlaceholderSmall>

              <View>
                <Font.Normal>{roleInCompany}</Font.Normal>
              </View>
            </View>

            <View
              style={{
                top: hp('5%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Font.PlaceholderSmall>{Strings.email}</Font.PlaceholderSmall>
              <View>
                {userEmail == '' ? (
                  <Font.Normal>{Strings.notAddedYet}</Font.Normal>
                ) : (
                  <Font.Normal>{userEmail}</Font.Normal>
                )}
              </View>
            </View>
            <View
              style={{
                top: hp('7%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Font.PlaceholderSmall>
                {Strings.contactNumber}
              </Font.PlaceholderSmall>
              <View>
                <Font.Normal>{userPhoneNumber}</Font.Normal>
              </View>
            </View>
            <BlueButton
              onPress={() => props.navigation.navigate('editprofile')}
              text={Strings.editPersonalProfile}
              font={Typography.normal}
              borderRadius={10}
              top={hp('10%')}
            />
          </View>

          <BlueButton
            onPress={() => setChangePassword(true)}
            text={Strings.changePass}
            font={Typography.normal}
            top={hp('10%')}
            borderRadius={10}
          />
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
  const [passwordDiffModal, setPasswordDiffModal] = useState(false);
  const [backendReject, setBackendReject] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [resendCodeSuccessModal, setResendCodeSuccessModal] = useState(false);
  const [old, setOld] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);

  const updatePassword = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const changePassword = await Auth.changePassword(user, old, password);
      setResendCodeSuccessModal(true);
    } catch (e) {
      setErrorText(e.error);
      setBackendReject(true);
      log(e);
    }
  };
  var hasNumber = /\d/;
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
              {Strings.resetPassword}
            </Font.Normal>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('60%'),
                  top: hp('5%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setOld(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.oldPassword}
                  style={{
                    height: hp('6%'),
                    color: 'black',
                    borderBottomColor: 'transparent',
                  }}></TextInput>
              </View>

              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('60%'),
                  top: hp('6%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setPassword2(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.newPassword}
                  style={{
                    height: hp('6%'),
                    color: 'black',
                    borderBottomColor: 'transparent',
                  }}></TextInput>
              </View>
              <View
                style={{
                  alignItems: 'flex-start',
                  width: wp('60%'),
                  top: hp('7%'),
                  borderBottomColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TextInput
                  underlineColorAndroid="transparent"
                  onChangeText={value => {
                    setPassword(value);
                  }}
                  placeholderTextColor={Colors.GRAY_DARK}
                  placeholder={Strings.reEnterNewPassword}
                  style={{
                    height: hp('6%'),
                    color: 'black',
                    borderBottomColor: 'transparent',
                  }}></TextInput>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (old == '' || password == '' || password2 == '') {
                  setPasswordCodeModal(true);
                } else if (password != password2) {
                  setPasswordDiffModal(true);
                } else if (password.length < 8) {
                  setUnsuccessfulModal(true);
                  setErrorText(
                    'Sorry you have entered an invalid password. Password must contain at least 8 characters.',
                  );
                } else if (!hasNumber.test(password)) {
                  setUnsuccessfulModal(true);
                  setErrorText(
                    'Sorry you have entered an invalid password. Password must contain at least 1 number.',
                  );
                } else {
                  updatePassword();
                }
              }}
              style={{top: hp('11%')}}>
              <Font.Small style={{textDecorationLine: 'underline'}}>
                {Strings.changePass}
              </Font.Small>
            </TouchableOpacity>
          </View>
          <Modal
            isVisible={passwordCodeModal}
            onBackdropPress={() => setPasswordCodeModal(false)}>
            <PasswordCodeModal setPasswordCodeModal={setPasswordCodeModal} />
          </Modal>
          <Modal
            isVisible={passwordDiffModal}
            onBackdropPress={() => setPasswordDiffModal(false)}>
            <PasswordDiffModal setPasswordDiffModal={setPasswordDiffModal} />
          </Modal>
          <Modal
            isVisible={resendCodeSuccessModal}
            onBackdropPress={() => setResendCodeSuccessModal(false)}>
            <ResendCodeSuccessModal
              setResendCodeSuccessModal={setResendCodeSuccessModal}
              setForgetPassword={props.setForgetPassword}
            />
          </Modal>
          <Modal
            isVisible={backendReject}
            onBackdropPress={() => setBackendReject(false)}>
            <UnsuccessfulModal text={errorText} />
          </Modal>
          <Modal
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal text={errorText} />
          </Modal>
        </DismissKeyboardView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
        <Font.Large
          style={{top: hp('4%'), width: wp('70%'), textAlign: 'center'}}>
          {Strings.enterEmptyField}
        </Font.Large>
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
            height: hp('45%'),
            width: wp('90%'),
            backgroundColor: 'white',
            borderRadius: 20,
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Font.Header
            style={{top: hp('3%'), textAlign: 'center', width: wp('85%')}}>
            {Strings.passwordSuccess}
          </Font.Header>
          <View style={{top: hp('4%'), justifyContent: 'center'}}>
            <Icon name="checkmark-done" color={'green'} size={wp('40%')} />
          </View>
        </View>
      </DismissKeyboardView>
    </SafeAreaView>
  );
};

export const PasswordDiffModal = props => {
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
          {Strings.passwordsNotMatching}
        </Font.Header>
        <View style={{top: hp('7%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};
