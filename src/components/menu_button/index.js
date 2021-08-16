import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Switch,
  TextInput,
  BackHandler,
  Platform,
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
import {CompanyProfile, EditCompany} from './company-profile';
import {PersonalProfile, EditPersonal} from './personal-profile';
import {HumanResource} from './human-resource';
import {log} from '_utils';
import SwitchToggle from 'react-native-switch-toggle';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

export {
  CompanyProfile,
  EditCompany,
  HumanResource,
  PersonalProfile,
  EditPersonal,
};

export const MenuButton = props => {
  const [menuButtonModal, setMenuButtonModal] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => [setMenuButtonModal(true), log(props.userType)]}
      style={{left: wp('5%')}}>
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
          company={props.company}
          on={props.on}
          off={props.off}
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
      log('Logged Out');
    } catch (error) {
      log('Error signing out: ', error);
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
          top: hp('5%'),
          left: wp('40%'),
          zIndex: 3,
          width: wp('10%'),
        }}>
        <Icon name="close-outline" size={wp('10%')} />
      </TouchableOpacity>
      <View>
        <Image
          style={{
            left: wp('40%'),
            top: hp('4%'),
            resizeMode: 'contain',
            width: wp('40%'),
            height: hp('20%'),
          }}
          source={require('_assets/images/agridata.png')}
        />
      </View>
      <View
        style={{
          borderBottomColor: Colors.GRAY_MEDIUM,
          borderBottomWidth: wp('0.5%'),
          top: hp('2%'),
        }}
      />

      {props.userType == 'General Manager' || props.userType == 'Owner' ? (
        <View>
          <TouchableOpacity
            onPress={() => [
              props.setMenuButtonModal(false),
              props.navigation.navigate('companyprofile'),
            ]}
            style={{
              top: hp('5%'),
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
              top: hp('8%'),
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
              top: hp('11%'),
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
              top: hp('14%'),
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
              top: hp('4%'),
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
            onPress={() => signOut()}
            style={{
              top: hp('6%'),
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
      )}
      {props.company ? (
        <View
          style={{
            position: 'absolute',
            left: wp('70%'),
            top: hp('4%'),
          }}>
          <SwitchToggle
            switchOn={props.on}
            onPress={() => props.off(!props.on)}
            containerStyle={{
              marginTop: 16,
              width: wp('25%'),
              height: Platform.OS == 'ios' ? hp('4%') : hp('5%'),
              borderRadius: 25,
              padding: wp('1.5%'),
              borderColor: 'gray',
              borderWidth: 0.5,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
            backTextLeft={props.on ? 'Sell' : null}
            textLeftStyle={[
              Typography.normal,
              {
                position: 'absolute',

                bottom: Platform.OS == 'ios' ? hp('-1.4%') : hp('-2%'),
              },
            ]}
            backTextRight={props.on ? null : 'Buy'}
            textRightStyle={[
              Typography.normal,
              {
                position: 'absolute',
                left: Platform.OS == 'ios' ? wp('3.5%') : wp('5.5%'),
                bottom: Platform.OS == 'ios' ? hp('-1.4%') : hp('-2%'),
              },
            ]}
            backgroundColorOn="white"
            backgroundColorOff="white"
            circleColorOff={Colors.LIGHT_BLUE}
            circleColorOn={Colors.LIGHT_BLUE}
            buttonText={props.on ? 'Buy' : 'Sell'}
            buttonTextStyle={[
              Typography.normal,
              {
                top: Platform.OS == 'ios' ? hp('0.8%') : hp('1%'),
                textAlign: 'center',
                right: wp('0.3%'),
              },
            ]}
            circleStyle={{
              width: Platform.OS == 'ios' ? hp('4.5%') : wp('9%'),
              height: Platform.OS == 'ios' ? hp('4.5%') : wp('9%'),
              borderRadius: 100,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
