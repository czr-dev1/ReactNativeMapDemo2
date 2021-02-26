import React from 'react';
import { 
  Dimensions, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text 
} from 'react-native';

import colors from '../config/colors';

function StoryScreen(props) {
	const { title, description } = props.route.params;

	return (
		<SafeAreaView style={styles.container}>
			<Text style={{ fontWeight: 'bold', marginBottom: 10 }}>{title}</Text>
			<Text style={styles.body}>{description}</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: '95%',
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
	body: {
		width: '85%',
	},
});

export default StoryScreen;
