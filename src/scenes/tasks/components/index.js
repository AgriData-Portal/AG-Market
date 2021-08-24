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
import {Font} from '_components';

const now = () => {
  const now = dayjs().format('DD MMM YYYY');
  return now;
};

export const SortModal = props => {
  return (
    <View
      style={{
        position: 'absolute',
        right: wp('6%'),
        top: hp('13.5%'),
        backgroundColor: Colors.GRAY_MEDIUM,
        borderRadius: 5,
      }}>
      <Font.NormalBold
        style={{left: wp('5%'), marginBottom: hp('2%'), top: hp('1%')}}>
        Sort By
      </Font.NormalBold>
      <TouchableOpacity
        style={{
          width: wp('45%'),
          height: hp('4%'),
        }}>
        <Font.Normal style={{left: wp('5%')}}>Newest to Oldest</Font.Normal>
        {/*TRANSLATION*/}
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: wp('45%'),
          height: hp('4%'),
        }}>
        <Font.Normal style={{left: wp('5%')}}>Oldest to Newest</Font.Normal>
      </TouchableOpacity>
    </View>
  );
};
