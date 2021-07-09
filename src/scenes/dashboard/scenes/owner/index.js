import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {scaleHeight} from '_styles';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {
  InvoiceButton,
  DataAnalyticsButton,
  MenuButton,
} from '_scenes/dashboard/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const OwnerDashboard = props => {
  return (
    <SafeAreaView
      style={{
        BackgroundColor: 'white',
        height: hp('100%'),
        weight: wp('100%'),
        alignItems: 'center',
        flex: 1,
      }}>
      <View
        style={{
          position: 'absolute',
          top: hp('5%'),
          left: wp('8%'),
        }}>
        <MenuButton
          userType={'owner'}
          updateAuthState={props.updateAuthState}
          navigation={props.navigation}></MenuButton>
      </View>
      <Image
        style={{
          top: hp('6%'),
          resizeMode: 'contain',
          width: wp('50%'),
          height: hp('11%'),
        }}
        source={require('_assets/images/agridata.png')}
      />
      <Text style={[Typography.welcome, {top: hp('10%')}]}>
        {Strings.welcome}
      </Text>
      <Text
        style={[
          Typography.largestSize,
          {
            top: hp('8%'),
            color: '#8EAB3D',
            textTransform: 'uppercase',
          },
        ]}>
        {props.user.retailerCompany.name}
      </Text>
      <Text style={[Typography.normal, {top: hp('10%')}]}>
        {Strings.whatToDo}
      </Text>
      <InvoiceButton top={90} navigation={props.navigation}></InvoiceButton>
      <DataAnalyticsButton
        top={90}
        navigation={props.navigation}></DataAnalyticsButton>
    </SafeAreaView>
  );
};
