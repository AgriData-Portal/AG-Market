import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import {
  AccountsDashboard, //done
  RetailManagerDashboard, // done
  GeneralManagerDashboard, //done
  Marketplace, //done
  Store, //done
  Inbox, //done
  ChatRoom, //done but no modal
  EmployeeDashboard, //done
  OwnerDashboard, //done
  Orders, //Done
  SupplierStore, // done most
  SupplierTasks, //done
  RetailerTasks, //done
  //CompanyProfile, //done
  //EditCompany, //done
  //HumanResource, //done
  //PersonalProfile, //done.
  //EditPersonal, //done.
  //DataAnalytics,
  Registration, //done
  SupplierDashboard, //done
  Login, //done
  CreateCompany, //done
  Landing, //done
  Verification, //done
  ConfirmSignUp, //done
} from '_scenes';

import {DataAnalytics} from '_scenes/data_analytics/';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import {Colors} from '_styles/';
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {Typography} from '_styles';
import {
  MenuButton,
  CompanyProfile,
  EditCompany,
  HumanResource,
  PersonalProfile,
  EditPersonal,
} from '_components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateChatGroupUsers, createChatGroupUsers} from '../graphql/mutations';
import {ChatInfo} from '_scenes/chat/chat_room/components/chat-info';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

var dayjs = require('dayjs');
const TabStack = createBottomTabNavigator();
const AppStack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'tasks';

  switch (routeName) {
    case 'tasks':
      return Strings.tasks;
  }
}

export {RetailEmployeeNavigation};

const RetailEmployeeNavigation = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={Strings.tasks}
        options={({route, navigation}) => ({
          headerTitle: getHeaderTitle(route),
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <MenuButton
              navigation={navigation}
              updateAuthState={props.updateAuthState}
              userType={props.user.role}
            />
          ),
        })}>
        {screenProps => (
          <TabbedNavigator
            {...screenProps}
            user={props.user}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>

      <AppStack.Screen
        name="personalprofile"
        options={({route, navigation}) => ({
          title: Strings.personalProfile,
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <PersonalProfile {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="editprofile"
        options={({route, navigation}) => ({
          title: 'Edit ' + Strings.personalProfile,
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
        })}>
        {screenProps => <EditPersonal {...screenProps} user={props.user} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const TabbedNavigator = props => {
  return (
    <TabStack.Navigator
      tabBarOptions={{
        style: {
          position: 'absolute',
          backgroundColor: Colors.PALE_GREEN,
          bottom: hp('0%'),
          height: hp('9.5%'),
        },
      }}>
      <TabStack.Screen
        name="tasks"
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View
                style={{
                  width: wp('15%'),
                  height: wp('15%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: hp('0.5%'),
                }}>
                <Icon
                  name="checkmark-done-outline"
                  size={wp('7%')}
                  style={{
                    color: Colors.LIME_GREEN,
                  }}></Icon>
                <Text
                  style={[
                    Typography.small,
                    {
                      color: Colors.LIME_GREEN,
                    },
                  ]}>
                  {Strings.tasks}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  height: hp('5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: hp('0.5%'),
                }}>
                <Icon
                  name="checkmark-done-outline"
                  size={wp('7%')}
                  style={{
                    color: 'black',
                  }}></Icon>
                <Text
                  style={[
                    Typography.small,
                    {
                      color: 'black',
                    },
                  ]}>
                  {Strings.tasks}
                </Text>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <RetailerTasks
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
          />
        )}
      </TabStack.Screen>
    </TabStack.Navigator>
  );
};
