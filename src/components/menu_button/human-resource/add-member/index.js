import React, {useState, useEffect} from 'react';
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
  AddButton,
  SuccessfulModal,
  UnsuccessfulModal,
  SuccesfulChangesModal,
} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';
import {ChatButton} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {DismissKeyboardView} from '_components';
import Strings from '_utils';

import {Auth, API} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {createUser} from '../../../../graphql/mutations';
import {BlueButton} from '_components';
import {log} from '_utils';
//modal issues
export const AddEmployeeButton = props => {
  const [addEmployeeButtonModal, setAddEmployeeButtonModal] = useState(false);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);

  return (
    <View>
      <BlueButton
        onPress={() => [setAddEmployeeButtonModal(true)]}
        backgroundColor={Colors.GRAY_LIGHT}
        flexDirection={'row-reverse'}
        text={Strings.addNewTeamMember}
        icon={'add-circle-outline'}
        offsetCenter={wp('5%')}
        font={Typography.normal}
        textColor={Colors.LIME_GREEN}
        position={'absolute'}
      />

      <Modal
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        isVisible={addEmployeeButtonModal}>
        <AddEmployeeButtonModal
          setAddEmployeeButtonModal={setAddEmployeeButtonModal}
          navigation={props.navigation}
          user={props.user}
          company={props.company}
          setSuccesfulChangesModal={setSuccesfulChangesModal}
          setTeamList={props.setTeamList}
        />
      </Modal>
    </View>
  );
};

export const AddEmployeeButtonModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [errorText, setErrorText] = useState('');

  const [items, setItems] = useState([
    {label: 'Receiver', value: 'Receiver'},
    {label: 'Retail Manager', value: 'Retail Manager'},
    {label: 'General Manager', value: 'General Manager'},
    {label: 'Accounts', value: 'Accounts'},
    {label: 'Owner', value: 'Owner'},
  ]);
  const [role, setRole] = useState(items[0].value);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);

  useEffect(() => {
    log('useEffect');
    if (props.user.retailerCompanyID != null) {
    } else if (props.user.supplierCompanyID != null) {
      setItems([
        {label: 'Sales Manager', value: 'Sales Manager'},
        {label: 'Delivery Man', value: 'Delivery Man'},
        {label: 'Accounts', value: 'Accounts'},
        {label: 'Owner', value: 'Owner'},
      ]);
      setRole('Sales Manager');
    } else if (props.user.farmerCompanyID != null) {
      setItems([
        {label: 'Accounts', value: 'Accounts'},
        {label: 'Owner', value: 'Owner'},
      ]);
      setRole('Accounts');
    }
  }, []);

  const addUser = async () => {
    try {
      log('+60' + phone);
      log(role);
      const user = await Auth.signUp({
        username: '+60' + phone,
        password: 'agridata2020',
        attributes: {
          email: email,
          phone_number: '+60' + phone,
          'custom:role': role,
          'custom:companyName': props.company.name,
          'custom:companyType': 'AGRIDATA2020',
          'custom:companyRegNum': props.company.registrationNumber,
          'custom:companyAddress': props.company.address,
          name: name,
        },
      });
      log(user);
      if (props.user.retailerCompanyID != null) {
        try {
          const createdUser = await API.graphql({
            query: createUser,
            variables: {
              input: {
                name: name,
                retailerCompanyID: props.user.retailerCompanyID,
                contactNumber: '+60' + phone,
                id: user.userSub,
                role: role,
                email: email,
              },
            },
          });
          setSuccessfulModal(true);
        } catch (e) {
          log(e);
        }
      } else if (props.user.supplierCompanyID != null) {
        try {
          const createdUser = await API.graphql({
            query: createUser,
            variables: {
              input: {
                name: name,
                supplierCompanyID: props.user.supplierCompanyID,
                contactNumber: '+60' + phone,
                id: user.userSub,
                role: role,
                email: email,
              },
            },
          });
          setSuccessfulModal(true);
        } catch (e) {
          log(e);
        }
      } else if (props.user.farmerCompanyID != null) {
        try {
          const createdUser = await API.graphql({
            query: createUser,
            variables: {
              input: {
                name: name,
                farmerCompanyID: props.user.farmerCompanyID,
                contactNumber: '+60' + phone,
                id: user.userSub,
                role: role,
                email: email,
              },
            },
          });
          setSuccessfulModal(true);
        } catch (e) {
          log(e);
        }
      } else {
        log('no company id was found');
      }
    } catch (e) {
      log(e);
    }

    //props.setTeamList(list => [...list, user]);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('-25%') : null
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <View
        style={{
          height: hp('85%'),
          width: wp('90%'),
          backgroundColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            left: wp('40%'),
          }}>
          <CloseButton setModal={props.setAddEmployeeButtonModal} />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={[Typography.header]}>{Strings.addNewMember}</Text>
        </View>
        <View
          style={{
            width: wp('80%'),
            height: hp('40%'),
            borderRadius: 10,
          }}>
          <View
            style={{
              top: hp('2%'),
              left: wp('6%'),
              width: wp('70%'),
            }}>
            <View
              style={{
                width: wp('70%'),
                top: hp('2%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.fullName}</Text>
              <TextInput
                placeholder={'eg. Hannah Wong'}
                onChangeText={item => setName(item)}
                value={name}
                underlineColorAndroid="transparent"
                style={{
                  paddingVertical: 0,
                  borderBottomColor: 'transparent',
                  width: wp('70%'),
                  height: hp('4%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                width: wp('70%'),
                top: hp('4%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.email}</Text>
              <TextInput
                onChangeText={item => setEmail(item)}
                value={email}
                underlineColorAndroid="transparent"
                placeholder="eg. example@gmail.com"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('70%'),
                  paddingVertical: 0,
                  height: hp('4%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                width: wp('70%'),
                top: hp('6%'),
              }}>
              <Text style={[Typography.placeholder]}>
                {Strings.contactNumber}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={[Typography.small, {top: hp('1%')}]}>+60</Text>
                <TextInput
                  onChangeText={item => setPhone(item)}
                  value={phone}
                  underlineColorAndroid="transparent"
                  style={{
                    paddingVertical: 0,
                    borderBottomColor: 'transparent',
                    width: wp('60%'),
                    height: hp('4%'),
                    color: 'black',
                    left: wp('0.5%'),
                  }}></TextInput>
              </View>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View style={{top: hp('8%')}}>
              <DropDownPicker
                open={open}
                value={role}
                items={items}
                placeholder={Strings.roleInCompany}
                setOpen={setOpen}
                setValue={setRole}
                setItems={setItems}
                style={{
                  width: wp('60%'),
                  height: hp('6%'),
                  borderColor: 'white',
                  borderRadius: 3,
                  backgroundColor: Colors.GRAY_LIGHT,
                }}
                dropDownDirection="BOTTOM"
                listItemContainerStyle={{height: hp('4%')}}
                dropDownContainerStyle={{
                  borderWidth: 1,
                  width: wp('60%'),
                  backgroundColor: Colors.GRAY_LIGHT,
                }}></DropDownPicker>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (name == '' || email == '' || phone == '') {
              log('empty field');
              setUnsuccessfulModal(true);
              setErrorText('Please fill in all empty spaces!');
            } else if (phone.length < 7 || isNaN(phone.slice(1))) {
              log(phone);
              setUnsuccessfulModal(true);
              setErrorText(
                'Sorry you have entered an invalid phone number. Please try again.',
              );
            } else if (!email.includes('@')) {
              setUnsuccessfulModal(true);
              setErrorText(
                'Sorry you have entered an invalid email address. Please try again.',
              );
            } else {
              addUser();
            }
          }}
          style={{
            top: hp('22%'),
            width: wp('30%'),
            height: hp('5%'),
            backgroundColor: Colors.LIGHT_BLUE,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,

            elevation: 4,
          }}>
          <Text>{Strings.add}</Text>
          <Icon
            name="checkmark-circle-outline"
            size={wp('5.5%')}
            style={{left: wp('3%')}}
          />
        </TouchableOpacity>
        <Modal
          isVisible={unsuccessfulModal}
          onBackdropPress={() => setUnsuccessfulModal(false)}>
          <UnsuccessfulModal text={errorText} />
        </Modal>
        <Modal
          isVisible={successfulModal}
          onBackdropPress={() => [
            setSuccessfulModal(false),
            props.setAddEmployeeButtonModal(false),
          ]}>
          <SuccessfulModal
            setSuccessfulModal={setSuccessfulModal}
            navigation={props.navigation}
            text="You have successsfully added a new member!"
          />
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};
