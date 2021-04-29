import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text as DefaultText
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";

function SupportUsModal(props) {

  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <Entypo
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ padding: 24 }}
            name="chevron-left"
            size={28}
            color={colors.purple}
          />
          <Text
            style={{
              fontSize: 24,
              padding: 24,
              color: colors.purple,
              fontWeight: "bold",
            }}
          >
            support us
          </Text>
          <TouchableWithoutFeedback
          onPress={() => {
            props.navigation.goBack();
          }}>
            <DefaultText style={{padding: 24, color: colors.purple, fontSize: 16}}>done</DefaultText>
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              paddingBottom: 24,
              color: colors.purple,
            }}
          >
            how you can help
          </Text>
        </View>
        <View style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center' }}>
          {/* If you change the size of the image,
              you have to change the positioning too */}
          <ImageBackground
            style={styles.image}
            source={require("../assets/supportUs/Purple_Chat_Bubble.42941b20.png")}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                top: 75,
                left: 124
              }}
            >
              post
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                top: 120,
                left: 85
              }}
            >
              your stories
            </Text>
          </ImageBackground>
          <ImageBackground
            style={styles.image}
            source={require("../assets/supportUs/Green_Chat_Bubble.7b3e23e3.png")}
          >
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                top: 75,
                left: 119
              }}
            >
              share
            </Text>
            <Text
              style={{
                fontSize: 25,
                color: 'white',
                textAlign: 'center',
                position: 'absolute',
                top: 120,
                left: 90
              }}
            >
              #thearqive
            </Text>
          </ImageBackground>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              padding: 24,
              color: colors.purple,
              fontWeight: "bold",
            }}
          >
            follow us
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: Dimensions.get("window").width,
          }}
        >
          <FontAwesome5
            onPress={() =>
              Linking.openURL("https://www.facebook.com/thearqive/")
            }
            name="facebook-square"
            size={60}
            color="#3B5998"
          />
          <FontAwesome5
            onPress={() =>
              Linking.openURL("https://www.instagram.com/the.arqive/")
            }
            name="instagram"
            size={60}
            color="#C13584"
          />
          <MaterialCommunityIcons
            onPress={() => Linking.openURL("https://twitter.com/thearqive")}
            name="twitter-circle"
            size={65}
            color="#1DA1F2"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: Dimensions.get("window").width,
  },
  image: {
    textAlign: 'center',
    height: 300,
    width: 300,
    position: 'relative',
    marginBottom: -50
  },
});

export default SupportUsModal;
