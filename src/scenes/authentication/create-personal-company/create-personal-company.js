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
import {BackButton, UnsuccessfulModal} from '_components';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {createUser} from '../../../graphql/mutations';
import {API, Auth, graphql} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {DismissKeyboardView} from '_components';
import Modal from 'react-native-modal';
import {log} from '_utils';

export const Registration = props => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [secure, setSecure] = useState(true);
  const [items, setItems] = useState([
    {label: Strings.generalManager, value: 'generalmanager'},
    {label: Strings.owner, value: 'owner'},
    {label: Strings.retailManager, value: 'retailmanager'},
  ]);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const signUp = async () => {
    try {
      const user = await Auth.signUp({
        username: phone,
        password: password,
        attributes: {
          email: email,
          phone_number: phone,
          'custom:role': value,
          name: name,
        },
      });
      log(user.userSub);
      props.navigation.navigate('confirmsignup');
      return user.userSub;
    } catch (error) {
      if (error.message == 'Invalid phone number format.') {
        setErrorText(
          'Sorry you have entered an invalid phone number. Please try again.',
        );
        setUnsuccessfulModal(true);
      }
      if (
        error.message ==
        'An account with the given phone_number already exists.'
      ) {
        setErrorText(
          'Sorry an account with the given number already exist. Please contact us for support.',
        );
        setUnsuccessfulModal(true);
      }
      log('❌ Error signing up...', error);
    }
  };
  var hasNumber = /\d/;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('-20%') : hp('-30%')}>
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          height: hp('100%'),
          width: wp('100%'),
        }}>
        <View
          style={{
            position: 'absolute',
            top: Spacing.BackButtonTop,
            left: Spacing.BackButtonLeft,
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
            top: hp('-8%'),
          }}
        />
        <View style={{top: hp('3%')}}>
          <View>
            <Text
              style={[
                Typography.largestSize,
                {
                  width: wp('70%'),
                  left: wp('8%'),
                  top: hp('3%'),
                  lineHeight: hp('5.5%'),
                },
              ]}>
              {Strings.createAccount}
            </Text>
          </View>
          <View style={{top: hp('2%'), left: wp('8%'), width: wp('70%')}}>
            <Text style={[Typography.large]}>{Strings.beginJourney}</Text>
          </View>
          <View style={{top: hp('4%'), height: hp('65%')}}>
            <View
              style={{
                left: wp('8%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.name}</Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                keyboardType="default"
                placeholder="John Doe"
                underlineColorAndroid="transparent"
                onChangeText={item => setName(item)}
                value={name}
                style={{
                  width: wp('80%'),
                  height: hp('6%'),
                  color: 'black',
                  borderBottomColor: 'transparent',
                }}></TextInput>
              <View
                style={{
                  bottom: hp('1.5%'),
                  width: wp('85%'),
                  borderBottomWidth: 1,
                  borderColor: Colors.GRAY_DARK,
                }}></View>
            </View>
            <View
              style={{
                top: hp('0.5%'),
                left: wp('8%'),
              }}>
              <Text style={[Typography.placeholder]}>
                {Strings.contactNumber}
              </Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                keyboardType="default"
                placeholder="+60109336377"
                underlineColorAndroid="transparent"
                onChangeText={item => setPhone(item)}
                value={phone}
                style={{
                  width: wp('50%'),
                  height: hp('6%'),
                  color: 'black',
                  borderBottomColor: 'transparent',
                }}></TextInput>
              <View
                style={{
                  bottom: hp('1.5%'),
                  width: wp('85%'),
                  borderBottomWidth: 1,
                  borderColor: Colors.GRAY_DARK,
                }}></View>
            </View>
            <View
              style={{
                top: hp('0.5%'),
                left: wp('8%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.email}</Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                keyboardType="default"
                placeholder="example@example.com"
                underlineColorAndroid="transparent"
                onChangeText={item => setEmail(item)}
                value={email}
                style={{
                  width: wp('50%'),
                  height: hp('6%'),
                  color: 'black',
                  borderBottomColor: 'transparent',
                }}></TextInput>
              <View
                style={{
                  bottom: hp('1.5%'),
                  width: wp('85%'),
                  borderBottomWidth: 1,
                  borderColor: Colors.GRAY_DARK,
                }}></View>
            </View>
            <View
              style={{
                top: hp('0.5%'),
                left: wp('8%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.password}</Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                keyboardType="default"
                placeholder="password"
                secureTextEntry={secure}
                underlineColorAndroid="transparent"
                onChangeText={item => setPassword(item)}
                value={password}
                style={{
                  width: wp('50%'),
                  height: hp('6%'),
                  color: 'black',
                  borderBottomColor: 'transparent',
                }}></TextInput>
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
              <View
                style={{
                  bottom: hp('1.5%'),
                  width: wp('85%'),
                  borderBottomWidth: 1,
                  borderColor: Colors.GRAY_DARK,
                }}></View>
            </View>
            <View
              style={{
                left: wp('8%'),

                height: hp('20%'),

                width: wp('80%'),
                height: hp('7%'),
              }}>
              <DropDownPicker
                open={open}
                value={value}
                items={items}
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder={Strings.roleInCompany}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                style={{
                  width: wp('85%'),
                  height: hp('6%'),
                  borderColor: 'white',
                  borderRadius: 3,
                  backgroundColor: Colors.GRAY_LIGHT,
                }}
                dropDownDirection="BOTTOM"
                listItemContainerStyle={{height: hp('5%')}}
                dropDownContainerStyle={{
                  borderWidth: 1,

                  width: wp('85%'),
                  backgroundColor: Colors.GRAY_LIGHT,
                }}></DropDownPicker>
            </View>
          </View>
          {/*   <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                bottom: hp('4%'),
                width: wp('85%'),
                left: wp('8%'),
                top: hp('10%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.byContinuing}
              </Text>
              <View
                style={{
                  bottom: hp('1%'),
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  <Text
                    style={[
                      Typography.placeholderSmall,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {Strings.termsOfService}
                  </Text>
                </TouchableOpacity>
                <Text
                  style={[
                    Typography.placeholderSmall,
                    {marginLeft: wp('1%'), marginRight: wp('1%')},
                  ]}>
                  {Strings.and}
                </Text>
                <TouchableOpacity>
                  <Text
                    style={[
                      Typography.placeholderSmall,
                      {textDecorationLine: 'underline'},
                    ]}>
                    {Strings.privacyPolicy}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{alignItems: 'center', top: hp('12%')}}>
              <TouchableOpacity>
                <Text style={[Typography.placeholderSmall]}>
                  {Strings.havingTrouble}
                </Text>
              </TouchableOpacity>
            </View> */}
          <TouchableOpacity
            onPress={async () => {
              if (
                value == null ||
                email == '' ||
                phone == '' ||
                name == '' ||
                password == ''
              ) {
                log('error');
                setUnsuccessfulModal(true);
                setErrorText('Please fill in all empty spaces!');
              } else if (
                !phone.startsWith('+') ||
                !phone.length > 5 ||
                isNaN(phone.slice(1))
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
                log('succes');
                signUp();
              }
            }}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,

              top: hp('0%'),
              width: wp('30%'),
              height: hp('5%'),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 10,
              flexDirection: 'row',
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
              shadowColor: 'grey',
              elevation: 3,
              zIndex: 2,
            }}>
            <Text
              style={[
                Typography.large,
                {position: 'absolute', left: wp('3%')},
              ]}>
              {Strings.next}
            </Text>

            <Icon
              name="arrow-forward-outline"
              size={wp('6%')}
              style={{left: wp('10%')}}
            />
          </TouchableOpacity>
          <Modal
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal text={errorText} />
          </Modal>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
