import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';

import MapScreen from './app/screens/mapScreen';
import ProfileScreen from './app/screens/profileScreen';
import StoryScreen from './app/screens/storyScreen';
import StoryPostScreen from './app/screens/storyPostScreen';

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map"
        screenOptions={( { route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = 'map';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            } else if (route.name === 'Post') {
              iconName = 'plus-square';
            }
            return <FontAwesome5 name={iconName} size={size} color={color} />
          }
        })}>
        <Tab.Screen name="Map" options={{header: () => null}} component={MapScreen} />
        <Tab.Screen name="Post" options={{header: () => null}} component={StoryPostScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Story" component={StoryScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
