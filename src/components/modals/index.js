import React from 'react';
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
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {BlueButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {UpdateAppModal} from './update-modal';
export {UpdateAppModal};

export const SuccessfulModal = props => {
  return (
    <View
      style={{
        height: hp('50%'),
        width: wp('85%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: hp('2%')}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: wp('55%'),
            height: hp('25%'),
          }}
        />
      </View>
      <View style={{top: hp('2%')}}>
        <Text style={[Typography.header]}>SUCCESS!</Text>
      </View>
      <View style={{width: wp('70%'), top: hp('4%')}}>
        <Text
          style={[
            {textAlign: 'center', lineHeight: wp('5%')},
            Typography.normal,
          ]}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export const SuccessNavigateChatModal = props => {
  return (
    <View
      style={{
        height: hp('65%'),
        width: wp('85%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: hp('2%')}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: wp('55%'),
            height: hp('25%'),
          }}
        />
      </View>
      <View style={{top: hp('2%')}}>
        <Text style={[Typography.header]}>SUCCESS!</Text>
      </View>
      <View style={{width: wp('70%'), top: hp('4%')}}>
        <Text
          style={[
            {textAlign: 'center', lineHeight: wp('5%')},
            Typography.normal,
          ]}>
          {props.text}
        </Text>
      </View>
      <BlueButton
        onPress={props.onPress}
        top={hp('10%')}
        text={'View In Chat'}></BlueButton>
    </View>
  );
};

export const UnsuccessfulModal = props => {
  return (
    <View
      style={{
        height: hp('65%'),
        width: wp('85%'),
        backgroundColor: Colors.LIGHT_RED,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: hp('4%')}}>
        <Image
          source={require('_assets/images/Bad-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: wp('55%'),
            height: hp('23%'),
          }}
        />
      </View>
      <View style={{top: hp('7%')}}>
        <Text style={[Typography.header]}>OOPS!</Text>
      </View>
      <View style={{width: wp('50%'), top: hp('9%')}}>
        <Text
          style={[
            {textAlign: 'center', lineHeight: hp('3%')},
            Typography.normal,
          ]}>
          {props.text}
        </Text>
      </View>
    </View>
  );
};

export const SuccesfulChangesModal = props => {
  return (
    <View
      style={{
        height: hp('50%'),
        width: wp('85%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: hp('2%')}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: wp('55%'),
            height: hp('25%'),
          }}
        />
      </View>
      <View style={{top: hp('2%')}}>
        <Text style={[Typography.header]}>SUCCESS!</Text>
      </View>
      <View
        style={{
          width: wp('70%'),
          top: hp('4%'),
        }}>
        <Text style={[Typography.normal, {textAlign: 'center'}]}>
          All Changes have been saved successfuly!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => [
          props.setSuccesfulChangesModal(false),
          props.navigation.navigate('dashboard'),
        ]}
        style={{
          top: hp('7%'),
          flexDirection: 'row',
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('55%'),
          height: hp('5%'),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}>
        <Text style={[Typography.normal, {textAlign: 'center'}]}>
          Back To Home
        </Text>
        <Icon name="home-outline" size={wp('5.5%')} style={{left: wp('3%')}} />
      </TouchableOpacity>
    </View>
  );
};

export const LoadingModal = props => {
  return (
    <Modal isVisible={props.isVisible}>
      <View
        style={{
          height: hp('100%'),
          width: wp('100%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{right: wp('3%')}}>
          <ActivityIndicator
            animating={true}
            size={wp('10%')}
            color={Colors.LIME_GREEN}
          />
        </View>
      </View>
    </Modal>
  );
};
