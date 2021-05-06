import React, { useState, useEffect } from "react";
import { StyleSheet, Switch as DefaultSwitch, View } from "react-native";
import { connect } from "react-redux";
import { setPrivacyMode } from "../redux/actions/authActions";
import Text from "./text";
import { reloadUser } from "../redux/actions/auth";
import axios from "axios";

import colors from "../config/colors";
import { Switch } from "react-native-switch";

function AnonToggleSwitch(props) {
  const [privacy, setprivacy] = useState(props.is_anonymous_active);

  useEffect(() => {
    console.log(props);
  });

  return (
    <View style={styles.container}>
      <Text style={{color: colors.white, paddingRight: 50}}>anonymous</Text>
      <Switch
        value={privacy}
        onValueChange={(val) => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
            },
          };
          let data = {
            is_profile_private: val,
          };
          axios.patch(`https://globaltraqsdev.com/api/auth/users/${props.id}/`, data, config)
            .then((res) => {
              setprivacy(res.data.is_profile_private);
              props.reloadUser(props.user);
            })
            .catch((err) => {
              console.log("error: ", err);
            });
        }}
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
  console.log(state);
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnonToggleSwitch);
