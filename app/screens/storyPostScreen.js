import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Platform, ActivityIndicator, SafeAreaView, StatusBar,
  Dimensions, TouchableHighlight, PixelRatio, View, Button, TextInput,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';

import colors from '../config/colors';

function StoryPostScreen(props) {
  const [gotLocation, setGotLocation] = useState(false);
  const [location, setLocation] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [country, setCountry] = useState('');
  const [postCode, setPostCode] = useState('');
  const [region, setRegion] = useState('');
  const [category, setCategory] = useState(0);
  const [startDate, setStartDate] = useState({});
  const [endDate, setEndDate] = useState({});


  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if( status !== 'granted' ) {
      //handle error here
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude
    });
    setGotLocation(true);
    if(gotLocation) {
      console.log(location);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text>Address</Text>
        <TextInput
          name="address"
          style={styles.input}
          onChangeText={val => {setAddress(val)}}
        />
        <Text>Locality</Text>
        <TextInput
          name="locality"
          style={styles.input}
          onChangeText={val => {setLocality(val)}}
        />
        <Text>Region</Text>
        <TextInput
          name="region"
          style={styles.input}
          onChangeText={val => {setRegion(val)}}
        />
        <Text>Country</Text>
        <TextInput
          name="country"
          style={styles.input}
          onChangeText={val => {setCountry(val)}}
        />
        <Text>Postal Code</Text>
        <TextInput
          name="postcode"
          style={styles.input}
          onChangeText={val => {setPostCode(val)}}
        />
        <Text>Title</Text>
        {title === '' ?
          <Text style={styles.requiredText}>* Please enter a story title </Text>
          :
          null
        }
        <TextInput
          name="title"
          style={styles.input}
          onChangeText={val => {setTitle(val)}}
        />
        <Text>Category</Text>
        <TextInput
          name=""
          style={styles.input}
          onChangeText={val => {setCategory(val)}}
        />
        <Text>Description</Text>
        {description === '' ?
          <Text style={styles.requiredText}>* Please enter a story description </Text>
          :
          null
        }
        <TextInput
          multiline
          name=""
          style={styles.input}
          onChangeText={val => {setDescription(val)}}
        />

        <Button disabled={gotLocation ? false : true} title="Submit"/>
      </View>
      </TouchableWithoutFeedback>
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
    fontSize: 10,
    width: '80%'
  },
  requiredText: {
    color: 'red'
  }
})

export default StoryPostScreen;
