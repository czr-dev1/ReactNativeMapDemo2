import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';

import colors from '../config/colors';

function SplashScreen() {
  console.log("in splash screen");
  <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
		<Image source={require('../assets/02_thearqive_loading_screen_.gif')} />

    <Text style={styles.container}>loading...</Text>
	</SafeAreaView>;

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
	}
});

export default SplashScreen;
