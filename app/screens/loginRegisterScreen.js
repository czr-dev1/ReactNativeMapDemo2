import React from 'react';
import {
	Button,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

function LoginRegisterOption() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/color_splash.png')} />
			<View style={styles.loginBtn}>
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					<Text style={{color: 'white', alignSelf: 'center'}}>log in</Text>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.registerBtn}>
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					<Text style={{color: 'white', alignSelf: 'center'}}>register</Text>
				</TouchableWithoutFeedback>
			</View>
			<View>
				<TouchableWithoutFeedback
					onPress={() => {
						navigation.navigate('Map');
					}}
				>
					<Text style={styles.text}>continue</Text>
				</TouchableWithoutFeedback>
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
	},
	logo: {
		marginTop: 175,
		width: '80%',
		height: 100,
	},
	text: {
		fontSize: 14,
		marginTop: 60,
		color: '#2380B0',
	},
	loginBtn: {
		fontSize: 16,
		width: '85%',
		marginTop: 50,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#4D4185',
	},
	registerBtn: {
		fontSize: 16,
		width: '85%',
		marginTop: 30,
		marginBottom: 250,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#4D4185',
	},
});

export default LoginRegisterOption;
