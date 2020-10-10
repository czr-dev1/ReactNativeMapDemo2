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

import colors from '../config/colors';

const PERSONAL_PIN = require('../assets/personal_128x128.png');
const HISTORICAL_PIN = require('../assets/historical_128x128.png');
const COMMUNITY_PIN = require('../assets/community_128x128.png');

function MapScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  //const urlTemplate = 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  const urlTemplate = 'https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png';
  const INITIAL_REGION = {
    latitude: 52.5,
    longitude: 19.2,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  };

  useEffect(() => {
    loadData();
  },[])

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
      console.log(json);
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
      {isLoading ?
        <ActivityIndicator style={styles.mapStyle} /> : (
          <MapView style={styles.mapStyle}
            provider={PROVIDER_DEFAULT}
            mapType={MAP_TYPES.NONE}
            initialRegion={INITIAL_REGION}
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

        <View style={styles.navStyle}>
          <TouchableHighlight style={styles.navButton}>
            <Text style={{textAlign: 'center'}}>MapView</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.navButton} onPress={() => {
            props.navigation.navigate('Profile');}}>
            <Text style={{textAlign: 'center'}}>Profile</Text>
          </TouchableHighlight>
        </View>
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

export default MapScreen;
