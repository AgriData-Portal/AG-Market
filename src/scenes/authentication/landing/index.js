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
import {BlueButton} from '_components';

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
            height: hp('20%'),
            width: wp('50%'),
          }}
        />
      </View>
      <BlueButton
        onPress={() => props.navigation.navigate('signup')}
        text={Strings.signUp}
        icon={'arrow-forward-outline'}
        minWidth={wp('50')}
        top={hp('15%')}
        font={Typography.normal}
      />
      <BlueButton
        onPress={() => props.navigation.navigate('signin')}
        text={Strings.logIn}
        icon={'arrow-forward-outline'}
        minWidth={wp('50')}
        top={hp('20%')}
        offsetCenter={wp('24%')}
        font={Typography.normal}
      />

      <Image
        source={require('_assets/images/greenproduce.png')}
        style={{
          resizeMode: 'contain',
          width: wp('80%'),
          height: hp('30%'),
          top: hp('30%'),
        }}
      />
    </SafeAreaView>
  );
};
