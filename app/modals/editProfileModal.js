import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
	Button,
	Dimensions,
	FlatList,
	Image,
	Linking,
	Picker,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5, MaterialIcons, Entypo } from '@expo/vector-icons';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';

import colors from '../config/colors';

const PROFILE_PIC = require('../assets/profile_blank.png');

function EditProfileModal(props) {
	const [username, setUsername] = useState(props.username);
	const [bio, setBio] = useState(props.bio);
	const [temp, setTemp] = useState(false);

	const onSubmit = (e) => {
		if (email !== '') {
			const config = {
				headers: {
					'Content-Type': 'application/json',
					'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
				},
			};
			// Request Body
			// const body = JSON.stringify({ username, email, password });
			let data = JSON.stringify({ email: email, message: message });
			axios
				.post('https://globaltraqsdev.com/api/contactUs/', data, config)
				.then((response) => {
					setEmail('');
					setMessage('');
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			const config = {
				headers: {
					'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
				},
			};
			setEmail(`Anonymous@anon.com`);

			axios
				.post(
					'https://globaltraqsdev.com/api/contactUs/',
					{
						email: email,
						message: message,
					},
					config
				)
				.then((response) => {
					setEmail('');
					setMessage('');
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView style={{ width: '100%' }}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						alignItems: 'center',
						paddingBottom: 10,
					}}
				>
					<Entypo
						onPress={() => {
							props.navigation.goBack();
						}}
						style={{ padding: 24 }}
						name='cross'
						size={28}
						color='#787878'
					/>
					<Text style={{ fontSize: 24, paddingTop: 24, color: '#787878', fontWeight: 'bold' }}>
						edit profile
					</Text>
					<Entypo
						onPress={() => {
							props.navigation.goBack();
						}}
						style={{ padding: 24 }}
						name='check'
						size={24}
						color='#787878'
					/>
				</View>
				<View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
					<Image style={styles.profileImage} source={{ uri: props.profileImage }} />
					<Text style={{ fontSize: 18, fontWeight: 'bold', color: '#787878' }}>
						change profile image
					</Text>
				</View>
				<View style={styles.box}>
					<View
						style={{
							flexDirection: 'row',
							borderBottomWidth: 3,
							borderColor: '#ddd',
							alignItems: 'center',
							paddingBottom: 10,
							paddingLeft: 7,
							paddingRight: 14,
							width: '100%',
							justifyContent: 'space-between',
						}}
					>
						<View style={{}}>
							<Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ddd' }}>anonymous</Text>
						</View>
						<View style={{}}>
							<Switch
								value={temp}
								onValueChange={(val) => setTemp(val)}
								activeText={'✔'}
								inActiveText={'✖'}
								backgroundActive={'#AAAAAA'}
								backgroundInActive={'#AAAAAA'}
							/>
						</View>
					</View>
					<Text
						style={{
							fontWeight: 'bold',
							fontSize: 18,
							color: '#ddd',
							paddingLeft: 8,
							paddingTop: 10,
						}}
					>
						username
					</Text>
					<TextInput
						style={styles.input}
						placeholder='username'
						value={username}
						onChangeText={(value) => setUsername(value)}
					/>
					<Text style={{ fontWeight: 'bold', fontSize: 18, color: '#ddd', paddingLeft: 8 }}>
						bio
					</Text>
					<TextInput
						style={styles.input}
						multiline
						placeholder='bio'
						value={bio}
						onChangeText={(value) => setBio(value)}
					/>

					<TouchableOpacity style={{ padding: 8, width: '25%' }}>
						<Text>delete profile</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		height: '100%',
		width: Dimensions.get('window').width,
	},
	box: {
		paddingTop: 18,
		paddingBottom: 18,
		paddingRight: 32,
		paddingLeft: 32,
		margin: 6,
	},
	input: {
		borderBottomWidth: 3,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 14,
		width: '100%',
		marginBottom: 28,
	},
	inputBorderless: {
		borderColor: '#ddd',
		padding: 10,
		fontSize: 14,
		width: '100%',
	},
	profileImage: {
		borderRadius: 200,
		resizeMode: 'center',
		height: 128,
		width: 128,
	},
});

const mapStateToProps = (state) => {
	return {
		username: state.authReducer.username,
		bio: state.authReducer.bio,
		profileImage: state.authReducer.extra[0].profileurl,
	};
};

export default connect(mapStateToProps, null)(EditProfileModal);
