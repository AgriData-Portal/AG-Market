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
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'inbox';

  switch (routeName) {
    case 'inbox':
      return Strings.inbox;
    case 'marketplace':
      return Strings.marketplace;
    case 'orders':
      return Strings.orders;
    case 'tasks':
      return Strings.tasks;
    case 'dataanalytics':
      return Strings.analytics;
  }
}

export {OwnerNavigation};

const OwnerNavigation = props => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name={Strings.orders}
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
        name="companyprofile"
        options={({route, navigation}) => ({
          title: Strings.companyProfile,
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                right: wp('4%'),
                position: 'absolute',
              }}>
              <Icon
                name="create-outline"
                size={wp('6%')}
                onPress={() => navigation.navigate('editcompany')}
              />
            </TouchableOpacity>
          ),
        })}>
        {screenProps => <CompanyProfile {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="editcompany"
        options={({route, navigation}) => ({
          title: 'Edit ' + Strings.companyProfile,
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <EditCompany {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="humanresource"
        options={({route, navigation}) => ({
          title: Strings.humanResource,
          headerTitleStyle: [Typography.header],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <HumanResource {...screenProps} user={props.user} />}
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
          headerRight: () => (
            <TouchableOpacity
              style={{
                right: wp('4%'),
                position: 'absolute',
              }}>
              <Icon
                name="create-outline"
                size={wp('6%')}
                onPress={() => navigation.navigate('editprofile')}
              />
            </TouchableOpacity>
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
          height: hp('11%'),
        },
      }}>
      <TabStack.Screen
        name="orders"
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
                  name="clipboard-outline"
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
                  {Strings.orders}
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
                  name="clipboard-outline"
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
                  {Strings.orders}
                </Text>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <Orders
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
          />
        )}
      </TabStack.Screen>
      <TabStack.Screen
        name="dataanalytics"
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
                  name="stats-chart-outline"
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
                  {Strings.analyticsSmall}
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
                  name="stats-chart-outline"
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
                  {Strings.analyticsSmall}
                </Text>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <DataAnalytics
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
          />
        )}
      </TabStack.Screen>
    </TabStack.Navigator>
  );
};
