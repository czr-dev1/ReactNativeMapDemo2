import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import DarkMapScreen from '../screens/darkMapScreen';
import LightMapScreen from '../screens/lightMapScreen';
import StoryListScreen from '../screens/storyListScreen';
import StoryScreen from '../screens/storyScreen';
import StoryPostScreen from '../screens/storyPostScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ProfileScreen from '../screens/profileScreen';
import BookmarkedPostsScreen from '../screens/bookmarkedPostsScreen';
import BookmarkedUsersScreen from '../screens/bookmarkedUsersScreen';
import BadgeScreen from '../screens/badgeScreen';
import FollowingProfileScreen from '../screens/followingProfileScreen';

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

const BookmarkedUsersStack = createStackNavigator();
function BookmarkedUsersStackScreen() {
  return (
    <BookmarkedUsersStack.Navigator>
      <BookmarkedUsersStack.Screen name="userlist" options={{header: ()=> null}} component={ BookmarkedUsersScreen } />
      <BookmarkedUsersStack.Screen name="userprofile" options={{header: ()=> null}} component={ FollowingProfileScreen } />
      <BookmarkedUsersStack.Screen name ="Story" options={{header: ()=> null}} component={ StoryScreen } />
    </BookmarkedUsersStack.Navigator>
  );
}

const BookmarkedTopTab = createMaterialTopTabNavigator();
function BookmarkedTopTabScreen() {
  return (
    <BookmarkedTopTab.Navigator>
      <BookmarkedTopTab.Screen name="stories" component={ BookmarkedPostsScreen } />
      <BookmarkedTopTab.Screen name="users" component={ BookmarkedUsersStackScreen } />
    </BookmarkedTopTab.Navigator>
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
      <LoggedInStack.Screen name='StoryList' component={ StoryListScreen } />
      <LoggedInStack.Screen name='Story' component={ StoryScreen } />
      <LoggedInStack.Screen name='Profile' component={ ProfileScreen } />
    </LoggedInStack.Navigator>
  );
}

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

const ProfileStack = createStackNavigator();
function ProfileStackScreen({navigation}) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" options={{
        title: 'nickname',
        headerRight: () => (
            <MaterialIcons name="menu" size={24} color="black" onPress={() => navigation.openDrawer()}/>
        )
        }} component={ ProfileScreen } />
      <ProfileStack.Screen name="Story" component={ StoryScreen } />
      <ProfileStack.Screen name="Badges" options={{header: ()=> null}} component={ BadgeScreen } />
    </ProfileStack.Navigator>
  )
}

const ProfileDrawer = createDrawerNavigator();
function ProfileDrawerScreen() {
  return (
    <ProfileDrawer.Navigator
      drawerPosition="right"
      drawerType="slide">
      <ProfileDrawer.Screen name="Home" component={ ProfileStackScreen } />
    </ProfileDrawer.Navigator>
  );
}

const AppTab = createBottomTabNavigator();
function AppTabScreen() {
  return (
    <AppTab.Navigator initialRouteName='Map'
      screenOptions={( { route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Map') {
            iconName = 'map';
          } else if (route.name === 'Bookmarked') {
            iconName = 'bookmark';
          } else if (route.name === 'Post') {
            iconName = 'plus-square';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }
          return <FontAwesome5 name={iconName} size={size} color={color} />
        }
      })}>
      <AppTab.Screen name='Map' component={ LoggedInStackScreen } />
      <AppTab.Screen name='Bookmarked' component={ BookmarkedTopTabScreen } />
      <AppTab.Screen name='Post' component={ StoryPostScreen } />
      <AppTab.Screen name='Profile' component={ ProfileDrawerScreen } />
    </AppTab.Navigator>
  );
}

const Stack = createStackNavigator();
function StackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Auth' component={ AuthTabScreen } />
        <Stack.Screen name='App' component={ AppTabScreen } />
        <Stack.Screen name='Login' component={ LoginScreen } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



export default StackScreen;
