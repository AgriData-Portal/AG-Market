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
import {Font} from '_components';

import {UpdateAppModal} from './update-modal';
export {UpdateAppModal};
import DetailsModal from './details-modal';

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
      {/* TRANSLATION */}
      <View style={{top: hp('2%')}}>
        <Font.Header>SUCCESS!</Font.Header>
      </View>
      <View style={{width: wp('70%'), top: hp('4%')}}>
        <Font.Normal style={{textAlign: 'center', lineHeight: wp('5%')}}>
          {props.text}
        </Font.Normal>
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
        <Font.Header>SUCCESS!</Font.Header>
      </View>
      <View style={{width: wp('70%'), top: hp('4%')}}>
        <Font.Normal style={{textAlign: 'center', lineHeight: wp('5%')}}>
          {props.text}
        </Font.Normal>
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
        <Font.Header>OOPS!</Font.Header>
      </View>
      <View style={{width: wp('50%'), top: hp('9%')}}>
        <Font.Normal style={{textAlign: 'center', lineHeight: hp('3%')}}>
          {props.text}
        </Font.Normal>
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
        <Font.Header>SUCCESS!</Font.Header>
      </View>
      {/* TRANSLATION */}
      <View
        style={{
          width: wp('70%'),
          top: hp('4%'),
        }}>
        <Font.Normal style={{textAlign: 'center'}}>
          All Changes have been saved successfuly!
        </Font.Normal>
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
        <Font.Normal style={{textAlign: 'center'}}>Back To Home</Font.Normal>
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

export {DetailsModal};
