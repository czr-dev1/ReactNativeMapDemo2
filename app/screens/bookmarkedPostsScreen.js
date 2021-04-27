import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Dimensions,
  View,
  Image,
  StatusBar,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import axios from "axios";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
//Custom story component
import StoryList from "../components/storyList";
import { reloadUser } from "../redux/actions/auth";

function BookmarkedPostsScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const renderStoriesByType = () => {
    if (props.stories === undefined) {
      return <StoryList isBookMark={true} stories={props.stories} />;
    }

    switch (selectedButton) {
      case 1:
        return (
          <StoryList
            isBookMark={true}
            stories={props.stories.filter((item) => item.category === 1)}
          />
        );
      case 2:
        return (
          <StoryList
            isBookMark={true}
            stories={props.stories.filter((item) => item.category === 2)}
          />
        );
      case 3:
        return (
          <StoryList
            isBookMark={true}
            stories={props.stories.filter((item) => item.category === 3)}
          />
        );
      default:
        return <StoryList isBookMark={true} stories={props.stories} />;
    }
  };

  useEffect(() => {
    props.reloadUser(props.user);
  }, []);

  const loadProfile = async () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios
      .get(
        `https://globaltraqsdev.com/api/profile/users/?username=${props.user}`,
        config
      )
      .then((res) => {
        const filteredVals = res.data[0].filter((bookmark) => {
          return props.allStories.forEach((story) => {
            return story.id === bookmark.pinId;
          });
        });
        console.log("filtered:", filteredVals);
        setData(filteredVals);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return props.isLoading ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <View style={{ height: "100%" }}>
      <View style={styles.profileStoryButtons}>
        <TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
          <View
            style={
              selectedButton === 0
                ? styles.profileStorySelectedButton
                : styles.profileStoryUnselectedButton
            }
          >
            <Text style={styles.textStyle}>all</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
          <View
            style={
              selectedButton === 1
                ? styles.profileStorySelectedButton
                : styles.profileStoryUnselectedButton
            }
          >
            <Text style={styles.textStyle}>personal</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
          <View
            style={
              selectedButton === 2
                ? styles.profileStorySelectedButton
                : styles.profileStoryUnselectedButton
            }
          >
            <Text style={styles.textStyle}>historical</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
          <View
            style={
              selectedButton === 3
                ? styles.profileStorySelectedButton
                : styles.profileStoryUnselectedButton
            }
          >
            <Text style={styles.textStyle}>resource</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.storyList}>{renderStoriesByType()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  profileStoryButtons: {
    width: Dimensions.get("window").width,
    borderTopWidth: 0,
    borderTopColor: colors.purple,
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: colors.purple,
  },
  profileStorySelectedButton: {
    borderBottomWidth: 4,
    borderBottomColor: colors.orange,
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: "2%",
  },
  profileStoryUnselectedButton: {
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
    color: colors.white,
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  let filteredVals = [];
  state.authReducer.user.user_upvoted_stories.forEach((bookmark, i) => {
    state.storyReducer.storyList.some((story) => {
      if (bookmark.pinId === story.id) {
        story.pinId = story.id;
        filteredVals.push(story);
      }
      return bookmark.pinId === story.id;
    });
  });

  return {
    isLoading: state.storyReducer.isLoading,
    error: state.storyReducer.error,
    user: state.authReducer.user.username,
    stories: filteredVals,
    allStories: state.storyReducer.storyList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookmarkedPostsScreen);
