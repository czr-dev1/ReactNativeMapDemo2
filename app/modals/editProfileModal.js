import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Picker,
  FlatList,
  ScrollView,
  Image,
  Linking,
  Text as DefaultText,
  Platform
} from "react-native";
// Changed Text to DefaultText because there is a bug that prevents fontFamily
// from making a TouchableOpacity work in this case
// not sure why it makes it stop working though
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import { Switch } from "react-native-switch";
import { reloadUser } from "../redux/actions/auth";
import { userSelfDelete } from "../redux/actions/authActions";
import * as ImagePicker from 'expo-image-picker';

import Text from "../components/text";
import colors from "../config/colors";

const PROFILE_PIC = require("../assets/profile_blank.png");

function EditProfileModal(props) {
  const [username, setUsername] = useState(props.username);
  const [bio, setBio] = useState(props.bio);
  const [privacy, setprivacy] = useState(props.is_profile_private);
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 1,
    });

    // console.log(result);

    let formData = new FormData();
    formData.append("upload_preset", "theArQive");
    formData.append("file", `data:image/png;base64,${result.base64}`);

    if (!result.cancelled) {
      setImage(result.base64);
      axios.post("https://api.cloudinary.com/v1_1/thearqive/image/upload", formData)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.secure_url);
          setImageURL(res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

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
      is_profile_private: privacy,
    };

    if (imageURL !== null) {
      data.profileurl = imageURL;
    }

    axios
      .patch(
        `https://globaltraqsdev.com/api/auth/users/${props.id}/`,
        data,
        config
      )
      .then((response) => {
        props.navigation.goBack();
        props.reloadUser(props.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteConfirm = () => {
    Alert.alert("", "are you sure you want to delete your profile?", [
      {
        text: "cancel",
        onPress: () => props.navigation.navigate("Profile"),
        style: "cancel",
      },
      {
        text: "yes, delete my profile",
        onPress: () => dispatch(userSelfDelete()),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",

          }}
        >
          <Entypo
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ padding: 24 }}
            name="cross"
            size={28}
            color={colors.purple}
          />
          <Text
            style={{
              fontSize: 18,
              color: colors.purple,
              fontWeight: "bold",
            }}
          >
            edit profile
          </Text>
          <TouchableWithoutFeedback onPress={() => {
            onSubmit();
            console.log(props.is_profile_private);
          }}>
            <DefaultText style={{fontSize: 16, color: colors.purple, padding: 24}}>done</DefaultText>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.profileImage}
            source={(image === null) ? { uri: props.profileImage } : {uri: `data:image/png;base64,${image}`}}
          />
          <TouchableWithoutFeedback
            onPress={() => pickImage()}
          >
            <DefaultText
              style={{ fontSize: 16, fontWeight: "bold", color: colors.gray }}
            >
              change profile image
            </DefaultText>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.box}>
          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 3,
              borderColor: colors.forgotDetails,
              alignItems: "center",
              paddingBottom: 10,
              paddingLeft: 7,
              paddingRight: 14,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: colors.gray }}
              >
                anonymous
              </Text>
            </View>
            <View style={{}}>
              <Switch
                value={privacy}
                onValueChange={(val) => setprivacy(val)}
                activeText={"on"}
                inActiveText={"off"}
                backgroundActive={colors.purple}
                backgroundInActive={colors.border}
              />
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: colors.gray,
              paddingLeft: 8,
              paddingTop: 10,
            }}
          >
            username
          </Text>
          <TextInput
            style={styles.input}
            placeholder="username"
            value={username}
            editable={false}
            onChangeText={(value) => setUsername(value)}
          />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color: colors.gray,
              paddingLeft: 8,
              marginBottom: 3,
            }}
          >
            bio
          </Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="bio"
            value={bio}
            onChangeText={(value) => setBio(value)}
          />

          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={() => deleteConfirm()}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: colors.forgotDetails,
                marginTop: 200
              }}
            >
              delete profile
            </Text>
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
    alignItems: "center",
    height: "100%",
    width: Dimensions.get("window").width,
  },
  box: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingRight: 32,
    paddingLeft: 32,
    margin: 6,
  },
  input: {
    fontFamily: "Arial",
    borderBottomWidth: 3,
    borderColor: colors.forgotDetails,
    padding: 10,
    fontSize: 14,
    width: "100%",
    marginBottom: 28,
    color: "#262157",
  },
  inputBorderless: {
    borderColor: "#ddd",
    padding: 10,
    fontSize: 14,
    width: "100%",
  },
  profileImage: {
    paddingTop: -20,
    borderRadius: 2000,
    resizeMode: "center",
    height: 128,
    width: 128,
  },
});

const mapStateToProps = (state) => {
  console.log(state.authReducer);
  return {
    username: state.authReducer.user.username,
    bio: state.authReducer.user.bio,
    is_profile_private: state.authReducer.user.is_profile_private,
    id: state.authReducer.user.id,
    profileImage: state.authReducer.user.profileurl,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    reloadUser: (username) => dispatch(reloadUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
