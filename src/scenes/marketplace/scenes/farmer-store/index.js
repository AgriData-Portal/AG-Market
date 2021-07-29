import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';

import {ProductPopUp, AddItemsButton, SupplierplaceList} from './components';
import {NavBar, LoadingModal} from '_components';
import {listFarmerListings} from '../../../../graphql/queries';

import {API} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {log} from '_utils';

export const FarmerStore = props => {
  const [productList, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const products = await API.graphql({
        query: listFarmerListings,
        variables: {filter: {farmerID: {eq: props.user.farmerCompanyID}}},
      });

      if (products.data.listFarmerListings) {
        log('Products: \n');
        log(products);
        setProducts(products.data.listFarmerListings.items);
      }
      setLoading(false);
      log(products.data.listFarmerListings.items);
    } catch (e) {
      log(e);
      log("there's a problem");
    }
  };
  useEffect(() => {
    fetchProducts();
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
          top: hp('1%'),
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
