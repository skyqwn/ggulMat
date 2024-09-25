import React from 'react';

import AuthStackNavigator from '../stack/AuthStackNavigator';
import MainDrawerNavigator from '../drawer/MainDrawerNavigator';

function RootNavigator() {
  const isLogin = false;

  return <>{isLogin ? <MainDrawerNavigator /> : <AuthStackNavigator />}</>;
}

export default RootNavigator;
