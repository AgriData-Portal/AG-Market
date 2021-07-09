import React, {useState} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import {ExpensesBar} from './bar-chart';

export const DataAnalytics = props => {
  return (
    <SafeAreaView>
      <View>
        <Text
          style={[
            Typography.header,
            {left: Mixins.scaleWidth(20), top: Mixins.scaleHeight(20)},
          ]}>
          Analytics
        </Text>
        <ExpensesBar />
      </View>
    </SafeAreaView>
  );
};
