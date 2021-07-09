import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {scaleHeight} from '_styles';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {
  MarketplaceButton,
  ChatButton,
  ToDoButton,
  InvoiceButton,
  MenuButton,
  DataAnalyticsButton,
} from '_scenes/dashboard/components';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const SupplierDashboard = props => {
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
          navigation={props.navigation}
          updateAuthState={props.updateAuthState}
          userType={'supplier'}></MenuButton>
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
        {props.user.supplierCompany.name}
      </Text>
      <Text style={[Typography.normal, {top: hp('10%')}]}>
        {Strings.whatToDo}
      </Text>
      <View style={{height: hp('45%'), top: hp('15%')}}>
        <ScrollView>
          <ToDoButton top={0} navigation={props.navigation}></ToDoButton>
          <MarketplaceButton
            top={0}
            navigation={props.navigation}></MarketplaceButton>
          <DataAnalyticsButton
            top={0}
            navigation={props.navigation}></DataAnalyticsButton>
          <InvoiceButton top={0} navigation={props.navigation}></InvoiceButton>
          <ChatButton top={0} navigation={props.navigation}></ChatButton>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
