import React, {useState} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BarChart, Grid, XAxis, YAxis} from 'react-native-svg-charts';

export const ExpensesBar = props => {
  const fill = Colors.LIME_GREEN;
  const data = [
    {label: 'Jan', value: 1},
    {label: 'Feb', value: 2},
    {label: 'Mar', value: 3},
    {label: 'Apr', value: 4},
    {label: 'May', value: 5},
    {label: 'Jun', value: 6},
    {label: 'Jul', value: 7},
    {label: 'Aug', value: 8},
    {label: 'Sep', value: 9},
    {label: 'Oct', value: 10},
    {label: 'Nov', value: 11},
    {label: 'Dec', value: 12},
  ];
  const contentInset = {
    top: Mixins.scaleHeight(10),
    bottom: Mixins.scaleHeight(10),
  };

  return (
    <View style={{flexDirection: 'column'}}>
      <View
        style={{
          height: Mixins.scaleHeight(400),
          flexDirection: 'row',
          top: Mixins.scaleHeight(30),
          left: Mixins.scaleWidth(20),
        }}>
        <YAxis
          data={data}
          yAccessor={({item}) => item.value}
          contentInset={contentInset}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          numberOfTicks={15}
          formatLabel={value => `RM${value}k`}
        />
        <BarChart
          style={{
            width: Mixins.scaleWidth(300),
          }}
          data={data}
          yAccessor={({item}) => item.value}
          xAccessor={({item}) => item.label}
          svg={{fill}}
          contentInset={{
            top: Mixins.scaleHeight(10),
            bottom: Mixins.scaleHeight(10),
          }}
          numberOfTicks={15}>
          <Grid />
        </BarChart>
      </View>
      <View>
        <XAxis
          style={{
            marginHorizontal: -50,
            top: Mixins.scaleWidth(50),
            height: Mixins.scaleHeight(20),
          }}
          data={data}
          xAccessor={({index}) => index}
          formatLabel={(value, index) => index}
          contentInset={{left: 120, right: 80}}
          svg={{fontSize: 20, fill: 'black'}}
        />
      </View>
    </View>
  );
};
