import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MapScreen from './app/screens/mapScreen';
import StoryListScreen from './app/screens/StoryListScreen';
import StoryScreen from './app/screens/storyScreen';
import StoryPostScreen from './app/screens/storyPostScreen';
import ProfileScreen from './app/screens/profileScreen';

//redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './app/redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{headerShown: false}}>
      <StoriesStack.Screen name="StoryList" component={ StoryListScreen } />
      <StoriesStack.Screen name ="Story" component={ StoryScreen } />
    </StoriesStack.Navigator>
  );
}

const MapStack = createStackNavigator();
function MapStackScreen() {
  return (
    <MapStack.Navigator screenOptions={{headerShown: false}}>
      <MapStack.Screen name="Map" component={ MapScreen } />
      <MapStack.Screen name="Story" component={ StoryScreen } />
    </MapStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen() {
  return (
    <MapStack.Navigator screenOptions={{headerShown: false}}>
      <MapStack.Screen name="Profile" component={ ProfileScreen } />
      <MapStack.Screen name="Story" component={ StoryScreen } />
    </MapStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
    <Provider store={store}>
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
            <Tab.Screen name="Map" options={{header: () => null}} component={ MapStackScreen } />
            <Tab.Screen name="Post" options={{header: () => null}} component={ StoryPostScreen } />
            <Tab.Screen name="Profile" component={ ProfileStackScreen } />
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
    </SafeAreaProvider>
  );
}
