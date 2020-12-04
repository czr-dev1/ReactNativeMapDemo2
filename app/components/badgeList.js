import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback,
  Dimensions, View, Image, StatusBar, Button, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

//icons
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function BadgeList(props) {
  const badges = [
    "air-horn",
    "air-purifier",
    "airballoon",
    "album",
    "alien",
    "all-inclusive",
    "anchor",
  ]

  const createAlert = () => {
    Alert.alert(
     "Alert Title",
     "My Alert Msg",
     [
       {
         text: "Cancel",
         onPress: () => console.log("Cancel Pressed"),
         style: "cancel"
       },
       { text: "OK", onPress: () => console.log("OK Pressed") }
     ],
     { cancelable: false }
   )
  }

  return (
    <FlatList
      contentContainterStyle={styles.grid}
      numColumns={3}
      data={badges}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        return (
          <View style={styles.item}>
            <MaterialCommunityIcons name={item} size={24} color="black" />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  topIcon: {
    alignSelf: 'center',
    alignItems: 'center',
    padding: 30
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width / 3,
    height: Dimensions.get('window').width / 3,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  flatWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    backgroundColor: '#eae6e5',
  },
  grid: {
    flex: 1,
  }
})

export default BadgeList;
