import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView from 'react-native-map-clustering';
import { Marker, MAP_TYPES, PROVIDER_DEFAULT, UrlTile } from 'react-native-maps';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';

import colors from '../config/colors';
import { loadStories } from '../redux/actions/storyActions';

const PERSONAL_PIN = require('../assets/personal_128x128.png');
const HISTORICAL_PIN = require('../assets/historical_128x128.png');
const COMMUNITY_PIN = require('../assets/community_128x128.png');

function DarkMapScreen(props) {
	const [gotLocation, setGotLocation] = useState(false);
	const [location, setLocation] = useState({
		latitude: 34.0522,
		longitude: -118.2437,
		latitudeDelta: 8.5,
		longitudeDelta: 8.5,
	});
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [filteredDataSource, setFilteredDataSource] = useState([]);
	const [masterDataSource, setMasterDataSource] = useState([]);
	const [showSearchResults, setShowSearchResults] = useState(false);
	const urlTemplate = 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
	const INITIAL_REGION = {
		latitude: 34.0522,
		longitude: -118.2437,
		latitudeDelta: 0.5,
		longitudeDelta: 0.5,
	};

	useEffect(() => {
		props.loadStories();
		getLocation();
		searchData();
	}, []);

	const getLocation = async () => {
		let { status } = await Location.requestPermissionsAsync();
		if (status !== 'granted') {
			//handle error here
		}

		let loc = await Location.getCurrentPositionAsync({});
		const { latitudeDelta, longitudeDelta } = location;
		setLocation({
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
			latitudeDelta: latitudeDelta,
			longitudeDelta: longitudeDelta,
		});
		setGotLocation(true);
	};

	const searchData = async () => {
		fetch('http://www.globaltraqsdev.com/api/pins', {
			method: 'GET',
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			},
		})
		.then((response) => response.json())
		.then((responseJson) => {
			setFilteredDataSource(responseJson);
			setMasterDataSource(responseJson);
		})
		.catch((error) => {
			console.error(error);
		});
	};

	const searchFilterFunction = (text) => {
		if (text.length > 0) {
			setShowSearchResults(true);
		} else {
			setShowSearchResults(false);
		}
		if (text) {
			const newData = masterDataSource.filter(function (item) {
				const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
				const textData = text.toUpperCase();
				return itemData.indexOf(textData) > -1;
			});
			setFilteredDataSource(newData);
			setSearch(text);
		} else {
			setFilteredDataSource(masterDataSource);
			setSearch(text);
		}
	};

	const ItemView = ({ item }) => {
		return (
			<Text
				style={styles.itemStyle}
				onPress={() => {
					// Need to send user to the searched post on the map
					/*props.navigation.navigate('Story', {
					title: item.title,
					description: item.description
					});*/
				}}
			>
				{item.title.toUpperCase()}
			</Text>
		);
	};

	const ItemSeparatorView = () => {
		return (
			<View
				style={{
					height: 0.5,
					width: '100%',
					backgroundColor: 'black',
				}}
			/>
		);
	};

	const loadData = async () => {
		try {
			setLoading(true);
			let response = await fetch('http://www.globaltraqsdev.com/api/pins', {
				method: 'GET',
				headers: {
					'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
				},
			});
			let json = await response.json();
			console.log(json);
			setData(json);
			setLoading(false);
			return;
		} catch (error) {
			console.error(error);
		}

		let loc = await Location.getCurrentPositionAsync({});
		const { latitudeDelta, longitudeDelta } = location;
		setLocation({
			latitude: loc.coords.latitude,
			longitude: loc.coords.longitude,
			latitudeDelta: latitudeDelta,
			longitudeDelta: longitudeDelta,
		});
		setGotLocation(true);
	};

	return (
		<SafeAreaView style={(styles.container, { flex: 1 })}>
			<View style={styles.containerStyle}>
				<TouchableWithoutFeedback>
					<SearchBar
						round
						searchIcon={{ size: 24 }}
						onChangeText={(text) => {
							searchFilterFunction(text);
						}}
						onClear={(text) => searchFilterFunction('')}
						placeholder='Type Here...'
						value={search}
					/>
				</TouchableWithoutFeedback>

				{showSearchResults ? (
					<FlatList
						data={filteredDataSource}
						//data={filteredDataSource.slice(0,5)}
						keyExtractor={(item, index) => index.toString()}
						ItemSeparatorComponent={ItemSeparatorView}
						maxToRenderPerBatch={15}
						//windowSize={5}
						renderItem={ItemView}
					/>
				) : null}
			</View>

			{props.isLoading ? (
				<ActivityIndicator style={styles.mapStyle} />
			) : (
				<MapView
					style={styles.mapStyle}
					provider={PROVIDER_DEFAULT}
					mapType={MAP_TYPES.NONE}
					initialRegion={INITIAL_REGION}
					rotateEnabled={false}
					clusterColor={'#FFA500'}
					clusterTextColor={'#000000'}
					maxZoomLevel={21}
					minZoomLevel={1}
					minZoom={0}
					maxZoom={19}
					minPoints={5}
					flex={1}
				>
					<UrlTile
						urlTemplate={urlTemplate}
						shouldReplaceMapContent={true}
						maximumZ={19}
						minimumZ={0}
						maxZoomLevel={19}
						minZoomLevel={0}
						zIndex={1}
					/>
					{props.stories.map((item, i) => {
						let pinType = '';
						switch (item.category) {
							case 1:
								pinType = PERSONAL_PIN;
								break;
							case 2:
								pinType = COMMUNITY_PIN;
								break;
							default:
								pinType = HISTORICAL_PIN;
						}
						return (
							<Marker
								key={i}
								coordinate={{
									latitude: parseFloat(item.latitude),
									longitude: parseFloat(item.longitude),
								}}
								title={item.title}
								image={pinType}
								onPress={() => {
									props.navigation.navigate('Story', {
										title: item.title,
										description: item.description,
										id: item.id
									});
								}}
							/>
						);
					})}
				</MapView>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	containerStyle: {
		backgroundColor: 'white',
		alignItems: 'stretch',
	},
	itemStyle: {
		padding: 5,
	},
	container: {
		flex: 1,
		backgroundColor: colors.black,
		alignItems: 'center',
		justifyContent: 'center',
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height,
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
});

const mapStateToProps = (state) => {
	return {
		isLoading: state.storyReducer.isLoading,
		stories: state.storyReducer.storyList,
		error: state.storyReducer.error,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadStories: () => dispatch(loadStories()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DarkMapScreen);
