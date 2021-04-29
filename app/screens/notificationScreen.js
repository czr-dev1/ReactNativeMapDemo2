import React from 'react';
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
import { connect } from 'react-redux';

// Icons
import { FontAwesome5 } from '@expo/vector-icons';

import Text from "../components/text";
import colors from '../config/colors';

const ItemCard = ({ item }) => {
	console.log(item);
	let d = new Date(item.time * 1);
	return (
		<TouchableWithoutFeedback>
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
							{item.username}
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
					ListEmptyComponent={listEmptyComponent}
					style={{ width: Dimensions.get('window').width}}
					data={props.notificationList}
					renderItem={renderItem}
					keyExtractor={(item) => '' + item.time}
				/>
			</ScrollView>
		</SafeAreaView>
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
		notificationList: state.authReducer.notificationList,
	};
};

export default connect(mapStateToProps)(NotificationScreen);
