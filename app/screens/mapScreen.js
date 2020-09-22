import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  FatList,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import colors from '../config/colors';

function MapScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  },[])

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch('http://www.globaltraqsdev.com/api/pins', {
        method: 'GET',
        headers: {
          'X-Arqive-Api-Key': ''
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

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ?
        <ActivityIndicator /> : (
          <MapView style={styles.mapStyle}
            provider={PROVIDER_GOOGLE}>
            <Marker
              coordinate={{latitude: 33.9929408, longitude: -118.2277925}}
              title="test"
              description="test"/>
            {data.map((item, i) => {
              return (
                <Marker
                  key={i}
                  coordinate={{latitude: parseFloat(item.latitude), longitude: parseFloat(item.longitude)}}
                  title={item.title}
                  icon={require('../assets/personal_128x128.png')}
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
  }
})

export default MapScreen;
