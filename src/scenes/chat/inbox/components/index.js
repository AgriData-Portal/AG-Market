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
import {useEffect} from 'react/cjs/react.development';

var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);
var utc = require('dayjs/plugin/utc');
var timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Singapore');

const now = () => {
  const now = dayjs().format('YYYY-MM-DD');
  return now;
};

export const Searchbar = props => {
  return (
    <View
      style={{
        backgroundColor: Colors.GRAY_MEDIUM,
        width: Mixins.scaleWidth(310),
        height: Mixins.scaleHeight(35),
        borderRadius: 30,
        elevation: 2,
        justifyContent: 'center',
      }}>
      {/* Add searchable dropdown */}
      <TextInput style={{left: Mixins.scaleWidth(40)}}></TextInput>
      <View style={{position: 'absolute', left: Mixins.scaleWidth(10)}}>
        <Icon
          name="search"
          size={Mixins.scaleWidth(25)}
          color={Colors.GRAY_DARK}
        />
      </View>
    </View>
  );
};

export const ChatList = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          borderBottomWidth: 1,
          width: Mixins.scaleWidth(340),
          borderColor: Colors.GRAY_MEDIUM,
        }}></View>
    );
  };
  const Footer = () => {
    return (
      <View style={{width: Mixins.scaleWidth(340), alignItems: 'center'}}>
        <Image source={require('_assets/images/agridata.png')}></Image>
      </View>
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
            height: Mixins.scaleHeight(420),
            width: Mixins.scaleWidth(340),
          }}>
          <View
            style={{
              left: Mixins.scaleWidth(30),
              width: Mixins.scaleWidth(280),
              height: Mixins.scaleHeight(100),
              top: Mixins.scaleHeight(30),
              alignItems: 'center',
              backgroundColor: Colors.PALE_BLUE,
              borderRadius: 20,
              justifyContent: 'center',
            }}>
            <Text style={Typography.normal}>
              You currently don't have any chats
              {'\n'}Look for a retailer to start chatting
            </Text>
          </View>
        </View>
      }
      renderItem={({item}) => {
        var nameArray = item.name.split('+');
        var chatName = null;
        if (props.companyType == 'supplier') {
          chatName = nameArray[0];
        } else {
          chatName = nameArray[1];
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
            userID={props.userID}
          />
        );
      }}
    />
  );
};

const ChatRoom = props => {
  const lastUpdated = dayjs(props.updatedAt).add(8, 'hour');
  var listOfParticipants = props.chatParticipants;
  var tempList = listOfParticipants.filter(item => {
    return item.userID == props.userID;
  });
  if (tempList.length == 0) {
    var lastSeen = dayjs().subtract(1, 'month');
  } else {
    var lastSeen = dayjs(tempList[0].lastOnline).add(8, 'hour');
  }

  {
    /* listOfParticipants.forEach((item, index, array) => {
    if (item.userID == props.userID) {
      console.log(item.lastOnline);
      lastSeen = dayjs(item.lastOnline).add(8, 'hour');
    }
  });*/
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
        height: Mixins.scaleHeight(60),
        width: Mixins.scaleWidth(340),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: Mixins.scaleWidth(50),
          height: Mixins.scaleWidth(50),
          top: Mixins.scaleWidth(10),
          left: Mixins.scaleWidth(10),
          backgroundColor: Colors.LIGHT_BLUE,
          borderRadius: 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{
            resizeMode: 'center',
            width: Mixins.scaleWidth(50),
            height: Mixins.scaleWidth(50),
          }}
          source={require('_assets/images/agridata.png')}
        />
      </View>
      <View style={{left: Mixins.scaleWidth(25), top: Mixins.scaleHeight(10)}}>
        <Text style={Typography.normal}>{props.chatName}</Text>
        <Text style={Typography.small}>
          {props.mostRecentMessageSender} : {props.mostRecentMessage}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          top: Mixins.scaleHeight(10),
          right: Mixins.scaleWidth(20),
        }}>
        {lastUpdated.fromNow().includes('day') ||
        lastUpdated.fromNow().includes('days') ||
        lastUpdated.fromNow().includes('month') ||
        lastUpdated.fromNow().includes('months') ||
        lastUpdated.fromNow().includes('year') ||
        lastUpdated.fromNow().includes('years') ? (
          <Text style={[Typography.small, {color: Colors.GRAY_DARK}]}>
            {lastUpdated.format('DD-MM-YYYY')}
          </Text>
        ) : (
          <Text style={[Typography.small, {color: Colors.GRAY_DARK}]}>
            {lastUpdated.subtract(8, 'hour').fromNow()}
          </Text>
        )}
      </View>
      {!lastUpdated.from(lastSeen).includes('ago') ? (
        <View
          style={{
            position: 'absolute',
            width: Mixins.scaleWidth(20),
            height: Mixins.scaleWidth(20),
            backgroundColor: Colors.PALE_GREEN,
            borderRadius: 100,
            right: Mixins.scaleWidth(30),
            top: Mixins.scaleHeight(30),
          }}></View>
      ) : (
        <View></View>
      )}
    </TouchableOpacity>
  );
};
