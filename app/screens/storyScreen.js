import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  View,
  ScrollView,
  Button,
  Image
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { connect } from 'react-redux';
import { FontAwesome5, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import Modal from 'react-native-modal';

import { loadStories } from '../redux/actions/storyActions';
import colors from '../config/colors';
const PROFILE_PIC = require('../assets/profile_blank.png');

function storyScreen(props) {
  const { title, description, id } = props.route.params;
  const [story, setStory] = useState({});
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [data, setData] = useState([]);
  const [userComment, setUserComment] = useState([]);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [comments, setComments] = useState([{
      "commenter": 0,
      "description": "",
      "id": 0,
      "is_anonymous_comment": false,
      "pin": 0,
      "username": "",
    }]);

  useEffect(() => {
    getStory();
    getProfile();
  }, []);

  const getStory = () => {
    let tempStory = props.stories.filter(i => i.id === id);
    console.log(tempStory[0]);
    tempStory[0].commentstory.map((item, i) => {
      console.log(item.id);
    })
    setStory(tempStory[0]);
    setComments(tempStory[0].commentstory);
  }

  const getProfile = async () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios.get(`https://globaltraqsdev.com/api/profile/users/?username=${props.username}`, config)
    .then((res) => {
      setData(res.data[0]);
      setLoadingProfile(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  const flagStory = () => {

  }

  const comment = () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    let data = {
      commenter: props.userId,
      description: userComment,
      is_anonymous_pin: props.isPrivacyMode,
      pin: id
    }
    axios.post('https://globaltraqsdev.com/api/commentStory/', data, config)
      .then((res) => {
        props.loadStories();
        console.log('posted');
      }).catch((err) => {
        console.log(err);
      })
  }


  return(
    <SafeAreaView style={styles.container}>
      <Modal
        backdropColor='#ddd'
        isVisible={showFlagModal}
        onBackdropPress={() => setShowFlagModal(false)}
        onBackButtonPress={() => setShowFlagModal(false)}>
        <View style={{backgroundColor: 'white', borderRadius: 10, padding: 14}}>
          <View>
            <Text>Hello World</Text>
            <TextInput
              style={styles.box}
              placeholder='explain your reason'
              multiline/>
            <View style={{flexDirection: 'row-reverse'}}>
              <TouchableOpacity style={{borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}>
                <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
      <ScrollView style={{width: '100%',}} keyboardShouldPersistTaps='handled'>

        <View style={{paddingTop: '40%', backgroundColor: (story.category === 1 ? "#e01784" : story.category == 2 ? "#00ce7d" : "#248dc1")}}>
          <View style={{backgroundColor: 'white', paddingTop: '10%', borderTopLeftRadius: 40, borderTopRightRadius: 40}}>

          </View>
        </View>

        <View style={{width: '100%', paddingLeft: '10%', paddingRight: '10%', backgroundColor: 'white'}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <MaterialIcons name="message" size={24} color="black" />
              <TouchableWithoutFeedback onPress={() => {
                if (!story.is_anonymous_pin) {
                  props.navigation.navigate('userprofilemodal', {user: story.username});
                }
              }}>
                <Text style={{ paddingLeft: 5, color: '#787878', fontSize: 18, fontWeight: 'bold'}}>{story.is_anonymous_pin ? "anonymous" : story.username}</Text>
              </TouchableWithoutFeedback>
            </View>
            {
              props.isLoggedIn === true ? (
                <FontAwesome5 name="bookmark" size={24} color="black" />
              ) : null
            }
          </View>
          <View style={{paddingLeft: '5%'}}>
            <Text style={{color: '#787878', fontWeight: 'bold', fontSize: 24}}>{story.title}</Text>
            {story.address === "" ? null : <Text style={{color: '#787878', fontWeight: 'bold'}}>{story.address}</Text>}
            <View style={{flexDirection: 'row', paddingBottom: 5}}>
              {story.locality === "" ? null : <Text style={{color: '#787878', fontWeight: 'bold'}}>{story.locality}, </Text>}
              {story.region === "" ? null : <Text style={{color: '#787878', fontWeight: 'bold'}}>{story.region}</Text>}
            </View>
            <Text style={{paddingBottom: 5}}>{
              story.startDate === null ? story.postDate : story.endDate === null ? story.startDate : story.startDate + " - " + story.endDate
            }</Text>
            <Text>{story.description}</Text>
            {
              props.isLoggedIn === true ? (
                <View style={{flexDirection: 'row', paddingTop: 14, paddingBottom: 14}}>
                  <TouchableOpacity
                    style={{borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}
                    onPress={() => setShowFlagModal(true)}>
                    <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>flag</Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }
          </View>
        </View>

        <View style={{width: '100%', paddingLeft: '7%', paddingRight: '10%', backgroundColor: 'white'}}>
          {
            props.isLoggedIn === true ? (
              <View>
                <TextInput
                  style={styles.box}
                  multiline
                  placeholder='enter comment'
                  onChangeText={(val) => {
                    setUserComment(val);
                  }}
                />
                <View style={{flexDirection: 'row-reverse', padding: 14}}>
                  <TouchableOpacity style={{borderRadius: 5, borderColor: '#ddd', borderWidth: 2, width: 'auto'}}
                    onPress={() => {
                      comment();
                    }}
                  >
                    <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>comment</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : <View style={{padding: 18}}></View>
          }


          {
            comments.map((comment, i) => {
              return (
                <View key={i} style={{justifyContent: 'space-between', borderTopWidth: 2, borderColor: '#ddd', padding: 14}}>
                  <TouchableOpacity onPress={() => props.navigation.navigate('userprofilemodal', {user: comment.username})}>
                    <Text style={{fontWeight: 'bold'}}>{comment.username}</Text>
                  </TouchableOpacity>
                  <Text>{comment.description}</Text>
                  {
                    props.isLoggedIn === true ? (
                      <View style={{flexDirection: 'row-reverse', alignItems: 'center'}}>
                        <TouchableOpacity style={{padding: 14}}>
                          <FontAwesome name="flag" size={24} color="black" />
                        </TouchableOpacity>
                      </View>
                    ) : null
                  }
                </View>
              )
            })
          }
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '95%'
  },
  navStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'dodgerblue',
    width: Dimensions.get('window').width,
    height: '5%'
  },
  navButton: {
    flexGrow: 1,
    textAlign: 'center'
  },
  body: {
    width: '85%'
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
  profileImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 64,
    backgroundColor: 'green'
  },
  profileImage: {
    resizeMode: 'center',
    height: 64,
    width: 64
  },
})

const mapStateToProps = (state) => {
  let userId = state.authReducer.isLoggedIn === true ? state.authReducer.extra[0].id : -1;
  // causes issues if you're logged out, logged out users cannot set privacy settings
  return {
    isLoading: state. storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error,
    isLoggedIn: state.authReducer.isLoggedIn,
    isPrivacyMode: state.authReducer.isPrivacyMode,
    userId: userId
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStories: () => dispatch(loadStories())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(storyScreen);
