import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import config from './aws-exports';
import {View, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {getUser} from './graphql/queries';
import {
  createUser,
  createFarmerCompany,
  createSupplierCompany,
  createRetailerCompany,
} from './graphql/mutations';
import {StatusBar} from 'react-native';
import {log} from '_utils';

import {
  GMNavigation,
  RMNavigation,
  OwnerNavigation,
  RetailEmployeeNavigation,
  AccountsNavigation,
  SupplierNavigation,
  VerificationNavigation,
  CreateCompanyNavigation,
  AuthenticationNavigator,
  FarmerNavigation,
} from './navigation';

Amplify.configure(config);

// PushNotification.onRegister(token => {
//   log('onRegister', token);
// });
// PushNotification.onNotification(notification => {
//   if (notification.foreground) {
//     log('onNotification foreground', notification);
//   } else {
//     log('onNotification background or closed', notification);
//   }
//   // extract the data passed in the push notification
//   const data = JSON.parse(notification.data['pinpoint.jsonBody']);
//   log('onNotification data', data);
//   // iOS only
//   notification.finish(PushNotificationIOS.FetchResult.NoData);
// });
// PushNotification.onNotificationOpened(notification => {
//   log('onNotificationOpened', notification);
//   // extract the data passed in the push notification
//   const data = JSON.parse(notification['pinpoint.jsonBody']);
//   log('onNotificationOpened data', data);
// });

const AppNavigator = props => {
  log('user:' + props.user);
  const type = props.user.role;
  //to remove create comp nav thing

  if (
    props.user.retailerCompanyID != null &&
    props.user.retailerCompany.verified != undefined
  ) {
    if (type == 'retailmanager') {
      log('Retail Manager \n');
      return (
        <RMNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    } else if (type == 'accounts') {
      log('Accounts \n');
      return (
        <AccountsNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    } else if (type == 'owner') {
      log('Owner \n');
      return (
        <OwnerNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    } else if (type == 'receiver') {
      log('Receiver \n');
      return (
        <RetailEmployeeNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    } else if (type == 'generalmanager') {
      log('General Manager \n');
      return (
        <GMNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    }
  } else if (
    props.user.supplierCompanyID != null &&
    props.user.supplierCompany.verified != undefined
  ) {
    log('Supplier \n');
    const type = 'supplier';
    return (
      <SupplierNavigation
        user={props.user}
        updateAuthState={props.updateAuthState}
        setUserDetails={props.setUserDetails}
      />
    );
  } else if (
    props.user.farmerCompanyID != null &&
    props.user.farmerCompany.verified != undefined
  ) {
    log('Farmer \n');
    const type = 'farmer';
    return (
      <FarmerNavigation
        user={props.user}
        updateAuthState={props.updateAuthState}
        setUserDetails={props.setUserDetails}
      />
    );
  } else {
    return (
      <VerificationNavigation
        user={props.user}
        updateAuthState={props.updateAuthState}
        setUserDetails={props.setUserDetails}
      />
    );
  }
};

const Initializing = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="green" />
    </View>
  );
};

const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [userID, setUserID] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [runAgain, setRunAgain] = useState(false);

  const createNewUser = async () => {
    var user = null;

    var companyID = null;
    try {
      user = await Auth.currentAuthenticatedUser();
      log('attempting to fix the problem');
      log(user.attributes);
    } catch (e) {
      log(e);
    }
    var type = user.attributes['custom:companyType'];
    //createing new company
    try {
      if (type == 'farm') {
        var response = await API.graphql({
          query: createFarmerCompany,
          variables: {
            input: {
              name: user.attributes['custom:companyName'],
              address: user.attributes['custom:companyAddress'],
              registrationNumber: user.attributes['custom:companyRegNum'],
            },
          },
        });
        log('FarmCreated!');
        companyID = response.data.createFarmerCompany.id;
      } else if (type == 'supermarket') {
        var response = await API.graphql({
          query: createRetailerCompany,
          variables: {
            input: {
              name: user.attributes['custom:companyName'],
              address: user.attributes['custom:companyAddress'],
              registrationNumber: user.attributes['custom:companyRegNum'],
            },
          },
        });
        log(response);
        log('Supermarket Created!');
        companyID = response.data.createRetailerCompany.id;
      } else if (type == 'supplier') {
        var response = await API.graphql({
          query: createSupplierCompany,
          variables: {
            input: {
              name: user.attributes['custom:companyName'],
              address: user.attributes['custom:companyAddress'],
              registrationNumber: user.attributes['custom:companyRegNum'],
            },
          },
        });
        log('Supplier Created!');
        companyID = response.data.createSupplierCompany.id;
      } else {
        log('Nothing was Created', type);
      }
    } catch (err) {
      log(err);
    }
    try {
      var input = {
        id: user.attributes.sub,
        name: user.attributes.name,
        role: user.attributes['custom:role'],
        contactNumber: user.attributes.phone_number,
      };
      if (type == 'farm') {
        input['farmerCompanyID'] = companyID;
      } else if (type == 'supermarket') {
        input['retailerCompanyID'] = companyID;
      } else if (type == 'supplier') {
        input['supplierCompanyID'] = companyID;
      }
      const newUserInfo = await API.graphql({
        query: createUser,
        variables: {
          input,
        },
      });
      log('newuser: ' + newUserInfo.data.createUser);
      setUserDetails(newUserInfo.data.createUser);
      setUserLoggedIn('loggedIn');
    } catch (e) {
      log(e);
    }
  };

  const getUserAttributes = async id => {
    try {
      if (id) {
        const userInfo = await API.graphql({
          query: getUser,
          variables: {id: id},
        });
        log('getuser' + id);
        log(userInfo);
        if (userInfo.data.getUser) {
          log('loggingin');
          setUserDetails(userInfo.data.getUser);
          setUserLoggedIn('loggedIn');
        } else {
          log('no user found');
          log(userAttributes);

          log('attempting to create new user');
          createNewUser();
        }
      } else {
        setRunAgain(true);
      }
      log(userID + 'not found');
    } catch (e) {
      log(e);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, [userID]);

  async function checkAuthState() {
    //this checks for the current authenticated state (for when u dont click logout)
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserID(user.attributes.sub);
      log(user.attributes);
      setUserAttributes(user.attributes);
      log('✅ User is alreadry signed in: ' + user.attributes.sub);
      getUserAttributes(user.attributes.sub);
    } catch (err) {
      log(err);
      log('❌ User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }

  //to pass down the state setter to the sign in page so that it will set the universal state to login
  function updateAuthState(isUserLoggedIn) {
    setUserLoggedIn(isUserLoggedIn);
  }
  //to pass down the state setter to the sign in page so that it will set the universal user attribute state
  function updateUserID(userID) {
    setUserID(userID);
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator
          updateAuthState={updateAuthState}
          user={userDetails}
          setUserDetails={setUserDetails}
        />
      )}
      {isUserLoggedIn === 'loggedOut' && (
        <AuthenticationNavigator
          updateUserID={updateUserID}
          setUserAttributes={setUserAttributes}
          updateAuthState={updateAuthState}
        />
      )}
    </NavigationContainer>
  );
};

export default App;
