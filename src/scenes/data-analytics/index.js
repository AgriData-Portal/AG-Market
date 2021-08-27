import React, {useState} from 'react';
import {SafeAreaView, Text, View, Image, TouchableOpacity} from 'react-native';
import {Typography, Spacing, Colors, Mixins} from '_styles';
import {BarChart, Grid, YAxis} from 'react-native-svg-charts';
import {ExpensesBar} from './bar-chart';
import {Font} from '_components';

export const DataAnalytics = props => {
  return (
    <SafeAreaView>
      <View>
        <Font.Header
          style={{left: Mixins.scaleWidth(20), top: Mixins.scaleHeight(20)}}>
          Analytics
        </Font.Header>
        <ExpensesBar />
      </View>
    </SafeAreaView>
  );
};
