import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Mixins, Typography} from '_styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const Landing = props => {
  return (
    <SafeAreaView
      style={{
        height: hp('100%'),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{position: 'absolute', top: hp('15%')}}>
        <Image
          source={require('_assets/images/agridata.png')}
          style={{
            resizeMode: 'contain',
            height: Mixins.scaleHeight(140),
            width: Mixins.scaleWidth(200),
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('signup')}
        style={{
          position: 'absolute',
          top: hp('45%'),
          width: wp('50%'),
          height: hp('5%'),
          backgroundColor: '#E2EDFE',
          borderRadius: 20,
          elevation: 3,
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 2,
        }}>
        <Text
          style={[
            Typography.normal,
            {
              marginLeft: wp('4%'),
            },
          ]}>
          {Strings.signUp}
        </Text>
        <View style={{position: 'absolute', right: wp('3%')}}>
          <Icon size={wp('6%')} name="arrow-forward-outline" />
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('signin')}
        style={{
          position: 'absolute',
          top: hp('53%'),
          width: wp('50%'),
          height: hp('5%'),
          backgroundColor: '#E2EDFE',
          borderRadius: 20,
          elevation: 3,
          alignItems: 'center',
          flexDirection: 'row',
          zIndex: 2,
        }}>
        <Text
          style={[
            Typography.normal,
            {
              marginLeft: wp('4%'),
            },
          ]}>
          {Strings.logIn}
        </Text>
        <View style={{position: 'absolute', right: wp('3%')}}>
          <Icon size={wp('6%')} name="arrow-forward-outline" />
        </View>
      </TouchableOpacity>

      <View
        style={{
          top: hp('30%'),
        }}>
        <Image
          source={require('_assets/images/greenproduce.png')}
          style={{
            resizeMode: 'contain',
            width: wp('80%'),
          }}
        />
      </View>
    </SafeAreaView>
  );
};
