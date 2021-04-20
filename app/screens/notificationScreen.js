import React from 'react';
import {
	Dimensions,
	FlatList,
	ScrollView,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

import colors from '../config/colors';

const ItemCard = ({ item }) => {
	console.log(item);
	let d = new Date(item.time * 1);
	return (
		<TouchableWithoutFeedback>
			<Card containerStyle={{ borderRadius: 14 }}>
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
							{item.username}
						</Text>
						<Text>
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

	return (
		<SafeAreaView
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'space-around',
				backgroundColor: colors.border,
			}}
		>
			<ScrollView>
				<View
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						width: '100%',
						backgroundColor: colors.purple,
					}}
				>
					<Text
						style={{
							fontSize: 18,
							paddingTop: 24,
							paddingBottom: 24,
							color: colors.white,
							fontWeight: 'bold',
						}}
					>
						notifications
					</Text>
				</View>
				<FlatList
					style={{ width: Dimensions.get('window').width }}
					data={props.notificationList}
					renderItem={renderItem}
					keyExtractor={(item) => '' + item.time}
				/>
			</ScrollView>
		</SafeAreaView>
	);
}

const mapStateToProps = (state) => {
	// console.log(state.authReducer.notificationList);
	return {
		notificationList: state.authReducer.notificationList,
	};
};

export default connect(mapStateToProps)(NotificationScreen);
