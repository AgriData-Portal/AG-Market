import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {ProductPopUp, AddItemsButton, SupplierplaceList} from './components';
import {NavBar, LoadingModal} from '_components';
import {
  listSupplierListings,
  listFarmerListings,
} from '../../../../graphql/queries';
import {API} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import {MenuButton} from '_components';
import {log, marketPlace} from '_utils';
import {companyStore} from '_store';

export const SupplierStore = props => {
  const [productList, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);
  const companyID = companyStore(state => state.companyID);
  const companyType = companyStore(state => state.companyType);

  useEffect(() => {
    marketPlace
      .fetchSupplierStoreProducts(companyType, companyID)
      .then(data => [setProducts(data), setLoading(false)]);
    log('Refreshing...');
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <View
        style={{
          width: wp('90%'),
          height: hp('80%'),
          top: hp('0%'),
        }}>
        <SupplierplaceList
          productList={productList}
          setProducts={setProducts}
          trigger={trigger}
          setTrigger={setTrigger}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: wp('8%'),
          bottom: hp('23%'),
        }}>
        <AddItemsButton
          setProducts={setProducts}
          productList={productList}
          user={props.user}
        />
      </View>

      <LoadingModal isVisible={loading} />
    </SafeAreaView>
  );
};
