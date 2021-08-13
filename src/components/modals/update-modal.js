import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Modal from 'react-native-modal';
import {BlueButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const UpdateAppModal = props => {
  return (
    <View style={{backgroundColor: 'red', height: hp('20%'), width: wp('80%')}}>
      <View>
        <Text>hello</Text>
      </View>
    </View>
  );
};
