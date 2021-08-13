import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import dayjs from 'dayjs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings, {log} from '_utils';
import {userStore} from '_store';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export const Searchbar = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.GRAY_MEDIUM,
        width: wp('80%'),
        height: hp('6%'),
        borderRadius: 30,
        elevation: 2,
        justifyContent: 'center',
      }}>
      {/* Add searchable dropdown */}
      <TextInput
        style={{
          left: wp('12%'),
          top: hp('0.5%'),
          height: hp('6%'),
          borderBottomColor: 'transparent',
        }}
        underlineColorAndroid="transparent"></TextInput>
      <View style={{position: 'absolute', left: wp('3%')}}>
        <Icon name="search" size={wp('6.5%')} color={Colors.GRAY_DARK} />
      </View>
    </View>
  );
};

export const ChatList = props => {
  const companyType = userStore(state => state.companyType);
  const companyID = userStore(state => state.companyID);
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          width: wp('95%'),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  const Footer = () => {
    return (
      <Image
        style={{
          width: wp('50%'),
          height: hp('20%'),
          resizeMode: 'contain',
          alignSelf: 'center',
          marginTop: hp('2%'),
        }}
        source={require('_assets/images/agridata.png')}></Image>
    );
  };
  return (
    <FlatList
      keyExtractor={item => item.id}
      data={props.data}
      numColumns={1}
      ItemSeparatorComponent={Seperator}
      ListFooterComponent={Footer}
      ListEmptyComponent={
        <View
          style={{
            height: hp('70%'),
            width: wp('95%'),
          }}>
          <View
            style={{
              alignSelf: 'center',
              width: wp('80%'),
              height: hp('15%'),
              top: hp('5%'),
              alignItems: 'center',
              backgroundColor: Colors.PALE_BLUE,
              borderRadius: 20,
              justifyContent: 'center',
            }}>
            <Text style={Typography.normal}>
              {Strings.youCurrentlyDontHave}
            </Text>
          </View>
        </View>
      }
      renderItem={({item}) => {
        var nameArray = item.name.split('+');
        var chatName = null;
        if (companyType == 'supplier') {
          if (item.id.slice(0, 36) == companyID) {
            chatName = nameArray[1];
          } else {
            chatName = nameArray[0];
          }
        } else if (companyType == 'retailer') {
          chatName = nameArray[1];
        } else if (companyType == 'farmer') {
          chatName = nameArray[0];
        }
        var senderArray = item.mostRecentMessageSender.split(' ');
        var firstName = senderArray[0];
        return (
          <ChatRoom
            chatName={chatName}
            mostRecentMessage={item.mostRecentMessage}
            mostRecentMessageSender={firstName}
            updatedAt={item.updatedAt}
            chatGroupID={item.id}
            navigation={props.navigation}
            chatParticipants={item.chatParticipants.items}
          />
        );
      }}
    />
  );
};

const ChatRoom = props => {
  const userID = userStore(state => state.userID);
  const lastUpdated = dayjs(props.updatedAt).add(8, 'hour');
  var listOfParticipants = props.chatParticipants;

  const getInitials = name => {
    if (name) {
      let initials = name.split(' ');

      if (initials.length > 1) {
        initials = initials.shift().charAt(0) + initials.pop().charAt(0);
      } else {
        initials = name.substring(0, 2);
      }

      return initials.toUpperCase();
    } else {
      return null;
    }
  };

  if (listOfParticipants != undefined || listOfParticipants != null) {
    var tempList = listOfParticipants.filter(item => {
      return item.userID == userID;
    });
    if (tempList.length == 0) {
      var lastSeen = dayjs().subtract(1, 'month');
    } else {
      var lastSeen = dayjs(tempList[0].lastOnline).add(8, 'hour');
    }
  } else {
    var lastSeen = dayjs().subtract(1, 'month');
  }

  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate('chatroom', {
          itemID: props.chatGroupID,
          chatName: props.chatName,
        });
      }}
      style={{
        height: hp('11%'),
        width: wp('95%'),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: hp('7%'),
          height: hp('7%'),
          top: hp('1.5%'),
          left: wp('2%'),
          backgroundColor: Colors.LIGHT_BLUE,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>{getInitials(props.chatName)}</Text>
        {/* <Image
          style={{
            resizeMode: 'center',
            width: wp('15%'),
            height: wp('15%'),
          }}
          source={require('_assets/images/agridata.png')}
        /> */}
      </View>
      {!lastUpdated.from(lastSeen).includes('ago') ? (
        <View
          style={{
            position: 'absolute',
            width: hp('2%'),
            height: hp('2%'),
            backgroundColor: '#8EAB3D',
            borderRadius: 100,
            left: hp('6%'),
            top: hp('2%'),
          }}></View>
      ) : (
        <View></View>
      )}
      <View style={{left: wp('7%'), top: hp('1.5%'), width: wp('60%')}}>
        <Text style={Typography.normal}>{props.chatName}</Text>
        {props.mostRecentMessage.length > 48 ? (
          <Text style={Typography.small}>
            {props.mostRecentMessageSender} :
            {props.mostRecentMessage.slice(0, 48) + '...'}
          </Text>
        ) : (
          <Text style={Typography.small}>
            {props.mostRecentMessageSender} : {props.mostRecentMessage}
          </Text>
        )}
      </View>
      <View
        style={{
          position: 'absolute',
          top: hp('1.5%'),
          right: wp('5%'),
        }}>
        {lastUpdated.subtract(8, 'hour').fromNow().includes('day') ||
        lastUpdated.subtract(8, 'hour').fromNow().includes('days') ||
        lastUpdated.subtract(8, 'hour').fromNow().includes('month') ||
        lastUpdated.subtract(8, 'hour').fromNow().includes('months') ||
        lastUpdated.subtract(8, 'hour').fromNow().includes('year') ||
        lastUpdated.subtract(8, 'hour').fromNow().includes('years') ? (
          <Text style={[Typography.small, {color: Colors.GRAY_DARK}]}>
            {lastUpdated.format('DD-MM-YYYY')}
          </Text>
        ) : (
          <Text style={[Typography.small, {color: Colors.GRAY_DARK}]}>
            {lastUpdated.subtract(8, 'hour').fromNow()}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
