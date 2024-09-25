import CalendarScreen from '@/screens/calrendar/CalendarScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';

interface MainDrawerNavigatorProps {}

const Drawer = createDrawerNavigator();

function MainDrawerNavigator({}: MainDrawerNavigatorProps) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MapHome" component={MapHomeScreen} />
      <Drawer.Screen name="FeedHome" component={FeedHomeScreen} />
      <Drawer.Screen name="Calendar" component={CalendarScreen} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
