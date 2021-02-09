import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View,
  FlatList, ScrollView, Dimensions, Text } from 'react-native';
  import { useNavigation } from '@react-navigation/native';

function ModalOpener(props) {
  const navigation = useNavigation();
  return (
    <View style={{borderBottomWidth: 2, borderColor: '#ddd'}}>
      <TouchableWithoutFeedback
      onPress={() => {
        navigation.navigate(props.navigateTo, {})
      }}>
        <Text style={{ padding: 24}}>{props.name}</Text>
      </TouchableWithoutFeedback>
    </View>
  )
}

export default ModalOpener;
