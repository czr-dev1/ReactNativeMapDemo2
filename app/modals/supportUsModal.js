import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";

function SupportUsModal(props) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
          <Image source={require("../assets/Help.png")} />
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
            color="#787878"
          />
          <FontAwesome5
            onPress={() =>
              Linking.openURL("https://www.instagram.com/the.arqive/")
            }
            name="instagram"
            size={60}
            color="#787878"
          />
          <MaterialCommunityIcons
            onPress={() => Linking.openURL("https://twitter.com/thearqive")}
            name="twitter-circle"
            size={65}
            color="#787878"
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
