import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback,
  Dimensions, View, Image, StatusBar, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';

//icons
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

function BadgeScreen(props) {
  useEffect(() => {

  }, []);

  const badges = [
    "airline-seat-flat",
    "adjust",
    "airplanemode-active",
    "airport-shuttle",
    "all-inclusive",
    "beach-access"
  ]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.item}>
        <Feather name="target" size={48} color="black" />
      </View>
      <View style={styles.flatWrapper}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
  },
  item: {
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: 2,
    padding: 30,
  },
  flatWrapper: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  grid: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    borderWidth: 2
  }
})

export default BadgeScreen;
