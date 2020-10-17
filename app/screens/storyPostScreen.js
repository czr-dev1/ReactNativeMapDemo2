import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  PixelRatio,
  View
} from 'react-native';
import * as Location from 'expo-location';

import colors from '../config/colors';

function StoryPostScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapStyle}>
        <Text> Address </Text>
        <Text> Locality </Text>
        <Text> Region </Text>
        <Text> Country </Text>
        <Text> Postal Code </Text>
        <Text> Title </Text>
        <Text> Category </Text>
        <Text> Description </Text>
        <Text> Start Date </Text>
        <Text> End Date </Text>

      </View>

      <View style={styles.navStyle}>
        <TouchableHighlight style={styles.navButton}>
          <Text style={{textAlign: 'center'}}>MapView</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.navButton} onPress={() => {
          props.navigation.navigate('Profile');}}>
          <Text style={{textAlign: 'center'}}>Post</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.navButton} onPress={() => {
          props.navigation.navigate('Profile');}}>
          <Text style={{textAlign: 'center'}}>Stories</Text>
        </TouchableHighlight>
      </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '95%'
  },
  navStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    width: Dimensions.get('window').width,
    height: '5%'
  },
  navButton: {
    flexGrow: 1,
    textAlign: 'center'
  }
})

export default StoryPostScreen;
