import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MapScreen from './app/screens/mapScreen';
import ProfileScreen from './app/screens/profileScreen';
import StoryScreen from './app/screens/storyScreen';
import StoryPostScreen from './app/screens/storyPostScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Map">
        <Stack.Screen name="Map" options={{header: () => null}} component={MapScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Story" component={StoryScreen} />
        <Stack.Screen name="Post" options={{header: () => null}} component={StoryPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
