import React, { useEffect, useState, FlatList } from "react";
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Switch } from "react-native-switch";
import { Card } from "react-native-elements";
import { connect, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { loadStories } from "../redux/actions/storyActions";
import { reloadUser } from "../redux/actions/auth";
import { userSelfDelete } from "../redux/actions/authActions";
import axios from "axios";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";

// profile picture
const PROFILE_PIC = require("../assets/profile_blank.png");

//story component
import StoryList from "../components/storyList";

function ProfileScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const [tempStories, setTempStories] = useState([]);
  const [privacy, setprivacy] = useState(props.is_anonymous_active);
  const insets = useSafeAreaInsets();

  const renderStoriesByType = () => {
    let list = {};
    switch (selectedButton) {
      case 1:
        list = props.stories.filter((item) => item.category === 1);
        return (
          <StoryList
            stories={props.stories.filter((item) => item.category === 1)}
          />
        );
        break;
      case 2:
        list = props.stories.filter((item) => item.category === 3);
        return (
          <StoryList
            stories={props.stories.filter((item) => item.category === 3)}
          />
        );
        break;
      case 3:
        list = props.stories.filter((item) => item.category === 2);
        return (
          <StoryList
            stories={props.stories.filter((item) => item.category === 2)}
          />
        );
        break;
      default:
        list = props.stories;
        return <StoryList stories={props.stories} />;
    }
  };

  // Removing the paddingTop property on the outter view will cause it to shift
  // the whole screen up, I konw its a bit hacky but without subtracting it leaves
  // a large gap, it used to be the SafeAreaView from this library but it wasn't
  // working correctly after a merge so I changed it to useSafeAreaInsets
  // https://reactnavigation.org/docs/handling-safe-area/
  return (
    <View style={(styles.container, { paddingTop: insets.top - insets.top })}>
    
      {/* Static profile features */}
      <View style={[{ backgroundColor: colors.white }, styles.shadow2]}>
        <View style={[styles.profileBar]}>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginBottom: "-15%",
              marginTop: "10%",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: colors.gray }}>anon</Text>
              <Switch
                value={privacy}
                onValueChange={(val) => {
                  const config = {
                    headers: {
                     
                      "X-Arqive-Api-Key":
                        "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
                    },
                  };
                  let data = {
                    is_profile_private: val,
                  };
                  axios
                    .patch(
                      `https://api.thearqive.com/api/auth/users/${props.id}/`,
                      data,
                      config
                    )
                    .then((res) => {
                      // console.log(res.data.is_profile_private);
                      setprivacy(res.data.is_profile_private);
                      props.reloadUser(props.user);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
                activeText={"on"}
                inActiveText={"off"}
                backgroundActive={colors.purple}
                backgroundInActive={colors.border}
              />
            </View>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              style={styles.profileImage}
              source={
                props.profileImage !== null
                  ? { uri: props.profileImage }
                  : PROFILE_PIC
              }
            />
            <TouchableWithoutFeedback
              onPress={() => props.navigation.navigate("EditProfileModal")}
            >
              <FontAwesome5
                style={{ marginTop: -25, marginLeft: 96, marginBottom: 25 }}
                name="pencil-alt"
                size={24}
                color={colors.purple}
              />
            </TouchableWithoutFeedback>
          </View>
          <View style={[styles.bioContainter]}>
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: colors.gray }}
            >
              bio
            </Text>
            <Text style={{ fontSize: 14, color: colors.purple }}>
              {props.bio}
            </Text>
          </View>
        </View>

        <View style={[styles.storyButtons]}>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
            <View
              style={
                selectedButton === 0
                  ? styles.storySelectedButton
                  : styles.storyUnselectedButton
              }
            >
              <Text
                style={
                  selectedButton === 0
                    ? styles.selectedTextStyle
                    : styles.textStyle
                }
              >
                all stories
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
            <View
              style={
                selectedButton === 1
                  ? styles.storySelectedButton
                  : styles.storyUnselectedButton
              }
            >
              <Text
                style={
                  selectedButton === 1
                    ? styles.selectedTextStyle
                    : styles.textStyle
                }
              >
                personal
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
            <View
              style={
                selectedButton === 2
                  ? styles.storySelectedButton
                  : styles.storyUnselectedButton
              }
            >
              <Text
                style={
                  selectedButton === 2
                    ? styles.selectedTextStyle
                    : styles.textStyle
                }
              >
                historical
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
            <View
              style={
                selectedButton === 3
                  ? styles.storySelectedButton
                  : styles.storyUnselectedButton
              }
            >
              <Text
                style={
                  selectedButton === 3
                    ? styles.selectedTextStyle
                    : styles.textStyle
                }
              >
                resource
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>

      {/* Scrollable content */}
      </View>
        <View style={styles.storyList}>
          {renderStoriesByType()}
        </View>

    </View>
  );
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  profileBar: {
    width: Dimensions.get("window").width,
    paddingLeft: "10%",
    paddingRight: "10%",
    backgroundColor: "white",
  },
  nicknameContainer: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  nicknameText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "grey",
  },
  profileImageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    borderRadius: 200,
    resizeMode: "center",
    height: 128,
    width: 128,
  },
  bioContainter: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  storyButtons: {
    width: Dimensions.get("window").width,
    backgroundColor: "white",
    borderTopWidth: 0,
    borderTopColor: "#eae6e5",
    paddingTop: 15,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  storySelectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: 15,
  },
  storyUnselectedButton: {
    alignItems: "center",
    flexGrow: 1,
  },
  storyList: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    width: Dimensions.get("window").width,
    height: "100%",
  },
  navButton: {
    flexGrow: 1,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 10,
    width: "80%",
  },
  requiredText: {
    color: "red",
  },
  textStyle: {
    fontSize: 16,
    color: colors.purple,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: colors.purple,
    fontWeight: "bold",
  },
});

const mapStateToProps = (state) => {
  // console.log("username:", state.authReducer.username);
  return {
    isLoading: state.storyReducer.isLoading,
    stories: state.authReducer.user.userStories,
    error: state.storyReducer.error,
    user: state.profileReducer.profileData.user.username,
    bio: state.authReducer.user.bio,
    profileImage: state.authReducer.user.profileurl,
    is_anonymous_active: state.authReducer.user.is_profile_private,
    id: state.authReducer.user.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
