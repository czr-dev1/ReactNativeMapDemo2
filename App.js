import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";

import MapScreen from "./app/screens/mapScreen";
import StoryListScreen from "./app/screens/StoryListScreen";
import StoryScreen from "./app/screens/storyScreen";

import StoryPostScreen from "./app/screens/storyPostScreen";
import ProfileScreen from "./app/screens/profileScreen";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/redux/reducers/rootReducer";

//Custom Icons
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const Icon = createIconSetFromIcoMoon(
  require("./app/assets/fonts/selection.json"),
  "IcoMoon",
  "icomoon.ttf"
);

const store = createStore(rootReducer, applyMiddleware(thunk));

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{ headerShown: false }}>
      <StoriesStack.Screen name="StoryList" component={StoryListScreen} />
      <StoriesStack.Screen name="Story" component={StoryScreen} />
    </StoriesStack.Navigator>
  );
}

const MapStack = createStackNavigator();
function MapStackScreen() {
  return (
    <MapStack.Navigator screenOptions={{ headerShown: false }}>
      <MapStack.Screen name="Map" component={MapScreen} />
      <MapStack.Screen name="Story" component={StoryScreen} />
    </MapStack.Navigator>
  );
}

import SearchScreen from "./app/screens/searchScreen";

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        options={{
          title: "nickname",
          headerRight: () => (
            <MaterialIcons
              name="menu"
              size={24}
              color="black"
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen name="Story" component={StoryScreen} />
    </ProfileStack.Navigator>
  );
}

const ProfileDrawer = createDrawerNavigator();
function ProfileDrawerScreen() {
  return (
    <ProfileDrawer.Navigator drawerPosition="right" drawerType="slide">
      <ProfileDrawer.Screen name="Home" component={ProfileStackScreen} />
    </ProfileDrawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  //Custom Icons
  const [fontsLoaded] = useFonts({
    IcoMoon: require("./app/assets/fonts/icomoon.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Map"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === "Map") {
                  iconName = "map_outline";
                } else if (route.name === "Profile") {
                  iconName = "profile_outline";
                } else if (route.name === "Post") {
                  iconName = "add_story_highlighted";
                }
                return <Icon name={iconName} size={36} color={"#4D4185"} />;
              },
            })}
          >
            <Tab.Screen
              name="Map"
              options={{ header: () => null }}
              component={MapStackScreen}
            />
            <Tab.Screen
              name="Post"
              options={{ header: () => null }}
              component={StoryPostScreen}
            />
            <Tab.Screen
              name="Profile"
              options={{ header: () => null }}
              component={ProfileDrawerScreen}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
