import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import {
  Marketplace, //done
  Store, //done
  Inbox, //done
  ChatRoom, //done but no modal
  BuyerOrders, //Done
  BuyerTask, //done
  CompanyProfile,
  EditCompany,
  HumanResource,
  PersonalProfile,
  EditPersonal,
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
import {MenuButton} from '_components';
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
import {DetailsModal} from '_components';
import Modal from 'react-native-modal';
import {log} from '_utils';
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
      return Strings.marketplace;
    case 'orders':
      return Strings.orders;
    case 'tasks':
      return Strings.tasks;
    case 'dataanalytics':
      return Strings.analytics;
  }
}

export {RMNavigation};

const RMNavigation = props => {
  const [detailsModal, setDetailsModal] = useState(false);
  return (
    <AppStack.Navigator
      screenOptions={{
        headerStyle: {
          height: Platform.OS === 'ios' ? hp('9.5%') : hp('8%'),
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('store', {
                  itemId: route.params.itemID.slice(36, 72),
                  storeName: route.params.chatName,
                });
              }}>
              <Font.Large>{route.params.chatName}</Font.Large>
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          // headerRight: () => <ChatInfo />,
          headerLeft: () => (
            <HeaderBackButton
              onPress={() => [
                updateLastSeen(
                  (userID = props.user.id),
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
          headerTitleAlign: 'center',
          headerLeft: () => (
            <HeaderBackButton onPress={() => navigation.goBack()} />
          ),
          headerTitle: () => (
            <View>
              <TouchableOpacity onPress={() => setDetailsModal(true)}>
                <Font.Large>{route.params.storeName}</Font.Large>
              </TouchableOpacity>
              <Modal
                isVisible={detailsModal}
                onBackdropPress={() => setDetailsModal(false)}>
                <DetailsModal
                  companyType={'retailer'}
                  name={route.params.storeName}
                  id={route.params.itemId}
                  setDetailsModal={setDetailsModal}></DetailsModal>
              </Modal>
            </View>
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
        {screenProps => <EditPersonal {...screenProps} user={props.user} />}
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
          <BuyerOrders
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
                    width: wp('7.5%'),
                    height: hp('4%'),
                    resizeMode: 'contain',
                    tintColor: Colors.LIME_GREEN,
                  }}
                />
                <Font.Small
                  style={{
                    color: Colors.LIME_GREEN,
                  }}>
                  {Strings.market}
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
                <Image
                  source={require('_assets/images/online-store.png')}
                  style={{
                    width: wp('7.5%'),
                    height: hp('4.2%'),
                    resizeMode: 'contain',
                    tintColor: 'black',
                  }}
                />
                <Font.Small
                  style={{
                    color: 'black',
                  }}>
                  {Strings.market}
                </Font.Small>
              </View>
            ),
          tabBarLabel: () => {
            return null;
          },
        }}>
        {screenProps => (
          <Marketplace
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
          <BuyerTask
            {...screenProps}
            updateAuthState={props.updateAuthState}
            user={props.user}
            company={props.company}
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
