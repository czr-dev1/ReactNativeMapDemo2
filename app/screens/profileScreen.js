import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback,
  Dimensions, View, Image, StatusBar, Button} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { loadStories } from '../redux/actions/storyActions';
//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';
//profile picture
const PROFILE_PIC = require('../assets/profile_blank.png');

//story component
import StoryListScreen from './StoryListScreen';
import StoryList from '../components/storyList';


function ProfileScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const renderStoriesByType = () => {
    switch (selectedButton){
      case 1:
        return <StoryList stories={props.stories.slice(1, 3)} />
      case 2:
        return <StoryList stories={props.stories.slice(3, 5)} />
      case 3:
        return <StoryList stories={props.stories.slice(0, 10)} />
      default:
        return <StoryList stories={props.stories.slice(10, 20)} />
      }
  }

  useEffect(() => {

  }, []);

  return(
    <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
      <View style={styles.profileBar}>
        <View style={styles.profileImageContainer}>
          <Image style={styles.profileImage} source={PROFILE_PIC}/>
          <FontAwesome5 style={{marginLeft: '-7%'}} name="pencil-alt" size={24} color="black" />
        </View>
        <View style={styles.bioContainter}>
          <Text style={{fontWeight: 'bold', color: 'grey'}}>bio</Text>
          <Text>labore minim nisi esse quem anim ipsum fore malis sunt nisi labore esse tempor
          sint dolore quis fugiat enim amet</Text>
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
    justifyContent: 'center',
    alignItems: 'flex-end',
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
  return{
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error
  }
}

export default connect(mapStateToProps)(ProfileScreen);
