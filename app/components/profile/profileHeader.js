import React from "react";
import { Platform, View } from "react-native";
import { connect } from "react-redux";
import Text from "../text";

import colors from "../../config/colors";

function ProfileHeader(props) {
  return (
    <View>
      {/* determines if platform is android or ios 
      to style header properly */}
      {Platform.OS === 'android' ? (
        <View
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: colors.purple }}
        >
          {props.username}
        </Text>
      </View>
      ) : (
        <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          // comment these out for iOS
          // position: "absolute",
          //top: 0,
          //bottom: 0,
          //right: 0,
          //left: 0,
        }}
      >
        <Text
          style={{ fontSize: 18, fontWeight: "bold", color: colors.purple }}
        >
          {props.username}
        </Text>
      </View>
      )}
      
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    username: state.profileReducer.profileData.user.username,
  };
};

export default connect(mapStateToProps)(ProfileHeader);
