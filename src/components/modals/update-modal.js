import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Linking,
} from 'react-native';
import Modal from 'react-native-modal';
import {BlueButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {versionStore} from '_store';

export const UpdateAppModal = props => {
  const updateStatus = versionStore(state => state.updateStatus);

  return (
    <View
      style={{
        backgroundColor: Colors.GRAY_LIGHT,
        width: wp('70%'),
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <View>
        {/* TRANSLATION */}
        <View>
          <Text
            style={[
              Typography.normal,
              {textAlign: 'center', marginTop: hp('2%')},
            ]}>
            Please Update The App to Continue Usage!!
          </Text>
        </View>
        <View
          style={{
            marginTop: hp('4%'),
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          {updateStatus == 'forceUpdate' ? (
            <TouchableOpacity
              onPress={() =>
                Platform.OS == 'ios'
                  ? Linking.openURL(
                      'https://apps.apple.com/my/app/ag-market/id1577002466',
                    )
                  : Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.agmarket_app',
                    )
              }
              style={{
                backgroundColor: Colors.GRAY_MEDIUM,
                width: wp('70%'),
                height: hp('7%'),
                justifyContent: 'center',
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopWidth: 1,
                zIndex: 100,
              }}>
              <Text style={[Typography.normal, {textAlign: 'center'}]}>
                Update Now
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  Platform.OS == 'ios'
                    ? Linking.openURL(
                        'https://apps.apple.com/my/app/ag-market/id1577002466',
                      )
                    : Linking.openURL(
                        'https://play.google.com/store/apps/details?id=com.agmarket_app',
                      )
                }
                style={{
                  backgroundColor: Colors.GRAY_MEDIUM,
                  width: wp('35%'),
                  height: hp('7%'),
                  justifyContent: 'center',
                  borderBottomLeftRadius: 10,
                  borderTopWidth: 1,
                  zIndex: 100,
                }}>
                <Text style={[Typography.normal, {textAlign: 'center'}]}>
                  Update Now
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.setUpdateModal(false)}
                style={{
                  backgroundColor: Colors.GRAY_MEDIUM,
                  width: wp('35%'),
                  height: hp('7%'),
                  justifyContent: 'center',
                  borderBottomRightRadius: 10,
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  zIndex: 100,
                }}>
                <Text style={[Typography.normal, {textAlign: 'center'}]}>
                  Update Later
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
