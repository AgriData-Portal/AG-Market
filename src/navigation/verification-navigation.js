import React from 'react';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import {
  Verification, //done
} from '_scenes';

import {CompanyProfile, EditCompany} from '_components';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

var dayjs = require('dayjs');
const TabStack = createBottomTabNavigator();
const AppStack = createStackNavigator();

export {VerificationNavigation};

const VerificationNavigation = props => {
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen name="verification">
        {screenProps => (
          <Verification
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
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
