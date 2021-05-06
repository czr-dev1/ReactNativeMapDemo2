import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-switch";
import { FontAwesome5 } from "@expo/vector-icons";
import { connect } from "react-redux";
import { makeStoryPrivate } from "../redux/actions/storyActions";

import Text from "./text";

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
          id: item.id,
        });
      }}
    >
      <View style={{ margin: 12 }}>
        <View
          style={{
            backgroundColor:
              item.category === 1
                ? colors.personal
                : item.category === 2
                ? colors.community
                : colors.historical,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 15,
          }}
        ></View>
        <View
          style={[{
            backgroundColor: "white",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 5,
          }, styles.shadow2]}
        >
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              padding: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12 }}>posted on {item.startDate}</Text>
          </View>
        </View>
      </View>
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
