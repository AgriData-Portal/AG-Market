import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {LoadingModal} from '_components';
import {MarketplaceList, FavouritesList, ProductSearchBar} from './components';
import {API} from 'aws-amplify';
import {
  listSupplierListings,
  supplierListingByNameStartingWithLowestPrice,
} from '../../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import Modal from 'react-native-modal';

import {log} from '_utils';

export const Marketplace = props => {
  const [choice, setChoice] = useState('favourites');
  const [productsList, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const [searchPressed, setSearchPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchable, setSearchable] = useState([]);

  log('marketplace render');
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const products = await API.graphql({
        query: supplierListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase().trim(),
          sortDirection: 'ASC',
        },
      });
      log(products);
      if (products.data.supplierListingByNameStartingWithLowestPrice) {
        log('Products: \n');
        log(products.data.supplierListingByNameStartingWithLowestPrice.items);
        setProducts(
          products.data.supplierListingByNameStartingWithLowestPrice.items,
        );
      }
    } catch (e) {
      log(e);
      log("there's a problem");
    }
    setLoading(false);
    //TODO CHECK
  };
  useEffect(() => {
    if (searchPressed && choice == 'product') {
      log('useEffectTriggered');
      log('searching for ' + searchValue);
      setSearchPressed(false);
      fetchProducts();
    }
    //potentially do a search for favourites but must have a way to remove the filter
  }, [searchPressed]);
  useEffect(() => {
    log('resetting search');
    setSearchValue('');
  }, [choice]);

  const getAllListings = async () => {
    //EDIT NODEMODULES FOR SEARCHABLE DROPDOWN AND DELETE ALL NAME IN ITEM.NAME
    try {
      const listings = await API.graphql({
        query: listSupplierListings,
      });
      log(listings.data.listSupplierListings.items);
      var responseList = listings.data.listSupplierListings.items;
      responseList = responseList.map(item => {
        return item.productName.toUpperCase();
      });

      log(responseList);
      var array = Array.from(new Set(responseList));
      array.sort();
      setSearchable(array);
    } catch (e) {
      log(e);
    }
  };

  const getFirstTenListings = async () => {
    try {
      const listings = await API.graphql({
        query: listSupplierListings,
        variables: {
          limit: 10,
        },
      });
      log(listings.data.listSupplierListings.items);
      var responseList = listings.data.listSupplierListings.items;
      setProducts(listings.data.listSupplierListings.items);
    } catch (e) {
      log(e);
    }
  };
  useEffect(() => {
    log('All listings');
    getAllListings();
    getFirstTenListings();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      log('Refreshed!');
      getFirstTenListings();
    });
    return unsubscribe;
  }, [props.navigation]);

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
          top: hp('0%'),
          width: wp('100%'),
          height: hp('4%'),
          flexDirection: 'row',
        }}>
        {choice == 'product' ? (
          <View
            style={{
              width: wp('50%'),
              borderRightWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: 'black',
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline',
                },
              ]}>
              {Strings.product}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => [
              setChoice('product'),
              setInitialRender(true),
              //getFirstTenListings(), //refresh page :)
            ]}
            style={{
              width: wp('50%'),
              borderRightWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text style={[Typography.normal, {color: Colors.GRAY_DARK}]}>
              {Strings.product}
            </Text>
          </TouchableOpacity>
        )}

        {choice == 'favourites' ? (
          <View
            style={{
              width: wp('50%'),
              borderLeftWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text
              style={[
                Typography.normal,
                {
                  color: 'black',
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline',
                },
              ]}>
              {Strings.favourites}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setChoice('favourites')}
            style={{
              width: wp('50%'),
              borderLeftWidth: 0.5,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text style={[Typography.normal, {color: Colors.GRAY_DARK}]}>
              {Strings.favourites}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={{zIndex: 100}}>
        {choice == 'product' ? (
          <ProductSearchBar
            searchable={searchable}
            setSearchValue={setSearchValue}
            searchValue={searchValue}
            setSearchPressed={setSearchPressed}></ProductSearchBar>
        ) : (
          <Searchbar
            setSearchPressed={setSearchPressed}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      </View>
      {choice == 'favourites' ? (
        <View
          style={{
            width: wp('95%'),
            height: hp('80%'),
            top: hp('0%'),
            zIndex: 1,
          }}>
          <FavouritesList
            data={props.user.retailerCompany.favouriteStores}
            navigation={props.navigation}
          />
        </View>
      ) : (
        <View
          style={{
            width: wp('95%'),
            height: hp('70%'),
            top: hp('10%'),
            position: 'absolute',
            zIndex: 1,
          }}>
          <MarketplaceList
            chatGroups={props.user.retailerCompany.chatGroups.items}
            productList={productsList}
            navigation={props.navigation}
            user={props.user}
            searchValue={searchValue}
          />
        </View>
      )}
      <Modal isVisible={loading}>
        <LoadingModal />
      </Modal>
    </SafeAreaView>
  );
};
