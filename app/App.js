import React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import Header from './src/components/Header';
import Feed from './src/screens/Feed';

export default props => {
  let [fontsLoaded] = useFonts({
    'shelter': require('./assets/fonts/shelter.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } 
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
      <Feed />
    </>
  );
};
