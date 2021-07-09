import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Typography} from '_styles';
import {Mixins, Colors} from '_styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const CloseButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.setModal(false)}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Icon name="close" size={wp('9%')}></Icon>
    </TouchableOpacity>
  );
};

export const AddButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.function}
      style={{
        width: Mixins.scaleWidth(props.width),
        backgroundColor: Colors.GRAY_LIGHT,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'row',
        height: Mixins.scaleHeight(25),
      }}>
      <View style={{left: Mixins.scaleWidth(5), bottom: Mixins.scaleHeight(1)}}>
        <Icon name="add-outline" size={Mixins.scaleWidth(20)}></Icon>
      </View>
      <Text style={[Typography.normal, {left: Mixins.scaleWidth(10)}]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export const BackButton = props => {
  return (
    <TouchableOpacity onPress={() => props.navigation.goBack()}>
      <Icon name="arrow-back-outline" size={wp('7%')} />
    </TouchableOpacity>
  );
};
