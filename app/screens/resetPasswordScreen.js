import React, { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

function ResetPasswordScreen() {
  const navigation = useNavigation();

  const [newPassword, setNewPassword] = useState({
    password: '',
    confirmPassword: '',
    isValidPassword: true,
    isValidConfirmPassword: true
  });

  const setPassword = (val) => {
		let len = val.length;
		if (
			((len < 8 || len >= 8) && val.search(/[!@#$%^&*_+()?]/) === -1) ||
			((len < 8 || len >= 8) && val.search(/[A-Z]/) === -1) ||
			((len < 8 || len >= 8) && val.search(/\d/) === -1)
		) {
			setUser({
				...user,
				password: val,
				isValidPassword: false,
			});
		} else if (len < 8) {
			setUser({
				...user,
				password: val,
				isValidPassword: false,
			});
		} else {
			setUser({
				...user,
				password: val,
				isValidPassword: true,
			});
		}
	};

	const setConfirmPassword = (val) => {
		if (val !== user.password) {
			setUser({
				...user,
				confirmPassword: val,
				isValidConfirmPassword: false,
			});
		} else {
			setUser({
				...user,
				confirmPassword: val,
				isValidConfirmPassword: true,
			});
		}
	};

  return (
		<SafeAreaView style={styles.container}>
			<Image style={styles.logo} source={require('../assets/color_icon.png')} />
			<Text style={styles.title}>reset password</Text>

			<View style={styles.message}>
				<Text style={{ fontSize: 18, color: 'grey' }}>
					*passwords must contain at least eight characters including at least 1 uppercase letter, 1 number, and 1 special character
				</Text>
			</View>

			<Text style={{ marginTop: 10, color: 'grey' }}>please input your new password:</Text>
			<View style={styles.input}>
				<TextInput
					value={newPassword.password}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => setPassword(val)}
				/>
			</View>

			<Text style={{ marginTop: 10, color: 'grey' }}>please confirm your new password:</Text>
			<View style={styles.input}>
				<TextInput
					value={newPassword.password}
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => setConfirmPassword(val)}
				/>
			</View>

			<View style={styles.submitBtn}>
				<Button title='reset password' color='white' onPress={() => sendResetLink()} />
        <TouchableWithoutFeedback
          onPress={() => {
            sendResetLink()
          }}
        >
          <Text style={{color: 'white', alignSelf: 'center'}}>reset password</Text>
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
		color: 'grey',
		width: '85%',
		height: 50,
		paddingLeft: 15,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: '#4D4185',
		marginTop: 10,
		marginBottom: 10,
	},
	message: {
		marginTop: 30,
    marginBottom: 30,
		width: '70%',
	},
	text: {
		fontSize: 14,
		color: '#2380B0',
		paddingTop: 130,
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

export default ResetPasswordScreen;
