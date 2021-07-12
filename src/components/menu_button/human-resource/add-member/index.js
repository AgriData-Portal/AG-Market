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

//modal issues
export const AddEmployeeButton = props => {
  const [addEmployeeButtonModal, setAddEmployeeButtonModal] = useState(false);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setAddEmployeeButtonModal(true)}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: wp('65%'),
        height: hp('5%'),
        bottom: hp('2%'),
        backgroundColor: Colors.GRAY_LIGHT,
        borderRadius: 10,
      }}>
      <Icon name="add-circle-outline" size={wp('5.5%')} />
      <Text
        style={[Typography.normal, {left: wp('0%'), color: Colors.LIME_GREEN}]}>
        {Strings.addNewTeamMember}
      </Text>

      <Modal
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        isVisible={addEmployeeButtonModal}>
        <AddEmployeeButtonModal
          setAddEmployeeButtonModal={setAddEmployeeButtonModal}
          navigation={props.navigation}
          user={props.user}
          setSuccesfulChangesModal={setSuccesfulChangesModal}
        />
      </Modal>
    </TouchableOpacity>
  );
};

export const AddEmployeeButtonModal = props => {
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState('retailemployee');
  const [items, setItems] = useState([
    {label: 'Retail Employee', value: 'retailemployee'},
    {label: 'Retail Manager', value: 'retailmanager'},
    {label: 'General Manager', value: 'generalmanager'},
    {label: 'Accounts', value: 'accounts'},
  ]);
  const addUser = async () => {
    var user = null;
    try {
      user = await Auth.signUp({
        username: phone,
        password: 'agridata2020',
        attributes: {
          email,
          phone_number: phone,
          'custom:role': role,
          name: name,
        },
      });
      console.log(user.userSub);
    } catch (error) {
      console.log('❌ Error signing up...', error);
    }
    try {
      const createdUser = await API.graphql({
        query: createUser,
        variables: {
          input: {
            name: name,
            retailerCompanyID: props.user.retailerCompanyID,
            contactNumber: phone,
            id: user.userSub,
            role: role,
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('-10%') : hp('-200%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <View
        style={{
          height: hp('70%'),
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
              }}>
              <Text style={[Typography.placeholder]}>{Strings.fullName}</Text>
              <TextInput
                onChangeText={item => setName(item)}
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('70%'),
                  height: hp('7%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  bottom: hp('2%'),
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                width: wp('70%'),
              }}>
              <Text style={[Typography.placeholder]}>{Strings.email}</Text>
              <TextInput
                onChangeText={item => setEmail(item)}
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('70%'),
                  height: hp('7%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  bottom: hp('2%'),
                  borderBottomWidth: 1,
                }}
              />
            </View>
            <View
              style={{
                width: wp('70%'),
              }}>
              <Text style={[Typography.placeholder]}>
                {Strings.contactNumber}
              </Text>
              <TextInput
                onChangeText={item => setPhone(item)}
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('70%'),
                  height: hp('7%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{
                  borderColor: Colors.GRAY_DARK,
                  bottom: hp('2%'),
                  borderBottomWidth: 1,
                }}
              />
            </View>
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

        <TouchableOpacity
          onPress={() => [addUser(), setSuccessfulModal(true)]}
          style={{
            top: hp('12%'),
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
