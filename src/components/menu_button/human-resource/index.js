import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BackButton} from '_components/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import {AddEmployeeButton} from './add-member';
import Modal from 'react-native-modal';
import {API} from 'aws-amplify';
import {SuccesfulChangesModal} from '_components/modals';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {
  getUsersByRetailerCompany,
  getUsersBySupplierCompany,
} from '../../../graphql/queries';

export const HumanResource = props => {
  const [teamList, setTeamList] = useState([]);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const fetchMembers = async () => {
    if (props.user.retailerCompanyID == null) {
      console.log('supplier');
      try {
        const members = await API.graphql({
          query: getUsersBySupplierCompany,
          variables: {supplierCompanyID: props.user.supplierCompanyID},
        });
        console.log(members.data.getUsersBySupplierCompany.items);
        setTeamList(members.data.getUsersBySupplierCompany.items);
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log('retailer');
      try {
        const members = await API.graphql({
          query: getUsersByRetailerCompany,
          variables: {retailerCompanyID: props.user.retailerCompanyID},
        });
        console.log(members.data.getUsersByRetailerCompany.items);
        setTeamList(members.data.getUsersByRetailerCompany.items);
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    fetchMembers();
    console.log('useEffect Triggered');
  }, []);
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      {/*<View
        style={{
          flexDirection: 'row',
          top: hp('3%'),
          alignItems: 'center',
          justifyContent: 'center',
          right: wp('3%'),
        }}>
        <View style={{right: wp('10%')}}>
          <BackButton navigation={props.navigation} />
        </View>
        <View>
          <Text style={[Typography.header]}>{Strings.humanResource}</Text>
        </View>
      </View>*/}
      <View style={{top: hp('0%')}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: wp('100%'),
            height: hp('30%'),
          }}>
          <Image source={require('_assets/images/company-logo.png')} />
          <Text style={[Typography.header, {top: hp('2%')}]}>City Grocer</Text>
        </View>
        <View
          style={{
            backgroundColor: Colors.GRAY_MEDIUM,
            width: wp('85%'),
            height: hp('45%'),
            borderRadius: 10,
            alignSelf: 'center',
          }}>
          <View style={{top: hp('3%'), left: wp('5%')}}>
            <Text style={[Typography.placeholderSmall]}>{Strings.team}</Text>
          </View>
          <View style={{height: hp('30%'), top: hp('3%')}}>
            <ParticipantList
              data={teamList}
              trigger={trigger}
              setTrigger={setTrigger}
              user={props.user}
              setTeamList={setTeamList}
            />
          </View>
          <View style={{top: hp('8%'), width: wp('85%'), alignItems: 'center'}}>
            <AddEmployeeButton user={props.user} setTeamList={setTeamList} />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setSuccesfulChangesModal(true)}
          style={{
            top: hp('2%'),
            width: wp('55%'),
            height: hp('5%'),
            backgroundColor: Colors.LIGHT_BLUE,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            alignSelf: 'center',
            elevation: 4,
          }}>
          <Text>{Strings.saveChanges}</Text>
          <Icon
            name="checkmark-circle-outline"
            size={wp('5.5%')}
            style={{left: wp('4%')}}
          />
        </TouchableOpacity>
        <Modal
          isVisible={succesfulChangesModal}
          onBackdropPress={() => [setSuccesfulChangesModal(false)]}>
          <SuccesfulChangesModal
            setSuccesfulChangesModal={setSuccesfulChangesModal}
            navigation={props.navigation}
          />
        </Modal>
      </View>
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
          left: wp('5%'),
          alignSelf: 'flex-start',
        }}>
        <Text style={[Typography.normal]}>{props.name}</Text>
        <Text style={[Typography.placeholderSmall, {fontStyle: 'italic'}]}>
          {props.role}
        </Text>
      </View>
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
      <Modal
        isVisible={confirmRemoveModal}
        onBackdropPress={() => setConfirmRemoveModal(false)}>
        <ConfirmRemoveModal setConfirmRemoveModal={setConfirmRemoveModal} />
      </Modal>
    </View>
  );
};

const ConfirmRemoveModal = props => {
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
        <Text style={[Typography.large, {textAlign: 'center'}]}>
          {Strings.removeMemberConfirm1}
        </Text>
        <Text
          style={[
            Typography.large,
            {fontFamily: 'Poppins-Bold', textAlign: 'center'},
          ]}>
          {Strings.removeMemberConfirm2}
        </Text>
      </View>
      <View style={{flexDirection: 'row'}}>
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
            right: wp('3%'),
          }}>
          <Text style={[Typography.normal, {textAlign: 'center'}]}>
            {Strings.cancel}
          </Text>
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
          <Text style={[Typography.normal, {textAlign: 'center'}]}>
            {Strings.confirm}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ParticipantList = props => {
  const [confirmRemoveModal, setConfirmRemoveModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const Seperator = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: wp('70%'),
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
            if (props.user.retailerCompanyID == null) {
              console.log('supplier');
              try {
                const members = await API.graphql({
                  query: getUsersBySupplierCompany,
                  variables: {supplierCompanyID: props.user.supplierCompanyID},
                });
                console.log(members.data.getUsersBySupplierCompany.items);
                props.setTeamList(members.data.getUsersBySupplierCompany.items);
              } catch (e) {
                console.log(e);
              }
            } else {
              console.log('retailer');
              try {
                const members = await API.graphql({
                  query: getUsersByRetailerCompany,
                  variables: {retailerCompanyID: props.user.retailerCompanyID},
                });
                console.log(members.data.getUsersByRetailerCompany.items);
                props.setTeamList(members.data.getUsersByRetailerCompany.items);
              } catch (e) {
                console.log(e);
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
        console.log(item);
        return <Participant name={item.name} role={item.role} />;
      }}></FlatList>
  );
};
