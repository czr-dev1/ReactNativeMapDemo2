import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	Dimensions,
	Image,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { loadStories } from '../redux/actions/storyActions';
import axios from 'axios';
//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// redux
import { followUser, unfollowUser } from '../redux/actions/authActions';

import colors from '../config/colors';
//profile picture
const PROFILE_PIC = require('../assets/profile_blank.png');

//story component
import PlainStoryList from '../components/plainStoryList';
import BadgeList from '../components/badgeList';


function FollowingProfileScreen(props) {
  const { user } = props.route.params;
  const [selectedButton, setSelectedButton] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const renderStoriesByType = () => {
    switch (selectedButton){
      case 1:
        return <BadgeList />
      default:
        return <PlainStoryList stories={data.userStories} />
      }
  }

  useEffect(() => {
		let isMounted = true; // note this flag denotes mount StatusBar
		const config = {
			headers: {
				"X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
			},
		};

		//username can be changed if you want
		axios.get(`https://globaltraqsdev.com/api/profile/users/?username=${user}`, config)
		.then((res) => {
			if (isMounted) {
				setData(res.data[0]);
				setLoading(false);
			}
		}).catch((err) => {
			console.log(err);
		});
		return () => { isMounted = false };
  }, [])

  const getUser = async () => {

  }

	const follow = () => {
		let list = props.followingList;
		list.push(data.id);
		list = {
			list: list,
			id: props.userId
		};
		console.log("fp: ", list);
		props.followUser(list);
	};

	const unfollow = () => {
		let list = props.followingList;
		list.filter(item => item !== data.id);
		list = {
			list: list,
			id: props.userId
		};
		//props.unfollowUser(list);
	};

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return(
      <SafeAreaView style={{backgroundColor: 'white'}} forceInset={{top: "always"}}>
        <View style={styles.profileBar}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.nicknameText}>{user}</Text>
          </View>
          <View style={styles.profileImageContainer}>
						<FontAwesome name="bookmark-o" size={24} color="white" />
						<Image style={styles.profileImage} source={(data.profileurl !== null) ? {uri: data.profileurl} : PROFILE_PIC}/>
						{
							(props.followingList.includes(data.id)) ? (
								<TouchableWithoutFeedback>
									<FontAwesome name="bookmark" size={32} color="black" />
								</TouchableWithoutFeedback>
							) : (
								<TouchableWithoutFeedback onPress={() => follow()}>
									<FontAwesome name="bookmark-o" size={32} color="black" />
								</TouchableWithoutFeedback>
							)
						}
          </View>
          <View style={styles.bioContainter}>
            <Text style={{fontWeight: 'bold', color: 'grey'}}>bio</Text>
            <Text>{data.bio}</Text>
          </View>
        </View>
        <View style={styles.profileStoryButtons}>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
            <View style={selectedButton === 0 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
              <MaterialIcons name="format-list-bulleted" size={32} color="black" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
            <View style={selectedButton === 1 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
              <Feather name="target" size={32} color="black" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.storyList}>
          {renderStoriesByType()}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  profileBar: {
    width: Dimensions.get('window').width,
    paddingLeft: '10%',
    paddingRight: '10%',
    height: '20%'
  },
  nicknameContainer: {
    alignItems: 'center',
    paddingBottom: '5%',
  },
  nicknameText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'grey'
  },
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '40%',
  },
  profileImage: {
    borderRadius: 200,
    resizeMode: 'center',
    height: '100%',
    width: '30%'
  },
  bioContainter: {
    paddingTop: '5%',
    paddingBottom: '5%'
  },
  profileStoryButtons: {
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderTopColor: '#eae6e5',
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStorySelectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: '2%'
  },
  profileStoryUnselectedButton: {
    alignItems: 'center',
    flexGrow: 1
  },
  storyList: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eae6e5',
    width: Dimensions.get('window').width,
    height: '80%'
  },
  navButton: {
    flexGrow: 1,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 10,
    width: '80%'
  },
  requiredText: {
    color: 'red'
  }
})

const mapStateToProps = (state) => {
	console.log('followingList fp: ', state.authReducer.followingList);
  return{
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error,
		followingList: state.authReducer.followingList,
		userId: state.authReducer.user.id
  }
}

const mapDispatchToPros = (dispatch) => {
	return {
		followUser: (item) => dispatch(followUser(item)),
		unfollowUser: (item) => dispatch(unfollowUser(item)),
	}
}

export default connect(mapStateToProps, mapDispatchToPros)(FollowingProfileScreen);
