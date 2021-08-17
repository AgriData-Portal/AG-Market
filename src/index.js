import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import PushNotification from '@aws-amplify/pushnotification';
import config from './aws-exports';
import {View, ActivityIndicator, TouchableOpacity, Text} from 'react-native';
import {getGlobalSettings, getUser} from './graphql/queries';
import {
  createUser,
  createFarmerCompany,
  createSupplierCompany,
  createRetailerCompany,
} from './graphql/mutations';
import {StatusBar, Linking} from 'react-native';
import {log} from '_utils';
import DeviceInfo from 'react-native-device-info';
import {
  getApiLevel,
  getBuildId,
  getFontScale,
  getModel,
  getVersion,
} from 'react-native-device-info';

import {userStore, versionStore, companyStore} from './store';
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
  const [globalSettings, setGlobalSettings] = useState('');
  const changeUpdateStatus = versionStore(state => state.changeUpdateStatus);
  const [upToDate, setUpToDate] = useState(false);

  const getSettingsInfo = async () => {
    try {
      const settings = await API.graphql({
        query: getGlobalSettings,
        variables: {id: 'AGRIDATA'},
      });

      setGlobalSettings(settings.data.getGlobalSettings);
      var status = '';

      if (
        DeviceInfo.getVersion() !=
        settings.data.getGlobalSettings.latestVersionNumber
      ) {
        if (settings.data.getGlobalSettings.forceUpdate) {
          status = 'forceUpdate';
        } else {
          status = 'updateLater';
        }
      } else {
        status = 'latestVersion';
      }
      log('1: ', settings.data.getGlobalSettings.forceUpdate);
      changeUpdateStatus(status);
      log('DeviceInfo: ');
      console.log('Version: ' + DeviceInfo.getVersion());
      log(
        'Latest Version: ',
        settings.data.getGlobalSettings.latestVersionNumber,
      );
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSettingsInfo();
  }, []);
  const changeCompanyName = companyStore(state => state.changeCompanyName);
  const changeUserName = userStore(state => state.changeUserName);
  const changeUserID = userStore(state => state.changeUserID);
  const changeCompanyType = companyStore(state => state.changeCompanyType);
  const changeCompanyID = companyStore(state => state.changeCompanyID);
  const changeRoleInCompany = userStore(state => state.changeRoleInCompany);
  const changeVerified = companyStore(state => state.changeVerified);
  const changeCompanyFavouriteStores = companyStore(
    state => state.changeCompanyFavouriteStores,
  );
  const changeCompanyEmail = companyStore(state => state.changeCompanyEmail);
  const changeCompanyBankDetails = companyStore(
    state => state.changeCompanyBankDetails,
  );
  const changeCompanyBankName = companyStore(
    state => state.changeCompanyBankName,
  );
  const changeCompanyNumber = companyStore(state => state.changeCompanyNumber);
  const changeCompanyLogoFileName = companyStore(
    state => state.changeCompanyLogoFileName,
  );
  const changeCompanyRatings = companyStore(
    state => state.changeCompanyRatings,
  );
  const changeCompanyRegistrationNumber = companyStore(
    state => state.changeCompanyRegistrationNumber,
  );
  const changeCompanyAddress = companyStore(
    state => state.changeCompanyAddress,
  );
  const verified = companyStore(state => state.verified);
  const companyType = companyStore(state => state.companyType);
  const roleInCompany = userStore(state => state.roleInCompany);

  log('user:' + props.user);

  const type = props.user.role;

  changeUserID(props.user.id);
  changeUserName(props.user.name);
  changeRoleInCompany(props.user.role);
  const retailer = props.user.retailerCompany;
  const supplier = props.user.supplierCompany;
  const farmer = props.user.farmerCompany;
  console.log('retailer ', retailer);
  console.log('supplier ', supplier);
  console.log('farmer ', farmer);
  const company = {type: '', verified: '', role: ''};
  if (retailer != null && retailer.verified == true) {
    log('Retailer Verified\n');
    changeCompanyType('retailer');
    changeVerified(true);
    changeCompanyID(props.user.retailerCompanyID);
    changeCompanyName(props.user.retailerCompany.name);
    changeCompanyFavouriteStores(props.user.retailerCompany.favouriteStores);
    changeCompanyEmail(props.user.retailerCompany.contactDetails.email);
    changeCompanyNumber(props.user.retailerCompany.contactDetails.phone);
    changeCompanyBankDetails(
      props.user.retailerCompany.bankAccount.accountNumber,
    );
    changeCompanyBankName(props.user.retailerCompany.bankAccount.bankName);
    changeCompanyLogoFileName(props.user.retailerCompany.logo);
    changeCompanyRatings(props.user.retailerCompany.rating);
    changeCompanyRegistrationNumber(
      props.user.retailerCompany.registrationNumber,
    );
    changeCompanyAddress(props.user.retailerCompany.address);
  } else if (retailer != null && retailer.verified == undefined) {
    log('Retailer Not Verified\n');
    changeCompanyType('retailer');
    changeVerified(false);
    changeCompanyID(props.user.retailerCompanyID);
    changeCompanyName(props.user.retailerCompany.name);
  } else if (supplier != null && supplier.verified == true) {
    log('Supplier Verified\n');
    changeCompanyType('supplier');
    changeVerified(true);
    changeCompanyID(props.user.supplierCompanyID);
    changeCompanyName(props.user.supplierCompany.name);
    changeCompanyFavouriteStores(props.user.supplierCompany.favouriteStores);
    changeCompanyEmail(props.user.supplierCompany.contactDetails.email);
    changeCompanyNumber(props.user.supplierCompany.contactDetails.phone);
    changeCompanyBankDetails(
      props.user.supplierCompany.bankAccount.accountNumber,
    );
    changeCompanyBankName(props.user.supplierCompany.bankAccount.bankName);
    changeCompanyLogoFileName(props.user.supplierCompany.logo);
    changeCompanyRatings(props.user.supplierCompany.rating);
    changeCompanyRegistrationNumber(
      props.user.supplierCompany.registrationNumber,
    );
    changeCompanyAddress(props.user.supplierCompany.address);
  } else if (supplier != null && supplier.verified == undefined) {
    log('Supplier Not Verified\n');
    changeCompanyType('supplier');
    changeVerified(false);
    changeCompanyID(props.user.supplierCompanyID);
    changeCompanyName(props.user.supplierCompany.name);
  } else if (farmer != null && farmer.verified == true) {
    log('Farmer Verified\n');
    changeCompanyType('farmer');
    changeVerified(true);
    changeCompanyID(props.user.farmerCompanyID);
    changeCompanyName(props.user.farmerCompany.name);
    changeCompanyEmail(props.user.farmerCompany.contactDetails.email);
    changeCompanyNumber(props.user.farmerCompany.contactDetails.phone);
    changeCompanyBankDetails(
      props.user.farmerCompany.bankAccount.accountNumber,
    );
    changeCompanyBankName(props.user.farmerCompany.bankAccount.bankName);
    changeCompanyLogoFileName(props.user.farmerCompany.logo);
    changeCompanyRatings(props.user.farmerCompany.rating);
    changeCompanyRegistrationNumber(
      props.user.farmerCompany.registrationNumber,
    );
    changeCompanyAddress(props.user.farmerCompany.address);
  } else if (farmer != null && farmer.verified == undefined) {
    log('Farmer Not Verified\n');
    changeCompanyType('farmer');
    changeVerified(false);
    changeCompanyID(props.user.farmerCompanyID);
    changeCompanyName(props.user.farmerCompany.name);
  }

  //to remove create comp nav thing

  if (verified) {
    if (companyType == 'retailer') {
      if (roleInCompany == 'Retail Manager') {
        log('Retail Manager \n');
        return (
          <RMNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            company={company}
          />
        );
      } else if (roleInCompany == 'Accounts') {
        log('Retail Accounts \n');
        return (
          <AccountsNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            company={company}
          />
        );
      } else if (roleInCompany == 'Owner') {
        log('Retail Owner \n');
        return (
          <OwnerNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            company={company}
          />
        );
      } else if (roleInCompany == 'Receiver') {
        log('Retail Receiver \n');
        return (
          <RetailEmployeeNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            company={company}
          />
        );
      } else if (roleInCompany == 'General Manager') {
        log('Retail General Manager \n');
        return (
          <GMNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            company={company}
          />
        );
      }
    } else if (companyType == 'supplier') {
      if (roleInCompany == 'Owner') {
        log('Supplier Owner \n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            upToDate={upToDate}
            company={company}
          />
        );
      } else if (roleInCompany == 'Sales Manager') {
        log('Supplier Sales Manager\n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            upToDate={upToDate}
            company={company}
          />
        );
      } else if (roleInCompany == 'Delivery Man') {
        log('Supplier Delivery Man\n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            upToDate={upToDate}
            company={company}
          />
        );
      } else if (roleInCompany == 'Accounts') {
        log('Supplier Accounts \n');
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            upToDate={upToDate}
          />
        );
      } else {
        return (
          <SupplierNavigation
            user={props.user}
            updateAuthState={props.updateAuthState}
            setUserDetails={props.setUserDetails}
            upToDate={upToDate}
          />
        );
      }
    } else if (companyType == 'farmer') {
      log('Farmer \n');
      return (
        <FarmerNavigation
          user={props.user}
          updateAuthState={props.updateAuthState}
          setUserDetails={props.setUserDetails}
          company={company}
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
