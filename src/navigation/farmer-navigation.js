import React, {useEffect, useState} from 'react';

import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';

import {
  Store, //done
  Inbox, //done
  ChatRoom, //done but no modal
  SellingOrders, //Done
  SellerTask, //done
  ShareStoreButton,
  SupplierStore,
  CompanyProfile,
  EditCompany,
  HumanResource,
  PersonalProfile,
  EditPersonal,
} from '_scenes';
import 'react-native-gesture-handler';
import {DataAnalytics} from '_scenes/data_analytics/';
import Amplify, {Auth, API, graphqlOperation} from 'aws-amplify';
import {Colors} from '_styles/';
import {View, TouchableOpacity, Text, Image} from 'react-native';
import {Typography} from '_styles';
import {MenuButton} from '_components';
import Strings from '_utils';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {updateChatGroupUsers, createChatGroupUsers} from '../graphql/mutations';

import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {DetailsModal} from '_components';
import Modal from 'react-native-modal';
import {log} from '_utils';
import {userStore} from '_store';
import {Font} from '_components';

var dayjs = require('dayjs');
const TabStack = createBottomTabNavigator();
const AppStack = createStackNavigator();

function getHeaderTitle(route) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'inbox';

  switch (routeName) {
    case 'inbox':
      return Strings.inbox;
    case 'marketplace':
      return Strings.myStore;
    case 'orders':
      return Strings.orders;
    case 'tasks':
      return Strings.tasks;
    case 'dataanalytics':
      return Strings.analytics;
  }
}

function getIcon(route, user, navigation) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'inbox';
  if (routeName == 'marketplace') {
    return (
      <ShareStoreButton user={user} navigation={navigation}></ShareStoreButton>
    );
  } else {
    return null;
  }
}

export {FarmerNavigation};

const FarmerNavigation = props => {
  const [detailsModal, setDetailsModal] = useState(false);
  const userID = userStore(state => state.userID);
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          height: hp('8%'),
          elevation: 0,
          shadowOpacity: 0,
        },
      }}>
      <AppStack.Screen
        name={Strings.inbox}
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
          headerRight: () =>
            getIcon(
              (route = route),
              (user = props.user),
              (navigation = navigation),
            ),
        })}>
        {screenProps => (
          <TabbedNavigator
            {...screenProps}
            user={props.user}
            updateAuthState={props.updateAuthState}
            company={props.company}
          />
        )}
      </AppStack.Screen>

      <AppStack.Screen
        name="chatroom"
        options={({route, navigation}) => ({
          headerTitle: () => (
            <View>
              <TouchableOpacity onPress={() => setDetailsModal(true)}>
                <Font.Large>{route.params.chatName}</Font.Large>
              </TouchableOpacity>
              <Modal
                isVisible={detailsModal}
                onBackdropPress={() => setDetailsModal(false)}>
                <DetailsModal
                  companyType={'supplier'}
                  name={route.params.chatName}
                  id={route.params.itemID.slice(0, 36)}
                  setDetailsModal={setDetailsModal}></DetailsModal>
              </Modal>
            </View>
          ),
          headerTitleAlign: 'center',

          headerLeft: () => (
            <HeaderBackButton
              onPress={() => [
                updateLastSeen(
                  userID,
                  (chatGroupID = route.params.itemID),
                  (navigation = navigation),
                ),
              ]}
            />
          ),
        })}>
        {screenProps => <ChatRoom {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="store"
        options={({route, navigation}) => ({
          title: route.params.storeName,
          headerTitleStyle: [Typography.large],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => (
          <Store
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
            company={props.company}
          />
        )}
      </AppStack.Screen>

      <AppStack.Screen
        name="companyprofile"
        options={({route, navigation}) => ({
          title: Strings.companyProfile,
          headerTitleStyle: [Typography.large],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <CompanyProfile {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="editcompany"
        options={({route, navigation}) => ({
          title: 'Edit ' + Strings.companyProfile,
          headerTitleStyle: [Typography.large],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <EditCompany {...screenProps} user={props.user} />}
      </AppStack.Screen>
      <AppStack.Screen
        name="humanresource"
        options={({route, navigation}) => ({
          title: Strings.humanResource,
          headerTitleStyle: [Typography.large],
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
        })}>
        {screenProps => <HumanResource {...screenProps} user={props.user} />}
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
        {screenProps => (
          <EditPersonal
            {...screenProps}
            user={props.user}
            setUserDetails={props.setUserDetails}
          />
        )}
      </AppStack.Screen>
    </AppStack.Navigator>
  );
};

const TabbedNavigator = props => {
  return (
    <TabStack.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          backgroundColor: Colors.PALE_GREEN,

          height: hp('9.5%'),
        },
      }}>
      <TabStack.Screen
        name="inbox"
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
                  name="chatbubbles-outline"
                  size={wp('7%')}
                  style={{
                    color: Colors.LIME_GREEN,
                  }}></Icon>
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.chats}
                </Font.Small>
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
                  name="chatbubbles-outline"
                  size={wp('7%')}
                  style={{
                    color: 'black',
                  }}></Icon>
                <Font.Small
                  style={{
                    color: 'black',
                  }}>
                  {Strings.chats}
                </Font.Small>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <Inbox
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
          />
        )}
      </TabStack.Screen>

      <TabStack.Screen
        name="orders"
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
                  name="clipboard-outline"
                  size={wp('7%')}
                  style={{
                    color: Colors.LIME_GREEN,
                  }}></Icon>
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.orders}
                </Font.Small>
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
                  name="clipboard-outline"
                  size={wp('7%')}
                  style={{
                    color: 'black',
                  }}></Icon>
                <Font.Small
                  style={{
                    color: 'black',
                  }}>
                  {Strings.orders}
                </Font.Small>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <SellingOrders
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
            company={props.company}
          />
        )}
      </TabStack.Screen>

      <TabStack.Screen
        name="marketplace"
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
                <Image
                  source={require('_assets/images/online-store.png')}
                  style={{
                    width: wp('11%'),
                    height: hp('4%'),
                    resizeMode: 'contain',
                    tintColor: Colors.LIME_GREEN,
                  }}
                />
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.myStore}
                </Font.Small>
              </View>
            ) : (
              <View
                style={{
                  height: hp('5%'),
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: hp('0.5%'),
                }}>
                <Image
                  source={require('_assets/images/online-store.png')}
                  style={{
                    width: wp('20%'),
                    height: hp('4.2%'),
                    resizeMode: 'contain',
                    tintColor: 'black',
                  }}
                />
                <Text
                  style={{
                    color: 'black',
                  }}>
                  {Strings.myStore}
                </Text>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <SupplierStore
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
            company={props.company}
          />
        )}
      </TabStack.Screen>
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
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.tasks}
                </Font.Small>
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
                <Font.Small
                  style={{
                    color: 'black',
                  }}>
                  {Strings.tasks}
                </Font.Small>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <SellerTask
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
            company={props.company}
          />
        )}
      </TabStack.Screen>
      <TabStack.Screen
        name="dataanalytics"
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
                  name="stats-chart-outline"
                  size={wp('7%')}
                  style={{
                    color: Colors.LIME_GREEN,
                  }}></Icon>
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.analyticsSmall}
                </Font.Small>
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
                  name="stats-chart-outline"
                  size={wp('7%')}
                  style={{
                    color: 'black',
                  }}></Icon>
                <Font.Small
                  style={{
                    color: 'black',
                  }}>
                  {Strings.analyticsSmall}
                </Font.Small>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <DataAnalytics
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
          />
        )}
      </TabStack.Screen>
    </TabStack.Navigator>
  );
};

const updateLastSeen = async (userID, chatGroupID, navigation) => {
  const uniqueID = userID + chatGroupID;
  try {
    const updatedLastSeen = await API.graphql({
      query: updateChatGroupUsers,
      variables: {input: {id: uniqueID, lastOnline: dayjs()}},
    });
    log('updated last seen');
    navigation.navigate('inbox');
  } catch (e) {
    log(e);
    if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
      log('no special connection created, creating one now');
      const createLastSeen = await API.graphql({
        query: createChatGroupUsers,
        variables: {
          input: {
            id: uniqueID,
            lastOnline: dayjs(),
            userID: userID,
            chatGroupID: chatGroupID,
          },
        },
      });
      navigation.navigate('inbox');
    }
  }
};
