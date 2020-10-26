import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Platform, ActivityIndicator, StatusBar,
  Dimensions, TouchableHighlight, PixelRatio, View, Button, TextInput,
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


import colors from '../config/colors';

function StoryPostScreen(props) {
  // These are here so you know what to include in your post request
  const [address, setAddress] = useState('');
  const [anonradius, setAnonRadius] = useState(1)
  const [category, setCategory] = useState(1);
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [endDate, setEndDate] = useState({});
  const [isAnonymous, setAnonymous] = useState(true);
  const [lastEditDate, setLastEditDate] = useState({});
  const [lastPersonEdit, setLastPersonEdit] = useState('');
  const [location, setLocation] = useState({}); //make sure to split to latitude and longitude
  const [locality, setLocality] = useState('');
  const [owner, setOwner] = useState('');
  const [postCode, setPostCode] = useState('');
  const [postDate, setPostDate] = useState('');
  const [region, setRegion] = useState('');
  const [startDate, setStartDate] = useState({});
  const [title, setTitle] = useState('');

  const [gotLocation, setGotLocation] = useState(false);



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

  const submitNewStory = async () => {
    const latSplit = location.latitude.toString().split('.');
    const lonSplit = location.longitude.toString().split('.');
    const latitude = latSplit[0] + '.' + latSplit[1].substring(0,6);
    const longitude = lonSplit[0] + '.' + lonSplit[1].substring(0,6);

    const pin = {
      address: address,
      anonradius: anonradius,
      category: category,
      country: country,
      description: description,
      endDate: new Date(),
      is_anonymous_pin: true,
      lastEditDate: new Date(),
      lastPersonEdit: null,
      latitude: latitude,
      longitude: longitude,
      locality: locality,
      owner: owner,
      postCode: postCode,
      postDate: new Date(),
      region: region,
      startDate: new Date(),
      title: title
    }
    console.log(pin);

    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    axios.post('http://www.globaltraqsdev.com/api/pins/', pin, config)
    .then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    });

    try{
      let response = await fetch('http://www.globaltraqsdev.com/api/pins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(pin)
      });
      let json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <TouchableWithoutFeedback>
    <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
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

        <Button
          disabled={gotLocation ? false : true}
          title="Submit"
          onPress={(e) => {submitNewStory();}}/>

    </SafeAreaView>
    </TouchableWithoutFeedback>
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
