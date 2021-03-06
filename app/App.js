import React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import Routes from './src/Navigator';
import axios from 'axios';
import storeConfig from './src/store/storeConfig';

axios.defaults.baseURL = 'https://polonio-ig-project.firebaseio.com/';

const store = storeConfig();

const Redux = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

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
        <Redux />
      </>
  );
};
