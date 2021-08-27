import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {AddEmployeeButton} from './add-member';
import Modal from 'react-native-modal';
import {API, Storage} from 'aws-amplify';
import {SuccesfulChangesModal} from '_components/modals';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {
  getUsersByRetailerCompany,
  getUsersBySupplierCompany,
  getSupplierCompany,
  getRetailerCompany,
  getFarmerCompany,
} from '../../../graphql/queries';
import {log} from '_utils';
import {Font} from '_components';
import {companyStore} from '_store';

export const HumanResource = props => {
  const [teamList, setTeamList] = useState([]);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [company, setCompany] = useState('');
  const [imageSource, setImageSource] = useState(null);
  const companyType = companyStore(state => state.companyType);
  const companyID = companyStore(state => state.companyID);
  const companyName = companyStore(state => state.companyName);

  useEffect(() => {
    getCompanyProfile();
  }, []);

  const getCompanyProfile = async () => {
    var companyLogo = null;
    if (companyType == 'supplier') {
      try {
        var companyProfile = await API.graphql({
          query: getSupplierCompany,
          variables: {
            id: companyID,
          },
        });
        setCompany(companyProfile.data.getSupplierCompany);
        setTeamList(companyProfile.data.getSupplierCompany.employees.items);
        companyLogo = companyProfile.data.getSupplierCompany.logo;
        log('Get suppplier company profile');
      } catch (e) {
        log('fail');
        log(companyID);
        log(e);
      }
    } else if (companyType == 'retailer') {
      try {
        var companyProfile = await API.graphql({
          query: getRetailerCompany,
          variables: {
            id: companyID,
          },
        });
        setCompany(companyProfile.data.getRetailerCompany);
        setTeamList(companyProfile.data.getRetailerCompany.employees.items);
        companyLogo = companyProfile.data.getRetailerCompany.logo;
        log('Get retailer company profile');
      } catch (e) {
        log(e);
      }
    } else {
      try {
        var companyProfile = await API.graphql({
          query: getFarmerCompany,
          variables: {
            id: companyID,
          },
        });
        setCompany(companyProfile.data.getFarmerCompany);
        setTeamList(companyProfile.data.getFarmerCompany.employees.items);
        companyLogo = companyProfile.data.getFarmerCompany.logo;
        log('Get retailer company profile');
      } catch (e) {
        log(e);
      }
    }

    if (companyLogo) {
      try {
        const imageURL = await Storage.get(companyLogo);
        setImageSource({
          uri: imageURL,
        });
      } catch (e) {
        log(e);
      }
    }
  };
  // const fetchMembers = async () => {
  //   if (props.user.retailerCompanyID == null) {
  //     log('supplier');
  //     try {
  //       const members = await API.graphql({
  //         query: getUsersBySupplierCompany,
  //         variables: {supplierCompanyID: props.user.supplierCompanyID},
  //       });
  //       log(members.data.getUsersBySupplierCompany.items);
  //       setTeamList(members.data.getUsersBySupplierCompany.items);
  //     } catch (e) {
  //       log(e);
  //     }
  //   } else {
  //     log('retailer');
  //     try {
  //       const members = await API.graphql({
  //         query: getUsersByRetailerCompany,
  //         variables: {retailerCompanyID: props.user.retailerCompanyID},
  //       });
  //       log(members.data.getUsersByRetailerCompany.items);
  //       setTeamList(members.data.getUsersByRetailerCompany.items);
  //     } catch (e) {
  //       log(e);
  //     }
  //   }
  // };
  // useEffect(() => {
  //   fetchMembers();
  //   log('useEffect Triggered');
  // }, []);
  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        backgroundColor: 'white',
        height: hp('100%'),
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('100%'),

          height: hp('30%'),
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
        <Font.Header style={{top: hp('2%')}}>{companyName}</Font.Header>
      </View>
      <View
        style={{
          backgroundColor: Colors.GRAY_MEDIUM,
          width: wp('85%'),
          height: hp('55%'),
          borderRadius: 10,
          alignSelf: 'center',
        }}>
        <View style={{top: hp('3%'), left: wp('5%')}}>
          <Font.PlaceholderSmall>{Strings.team}</Font.PlaceholderSmall>
        </View>
        <View style={{height: hp('40%'), top: hp('3%')}}>
          <ParticipantList
            data={teamList}
            trigger={trigger}
            setTrigger={setTrigger}
            user={props.user}
            setTeamList={setTeamList}
          />
        </View>
        <View style={{top: hp('5%'), width: wp('85%'), alignItems: 'center'}}>
          <AddEmployeeButton
            user={props.user}
            company={company}
            setTeamList={setTeamList}
          />
        </View>
      </View>
      <Modal
        isVisible={succesfulChangesModal}
        onBackdropPress={() => [setSuccesfulChangesModal(false)]}>
        <SuccesfulChangesModal
          setSuccesfulChangesModal={setSuccesfulChangesModal}
          navigation={props.navigation}
        />
      </Modal>
    </SafeAreaView>
  );
};

const Participant = props => {
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);
  return (
    <View
      style={{
        height: hp('6%'),
      }}>
      <View
        style={{
          height: hp('6%'),
          left: wp('5%'),
          alignSelf: 'flex-start',
          paddingVertical: hp('0.5%'),
        }}>
        <Font.Normal>{props.name}</Font.Normal>
        <Font.PlaceholderSmall
          style={{bottom: Platform.OS == 'ios' ? hp('0%') : hp('1%')}}>
          {props.role}
        </Font.PlaceholderSmall>
      </View>
      {props.role == 'General Manager' || props.role == 'Owner' ? (
        <View />
      ) : (
        <TouchableOpacity
          onPress={() => setConfirmRemoveModal(true)}
          style={{
            left: wp('75%'),
            bottom: hp('5%'),
            width: wp('8%'),
            height: hp('4%'),
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon name="trash-outline" size={wp('6%')} />
        </TouchableOpacity>
      )}
      <Modal isVisible={confirmRemoveModal}>
        <ConfirmRemoveModal
          setConfirmRemoveModal={setConfirmRemoveModal}
          user={props.user}
        />
      </Modal>
    </View>
  );
};

const ConfirmRemoveModal = props => {
  const removeMember = async () => {
    try {
      const member = await API.graphql({
        query: deleteUser,
        variables: {id: props.user.id},
      });
      log(members.data.getUsersBySupplierCompany.items);
    } catch (e) {
      log(e);
    }
  };
  return (
    <View
      style={{
        height: hp('48%'),
        width: wp('85%'),
        backgroundColor: Colors.LIGHT_RED,
        borderRadius: 20,
        alignItems: 'center',
        alignSelf: 'center',
      }}>
      <View style={{top: hp('3%')}}>
        <Image
          source={require('_assets/images/Good-Vege.png')}
          style={{
            resizeMode: 'contain',
            width: wp('55%'),
            height: hp('25%'),
          }}
        />
      </View>
      <View
        style={{
          top: hp('3%'),
        }}>
        <Font.Large style={{textAlign: 'center'}}>
          {Strings.removeMemberConfirm1}
        </Font.Large>
        <Font.Large style={{fontFamily: 'Poppins-Bold', textAlign: 'center'}}>
          {Strings.removeMemberConfirm2}
        </Font.Large>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => props.setConfirmRemoveModal(false)}
          style={{
            top: hp('7%'),
            backgroundColor: Colors.LIGHT_BLUE,
            width: wp('28%'),
            height: hp('5%'),
            justifyContent: 'center',
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            right: wp('3%'),
          }}>
          <Font.Normal style={{textAlign: 'center'}}>
            {Strings.cancel}
          </Font.Normal>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            top: hp('7%'),
            backgroundColor: Colors.LIGHT_BLUE,
            width: wp('28%'),
            height: hp('5%'),
            justifyContent: 'center',
            borderRadius: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            left: wp('3%'),
          }}>
          <Font.Normal style={{textAlign: 'center'}}>
            {Strings.confirm}
          </Font.Normal>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ParticipantList = props => {
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const companyType = companyStore(state => state.companyType);
  const companyID = companyStore(state => state.companyID);
  const Seperator = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          height: 0,
          borderBottomColor: Colors.GRAY_DARK,
          borderBottomWidth: 1,
          width: wp('80%'),
        }}></View>
    );
  };
  return (
    <FlatList
      numColumns={1}
      data={props.data}
      extraData={props.trigger}
      ItemSeparatorComponent={Seperator}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            if (companyType == 'supplier') {
              log('supplier');
              try {
                const members = await API.graphql({
                  query: getUsersBySupplierCompany,
                  variables: {supplierCompanyID: companyID},
                });
                log(members.data.getUsersBySupplierCompany.items);
                props.setTeamList(members.data.getUsersBySupplierCompany.items);
              } catch (e) {
                log(e);
              }
            } else {
              log('retailer');
              try {
                const members = await API.graphql({
                  query: getUsersByRetailerCompany,
                  variables: {retailerCompanyID: companyID},
                });
                log(members.data.getUsersByRetailerCompany.items);
                props.setTeamList(members.data.getUsersByRetailerCompany.items);
              } catch (e) {
                log(e);
              }
            }
            if (props.trigger) {
              props.setTrigger(false);
            } else {
              props.setTrigger(true);
            }
            setRefreshing(false);
          }}
        />
      }
      renderItem={({item}) => {
        log(item);
        return (
          <Participant name={item.name} role={item.role} user={props.user} />
        );
      }}></FlatList>
  );
};
