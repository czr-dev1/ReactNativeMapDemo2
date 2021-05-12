import React, { useEffect, useState } from 'react';
import {
	Alert,
	Image,
	SafeAreaView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { connect, useDispatch } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import * as EmailValidator from 'email-validator';

// Icons
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// Redux
import { register, reset } from '../redux/actions/authActions';

import Text from "../components/text";
import colors from '../config/colors';

function RegisterScreen(props) {
	const dispatch = useDispatch();
	const navigation = useNavigation();

	const [submitted, setSubmitted] = useState(false);
	const [failed, setFailed] = useState(false);
	const [hidden, setHidden] = useState(true);

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

	// Handles showing/hiding password
	const showPassword = () => {
		setHidden(hidden ? false : true);
	};

	// Alerts when registration fails
	const failedRegister = () => {
		Alert.alert(
			'failed to register!',
			'username or email already taken! try another',
			[
				{
					text: 'ok',
					onPress: () => {
						setSubmitted(!submitted);
						dispatch(reset());
					}
				}
			]
		);
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
			<View style={styles.logo}>
			<Image
					style={{ height: 150, width: 150 }}
					source={require('../assets/color_icon.png')} />
				<Text style={styles.title}> register </Text>
			</View>

			{submitted && failed ? (
				<View style={{ alignItems: 'center' }}>
				{/* Made it an Alert so that I could reset props.registerFail
				back to false and update useState for setSubmitted. Also had
				to add some things to authActions and authReducer */}
					<View>
						<Text> {failedRegister()} </Text>
					</View>
				</View>
			) : null
			}

			<View style={styles.inputContainer}>
				<View style={styles.input}>
					<TextInput
						style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.purple,
							width: '90%'
						}}
						value={user.username}
						placeholder='username'
						placeholderTextColor={colors.forgotDetails}
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={(val) => setUsername(val)}
					/>
				</View>
				{user.isValidUsername ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							username must be no longer than 15 characters
						</Text>
					</Animatable.View>
				)}

				<View style={styles.input}>
					<FontAwesome name='envelope' color={colors.purple} size={20} />
					<TextInput
						style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.purple,
							marginLeft: 10,
							width: '90%'
						}}
						value={user.email}
						placeholder='email'
						placeholderTextColor={colors.forgotDetails}
						autoCapitalize='none'
						autoCorrect={false}
						onChangeText={(val) => setEmail(val)}
					/>
				</View>
				{user.isValidEmail || user.email === '' ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>please enter a valid email</Text>
					</Animatable.View>
				)}

				<View style={styles.input}>
					{/* allows user to show/hide password */}
					<TouchableOpacity
						onPress={showPassword}
					>
						{hidden ? (
							<FontAwesome5 name='eye-slash' color={colors.purple} size={20} />
						) : (
							<FontAwesome5 name='eye' color={colors.purple} size={20} />
						)}
					</TouchableOpacity>
					<TextInput
						style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.purple,
							marginLeft: 10,
							width: '90%'
						}}
						value={user.password}
						placeholder='password'
						placeholderTextColor={colors.forgotDetails}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={hidden ? true : false}
						onChangeText={(val) => setPassword(val)}
					/>
				</View>
				{user.isValidPassword || user.password === '' ? null : (
					<Animatable.View animation='fadeInLeft' duration={500}>
						<Text style={styles.errorMsg}>
							must be at least 8 characters long with at least 1 uppercase letter, 1 number, and 1 special character
						</Text>
					</Animatable.View>
				)}

				<View style={styles.input}>
					{/* allows user to show/hide password */}
					<TouchableOpacity
						onPress={updateSecureTextEntry}
					>
						{user.secureTextEntry ? (
							<FontAwesome5 name='eye-slash' color={colors.purple} size={20} />
						) : (
							<FontAwesome5 name='eye' color={colors.purple} size={20} />
						)}
					</TouchableOpacity>
					<TextInput
						style={{
							fontFamily: 'Arial',
							fontSize: 16,
							color: colors.purple,
							marginLeft: 10,
							width: '90%'
						}}
						value={user.confirmPassword}
						placeholder='confirm password'
						placeholderTextColor={colors.forgotDetails}
						autoCapitalize='none'
						autoCorrect={false}
						secureTextEntry={user.secureTextEntry ? true : false}
						onChangeText={(val) => setConfirmPassword(val)}
					/>
				</View>
				{user.isValidConfirmPassword || (user.confirmPassword === '' && user.password === '') ? null : (
					<Animatable.View>
						<Text style={styles.errorMsg}>
							the passwords don't match, please try again
						</Text>
					</Animatable.View>
				)}
			</View>

			<View style={styles.bottomContainer}>
				<View style={styles.submitBtn}>
					<TouchableOpacity
						onPress={() => {
							dispatch(register(user));
							setSubmitted(!submitted);
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
							register
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.links}>
					<Text
						style={{
							fontFamily: 'Arial',
							fontSize: 14,
							color: colors.gray,
						}}
					>
						already have an account? log in{' '}
					</Text>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate('Login');
						}}
					>
						<Text
							style={{
								fontFamily: 'Arial',
								fontSize: 14,
								fontWeight: 'bold',
								color: colors.purple,
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
		flex: 0.5,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignContent: 'center',
		marginTop: 10,
		width: '100%',
	},
	title: {
		fontFamily: 'Arial',
		fontSize: 24,
		color: colors.purple,
	},
	inputContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	input: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 2,
		borderBottomColor: colors.purple,
		fontFamily: 'Arial',
		fontSize: 16,
		color: colors.purple,
		marginTop: 10,
		marginBottom: 15,
		paddingLeft: 10,
		height: 45,
		width: '85%',
	},
	bottomContainer: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignContent: 'flex-start',
		alignItems: 'center',
		width: '100%'
	},
	submitBtn: {
		backgroundColor: '#4D4185',
		justifyContent: 'center',
		borderRadius: 15,
		height: 60,
		width: '80%',
	},
	links: {
		flexDirection: 'row',
	},
	forgotDetails: {
		fontFamily: 'Arial',
		fontSize: 12,
		color: colors.forgotDetails,
		marginTop: 10,
		marginLeft: 90,
	},
	text: {
		fontSize: 14,
		color: colors.forgotDetails,
		marginBottom: 50,
	},
	errorMsg: {
		fontSize: 12,
		textAlign: 'center',
		color: colors.alert,
		width: 330
	},
});

const mapStateToProps = (state) => {
	return {
		registerFail: state.authReducer.registerFail,
		expoPushToken: state.authReducer.expoPushToken,
	};
};

export default connect(mapStateToProps)(RegisterScreen);
