import React, {useState} from 'react';
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

export const BlueButton = props => {
  const [buttonWidth, setButtonWidth] = useState(40);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      onLayout={layout => setButtonWidth(layout.nativeEvent.layout.width)}
      onPressOut={props.onPressIn} // for preventing double tap
      disabled={props.disabled}
      style={{
        position: props.position || 'relative',
        paddingHorizontal: wp('4%'),
        paddingVertical: props.paddingVertical || hp('1%'),
        minWidth: props.minWidth || wp('20%'),
        backgroundColor: props.backgroundColor || Colors.LIGHT_BLUE,
        borderRadius: props.borderRadius || buttonWidth / 2,
        maxWidth: props.maxWidth || wp('80%'),
        flexDirection: props.flexDirection || 'row',
        justifyContent: 'space-evenly',
        top: props.top || 0,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignSelf: 'center',
        right: props.right,
        left: props.left,
      }}>
      <Text
        style={[
          props.font,
          {color: props.textColor || 'black', alignSelf: 'center'},
        ]}>
        {props.text}
      </Text>
      {props.icon ? (
        <View
          style={{
            alignSelf: 'center',
            marginLeft:
              props.flexDirection == 'row-reverse'
                ? 0
                : props.offsetCenter || wp('20%'),
            marginRight:
              props.flexDirection == 'row-reverse'
                ? props.offsetCenter || wp('20%')
                : 0,
          }}>
          <Icon name={props.icon} size={wp('6%')} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
