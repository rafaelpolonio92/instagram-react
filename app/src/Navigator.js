import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
import Register from './screens/Register';

import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginNavigator = () => (
  <AppStack.Navigator
    initialRouteName='Login'
    headerMode='screen'
    screenOptions={{
      cardStyle: {
        backgroundColor: '#f0f0f5'
      }
    }}
  >
    <AppStack.Screen name='Login' component={Login}/>
    <AppStack.Screen name='Register' component={Register} />
  </AppStack.Navigator>
);

const StackNavigator = () => (
  <AppStack.Navigator
    initialRouteName='Profile'
    headerMode='screen'
    screenOptions={{
      cardStyle: {
        backgroundColor: '#f0f0f5'
      }
    }}
  >
    <AppStack.Screen name='Profile' component={Profile} />
    <AppStack.Screen name='Auth' component={LoginNavigator} />
  </AppStack.Navigator>
)

function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Feed"
        screenOptions={{ gestureEnabled: false }}
      >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          title: 'Feed',
          tabBarIcon: ({ tintColor }) =>
            <Icon name='home' size={30} color={tintColor} />
        }}
      />
      <Tab.Screen
        name="AddPhoto"
        component={AddPhoto}
        options={{
          title: 'Add Picture',
          tabBarIcon: ({ tintColor }) =>
          <Icon name='camera' size={30} color={tintColor} />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={StackNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ tintColor }) =>
          <Icon name='user' size={30} color={tintColor} />
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;