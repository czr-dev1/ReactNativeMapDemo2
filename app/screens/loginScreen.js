import React, { useEffect, useState } from "react";
import {
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

// Redux
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

	const updateSecureTextEntry = () => {
		setUser({
			...user,
			secureTextEntry: !user.secureTextEntry,
		});
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
				<View style={{ alignItems: 'center' }}>
					<Text style={{ color: 'red' }}>incorrect username and/or password!</Text>
					<Text style={{ color: 'red' }}>please try again</Text>
				</View>
			) : null}

			<View style={styles.input}>
				<TextInput
					style={{
						fontFamily: 'Arial',
						fontSize: 16,
					}}
					value={user.username}
					placeholder='username'
					autoCapitalize='none'
					autoCorrect={false}
					onChangeText={(val) => handleUsername(val)}
				/>
				{user.isValidUser || user.username === '' ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>please enter your username</Text>
					</Animatable.View>
				)}
			</View>

			<View style={styles.input}>
				<TouchableOpacity style={{ marginTop: 12 }} onPress={updateSecureTextEntry}>
					{user.secureTextEntry ? (
						<FontAwesome5 name='eye-slash' color='#DCDCDC' size={20} />
					) : (
						<FontAwesome5 name='eye' color='#DCDCDC' size={20} />
					)}
				</TouchableOpacity>
				<TextInput
					style={{ fontFamily: 'Arial', fontSize: 16, marginLeft: 10 }}
					value={user.password}
					placeholder='password'
					autoCapitalize='none'
					autoCorrect={false}
					secureTextEntry={user.secureTextEntry ? true : false}
					onChangeText={(val) => handlePassword(val)}
				/>
			</View>
			{user.isValidPassword || user.password === '' ? null : (
				<Animatable.View animation='fadeInLeft' duration={500}>
					<Text style={styles.errorMsg}>password must be at least 8 characters long</Text>
				</Animatable.View>
			)}

			<View style={styles.links}>
				<Text style={{ marginLeft: 50, color: '#7C7887' }}>
					forgot your log in details? get help{' '}
				</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('ForgotPassword');
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#4D4185',
						}}
					>
						signing in
					</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.submitBtn}>
				<TouchableOpacity
					onPress={() => {
						dispatch(login(user));
						setSubmitted(true);
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

			<View style={styles.links}>
				<Text
					style={{
						color: 'gray',
					}}
				>
					{/* Put into brackets b/c of apostrophe */}
					{`don't have an account? register `}
				</Text>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate('Register');
					}}
				>
					<Text
						style={{
							fontWeight: 'bold',
							color: '#4D4185',
						}}
					>
						here
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
		flexDirection: 'row',
		justifyContent: 'flex-start',
		color: colors.border,
		marginTop: 30,
		paddingLeft: 15,
		borderWidth: 2,
		borderColor: colors.border,
		width: '85%',
		height: 50,
	},
	text: {
		fontSize: 14,
		color: '#008BBC',
		marginTop: 190,
	},
	error: {
		fontSize: 16,
		color: 'red',
		textAlign: 'center',
	},
	errorMsg: {
		color: 'red',
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
	links: {
		flexDirection: 'row',
		fontSize: 14,
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
