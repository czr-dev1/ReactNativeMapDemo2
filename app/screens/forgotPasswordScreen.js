import React, { useState } from 'react';
import { 
	Alert, 
  Button, 
  Image, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
	TextInput, 
	TouchableWithoutFeedback, 
  View, 
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

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
			console.log('email validated');
		}
	};

	// Searches is email exists
	const emailExists = (email) => {
		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			},
		};

		axios.get(`https://www.globaltraqsdev.com/profile/users?search=${username}`, config)
		.then((response) => {
			loginToggle();
			setEmail('');
			navToResetPassword();
		})
		.catch((error) => {
			loginToggle();
			setEmail('');
			enterValidEmail();
		})
	};

	const navToResetPassword = () => {
		Alert.alert('', 'you are being redirected to reset your password!', [
			{
				text: 'ok',
				onPress: () => navigation.navigate('ResetPassword')
			}
		])
	};

	const enterValidEmail =() => {
		Alert.alert('', 'please enter a valid email!', [
			{
				text: 'dismiss'
			}
		])
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
		Alert.alert('', 'email has been sent!', [
			{
				text: 'dismiss',
				onPress: () => navigation.navigate('Login')
			}
		])
	};

	const emailFailed = () => {
		Alert.alert('', 'please enter a valid email', [
			{
				text: 'dismiss'
			}
		])
	};

  return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={require('../assets/color_icon.png')} />
			<Text style={styles.title}>forgot password</Text>

			<Text style={{marginTop: 95, color: 'grey'}}>please intput your e-mail:</Text>
			<TextInput
				style={styles.input}
				value={email}
				autoCapitalize='none'
				autoCorrect={false}
				onBlur={validateEmail}
				onChangeText={(val) => setEmail(val)}
			/>

			<View style={styles.submitBtn}>
				<Button 
					title='forgot password' 
					color='white' 
					onPress={() => sendResetLink()} 
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
		marginTop: 20,
		marginBottom: 10,
		height: 100,
		width: 100,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#A9A9A9',
		marginBottom: 30,
	},
	input: {
		fontSize: 20,
		color: 'gray',
		width: '85%',
		height: 50,
		paddingLeft: 15,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: '#4D4185',
		marginTop: 10,
		marginBottom: 10,
	},
	text: {
		fontSize: 14,
		color: '#2380B0',
		paddingTop: 300,
	},
	submitBtn: {
		fontSize: 18,
		width: '85%',
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#4D4185',
		marginTop: 10,
		marginBottom: 60,
	},
});

export default ForgotPasswordScreen;