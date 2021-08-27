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
  invoiceRetailerForSupplierByDate,
  invoiceForFarmerByDate,
  invoiceFarmerForSupplierByDate,
} from '../../graphql/queries';
import Strings from '_utils';
import {log, orders} from '_utils';
import {companyStore} from '_store';
import {Font} from '_components';

export const BuyingOrders = props => {
  const [sortModal, setSortModal] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const [refresh, setRefresh] = useState(0);
  const [nextToken, setNextToken] = useState(null);
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);

  useEffect(() => {
    log('gettingInvoice');
    orders
      .getInvoiceBuyingOrder(companyType, companyID)
      .then(data => [
        setNextToken(data.nextToken),
        setInvoiceList(data.items),
        setLoading(false),
      ]);
  }, [props.sellerState]);

  useEffect(() => {
    if (nextToken != null) {
      orders
        .getMoreInvoiceBuyingOrder(companyType, companyID, nextToken)
        .then(data => [
          setNextToken(data.nextToken),
          setInvoiceList(data.items),
          setLoading(false),
        ]);
    }
  }, [refresh]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp('80%'),
          height: hp('5%'),
          top: hp('0%'),
          flexDirection: 'row',
        }}>
        <Font.Normal style={{textTransform: 'uppercase'}}>
          {Strings.results}
        </Font.Normal>
        {/* TODO code for sort modal */}
        {/* <TouchableOpacity
          onPress={() => setSortModal(true)}
          style={{position: 'absolute', right: wp('0%')}}>
          <Icon name="funnel-outline" size={wp('5%')}></Icon>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          top: hp('0%'),
          height: hp('72%'),
        }}>
        <OrderList
          invoiceList={invoiceList}
          user={props.user}
          setInvoiceList={setInvoiceList}
          setLoading={setLoading}
          trigger={trigger}
          setTrigger={setTrigger}
          setRefresh={setRefresh}
          sellerState={props.sellerState}
          company={props.company}
        />
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
