import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Switch } from 'react-native-switch';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import { loadStories } from '../redux/actions/storyActions';

//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import colors from '../config/colors';

//profile picture
const PROFILE_PIC = require('../assets/profile_blank.png');

//story component
import StoryList from '../components/storyList';


function ProfileScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const [tempStories, setTempStories] = useState([]);

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

  useEffect(() => {}, []);

  return(
    <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
      <ScrollView>
        <View style={styles.profileBar}>
          <View style={styles.nicknameContainer}>
            <Text style={styles.nicknameText}>{props.user}</Text>
          </View>
          <View style={{alignItems: 'flex-end', marginBottom: -48}} >
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Badges')}>
              <Feather name="target" size={48} color="#919191" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.profileImageContainer}>
            <Image style={styles.profileImage} source={{uri: props.profileImage}}/>
            <TouchableWithoutFeedback  onPress={() => props.navigation.navigate('EditProfileModal')}>
              <FontAwesome5 style={{marginTop: -25, marginLeft: 96, marginBottom: 25}} name="pencil-alt" size={24} color="#919191" />
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.bioContainter}>
            <Text style={{fontWeight: 'bold', color: 'grey', fontSize: 18}}>bio</Text>
            <Text style={{fontSize: 14}}>{props.bio}</Text>
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
              <MaterialIcons name="chat-bubble-outline" size={32} color="green" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
            <View style={selectedButton === 2 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
              <MaterialIcons name="chat-bubble-outline" size={32} color="pink" />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
            <View style={selectedButton === 3 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
              <MaterialIcons name="chat-bubble-outline" size={32} color="blue" />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.storyList}>
          {renderStoriesByType()}
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
  },
  profileBar: {
    width: Dimensions.get('window').width,
    paddingLeft: '10%',
    paddingRight: '10%',
  },
  nicknameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingBottom: 5,
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
  profileStoryButtons: {
    width: Dimensions.get('window').width,
    borderTopWidth: 0,
    borderTopColor: '#eae6e5',
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStorySelectedButton: {
    borderBottomWidth: 5,
    borderBottomColor: '#919191',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: 15
  },
  profileStoryUnselectedButton: {
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
  console.log(state.authReducer);
  return{
    isLoading: state.storyReducer.isLoading,
    stories: state.authReducer.userStories,
    error: state.storyReducer.error,
    user: state.authReducer.username,
    bio: state.authReducer.bio,
    profileImage: state.authReducer.extra[0].profileurl

  }
}

export default connect(mapStateToProps)(ProfileScreen);
