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
  View,
  Button,
  TextInput
} from 'react-native';
import * as Location from 'expo-location';
import { Formik } from 'formik';

import colors from '../config/colors';

function StoryPostScreen(props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapStyle}>
        <Formik style={styles.mapStyle}
          initialValues={
            { title: '',
            description: '',
            latitude: '',
            longitude: '',
            category: '',
            address: '',
            locality: '',
            region: '',
            country: '',
            postCode: '',
            startDate: '',
            endDate: '',
          }}
          onSubmit={(values, actions) => {
            actions.resetForm();
            console.log(values);
          }}>

          {(form) => (
            <View>
              <Text>Title</Text>
              <TextInput style={styles.input}
                placeholder="Review Details"
                onChangeText={form.handleChange('title')}
                value={form.values.title} />
              <Text>Description</Text>
              <TextInput style={styles.input}
                placeholder="Description"
                multiline
                onChangeText={form.handleChange('description')}
                value={form.values.description} />
              <Text>Category</Text>
              <TextInput style={styles.input}
                placeholder="Review Details"
                onChangeText={form.handleChange('title')}
                value={form.values.title} />
              <Button color='dodgerblue' title="Submit" onPress={form.handleSubmit} />
            </View>
          )}

        </Formik>
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 10
  }
})

export default StoryPostScreen;
