import React, { useEffect, useState, useRef } from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Platform,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from "react-redux";
import { FontAwesome5 } from '@expo/vector-icons';

const ItemCard = ({ item }) => {
  console.log(item);
  let d = new Date(item.time * 1);
  return(
    <TouchableWithoutFeedback>
      <Card containerStyle={{borderRadius: 14}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{padding: 12 }}>
            <FontAwesome5 name="comment-alt" size={32} color="black" />
          </View>
          <View style={{flexDirection: 'column', justifyContent: 'space-evenly', paddingLeft: 12}}>
            <Text style={{fontWeight: 'bold', fontSize: 18, color:'#787878'}}>{item.username}</Text>
            <Text>{d.getMonth() + 1}/{d.getDate()}/{d.getFullYear()}</Text>
          </View>
        </View>
      </Card>
    </TouchableWithoutFeedback>
  );
};

function NotificationScreen(props){

  const renderItem = ({ item }) => {
    const backgroundColor = 'white';
    return <ItemCard item={item} style={{ backgroundColor }} />;
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: 'white',
      }}>
      <ScrollView>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%'}}>
          <Text style={{fontSize: 24, paddingTop: 24, paddingBottom: 10, color: '#787878', fontWeight: 'bold'}}>notifications</Text>
        </View>
        <FlatList
          style={{width: Dimensions.get('window').width}}
          data={props.notificationList}
          renderItem={renderItem}
          keyExtractor={(item) => '' + item.time}
        />
      </ScrollView>
    </SafeAreaView>
  );

}

const mapStateToProps = (state) => {
  console.log(state.authReducer.notificationList);
  return {
    notificationList: state.authReducer.notificationList,
  }
};

export default connect(mapStateToProps)(NotificationScreen);
