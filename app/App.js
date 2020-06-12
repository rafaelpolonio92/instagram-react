import React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import Routes from './src/Navigator';

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
        <Routes />
      </>
  );
};
