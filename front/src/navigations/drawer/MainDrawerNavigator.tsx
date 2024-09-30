import CalendarScreen from '@/screens/calrendar/CalendarScreen';
import FeedHomeScreen from '@/screens/feed/FeedHomeScreen';
import MapHomeScreen from '@/screens/map/MapHomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import MapStackNavigator, {MapStackParamList} from '../stack/MapStackNavigator';
import {mainNavigations} from '@/constants';
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainDrawerParamList = {
  [mainNavigations.HOME]: NavigatorScreenParams<MapStackParamList>;
  [mainNavigations.FEED]: undefined;
  [mainNavigations.CALENDAR]: undefined;
};

const Drawer = createDrawerNavigator<MainDrawerParamList>();

function MainDrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
      }}>
      <Drawer.Screen
        name={mainNavigations.HOME}
        component={MapStackNavigator}
        options={{
          title: '홈',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.FEED}
        component={FeedHomeScreen}
        options={{
          title: '피드',
        }}
      />
      <Drawer.Screen
        name={mainNavigations.CALENDAR}
        component={CalendarScreen}
        options={{
          title: '달력',
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({});

export default MainDrawerNavigator;
