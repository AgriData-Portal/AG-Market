import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {NavBar} from '_components';
import {scaleHeight} from '_styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const DataAnalytics = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        alignItems: 'center',
        height: hp('100%'),
        width: wp('100%'),
      }}>
      <Text style={[Typography.header, {top: hp('3%'), right: wp('25%')}]}>
        {Strings.analytics}
      </Text>
      <View
        style={{
          height: hp('80%'),
          top: hp('3%'),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ScrollView>
          <Image
            style={{
              resizeMode: 'contain',
              height: hp('40%'),
              width: wp('100%'),
            }}
            source={require('_assets/images/expenses.png')}></Image>
          <Image
            style={{
              resizeMode: 'contain',
              height: hp('40%'),
              width: wp('100%'),
            }}
            source={require('_assets/images/price.png')}></Image>
          <Image
            style={{
              top: hp('2%'),
              resizeMode: 'contain',
              height: hp('45%'),
              width: wp('100%'),
              marginBottom: hp('10%'),
              left: wp('3%'),
            }}
            source={require('_assets/images/supplier.png')}></Image>
        </ScrollView>
      </View>
      <View style={{position: 'absolute', top: hp('90%')}}>
        <NavBar navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
};
