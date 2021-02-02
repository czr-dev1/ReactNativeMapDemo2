import React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

function LoginRegisterOption() {
	const navigation = useNavigation();

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/thearqive_logo.png')} />
			<View style={styles.loginBtn}>
				<Button
					title='log in'
					color='white'
					onPress={() => {
						navigation.navigate('Login');
					}}
				/>
			</View>
			<View style={styles.registerBtn}>
				<Button
					title='register'
					color='white'
					onPress={() => {
						navigation.navigate('Register');
					}}
				/>
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
		color: '#A9A9A9',
	},
	loginBtn: {
		fontSize: 16,
		width: '85%',
		marginTop: 50,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#DCDCDC',
	},
	registerBtn: {
		fontSize: 16,
		width: '85%',
		marginTop: 30,
		marginBottom: 250,
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#DCDCDC',
	},
});

export default LoginRegisterOption;
