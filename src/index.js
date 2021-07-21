import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import config from './aws-exports';
import {View, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {getUser} from './graphql/queries';
import {createUser} from './graphql/mutations';
import {StatusBar} from 'react-native';

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
} from './navigation';

Amplify.configure(config);

// PushNotification.onRegister(token => {
//   console.log('onRegister', token);
// });
// PushNotification.onNotification(notification => {
//   if (notification.foreground) {
//     console.log('onNotification foreground', notification);
//   } else {
//     console.log('onNotification background or closed', notification);
//   }
//   // extract the data passed in the push notification
//   const data = JSON.parse(notification.data['pinpoint.jsonBody']);
//   console.log('onNotification data', data);
//   // iOS only
//   notification.finish(PushNotificationIOS.FetchResult.NoData);
// });
// PushNotification.onNotificationOpened(notification => {
//   console.log('onNotificationOpened', notification);
//   // extract the data passed in the push notification
//   const data = JSON.parse(notification['pinpoint.jsonBody']);
//   console.log('onNotificationOpened data', data);
// });

const AppNavigator = props => {
  console.log('user:' + props.user);
  const type = props.user.role;
  if (
    props.user.retailerCompanyID != null ||
    props.user.supplierCompanyID != null
  ) {
    if (
      props.user.retailerCompanyID != null &&
      props.user.retailerCompany.verified != undefined
    ) {
      if (type == 'retailmanager') {
        console.log('Retail Manager \n');
        return (
          <RMNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (type == 'accounts') {
        console.log('Accounts \n');
        return (
          <AccountsNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (type == 'owner') {
        console.log('Owner \n');
        return (
          <OwnerNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (type == 'retailemployee') {
        console.log('Retailer Employee \n');
        return (
          <RetailEmployeeNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (type == 'generalmanager') {
        console.log('General Manager \n');
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
      console.log('Supplier \n');
      const type = 'supplier';
      return (
        <SupplierNavigation
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
  } else {
    return (
      <CreateCompanyNavigation
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
    try {
      user = await Auth.currentAuthenticatedUser();
      console.log('attempting to fix the problem');
      console.log(user.attributes);
    } catch (e) {
      console.log(e);
    }
    try {
      const newUserInfo = await API.graphql({
        query: createUser,
        variables: {
          input: {
            id: user.attributes.sub,
            name: user.attributes.name,
            role: user.attributes['custom:role'],
            contactNumber: user.attributes.phone_number,
          },
        },
      });
      console.log('newuser: ' + newUserInfo.data.createUser);
      setUserDetails(newUserInfo.data.createUser);
      setUserLoggedIn('loggedIn');
    } catch {
      e => console.log(e);
    }
  };

  const getUserAttributes = async id => {
    try {
      if (id) {
        const userInfo = await API.graphql({
          query: getUser,
          variables: {id: id},
        });
        console.log('getuser' + id);
        console.log(userInfo);
        if (userInfo.data.getUser) {
          console.log('loggingin');
          setUserDetails(userInfo.data.getUser);
          setUserLoggedIn('loggedIn');
        } else {
          console.log('no user found');
          console.log(userAttributes);

          console.log('attempting to create new user');
          createNewUser();
        }
      } else {
        setRunAgain(true);
      }
      console.log(userID + 'not found');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, [userID]);
  /*
  useEffect(() => {
    getUserAttributes();
    console.log('useEffect Triggered');
  }, [userID, runAgain]);*/
  async function checkAuthState() {
    //this checks for the current authenticated state (for when u dont click logout)
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserID(user.attributes.sub);
      console.log(user.attributes);
      setUserAttributes(user.attributes);
      console.log('✅ User is alreadry signed in: ' + user.attributes.sub);
      getUserAttributes(user.attributes.sub);
    } catch (err) {
      console.log('❌ User is not signed in');
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
