import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {
  MarketplaceButton,
  ChatButton,
  ToDoButton,
  InvoiceButton,
  MenuButton,
} from '_scenes/dashboard/components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const AccountsDashboard = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          position: 'absolute',
          top: hp('5%'),
          left: wp('8%'),
        }}>
        <MenuButton
          navigation={props.navigation}
          updateAuthState={props.updateAuthState}
          userType={'accounts'}></MenuButton>
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
        {/*{props.user.retailerCompany.name}*/}
      </Text>
      <Text style={[Typography.normal, {top: hp('10%')}]}>
        {Strings.whatToDo}
      </Text>
      <ChatButton top={90} navigation={props.navigation}></ChatButton>
      <ToDoButton top={90} navigation={props.navigation}></ToDoButton>
      <InvoiceButton top={90} navigation={props.navigation}></InvoiceButton>
    </SafeAreaView>
  );
};
