import React, { useEffect, useState } from "react";
import {
  BackHandler,
  Keyboard,
  StyleSheet,
  View,
  TouchableHighlight,
  Icon
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";
import PlainStoryList from "../components/plainStoryList";
import { Button, Right } from "native-base";

function StorySearchScreen(props) {

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState(props.stories);

  const searchFilterFunction = (text) => {
    if(text) {
      const newData = props.stories.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(props.stories)
      setSearch(text);
    }
  }

  const goBackToMap = () => {
    Keyboard.dismiss();
    props.navigation.navigate('Map');
  }

  return (
    <View style={{backgroundColor: colors.background, height: '100%'}}>
    <View style={{flexDirection: "row", backgroundColor: colors.purple}}>
    <Entypo
          onPress={() => {
            goBackToMap();
          }}
          style={{ padding: 18 }}
          name="arrow-left"
          size={28}
          color={colors.white}
        />
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
          width: "83%",
          // alignSelf: "flex-end"
        }}
        inputStyle={{ fontSize: 18 }}
        placeholder="search"
        placeholderTextColor={colors.purple}
        value={search}
      />
    </View>
      <PlainStoryList stories={filteredDataSource} />
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    stories: state.storyReducer.storyList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  }
};

export default connect(mapStateToProps)(StorySearchScreen);
