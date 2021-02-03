import React from 'react';
import { 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text 
} from 'react-native';

import colors from '../config/colors';

function SplashScreen() {
  <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
		<Image source={require('../assets/thearqive_logo.png')} />

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