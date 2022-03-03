import React, { useEffect, useState } from 'react';
import {
	Dimensions,
	FlatList,
	ScrollView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { connect } from 'react-redux';
import * as Notifications from 'expo-notifications';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

import Text from "../components/text";
import colors from '../config/colors';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { Footer } from 'native-base';

const ItemCard = ({ item }, props) => {
	const navigation = useNavigation();
	console.log(item);
	let d = new Date(item.time * 1);
	return (
		<TouchableWithoutFeedback
			onPress={() => {
				navigation.navigate("Story", {id: item.storyId})
			}}
		>
			<Card containerStyle={[{ borderRadius: 14, marginBottom: 12 }, styles.shadow2]}>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<View style={{ padding: 12 }}>
						<FontAwesome5 name='comment-alt' size={32} color='black' />
					</View>
					<View
						style={{
							flexDirection: 'column',
							justifyContent: 'space-evenly',
							paddingLeft: 12
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 14,
								color: colors.black
							}}
						>
							{item.isAnonNotif ? "anonymous" : item.username}
						</Text>
						<Text style={{}}>
							{d.getMonth() + 1}/{d.getDate()}/{d.getFullYear()}
						</Text>
					</View>
				</View>
			</Card>
		</TouchableWithoutFeedback>
	);
};

function NotificationScreen(props) {
	const renderItem = ({ item }) => {
		const backgroundColor = 'white';
		return <ItemCard item={item} style={{ backgroundColor }} />;
	};

	const listEmptyComponent = () => {
		return (
			<View
				style={{
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					paddingTop: 20,
					paddingBottom: "100%",
				}}
			>
				<Text style={{}}>nothing to show here yet</Text>
			</View>
		);
	};

	return (
		<View style={{
			flex: 1,
			alignItems: 'center',
			justifyContent: 'space-around',
			backgroundColor: colors.border,
		}}>
		<View
					style={[{
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						backgroundColor: colors.purple,
					}, styles.shadow2]}
				>
					<Text
						style={{
							fontSize: 18,
							paddingTop: '26.3%',
							paddingBottom: '10%',
							// marginTop: '25%',
							color: colors.white,
							fontWeight: 'bold',
						}}
					>
						notifications
					</Text>
				</View>
		<SafeAreaView>
		{/* Do not remove ListHeaderComponent and Footer Component. 
		This is the correct way to implement to make a FlatList Scrollable*/}
				<FlatList
				ListHeaderComponent={
					<></>
				}
					ListEmptyComponent={listEmptyComponent}
					style={{ width: Dimensions.get('window').width, marginTop: '9.5%', backgroundColor: colors.background}}
					data={props.notificationList}
					renderItem={renderItem}
					keyExtractor={(item) => '' + item.time}
				ListFooterComponent={
					<></>
				}/>
		</SafeAreaView>
		</View>
	);
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
});

const mapStateToProps = (state) => {
	// console.log(state.authReducer.notificationList);
	return {
		notificationList: state.authReducer.notificationList.reverse(),
	};
};

export default connect(mapStateToProps)(NotificationScreen);
