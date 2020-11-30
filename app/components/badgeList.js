import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback,
  Dimensions, View, Image, StatusBar, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

//icons
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

function BadgeList(props) {
  const badges = [
    "airline-seat-flat",
    "adjust",
    "airplanemode-active",
    "airport-shuttle",
    "all-inclusive",
    "beach-access",
    "airplay",
  ]

  return (
    <FlatList
      contentContainterStyle={styles.grid}
      numColumns={3}
      data={badges}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        console.log(item);
        return (
          <View>
            <MaterialIcons style={styles.item} name={item} size={48} color="black" />
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  conatiner: {
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
    paddingLeft: Dimensions.get('window').width / 9,
    paddingRight: Dimensions.get('window').width / 9,
    paddingBottom: Dimensions.get('window').width / 4,
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
  flatWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
  },
  grid: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default BadgeList;
