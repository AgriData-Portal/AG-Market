import React, {useState, useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {CloseButton, SuccessNavigateChatModal, BlueButton} from '_components';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Modal from 'react-native-modal';
import {Rating} from 'react-native-ratings';

import {API, Storage} from 'aws-amplify';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

import {getSupplierCompany, getRetailerCompany} from '_graphql/queries';

import {log} from '_utils';
import {userStore} from '_store';

const DetailsModal = props => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  const companyType = userStore(state => state.companyType);

  const getStoreDetails = async () => {
    if (companyType == 'retailer') {
      try {
        var storeDetails = await API.graphql({
          query: getSupplierCompany,
          variables: {id: props.id},
        });
        log('retailer');
        setCompanyDetails(storeDetails.data.getSupplierCompany);
      } catch (e) {
        log(e);
      }
    } else if (companyType == 'supplier') {
      try {
        var storeDetails = await API.graphql({
          query: getRetailerCompany,
          variables: {id: props.id},
        });
        log('supplier');
        setCompanyDetails(storeDetails.data.getRetailerCompany);
      } catch (e) {
        log(e);
      }
    }
  };
  useEffect(() => {
    getStoreDetails();
    log('Fetching Details');
  }, []);
  useEffect(async () => {
    if (companyDetails.logo) {
      try {
        const imageURL = await Storage.get(companyDetails.logo);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        log(e);
      }
    }
  }, [companyDetails]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width: wp('90%'),
        height: hp('85%'),
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
      }}>
      <View style={{position: 'absolute', right: hp('1%'), top: hp('1%')}}>
        <CloseButton setModal={props.setDetailsModal} />
      </View>
      <View style={{alignItems: 'center', top: hp('3%')}}>
        <Text style={[Typography.header, {top: hp('2%')}]}>{props.name}</Text>

        <View
          style={{
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
        </View>
        {companyDetails.rating == null ? (
          <Text style={[Typography.normal]}>No ratings yet</Text>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Rating
              imageSize={wp('6%')}
              readonly={true}
              startingValue={companyDetails.rating.currentRating}></Rating>
            <Text style={[Typography.normal, {left: wp('1%')}]}>
              ( {companyDetails.rating.numberOfRatings} )
            </Text>
          </View>
        )}
        <View
          style={{
            alignItems: 'flex-start',
            backgroundColor: Colors.GRAY_LIGHT,
            width: wp('80%'),
            height: hp('33%'),
            top: hp('3%'),
            borderRadius: 10,
          }}>
          <View
            style={{alignItems: 'flex-start', top: hp('2%'), left: wp('5%')}}>
            <View>
              <Text style={[Typography.placeholder]}>
                {Strings.companyRegistrationNum}
              </Text>
              <Text style={[Typography.normal]}>
                {companyDetails.registrationNumber}
              </Text>
            </View>
            <View style={{top: hp('1%')}}>
              <Text style={[Typography.placeholder]}>
                {Strings.companyAddress}
              </Text>
              <Text style={[Typography.normal, {width: wp('70%')}]}>
                {companyDetails.address}
              </Text>
            </View>
            <View style={{top: hp('2%')}}>
              <Text style={[Typography.placeholder]}>
                {Strings.contactNumber}
              </Text>
              {companyDetails.contactDetails != null ? (
                <Text style={[Typography.normal]}>
                  {companyDetails.contactDetails.phone}
                </Text>
              ) : (
                <Text style={[Typography.normal]}>Not Added Yet</Text>
              )}
            </View>
          </View>
        </View>
        {props.children ? props.children : <View />}
        {/* {props.button == 'true' ? (
          <BlueButton
            top={hp('5%')}
            borderRadius={10}
            text={'Send Catalog'}
            font={Typography.normal}
            onPress={props.onSend}
            onPressIn={props.onOut}
            disabled={props.disabled}
          />
        ) : (
          <View />
        )} */}
      </View>
    </View>
  );
};

export default DetailsModal;
