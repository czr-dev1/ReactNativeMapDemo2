import React, { useEffect, useState } from 'react';
import {
  Alert,
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
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { connect, useDispatch } from 'react-redux';
import axios from 'axios';
import { Switch } from 'react-native-switch';
import { reloadUser } from '../redux/actions/auth';
import { userSelfDelete } from '../redux/actions/authActions';

import colors from '../config/colors';

const PROFILE_PIC = require('../assets/profile_blank.png');

function EditProfileModal(props) {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [privacy, setprivacy] = useState(props.is_profile_private);
  const dispatch = useDispatch();

  const onSubmit = (e) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    // Request Body
    // const body = JSON.stringify({ username, email, password });
    let data = {
      bio: bio,
      is_profile_private: privacy
    };

    axios
      .patch(`https://globaltraqsdev.com/api/auth/users/${props.id}/`, data, config)
      .then((response) => {
        props.navigation.goBack();
        props.reloadUser(props.username);
      })
      .catch((err) => {
        console.log(err);
      }
    );
  };

  const deleteConfirm = () => {
    Alert.alert('', 'are you sure you want to delete your profile?',
    [
      {
        text: 'cancel',
        onPress: () => props.navigation.navigate('Profile'),
        style: 'cancel'
      },
      {
        text: 'yes, delete my profile',
        onPress: () => dispatch(userSelfDelete()),
      }
    ])
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{width: '100%'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', paddingBottom: 10}}>
          <Entypo onPress={() => {
            props.navigation.goBack();
          }} style={{padding: 24,}} name="cross" size={28} color={colors.purple} />
          <Text style={{fontSize: 18, paddingTop: 24, color: colors.purple, fontWeight: 'bold'}}>edit profile</Text>
          <Entypo onPress={() => {
            onSubmit();
          }} style={{padding: 24}} name="check" size={24} color={colors.purple} />
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image style={styles.profileImage} source={{uri: props.profileImage}}/>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.gray}} >change profile image</Text>
        </View>
        <View style={styles.box}>
          <View style={{flexDirection: 'row', borderBottomWidth: 3, borderColor: '#ddd', alignItems: 'center', paddingBottom: 10, paddingLeft: 7, paddingRight: 14, width: '100%', justifyContent: 'space-between'}}>
            <View style={{}}>
              <Text style={{fontWeight: 'bold', fontSize: 16, color: colors.gray, }}>anonymous</Text>
            </View>
            <View style={{}}>
              <Switch
                value={privacy}
                onValueChange={(val) => setprivacy(val)}
                activeText={'on'}
                inActiveText={'off'}
                backgroundActive={'#AAAAAA'}
                backgroundInActive={'#AAAAAA'}
              />
            </View>
          </View>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: colors.gray, paddingLeft: 8, paddingTop: 10}}>username</Text>
          <TextInput
            style={styles.input}
            placeholder='username'
            value={username}
            editable={false}
            onChangeText={(value) => setUsername(value)}/>
          <Text style={{fontWeight: 'bold', fontSize: 16, color: colors.gray, paddingLeft: 8}} >bio</Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder='bio'
            value={bio}
            onChangeText={(value) => setBio(value)}/>

          <TouchableOpacity style={{padding: 8}} onPress={() => deleteConfirm()}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: colors.gray}}>delete profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    margin: 6,
  },
  input: {
    borderBottomWidth: 3,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    width: '100%',
    marginBottom: 28,
    color: '#262157'
  },
  inputBorderless: {
    borderColor: '#ddd',
    padding: 10,
    fontSize: 14,
    width: '100%',
  },
  profileImage: {
    borderRadius: 200,
    resizeMode: 'center',
    height: 128,
    width: 128
  },

});

const mapStateToProps = (state) => {
  console.log(state.authReducer);
  return {
    username: state.authReducer.user.username,
    bio: state.authReducer.user.bio,
    is_profile_private: state.authReducer.user.is_profile_private,
    id: state.authReducer.user.id,
    profileImage: state.authReducer.user.profileurl
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
