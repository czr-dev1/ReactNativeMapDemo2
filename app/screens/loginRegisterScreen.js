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
			<Image style={styles.logo} source={require('../assets/white_color_logo_highres.png')} />
			<View style={styles.loginBtn}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					<Text
						style={{
							color: 'white',
							alignSelf: 'center',
							fontFamily: 'Arial',
							fontSize: 24,
						}}
					>
						log in
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.registerBtn}>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					<Text
						style={{
							color: 'white',
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.black,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		marginTop: 200,
		marginBottom: 50,
		width: '90%',
		height: 100,
	},
	text: {
		fontSize: 14,
		color: '#008BBC',
	},
	loginBtn: {
		backgroundColor: colors.purple,
		justifyContent: 'center',
		marginTop: 75,
		padding: 10,
		borderRadius: 15,
		width: '80%',
		height: 60,
	},
	registerBtn: {
		backgroundColor: colors.purple,
		justifyContent: 'center',
		marginTop: 30,
		marginBottom: 200,
		padding: 10,
		borderRadius: 15,
		width: '80%',
		height: 60,
	},
});

export default LoginRegisterOption;
