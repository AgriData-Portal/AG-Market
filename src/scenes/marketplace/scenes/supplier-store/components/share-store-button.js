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
import {log} from '_utils';
import {DetailsModal} from '_components';
import {userStore} from '_store';

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
  const companyID = userStore(state => state.companyID);
  const userName = userStore(state => state.userName);
  const userID = userStore(state => state.userID);
  const companyName = userStore(state => state.companyName);

  const sendStoreDetails = async () => {
    try {
      log(props.id + companyID);
      const updateChat = await API.graphql({
        query: updateChatGroup,
        variables: {
          input: {
            id: props.id + companyID,
            mostRecentMessage: 'Store Catalog',
            mostRecentMessageSender: userName,
          },
        },
      });
      log('chat group already exist');
      log(props.name);
    } catch (e) {
      log(e);
      if (e.errors[0].errorType == 'DynamoDB:ConditionalCheckFailedException') {
        try {
          const chatGroup = {
            id: props.id + companyID,
            name: props.name + '+' + companyName,
            retailerID: props.id,
            supplierID: companyID,
            mostRecentMessage: 'Store Catalog',
            mostRecentMessageSender: userName,
          };
          log(chatGroup);
          const createdChatGroup = await API.graphql({
            query: createChatGroup,
            variables: {input: chatGroup},
          });
          log(createdChatGroup);
        } catch (e) {
          log(e.errors[0].errorType);
        }
      } else {
        log(e.errors[0].errorType);
      }
    }

    log('creating store ' + companyName);

    const store = {
      chatGroupID: props.id + companyID,
      type: 'store',
      content: companyID + '+' + companyName,
      sender: userName,
      senderID: userID,
    };
    try {
      const message = await API.graphql({
        query: createMessage,
        variables: {input: store},
      });
      log(message.data.createMessage);
    } catch {
      e => log(e);
    }

    setSuccessModal(true);
    //setSuccessModal(true);
    setSupermarketButton(false);
  };
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
          <Text style={[Typography.normal]}>{props.name}</Text>
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
            onPress={() => [sendStoreDetails()]}
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
  const companyType = userStore(state => state.companyType);
  const companyName = userStore(state => state.companyName);
  const companyID = userStore(state => state.companyID);

  const getAllSupermarkets = async () => {
    try {
      if (companyType == 'supplier') {
        const listRetailer = await API.graphql({
          query: listRetailerCompanys,
        });

        setSupermarkets(listRetailer.data.listRetailerCompanys.items);
      } else {
        const listSupplier = await API.graphql({
          query: listSupplierCompanys,
        });

        setSupermarkets(listSupplier.data.listSupplierCompanys.items);
      }
    } catch (e) {
      log(e);
    }
  };

  useEffect(() => {
    getAllSupermarkets();
  }, []);
  const shareStore = async () => {
    const shareOptions = {
      message: 'Check out ' + companyName + '\n',
      url:
        'https://agridataportal.com/app.html?store=' +
        companyName.replace(' ', '@') +
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
      {/* TRANSLATION */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: hp('2%'),
        }}>
        <Text style={[Typography.large]}>Supermarkets</Text>
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
        top={hp('3%')}
        text={'Share to WhatsApp'}
      />
    </View>
  );
};

export default ShareStoreButton;
