import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feed from './screens/Feed';
import AddPhoto from './screens/AddPhoto';


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
        component={Feed}
        options={{
          title: 'Profile',
          tabBarIcon: ({ tintColor }) =>
          <Icon name='user' size={30} color={tintColor} />
        }}
      />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
export default Routes;