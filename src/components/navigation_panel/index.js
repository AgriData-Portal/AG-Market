import React from 'react';
import {View, TouchableOpacity, TextPropTypes} from 'react-native';
import {Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';

const IconSize = 35;
const heightfromtop = 8;

export const NavBar = props => {
  return (
    <View
      style={{
        width: Mixins.scaleWidth(360),
        height: Mixins.scaleHeight(80),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
      }}>
      <MarketplaceButton navigation={props.navigation} />
      <CalendarButton navigation={props.navigation} />
      <HomeButton navigation={props.navigation} />
      <ChatButton navigation={props.navigation} />
      <InvoiceButton navigation={props.navigation} />
    </View>
  );
};

export const CalendarButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('tasks')}
      style={{top: Mixins.scaleHeight(heightfromtop)}}>
      <Icon name="calendar-outline" size={Mixins.scaleWidth(IconSize)}></Icon>
    </TouchableOpacity>
  );
};

export const InvoiceButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('orders')}
      style={{top: Mixins.scaleHeight(heightfromtop)}}>
      <Icon name="clipboard-outline" size={Mixins.scaleWidth(IconSize)}></Icon>
    </TouchableOpacity>
  );
};

export const ChatButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('inbox')}
      style={{top: Mixins.scaleHeight(heightfromtop)}}>
      <Icon
        name="chatbubbles-outline"
        size={Mixins.scaleWidth(IconSize)}></Icon>
    </TouchableOpacity>
  );
};

export const HomeButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('dashboard')}
      style={{top: Mixins.scaleHeight(heightfromtop)}}>
      <Icon name="home-outline" size={Mixins.scaleWidth(IconSize)}></Icon>
    </TouchableOpacity>
  );
};

export const MarketplaceButton = props => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate('marketplace')}
      style={{top: Mixins.scaleHeight(heightfromtop)}}>
      <Icon name="cart-outline" size={Mixins.scaleWidth(IconSize)}></Icon>
    </TouchableOpacity>
  );
};
