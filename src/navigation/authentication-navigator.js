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
const AuthenticationStack = createStackNavigator();

export {AuthenticationNavigator};

const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="landing">
        {screenProps => <Landing {...screenProps} />}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="signin">
        {screenProps => (
          <Login
            {...screenProps}
            updateAuthState={props.updateAuthState}
            updateUserID={props.updateUserID}
            setUserAttributes={props.setUserAttributes}
          />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="signup">
        {screenProps => (
          <Registration
            {...screenProps}
            setUserAttributes={props.setUserAttributes}
          />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="confirmsignup">
        {screenProps => (
          <ConfirmSignUp
            {...screenProps}
            setUserAttributes={props.setUserAttributes}
          />
        )}
      </AuthenticationStack.Screen>
    </AuthenticationStack.Navigator>
  );
};
