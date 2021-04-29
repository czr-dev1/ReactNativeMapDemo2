import React, { useEffect } from 'react';
import {
	Image,
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

// Redux
import { connect, useDispatch } from "react-redux";
import { setExpoPushToken } from "../redux/actions/authActions";

import Text from "../components/text";
import colors from "../config/colors";

function LoginRegisterOption() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	useEffect(() => {
		registerForPushNotificationsAsync()
		.then((token) => {
			dispatch(setExpoPushToken(token));
		});
	}, []);

	async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== 'granted') {
				alert('Failed to get push token for Push Notifications!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			// console.log(token);
		} else {
			alert('Must use physical device for Push Notifications!');
		}
		return token;
	};

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<View style={styles.logo}>
				<Image 
					style={{ height: 110, width: 350, marginBottom: 75 }} 
					source={require('../assets/thearqive_all_white_logo_lowhres.png')} />
			</View>

			<View style={styles.loginContainer}>
				<View style={styles.loginBtn}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Login');
						}}
					>
						<Text
							style={{
								color: colors.purple,
								alignSelf: 'center',
								fontFamily: 'Arial',
								fontSize: 24,
							}}
						>
							log in
						</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.registerContainer}>
				<View style={styles.registerBtn}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Register');
						}}
					>
						<Text 
							style={{
								color: colors.purple,
								alignSelf: 'center',
								fontFamily: 'Arial',
								fontSize: 24,
							}}
						>
							register
						</Text>
					</TouchableOpacity>
				</View>
				<View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Map');
						}}
					>
						<Text style={styles.text}> continue </Text>
					</TouchableOpacity>
			</View>
		</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.purple,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		flex: 1.5,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
	},
	loginContainer: {
		flex: 0.5,
		justifyContent: 'flex-end',
		alignItems: 'center',
		width: '100%',
	},
	loginBtn: {
		backgroundColor: 'white',
		justifyContent: 'center',
		borderRadius: 15,
		marginBottom: 10,
		height: 60,
		width: '80%',
	},
	registerContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
	},
	registerBtn: {
		backgroundColor: 'white',
		justifyContent: 'center',
		borderRadius: 15,
		marginTop: 10,
		height: 60,
		width: '80%',
	},
	text: {
		fontSize: 14,
		color: '#008BBC',
		marginBottom: 50,
	},
});

export default LoginRegisterOption;