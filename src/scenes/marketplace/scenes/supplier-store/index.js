import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {ProductPopUp, AddItemsButton, SupplierplaceList} from './components';
import {NavBar, BackButton} from '_components';
import {listProductListings} from '../../../../graphql/queries';
import {API} from 'aws-amplify';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';

export const SupplierStore = props => {
  const [productList, setProducts] = useState([]);
  const [trigger, setTrigger] = useState(false);

  const fetchProducts = async () => {
    try {
      const products = await API.graphql({
        query: listProductListings,
        variables: {filter: {supplierID: {eq: props.user.supplierCompanyID}}},
      });

      if (products.data.listProductListings) {
        console.log('Products: \n');
        console.log(products);
        setProducts(products.data.listProductListings.items);
      }
      console.log(products.data.listProductListings.items);
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
  };
  useEffect(() => {
    fetchProducts();
    console.log('Refreshing...');
  }, [trigger]);
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <Text style={[Typography.header, {top: hp('4%')}]}>
        {Strings.myStore}
      </Text>
      <TouchableOpacity
        onPress={() => {
          if (trigger) {
            setTrigger(false);
          } else {
            setTrigger(true);
          }
        }}
        style={{right: wp('20%'), position: 'absolute', top: hp('5%')}}>
        <Icon name="refresh-outline" size={wp('7%')}></Icon>
      </TouchableOpacity>

      <View
        style={{
          width: wp('90%'),
          height: hp('70%'),

          top: hp('3%'),
        }}>
        <SupplierplaceList
          productList={productList}
          setProducts={setProducts}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          right: wp('8%'),
          bottom: hp('14%'),
        }}>
        <AddItemsButton
          setProducts={setProducts}
          productList={productList}
          user={props.user}
        />
      </View>

      <View style={{position: 'absolute', top: hp('90%')}}>
        <NavBar navigation={props.navigation} />
      </View>
    </SafeAreaView>
  );
};

const items = [
  {produce: 'Ginger', quantity: '10'},
  {produce: 'Ginger', quantity: '10'},
  {produce: 'Ginger', quantity: '10'},
  {produce: 'Ginger', quantity: '10'},
  {produce: 'Ginger', quantity: '10'},
  {produce: 'Ginger', quantity: '10'},
];
