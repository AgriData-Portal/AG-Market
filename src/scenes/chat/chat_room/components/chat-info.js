import React, {useState, useContext} from 'react';
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
      }}>
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
  const [addPersonModal, setAddPersonModal] = useState(false);

  return (
    <View
      style={{
        left: wp('32%'),
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
            maxHeight: hp('25%'),
            width: wp('70%'),
          }}>
          <ChatParticipantList
            data={props.chatParticipants}
            chatGroupID={props.chatGroupID}
            setChatParticipants={props.setChatParticipants}
            chatParticipants={props.chatParticipants}
          />
        </View>

        <TouchableOpacity
          onPress={() => [
            setAddPersonModal(true),
            console.log('addperson: ', addPersonModal),
          ]}
          style={{
            backgroundColor: Colors.GRAY_MEDIUM,
            height: hp('6%'),
            width: wp('45%'),
            top: hp('9%'),
            flexDirection: 'row',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            elevation: 2,
            left: wp('5%'),
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
      </View>

      <View
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
      </View>

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
};

const ChatParticipantList = props => {
  const Seperator = () => {
    return (
      <View
        style={{
          height: 0,
          alignSelf: 'center',
          width: wp('70%'),
          top: hp('1%'),
        }}></View>
    );
  };
  return (
    <View>
      <FlatList
        numColumns={1}
        keyExtractor={item => item.user.id}
        data={props.data}
        ItemSeparatorComponent={Seperator}
        renderItem={({item}) => {
          return (
            <ChatParticipantCard
              setChatParticipants={props.setChatParticipants}
              chatParticipants={props.chatParticipants}
              user={item.user.name}
              userID={item.user.id}
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
        height: Mixins.scaleHeight(30),
        width: Mixins.scaleWidth(240),
        borderRadius: 30,
      }}>
      <View
        style={{
          left: Mixins.scaleWidth(20),
          height: Mixins.scaleHeight(40),
          justifyContent: 'center',
        }}>
        <Text style={Typography.normal}>{props.user}</Text>
      </View>

      <TouchableOpacity
        onPress={() => setRemovePersonModal(true)}
        style={{
          height: Mixins.scaleHeight(40),
          position: 'absolute',
          right: Mixins.scaleWidth(20),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon
          name="person-remove-outline"
          size={Mixins.scaleWidth(20)}
          color="black"
        />
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
        backgroundColor: Colors.GRAY_MEDIUM,
        borderRadius: 20,
        height: Mixins.scaleHeight(190),
        width: Mixins.scaleWidth(300),
        left: Mixins.scaleWidth(10),
      }}>
      <View style={{alignSelf: 'center', top: Mixins.scaleHeight(10)}}>
        <Icon
          name="alert-circle-outline"
          size={Mixins.scaleWidth(70)}
          color={Colors.ALERT}
        />
      </View>
      <Text
        style={[
          Typography.normal,
          {alignSelf: 'center', top: Mixins.scaleHeight(20)},
        ]}>
        Are you sure you want to remove {props.name}?
      </Text>
      <TouchableOpacity
        onPress={() => removePerson}
        style={{
          backgroundColor: Colors.LIGHT_BLUE,
          width: Mixins.scaleWidth(80),
          alignSelf: 'center',
          borderRadius: 20,
          height: Mixins.scaleHeight(25),
          justifyContent: 'center',
          top: Mixins.scaleHeight(40),
        }}>
        <Text style={[Typography.normal, {alignSelf: 'center'}]}>Confirm</Text>
      </TouchableOpacity>
      <View
        style={{
          position: 'absolute',
          right: Mixins.scaleWidth(-8),
          top: Mixins.scaleHeight(-8),
        }}>
        <CloseButton setModal={props.setRemovePersonModal} />
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
