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

export {CreateCompanyNavigation};

const CreateCompanyNavigation = props => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="registercompany">
        {screenProps => <CreateCompany {...screenProps} user={props.user} />}
      </AppStack.Screen>

      <AppStack.Screen name="verification">
        {screenProps => (
          <Verification
            {...screenProps}
            updateAuthState={props.updateAuthState}
          />
        )}
      </AppStack.Screen>
      <AppStack.Screen name="companyprofile">
        {screenProps => <CompanyProfile {...screenProps} />}
      </AppStack.Screen>
      <AppStack.Screen name="editcompany">
        {screenProps => <EditCompany {...screenProps} />}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};
