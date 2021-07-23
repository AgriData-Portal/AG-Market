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
import {DismissKeyboardView} from '_components';
export {EditPersonal};

export const PersonalProfile = props => {
  const [changePassword, setChangePassword] = useState(false);
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
          justifyContent: 'center',
          height: hp('100%'),
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
              top: hp('3%'),
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('80%'),
              height: hp('25%'),
            }}>
            <Image
              source={require('_assets/images/company-logo.png')}
              style={{
                resizeMode: 'contain',
                width: wp('80%'),
                height: hp('20%'),
              }}
            />
            <Text style={[Typography.header, {top: hp('2%')}]}>
              {props.user.name}
            </Text>
          </View>
          <View
            style={{
              top: hp('8%'),
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
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyRole}
              </Text>
              {props.user.role == 'generalmanager' ? (
                <View>
                  <Text style={[Typography.normal]}>General Manager</Text>
                </View>
              ) : (
                <View>
                  <Text style={[Typography.normal]}>{props.user.role}</Text>
                </View>
              )}
            </View>
            <View
              style={{
                top: hp('5%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.address}
              </Text>
              <View>
                <Text style={[Typography.normal]}>STREET, CITY, STATE</Text>
              </View>
            </View>
            <View
              style={{
                top: hp('7%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
              <View>
                <Text style={[Typography.normal]}>email@gmail.com</Text>
              </View>
            </View>
            <View
              style={{
                top: hp('9%'),
                left: wp('6%'),
                width: wp('73%'),
                height: hp('5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.contactNumber}
              </Text>
              <View>
                <Text style={[Typography.normal]}>
                  {props.user.contactNumber}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('editprofile')}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('45%'),
              height: hp('4%'),
              alignItems: 'center',
              justifyContent: 'center',
              top: hp('10%'),
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
            <Text style={[Typography.normal]}>
              Edit {Strings.personalProfile}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setChangePassword(true)}
            style={{
              alignSelf: 'center',
              top: hp('12%'),
              width: wp('40%'),
              height: hp('4%'),
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
              elevation: 5,
            }}>
            <Text style={[Typography.normal]}>{Strings.changePass}</Text>
          </TouchableOpacity>
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
  const [resendCodeSuccessModal, setResendCodeSuccessModal] = useState(false);
  const [old, setOld] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const updatePassword = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const changePassword = await Auth.changePassword(user, old, password);
      setResendCodeSuccessModal(true);
    } catch (e) {
      console.log(e);
    }
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
            <Text
              style={[
                Typography.normal,
                {
                  textAlign: 'center',
                  margin: wp('3%'),
                  top: hp('4%'),
                },
              ]}>
              {Strings.resetPassword}
            </Text>
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
                } else {
                  updatePassword();
                }
              }}
              style={{top: hp('11%')}}>
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
        <Text
          style={[
            Typography.large,
            {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
          ]}>
          {Strings.enterEmptyField}
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
              {top: hp('3%'), textAlign: 'center', width: wp('85%')},
            ]}>
            {Strings.passwordSuccess}
          </Text>
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
        <Text
          style={[
            Typography.header,
            {top: hp('4%'), width: wp('70%'), textAlign: 'center'},
          ]}>
          {Strings.passwordsNotMatching}
        </Text>
        <View style={{top: hp('7%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('40%')} />
        </View>
      </View>
    </SafeAreaView>
  );
};
