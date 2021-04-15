import axios from 'axios';
import React, { useState } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWitoutFeedback,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import colors from '../config/colors';

function ContactUsModal(props) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = (e) => {
    if (email !== "") {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      };
      // Request Body
      // const body = JSON.stringify({ username, email, password });
      let data = JSON.stringify({ email: email, message: message });
      axios
        .post('https://globaltraqsdev.com/api/contactUs/', data, config)
        .then((response) => {
          setEmail("");
          setMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
       const config = {
        headers: {
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      };
      setEmail(`Anonymous@anon.com`);

      axios
        .post('https://globaltraqsdev.com/api/contactUs/', {
          email: email,
          message: message,
        }, config)
        .then((response) => {
          setEmail("");
          setMessage("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, paddingTop: 24, paddingBottom: 72, color: colors.white, fontWeight: 'bold'}}>contact us</Text>
        </View>
				<Modal
					isVisible={true}
					hasBackdrop={false}
					style={{justifyContent: 'flex-end', margin: 0, height: '100%'}}
					>
	        <View style={styles.box}>
	          <Text style={{fontSize: 22, paddingTop: 12, color: colors.purple, fontWeight: 'bold'}}>what's on your mind?</Text>
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
				</Modal>
      </ScrollView>


      <View style={{flexDirection: 'column', flex: 1, width: '80%'}}>
        <TouchableOpacity style={{alignSelf: 'flex-start', position: 'absolute', bottom: 35, borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}>
          <Text style={{paddingTop: 9, paddingBottom: 9, paddingLeft: 18, paddingRight: 18, color: '#919191'}}>cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignSelf: 'flex-end', position: 'absolute', bottom: 35, borderRadius: 5, borderColor: '#ddd', borderWidth: 2}}
          onPress={(e) => {
            onSubmit(e);
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
    backgroundColor: colors.purple,
    alignItems: 'center',
    height: '100%',
    width: Dimensions.get('window').width,
  },
  box: {
    borderWidth: 2,
    borderColor: '#ddd',
		backgroundColor: colors.white,
		borderTopLeftRadius: 40,
		borderTopRightRadius: 40,
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
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

const mapStateToProps = (state) => {
  return {
    isPrivacyMode: state.authReducer.isPrivacyMode
  }
}

export default connect(mapStateToProps, null)(ContactUsModal);
