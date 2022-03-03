import React, { useEffect, useState, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { StatusBar, StyleSheet } from "react-native";

import Navigation from "./app/routing/index";

//redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./app/redux/reducers/rootReducer";

//Custom Icons
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
const Icon = createIconSetFromIcoMoon(
  require("./app/assets/fonts/selection.json"),
  "IcoMoon",
  "icomoon.ttf",
);


//User persistance 
//Use asyncStorage as a store for the users state
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};


// const store = createStore(rootReducer, applyMiddleware(thunk));

//Create a persistor from the root reducer that holds the apps state
const persistedReducer = persistReducer(persistConfig, rootReducer);

//Use the new persistor(Really just a reducer) to manage the apps state
const store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);

//Clear Async Storage so that the apps state must be taken from our persistor
AsyncStorage.clear();



Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //Custom Icons
  const [fontsLoaded] = useFonts({
    IcoMoon: require("./app/assets/fonts/icomoon.ttf"),
    Arial: require("./app/assets/fonts/arial.ttf"),
    ArialBold: require("./app/assets/fonts/arialBold.ttf"),
    //Arial: require("./app/assets/fonts/OpenDyslexicRegular.ttf"),
    //ArialBold: require("./app/assets/fonts/OpenDyslexicBold.ttf"),
  });

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token),
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current,
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaProvider>
        {/* Added StatusBar for iOS to see time/battery on each
        page except where page has a black background */}
        <StatusBar
          barStyle={
            Platform.OS === "android" ? "light-content" : "dark-content"
          }
        />
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
          <Navigation />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    );
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } =
          await Notifications.requestForegroundPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }
}
