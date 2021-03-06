import React from 'react';
import {Image} from 'react-native';
import {Profile} from '../screens/Tab/Profile';
import {Relationship} from '../screens/Tab/Relationship';
import {Map} from '../screens/Tab/Map';
import {Spoil} from '../screens/Tab/Spoil';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export function TabStack() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused, color, size}) => {
          let icon;

          if (route.name === 'Spoil') {
            icon = focused
              ? require('../assets/images/spoilClick.png')
              : require('../assets/images/spoil.png');
          } else if (route.name === 'Relationship') {
            icon = focused
              ? require('../assets/images/relationshipClick.png')
              : require('../assets/images/relationship.png');
          } else if (route.name === 'Map') {
            icon = focused
              ? require('../assets/images/mapClick.png')
              : require('../assets/images/map.png');
          } else if (route.name === 'Profile') {
            icon = focused
              ? require('../assets/images/profileClick.png')
              : require('../assets/images/profile.png');
          }
          return <Image source={icon} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Spoil" component={Spoil} />
      <Tab.Screen name="Relationship" component={Relationship} />
      <Tab.Screen name="Map" component={Map} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
