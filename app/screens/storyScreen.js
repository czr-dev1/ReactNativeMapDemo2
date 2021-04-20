import React, { useEffect, useState } from 'react';
import { 
  Dimensions, 
  Platform, 
  SafeAreaView, 
	ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
	TextInput, 
	TouchableOpacity, 
	TouchableWithoutFeedback, 
	View, 
} from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-native-modal';
import RadioButtonRN from 'radio-buttons-react-native';

// Icons
import { FontAwesome, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// Redux
import { loadStories } from '../redux/actions/storyActions';
import { reloadUser } from '../redux/actions/authActions';

import colors from '../config/colors';

const PROFILE_PIC = require('../assets/profile_blank.png');

function StoryScreen(props) {
	const { title, description, id } = props.route.params;
	const [story, setStory] = useState({});
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [data, setData] = useState([]);
	const [userComment, setUserComment] = useState('');
	const [showFlagModal, setShowFlagModal] = useState(false);
	const [showOptionsModal, setShowOptionsModal] = useState(false);
	const [flagReason, setFlagReason] = useState('');
	const [flagType, setFlagType] = useState(1);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [comments, setComments] = useState([{
		'commenter': 0,
		'description': '',
		'id': 0,
		'is_anonymous_comment': false,
		'pin': 0,
		'usename': '',
	}]);

	useEffect(() => {
		getStory();
		getProfile();
	}, []);

	const getStory = () => {
		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			}
		};

		let tempStory = props.stories.filter(i => i.id === id);
		// This will get overwritten once the axios call is completed
		// without it, there's a crash
		setStory(tempStory[0]);
		setComments(tempStory[0].commentstory);

		axios.get(`https://globaltraqsdev.com/api/pins/${id}/`, config)
		.then((res) => {
			setStory(res.data);
			setComments(res.data.commentstory);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const getProfile = () => {
		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			}
		};

		axios.get(`https://globaltraqsdev.com/api/profile/users/?username=${props.username}`, config)
		.then((res) => {
			setData(res.data[0]);
			setIsLoadingProfile(false);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const flagStory = () => {
		let reportType = 0;
		switch (flagType.label) {
			case 'suspicious or spam':
				reportType = 1;
				break;
			case 'harassment':
				reportType = 2;
				break;
			case 'other':
				reportType = 3;
				break;
		}

		let flagData = {
			flagged: true,
			flagger: props.userId,
			pinId: id,
			reason: flagReason,
			reportType: reportType,
		};

		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			}
		};

		axios.post(`https://globaltraqsdev.com/api/flagStory/`, flagData, config)
		.then((res) => {
			console.log(res.data);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const comment = () => {
		let data = {
			commenter: props.userId,
			description: userComment,
			is_anonymous_pin: props.isPrivacyMode,
			pin: id,
		};

		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			}
		};

		axios.post(`https://globaltraqsdev.com/api/commentStory/`, data, config)
		.then((res) => {
			getStory();
			props.loadStories();
			setUserComment('');
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const bookmark = () => {
		let data = {
			upvote: true,
			pinId: id,
			upVoter: props.userId,
		};

		const config = {
			headers: {
				'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
			}
		};

		axios.post(`https://globaltraqsdev.com/api/upVoteStory/`, data, config)
		.then((res) => {
			props.loadStories();
			props.reloadUser(props.username);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const modalOptions = [
		{
			label: 'suspicious or spam',
			accessibilityLabel: 'suspicious or spam'
		},
		{
			label: 'harassment',
			accessibilityLabel: 'harassment'
		},
		{
			label: 'other',
			accessibilityLabel: 'other'
		},
	]

	return (
		<SafeAreaView style={styles.container}>
			<Modal
				style={{ justifyContent: 'flex-end', margin: 0 }}
				isVisible={showFlagModal}
				onBackdropPress={() => setShowFlagModal(false)}
				onBackButtonPress={() => {
					setShowFlagModal(false);
					setShowOptionsModal(true);
				}}
			>
				<View style={{ backgroundColor: 'white', borderRadius: 10, padding: 14 }}>
					<View>
						<RadioButtonRN
							data={modalOptions}
							selectedBtn={(e) => setFlagType(e)}
							icon={<FontAwesome name='check' size={24} color='black' />}
							boxStyle={{ borderRadius: 0 }}
						/>
						<TextInput
							style={styles.box}
							placeholder='explain your reason'
							multiline
							onChangeText={(val) => {
								setFlagReason(val);
							}}
						/>
						<View style={{ flexDirection: 'row-reverse' }}>
							<TouchableOpacity
								style={{ borderRadius: 5, borderColor: '#ddd', borderWidth: 2 }}
								onPress={() => {
									flagStory();
									setShowFlagModal(false);
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
									submit
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<Modal
				isVisible={showOptionsModal}
				onBackdropPress={() => setShowOptionsModal(false)}
				onBackButtonPress={() => setShowOptionsModal(false)}
				style={{ justifyContent: 'flex-end', margin: 0 }}
			>
				<View style={{ backgroundColor: 'white', borderRadius: 10, padding: 14 }}>
					<View>
						<TouchableOpacity
							style={{ flexDirection: 'row', padding: 18 }}
							onPress={() => {
								setShowOptionsModal(false);
								bookmark();
							}}
						>
							<FontAwesome name='bookmark' size={24} color='black' style={{ paddingRight: 14 }} />
							<Text style={{ fontSize: 18 }}>bookmark post</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={{ flexDirection: 'row', padding: 18 }}
							onPress={() => {
								setShowOptionsModal(false);
								setShowFlagModal(true);
							}}
						>
							<FontAwesome name='flag' size={24} color='black' style={{ paddingRight: 14 }} />
							<Text style={{ fontSize: 18 }}>flag post</Text>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<ScrollView
				style={{ width: '100%' }}
				keyboardShouldPersistTaps='handled'
				showsVerticalScrollIndicator={false}
			>
				<View
					style={{
						paddingTop: '40%',
						backgroundColor:
							story.category === 1 ? '#E01784' : story.category === 2 ? '#00CE7D' : '#248DC1',
					}}
				>
					<View
						style={{
							backgroundColor: 'white',
							paddingTop: '20%',
							borderTopLeftRadius: 300,
							borderTopRightRadius: 300,
						}}
					></View>
				</View>

				<View
					style={{
						width: '100%',
						paddingLeft: '10%',
						paddingRight: '10%',
						backgroundColor: 'white',
					}}
				>
					<View
						style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
					>
						<View style={{ flexDirection: 'row', alignItems: 'center' }}>
							<MaterialIcons name='message' size={24} color='black' />
							<TouchableWithoutFeedback
								onPress={() => {
									if (!story.is_anonymous_pin) {
										props.navigation.navigate('UserProfileModal', { user: story.username });
									}
								}}
							>
								<Text
									style={{
										paddingLeft: 5,
										marginBottom: 12,
										color: '#787878',
										fontSize: 18,
										fontWeight: 'bold',
									}}
								>
									{story.is_anonymous_pin ? 'anonymous' : story.username}
								</Text>
							</TouchableWithoutFeedback>
						</View>
						{props.isLoggedIn === true ? (
							<FontAwesome5
								name='ellipsis-v'
								size={24}
								color='black'
								onPress={() => setShowOptionsModal(true)}
							/>
						) : null}
					</View>
					<View style={{ paddingLeft: '5%' }}>
						<Text 
							style={{ 
								color: '#787878',
								fontWeight: 'bold', 
								fontSize: 24, 
								marginBottom: 12 
							}}
						>
							{story.title}
						</Text>
						{story.address === '' ? null : (
							<Text 
								style={{ 
									color: '#787878', 
									fontWeight: 'bold' 
								}}
							>
								{story.address}
							</Text>
						)}
						<View 
							style={{ 
								flexDirection: 'row', 
								paddingBottom: 5, 
								marginBottom: 12 
							}}
						>
							{story.locality === '' ? null : (
								<Text style={{ color: '#787878', fontWeight: 'bold' }}>
									{story.locality}
								</Text>
							)}
							{story.region === '' ? null : (
								<Text style={{ color: '#787878', fontWeight: 'bold' }}> {story.region}</Text>
							)}
						</View>
						<Text 
							style={{ 
								paddingBottom: 5, 
								marginBottom: 12 
							}}
						>
							{story.startDate === null
								? story.postDate
								: story.endDate === null
								? story.startDate
								: story.startDate + ' - ' + story.endDate}
						</Text>
						<Text style={{ marginBottom: 12 }}>{story.description}</Text>
					</View>
				</View>

				<View
					style={{
						width: '100%',
						paddingLeft: '7%',
						paddingRight: '10%',
						backgroundColor: 'white',
					}}
				>
					{props.isLoggedIn === true ? (
						<View>
							<TextInput
								style={styles.box}
								multiline
								placeholder='enter comment'
								defaultValue={userComment}
								onChangeText={(val) => {
									setUserComment(val);
								}}
							/>
							<View style={{ flexDirection: 'row-reverse', padding: 14 }}>
								<TouchableOpacity
									style={{ 
										borderRadius: 5, 
										borderColor: '#ddd', 
										borderWidth: 2, 
										width: 'auto' 
									}}
									onPress={() => {
										comment();
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
										comment
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					) : (
						<View style={{ padding: 18 }}></View>
					)}

					{comments.map((comment, i) => {
						return (
							<View
								key={i}
								style={{ 
									justifyContent: 'space-between', 
									padding: 14, 
									marginBottom: 48 
								}}
							>
								<TouchableOpacity
									onPress={() =>
										props.navigation.navigate('UserProfileModal', { user: comment.username })
									}
								>
									<Text style={{ fontWeight: 'bold', paddingBottom: 12 }}>{comment.username}</Text>
								</TouchableOpacity>
								<Text style={{ paddingBottom: 12 }}>{comment.description}</Text>
								{props.isLoggedIn === true ? (
									<View style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
										<TouchableOpacity>
											<FontAwesome name='flag' size={24} color='black' />
										</TouchableOpacity>
									</View>
								) : null}
							</View>
						);
					})}
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
	box: {
		borderWidth: 2,
		borderColor: '#ddd',
		borderRadius: 14,
		paddingTop: 18,
		paddingBottom: 18,
		paddingRight: 32,
		paddingLeft: 32,
		margin: 6,
		alignItems: 'center',
	},
});

const mapStateToProps = (state) => {
	let userId = state.authReducer.isLoggedIn === true ? state.authReducer.user.id : -1;
	// Causes issues if you're logged out, logged out users cannot set privacy settings
	return {
		isLoading: state.storyReducer.isLoading,
		stories: state.storyReducer.storyList,
		error: state.storyReducer.error,
		isLoggedIn: state.authReducer.isLoggedIn,
		isPrivacyMode: state.authReducer.isPrivacyMode,
		userId: userId,
		profileImage: state.authReducer.user.profileurl,
		userBookmarks: state.authReducer.user.user_upvoted_stories,
		username: state.authReducer.user.username,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		loadStories: () => dispatch(loadStories()),
		reloadUser: (username) => dispatch(reloadUser(username)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryScreen);
