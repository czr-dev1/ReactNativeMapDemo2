import axios from 'axios';
import React, { useState } from 'react';
import {
	Dimensions,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
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
	const [showModal, setShowModal] = useState(true);

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
      <ScrollView style={{width: '100%', }}>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
					<TouchableWithoutFeedback onPress={() => {
						props.navigation.goBack();
					}}>
						<Text>Temp</Text>
					</TouchableWithoutFeedback>
          <Text style={{fontSize: 18, paddingTop: 24, paddingBottom: 72, color: colors.white, fontWeight: 'bold'}}>contact us</Text>
        </View>

				<View
					style={{justifyContent: 'flex-end', margin: 0,}}
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
				</View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    alignItems: 'center',
    height: Dimensions.get('window').height,
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
