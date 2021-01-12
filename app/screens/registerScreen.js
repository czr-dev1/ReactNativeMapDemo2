import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/auth';
import colors from '../config/colors';

function RegisterScreen(props) {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const newUser = {
		username: username,
		email: email,
		password: password,
		confirmPassword: confirmPassword,
	};

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text>Username</Text>
			<TextInput
				name={username}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={(val) => setUsername(val)}
			/>
			<Text>Email</Text>
			<TextInput
				name={email}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={(val) => setEmail(val)}
			/>
			<Text>Password</Text>
			<TextInput
				name={password}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={(val) => setPassword(val)}
				secureTextEntry={true}
			/>
			<Text>Confirm Password</Text>
			<TextInput
				name={confirmPassword}
				style={styles.input}
				autoCapitalize="none"
				autoCorrect={false}
				onChangeText={(val) => setConfirmPassword(val)}
				secureTextEntry={true}
			/>

			<Button
				title="Register"
				style={styles.submitBtn}
				onPress={() => {
					dispatch(register(newUser));
				}}
			/>

			<Text style={styles.text}>Already have an account?</Text>
			<TouchableOpacity
				onPress={() => {
					props.navigation.navigate('Login');
				}}
			>
				<Text style={styles.userBtn}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity
				onPress={() => {
					props.navigation.navigate('Map');
				}}
			>
				<Text style={styles.text}>Continue as Anonymous</Text>
			</TouchableOpacity>
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
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 6,
		padding: 10,
		fontSize: 10,
		width: '80%',
		marginBottom: 10,
	},
	text: {
		fontSize: 14,
		marginTop: 15,
	},
	userBtn: {
		fontSize: 16,
		color: 'purple',
	},
});

export default RegisterScreen;
