import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableHighlight,
  PixelRatio,
  Alert
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { Marker, MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';

import colors from '../config/colors';

const PERSONAL_PIN = require('../assets/personal_128x128.png');
const HISTORICAL_PIN = require('../assets/historical_128x128.png');
const COMMUNITY_PIN = require('../assets/community_128x128.png');

function MapScreen(props) {
  const [gotLocation, setGotLocation] = useState(false);
  const [location, setLocation] = useState({
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const urlTemplate = 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  const urlTemplate = 'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png';
  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: .5,
    longitudeDelta: .5,
  };

  useEffect(() => {
    loadData();
    getLocation();
  },[])

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if( status !== 'granted' ) {
      //handle error here
    }

    let loc = await Location.getCurrentPositionAsync({});
    const { latitudeDelta, longitudeDelta } = location;
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta
    });
    setGotLocation(true);
    console.log(location);

  };

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch('http://www.globaltraqsdev.com/api/pins', {
        method: 'GET',
        headers: {
          'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1'
        }
      });
      let json = await response.json();
      //console.log(json);
      setData(json);
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }
  };

  const createThreeButtonAlert = () =>
    Alert.alert(
      "Alert Title",
      "My Alert Msg",
      [
        {
          text: "Ask me later",
          onPress: () => console.log("Ask me later pressed")
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  return (
    <SafeAreaView style={styles.container}>
      { ( isLoading && !gotLocation ) ?
        <ActivityIndicator style={styles.mapStyle} /> : (
          <MapView style={styles.mapStyle}
            provider={PROVIDER_DEFAULT}
            mapType={MAP_TYPES.NONE}
            initialRegion={location}
            rotateEnabled={false}
            clusterColor={'#FFA500'}
            clusterTextColor={'#000000'}
            maxZoomLevel={19}
            minZoomLevel={1}
            minZoom={0}
            maxZoom={17}
            minPoints={5}
            >
          <UrlTile
            urlTemplate={urlTemplate}
            shouldReplaceMapContent={true}
            maximumZ={19}
            minimumZ={0}
            maxZoomLevel={19}
            minZoomLevel={0}
            zIndex={1}/>
            {data.map((item, i) => {
              let pinType = '';
              switch (item.category) {
                case 1:
                  pinType = PERSONAL_PIN;
                  break;
                case 2:
                  pinType = COMMUNITY_PIN;
                  break;
                default:
                  pinType = HISTORICAL_PIN;
              }
              return (
                <Marker
                  key={i}
                  coordinate={{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}}
                  title={item.title}
                  image={pinType}
                  onPress={() => {
                    props.navigation.navigate('Story', {
                      title: item.title,
                      description: item.description
                    });}}
                  />)
            })}
          </MapView>
        )}
    </SafeAreaView>
  );
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
    height: '100%'
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

export default MapScreen;
