import React, { useState } from 'react';
import {
	Button,
	Dimensions,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

// icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';

// profile picture
const PROFILE_PIC = require('../assets/profile_blank.png');

// story component
import StoryList from '../components/storyList';

function ProfileScreen(props) {
	const dispatch = useDispatch();

	const [selectedButton, setSelectedButton] = useState(0);
	const renderStoriesByType = () => {
		switch (selectedButton) {
			case 1:
				return <StoryList stories={props.stories.slice(1, 3)} />;
			case 2:
				return <StoryList stories={props.stories.slice(3, 6)} />;
			case 3:
				return <StoryList stories={props.stories.slice(0, 10)} />;
			default:
				return <StoryList stories={props.userPost} />;
		}
	};

	return (
		<SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
			<View style={styles.profileBar}>
				<View style={styles.nicknameContainer}>
					<Text style={styles.nicknameText}>{props.user}</Text>
				</View>
				<View style={styles.profileImageContainer}>
					<Image style={styles.profileImage} source={PROFILE_PIC} />
					<FontAwesome5 style={{ marginLeft: '-7%' }} name='pencil-alt' size={24} color='black' />
				</View>
				<View style={styles.bioContainter}>
					<Text style={{ fontWeight: 'bold', color: 'grey' }}>bio</Text>
					<Text>{props.bio}</Text>
				</View>
			</View>
			<View style={styles.storyButtons}>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
					<View
						style={selectedButton === 0 ? styles.storySelectedButton : styles.storyUnselectedButton}
					>
						<MaterialIcons name='format-list-bulleted' size={32} color='black' />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
					<View
						style={selectedButton === 1 ? styles.storySelectedButton : styles.storyUnselectedButton}
					>
						<MaterialIcons name='chat-bubble-outline' size={32} color='pink' />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
					<View
						style={selectedButton === 2 ? styles.storySelectedButton : styles.storyUnselectedButton}
					>
						<MaterialIcons name='chat-bubble-outline' size={32} color='green' />
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
					<View
						style={selectedButton === 3 ? styles.storySelectedButton : styles.storyUnselectedButton}
					>
						<MaterialIcons name='chat-bubble-outline' size={32} color='blue' />
					</View>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.storyList}>{renderStoriesByType()}</View>

			<TouchableWithoutFeedback onPress={() => dispatch(logout())}>
				<View style={styles.logoutBtn}>
					<Text>Logout</Text>
				</View>
			</TouchableWithoutFeedback>

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
	profileBar: {
		width: Dimensions.get('window').width,
		paddingLeft: '10%',
		paddingRight: '10%',
		height: '25%',
	},
	nicknameContainer: {
		alignItems: 'center',
		paddingBottom: '5%',
	},
	nicknameText: {
		fontWeight: 'bold',
		fontSize: 24,
		color: 'grey',
	},
	profileImageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		height: '40%',
	},
	profileImage: {
		borderRadius: 200,
		resizeMode: 'center',
		height: '100%',
		width: '30%',
	},
	bioContainter: {
		paddingTop: '3%',
		paddingBottom: '10%',
	},
	storyButtons: {
		width: Dimensions.get('window').width,
		borderTopWidth: 1,
		borderTopColor: '#eae6e5',
		paddingTop: '2%',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	storySelectedButton: {
		borderBottomWidth: 2,
		borderBottomColor: 'black',
		alignItems: 'center',
		flexGrow: 1,
		paddingBottom: '2%',
	},
	storyUnselectedButton: {
		alignItems: 'center',
		flexGrow: 1,
	},
	storyList: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#eae6e5',
		width: Dimensions.get('window').width,
		height: '65%',
	},
	navButton: {
		flexGrow: 1,
		textAlign: 'center',
	},
	input: {
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 6,
		padding: 10,
		fontSize: 10,
		width: '80%',
	},
	requiredText: {
		color: 'red',
	},
	logoutBtn: {
		fontSize: 18,
		paddingTop: 20
	},
});

const mapStateToProps = (state) => {
	return {
		isLoading: state.storyReducer.isLoading,
		stories: state.storyReducer.storyList,
		error: state.storyReducer.error,
		user: state.profileReducer.profileData.user.username,
		bio: state.profileReducer.profileData.user.bio,
    userPost: state.profileReducer.profileData.user.userStories,
    token: state.profileReducer.profileData.token,
	};
};

export default connect(mapStateToProps)(ProfileScreen);
