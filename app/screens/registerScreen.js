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
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as EmailValidator from 'email-validator';

import { register } from '../redux/actions/authActions';
import colors from '../config/colors';

function RegisterScreen() {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		isValidUsername: true,
		isValidEmail: true,
		isValidPassword: true,
		isValidConfirmPassword: true,
		secureTextEntry: true,
		errors: {},
	});

	const setUsername = (val) => {
		if (val.length > 15) {
			setUser({
				...user,
				username: val,
				isValidUsername: false,
			});
		} else {
			setUser({
				...user,
				username: val,
				isValidUsername: true,
			});
		}
	}

	const setEmail = (val) => {
		if (!EmailValidator.validate(user.email)) {
			setUser({
				...user,
				email: val,
				isValidEmail: false,
			});
		} else {
			setUser({
				...user,
				email: val,
				isValidEmail: true,
			});
		}
	}

	const setPassword = (val) => {
		let len = val.length;
		if (
			((len < 8 || len >= 8) && val.search(/[!@#$%^&*_+()]/) === -1) ||
			((len < 8 || len >= 8) && val.search(/[A-Z]/) === -1) ||
			((len < 8 || len >= 8) && val.search(/\d/) === -1)) 
		{
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
		} 
		else {
			setUser({
				...user,
				password: val,
				isValidPassword: true,
			});
		}
	}

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
	}

	const updateSecureTextEntry = () => {
		setUser({
			...user,
			secureTextEntry: !user.secureTextEntry,
		});
	}
	
	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/thearqive_bubbles.png')} />
			<Text style={styles.title}>register</Text>
			<View style={styles.icon}>
				<TextInput
					style={styles.input}
					value={user.username}
					placeholder='username'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => setUsername(val)}
				/>
			</View>
			{user.isValidUsername ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>username must be no longer than 15 characters</Text>
				</Animatable.View>
			)}

			<View style={styles.icon}>
				<FontAwesome5 name='envelope' color='#DCDCDC' size={20} />
				<TextInput
					style={styles.input}
					value={user.email}
					placeholder='email'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => setEmail(val)}
				/>
			</View>
			{user.isValidEmail ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>please enter valid email</Text>
				</Animatable.View>
			)}

			<View style={styles.icon}>
				<FontAwesome5 name='eye' color='#DCDCDC' size={20} />
				<TextInput
					style={styles.input}
					value={user.password}
					placeholder='password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={user.secureTextEntry ? true : false}
					onChangeText={(val) => setPassword(val)}
				/>
			</View>
			{user.isValidPassword ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>
						must be at least 8 characters long with at least one uppercase, number, and special
						character
					</Text>
				</Animatable.View>
			)}

			<View style={styles.icon}>
				<FontAwesome5 name='eye' color='#DCDCDC' size={20} />
				<TextInput
					style={styles.input}
					value={user.confirmPassword}
					placeholder='confirm password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={user.secureTextEntry ? true : false}
					onChangeText={(val) => setConfirmPassword(val)}
				/>
				<TouchableOpacity onPress={updateSecureTextEntry}>
					{user.secureTextEntry ? (
						<FontAwesome5 name='eye-slash' color='#DCDCDC' size={20} />
					) : (
						<FontAwesome5 name='eye' color='#DCDCDC' size={20} />
					)}
				</TouchableOpacity>
			</View>
			{user.isValidConfirmPassword ? null : (
				<Animatable.View>
					<Text style={styles.errorMsg}>passwords don't match, please re-enter</Text>
				</Animatable.View>
			)}
			<View style={styles.registerBtn}>
				<Button
					title='register'
					color='white'
					onPress={() => {
						dispatch(register(user));
					}}
				/>
			</View>
			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>already have an account? log in </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Login');
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
		color: '#A9A9A9',
		marginBottom: 50,
	},
	input: {
		flex: 1,
		fontSize: 20,
		color: 'gray',
		width: '90%',
		paddingLeft: 10,
	},
	icon: {
		flexDirection: 'row',
		width: '85%',
		paddingLeft: 5,
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderColor: '#DCDCDC',
		marginTop: 10,
		marginBottom: 20,
	},
	text: {
		fontSize: 14,
		color: 'gray',
		marginTop: 120,
	},
	errorMsg: {
		textAlign: 'center',
		color: 'red',
		padding: 5,
	},
	registerBtn: {
		fontSize: 16,
		width: '85%',
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#DCDCDC',
		marginTop: 75,
		marginBottom: 60,
	},
	links: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		fontSize: 14,
		marginTop: 25,
		marginBottom: 15,
	},
});

export default RegisterScreen;

/*
Fixes Needed:
1. Toggle show/hide password so that each password shows/hides individually
2. Confirm password should show error message automatically if first password is changed 
3. After pressing 'register', error should display if username is already taken 
*/
