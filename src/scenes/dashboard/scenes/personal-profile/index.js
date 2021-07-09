import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const PersonalProfile = props => {
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          flexDirection: 'row',
          top: hp('3%'),
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('100%'),
        }}>
        <View style={{left: wp('4%'), position: 'absolute'}}>
          <BackButton navigation={props.navigation} />
        </View>
        <View>
          <Text style={[Typography.header]}>{Strings.personalProfile}</Text>
        </View>
        <TouchableOpacity
          style={{
            right: wp('4%'),
            position: 'absolute',
          }}>
          <Icon
            name="create-outline"
            size={wp('6%')}
            onPress={() => props.navigation.navigate('editprofile')}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: hp('8%'),
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('80%'),
          height: hp('25%'),
        }}>
        <Image
          source={require('_assets/images/company-logo.png')}
          style={{
            resizeMode: 'contain',
            width: wp('80%'),
            height: hp('20%'),
          }}
        />
        <Text style={[Typography.header, {top: hp('2%')}]}>NAME</Text>
      </View>
      <View
        style={{
          top: hp('14%'),
          backgroundColor: Colors.GRAY_MEDIUM,
          width: wp('85%'),
          height: hp('38%'),
          borderRadius: 10,
        }}>
        <View
          style={{
            top: hp('4%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyRole}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>General Manager</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('6%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.address}</Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>STREET, CITY, STATE</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('8%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>email@gmail.com</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('10%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.contactNumber}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>+60 11 6569 1999 </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
