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

export const EditPersonal = props => {
  const [imageSource, setImageSource] = useState(null);
  const [successfulModal, setSuccessfulModal] = useState(false);
  const [unsuccessfulModal, setUnsuccessfulModal] = useState(false);
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.route.params.email);
  const [number, setNumber] = useState(props.user.contactNumber);
  const [errorText, setErrorText] = useState('');

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

  const saveChanges = async () => {
    try {
      const editPersonal = await API.graphql({
        query: updateUser,
        variables: {
          input: {
            id: props.user.id,
            name: name,
            contactNumber: number,
          },
        },
      });
      console.log('success');
      var temp = props.user;
      temp.name = name;
      temp.contactNumber = number;
      props.setUserDetails(temp);
      setSuccessfulModal(true);
    } catch (e) {
      console.log(e);
    }
  };

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
          <View
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
          </View>
          <View
            style={{
              top: hp('10%'),
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

          <TouchableOpacity
            onPress={() => {
              if (name == '' || email == '' || number == '') {
                console.log('empty field');
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
                  e => console.log('error ' + e);
                }
              }
            }}
            style={{
              alignSelf: 'center',
              top: hp('18%'),
              width: wp('55%'),
              height: hp('5%'),
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
              zIndex: 5,
              elevation: 4,
            }}>
            <Text>{Strings.saveChanges}</Text>
            <Icon
              name="checkmark-circle-outline"
              size={wp('5.5%')}
              style={{left: wp('4%')}}
            />
          </TouchableOpacity>
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
