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
import DropDownPicker from 'react-native-dropdown-picker';
import {Auth} from 'aws-amplify';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const Verification = props => {
  const signOut = async () => {
    try {
      await Auth.signOut();
      props.updateAuthState('loggedOut');
      console.log('Logged Out');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'position' : 'position'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? hp('-40%') : -180}>
      <SafeAreaView>
        <View style={{top: hp('10%'), alignItems: 'center'}}>
          <Image
            source={require('_assets/images/verifycard.png')}
            style={{
              resizeMode: 'contain',
              width: wp('60%'),
              height: hp('20%'),
            }}
          />
        </View>

        <View
          style={{
            top: hp('4%'),
            alignItems: 'center',
            zIndex: 20,
            height: hp('60%'),
          }}>
          <Text
            style={[
              Typography.welcome,
              {
                fontSize: 25,
                top: hp('7%'),
                textAlign: 'center',
                width: wp('70%'),
              },
            ]}>
            {Strings.verification}
          </Text>

          <View
            style={{
              top: hp('10%'),
              width: wp('75%'),
              height: hp('20%'),
            }}>
            <Text style={[Typography.medium, {textAlign: 'center'}]}>
              {Strings.hangInThere}
            </Text>
            <View
              style={{
                top: hp('2%'),
              }}>
              <Text style={[Typography.medium, {textAlign: 'center'}]}>
                {Strings.inTheMeantime}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('companyprofile')}
            style={{
              alignItems: 'center',
              top: hp('10%'),
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('45%'),
              height: hp('5.5%'),
              justifyContent: 'center',
              borderRadius: 10,
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
              shadowColor: 'grey',
              zIndex: 22,
              elevation: 2,
            }}>
            <Text style={[Typography.normal]}>{Strings.updateCompany}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            style={{
              alignItems: 'center',
              top: hp('13%'),
              backgroundColor: Colors.LIGHT_BLUE,
              width: wp('45%'),
              height: hp('5.5%'),
              justifyContent: 'center',
              borderRadius: 10,
              shadowOffset: {
                width: 1,
                height: 2,
              },
              shadowOpacity: 2,
              shadowRadius: 3,
              shadowColor: 'grey',
              elevation: 2,
              zIndex: 22,
            }}>
            <Text style={[Typography.normal]}>{Strings.logOut}</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            top: hp('65%'),
            right: wp('0%'),
            position: 'absolute',
          }}>
          <Image
            source={require('_assets/images/fruits1.png')}
            style={{
              resizeMode: 'cover',
              width: wp('70%'),
              height: hp('35%'),
            }}
          />
        </View>
        <View
          style={{
            top: hp('78%'),
            right: wp('35%'),
            position: 'absolute',
            transform: [{scaleY: -1}],
          }}>
          <Image
            source={require('_assets/images/fruits3.png')}
            style={{
              resizeMode: 'cover',
              width: wp('75%'),
              height: hp('40%'),
            }}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
