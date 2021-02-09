import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker,
  FlatList,
  ScrollView,
  Image,
  Linking
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

function ContactUsModal(props) {

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={{fontSize: 24, paddingTop: 24, paddingBottom: 72, color: '#787878', fontWeight: 'bold'}}>contact us</Text>
        </View>
        <View style={styles.box}>
          <Text style={{fontSize: 22, paddingTop: 12, color: '#787878', fontWeight: 'bold'}}>what's on your mind?</Text>
          <TextInput
            style={styles.input}
            placeholder='email (optional)'/ >
          <TextInput
            style={styles.input}
            placeholder='subject'/ >
          <TextInput
            style={styles.inputBorderless}
            multiline
            placeholder='message'/ >
        </View>
      </ScrollView>


      <View style={{flexDirection: 'column', flex: 1, width: '80%'}}>
        <TouchableOpacity style={{alignSelf: 'flex-start', position: 'absolute', bottom: 35, borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}>
          <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 35, borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}
          onPress={(e) => {
            submitNewStory();
          }}>
          <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>send</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    height: '100%',
    width: Dimensions.get('window').width,
  },
  box: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 69,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    margin: 6,
    alignItems: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    width: '100%',
  },
  inputBorderless: {
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    width: '100%',
  },

});

export default ContactUsModal;
