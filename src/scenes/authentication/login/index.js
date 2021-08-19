import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Linking,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {BackButton, UnsuccessfulModal} from '_components';
import {Auth} from 'aws-amplify';
import {DismissKeyboardView, LoadingModal} from '_components';
import {ForgetPassword} from './components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {BlueButton} from '_components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {log} from '_utils';

export const Login = props => {
  const [secure, setSecure] = useState(true);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [verified, setVerified] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const signIn = async () => {
    try {
      setLoading(true);
      const user = await Auth.signIn('+6' + phone, password);
      log(user);
      log('Successful sign in');
      props.updateUserID(user.username);
      props.setUserAttributes(user.attributes);

      //props.updateAuthState('loggedIn'); //fucking weird
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        if (error.code == 'UserNotConfirmedException') {
          log('here');
          setVerified(true);
        } else if (error.code == 'UserNotFoundException') {
          setUnsuccessfulModal(true);
          setErrorText(
            "Sorry you don't have an account associated with this number. Please register.",
          );
        } else if (error.code == 'NotAuthorizedException') {
          setUnsuccessfulModal(true);
          setErrorText(
            'Sorry the password you entered is invalid. Please try again.',
          );
        } else if (error.code == 'NetworkError') {
          setUnsuccessfulModal(true);
          setErrorText(
            'Sorry your network seems to be down. Please try again when internet connectivity has been restored.',
          );
        } else {
          setUnsuccessfulModal(true);
          setErrorText(
            'Something has gone horribly wrong. Please contact us by clicking the prompt below after dismissing this modal',
          );
        }
      }, 400);

      log(error);
    }
  };
  var hasNumber = /\d/;
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          height: hp('100%'),
          width: wp('100%'),
        }}>
        <View
          style={{
            position: 'absolute',
            top: hp('5%'),
            left: wp('7%'),
          }}>
          <BackButton navigation={props.navigation} />
        </View>
        <Image
          source={require('_assets/images/fruits.png')}
          style={{
            position: 'absolute',
            right: 0,
            width: wp('50%'),
            height: hp('30%'),
            resizeMode: 'cover',
          }}
        />
        <View style={{top: hp('5%')}}>
          <View>
            <Text
              style={[
                Typography.largestSize,
                {
                  width: wp('50%'),
                  left: wp('8%'),
                  top: hp('4%'),
                  lineHeight: hp('5.8%'),
                },
              ]}>
              {Strings.welcome}
            </Text>
          </View>
          <View style={{top: hp('4%'), left: wp('8%'), width: wp('70%')}}>
            <Text style={[Typography.large]}>{Strings.logIntoAcc}</Text>
          </View>
        </View>
        <View>
          <View
            style={{
              top: hp('12%'),
              left: wp('8%'),
            }}>
            <Text style={[Typography.placeholder]}>{Strings.phoneNumber}</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType={'phone-pad'}
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder="0109125654"
                underlineColorAndroid="transparent"
                onChangeText={item => setPhone(item)}
                value={phone}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
                  alignSelf: 'center',
                }}></TextInput>
            </View>

            <View
              style={{
                width: wp('85%'),
                borderBottomWidth: 1,
                borderColor: Colors.GRAY_DARK,
              }}></View>
          </View>
          <View
            style={{
              top: hp('14%'),
              left: wp('8%'),
            }}>
            <Text style={[Typography.placeholder]}>{Strings.password}</Text>
            <TextInput
              placeholderTextColor={Colors.GRAY_DARK}
              placeholder={Strings.password}
              secureTextEntry={secure}
              keyboardType="default"
              underlineColorAndroid="transparent"
              onChangeText={item => setPassword(item)}
              value={password}
              style={{
                width: wp('50%'),
                height: hp('7%'),
                borderBottomColor: 'transparent',
                color: 'black',
              }}></TextInput>
            <View
              style={{
                width: wp('85%'),
                borderBottomWidth: 1,
                borderColor: Colors.GRAY_DARK,
              }}></View>
            <TouchableOpacity
              onPress={() => {
                if (secure) {
                  setSecure(false);
                } else {
                  setSecure(true);
                }
              }}
              style={{
                right: wp('15%'),
                position: 'absolute',
                bottom: hp('2%'),
              }}>
              <Icon name="eye-outline" size={wp('6%')}></Icon>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => setForgetPassword(true)}
            style={{top: hp('15%'), left: wp('65%'), width: wp('30%')}}>
            <Text
              style={[
                Typography.welcome,
                {
                  fontSize: 12,
                  textAlign: 'right',
                },
              ]}>
              {Strings.forgotPassword}
            </Text>
          </TouchableOpacity>
          <Modal isVisible={forgetPassword}>
            <ForgetPassword
              setForgetPassword={setForgetPassword}
              phone={phone}
            />
          </Modal>
        </View>

        <BlueButton
          onPress={() => {
            if (password == '' || phone == '') {
              log('empty input');
              setUnsuccessfulModal(true);
              setErrorText('Please fill in all empty spaces!');
            } else if (!phone.length > 5 || isNaN(phone.slice(1))) {
              setUnsuccessfulModal(true);
              setErrorText(
                'Sorry you have entered an invalid phone number. Please try again.',
              );
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
              signIn();
            }
          }}
          text={Strings.logIn}
          icon={'arrow-forward-outline'}
          top={hp('21%')}
          offsetCenter={wp('10%')}
          minWidth={wp('40%')}
          font={Typography.large}
          borderRadius={10}
        />

        {/*<TouchableOpacity
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: hp('13%'),
            alignSelf: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: hp('3%'),
            }}>
            <Icon name="finger-print-outline" size={wp('12%')} />
          </View>

          <Text style={[Typography.normal]}>{Strings.logInFinger}</Text>
          </TouchableOpacity>*/}

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
          }}
          style={{
            alignItems: 'center',
            position: 'absolute',
            bottom: hp('6%'),
            alignSelf: 'center',
          }}>
          <Text style={[Typography.welcome, {fontSize: 12}]}>
            {Strings.havingTrouble}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <Modal isVisible={verified}>
        <VerificationModal
          navigation={props.navigation}
          setVerified={setVerified}
          phone={phone}
        />
      </Modal>
      <Modal
        isVisible={unsuccessfulModal}
        onBackdropPress={() => setUnsuccessfulModal(false)}>
        <UnsuccessfulModal text={errorText} />
      </Modal>
      <LoadingModal isVisible={loading} />
    </KeyboardAwareScrollView>
  );
};

const VerificationModal = props => {
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
          Your phone number has not been verified yet
        </Text>
        <View style={{top: hp('2%'), justifyContent: 'center'}}>
          <Icon name="warning" color={'red'} size={wp('45%')} />
        </View>
        <TouchableOpacity
          onPress={() => [
            props.setVerified(false),
            props.navigation.navigate('confirmsignup', {
              phone: '+6' + props.phone,
            }),
          ]}
          style={{
            height: hp('5%'),
            width: wp('25%'),
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.LIGHT_BLUE,
            borderRadius: 10,
          }}>
          <Text style={[Typography.large]}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
