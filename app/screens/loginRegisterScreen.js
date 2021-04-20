import React, { useEffect } from "react";
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { connect, useDispatch } from "react-redux";
import { setExpoPushToken } from "../redux/actions/authActions";

import colors from "../config/colors";

function LoginRegisterOption() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      dispatch(setExpoPushToken(token));
    });
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const {
        status: existingStatus,
      } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <Image
        style={styles.logo}
        source={require("../assets/white_color_logo_highres.png")}
      />
      <View style={styles.loginBtn}>
        <TouchableOpacity
          activeOpacity={0.6}
          underlayColor={colors.darkPurple}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ color: "white", alignSelf: "center" }}>log in</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.registerBtn}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ color: "white", alignSelf: "center" }}>register</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate("Map");
          }}
        >
          <Text style={styles.text}>continue</Text>
        </TouchableWithoutFeedback>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    marginTop: 175,
    width: "100%",
    height: 256,
    resizeMode: "contain",
  },
  text: {
    fontSize: 14,
    marginTop: 60,
    color: "#2380B0",
  },
  loginBtn: {
    fontSize: 16,
    width: "85%",
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
  registerBtn: {
    fontSize: 16,
    width: "85%",
    marginTop: 30,
    marginBottom: 250,
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.purple,
  },
});

export default LoginRegisterOption;
