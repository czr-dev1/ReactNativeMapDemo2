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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { login } from '../redux/actions/authActions';
import colors from '../config/colors';
import { Alert } from 'react-native';

function LoginScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [user, setUser] = useState({
		username: '',
		password: '',
		isValidUser: true,
		isValidPassword: true,
		secureTextEntry: true,
		errors: {},
	});

	const handleUsername = (val) => {
		if (val === '') {
			setUser({
				...user,
				username: val,
				isValidUser: false,
			});
		} else {
			setUser({
				...user,
				username: val,
				isValidUser: true,
			});
		}
	};

	const handlePassword = (val) => {
		if (val.length >= 8) {
			setUser({
				...user,
				password: val,
				isValidPassword: true,
			});
		} else {
			setUser({
				...user,
				password: val,
				isValidPassword: false,
			});
		}
	};

	const updateSecureTextEntry = () => {
		setUser({
			...user,
			secureTextEntry: !user.secureTextEntry,
		});
	};

	const errMsg = () => {
		Alert.alert('', 'invalid username and/or password, please try again', [{ text: 'ok' }]);
	};

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/thearqive_bubbles.png')} />
			<Text style={styles.title}>log in</Text>

			<TextInput
				style={styles.input}
				value={user.username}
				placeholder='username'
				autoCapitalize='none'
				autoCorrec={false}
				onChangeText={(val) => handleUsername(val)}
			/>
			{user.isValidUser ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>please enter your username</Text>
				</Animatable.View>
			)}

			<TextInput
				style={styles.input}
				value={user.password}
				placeholder='password'
				autoCapitalize='none'
				autoCorrect={false}
				secureTextEntry={user.secureTextEntry ? true : false}
				onChangeText={(val) => handlePassword(val)}
			/>
			{user.isValidPassword ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>password must be at least 8 characters long</Text>
				</Animatable.View>
			)}

			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>forgot your log in details? get help </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('');
					}}
				>
					<Text style={{ fontWeight: 'bold', color: '#696969' }}>signing in</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.loginBtn}>
				<Button
					title='log in'
					color='white'
					onPress={() => {
						dispatch(login(user));
					}}
				/>
			</View>

			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>don't have an account? register </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					<Text style={{ fontWeight: 'bold', color: '#696969' }}>here</Text>
				</TouchableOpacity>
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
		marginBottom: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#A9A9A9',
		marginBottom: 50,
	},
	body: {
		flexDirection: 'row',
	},
	input: {
		fontSize: 20,
		color: 'gray',
		width: '85%',
		height: 50,
		paddingLeft: 15,
		borderWidth: 2,
		borderRadius: 5,
		borderColor: '#DCDCDC',
		marginTop: 10,
		marginBottom: 10,
	},
	icon: {
		alignItems: 'flex-end',
		position: 'absolute',
	},
	text: {
		fontSize: 14,
		color: 'gray',
		marginTop: 190,
	},
	errorMsg: {
		color: 'red',
	},
	loginBtn: {
		fontSize: 18,
		width: '85%',
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#DCDCDC',
		marginTop: 50,
		marginBottom: 60,
	},
	links: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		fontSize: 14,
		marginTop: 10,
		marginBottom: 30,
	},
});

export default LoginScreen;
