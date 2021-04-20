import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-switch";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { makeStoryPrivate } from "../redux/actions/storyActions";

import colors from "../config/colors";

const Item = ({ item }, props) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  const [temp, setTemp] = useState(false);
  console.log(item);
  console.log(props);
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate("Story", {
          title: item.title,
          description: item.description,
          id: item.id,
        });
      }}
    >
      <Card containerStyle={{ borderRadius: 14 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", flexShrink: 1 }}>
            <Text style={{ flexShrink: 1 }}>{item.title.toLowerCase()}</Text>
            <Text style={{ color: "#919191" }}>posted on {item.postDate}</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 14,
              padding: 4,
              borderColor: "#ddd",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#919191" }}>anonymous</Text>
            <Switch
              value={temp}
              activeText={"✔"}
              inActiveText={"✖"}
              backgroundActive={"#AAAAAA"}
              backgroundInActive={"#AAAAAA"}
              onValueChange={(value) => setTemp(value)}
            />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const BookMark = ({ item }) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  console.log(item);
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate("Story", {
          title: item.title,
          description: item.description,
          id: item.id,
        });
      }}
    >
      <Card containerStyle={{ borderRadius: 14 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "column", flexShrink: 1 }}>
            <Text style={{ flexShrink: 1 }}>{item.title.toLowerCase()}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

function StoryList(props) {
  const renderBookMark = ({ item }) => {
    const backgroundColor = "white";
    return <BookMark item={item} props={props} style={{ backgroundColor }} />;
  };

  const listEmptyComponent = () => {
    return (
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 20,
        }}
      >
        <Text>nothing to show here yet</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        ListEmptyComponent={listEmptyComponent}
        data={props.stories}
        style={styles.cardContainer}
        extraData={props}
        renderItem={renderBookMark}
        keyExtractor={(item) => "" + item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get("window").width,
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    error: state.storyReducer.error,
  };
};

export default connect(mapStateToProps)(StoryList);
