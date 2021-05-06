import React from "react";
import { Platform, StyleSheet, StatusBar, View, Dimensions } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";

import DarkMapScreen from "../screens/darkMapScreen";
import LightMapScreen from "../screens/lightMapScreen";
import BookmarkedPostsScreen from "../screens/bookmarkedPostsScreen";
import BookmarkedUserScreen from "../screens/bookmarkedUserScreen";
import StoryListScreen from "../screens/storyListScreen";
import StoryScreen from "../screens/storyScreen";
import StoryPostScreen from "../screens/storyPostScreen";
import LoginRegisterScreen from "../screens/loginRegisterScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import EULAScreen from "../screens/eulaScreen";
import ForgotPasswordScreen from "../screens/forgotPasswordScreen";
import ResetPasswordScreen from "../screens/resetPasswordScreen";
import ProfileScreen from "../screens/profileScreen";
import BadgeScreen from "../screens/badgeScreen";
import FollowingProfileScreen from "../screens/followingProfileScreen";
import NotificationScreen from "../screens/notificationScreen";

import AnonToggleSwitch from "../components/anonToggleSwitch";
import ModalOpener from "../components/modalOpener";
import ProfileHeader from "../components/profile/profileHeader";

import HelpAndHotlineModal from "../modals/helpAndHotlineModal";
import SupportUsModal from "../modals/supportUsModal";
import ContactUsModal from "../modals/contactUsModal";
import EditProfileModal from "../modals/editProfileModal";
import EditStoryModal from '../modals/editStoryModal';


import { createIconSetFromIcoMoon } from '@expo/vector-icons';
const Icon = createIconSetFromIcoMoon(
  require('../assets/fonts/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);


import colors from "../config/colors.js";

const AnonMapStack = createStackNavigator();
function AnonMapStackScreen() {
  return (
    <AnonMapStack.Navigator screenOptions={{ headerShown: false }}>
      <AnonMapStack.Screen name="Map" component={DarkMapScreen} />
      <AnonMapStack.Screen name="Story" component={StoryScreen} />
    </AnonMapStack.Navigator>
  );
}

const UserMapStack = createStackNavigator();
function UserMapStackScreen() {
  return (
    <UserMapStack.Navigator screenOptions={{ headerShown: false }}>
      <UserMapStack.Screen name="Map" component={LightMapScreen} />
    </UserMapStack.Navigator>
  );
}

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{ headerShown: false }}>
      <StoriesStack.Screen name="StoryList" component={StoryListScreen} />
      <StoriesStack.Screen name="Story" component={StoryScreen} />
    </StoriesStack.Navigator>
  );
}

const BookmarkedUsersStack = createStackNavigator();
function BookmarkedUsersStackScreen() {
  return (
    <BookmarkedUsersStack.Navigator>
      <BookmarkedUsersStack.Screen
        name="UserList"
        options={{ header: () => null }}
        component={BookmarkedUserScreen}
      />
      <BookmarkedUsersStack.Screen
        name="UserProfile"
        options={{ header: () => null }}
        component={FollowingProfileScreen}
      />
    </BookmarkedUsersStack.Navigator>
  );
}

const BookmarkedTopTab = createMaterialTopTabNavigator();
function BookmarkedTopTabScreen() {
  // Odd glitch with names where it wouldn't display the full name
  // fixed by adding extra s at the end
  return (
    <BookmarkedTopTab.Navigator
      style={{elevation: 0}}
      tabBarOptions={{
        labelStyle: {
          textTransform: "lowercase",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: 'Arial',
          marginTop: 30
        },
        tabStyle: {
          backgroundColor: colors.purple,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        activeTintColor: colors.white,
        inactiveTintColor: colors.border,
        backgroundColor: colors.purple,
        style: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}
    >
      <BookmarkedTopTab.Screen name="stories" component={BookmarkedPostsScreen} />
      <BookmarkedTopTab.Screen name="users" component={BookmarkedUsersStackScreen} />
    </BookmarkedTopTab.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name="Initial" component={LoginRegisterScreen} />
      <LoginStack.Screen name="Login" component={LoginScreen} />
      <LoginStack.Screen name="Register" component={RegisterScreen} />
      <LoginStack.Screen name="EULA" component={EULAScreen} />
      <LoginStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen name="ResetPassword" component={ResetPasswordScreen} />
    </LoginStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
  // the header left is a hack to make the title centered, otherwise its just terrible to work with
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        options={{
          headerLeft: () => (
            <MaterialIcons name="menu" size={24} color="white" />
          ),
          headerTitle: () => <ProfileHeader />,
          headerRight: () => (
            <MaterialIcons
              name="menu"
              style={{ paddingRight: 10 }}
              size={24}
              color={colors.purple}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name="Badge"
        options={{ header: () => null }}
        component={BadgeScreen}
      />
    </ProfileStack.Navigator>
  );
}

const ProfileDrawer = createDrawerNavigator();
function ProfileDrawerScreen() {
  return (
    <ProfileDrawer.Navigator
      drawerPosition="right"
      drawerType="slide"
      drawerStyle={{ width: "80%" }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1}}>
            <View style={{justifyContent: "space-between", flex: 1}}>
              <View>
                <ModalOpener
                  {...props}
                  name="help & hotline"
                  navigateTo="HelpAndHotlineModal"
                />
                <ModalOpener
                  {...props}
                  name="support us"
                  navigateTo="SupportUsModal"
                />
                <ModalOpener
                  {...props}
                  name="contact us"
                  navigateTo="ContactUsModal"
                />
                <AnonToggleSwitch {...props} />
              </View>
              <View>
                <ModalOpener {...props} name="log out" />
              </View>
            </View>
          </DrawerContentScrollView>
        );
      }}
    >
      <ProfileDrawer.Screen name="Home" component={ProfileStackScreen} />
    </ProfileDrawer.Navigator>
  );
}

// WILL DISPLAY IF USER IS ANONYMOUS
const NeedAuthTab = createBottomTabNavigator();
function NeedAuthTabScreen() {
  return (
    <NeedAuthTab.Navigator
      initialRouteName="Map"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.purple,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (focused) {
            if (route.name === "Map") {
              iconName = "map_icon_active";
            } else if (route.name === "Post") {
              iconName = "add_story_icon";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_active";
            }
          } else {
            if (route.name === "Map") {
              iconName = "map_outline";
            } else if (route.name === "Post") {
              iconName = "add_story_outline";
            } else if (route.name === "Profile") {
              iconName = "profile_outline";
            }
          }



          if (focused) {
            iconColor = colors.white;
          } else {
            iconColor = colors.border;
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <NeedAuthTab.Screen name="Map" component={AnonMapStackScreen} />
      <NeedAuthTab.Screen name="Post" component={StoryPostScreen} />
      <NeedAuthTab.Screen
        name="Profile"
        component={LoginStackScreen}
        options={{ tabBarVisible: false }}
      />
    </NeedAuthTab.Navigator>
  );
}

const NeedAuthStack = createStackNavigator();
function NeedAuthStackScreen() {
  return (
    <NeedAuthStack.Navigator screenOptions={{ headerShown: false }}>
      <NeedAuthStack.Screen name="Main" component={NeedAuthTabScreen} />
      <NeedAuthStack.Screen
        name="HelpAndHotlineModal"
        component={HelpAndHotlineModal}
      />
      <NeedAuthStack.Screen name="SupportUsModal" component={SupportUsModal} />
      <NeedAuthStack.Screen name="ContactUsModal" component={ContactUsModal} />
      <NeedAuthStack.Screen
        name="EditProfileModal"
        component={EditProfileModal}
      />
    </NeedAuthStack.Navigator>
  );
}

// WILL DISPLAY IF USER HAS SUCCESSFULLY LOGGED IN
const AppTab = createBottomTabNavigator();
function AppTabScreen() {
  return (
    <AppTab.Navigator
      initialRouteName="Map"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.purple,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (focused) {
            if (route.name === "Map") {
              iconName = "map_icon_active";
            } else if (route.name === "Bookmarks") {
              iconName = "bookmark_icon_active";
            } else if (route.name === "Post") {
              iconName = "add_story_icon";
            } else if (route.name === "Notifications") {
              iconName = "notification_icon_active";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_active";
            }
          } else {
            if (route.name === "Map") {
              iconName = "map_outline";
            } else if (route.name === "Bookmarks") {
              iconName = "bookmark_outline";
            } else if (route.name === "Post") {
              iconName = "add_story_outline";
            } else if (route.name === "Notifications") {
              iconName = "notifications_outline";
            } else if (route.name === "Profile") {
              iconName = "profile_outline";
            }
          }

          if (focused) {
            iconColor = colors.white;
          } else {
            iconColor = colors.border;
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <AppTab.Screen name="Map" component={UserMapStackScreen} />
      <AppTab.Screen name="Bookmarks" component={BookmarkedTopTabScreen} />
      <AppTab.Screen name="Post" component={StoryPostScreen} />
      <AppTab.Screen name="Notifications" component={NotificationScreen} />
      <AppTab.Screen name="Profile" component={ProfileDrawerScreen} />
    </AppTab.Navigator>
  );
}

const AppStack = createStackNavigator();
function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name="Home" component={AppTabScreen} />
      <AppStack.Screen
        name="Story"
        options={{ header: () => null }}
        component={StoryScreen}
      />
      <AppStack.Screen name="HelpAndHotlineModal" component={HelpAndHotlineModal} />
      <AppStack.Screen name="SupportUsModal" component={SupportUsModal} />
      <AppStack.Screen name="ContactUsModal" component={ContactUsModal} />
      <AppStack.Screen name="EditProfileModal" component={EditProfileModal} />
      <Stack.Screen name="UserProfileModal" component={FollowingProfileScreen} />
      <Stack.Screen name="EditStoryModal" component={EditStoryModal} />
    </AppStack.Navigator>
  );
}

const Stack = createStackNavigator();
function StackScreen({ hasAuth }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{ headerShown: false }}
      >
        {!hasAuth ? (
          <Stack.Screen name="Auth" component={NeedAuthStackScreen} />
        ) : (
          <Stack.Screen name="App" component={AppStackScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 0
  },
});

const mapStateToProps = (state) => ({
  hasAuth: state.authReducer.token,
});

export default connect(mapStateToProps)(StackScreen);
