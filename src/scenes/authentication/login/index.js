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
      const user = await Auth.signIn(email, password);
      console.log(user);
      console.log('Successful sign in');
      props.updateUserID(user.username);
      props.setUserAttributes(user.attributes);

      //props.updateAuthState('loggedIn'); //fucking weird
    } catch (error) {
      setLoading(false);
      if (error.code == 'UserNotConfirmedException') {
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
      }
      console.log('Error signing in...', error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('-40%') : hp('-30%%')}>
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
              <Text style={{top: hp('1%')}}>+60</Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                keyboardType="default"
                placeholder="109125654"
                underlineColorAndroid="transparent"
                onChangeText={item => setPhone(item)}
                value={phone}
                style={{
                  width: wp('80%'),
                  height: hp('7%'),
                  borderBottomColor: 'transparent',
                  color: 'black',
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
            style={{top: hp('15%'), right: wp('7%')}}>
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
        <View
          style={{
            alignItems: 'center',
            top: hp('23%'),
          }}>
          <TouchableOpacity
            onPress={() => {
              if (password == '' || phone == '') {
                console.log('empty input');
                setUnsuccessfulModal(true);
                setErrorText('Please fill in all empty spaces!');
              } else {
                signIn();
              }
            }}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('40%'),
              height: hp('5%'),
              justifyContent: 'center',
              borderRadius: 10,
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
              shadowColor: 'grey',
            }}>
            <View style={{flexDirection: 'row', left: wp('6%')}}>
              <Text style={[Typography.large]}>{Strings.logIn}</Text>
              <View style={{position: 'absolute', left: wp('25%')}}>
                <Icon name="arrow-forward-outline" size={wp('6%')} />
              </View>
            </View>
          </TouchableOpacity>
        </View>

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
    </KeyboardAvoidingView>
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
            props.navigation.navigate('confirmsignup', {phone: props.phone}),
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
