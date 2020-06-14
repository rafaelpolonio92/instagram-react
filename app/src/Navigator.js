import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';
import Profile from './screens/Profile';
import Login from './screens/Login';
// import { createSwitchNavigator } from 'react-navigation';

// const loginOrProfileRouter = createSwitchNavigator({
//   Profile: Profile,
//   Auth: Login
// }, {
//   initialRouteName: 'Profile'
// })

const Tab = createBottomTabNavigator();

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
        component={loginOrProfileRouter}
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