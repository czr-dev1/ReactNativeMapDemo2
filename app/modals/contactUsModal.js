import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text as DefaultText
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { connect } from "react-redux";

import Text from "../components/text";
import colors from "../config/colors";

function ContactUsModal(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    const backAction = () => {
      if (props.route.params.isMapScreen) {
        // console.log("maps");
        // fun bug where on the map screen it wasn't routing correctly
        // you still the other navigation because it handles routing oddly
        // if you don't do that in the profile screen
      } else {
        // console.log("not maps");
        props.navigation.goBack();
      }
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    console.log(props.route.params.isMapScreen);

    return () => backHandler.remove();
  }, [])

  const onSubmit = (e) => {
    if (email !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      };
      // Request Body
      // const body = JSON.stringify({ username, email, password });
      let data = JSON.stringify({ email: email, message: message });
      axios
        .post("https://globaltraqsdev.com/api/contactUs/", data, config)
        .then((response) => {
          setEmail("");
          setMessage("");
          props.navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const config = {
        headers: {
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      };
      setEmail(`Anonymous@anon.com`);

      axios
        .post(
          "https://globaltraqsdev.com/api/contactUs/",
          {
            email: email,
            message: message,
          },
          config
        )
        .then((response) => {
          setEmail("");
          setMessage("");
          props.navigation.goBack();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            paddingBottom: "25%"
          }}
        >
          <Entypo
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ padding: 24 }}
            name="cross"
            size={28}
            color={colors.white}
          />
          <Text
            style={{
              fontSize: 18,
              color: colors.white,
              fontWeight: "bold",
            }}
          >
            contact us
          </Text>
          <TouchableWithoutFeedback
            onPress={(e) => {
              onSubmit(e);
            }}
          >
            <DefaultText style={{color: colors.white, padding: 24}}>done</DefaultText>
          </TouchableWithoutFeedback>
        </View>

        <View style={{ margin: 0,}}>
          <View style={[styles.box, styles.shadow2]}>
            <Text
              style={{
                fontSize: 22,
                paddingTop: 12,
                paddingBottom: 12,
                color: colors.purple,
                fontWeight: "bold",
              }}
            >
              what's on your mind?
            </Text>
            <TextInput style={styles.input} placeholder="email (optional)" placeholderTextColor={colors.emailInput}/>
            <TextInput style={styles.input} placeholder="subject" placeholderTextColor={colors.emailInput}/>
            <TextInput
              style={styles.inputBorderless}
              multiline
              placeholderTextColor={colors.emailInput}
              placeholder="message"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    alignItems: "center",
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  box: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    alignItems: "center",
    height: Dimensions.get("window").height * .8,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.emailBars,
    padding: 10,
    fontSize: 14,
    width: "100%",
    fontFamily: "Arial",
    color: colors.emailInput
  },
  inputBorderless: {
    borderColor: "#ddd",
    padding: 10,
    fontSize: 14,
    width: "100%",
  },
});

const mapStateToProps = (state) => {
  return {
    isPrivacyMode: state.authReducer.isPrivacyMode,
  };
};

export default connect(mapStateToProps, null)(ContactUsModal);
