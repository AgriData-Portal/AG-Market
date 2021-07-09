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
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {SuccesfulChangesModal} from '_components/modals';
import Modal from 'react-native-modal';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const EditCompany = props => {
  const [imageSource, setImageSource] = useState(null);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);

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
        Platform.OS === 'ios' ? hp('5%') : hp('5%')
      } /* Keyboard Offset needs to be tested against multiple phones */
    >
      <DismissKeyboardView>
        <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
          <View
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
                Edit {Strings.companyProfile}
              </Text>
            </View>
          </View>
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
                  }}>
                  <Text style={{textAlign: 'center', top: hp('2%')}}>
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
              height: hp('45%'),
              borderRadius: 10,
            }}>
            <View
              style={{
                top: hp('3%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
                borderColor: Colors.GRAY_DARK,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyName}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('5%'),
                  color: 'black',
                }}></TextInput>
            </View>
            <View
              style={{
                top: hp('6%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
                borderColor: Colors.GRAY_DARK,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyRegistrationNum}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('5%'),
                  color: 'black',
                }}></TextInput>
            </View>
            <View
              style={{
                top: hp('9%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
                borderColor: Colors.GRAY_DARK,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyAddress}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('5%'),
                  color: 'black',
                }}></TextInput>
            </View>
            <View
              style={{
                top: hp('12%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
                borderColor: Colors.GRAY_DARK,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.contactNumber}
              </Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('5%'),
                  color: 'black',
                }}></TextInput>
            </View>
            <View
              style={{
                top: hp('15%'),
                left: wp('5%'),
                width: wp('75%'),
                height: hp('5%'),
                borderColor: Colors.GRAY_DARK,
                borderBottomWidth: 1,
                justifyContent: 'center',
              }}>
              <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
              <TextInput
                underlineColorAndroid="transparent"
                style={{
                  borderBottomColor: 'transparent',
                  width: wp('75%'),
                  height: hp('5%'),
                  color: 'black',
                }}></TextInput>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => setSuccesfulChangesModal(true)}
            style={{
              top: hp('15%'),
              width: wp('50%'),
              height: wp('11%'),
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

              elevation: 4,
            }}>
            <Text>{Strings.saveChanges}</Text>
            <Icon
              name="checkmark-circle-outline"
              size={wp('5%')}
              style={{left: wp('3%')}}
            />
          </TouchableOpacity>
          <Modal
            isVisible={succesfulChangesModal}
            onBackdropPress={() => setSuccesfulChangesModal(false)}>
            <SuccesfulChangesModal
              setSuccesfulChangesModal={setSuccesfulChangesModal}
              navigation={props.navigation}
            />
          </Modal>
        </SafeAreaView>
      </DismissKeyboardView>
    </KeyboardAvoidingView>
  );
};
