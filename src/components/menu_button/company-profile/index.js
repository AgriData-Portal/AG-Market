import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {EditCompany} from './edit-company';
import {API} from 'aws-amplify';
import {getSupplierCompany, getRetailerCompany} from '../../../graphql/queries';

export {EditCompany};

export const CompanyProfile = props => {
  const [company, setCompany] = useState([]);
  useEffect(() => {
    getCompanyProfile();
  }, []);
  const getCompanyProfile = async () => {
    if (props.user.retailerCompanyID == null) {
      try {
        var companyProfile = await API.graphql({
          query: getSupplierCompany,
          variables: {
            id: props.user.supplierCompanyID,
          },
        });
        setCompany(companyProfile.data.getSupplierCompany);
        console.log('Get suppplier company profile');
      } catch (e) {
        console.log('fail');
        console.log(props.user.supplierCompanyID);
        console.log(e);
      }
    } else {
      try {
        var companyProfile = await API.graphql({
          query: getRetailerCompany,
          variables: {
            id: props.user.retailerCompanyID,
          },
        });
        setCompany(companyProfile.data.getRetailerCompany);
        console.log('Get retailer company profile');
      } catch (e) {
        console.log(e);
      }
    }
    console.log(companyProfile.data);
  };
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      {/*<View
        style={{
          backgroundColor: 'red',
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
        </View>*/}
      <View
        style={{
          top: hp('4%'),
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
        <Text style={[Typography.header, {top: hp('2%')}]}>{company.name}</Text>
      </View>
      <View
        style={{
          top: hp('8%'),
          backgroundColor: Colors.GRAY_MEDIUM,
          width: wp('85%'),
          height: hp('40%'),
          borderRadius: 10,
        }}>
        <View
          style={{
            top: hp('2%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyRegistrationNum}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>
              {company.registrationNumber}
            </Text>
          </View>
        </View>
        <View
          style={{
            top: hp('4%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('7%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyAddress}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>{company.address}</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('6%'),
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
            top: hp('8%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>citygrocerkk@gmail.com</Text>
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
            {Strings.bankDetails}
          </Text>
          <View style={{top: hp('1%')}}>
            <Text style={[Typography.normal]}>13812641234146194672136417</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
