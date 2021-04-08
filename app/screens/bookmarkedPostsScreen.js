import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ActivityIndicator, TouchableWithoutFeedback,
  Dimensions, View, Image, StatusBar, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import axios from 'axios';

//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';
//Custom story component
import StoryList from '../components/storyList';
import { reloadUser } from '../redux/actions/auth';

function BookmarkedPostsScreen(props) {
  const [selectedButton, setSelectedButton] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const renderStoriesByType = () => {
    console.log(props.stories);
    console.log(props);
    if (props.stories === undefined) {
      return <StoryList isBookMark={true} stories={props.stories} />
    }

    switch (selectedButton){
      case 1:
        return <StoryList isBookMark={true} stories={props.stories.filter(item => item.category === "1")} />
      case 2:
        return <StoryList isBookMark={true} stories={props.stories.filter(item => item.category === "2")} />
      case 3:
        return <StoryList isBookMark={true} stories={props.stories.filter(item => item.category === "3")} />
      default:
        return <StoryList isBookMark={true} stories={props.stories} />
      }
  }

  useEffect(() => {
    console.log('-----------------------------------------------------------s');
    console.log(props.user);
    props.reloadUser(props.user);
  }, []);

  const loadProfile = async () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios.get(`https://globaltraqsdev.com/api/profile/users/?username=${props.user}`, config)
    .then((res) => {
      console.log(res.data);
      setData(res.data[0])
    }).catch((err) => {
      console.log(err);
    })
  }

  return(
    ( props.isLoading ) ?
      <View><Text>Loading</Text></View> : (
    <View style={{height: '100%'}}>

    <View style={styles.profileStoryButtons}>
      <TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
        <View style={selectedButton === 0 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
          <MaterialIcons name="format-list-bulleted" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setSelectedButton(1)}>
        <View style={selectedButton === 1 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
          <Text style={styles.textStyle}>personal</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setSelectedButton(2)}>
        <View style={selectedButton === 2 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
          <Text style={styles.textStyle}>historical</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setSelectedButton(3)}>
        <View style={selectedButton === 3 ? styles.profileStorySelectedButton : styles.profileStoryUnselectedButton}>
          <Text style={styles.textStyle}>resource</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
    <View style={styles.storyList}>
      {renderStoriesByType()}
    </View>
    </View>
  )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileStoryButtons: {
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderTopColor: '#eae6e5',
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white'
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
  },
  textStyle: {
    fontSize: 18
  }
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    error: state.storyReducer.error,
    user: state.authReducer.user.username,
    stories: state.authReducer.user.user_upvoted_stories,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedPostsScreen);