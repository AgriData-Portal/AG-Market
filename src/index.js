import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import codePush from 'react-native-code-push';
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
  CompanyProfile, //done
  EditCompany, //done
  HumanResource, //done
  PersonalProfile, //done.
  EditPersonal, //done.
  //DataAnalytics,
  Registration, //done
  SupplierDashboard, //done
  Login, //done
  CreateCompany, //done
  Landing, //done
  Verification, //done
  ConfirmSignUp, //done
} from './scenes';
import {SuccessfulModal, UnsuccessfulModal} from '_components';
import {DataAnalytics} from './scenes/data_analytics/';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import config from './aws-exports';
import {View, ActivityIndicator} from 'react-native';
import {getUser} from './graphql/queries';
import {createUser} from './graphql/mutations';
import {StatusBar} from 'react-native';

Amplify.configure(config);

const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

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
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="dashboard">
              {screenProps => (
                <RetailManagerDashboard
                  {...screenProps}
                  user={props.user}
                  updateAuthState={props.updateAuthState}
                />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="marketplace">
              {screenProps => (
                <Marketplace {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>

            <AppStack.Screen name="store">
              {screenProps => <Store {...screenProps} user={props.user} />}
            </AppStack.Screen>

            <AppStack.Screen name="inbox">
              {screenProps => <Inbox {...screenProps} user={props.user} />}
            </AppStack.Screen>

            <AppStack.Screen name="chatroom">
              {screenProps => <ChatRoom {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="orders">
              {screenProps => <Orders {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="tasks">
              {screenProps => (
                <RetailerTasks {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="personalprofile">
              {screenProps => (
                <PersonalProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editprofile">
              {screenProps => (
                <EditPersonal {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
          </AppStack.Navigator>
        );
      } else if (type == 'accounts') {
        console.log('Accounts \n');
        return (
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="dashboard">
              {screenProps => (
                <AccountsDashboard
                  {...screenProps}
                  user={props.user}
                  updateAuthState={props.updateAuthState}
                />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="inbox">
              {screenProps => <Inbox {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="chatroom">
              {screenProps => <ChatRoom {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="tasks">
              {screenProps => (
                <SupplierTasks {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="orders">
              {screenProps => <Orders {...screenProps} user={props.user} />}
            </AppStack.Screen>

            <AppStack.Screen name="personalprofile">
              {screenProps => (
                <PersonalProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editprofile">
              {screenProps => (
                <EditPersonal {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
          </AppStack.Navigator>
        );
      } else if (type == 'owner') {
        console.log('Owner \n');
        return (
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="dashboard">
              {screenProps => (
                <OwnerDashboard
                  {...screenProps}
                  user={props.user}
                  updateAuthState={props.updateAuthState}
                />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="orders">
              {screenProps => <Orders {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="companyprofile">
              {screenProps => (
                <CompanyProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editcompany">
              {screenProps => (
                <EditCompany {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="humanresource">
              {screenProps => (
                <HumanResource {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="personalprofile">
              {screenProps => (
                <PersonalProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editprofile">
              {screenProps => (
                <EditPersonal {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
          </AppStack.Navigator>
        );
      } else if (type == 'retaileremployee') {
        console.log('Retailer Employee \n');
        return (
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="dashboard">
              {screenProps => (
                <EmployeeDashboard
                  {...screenProps}
                  updateAuthState={props.updateAuthState}
                  user={props.user}
                />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="tasks">
              {screenProps => (
                <RetailerTasks {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="personalprofile">
              {screenProps => (
                <PersonalProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editprofile">
              {screenProps => (
                <EditPersonal {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
          </AppStack.Navigator>
        );
      } else if (type == 'generalmanager') {
        console.log('General Manager \n');
        return (
          <AppStack.Navigator headerMode="none">
            <AppStack.Screen name="dashboard">
              {screenProps => (
                <GeneralManagerDashboard
                  {...screenProps}
                  updateAuthState={props.updateAuthState}
                  user={props.user}
                />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="orders">
              {screenProps => <Orders {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="marketplace">
              {screenProps => (
                <Marketplace {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="store">
              {screenProps => <Store {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="chatroom">
              {screenProps => <ChatRoom {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="inbox">
              {screenProps => <Inbox {...screenProps} user={props.user} />}
            </AppStack.Screen>
            <AppStack.Screen name="tasks">
              {screenProps => (
                <RetailerTasks {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="dataanalytics">
              {screenProps => (
                <DataAnalytics {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>

            <AppStack.Screen name="companyprofile">
              {screenProps => (
                <CompanyProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editcompany">
              {screenProps => (
                <EditCompany {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="humanresource">
              {screenProps => (
                <HumanResource {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="personalprofile">
              {screenProps => (
                <PersonalProfile {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
            <AppStack.Screen name="editprofile">
              {screenProps => (
                <EditPersonal {...screenProps} user={props.user} />
              )}
            </AppStack.Screen>
          </AppStack.Navigator>
        );
      }
    } else if (
      props.user.supplierCompanyID != null &&
      props.user.supplierCompany.verified != undefined
    ) {
      console.log('Supplier \n');
      const type = 'supplier';
      return (
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen name="dashboard">
            {screenProps => (
              <SupplierDashboard
                {...screenProps}
                updateAuthState={props.updateAuthState}
                user={props.user}
              />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="marketplace">
            {screenProps => (
              <SupplierStore {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="chatroom">
            {screenProps => (
              <ChatRoom {...screenProps} user={props.user} type={type} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="inbox">
            {screenProps => (
              <Inbox {...screenProps} user={props.user} type={type} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="tasks">
            {screenProps => (
              <SupplierTasks {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="dataanalytics">
            {screenProps => (
              <DataAnalytics {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="companyprofile">
            {screenProps => (
              <CompanyProfile {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="editcompany">
            {screenProps => <EditCompany {...screenProps} user={props.user} />}
          </AppStack.Screen>
          <AppStack.Screen name="humanresource">
            {screenProps => (
              <HumanResource {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="orders">
            {screenProps => <Orders {...screenProps} user={props.user} />}
          </AppStack.Screen>
          <AppStack.Screen name="personalprofile">
            {screenProps => (
              <PersonalProfile {...screenProps} user={props.user} />
            )}
          </AppStack.Screen>
          <AppStack.Screen name="editprofile">
            {screenProps => <EditPersonal {...screenProps} user={props.user} />}
          </AppStack.Screen>
        </AppStack.Navigator>
      );
    } else {
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
    }
  } else {
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
  function updateUserAttributes(attributes) {
    setUserAttributes(attributes);
  }

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      {isUserLoggedIn === 'initializing' && <Initializing />}
      {isUserLoggedIn === 'loggedIn' && (
        <AppNavigator updateAuthState={updateAuthState} user={userDetails} />
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
