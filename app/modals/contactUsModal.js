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
import { FontAwesome5,MaterialCommunityIcons, Entypo, MaterialIcons } from "@expo/vector-icons";
import { connect } from "react-redux";
import Toast from 'react-native-toast-message';

import Text from "../components/text";
import colors from "../config/colors";

function ContactUsModal(props) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
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

  const showToast = (val) => {
    if (val) {
      Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Successfully Sent',
          text2: 'Your message has been sent!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
    } else {
      Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error Sending',
          text2: 'There was an error sending',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
    }
  }

  const onSubmit = (e) => {
    if(message.trim().length > 1){
      let success = false;
      console.log(message);
      Toast.show({
          type: 'info',
          position: 'top',
          text1: 'Sending Message',
          text2: 'Sit tight while your message sends!',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
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
            console.log(response);
            showToast(true);
            props.navigation.goBack();
          })
          .catch((err) => {
            showToast(false);
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
            showToast(true);
            props.navigation.goBack();
          })
          .catch((err) => {
            showToast(false);
            console.log(err);
          });
      }
    } else {
      Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error Submitting',
          text2: 'Please include a message',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
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
            name="chevron-left"
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
          <TouchableWithoutFeedback>
            <DefaultText style={{color: colors.purple, padding: 24}}>done</DefaultText>
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
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
              <MaterialIcons name="send" size={24} color={colors.white} />
              <MaterialIcons name="send" size={28} color={colors.purple}
                onPress={(e) => {
                  console.log("press");
                  onSubmit(e);
                }}
              />
            </View>
            <TextInput
              style={styles.input}
              placeholder="email (optional)"
              placeholderTextColor={colors.emailInput}
              onChangeText={(val) => setEmail(val)}
            />
            <TextInput style={styles.input} placeholder="subject" placeholderTextColor={colors.emailInput}/>
            <TextInput
              style={styles.inputBorderless}
              multiline
              placeholderTextColor={colors.emailInput}
              placeholder="message"
              onChangeText={(val) => setMessage(val)}
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
    color: colors.black
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
