import React from 'react';
import { useFonts } from '@use-expo/font';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import Header from './src/components/Header';
import { View, Text } from 'react-native';
import Post from './src/components/Post';

export default props => {
  let [fontsLoaded] = useFonts({
    'shelter': require('./assets/fonts/shelter.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    const comments = [{
      nickname: 'Rafael Polonio',
      comment: 'Daora'
    }, {
      nickname: 'Teste',
      comment: 'Brabo'
    }]
    return (
      <>
        <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
        <Header />
        <Post image={require('./assets/imgs/fence.jpg')}
          comments = {comments} 
        />
      </>
    );
  }
};
