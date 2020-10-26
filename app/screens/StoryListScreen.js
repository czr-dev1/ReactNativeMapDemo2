import React, { useEffect, useState } from 'react';
import { StyleSheet,
  Text,
  View,
  Platform,
  ActivityIndicator,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

import colors from '../config/colors';

function StoryListScreen(props) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const renderItem = ({ item }) => {
    <View>
      <Text>{item.title}</Text>
    </View>
  }

  return (
    <SafeAreaView style={styles.container} forceInset={{top: "always"}}>
      {props.isLoading ?
        <ActivityIndicator /> :
        <ScrollView>
        {props.stories.map((item, i) => {
          return(
            <TouchableWithoutFeedback key={i} onPress={() => {
              props.navigation.navigate('Story', {
                title: item.title,
                description: item.description
              });}}>
              <Card>
                <Card.Title>{item.title}</Card.Title>
              </Card>
            </TouchableWithoutFeedback>
          )
        })}
        </ScrollView>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: '100%'
  }
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList
  };
};

export default connect(mapStateToProps)(StoryListScreen);
