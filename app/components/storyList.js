import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';

const Item = ({ item }) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  return (
    <TouchableWithoutFeedback
      key={item.id}
      onPress={() => {
        navigation.navigate('Story', {
          title: item.title,
          description: item.description,
        });
      }}
    >
      <Card>
        <Card.Title>{item.title}</Card.Title>
      </Card>
    </TouchableWithoutFeedback>
  );
};

function StoryList(props) {
  const renderItem = ({ item }) => {
    const backgroundColor = 'gray';
    return <Item item={item} props={props} style={{ backgroundColor }} />;
  };

  return (
    <View>
      <FlatList
        style={styles.cardContainer}
        data={props.stories}
        renderItem={renderItem}
        keyExtractor={(item) => '' + item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width,
  },
});

export default StoryList;
