import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-switch';
import { connect } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons';

import makeStoryPrivate from '../redux/actions/storyActions';
import colors from '../config/colors';

const Item = ({ item }, props) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  const [temp, setTemp] = useState(false);
  console.log(item);
  console.log(props);
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate('Story', {
          title: item.title,
          description: item.description,
          id: item.id
        });
      }}
    >
      <Card containerStyle={{borderRadius: 14}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', flexShrink: 1}}>
            <Text style={{flexShrink: 1}}>{item.title.toLowerCase()}</Text>
            <Text style={{color: '#919191'}}>posted on {item.postDate}</Text>
          </View>
          <View style={{borderWidth: 1, borderRadius: 14, padding: 4, borderColor: '#ddd', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: '#919191'}}>anonymous</Text>
            <Switch
              value={temp}
              activeText={'✔'}
              inActiveText={'✖'}
              backgroundActive={'#AAAAAA'}
              backgroundInActive={'#AAAAAA'}
              onValueChange={(value) => setTemp(value)}
              />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

const ConnectedItem = connect(mapStateToProps, mapDispatchToProps)(Item);
const BookMark = ({ item }) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  console.log(item);
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate('Story', {
          title: item.title,
          description: item.description,
          id: item.id
        });
      }}
    >
      <Card containerStyle={{borderRadius: 14}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'column', flexShrink: 1}}>
            <Text style={{flexShrink: 1, fontSize: 18}}>{item.title.toLowerCase()}</Text>
            <Text>{item.pinAuthor}</Text>
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <FontAwesome name="bookmark" size={24} color="black" />
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

function StoryList(props) {
  const renderItem = ({ item, }) => {
    const backgroundColor = 'gray';
    return <ConnectedItem item={item} style={{ backgroundColor }} />;
  };

  const renderBookMark = ({ item }) => {
    const backgroundColor = 'white';
    return <BookMark item={item} props={props} style={{ backgroundColor }} />;
  };

  const listEmptyComponent = () => {
      return (
          <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 20}}>
              <Text>nothing to show here yet</Text>
          </View>
      )
  }

  return (
    <View>
      <FlatList
        ListEmptyComponent={listEmptyComponent}
        data={props.stories}
        style={styles.cardContainer}
        extraData={props}
        renderItem={props.isBookMark ? renderBookMark : renderItem}
        keyExtractor={(item) => '' + item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
	cardContainer: {
		width: Dimensions.get('window').width,
	},
	switch: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderRadius: 14,
		borderColor: '#ddd',
		padding: 4,
	},
});

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    error: state.storyReducer.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    makeStoryPrivate: (id) => dispatch(makeStoryPrivate(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoryList);
