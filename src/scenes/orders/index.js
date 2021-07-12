import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {OrderList, SortModal} from './components';
import {NavBar, LoadingModal} from '_components';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {API} from 'aws-amplify';
import {
  invoiceForRetailerByDate,
  invoiceForSupplierByDate,
} from '../../graphql/queries';
import Strings from '_utils';
import {MenuButton} from '_components';

export const Orders = props => {
  const [sortModal, setSortModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = async () => {
    if (props.user.retailerCompanyID == null) {
      try {
        const invoice = await API.graphql({
          query: invoiceForSupplierByDate,
          variables: {
            supplierID: props.user.supplierCompanyID,
            sortDirection: 'ASC',
          },
        });
        console.log(invoice.data.invoiceForSupplierByDate.items);
        setInvoiceList(invoice.data.invoiceForSupplierByDate.items);
        setLoading(false);
        console.log('supplierCompanyInvoices');
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        const invoice = await API.graphql({
          query: invoiceForRetailerByDate,
          variables: {
            retailerID: props.user.retailerCompanyID,
            sortDirection: 'ASC',
          },
        });
        console.log(invoice.data.invoiceForRetailerByDate.items);
        setInvoiceList(invoice.data.invoiceForRetailerByDate.items);
        setLoading(false);
        console.log('retailerCompanyInvoices');
      } catch (e) {
        console.log(e);
      }
    }
    console.log('first run');
  };
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
      {/*<View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: wp('100%'),
          top: hp('2%'),
        }}>
        <View
          style={{
            position: 'absolute',
            top: hp('1%'),
            left: wp('5%'),
          }}>
          <MenuButton
            navigation={props.navigation}
            updateAuthState={props.updateAuthState}
            userType={props.user.role}></MenuButton>
        </View>
        <Text style={[Typography.header]}>{Strings.orders}</Text>
        <Text style={[Typography.normal, {color: Colors.GRAY_DARK}]}>
          {Strings.digitalInvoices}
        </Text>
        </View>*/}

      <View
        style={{
          width: wp('80%'),
          height: hp('5%'),
          top: hp('3%'),
          flexDirection: 'row',
        }}>
        <Text style={[Typography.normal, {textTransform: 'uppercase'}]}>
          {Strings.results}
        </Text>
        <TouchableOpacity
          onPress={() => setSortModal(true)}
          style={{position: 'absolute', right: wp('0%')}}>
          <Icon name="funnel-outline" size={wp('5%')}></Icon>
        </TouchableOpacity>
      </View>
      <View
        style={{
          top: hp('5%'),
          height: hp('64%'),
        }}>
        <OrderList invoiceList={invoiceList} user={props.user} />
      </View>
      <View style={{position: 'absolute', top: hp('80%')}}>
        <NavBar navigation={props.navigation} />
      </View>
      <Modal
        animationIn="fadeIn"
        animationInTiming={100}
        animationOut="fadeOut"
        animationOutTiming={100}
        backdropOpacity={0.4}
        isVisible={sortModal}
        onBackdropPress={() => setSortModal(false)}>
        <SortModal />
      </Modal>

      <LoadingModal isVisible={loading} />
    </SafeAreaView>
  );
};
