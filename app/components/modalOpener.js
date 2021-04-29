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
    <View style={{ }}>
      {props.name === "log out" ? (
        <TouchableWithoutFeedback
          onPress={() => {
            dispatch(logout());
          }}
        >
          <View style={{flexDirection: "row", alignItems: "center", padding: 24, borderTopWidth: 1, borderTopColor: colors.border}}>
            <MaterialCommunityIcons name="logout" size={24} color="black" />
            <Text style={{ padding: 5 }}>{props.name}</Text>
          </View>
        </TouchableWithoutFeedback>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(props.navigateTo, {});
          }}
        >
          <Text style={{ padding: 24 }}>{props.name}</Text>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

export default ModalOpener;
