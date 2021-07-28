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
import {API, Storage} from 'aws-amplify';
import {
  getSupplierCompany,
  getRetailerCompany,
  getFarmerCompany,
} from '../../../graphql/queries';

export {EditCompany};

export const CompanyProfile = props => {
  const [company, setCompany] = useState('');
  const [imageSource, setImageSource] = useState(null);
  useEffect(() => {
    getCompanyProfile();
  }, []);
  useEffect(async () => {
    if (company.logo) {
      try {
        const imageURL = await Storage.get(company.logo);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [company]);
  const getCompanyProfile = async () => {
    if (props.user.supplierCompanyID != null) {
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
    } else if (props.user.retailerCompanyID != null) {
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
    } else {
      try {
        var companyProfile = await API.graphql({
          query: getFarmerCompany,
          variables: {
            id: props.user.farmerCompanyID,
          },
        });
        setCompany(companyProfile.data.getFarmerCompany);
        console.log('Get retailer company profile');
      } catch (e) {
        console.log(e);
      }
    }
    console.log(companyProfile.data);
  };
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          top: hp('4%'),
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('80%'),
          height: hp('25%'),
        }}>
        {imageSource == null ? (
          <Image
            source={require('_assets/images/company-logo.png')}
            style={{
              resizeMode: 'contain',
              width: wp('80%'),
              height: hp('20%'),
            }}
          />
        ) : (
          <Image
            source={imageSource}
            style={{
              resizeMode: 'contain',
              width: wp('80%'),
              height: hp('20%'),
            }}
          />
        )}
        <Text style={[Typography.header, {top: hp('2%')}]}>{company.name}</Text>
      </View>
      <View
        style={{
          top: hp('8%'),
          backgroundColor: Colors.GRAY_MEDIUM,
          width: wp('85%'),
          height: hp('43%'),
          borderRadius: 10,
        }}>
        <View
          style={{
            top: hp('1%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyRegistrationNum}
          </Text>
          <View style={{top: hp('0.5%')}}>
            <Text style={[Typography.normal]}>
              {company.registrationNumber}
            </Text>
          </View>
        </View>
        <View
          style={{
            top: hp('3%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.companyAddress}
          </Text>
          <View style={{top: hp('0.5%')}}>
            <Text style={[Typography.normal]}>{company.address}</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('5%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.contactNumber}
          </Text>
          <View style={{top: hp('0.5%')}}>
            <Text style={[Typography.normal]}> {props.user.contactNumber}</Text>
          </View>
        </View>
        <View
          style={{
            top: hp('7%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
          <View style={{top: hp('0.5%')}}>
            {company.contactDetails != null ? (
              <Text style={[Typography.normal]}>
                {company.contactDetails.email}
              </Text>
            ) : (
              <Text style={[Typography.normal]}>Not Added Yet</Text>
            )}
          </View>
        </View>
        <View
          style={{
            top: hp('9%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>
            {Strings.bankDetails}
          </Text>
          {company.bankAccount != null ? (
            <Text style={[Typography.normal]}>
              {company.bankAccount.accountNumber}
            </Text>
          ) : (
            <Text style={[Typography.normal]}>Not Added Yet</Text>
          )}
        </View>
        <View
          style={{
            top: hp('11%'),
            left: wp('6%'),
            width: wp('73%'),
            height: hp('5%'),
          }}>
          <Text style={[Typography.placeholderSmall]}>{Strings.bankName}</Text>
          {company.bankAccount != null ? (
            <Text style={[Typography.normal]}>
              {company.bankAccount.bankName}
            </Text>
          ) : (
            <Text style={[Typography.normal]}>Not Added Yet</Text>
          )}
        </View>
      </View>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('editcompany', {
            contactNumber: props.user.contactNumber,
            email: 'email@test.com',
            bankNumber: '123521',
            bankName: 'maybank',
          })
        }
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: wp('45%'),
          height: hp('5%'),
          alignItems: 'center',
          justifyContent: 'center',
          top: hp('10%'),
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text style={[Typography.normal]}>
          {Strings.edit} {Strings.companyProfile}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
