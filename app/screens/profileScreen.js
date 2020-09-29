import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import colors from '../config/colors';

function ProfileScreen(props) {
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

  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World</Text>
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

export default ProfileScreen;
