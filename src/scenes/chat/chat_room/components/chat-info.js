import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Text,
  Image,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import {CloseButton} from '_components';
import {API} from 'aws-amplify';
import {
  createMessage,
  deleteChatGroupUsers,
  updateChatGroup,
} from '../../../../graphql/mutations';
import {listUsersInChat} from '../../../../graphql/queries';

import {abs} from 'react-native-reanimated';
import {DismissKeyboardView} from '_components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const ChatInfo = props => {
  const [chatInfoModal, setChatInfoModal] = useState(false);
  const [chatParticipants, setChatParticipants] = useState(null);
  const fetchChatParticipants = async () => {
    try {
      const products = await API.graphql({
        query: listUsersInChat,
        variables: {
          filter: {chatGroupID: {eq: props.chatGroupID}},
        },
      });
      //console.log(products.data.listChatGroupUserss.items);
      if (products.data) {
        setChatParticipants(products.data.listChatGroupUserss.items);
      }
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
  };
  return (
    <TouchableOpacity
      onPress={async () => {
        await fetchChatParticipants();
        setChatInfoModal(true);
      }}
      style={{right: hp('2%')}}>
      <Icon
        color={Colors.GRAY_DARK}
        name="information-circle-outline"
        size={wp('9%')}></Icon>
      <Modal
        isVisible={chatInfoModal}
        onBackdropPress={() => setChatInfoModal(false)}>
        <ChatInfoModal
          setChatInfoModal={setChatInfoModal}
          chatParticipants={chatParticipants}
          setChatParticipants={setChatParticipants}
          chatGroupID={props.chatGroupID}
        />
      </Modal>
    </TouchableOpacity>
  );
};

const ChatInfoModal = props => {
  const [teamList, setTeamList] = useState([]);
  const [succesfulChangesModal, setSuccesfulChangesModal] = useState(false);
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
    <View
      style={{
        left: wp('27%'),
        width: wp('70%'),
        height: hp('100%'),
        backgroundColor: Colors.PALE_GREEN,
        borderRadius: 20,
        alignItems: 'center',
      }}>
      <View style={{top: hp('4%')}}>
        <Image
          source={require('_assets/images/agridata.png')}
          style={{width: wp('30%'), resizeMode: 'contain'}}
        />
      </View>

      <Text style={[Typography.normal, {alignSelf: 'center'}]}>
        GINGER TEAM
      </Text>

      <View
        style={{
          borderBottomWidth: 1,
          borderBottomColor: Colors.GRAY_DARK,
          width: wp('70%'),
          alignItems: 'flex-start',
        }}>
        <Text style={[Typography.placeholder, {top: hp('5%'), left: wp('5%')}]}>
          {Strings.member}
        </Text>
      </View>

      <View
        style={{
          top: hp('5%'),
          height: hp('8%'),
        }}>
        <View
          style={{
            width: wp('70%'),
            height: hp('45%'),

            top: hp('2%'),
          }}>
          <ChatParticipantList
            data={props.chatParticipants}
            chatGroupID={props.chatGroupID}
            setChatParticipants={props.setChatParticipants}
            chatParticipants={props.chatParticipants}
          />
        </View>
      </View>

      {/*<View
        style={{
          top: hp('78%'),
          width: wp('70%'),
          position: 'absolute',

          alignItems: 'flex-start',
          height: hp('20%'),
          left: wp('5%'),
        }}>
        <Text style={[Typography.placeholder]}>{Strings.attachment}</Text>
        <View
          style={{
            maxHeight: hp('18%'),
            width: wp('70%'),
            top: hp('2%'),
          }}>
          <AttachmentList />
        </View>
      </View>*/}
    </View>
  );
};

const ChatParticipantList = props => {
  const [addPersonModal, setAddPersonModal] = useState(false);
  const Seperator = () => {
    return (
      <View
        style={{
          height: hp('0%'),
          alignSelf: 'center',
          width: wp('60%'),
          borderBottomWidth: 0.3,

          top: hp('1%'),
        }}></View>
    );
  };
  return (
    <View>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => [
                  setAddPersonModal(true),
                  console.log('addperson: ', addPersonModal),
                ]}
                style={{
                  backgroundColor: Colors.GRAY_MEDIUM,
                  height: hp('4%'),
                  width: wp('43%'),

                  flexDirection: 'row',
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 2,
                  alignSelf: 'center',
                }}>
                <Icon name="add" size={wp('6%')} />
                <Text
                  style={[
                    Typography.normal,
                    {
                      color: Colors.LIME_GREEN,
                    },
                  ]}>
                  {Strings.addMembers}
                </Text>
              </TouchableOpacity>
              <Modal
                isVisible={addPersonModal}
                onBackdropPress={() => setAddPersonModal(false)}>
                <AddPersonModal
                  setAddPersonModal={setAddPersonModal}
                  addPersonModal={addPersonModal}
                />
              </Modal>
            </View>
          );
        }}
        numColumns={1}
        keyExtractor={item => item.id}
        data={[{}, {}, {}, {}]} //{props.data}
        // ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          return (
            <ChatParticipantCard
              setChatParticipants={props.setChatParticipants}
              chatParticipants={props.chatParticipants}
              user={item.name}
              userID={item.id}
              chatGroupID={props.chatGroupID}
            />
          );
        }}
      />
    </View>
  );
};

const ChatParticipantCard = props => {
  const [removePersonModal, setRemovePersonModal] = useState(false);
  return (
    <View
      style={{
        alignSelf: 'center',
        height: hp('5%'),
        width: wp('70%'),
        borderRadius: 30,
      }}>
      <View
        style={{
          left: wp('5%'),
          height: hp('6%'),
          justifyContent: 'center',
        }}>
        <Text style={Typography.normal}>{props.user}Heyo</Text>
      </View>

      <TouchableOpacity
        onPress={() => setRemovePersonModal(true)}
        style={{
          height: hp('6%'),
          position: 'absolute',
          right: wp('12%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon name="person-remove-outline" size={wp('5.5%')} color="black" />
      </TouchableOpacity>
      <Modal
        isVisible={removePersonModal}
        onBackdropPress={() => setRemovePersonModal(false)}>
        <RemovePersonModal
          setRemovePersonModal={setRemovePersonModal}
          setChatParticipants={props.setChatParticipants}
          chatParticipants={props.chatParticipants}
          name={props.user}
          id={props.id}
          chatGroupID={props.chatGroupID}
        />
      </Modal>
    </View>
  );
};

const RemovePersonModal = props => {
  const removePerson = async () => {
    try {
      const uniqueID = 'chat' + props.chatGroupID + props.id;
      const removedPerson = await API.graphql({
        query: deleteChatGroupUsers,
        variables: {input: {id: uniqueID}},
      });
      chatParticipants = props.chatParticipants;
      for (let [i, chatParticipants] of chatParticipants.entries()) {
        if (chatParticipants.id == props.id) {
          chatParticipants.splice(i, 1);
        }
      }
      props.setChatParticipants(chatParticipants);
      props.setRemovePersonModal(false);
    } catch (e) {
      console.log(e);
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
          onPress={() => removePerson}
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

const AddPersonModal = props => {
  return (
    <View
      style={{
        height: Mixins.scaleHeight(300),
        width: Mixins.scaleWidth(300),
        backgroundColor: Colors.GRAY_DARK,
        left: Mixins.scaleWidth(10),
        borderRadius: 20,
      }}>
      <Text
        style={[
          Typography.large,
          {alignSelf: 'center', top: Mixins.scaleHeight(20)},
        ]}>
        Who would you like to add?
      </Text>
      <EmployeeList></EmployeeList>
      <View style={{top: Mixins.scaleHeight(50)}}></View>
    </View>
  );
};

const EmployeeList = props => {
  const [groupParticipants, setGroupParticipants] = useState();

  const addEmployee = async () => {};
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
};

const AttachmentList = props => {
  return (
    <View>
      <FlatList
        numColumns={1}
        data={[{name: '1'}, {name: '1'}, {name: '1'}, {name: '1'}]}
        renderItem={({item}) => {
          return <Attachment name={item.name} />;
        }}
      />
    </View>
  );
};

const Attachment = props => {
  return (
    <TouchableOpacity>
      <Text
        style={[
          Typography.normal,
          {
            height: hp('5%'),
            justifyContent: 'center',
          },
        ]}>
        {Strings.invoices}
      </Text>
    </TouchableOpacity>
  );
};
