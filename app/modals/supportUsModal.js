import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
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
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={require("../assets/Help.png")} style={{height: Dimensions.get('window').height / 2, resizeMode: "contain"}}/>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 24,
              padding: 24,
              color: "#787878",
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
            color="#3b5998"
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
            color="#1da1f2"
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
    alignItems: "center",
    height: "100%",
    width: Dimensions.get("window").width,
  },
  box: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    margin: 6,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#787878",
  },
  number: {
    padding: 8,
  },
  description: {
    color: "#787878",
  },
});

export default SupportUsModal;
