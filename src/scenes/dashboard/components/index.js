import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  TextInput,
  BackHandler,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import DropDownPicker from 'react-native-dropdown-picker';
import {LIGHT_BLUE} from '_styles';
import {Auth} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const MarketplaceButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('marketplace')}
    style={{
      top: Mixins.scaleHeight(props.top),
      width: wp('80%'),
      height: hp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        width: wp('80%'),
        height: hp('12%'),
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.4,
      }}
      source={require('_assets/images/groceries-resized.png')}></Image>
    <Text style={[Typography.welcome, {textTransform: 'uppercase'}]}>
      {Strings.marketplace}
    </Text>
  </TouchableOpacity>
);

export const ChatButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('inbox')}
    style={{
      top: Mixins.scaleHeight(props.top),
      width: wp('80%'),
      height: hp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        width: wp('80%'),
        height: hp('12%'),
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.4,
      }}
      source={require('_assets/images/chat-resized.png')}></Image>
    <Text style={[Typography.welcome, {textTransform: 'uppercase'}]}>
      {Strings.chats}
    </Text>
  </TouchableOpacity>
);

export const InvoiceButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('orders')}
    style={{
      top: Mixins.scaleHeight(props.top),
      width: wp('80%'),
      height: hp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        width: wp('80%'),
        height: hp('12%'),
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.4,
      }}
      source={require('_assets/images/planner-resized.png')}></Image>
    <Text style={[Typography.welcome, {textTransform: 'uppercase'}]}>
      {Strings.invoices}
    </Text>
  </TouchableOpacity>
);

export const ToDoButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('tasks')}
    style={{
      top: Mixins.scaleHeight(props.top),
      width: wp('80%'),
      height: hp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        width: wp('80%'),
        height: hp('12%'),
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.4,
      }}
      source={require('_assets/images/calendar-resized.png')}></Image>
    <Text style={[Typography.welcome, {textTransform: 'uppercase'}]}>
      {Strings.todo}
    </Text>
  </TouchableOpacity>
);

export const DataAnalyticsButton = props => (
  <TouchableOpacity
    onPress={() => props.navigation.navigate('dataanalytics')}
    style={{
      top: Mixins.scaleHeight(props.top),
      width: wp('80%'),
      height: hp('15%'),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    }}>
    <Image
      style={{
        resizeMode: 'cover',
        width: wp('80%'),
        height: hp('12%'),
        position: 'absolute',
        borderRadius: 10,
        opacity: 0.4,
      }}
      source={require('_assets/images/data-resized.png')}></Image>
    <Text style={[Typography.welcome, {textTransform: 'uppercase'}]}>
      {Strings.dataAnalytics}
    </Text>
  </TouchableOpacity>
);

export const MenuButton = props => {
  const [menuButtonModal, setMenuButtonModal] = useState(false);

  return (
    <TouchableOpacity onPress={() => setMenuButtonModal(true)}>
      <Icon
        color={Colors.GRAY_DARK}
        name="menu-outline"
        size={Mixins.scaleWidth(30)}
      />
      <Modal
        animationIn="fadeInLeft"
        animationOut="fadeOutLeft"
        isVisible={menuButtonModal}
        onBackdropPress={() => setMenuButtonModal(false)}>
        <MenuButtonModal
          userType={props.userType}
          setMenuButtonModal={setMenuButtonModal}
          navigation={props.navigation}
          updateAuthState={props.updateAuthState}
        />
      </Modal>
    </TouchableOpacity>
  );
};

export const MenuButtonModal = props => {
  const signOut = async () => {
    try {
      await Auth.signOut();
      props.updateAuthState('loggedOut');
      console.log('Logged Out');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  };
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('100%'),
        backgroundColor: Colors.PALE_GREEN,
        right: wp('42%'),
        borderRadius: 20,
      }}>
      <TouchableOpacity
        onPress={() => props.setMenuButtonModal(false)}
        style={{
          top: hp('10%'),
          left: wp('40%'),
          zIndex: 3,
          width: wp('10%'),
        }}>
        <Icon name="close-outline" size={wp('10%')} />
      </TouchableOpacity>
      <View>
        <Image
          style={{
            left: wp('43%'),
            top: hp('11%'),
            resizeMode: 'contain',
            width: wp('30%'),
            height: hp('13%'),
          }}
          source={require('_assets/images/agridata.png')}
        />
      </View>
      <View
        style={{
          borderBottomColor: Colors.GRAY_MEDIUM,
          borderBottomWidth: wp('0.5%'),
          top: hp('10%'),
        }}
      />

      {props.userType == 'supplier' ||
      props.userType == 'general-manager' ||
      props.userType == 'owner' ? (
        <View>
          <TouchableOpacity
            onPress={() => [
              props.setMenuButtonModal(false),
              props.navigation.navigate('companyprofile'),
            ]}
            style={{
              top: hp('16%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="briefcase-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>
                  {Strings.companyProfile}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => [
              props.setMenuButtonModal(false),
              props.navigation.navigate('personalprofile'),
            ]}
            style={{
              top: hp('19%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="person-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>
                  {Strings.personalProfile}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => [
              props.setMenuButtonModal(false),
              props.navigation.navigate('humanresource'),
            ]}
            style={{
              top: hp('22%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="people-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>
                  {Strings.humanResource}
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signOut()}
            style={{
              top: hp('25%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="log-out-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>{Strings.logOut}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <TouchableOpacity
            onPress={() => [
              props.setMenuButtonModal(false),
              props.navigation.navigate('personalprofile'),
            ]}
            style={{
              top: hp('16%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="person-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>Personal Profile</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => signOut()}
            style={{
              top: hp('19%'),
              left: wp('42%'),
              zIndex: 3,
              width: wp('50%'),
            }}>
            <View style={{flexDirection: 'row'}}>
              <Icon name="log-out-outline" size={wp('7%')} />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  left: wp('3%'),
                }}>
                <Text style={[Typography.placeholder]}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
