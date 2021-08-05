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
import {StatusBar, Linking} from 'react-native';
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
import linking from './linking';

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
  const retailer = props.user.retailerCompany;
  const supplier = props.user.supplierCompany;
  const farmer = props.user.farmerCompany;
  const company = {type: '', verified: '', role: ''};
  if (retailer != null && retailer.verified == true) {
    log('Retailer Verified\n');
    company.type = 'retailer';
    company.verified = true;
  } else if (retailer != null && retailer.verified == undefined) {
    log('Retailer Not Verified\n');
    company.type = 'retailer';
    company.verified = false;
  } else if (supplier != null && supplier.verified == true) {
    log('Supplier Verified\n');
    company.type = 'supplier';
    company.verified = true;
  } else if (supplier != null && supplier.verified == undefined) {
    log('Supplier Not Verified\n');
    company.type = 'supplier';
    company.verified = false;
  } else if (farmer != null && farmer.verified == true) {
    log('Farmer Verified\n');
    company.type = 'farmer';
    company.verified = true;
  } else if (farmer != null && farmer.verified == undefined) {
    log('Farmer Not Verified\n');
    company.type = 'farmer';
    company.verified = false;
  }
  company.role = props.user.role;
  //to remove create comp nav thing

  if (company.verified) {
    if (company.type == 'retailer') {
      if (company.role == 'Retail Manager') {
        log('Retail Manager \n');
        return (
          <RMNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Accounts') {
        log('Retail Accounts \n');
        return (
          <AccountsNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Owner') {
        log('Retail Owner \n');
        return (
          <OwnerNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Receiver') {
        log('Retail Receiver \n');
        return (
          <RetailEmployeeNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'General Manager') {
        log('Retail General Manager \n');
        return (
          <GMNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      }
    } else if (company.type == 'supplier') {
      if (company.role == 'Owner') {
        log('Supplier Owner \n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Sales Manager') {
        log('Supplier Sales Manager\n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Delivery Man') {
        log('Supplier Delivery Man\n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      } else if (company.role == 'Accounts') {
        log('Supplier Accounts \n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
          />
        );
      }
    } else if (company.type == 'farmer') {
      log('Farmer \n');
      return (
        <FarmerNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
        />
      );
    }
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

const useMount = func => useEffect(() => func(), []);

const useInitialURL = () => {
  const [url, setUrl] = useState(null);
  const [processing, setProcessing] = useState(true);

  useMount(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();

      // The setTimeout is just for testing purpose
      setTimeout(() => {
        setUrl(initialUrl);
        setProcessing(false);
      }, 1000);
    };

    getUrlAsync();
  });

  return {url, processing};
};

const App = () => {
  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');
  const [userID, setUserID] = useState(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [runAgain, setRunAgain] = useState(false);

  const {url: initialUrl, processing} = useInitialURL();

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
        email: user.attributes.email,
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
          log(userID + 'not found');
          log(userAttributes);

          log('attempting to create new user');
          createNewUser();
        }
      } else {
        setRunAgain(true);
      }
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
    <NavigationContainer linking={linking}>
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
