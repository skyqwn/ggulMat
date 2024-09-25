import React from 'react';
import {Button, SafeAreaView, StyleSheet, View} from 'react-native';

interface AuthHomeScreenProps {}

function AuthHomeScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <Button
          title="로그인 화면으로 이동"
          onPress={() => navigation.navigate('Login')}></Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default AuthHomeScreen;
