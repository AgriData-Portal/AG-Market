import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Image} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import Icon from 'react-native-vector-icons/Ionicons';
import {Searchbar} from '../../components';
import {LoadingModal} from '_components';
import {MarketplaceList, FavouritesList} from './components';
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
        query: supplierListingByNameStartingWithLowestPrice,
        variables: {
          productName: searchValue.toUpperCase().trim(),
          sortDirection: 'ASC',
        },
      });
      console.log(products);
      if (products.data.supplierListingByNameStartingWithLowestPrice) {
        console.log('Products: \n');
        console.log(
          products.data.supplierListingByNameStartingWithLowestPrice.items,
        );
        setProducts(
          products.data.supplierListingByNameStartingWithLowestPrice.items,
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
    //EDIT NODEMODULES FOR SEARCHABLE DROPDOWN AND DELETE ALL NAME IN ITEM.NAME
    try {
      const listings = await API.graphql({
        query: listSupplierListings,
      });
      console.log(listings.data.listSupplierListings.items);
      var responseList = listings.data.listSupplierListings.items;
      responseList = responseList.map(item => {
        return item.productName.toUpperCase();
      });

      console.log(responseList);
      var array = Array.from(new Set(responseList));
      array.sort();
      setSearchable(array);
    } catch (e) {
      console.log(e);
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
      console.log(listings.data.listSupplierListings.items);
      var responseList = listings.data.listSupplierListings.items;
      setProducts(listings.data.listSupplierListings.items);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    console.log('All listings');
    getAllListings();
    getFirstTenListings();
  }, []);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      console.log('Refreshed!');
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
      <View style={{top: hp('0%'), zIndex: 100}}>
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
                items={searchable}
                placeholder={Strings.search}
                placeholderTextColor={Colors.DARK_GRAY}
                itemsContainerStyle={{
                  zIndex: 10,
                  height: hp('80%'),
                }}
                itemTextStyle={{
                  //text style of a single dropdown item
                  color: 'black',
                }}
                itemStyle={{
                  padding: 10,
                  backgroundColor: '#ddd',
                  borderColor: '#bbb',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
                containerStyle={{
                  padding: 1,
                  width: wp('75%'),
                  borderRadius: 20,
                }}
                textInputStyle={{
                  width: wp('55%'),
                  height: hp('6%'),
                  borderBottomWidth: 0,
                }}
                textInputProps={{
                  value: searchValue,
                  underlineColorAndroid: 'transparent',
                }}
                resetValue={false}
                onItemSelect={item => [setSearchValue(item)]}
                onTextChange={item => setSearchValue(item)}
              />
            </View>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: wp('70%'),
                top: hp('1%'),
              }}
              onPress={() => {
                if (searchValue != '') {
                  setSearchPressed(true);
                  console.log(searchValue);
                }
              }}>
              <Text style={[Typography.normal]}>{Strings.search}</Text>
            </TouchableOpacity>
          </View>
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
            top: hp('0%'),
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
