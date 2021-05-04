import React from "react";
import { TouchableWithoutFeedback, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from '@expo/vector-icons';


import colors from "../config/colors";
import { logout } from "../redux/actions/authActions";

function ModalOpener(props) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <View style={{justifyContent: "center", width: "100%", borderWidth: 1, borderColor: "red"}}>
      {props.name === "log out" ? (
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(logout());
          }}
        >
          <View style={{flexDirection: "row", alignItems: "center", padding: 24}}>
            <MaterialCommunityIcons name="logout" size={24} color={colors.white} />
            <Text style={{ padding: 5, color: colors.white }}>{props.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(props.navigateTo, {});
          }}
        >
          <Text style={{ padding: 24, color: colors.white, }}>{props.name}</Text>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default ModalOpener;
