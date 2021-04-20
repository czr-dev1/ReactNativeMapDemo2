import React, { useState } from 'react';
import { 
	Alert,
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
	TextInput, 
	TouchableOpacity, 
  View, 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import useRemovalConfirm from '../components/profile/useRemovalConfirm';

import colors from '../config/colors';

function ForgotPasswordScreen() {
	const navigation = useNavigation();
	const { loginToggle } = useRemovalConfirm();

	const [email, setEmail] = useState('');
	const [showError, setShowError] = useState(true);

	const validateEmail = () => {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email.length > 0) {
			setShowError(false);
			// console.log('email validated');
		}
	};

	// Send password reset link if applicable
	const sendResetLink = () => {
		if (!showError) {
			axios.post('https://www.globaltraqsdev.com/api/password_reset/', { email: email })
			.then((response) => {
				loginToggle();
				setEmail('');
				emailSent();
			})
			.catch((error) => {
				loginToggle();
				setEmail('');
				emailFailed();
			});
		} else {
			loginToggle();
			setEmail('');
			emailFailed();
		}
	};

	const emailSent = () => {
		Alert.alert('', 'if valid, you should receive email shortly!', [
			{
				text: 'dismiss',
				onPress: () => navigation.navigate('Initial')
			}
		])
	};

	const emailFailed = () => {
		Alert.alert('', 'if valid, you should receive email shortly!', [
			{
				text: 'dismiss'
			}
		])
	};

  return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={require('../assets/color_icon.png')} />
			<Text style={styles.title}>forgot password</Text>

			<Text
				style={{
					fontSize: 16,
					marginTop: 95,
					color: colors.gray,
				}}
			>
				please intput your e-mail:
			</Text>
			<TextInput
				style={styles.input}
				value={email}
				autoCapitalize='none'
				autoCorrect={false}
				onBlur={validateEmail}
				onChangeText={(val) => setEmail(val)}
			/>

			<View style={styles.submitBtn}>
				<TouchableOpacity
					onPress={() => {
						sendResetLink();
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
						forgot password
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
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
	},
	logo: {
		marginTop: 20,
		marginBottom: 10,
		height: 100,
		width: 100,
	},
	title: {
		fontFamily: 'Arial',
		fontSize: 24,
		color: '#4D4185',
		marginBottom: 30,
	},
	input: {
		color: colors.border,
		paddingLeft: 15,
		borderWidth: 2,
		borderColor: colors.border,
		marginTop: 10,
		marginBottom: 10,
		width: '80%',
		height: 50,
	},
	text: {
		fontSize: 14,
		color: '#008BBC',
		marginTop: 260,
	},
	submitBtn: {
		backgroundColor: '#4D4185',
		justifyContent: 'center',
		borderRadius: 15,
		marginTop: 50,
		marginBottom: 60,
		width: '80%',
		height: 60,
	},
});

export default ForgotPasswordScreen;
