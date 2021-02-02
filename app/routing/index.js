import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { connect } from 'react-redux';

import DarkMapScreen from '../screens/darkMapScreen';
import LightMapScreen from '../screens/lightMapScreen';
import BookmarkPostScreen from '../screens/bookmarkPostScreen';
import BookmarkUserScreen from '../screens/bookmarkUserScreen';
import StoryListScreen from '../screens/storyListScreen';
import StoryScreen from '../screens/storyScreen';
import StoryPostScreen from '../screens/storyPostScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ProfileScreen from '../screens/profileScreen';

const MapStack = createStackNavigator();
function MapStackScreen() {
  return (
    <MapStack.Navigator screenOptions={{headerShown: false}}>
      <MapStack.Screen name='Map' component={ DarkMapScreen } />
      <MapStack.Screen name='Story' component={ StoryScreen } />
    </MapStack.Navigator>
  );
}

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{headerShown: false}}>
      <StoriesStack.Screen name='StoryList' component={ StoryListScreen } />
      <StoriesStack.Screen name ='Story' component={ StoryScreen } />
    </StoriesStack.Navigator>
  );
}

const BookmarkStack = createMaterialTopTabNavigator();
function BookmarkStackScreen() {
  return (
    <BookmarkStack.Navigator style={styles.container}>
      <BookmarkStack.Screen name='Stories' component={ BookmarkPostScreen} />
      <BookmarkStack.Screen name='Users' component={ BookmarkUserScreen } />
    </BookmarkStack.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{headerShown: false}}>
      <LoginStack.Screen name='Login' component={ LoginScreen } />
      <LoginStack.Screen name='Register' component={ RegisterScreen } />
    </LoginStack.Navigator>
  );
}

const LoggedInStack = createStackNavigator();
function LoggedInStackScreen() {
  return (
    <LoggedInStack.Navigator screenOptions={{headerShown: false}}>
      <LoggedInStack.Screen name='Map' component={ LightMapScreen } />
      <LoggedInStack.Screen name='Story' component={ StoryScreen } />
      <LoggedInStack.Screen name='Profile' component={ ProfileScreen } />
    </LoggedInStack.Navigator>
  );
}

// Will display if user is anonymous
const AuthTab = createBottomTabNavigator();
function AuthTabScreen() {
  return (
    <AuthTab.Navigator initialRouteName='Map' 
      screenOptions={( { route }) => ({
        tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Map') {
          iconName = 'map';
        } else if (route.name === 'Stories') {
          iconName = 'list';
        } else if (route.name === 'Post') {
          iconName = 'plus-square';
        } else if (route.name === 'Profile') {
          iconName = 'user';
        }
        return <FontAwesome5 name={iconName} size={size} color={color} />
        }
      })}>
      <AuthTab.Screen name='Map' component={ MapStackScreen } />
      <AuthTab.Screen name='Stories' component={ StoriesStackScreen } />
      <AuthTab.Screen name='Post' component={ StoryPostScreen } />
      <AuthTab.Screen name='Profile' component={ LoginStackScreen } />
    </AuthTab.Navigator>
  );
}

// Will display is user has successfully logged in
const AppTab = createBottomTabNavigator();
function AppTabScreen() {
  return (
    <AppTab.Navigator initialRouteName='Map' 
      screenOptions={( { route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Stories') {
            iconName = 'list';
          } else if (route.name === 'Post') {
            iconName = 'plus-square';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />
        }
      })}>
      <AppTab.Screen name='Map' component={ LoggedInStackScreen } />
      <AppTab.Screen name='Stories' component={ BookmarkStackScreen } />
      <AppTab.Screen name='Post' component={ StoryPostScreen } />
      <AppTab.Screen name='Profile' component={ ProfileScreen } />
    </AppTab.Navigator>
  );
}

const Stack = createStackNavigator();
function StackScreen({ hasAuth }) {
  return (
    <NavigationContainer>
     <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
	  {!hasAuth ? (
	      	<Stack.Screen name='Auth' component={AuthTabScreen} />
  	  ) : (
	  	<Stack.Screen name='App' component={AppTabScreen} />
  	  )}
	</Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    marginTop: 20

  }
})

const mapStateToProps = (state) => ({
	hasAuth: state.authReducer.isAuthenticated
});

export default connect(mapStateToProps)(StackScreen);

