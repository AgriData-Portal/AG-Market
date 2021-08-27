import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import {SuccessNavigateChatModal} from '_components';
import {Typography, Colors} from '_styles';
import Modal from 'react-native-modal';
import Share from 'react-native-share';

import Icon from 'react-native-vector-icons/Ionicons';

import {
  updateChatGroup,
  createChatGroup,
  createMessage,
} from '../../../../../graphql/mutations';
import {API} from 'aws-amplify';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  listRetailerCompanys,
  listSupplierCompanys,
} from '../../../../../graphql/queries';
import {BlueButton} from '_components';
import {log, marketPlace} from '_utils';
import {DetailsModal} from '_components';
import {userStore, companyStore} from '_store';
import Strings from '_utils';
import {Font} from '_components';

const RetailerList = props => {
  return (
    <FlatList
      data={props.supermarkets}
      renderItem={({item}) => {
        log(item);

        return (
          <RetailerCard
            name={item.name}
            id={item.id}
            navigation={props.navigation}
            setRetailerModal={props.setRetailerModal}
            user={user}></RetailerCard>
        );
      }}
    />
  );
};

const RetailerCard = props => {
  const [supermarketButton, setSupermarketButton] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const companyID = companyStore(state => state.companyID);
  const userName = userStore(state => state.userName);
  const userID = userStore(state => state.userID);
  const companyName = companyStore(state => state.companyName);

  return (
    <TouchableOpacity
      onPress={() => {
        setDetailsModal(true);
      }}
      style={{
        marginBottom: hp('2%'),
        width: wp('80%'),
        alignSelf: 'center',
        height: hp('8%'),
        borderColor: Colors.GRAY_DARK,
        borderWidth: 0.2,

        justifyContent: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={require('_assets/images/supermarket.png')}
          style={{
            width: wp('20%'),
            height: hp('6%'),
            resizeMode: 'contain',
            left: wp('5%'),
          }}
        />
        <View style={{left: wp('10%'), justifyContent: 'center'}}>
          <Font.Normal>{props.name}</Font.Normal>
        </View>
      </View>
      <Modal
        isVisible={detailsModal}
        onBackdropPress={() => setDetailsModal(false)}>
        <DetailsModal
          setDetailsModal={setDetailsModal}
          navigation={props.navigation}
          id={props.id}
          name={props.name}>
          <BlueButton
            onPress={() => [
              marketPlace
                .sendStoreDetails(
                  companyID,
                  props.id,
                  userName,
                  props.name,
                  companyName,
                  userID,
                )
                .then([setSuccessModal(true), setSupermarketButton(false)]),
            ]}
            onPressIn={() => setSupermarketButton(true)}
            disabled={supermarketButton}
            top={hp('5%')}
            borderRadius={10}
            text={'Send Catalog'}
            font={Typography.normal}
          />
        </DetailsModal>
        <Modal
          isVisible={successModal}
          onBackdropPress={() => setSuccessModal(false)}>
          <SuccessNavigateChatModal
            onPress={() => [
              props.navigation.navigate('chatroom', {
                itemID: props.id + companyID,
                chatName: props.name,
              }),
              props.setRetailerModal(false),
            ]}
            navigation={props.navigation}
            text="Catalog sent!"
          />
        </Modal>
      </Modal>
    </TouchableOpacity>
  );
};

const ShareStoreButton = props => {
  const [retailerModal, setRetailerModal] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setRetailerModal(true)}
        style={{right: wp('5%')}}>
        <Icon name="share-social-outline" size={wp('6%')} />
      </TouchableOpacity>
      <Modal
        isVisible={retailerModal}
        onBackdropPress={() => setRetailerModal(false)}>
        <RetailerModal
          setRetailerModal={setRetailerModal}
          navigation={props.navigation}
        />
      </Modal>
    </View>
  );
};

const RetailerModal = props => {
  const [supermarkets, setSupermarkets] = useState([]);
  const companyType = companyStore(state => state.companyType);
  const companyName = companyStore(state => state.companyName);
  const companyID = companyStore(state => state.companyID);

  useEffect(() => {
    marketPlace
      .getAllSupermarkets(companyType)
      .then(data => setSupermarkets(data));
  }, []);

  const shareStore = async () => {
    const shareOptions = {
      message: 'Check out ' + companyName + '\n',
      url:
        'https://agridataportal.com/app.html?store=' +
        companyName.replace(/ /g, '@') +
        '&storeID=' +
        companyID,
      social: Share.Social.WHATSAPP,
    };
    try {
      const shareResponse = await Share.shareSingle(shareOptions);
    } catch (e) {
      log(e);
    }
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        width: wp('90%'),
        height: hp('80%'),
        alignSelf: 'center',
        borderRadius: 10,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp('2%'),
        }}>
        {companyType == 'supplier' ? (
          <Font.Large>{Strings.supermarkets}</Font.Large>
        ) : (
          <Font.Large>{Strings.suppliers}</Font.Large>
        )}
      </View>
      <View style={{height: hp('65%'), top: hp('3%')}}>
        <RetailerList
          supermarkets={supermarkets}
          navigation={props.navigation}
          setRetailerModal={props.setRetailerModal}
        />
      </View>
      <BlueButton
        onPress={() => shareStore()}
        top={hp('2%')}
        text={'Share to WhatsApp'}
        borderRadius={10}
      />
    </View>
  );
};

export default ShareStoreButton;
