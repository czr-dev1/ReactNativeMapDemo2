import React, { useEffect, useState } from 'react';
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
import { connect, useDispatch } from 'react-redux';
import { FontAwesome5 } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import * as EmailValidator from 'email-validator';

import { register } from '../redux/actions/authActions';
import colors from '../config/colors';

function RegisterScreen(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);

	const [user, setUser] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		expoPushToken: props.expoPushToken,
		isValidUsername: true,
		isValidEmail: true,
		isValidPassword: true,
		isValidConfirmPassword: true,
		secureTextEntry: true,
	});

	const setUsername = (val) => {
		console.log(user);
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
	};

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
	};

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

	const updateSecureTextEntry = () => {
		setUser({
			...user,
			secureTextEntry: !user.secureTextEntry,
		});
	};

	useEffect(() => {
		if (submitted) {
			setFailed(props.registerFail);
		} else {
			setFailed(false);
		}
	}, [props.registerFail]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/color_icon.png')} />
			<Text style={styles.title}>register</Text>

			{submitted && failed ? (
				<View>
					<Text style={styles.error}>username or email already taken!</Text>
					<Text style={styles.error}>please try another</Text>
				</View>
			) : null}

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
				<FontAwesome5 name='envelope' color={colors.border} size={20} />
				<TextInput
					style={styles.input}
					value={user.email}
					placeholder='email'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => setEmail(val)}
				/>
			</View>
			{user.isValidEmail || user.email === '' ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>please enter valid email</Text>
				</Animatable.View>
			)}

			<View style={styles.icon}>
				<FontAwesome5 name='lock' color={colors.border} size={20} />
				<TextInput
					style={styles.input}
					value={user.password}
					placeholder='password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={user.secureTextEntry ? true : false}
					onChangeText={(val) => setPassword(val)}
					onEndEditing={(val) => setConfirmPassword(val)}
				/>
			</View>
			{user.isValidPassword || user.password === '' ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>
						must be at least 8 characters long with at least 1 uppercase letter, 1 number, and 1 special character
					</Text>
				</Animatable.View>
			)}

			<View style={styles.icon}>
				<FontAwesome5 name='lock' color={colors.border} size={20} />
				<TextInput
					style={styles.input}
					value={user.confirmPassword}
					placeholder='confirm password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={user.secureTextEntry ? true : false}
					onChangeText={(val) => setConfirmPassword(val)}
				/>
				{/* allows user to show/hide password */}
				<TouchableOpacity onPress={updateSecureTextEntry}>
					{user.secureTextEntry ? (
						<FontAwesome5 name='eye-slash' color='#DCDCDC' size={20} />
					) : (
						<FontAwesome5 name='eye' color={colors.border} size={20} />
					)}
				</TouchableOpacity>
			</View>
			{user.isValidConfirmPassword || user.confirmPassword === '' ? null : (
				<Animatable.View>
					<Text style={styles.errorMsg}>passwords don't match, please re-enter</Text>
				</Animatable.View>
			)}
			<View style={styles.submitBtn}>
				<TouchableWithoutFeedback
					onPress={() => {
						dispatch(register(user));
						setSubmitted(true);
					}}
				>
					<Text style={{color: 'white', alignSelf: 'center'}}>register</Text>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>already have an account? log in </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Login');
					}}
				>
					<Text style={{ fontWeight: 'bold', color: '#4D4185' }}>here</Text>
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
		marginTop: 20,
		marginBottom: 10,
		height: 100,
		width: 100,
	},
	title: {
		fontSize: 24,
		color: colors.purple,
		marginBottom: 30,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: colors.border,
		width: '90%',
		paddingLeft: 10,
	},
	icon: {
		flexDirection: 'row',
		width: '85%',
		paddingLeft: 5,
		paddingBottom: 5,
		borderBottomWidth: 2,
		borderColor: colors.border,
		marginTop: 10,
		marginBottom: 20,
	},
	text: {
		fontSize: 14,
		color: '#2380B0',
		marginTop: 120,
	},
	error: {
		textAlign: 'center',
		fontSize: 16,
		color: 'red',
	},
	errorMsg: {
		textAlign: 'center',
		color: colors.alert,
		padding: 5,
	},
	submitBtn: {
		fontSize: 16,
		width: '85%',
		padding: 10,
		borderRadius: 5,
		backgroundColor: colors.purple,
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

const mapStateToProps = (state) => {
	console.log("authReducer: ", state.authReducer);
	return {
		registerFail: state.authReducer.registerFail,
		expoPushToken: state.authReducer.expoPushToken
	};
};

export default connect(mapStateToProps)(RegisterScreen);
