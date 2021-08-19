import React, {useState, useEffect} from 'react';
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
  ScrollView,
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
import {useIsFocused} from '@react-navigation/native';
import {BlueButton} from '_components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
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
    {label: Strings.generalManager, value: 'General Manager'},
    {label: Strings.owner, value: 'Owner'},
    {label: Strings.retailManager, value: 'Retail Manager'},
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Supplier', value: 'supplier'}, //translation
    {label: Strings.supermarket, value: 'supermarket'},
    {label: Strings.farm, value: 'farm'},
  ]);

  const [createAccountButton, setCreateAccountButton] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyRegistrationNum, setCompanyRegistrationNum] = useState('');
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (value2 == 'supermarket') {
      setItems([
        {label: Strings.generalManager, value: 'General Manager'},
        {label: Strings.owner, value: 'Owner'},
        {label: Strings.retailManager, value: 'Retail Manager'},
      ]);
      log('works');
    } else {
      setItems([{label: Strings.owner, value: 'Owner'}]);
      log('hi');
      log(items2[1]);
    }
  }, [value2]);
  const signUp = async () => {
    try {
      const user = await Auth.signUp({
        username: '+6' + phone,
        password: password,
        attributes: {
          email: email,
          phone_number: '+6' + phone,
          name: name,
          'custom:role': value,
          'custom:companyName': companyName,
          'custom:companyType': value2,
          'custom:companyRegNum': companyRegistrationNum,
          'custom:companyAddress': companyAddress,
        },
      });
      log(user.userSub);
      props.navigation.navigate('confirmsignup', {phone: '+6' + phone});
      return user.userSub;
    } catch (error) {
      if (error.message == 'Invalid phone number format.') {
        setErrorText(Strings.invalidPhoneNum);
        setUnsuccessfulModal(true);
      } else if (
        error.message ==
        'An account with the given phone_number already exists.'
      ) {
        setErrorText(existingPhoneNum);
        setUnsuccessfulModal(true);
      }
      log('❌ Error signing up...', error);
    }
  };
  var hasNumber = /\d/;

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      resetScrollToCoords={{x: 0, y: 0}}
      scrollEnabled={false}
      extraHeight={hp('20%')}>
      {/* // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'position' : 'position'}
    //   keyboardVerticalOffset={Platform.OS === 'ios' ? hp('-20%') : hp('-25%')}> */}
      <SafeAreaView
        style={{
          backgroundColor: 'white',
          height: hp('100%'),
        }}>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            nestedScrollEnabled={true}
            scrollToOverflowEnabled={true}
            contentContainerStyle={
              Platform.OS == 'ios '
                ? {paddingBottom: 0}
                : {paddingBottom: hp('10%')}
            }>
            <View style={{flex: 1}}>
              <View
                style={{
                  position: 'absolute',
                  top: hp('1%'),
                  left: wp('5%'),
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
                <Text
                  style={[
                    Typography.largestSize,
                    {
                      width: wp('90%'),
                      left: wp('8%'),
                      top: hp('3%'),
                      lineHeight: hp('6%'),
                    },
                  ]}>
                  {Strings.createAccount}
                </Text>
              </View>
              <View style={{top: hp('5%'), left: wp('8%'), width: wp('70%')}}>
                <Text style={[Typography.large]}>{Strings.beginJourney}</Text>
              </View>

              <View
                style={
                  Platform.OS == 'ios'
                    ? {
                        top: hp('7%'),
                        height: hp('100%'),
                        zIndex: 1000,
                      }
                    : {
                        top: hp('7%'),
                        height: hp('100%'),
                      }
                }>
                <Input
                  name={Strings.name}
                  placeholder="eg. Hannah Wong"
                  state={name}
                  setState={setName}
                />

                <Input
                  name={Strings.contactNumber}
                  placeholder="123456789"
                  state={phone}
                  setState={setPhone}
                  left={wp('%')}
                  text="yes"
                  top={hp('2%')}
                />

                <Input
                  name={Strings.email}
                  placeholder="eg. example@example.com"
                  state={email}
                  setState={setEmail}
                  top={hp('4%')}
                />
                <View
                  style={{
                    top: hp('6%'),
                    left: wp('8%'),
                  }}>
                  <Text
                    style={[
                      Typography.placeholder,
                      {color: focus ? Colors.LIME_GREEN : Colors.GRAY_DARK},
                    ]}>
                    {Strings.password}
                  </Text>
                  <TextInput
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    placeholderTextColor={Colors.GRAY_DARK}
                    placeholder={Strings.password}
                    secureTextEntry={secure}
                    keyboardType="default"
                    underlineColorAndroid="transparent"
                    onChangeText={item => setPassword(item)}
                    value={password}
                    style={{
                      width: wp('80%'),
                      height: hp('6%'),
                      bottom: hp('1%'),
                      borderBottomColor: 'transparent',
                      color: 'black',
                    }}></TextInput>
                  <View
                    style={{
                      bottom: hp('2.5%'),
                      width: wp('80%'),
                      borderBottomWidth: 1,
                      borderColor: focus ? Colors.LIME_GREEN : Colors.GRAY_DARK,
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
                      right: wp('20%'),
                      position: 'absolute',
                      bottom: hp('3%'),
                    }}>
                    <Icon name="eye-outline" size={wp('6%')}></Icon>
                  </TouchableOpacity>
                </View>
                <Input
                  name={Strings.companyName}
                  placeholder="eg. City Grocer"
                  state={companyName}
                  setState={setCompanyName}
                  top={hp('5%')}
                />
                <View
                  style={
                    Platform.OS == 'ios'
                      ? {left: wp('7%'), zIndex: 1000, top: hp('7%')}
                      : {top: hp('7%'), left: wp('7%')}
                  }>
                  <View>
                    <Text style={[Typography.placeholder]}>
                      {Strings.companyType}
                    </Text>
                  </View>
                  <View
                    style={
                      Platform.OS == 'ios '
                        ? {
                            top: hp('1%'),
                            height: hp('7%'),
                            zIndex: 1000,
                          }
                        : {top: hp('1%'), height: hp('7%')}
                    }>
                    <DropDownPicker
                      open={open2}
                      value={value2}
                      items={items2}
                      setOpen={setOpen2}
                      setValue={setValue2}
                      setItems={setItems2}
                      dropDownDirection="BOTTOM"
                      listItemContainerStyle={{height: hp('5%')}}
                      style={{
                        width: wp('85%'),
                        height: hp('5%'),
                        borderColor: 'white',
                        borderRadius: 3,
                        backgroundColor: Colors.GRAY_LIGHT,
                      }}
                      zIndex={3000}
                      zIndexInverse={1000}
                      containerStyle={{}}
                      dropDownContainerStyle={{
                        borderWidth: 0,
                        width: wp('85%'),
                        height: hp('15%'),
                        backgroundColor: Colors.GRAY_LIGHT,
                      }}></DropDownPicker>
                  </View>
                </View>
                {value2 == null ? (
                  <View />
                ) : (
                  <View
                    style={
                      Platform.OS == 'ios'
                        ? {zIndex: 100, top: hp('8%')}
                        : {top: hp('8%')}
                    }>
                    <View style={{top: hp('0%'), left: wp('8%')}}>
                      <Text style={[Typography.placeholder]}>
                        {Strings.roleInCompany}
                      </Text>
                    </View>
                    <View
                      style={
                        Platform.OS == 'ios'
                          ? {
                              top: hp('1%'),
                              height: hp('7%'),
                              left: wp('7%'),
                              zIndex: 100,
                            }
                          : {top: hp('1%'), height: hp('7%'), left: wp('8%')}
                      }>
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
                          height: hp('5%'),
                          borderColor: 'white',
                          borderRadius: 3,
                          backgroundColor: Colors.GRAY_LIGHT,
                        }}
                        zIndex={2000}
                        zIndexInverse={2000}
                        dropDownDirection="BOTTOM"
                        listItemContainerStyle={{height: hp('5%')}}
                        dropDownContainerStyle={{
                          borderWidth: 1,
                          width: wp('85%'),
                          backgroundColor: Colors.GRAY_LIGHT,
                        }}></DropDownPicker>
                    </View>
                  </View>
                )}
                <Input
                  name={Strings.companyRegistrationNum}
                  placeholder="######"
                  state={companyRegistrationNum}
                  setState={setCompanyRegistrationNum}
                  top={hp('9%')}
                />
                <Input
                  name={Strings.companyAddress}
                  placeholder="eg. T1 Bundusan, Penampang Sabah"
                  state={companyAddress}
                  setState={setCompanyAddress}
                  top={hp('11%')}
                />
                <BlueButton
                  onPress={async () => {
                    if (
                      value == null ||
                      email == '' ||
                      phone == '' ||
                      name == '' ||
                      password == '' ||
                      companyName == '' ||
                      companyRegistrationNum == '' ||
                      companyAddress == '' ||
                      items == null ||
                      items2 == null
                    ) {
                      log('error');
                      setUnsuccessfulModal(true);
                      setErrorText(Strings.pleaseFillIn);
                    } else if (!phone.length > 5 || isNaN(phone)) {
                      setUnsuccessfulModal(true);
                      setErrorText(Strings.invalidPhoneNum);
                    } else if (!email.includes('@')) {
                      setUnsuccessfulModal(true);
                      setErrorText(Strings.invalidEmail);
                    } else if (password.length < 8) {
                      setUnsuccessfulModal(true);
                      setErrorText(Strings.invalidPassword);
                    } else if (!hasNumber.test(password)) {
                      setUnsuccessfulModal(true);
                      setErrorText(Strings.invalidPassword1);
                    } else {
                      log('succes');
                      signUp();
                    }
                  }}
                  text={Strings.next}
                  font={Typography.large}
                  borderRadius={10}
                  icon="arrow-forward-outline"
                  offsetCenter={wp('5%')}
                  top={hp('14%')}
                />
              </View>
              <Modal
                isVisible={createAccountButton}
                onBackdropPress={() => {
                  setCreateAccountButton(false);
                  props.navigation.navigate('verification');
                }}>
                <CreateAccountPopUp
                  setCreateAccountButton={
                    setCreateAccountButton
                  }></CreateAccountPopUp>
              </Modal>
              <Modal
                isVisible={unsuccessfulModal}
                onBackdropPress={() => setUnsuccessfulModal(false)}>
                <UnsuccessfulModal text={errorText} />
              </Modal>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
      {/* //</KeyboardAvoidingView> */}
    </KeyboardAwareScrollView>
  );
};

const CreateAccountPopUp = props => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          backgroundColor: Colors.GRAY_WHITE,
          width: wp('80%'),
          height: hp('60%'),
          top: hp('0%'),
          borderRadius: 10,
          alignItems: 'center',
        }}>
        <View>
          <View style={{top: hp('3%'), alignItems: 'center'}}>
            <Image
              source={require('_assets/images/verifycard.png')}
              style={{
                resizeMode: 'contain',
                width: wp('50%'),
                height: hp('20%'),
              }}
            />
          </View>
        </View>
        <Text
          style={[
            Typography.header,
            {
              width: wp('70%'),
              alignSelf: 'center',
              textAlign: 'center',
              top: hp('5%'),
            },
          ]}>
          {Strings.verification}
        </Text>

        <Text
          style={[
            Typography.normal,
            {
              width: wp('70%'),
              textAlign: 'center',
              top: hp('7%'),
            },
          ]}>
          {Strings.thanksVerification}
        </Text>
      </View>
    </View>
  );
};

const Input = props => {
  const [focus, setFocus] = useState(false);
  return (
    <View
      style={{
        left: wp('8%'),
        top: props.top,
      }}>
      <Text
        style={[
          Typography.placeholder,
          {color: focus ? Colors.LIME_GREEN : Colors.GRAY_DARK},
        ]}>
        {props.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: wp('80%'),
          height: hp('4%'),
        }}>
        {/* {props.text ? (
          <View
            style={{
              alignItems: 'center',
              height: hp('4%'),
              justifyContent: 'center',
            }}>
            <Text
              style={[
                Typography.small,
                {
                  top: hp('0.15%'),
                  color: focus ? Colors.LIME_GREEN : Colors.GRAY_DARK,
                },
              ]}>
              +6
            </Text>
          </View>
        ) : null} */}
        <TextInput
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          placeholderTextColor={Colors.GRAY_DARK}
          keyboardType="default"
          placeholder={props.placeholder}
          underlineColorAndroid="transparent"
          onChangeText={item => props.setState(item)}
          value={props.state}
          style={{
            paddingVertical: 0,

            left: props.left || 0,
            width: wp('80%'),
            height: hp('4%'),
            bottom: hp('0%'),
            color: 'black',
            borderBottomColor: 'transparent',
          }}></TextInput>
      </View>
      <View
        style={{
          bottom: hp('0%'),
          width: wp('80%'),
          borderBottomWidth: 1,
          borderColor: focus ? Colors.LIME_GREEN : Colors.GRAY_DARK,
        }}></View>
    </View>
  );
};

{
  /*   <View
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
            </View> */
}
