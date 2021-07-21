import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {
  RetailerTasks, //done
} from '_scenes';
import {Colors} from '_styles/';
import {View, Text, Image} from 'react-native';
import {Typography} from '_styles';
import {MenuButton, PersonalProfile, EditPersonal} from '_components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

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
          headerTitleStyle: [Typography.large],
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
          headerTitleStyle: [Typography.large],
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
          headerTitleStyle: [Typography.large],
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
                  width: wp('20%'),
                  height: wp('15%'),
                  alignItems: 'center',
                  justifyContent: 'center',
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
                  width: wp('20%'),
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
