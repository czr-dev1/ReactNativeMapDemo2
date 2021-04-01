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
import * as Animatable from 'react-native-animatable';

import { login } from '../redux/actions/authActions';
import colors from '../config/colors';

function LoginScreen(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();
	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);

	const [user, setUser] = useState({
		username: '',
		password: '',
		isValidUser: true,
		isValidPassword: true,
		secureTextEntry: true,
		errors: {},
		expoPushToken: props.expoPushToken,
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

	useEffect(() => {
		if (submitted) {
			setFailed(props.loginFail);
		} else {
			setFailed(false);
		}
	}, [props.loginFail]);

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<Image style={styles.logo} source={require('../assets/color_icon.png')} />
			<Text style={styles.title}>log in</Text>

			{submitted && failed ? (
				<View>
					<Text style={styles.error}>incorrect username and/or password!</Text>
					<Text style={styles.error}>please try again</Text>
				</View>
			) : null}

			<TextInput
				style={styles.input}
				value={user.username}
				placeholder='username'
				autoCapitalize='none'
				autoCorrec={false}
				onChangeText={(val) => handleUsername(val)}
			/>
			{user.isValidUser || user.username === '' ? null : (
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
			{user.isValidPassword || user.password === '' ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>password must be at least 8 characters long</Text>
				</Animatable.View>
			)}

			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>forgot your log in details? get help </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ForgotPassword');
					}}
				>
					<Text style={{ fontWeight: 'bold', color: '#4D4185' }}>signing in</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.submitBtn}>
				<TouchableWithoutFeedback
					onPress={() => {
						dispatch(login(user));
						setSubmitted(true);
					}}
				>
					<Text style={{color: 'white', alignSelf: 'center'}}>log in</Text>
				</TouchableWithoutFeedback>
			</View>

			<View style={styles.links}>
				<Text style={{ color: 'gray' }}>don't have an account? register </Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Register');
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
		fontWeight: 'bold',
		color: '#A9A9A9',
		marginBottom: 30,
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
		borderColor: '#4D4185',
		marginTop: 10,
		marginBottom: 10,
	},
	icon: {
		alignItems: 'flex-end',
		position: 'absolute',
	},
	text: {
		fontSize: 14,
		color: '#2380B0',
		marginTop: 190,
	},
	error: {
		textAlign: 'center',
		fontSize: 16,
		color: 'red',
	},
	errorMsg: {
		color: 'red',
	},
	submitBtn: {
		fontSize: 18,
		width: '85%',
		padding: 10,
		borderRadius: 5,
		backgroundColor: '#4D4185',
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

const mapStateToProps = (state) => {
	return {
		loginFail: state.authReducer.loginFail,
		expoPushToken: state.authReducer.expoPushToken,
	};
};

export default connect(mapStateToProps)(LoginScreen);
