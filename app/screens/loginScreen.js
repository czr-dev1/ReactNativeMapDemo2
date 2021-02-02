import React, { useState } from 'react';
import { 
  Button, 
  SafeAreaView, 
  StyleSheet, 
  Text, 
  TextInput 
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';

import colors from '../config/colors';

function LoginScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const user = {
		username: username,
		password: password,
	};

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Text>Username</Text>
      <TextInput 
        value={username} 
        style={styles.input} 
        onChangeText={(val) => setUsername(val)} 
      />
			<Text>Password</Text>
			<TextInput
				value={password}
				style={styles.input}
				onChangeText={(val) => setPassword(val)}
				secureTextEntry={true}
			/>

			<Button
				title='Login'
				onPress={() => dispatch(login(user))}
			/>

			<Text style={styles.text}>Don't have an account?</Text>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Register');
				}}
			>
				<Text style={styles.userBtn}>Register</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() => {
					navigation.navigate('Map');
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

export default LoginScreen;
