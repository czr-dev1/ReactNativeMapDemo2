import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View,
  FlatList, ScrollView} from 'react-native';
import { Card, ListenItem, Button, Icon } from 'react-native-elements';

import colors from '../config/colors';


const Item = ({ item, style }) => {
  return (
    <TouchableWithoutFeedback key={item.id}  style={style}>
      <Card>
        <Card.Title>{item.title}</Card.Title>
      </Card>
    </TouchableWithoutFeedback>
  )
}
function StoryList(props) {
  const renderItem = ({ item }) => {
    const backgroundColor = 'gray';
    return (
      <Item item={item} style={{backgroundColor}} />
    );
  };

  return(
    <View>
      <FlatList
        data={props.stories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} />
    </View>
  );
}

export default StoryList;
