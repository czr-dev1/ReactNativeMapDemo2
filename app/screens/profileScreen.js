import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Switch } from 'react-native-switch';
import { Card } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { loadStories } from '../redux/actions/storyActions';
import { userSelfDelete } from '../redux/actions/authActions';

//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

// profile picture
const PROFILE_PIC = require('../assets/profile_blank.png');

//story component
import StoryList from '../components/storyList';

function ProfileScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const [tempStories, setTempStories] = useState([]);
  const insets = useSafeAreaInsets();

  const renderStoriesByType = () => {
    let list = {};
    switch (selectedButton){
      case 1:
        list = props.stories.filter(item => item.category === 1);
        return <StoryList stories={props.stories.filter(item => item.category === 1)} />
        break;
      case 2:
        list = props.stories.filter(item => item.category === 2);
        return <StoryList stories={props.stories.filter(item => item.category === 2)} />
        break;
      case 3:
        list = props.stories.filter(item => item.category === 3);
        return <StoryList stories={props.stories.filter(item => item.category === 3)} />
        break;
      default:
        list = props.stories
        return <StoryList stories={props.stories} />
      }
  }

  const deleteConfirm = () => {
    Alert.alert('', 'are you sure you want to delete your profile?',
    [
      {
        text: 'cancel',
        onPress: () => navigation.navigate('Profile'),
        style: 'cancel'
      },
      {
        text: 'yes, delete my profile',
        onPress: () => dispatch(userSelfDelete()),
      }
    ])
  };

  // Removing the paddingTop property on the outter view will cause it to shift
  // the whole screen up, I konw its a bit hacky but without subtracting it leaves
  // a large gap, it used to be the SafeAreaView from this library but it wasn't
  // working correctly after a merge so I changed it to useSafeAreaInsets
  // https://reactnavigation.org/docs/handling-safe-area/
	return (
		<View style={styles.container, {paddingTop: insets.top - insets.top}}>
			<View style={styles.profileBar}>
        <View style={{flexDirection:'row-reverse', width: '100%', marginBottom: '-15%', marginTop: '10%'}}>
          <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Badge')}>
            <Feather name="target" size={48} color="black" />
          </TouchableWithoutFeedback>
        </View>
				<View style={styles.profileImageContainer}>
					<Image style={styles.profileImage} source={{uri: props.profileImage}} />
          <TouchableWithoutFeedback  onPress={() => props.navigation.navigate('EditProfileModal')}>
              <FontAwesome5 style={{marginTop: -25, marginLeft: 96, marginBottom: 25}} name="pencil-alt" size={24} color="#919191" />
            </TouchableWithoutFeedback>
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
      <Button title='delete account' onPress={() => deleteConfirm()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileBar: {
    width: Dimensions.get('window').width,
    paddingLeft: '10%',
    paddingRight: '10%',
    backgroundColor: 'white',
  },
  nicknameContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  nicknameText: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'grey'
  },
  profileImageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileImage: {
    borderRadius: 200,
    resizeMode: 'center',
    height: 128,
    width: 128
  },
  bioContainter: {
    paddingTop: 15,
    paddingBottom: 15
  },
  storyButtons: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderTopColor: '#eae6e5',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  storySelectedButton: {
    borderBottomWidth: 5,
    borderBottomColor: '#919191',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 15
  },
  storyUnselectedButton: {
    alignItems: 'center',
    flexGrow: 1
  },
  storyList: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    width: Dimensions.get('window').width,
    height: '100%'
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
  return{
    isLoading: state.storyReducer.isLoading,
    stories: state.authReducer.user.userStories,
    error: state.storyReducer.error,
    user: state.authReducer.username,
    bio: state.authReducer.user.bio,
    profileImage: state.authReducer.user.profileurl

  }
}


export default connect(mapStateToProps)(ProfileScreen);
