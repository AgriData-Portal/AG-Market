import React from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const CompanyProfile = props => {
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
          <Text style={[Typography.header]}>{Strings.companyProfile}</Text>
        </View>
        <TouchableOpacity
          style={{
            right: wp('4%'),
            position: 'absolute',
          }}>
          <Icon
            name="create-outline"
            size={wp('6%')}
            onPress={() => props.navigation.navigate('editcompany')}
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
        <Text style={[Typography.header, {top: hp('2%')}]}>City Grocer</Text>
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
            {Strings.companyRegistrationNum}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>1010100101010101R</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('6%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('7%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyAddress}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>
              T1 Bundusan, Jalan Bundusan, Penampang, Sabah
            </Text>
          </View>
        </View>
        <View
          style={{
            top: hp('8%'),
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
        <View
          style={{
            top: hp('10%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>citygrocerkk@gmail.com</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
