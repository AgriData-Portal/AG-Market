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
import {BackButton, CloseButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {SuccesfulChangesModal} from '_components/modals';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API, Auth} from 'aws-amplify';
import Strings from '_utils';

export const EditPersonal = props => {
  const [imageSource, setImageSource] = useState(null);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

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
        Platform.OS === 'ios' ? hp('0%') : hp('0%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    ></KeyboardAvoidingView>
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
                    height: hp('5%'),
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
                    height: hp('5%'),
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
                    height: hp('5%'),
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
