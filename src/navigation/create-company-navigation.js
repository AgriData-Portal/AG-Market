import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import {
  CreateCompany, //done
  Verification, //done
} from '_scenes';

import {CompanyProfile, EditCompany} from '_components';

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
