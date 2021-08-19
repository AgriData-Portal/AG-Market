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
import {
  DismissKeyboardView,
  UnsuccessfulModal,
  SuccessfulModal,
} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API, Auth} from 'aws-amplify';
import Strings from '_utils';
import {updateUser} from '../../../../graphql/mutations';
import {BlueButton} from '_components';
import {log} from '_utils';
import {userStore} from '_store';

export const EditPersonal = props => {
  const userName = userStore(state => state.userName);
  const userEmail = userStore(state => state.userEmail);
  const userID = userStore(state => state.userID);
  const [imageSource, setImageSource] = useState(null);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [number, setNumber] = useState(props.user.contactNumber);
  const [errorText, setErrorText] = useState('');
  const changeUserName = userStore(state => state.changeUserName);
  const changeUserEmail = userStore(state => state.changeUserEmail);

  function selectImage() {
    let options = {
      mediaType: 'photo',
      maxWidth: 256,
      maxHeight: 256,
    };

    launchImageLibrary(options, response => {
      log({response});
      if (response.didCancel) {
        log('User cancelled photo picker');
      } else if (response.error) {
        log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        log('User tapped custom button: ', response.customButton);
      } else {
        let photo = {uri: response.uri};
        log({photo});
        log(response.uri);
        setImageSource(response.uri);
      }
    });
  }

  const saveChanges = async () => {
    try {
      const editPersonal = await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userID,
            name: name,
            email: email,
          },
        },
      });
      log('success');
      changeUserName(name);
      changeUserEmail(email);
      setSuccessfulModal(true);
    } catch (e) {
      log(e);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={
        Platform.OS === 'ios' ? hp('0%') : null
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <SafeAreaView
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: hp('100%'),
          backgroundColor: 'white',
        }}>
        <DismissKeyboardView
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: hp('100%'),
            top: hp('-20%'),
          }}>
          {/*<View
            style={{
              flexDirection: 'row',
              top: hp('2%'),
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('100%'),
            }}>
            <View style={{left: wp('3%'), position: 'absolute'}}>
              <BackButton navigation={props.navigation} />
            </View>
            <View>
              <Text style={[Typography.header]}>
                Edit {Strings.personalProfile}
              </Text>
            </View>
          </View>*/}
          {/* <View
            style={{
              top: hp('5%'),
              alignItems: 'center',
              justifyContent: 'center',
              width: wp('50%'),
              height: hp('20%'),
            }}>
            {imageSource === null ? (
              <View>
                <Image source={require('_assets/images/company-logo.png')} />
                <TouchableOpacity
                  onPress={() => {
                    selectImage();
                  }}
                  style={{
                    top: hp('2%'),
                  }}>
                  <Text
                    style={[
                      Typography.normal,
                      {
                        textAlign: 'center',
                      },
                    ]}>
                    {Strings.changeImage}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <Image
                  source={{uri: imageSource}}
                  style={{
                    resizeMode: 'cover',
                    width: wp('50%'),
                    height: hp('20%'),
                    borderRadius: 100,
                  }}
                />
              </View>
            )}
          </View> */}
          <Image
            source={require('_assets/images/agridata.png')}
            style={{
              resizeMode: 'contain',
              width: wp('50%'),
              height: hp('20%'),
              top: hp('0%'),
            }}
          />
          <View
            style={{
              top: hp('0%'),
              backgroundColor: Colors.GRAY_MEDIUM,
              width: wp('85%'),
              height: hp('27%'),
              borderRadius: 10,
            }}>
            <View
              style={{
                top: hp('3%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.fullName}
              </Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder="John Smith"
                underlineColorAndroid="transparent"
                value={name}
                onChangeText={item => setName(item)}
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('6%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{borderColor: Colors.GRAY_DARK, borderBottomWidth: 1}}
              />
            </View>
            <View
              style={{
                top: hp('9%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
              <TextInput
                placeholderTextColor={Colors.GRAY_DARK}
                underlineColorAndroid="transparent"
                value={email}
                onChangeText={item => setEmail(item)}
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('6%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{borderColor: Colors.GRAY_DARK, borderBottomWidth: 1}}
              />
            </View>
            {/* <View
              style={{
                top: hp('11%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('4%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.contactNumber}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor={Colors.GRAY_DARK}
                placeholder="+60 11 6569 1999"
                value={number}
                onChangeText={item => setNumber(item)}
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('6%'),
                  color: 'black',
                }}></TextInput>
              <View
                style={{borderColor: Colors.GRAY_DARK, borderBottomWidth: 1}}
              />
            </View> */}
          </View>
          <BlueButton
            onPress={() => {
              if (name == '' || email == '' || number == '') {
                log('empty field');
                setErrorText('Please fill in all empty spaces!');
              } else if (
                !number.startsWith('+') ||
                !number.length > 5 ||
                isNaN(number.slice(1))
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
              } else {
                try {
                  saveChanges();
                  setSuccessfulModal(true);
                } catch {
                  e => log('error ' + e);
                }
              }
            }}
            text={Strings.saveChanges}
            icon={'checkmark-circle-outline'}
            offsetCenter={wp('5%')}
            borderRadius={10}
            font={Typography.small}
            top={hp('17%')}
          />

          <Modal
            isVisible={unsuccessfulModal}
            onBackdropPress={() => setUnsuccessfulModal(false)}>
            <UnsuccessfulModal text={errorText} />
          </Modal>
          <Modal
            isVisible={successfulModal}
            onBackdropPress={() => setSuccessfulModal(false)}>
            <SuccessfulModal
              setSuccessfulModal={setSuccessfulModal}
              text={
                'Your account will be updated in a few minutes. Please refresh the app to check on the changes'
              }
            />
          </Modal>
        </DismissKeyboardView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
