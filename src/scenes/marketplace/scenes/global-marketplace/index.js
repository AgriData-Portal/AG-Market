import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {LoadingModal} from '_components';
import {MarketplaceList, FavouritesList} from './components';
import {API} from 'aws-amplify';
import {
  getRetailerCompany,
  listProductListings,
  productListingByNameStartingWithLowestPrice,
} from '../../../../graphql/queries';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Strings from '_utils';
import Modal from 'react-native-modal';
import SearchableDropdown from 'react-native-searchable-dropdown';

export const Marketplace = props => {
  const [choice, setChoice] = useState('favourites');
  const [productsList, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [initialRender, setInitialRender] = useState(true);
  const [searchPressed, setSearchPressed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchable, setSearchable] = useState([]);

  console.log('marketplace initial render' + props.user);
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const products = await API.graphql({
        query: productListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase().trim(),
          sortDirection: 'ASC',
        },
      });
      console.log(products);
      if (products.data.productListingByNameStartingWithLowestPrice) {
        console.log('Products: \n');
        console.log(
          products.data.productListingByNameStartingWithLowestPrice.items,
        );
        setProducts(
          products.data.productListingByNameStartingWithLowestPrice.items,
        );
      }
    } catch (e) {
      console.log(e);
      console.log("there's a problem");
    }
    setLoading(false);
  };
  useEffect(() => {
    if (searchPressed && choice == 'product') {
      console.log('useEffectTriggered');
      console.log('searching for ' + searchValue);
      setSearchPressed(false);
      fetchProducts();
    }
    //potentially do a search for favourites but must have a way to remove the filter
  }, [searchPressed]);
  useEffect(() => {
    console.log('resetting search');
    setSearchValue('');
  }, [choice]);

  const getAllListings = async () => {
    try {
      const listings = await API.graphql({
        query: listProductListings,
      });
      console.log(listings.data.listProductListings.items);
      var responseList = listings.data.listProductListings.items;
      responseList = responseList.map(item => {
        return item.productName.toUpperCase();
      });

      console.log(responseList);
      var array = Array.from(new Set(responseList));
      setSearchable(array);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log('All listings');
    getAllListings();
  }, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        height: hp('100%'),
        width: wp('100%'),
        alignItems: 'center',
      }}>
      <View style={{top: hp('1%')}}>
        {choice == 'product' ? (
          <View
            style={{
              backgroundColor: Colors.GRAY_MEDIUM,
              borderRadius: 30,
              width: wp('90%'),
              height: hp('5%'),
              flexDirection: 'row',
            }}>
            <View
              style={{
                position: 'absolute',
                left: wp('5%'),
                top: hp('0.75%'),
              }}>
              <Icon name="search" size={wp('7%')} color={Colors.GRAY_DARK} />
            </View>
            <View style={{left: wp('13%')}}>
              <SearchableDropdown
                placeholder={Strings.search}
                itemsContainerStyle={{
                  maxHeight: hp('60%'),
                  backgroundColor: 'red',
                }}
                textInputStyle={{
                  width: wp('70%'),
                  height: hp('5%'),
                }}
                setSearchPressed={setSearchPressed}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
            </View>
          </View>
        ) : (
          <Searchbar
            setSearchPressed={setSearchPressed}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      </View>
      <View
        style={{
          top: hp('3%'),
          width: wp('100%'),
          height: hp('4%'),
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderColor: Colors.GRAY_LIGHT,
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
                  color: Colors.GRAY_DARK,
                  fontFamily: 'Poppins-Bold',
                  textDecorationLine: 'underline',
                },
              ]}>
              {Strings.product}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => [setChoice('product'), setInitialRender(true)]}
            style={{
              width: wp('50%'),
              borderRightWidth: 1,
              borderColor: Colors.GRAY_LIGHT,
              alignItems: 'center',
            }}>
            <Text style={Typography.normal}>{Strings.product}</Text>
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
                  color: Colors.GRAY_DARK,
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
            <Text style={Typography.normal}>{Strings.favourites}</Text>
          </TouchableOpacity>
        )}
      </View>
      {choice == 'favourites' ? (
        <View
          style={{
            width: wp('95%'),
            height: hp('60%'),
            top: hp('1%'),
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
            height: hp('60%'),
            top: hp('1%'),
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
