import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './app/screens/mapScreen';
import ProfileScreen from './app/screens/profileScreen';
import StoryScreen from './app/screens/storyScreen';
import StoryPostScreen from './app/screens/storyPostScreen';

//const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Map">
        <Tab.Screen name="Map" options={{header: () => null}} component={MapScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Story" component={StoryScreen} />
        <Tab.Screen name="Post" options={{header: () => null}} component={StoryPostScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
