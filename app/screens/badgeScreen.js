import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";

//icons
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import colors from "../config/colors";
import BadgeList from "../components/badgeList";

function BadgeScreen(props) {
  useEffect(() => {}, []);

  const badges = [
    "airline-seat-flat",
    "adjust",
    "airplanemode-active",
    "airport-shuttle",
    "all-inclusive",
    "beach-access",
    "airplay",
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topIcon}>
        <Feather name="target" size={48} color="black" />
      </View>
      <BadgeList />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  topIcon: {
    alignSelf: "center",
    alignItems: "center",
    padding: 30,
  },
});

export default BadgeScreen;
