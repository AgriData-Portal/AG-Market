import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
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
import {BlueButton} from '_components';
import {log} from '_utils';
import {companyStore} from '_store';

export {EditCompany};

export const CompanyProfile = props => {
  const [company, setCompany] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const companyName = companyStore(state => state.companyName);
  const companyRegistrationNumber = companyStore(
    state => state.companyRegistrationNumber,
  );
  const companyAddress = companyStore(state => state.companyAddress);
  const companyNumber = companyStore(state => state.companyNumber);
  const companyEmail = companyStore(state => state.companyEmail);
  const companyBankDetails = companyStore(state => state.companyBankDetails);
  const companyBankName = companyStore(state => state.companyBankName);
  const companyLogoFileName = companyStore(state => state.companyLogoFileName);

  useEffect(() => {
    getCompanyProfile();
  }, []);

  useEffect(async () => {
    if (companyLogoFileName) {
      try {
        const imageURL = await Storage.get(companyLogoFileName);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        log(e);
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
        log('Get suppplier company profile');
      } catch (e) {
        log('fail');
        log(props.user.supplierCompanyID);
        log(e);
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
        log('Get retailer company profile');
      } catch (e) {
        log(e);
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
        log('Get retailer company profile');
      } catch (e) {
        log(e);
      }
    }
    log(companyProfile.data);
  };
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        height: hp('100%'),
        backgroundColor: 'white',
      }}>
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
        <Text style={[Typography.header, {top: hp('2%')}]}>{companyName}</Text>
      </View>
      <View
        style={{
          top: hp('8%'),
          backgroundColor: Colors.GRAY_MEDIUM,
          width: wp('85%'),
          height: hp('43%'),
          borderRadius: 10,
        }}>
        <View style={{flex: 1}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            contentContainerStyle={{flexGrow: 1}}
            nestedScrollEnabled={true}
            scrollToOverflowEnabled={true}
            contentContainerStyle={
              Platform.OS == 'ios '
                ? {paddingBottom: 0}
                : {paddingBottom: hp('5%')}
            }>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyRegistrationNum}
              </Text>
              <View>
                <Text style={[Typography.normal]}>
                  {companyRegistrationNumber}
                </Text>
              </View>
            </View>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.companyAddress}
              </Text>
              <View>
                <Text style={[Typography.normal]}>{companyAddress}</Text>
              </View>
            </View>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.contactNumber}
              </Text>
              <View>
                {companyNumber != null ? (
                  <Text style={[Typography.normal]}>{companyNumber}</Text>
                ) : (
                  <Text style={[Typography.normal]}>Not Added Yet</Text>
                )}
              </View>
            </View>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>{Strings.email}</Text>
              {/* TRANSLATION */}
              <View>
                {companyEmail != null ? (
                  <Text style={[Typography.normal]}>{companyEmail}</Text>
                ) : (
                  <Text style={[Typography.normal]}>Not Added Yet</Text>
                )}
              </View>
            </View>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.bankDetails}
              </Text>
              {companyBankDetails != null ? (
                <Text style={[Typography.normal]}>{companyBankDetails}</Text>
              ) : (
                <Text style={[Typography.normal]}>Not Added Yet</Text>
              )}
            </View>
            <View
              style={{
                top: hp('2%'),
                left: wp('6%'),
                width: wp('73%'),
                marginBottom: Platform.OS == 'ios' ? hp('1%') : hp('0.5%'),
              }}>
              <Text style={[Typography.placeholderSmall]}>
                {Strings.bankName}
              </Text>
              {companyBankName != null ? (
                <Text style={[Typography.normal]}>{companyBankName}</Text>
              ) : (
                <Text style={[Typography.normal]}>Not Added Yet</Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      <BlueButton
        onPress={() => {
          if (imageSource) {
            props.navigation.navigate('editcompany', {
              contactNumber: companyNumber,
              email: companyEmail,
              bankNumber: companyBankDetails,
              bankName: companyBankName,
              logo: imageSource,
            });
          } else {
            props.navigation.navigate('editcompany', {
              contactNumber: companyNumber,
              email: companyEmail,
              bankNumber: companyBankDetails,
              bankName: companyBankName,
              logo: null,
            });
          }
        }}
        font={Typography.small}
        text={Strings.editCompanyProfile}
        maxWidth={wp('80%')}
        borderRadius={10}
        top={hp('11%')}
      />
    </SafeAreaView>
  );
};
