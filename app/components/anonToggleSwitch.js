import React from "react";
import { StyleSheet, Switch as DefaultSwitch, View } from "react-native";
import { connect } from "react-redux";
import { setPrivacyMode } from "../redux/actions/authActions";
import Text from "./text";

import colors from "../config/colors";
import { Switch } from "react-native-switch";

function AnonToggleSwitch(props) {
  return (
    <View style={styles.container}>
      <Text style={{color: colors.white, paddingRight: 50}}>anonymous</Text>
      <Switch
        value={props.isPrivacyMode}
        onValueChange={() => props.setPrivacyMode(!props.isPrivacyMode)}
        backgroundActive={colors.menuBorder}
        thumbColor={props.isPrivacyMode ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 24,
  },
});

const mapStateToProps = (state) => {
  return {
    isPrivacyMode: state.authReducer.isPrivacyMode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrivacyMode: (setting) => dispatch(setPrivacyMode(setting)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnonToggleSwitch);
