import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import DatePicker from 'react-native-datepicker';
import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {DismissKeyboard} from '_components';

const now = () => {
  const now = dayjs().format('DD-MM-YYYY');
  return now;
};

export const SortModal = props => {
  return (
    <View
      style={{
        position: 'absolute',
        right: wp('7%'),
        top: hp('17%'),
        backgroundColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
        width: wp('50%'),
        height: hp('16%'),
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('47%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="time-outline" size={wp('6%')} />
          <Icon name="arrow-up-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.oldest}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('47%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="time-outline" size={wp('6%')} />
          <Icon name="arrow-down-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.latest}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('47%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="pricetags-outline" size={wp('6%')} />
          <Icon name="arrow-up-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.leastExpensive}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          width: wp('47%'),
          height: hp('3.3%'),
          borderRadius: 20,
          marginHorizontal: wp('1.8%'),
          marginTop: hp('0.5%'),
        }}>
        <View style={{left: wp('3.5%'), flexDirection: 'row'}}>
          <Icon name="pricetags-outline" size={wp('6%')} />
          <Icon name="arrow-down-outline" size={wp('4%')} />
        </View>
        <Text style={[Typography.normal, {left: wp('6%')}]}>
          {Strings.mostExpensive}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
