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

import {
  getSupplierCompany,
  getRetailerCompany,
  getFarmerCompany,
} from '_graphql/queries';

import {log} from '_utils';
import {companyStore} from '_store';
import {Font} from '_components';

const DetailsModal = props => {
  const [companyDetails, setCompanyDetails] = useState([]);
  const [imageSource, setImageSource] = useState(null);
  const companyType = companyStore(state => state.companyType);
  const companyID = companyStore(state => state.companyID);

  const getStoreDetails = async () => {
    log(props.id);

    if (companyType == 'retailer' || companyType == 'farmer') {
      try {
        log('getting supplier');
        var storeDetails = await API.graphql({
          query: getSupplierCompany,
          variables: {id: props.id},
        });

        setCompanyDetails(storeDetails.data.getSupplierCompany);
      } catch (e) {
        log(e);
      }
    } else if (companyType == 'supplier' && !props.buyingMode) {
      try {
        log('getting retailer');
        var storeDetails = await API.graphql({
          query: getRetailerCompany,
          variables: {id: props.id},
        });

        setCompanyDetails(storeDetails.data.getRetailerCompany);
      } catch (e) {
        log(e);
      }
    } else if (companyType == 'supplier' && props.buyingMode) {
      try {
        log('getting farmer');
        var storeDetails = await API.graphql({
          query: getFarmerCompany,
          variables: {id: props.id},
        });

        setCompanyDetails(storeDetails.data.getFarmerCompany);
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
        <Font.Header style={{top: hp('2%')}}>{props.name}</Font.Header>

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
        {/* TRANSLATION */}
        {companyDetails.rating == null ? (
          <Font.Normal>No ratings yet</Font.Normal>
        ) : (
          <View style={{flexDirection: 'row'}}>
            <Rating
              imageSize={wp('6%')}
              readonly={true}
              startingValue={companyDetails.rating.currentRating}></Rating>
            <Font.Normal style={{left: wp('1%')}}>
              ( {companyDetails.rating.numberOfRatings} )
            </Font.Normal>
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
              <Font.Placeholder>
                {Strings.companyRegistrationNum}
              </Font.Placeholder>
              <Font.Normal>{companyDetails.registrationNumber}</Font.Normal>
            </View>
            <View style={{top: hp('1%')}}>
              <Font.Placeholder>{Strings.companyAddress}</Font.Placeholder>
              <Font.Normal style={{width: wp('70%')}}>
                {companyDetails.address}
              </Font.Normal>
            </View>
            <View style={{top: hp('2%')}}>
              <Font.Placeholder>{Strings.contactNumber}</Font.Placeholder>
              {companyDetails.contactDetails != null ? (
                <Font.Normal>{companyDetails.contactDetails.phone}</Font.Normal>
              ) : (
                <Font.Normal>Not Added Yet</Font.Normal>
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
