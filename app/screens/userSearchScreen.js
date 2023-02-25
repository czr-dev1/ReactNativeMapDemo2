import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Card } from "react-native-elements";
import { connect } from "react-redux";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { SearchBar } from "react-native-elements";

//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";


import Text from "../components/text";
import colors from "../config/colors";
import profPic from "../assets/profile_blank.png";

//Custom story component
import StoryList from "../components/storyList";

function BookmarkUserScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const config = {
      headers: {
        'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
      },
    };

    //username can be changed if you want
    axios
      .get(`https://api.thearqive.com/api/profile/users/`, config)
      .then((res) => {
        console.log(res);
        let temp = res.data.reverse();
        temp = temp.filter(item => !item.is_profile_private);
        setData(temp);
        setFilteredDataSource(temp);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const searchFilterFunction = (text) => {
    if(text) {
      const newData = data.filter((item) => {
        const itemData = item.username ? item.username.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(data)
      setSearch(text);
    }
  }

  /*const renderUsers = () => {
    {setFilteredDataSource.map((item, i) => {
      let temp = item.bio;
      if (temp.length > 42) {
        temp = temp.substring(0, 42) + "...";
      }
      return (
        <TouchableWithoutFeedback
          key={i}
          onPress={() => {
            props.navigation.navigate("UserProfileModal", {
              user: item.username,
            });
          }}
        >
          <Card containerStyle={[{ borderRadius: 25, marginBottom: 10, borderWidth: 0 }, styles.shadow2]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <Image
                  style={{ borderRadius: 200, height: 48, width: 48 }}
                  source={
                    item.profileurl !== null
                      ? { uri: item.profileurl }
                      : profPic
                  }
                />
                <View
                  style={{ flexDirection: "column", paddingLeft: 12 }}
                >
                  <Text style={{ fontSize: 18 }}>{item.username}</Text>
                  <Text style={{}}>{temp}</Text>
                </View>
              </View>
              <View>
                <FontAwesome
                  name="bookmark"
                  size={24}
                  color={colors.white}
                />
              </View>
            </View>
          </Card>
        </TouchableWithoutFeedback>
      );
    })}
  }*/

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 330}} />;
  } else {
    return (
      <View style={{ backgroundColor: colors.background, height: "100%" }}>
        <SearchBar
          round
          searchIcon={{ size: 24 }}
          onChangeText={(text) => {
            searchFilterFunction(text);
          }}
          onClear={(text) => {
            searchFilterFunction("");
            Keyboard.dismiss();
          }}
          lightTheme={true}
          containerStyle={{
            backgroundColor: colors.purple,
            borderTopColor: "transparent",
            borderBottomColor: "transparent",
            width: "100%",
          }}
          inputContainerStyle={{
            backgroundColor: colors.white,
            borderRadius: 50,
            borderWidth: 0,
          }}
          inputStyle={{ fontSize: 18 }}
          placeholder="search"
          placeholderTextColor={colors.purple}
          value={search}
        />
        <ScrollView style={{}}>
          {filteredDataSource.map((item, i) => {
            let temp = item.bio;
            if (temp.length > 42) {
              temp = temp.substring(0, 42) + "...";
            }
            return (
              <TouchableWithoutFeedback
                key={i}
                onPress={() => {
                  props.navigation.navigate("UserProfileModal", {
                    user: item.username,
                  });
                }}
              >
                <Card containerStyle={[{ borderRadius: 25, marginBottom: 10, borderWidth: 0 }, styles.shadow2]}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{ borderRadius: 200, height: 48, width: 48 }}
                        source={
                          item.profileurl !== null
                            ? { uri: item.profileurl }
                            : profPic
                        }
                      />
                      <View
                        style={{ flexDirection: "column", paddingLeft: 12 }}
                      >
                        <Text style={{ fontSize: 18 }}>{item.username}</Text>
                        <Text style={{}}>{temp}</Text>
                      </View>
                    </View>
                    <View>
                      <FontAwesome
                        name="bookmark"
                        size={24}
                        color={colors.white}
                      />
                    </View>
                  </View>
                </Card>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  profileStoryButtons: {
    width: Dimensions.get("window").width,
    borderTopWidth: 1,
    borderTopColor: "#eae6e5",
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileStorySelectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: "black",
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
    backgroundColor: "#eae6e5",
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
});

const mapStateToProps = (state) => {
  return {

  };
};

export default connect(mapStateToProps)(BookmarkUserScreen);
