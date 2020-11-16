import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View,
  FlatList, ScrollView, Dimensions } from 'react-native';
import { Card, ListenItem, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';


const Item = ({ item, style, props }) => {
  const navigation = useNavigation(); //There was a bug that made me have to import this
  //if not imported and used it will just crash
  //keep that in mind if props.navigation.navigate is not working
  return (
    <TouchableWithoutFeedback key={item.id}>
      <Card>
        <Card.Title>{item.title}</Card.Title>
      </Card>
    </TouchableWithoutFeedback>
  )
}
function UserList(props) {
  const renderItem = ({ item }) => {
    const backgroundColor = 'gray';
    return (
      <Item item={item} props={props} style={{backgroundColor}} />
    );
  };

  return(
    <View>
      <FlatList
        style={styles.cardContainer}
        data={props.users}
        renderItem={renderItem}
        keyExtractor={(item) => ""+item.id} />
    </View>
  );
}

export default UserList;

const styles = StyleSheet.create({
  cardContainer: {
    width: Dimensions.get('window').width
  }
})
