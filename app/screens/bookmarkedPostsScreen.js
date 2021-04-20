import React, { useEffect, useState } from 'react';
import { 
  Dimensions, 
  StyleSheet, 
  Text, 
  TouchableWithoutFeedback, 
  View 
} from 'react-native';
import { connect } from 'react-redux';

// Redux
import { reloadUser } from '../redux/actions/authActions';

// Custom story component
import StoryList from '../components/storyList';

import colors from '../config/colors';

function BookmarkedPostsScreen(props) {
	const [selectedButton, setSelectedButton] = useState(0);
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const renderStoriesByType = () => {
		// console.log(props.stories);
		// console.log(props);
		if (props.stories === undefined) {
			return <StoryList isBookMark={true} stories={props.stories} />;
		}

		switch (selectedButton) {
			case 1:
				return (
					<StoryList
						isBookMark={true}
						stories={props.stories.filter((item) => item.category === '1')}
					/>
				);
			case 2:
				return (
					<StoryList
						isBookMark={true}
						stories={props.stories.filter((item) => item.category === '2')}
					/>
				);
			case 3:
				return (
					<StoryList
						isBookMark={true}
						stories={props.stories.filter((item) => item.category === '3')}
					/>
				);
			default:
				return <StoryList isBookMark={true} stories={props.stories} />;
		}
	};

	useEffect(() => {
		// console.log('-----------------------------------------------------------s');
		// console.log(props.user);
		props.reloadUser(props.user);
	}, []);

	// const loadProfile = async () => {
	// 	const config = {
	// 		headers: {
	// 			'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
	// 		},
	// 	};

	// 	//username can be changed if you want
	// 	axios
	// 		.get(`https://globaltraqsdev.com/api/profile/users/?username=${props.user}`, config)
	// 		.then((res) => {
	// 			// console.log(res.data);
	// 			setData(res.data[0]);
	// 		})
	// 		.catch((err) => {
	// 			console.log(err);
	// 		});
	// };

	return props.isLoading ? (
		<View>
			<Text>Loading</Text>
		</View>
	) : (
		<View style={{ height: '100%' }}>
			<View style={styles.profileStoryButtons}>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
					<View
						style={
							selectedButton === 0
								? styles.profileStorySelectedButton
								: styles.profileStoryUnselectedButton
						}
					>
						<Text style={styles.textStyle}> all </Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
					<View
						style={
							selectedButton === 1
								? styles.profileStorySelectedButton
								: styles.profileStoryUnselectedButton
						}
					>
						<Text style={styles.textStyle}> personal </Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
					<View
						style={
							selectedButton === 2
								? styles.profileStorySelectedButton
								: styles.profileStoryUnselectedButton
						}
					>
						<Text style={styles.textStyle}> historical </Text>
					</View>
				</TouchableWithoutFeedback>
				<TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
					<View
						style={
							selectedButton === 3
								? styles.profileStorySelectedButton
								: styles.profileStoryUnselectedButton
						}
					>
						<Text style={styles.textStyle}> resources </Text>
					</View>
				</TouchableWithoutFeedback>
			</View>
			<View style={styles.storyList}>{renderStoriesByType()}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.background,
		alignItems: 'center',
		justifyContent: 'center',
	},
	profileStoryButtons: {
		width: Dimensions.get('window').width,
		borderTopWidth: 0,
		borderTopColor: colors.purple,
		paddingTop: '2%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: colors.purple,
	},
	profileStorySelectedButton: {
		borderBottomWidth: 4,
		borderBottomColor: colors.orange,
		alignItems: 'center',
		flexGrow: 1,
		paddingBottom: '2%',
	},
	profileStoryUnselectedButton: {
		alignItems: 'center',
		flexGrow: 1,
	},
	storyList: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.background,
		width: Dimensions.get('window').width,
		height: '100%',
	},
	textStyle: {
		color: colors.white,
		fontSize: 18,
	},
});

const mapStateToProps = (state) => {
	return {
		isLoading: state.storyReducer.isLoading,
		error: state.storyReducer.error,
		user: state.authReducer.user.username,
		stories: state.authReducer.user.user_upvoted_stories,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		reloadUser: (username) => dispatch(reloadUser(username)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedPostsScreen);
