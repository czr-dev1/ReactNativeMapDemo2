import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Constants } from 'expo';
import { Card } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import { Switch } from "react-native-switch";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import axios from "axios";

import makeStoryPrivate from "../redux/actions/storyActions";
import Text from "./text";
import colors from "../config/colors";

const Item = ({ item }, props) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  const [temp, setTemp] = useState(item.is_anonymous_pin);
  return (
    <TouchableWithoutFeedback
      key={item.id}
      style={{ padding: 12 }}
      onPress={() => {
        navigation.navigate("Story", {
          title: item.title,
          description: item.description,
          id: item.id,
        });
      }}
    >
      <View style={{ padding: 12}} >
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
          <View style={{ flexDirection: "column", flexShrink: 1, padding: 10 }}>
            <Text
              style={{
                flexShrink: 1,
                paddingBottom: 10,
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              {item.title.toLowerCase()}
            </Text>
            <Text style={{ color: "#919191" }}>
              posted on {item.startDate}
            </Text>
          </View>
          <View
            style={{
              padding: 4,
              borderColor: "#ddd",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              padding: 15,
            }}
          >
            <Text style={{ color: colors.gray }}>anon</Text>
            <Switch
              value={temp}
              activeText={"on"}
              inActiveText={"off"}
              backgroundActive={colors.purple}
              backgroundInActive={colors.border}
              onValueChange={(value) => {
                setTemp(value);
                const config = {
                  headers: {
                    "Content-Type": "application/json",
                    "X-Arqive-Api-Key":
                      "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
                  },
                };
                let data = {
                  is_anonymous_pin: value,
                };
                axios.patch(
                  `https://api.thearqive.com/api/pins/${item.id}/`,
                  data,
                  config
                );
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ConnectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);
const BookMark = ({ item }) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  // For those in the future, note pinId != id in this case, it was the source of many a headache
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate("Story", {
          title: item.title,
          description: item.description,
          id: item.pinId,
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
            <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 25 }}>
              {item.title}
            </Text>
            <Text style={{ fontSize: 12 }}>posted on {item.postDate}</Text>
          </View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              padding: 12,
            }}
          >
            <FontAwesome name="bookmark" size={24} color={colors.purple} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

function StoryList(props) {
  const renderItem = ({ item }) => {
    const backgroundColor = "gray";
    return <ConnectedItem item={item} style={{ backgroundColor }} />;
  };

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
          paddingBottom: "100%",
        }}
      >
        <Text style={{}}>nothing to show here yet</Text>
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
        renderItem={props.isBookMark ? renderBookMark : renderItem}
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
  switch: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 14,
    borderColor: "#ddd",
    padding: 4,
  },
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    error: state.storyReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeStoryPrivate: (id) => dispatch(makeStoryPrivate(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
