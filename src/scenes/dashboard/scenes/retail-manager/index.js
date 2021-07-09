import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {scaleHeight} from '_styles';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {
  MarketplaceButton,
  ChatButton,
  ToDoButton,
  InvoiceButton,
  MenuButton,
} from '_scenes/dashboard/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const RetailManagerDashboard = props => {
  console.log(props.user);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        height: hp('100%'),
        width: wp('100%'),
      }}>
      <View
        style={{
          position: 'absolute',
          top: hp('5%'),
          left: wp('8%'),
        }}>
        <MenuButton
          userType={'retail-manager'}
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
      <ChatButton top={90} navigation={props.navigation}></ChatButton>
      <ToDoButton top={90} navigation={props.navigation}></ToDoButton>
      <MarketplaceButton
        top={90}
        navigation={props.navigation}></MarketplaceButton>
    </SafeAreaView>
  );
};
