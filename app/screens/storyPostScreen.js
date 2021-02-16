import React, { useEffect, useState } from 'react';
import {
	Button,
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';
import { Switch } from 'react-native-switch';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { connect } from 'react-redux';
import { loadStories } from '../redux/actions/storyActions';
import { FontAwesome5 } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';

import colors from '../config/colors';

function StoryPostScreen(props) {
	// These are here so you know what to include in your post request
	const [address, setAddress] = useState('');
	const [anonradius, setAnonRadius] = useState(1);
	const [category, setCategory] = useState(1);
	const [country, setCountry] = useState('');
	const [description, setDescription] = useState('');
	const [endDate, setEndDate] = useState({});
	const [isAnonymous, setAnonymous] = useState(true);
	const [lastEditDate, setLastEditDate] = useState({});
	const [lastPersonEdit, setLastPersonEdit] = useState('');
	const [location, setLocation] = useState({}); //make sure to split to latitude and longitude
	const [locality, setLocality] = useState('');
	const [owner, setOwner] = useState('');
	const [postCode, setPostCode] = useState('');
	const [postDate, setPostDate] = useState('');
	const [region, setRegion] = useState('');
	const [startDate, setStartDate] = useState(new Date());
	const [title, setTitle] = useState(new Date());

	const [isExpanded, setExpanded] = useState(false);
	const [isPickingStartDate, setIsPickingStartDate] = useState(false);
	const [isPickingEndDate, setIsPickingEndDate] = useState(false);

	const [gotLocation, setGotLocation] = useState(false);

	useEffect(() => {
		getLocation();
	}, []);

	const getLocation = async () => {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			//handle error here
		}
		const loc = await Location.getCurrentPositionAsync({});
		setLocation({
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
		});
		setGotLocation(true);
		if (gotLocation) {
			console.log(location);
		}
	};

	const submitNewStory = async () => {
		const latSplit = location.latitude.toString().split('.');
		const lonSplit = location.longitude.toString().split('.');
		const latitude = latSplit[0] + '.' + latSplit[1].substring(0, 6);
		const longitude = lonSplit[0] + '.' + lonSplit[1].substring(0, 6);

		const pin = {
			address: address,
			anonradius: anonradius,
			category: category,
			country: country,
			description: description,
			endDate: new Date(),
			is_anonymous_pin: true,
			lastEditDate: new Date(),
			lastPersonEdit: null,
			latitude: latitude,
			longitude: longitude,
			locality: locality,
			owner: owner,
			postCode: postCode,
			postDate: new Date(),
			region: region,
			startDate: new Date(),
			title: title,
		};
		console.log(pin);

		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			},
		};

		axios
			.post('http://www.globaltraqsdev.com/api/pins/', pin, config)
			.then((res) => {
				console.log(res.data);
				props.loadStories();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<TouchableWithoutFeedback>
			<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
				<View style={{ width: '80%', height: '100%' }}>
					<Modal
						backdropColor='#ddd'
						isVisible={isPickingStartDate}
						onBackdropPress={() => setIsPickingStartDate(false)}
						onBackButtonPress={() => setIsPickingStartDate(false)}
						animationIn='fadeIn'
						animationOut='fadeOut'
					>
						<Calendar
							current={startDate}
							markedDates={{
								'2021-01-16': { selected: true, marked: true, selectedColor: 'blue' },
							}}
							onDayPress={(day) => setStartDate(new Date(day.year, day.month - 1, day.day))}
						/>
					</Modal>
					<Modal
						backdropColor='#ddd'
						isVisible={isPickingEndDate}
						onBackdropPress={() => setIsPickingEndDate(false)}
						onBackButtonPress={() => setIsPickingEndDate(false)}
						animationIn='fadeIn'
						animationOut='fadeOut'
					>
						<Calendar
							current={endDate}
							markedDates={{
								'2021-01-16': { selected: true, marked: true, selectedColor: 'blue' },
							}}
							onDayPress={(day) => setStartDate(new Date(day.year, day.month - 1, day.day))}
						/>
					</Modal>
					<View style={{ flexDirection: 'row', justifyContent: 'center' }}>
						<Text style={{ fontSize: 24, padding: 24 }}>add a story</Text>
					</View>
					<View
						style={{
							flexDirection: 'row',
							borderBottomWidth: 1,
							borderColor: '#ddd',
							alignItems: 'center',
							paddingBottom: 9,
							paddingLeft: 7,
							paddingRight: 14,
							width: '100%',
							justifyContent: 'space-between',
						}}
					>
						<View style={{}}>
							<Text style={{ color: '#919191' }}>anonymous</Text>
						</View>
						<View style={{}}>
							<Switch
								value={isAnonymous}
								onValueChange={(val) => setAnonymous(val)}
								activeText={'✔'}
								inActiveText={'✖'}
								backgroundActive={'#AAAAAA'}
								backgroundInActive={'#AAAAAA'}
							/>
						</View>
					</View>
					<View
						style={{
							borderBottomWidth: 1,
							borderColor: '#ddd',
							flexDirection: 'row',
							alignItems: 'center',
						}}
					>
						<TouchableWithoutFeedback onPress={() => setExpanded(!isExpanded)}>
							<FontAwesome5 name={isExpanded ? 'minus' : 'plus'} size={24} color='#919191' />
						</TouchableWithoutFeedback>
						<TextInput
							name='address'
							placeholder='*address'
							style={styles.inputAddress}
							onFocus={() => setExpanded(true)}
							onChangeText={(val) => {
								setAddress(val);
							}}
						/>
					</View>
					{isExpanded ? (
						<View>
							<TextInput
								name='locality'
								placeholder='locality (city, township, etc.)'
								style={styles.input}
								onChangeText={(val) => {
									setRegion(val);
								}}
							/>
							<TextInput
								name='region'
								placeholder='region (state, province, etc.)'
								style={styles.input}
								onChangeText={(val) => {
									setRegion(val);
								}}
							/>
							<TextInput
								name='country'
								placeholder='country'
								style={styles.input}
								onChangeText={(val) => {
									setCountry(val);
								}}
							/>
							<TextInput
								name='postcode'
								placeholder='postcode'
								style={styles.input}
								onChangeText={(val) => {
									setPostCode(val);
								}}
							/>
						</View>
					) : null}
					{title === '' ? (
						<Text style={styles.requiredText}>* Please enter a story title </Text>
					) : null}
					<TextInput
						name='title'
						placeholder='title'
						style={styles.input}
						onChangeText={(val) => {
							setTitle(val);
						}}
					/>
					<View
						style={{
							flexDirection: 'row',
							borderColor: '#ddd',
							borderBottomWidth: 1,
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Text style={{ color: '#919191', padding: 12, alignSelf: 'flex-start' }}>
							*category
						</Text>
						<Collapse style={{ paddingRight: 12 }}>
							<CollapseHeader>
								<View
									style={{
										flexDirection: 'row',
										alignItems: 'center',
										backgroundColor: '#ddd',
										borderRadius: 8,
										padding: 4,
									}}
								>
									<Text style={{ color: '#fff', paddingRight: 3 }}>personal</Text>
									<FontAwesome5 name='chevron-down' size={24} color='#919191' />
								</View>
							</CollapseHeader>
							<CollapseBody>
								<TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#ddd' }}>
									<View style={{ flexDirection: 'row', justifyContent: 'center', padding: 4 }}>
										<Text style={{ backgroundColor: '#ddd', color: '#fff' }}>personal</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#ddd' }}>
									<View style={{ flexDirection: 'row', justifyContent: 'center', padding: 4 }}>
										<Text style={{ backgroundColor: '#ddd', color: '#fff' }}>historical</Text>
									</View>
								</TouchableOpacity>
								<TouchableOpacity style={{ borderRadius: 8, backgroundColor: '#ddd' }}>
									<View style={{ flexDirection: 'row', justifyContent: 'center', padding: 4 }}>
										<Text style={{ backgroundColor: '#ddd', color: '#fff' }}>community</Text>
									</View>
								</TouchableOpacity>
							</CollapseBody>
						</Collapse>
					</View>

					<View
						style={{
							flexDirection: 'row',
							borderColor: '#ddd',
							borderBottomWidth: 1,
							justifyContent: 'space-around',
							padding: 9,
						}}
					>
						<TouchableWithoutFeedback onPress={() => setIsPickingStartDate(true)}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-evenly',
								}}
							>
								<Text style={{ color: '#919191', paddingRight: 8 }}>start date</Text>
								<FontAwesome5 name='calendar-week' size={24} color='#919191' />
							</View>
						</TouchableWithoutFeedback>
						<TouchableWithoutFeedback onPress={() => setIsPickingEndDate(true)}>
							<View
								style={{
									flexDirection: 'row',
									alignItems: 'center',
									justifyContent: 'space-evenly',
								}}
							>
								<Text style={{ color: '#919191', padding: 8 }}>start date</Text>
								<FontAwesome5 name='calendar-week' size={24} color='#919191' />
							</View>
						</TouchableWithoutFeedback>
					</View>

					<TextInput
						multiline
						placeholder='enter story'
						name=''
						style={styles.inputAddress}
						onChangeText={(val) => {
							setDescription(val);
						}}
					/>

					<View style={{ flexDirection: 'column', flex: 1 }}>
						<TouchableOpacity
							style={{
								alignSelf: 'flex-start',
								position: 'absolute',
								bottom: 35,
								borderRadius: 5,
								borderColor: '#ddd',
								borderWidth: 2,
							}}
						>
							<Text
								style={{
									paddingTop: 9,
									paddingBottom: 9,
									paddingLeft: 18,
									paddingRight: 18,
									color: '#919191',
								}}
							>
								Cancel
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{
								alignSelf: 'flex-end',
								position: 'absolute',
								bottom: 35,
								borderRadius: 5,
								borderColor: '#ddd',
								borderWidth: 2,
							}}
							disabled={gotLocation ? false : true}
							onPress={(e) => {
								submitNewStory();
							}}
						>
							<Text
								style={{
									paddingTop: 9,
									paddingBottom: 9,
									paddingLeft: 18,
									paddingRight: 18,
									color: '#919191',
								}}
							>
								Post
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</SafeAreaView>
		</TouchableWithoutFeedback>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		height: '100%',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '100%',
	},
	navStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'dodgerblue',
		width: Dimensions.get('window').width,
		height: '5%',
	},
	navButton: {
		flexGrow: 1,
		textAlign: 'center',
	},
	input: {
		borderBottomWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		fontSize: 14,
		width: '100%',
	},
	inputAddress: {
		padding: 10,
		fontSize: 14,
		width: '100%',
	},
	requiredText: {
		color: 'red',
	},
	userBtn: {
		marginTop: 15,
		fontSize: 18,
	},
});

const mapDispatchToProps = (dispatch) => {
	return {
		loadStories: () => dispatch(loadStories()),
	};
};

export default connect(null, mapDispatchToProps)(StoryPostScreen);
