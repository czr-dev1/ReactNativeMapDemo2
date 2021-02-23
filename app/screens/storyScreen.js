import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  ScrollView
} from 'react-native';
import MapView from 'react-native-map-clustering';
import { connect } from 'react-redux';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function storyScreen(props) {
  const { title, description, id } = props.route.params;
  const [story, setStory] = useState({});

  useEffect(() => {
    getStory();
  }, []);

  const getStory = () => {
    let tempStory = props.stories.filter(i => i.id === id);
    console.log(tempStory[0]);
    tempStory[0].commentstory.map((item, i) => {
      console.log(item.id);
    })
    setStory(tempStory[0]);
  }




  return(
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
      <View style={{width: '100%', padding: '10%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <MaterialIcons style={{borderRadius: 50, padding: 5, backgroundColor: 'gray', transform: [{rotateY: '180deg'}]}} name="chat-bubble-outline" size={32} color="white" />
            <Text style={{ paddingLeft: 5, color: '#787878', fontSize: 18, fontWeight: 'bold'}}>{story.is_anonymous_pin ? "anonymous" : story.username}</Text>
          </View>
          <FontAwesome5 name="bookmark" size={24} color="black" />
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
        </View>
        <TouchableOpacity style={{borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}>
          <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>flag</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', padding: '7%'}}>
        <TextInput
          style={styles.box}
          multiline
          placeholder='enter comment'
        />
        <TouchableOpacity style={{borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}>
          <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>comment</Text>
        </TouchableOpacity>
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
})

const mapStateToProps = (state) => {
  return {
    isLoading: state. storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error
  };
};

export default connect(mapStateToProps, null)(storyScreen);
