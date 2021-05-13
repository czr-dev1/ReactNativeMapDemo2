import React, { useEffect, useState } from "react";
import {
  Alert,
  Clipboard,
  Dimensions,
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text as DefaultText,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import MapView from "react-native-map-clustering";
import { connect } from "react-redux";
import { FontAwesome5, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import axios from "axios";
import Modal from "react-native-modal";
import RadioButtonRN from "radio-buttons-react-native";
import { WebView } from "react-native-webview";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { loadStories } from "../redux/actions/storyActions";
import { reloadUser } from "../redux/actions/authActions";
import { followUser, unfollowUser } from "../redux/actions/authActions";

import Text from "../components/text";
import colors from "../config/colors";
const PROFILE_PIC = require("../assets/profile_blank.png");

function storyScreen(props) {
  const { title, description, id } = props.route.params;
  const [story, setStory] = useState({});
  const [isLoadingProfile, setLoadingProfile] = useState(true);
  const [data, setData] = useState([]);
  const [userComment, setUserComment] = useState("");
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [flagReason, setFlagReason] = useState("");
  const [flagType, setFlagType] = useState(1);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const [comments, setComments] = useState([
    {
      commenter: 0,
      description: "",
      id: 0,
      is_anonymous_comment: false,
      pin: 0,
      username: "",
    },
  ]);

  useEffect(() => {
    console.log("Story Screen: ", id);
    getStory();
    getProfile();
  }, []);

  // credits to https://stackoverflow.com/questions/44195322/a-plain-javascript-way-to-decode-html-entities-works-on-both-browsers-and-node
  const decodeEntities = (encodedString) => {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
      nbsp: " ",
      amp: "&",
      quot: '"',
      lt: "<",
      gt: ">",
    };
    return encodedString
      .replace(translate_re, function (match, entity) {
        return translate[entity];
      })
      .replace(/&#(\d+);/gi, function (match, numStr) {
        var num = parseInt(numStr, 10);
        return String.fromCharCode(num);
      });
  };

  const createImageLink = (description) => {
    let link = "";
    if (description.indexOf("src") !== -1) {
      let hasSeenQuote = null;
      for (var i = description.indexOf("src"); i < description.length; i++) {
        if (hasSeenQuote === true) {
          if (description[i] === '"') {
            break;
          }
          link += description[i]
        } else if (hasSeenQuote === null) {
          if (description[i] === '"') {
            hasSeenQuote = true
          }
        }
      }
      setImageLink(link);
    }
  }

  const getStory = () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    let tempStory = props.stories.filter((i) => i.id === id);
    let regexOut = /(<([^>]+)>)/gi;
    let descModOut = tempStory[0].description.replace(regexOut, "");
    descModOut = decodeEntities(descModOut);
    tempStory[0].description = descModOut;

    // this will get over written once the axios call is completed
    // without it theres a crash
    setStory(tempStory[0]);
    setComments(tempStory[0].commentstory);
    createImageLink(tempStory[0].description);

    axios.get(`https://globaltraqsdev.com/api/pins/${id}/`, config)
    .then((res) => {
      console.log(res.data);
      console.log("Location of Image Tag: ", res.data.description.indexOf("src"));
      console.log(res.data.description[res.data.description.indexOf("src")]);
      createImageLink(res.data.description);

      // credit to https://stackoverflow.com/questions/48826533/how-to-filter-out-html-tags-from-array-and-replace-with-nothing
      let regex = /(<([^>]+)>)/gi;
      let descMod = res.data.description.replace(regex, "");
      descMod = decodeEntities(descMod);
      //console.log(descMod);
      //let descMod = `<div>${res.data.description}</div>`
      res.data.description = descMod;
      setStory(res.data);
      setComments(res.data.commentstory);
    })
    .catch((err) => {
      console.log(err);
    });

    /*
    if (props.isLoggedIn) {
      if(props.userBookmarks.some(story => story.pinId === id)){
        console.log('test');
      }
    }
    */
  };

  const follow = () => {
    let list = props.followingList;
    console.log(data.owner);
    list.push(data.owner);
    list = {
      list: list,
      id: props.userId,
    };
    console.log("fp: ", list);
    props.followUser(list);
  };

  const getProfile = async () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios
      .get(
        `https://globaltraqsdev.com/api/profile/users/?username=${props.username}`,
        config
      )
      .then((res) => {
        setData(res.data[0]);
        setLoadingProfile(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const flagStory = () => {
    let reportType = 0;
    switch (flagType.label) {
      case "suspicious or spam":
        reportType = 1;
        break;
      case "harassment":
        reportType = 2;
        break;
      case "other":
        reportType = 3;
        break;
    }
    let flagData = {
      flagged: true,
      flagger: props.userId,
      pinId: id,
      reason: flagReason,
      reportType: reportType,
    };
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    axios
      .post(`https://globaltraqsdev.com/api/flagStory/`, flagData, config)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const confirmFlag = () => {
    Alert.alert('', 'you have successfully flagged this post!', [
      {
        text: 'ok',
        onPress: () => {
          setShowOptionsModal(false);
        }
      }
    ])
  };

  const comment = () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    let data = {
      commenter: props.userId,
      description: userComment,
      is_anonymous_comment: props.isPrivacyMode,
      pin: id,
    };
    axios.post("https://globaltraqsdev.com/api/commentStory/", data, config)
    .then((res) => {
      getStory();
      props.loadStories();
      setUserComment("");
      const notifData = {
          id: story.owner,
          username: props.username,
          storyId: story.id,
          isAnonNotif: props.isPrivacyMode
      };
      console.log(notifData);

      axios.post("http://192.81.130.223:8012/api/user/notify", notifData)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    })
    .catch((err) => {
      console.log(err);
    });
  };

  const bookmark = () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    let data = {
      upvote: true,
      pinId: id,
      upVoter: props.userId,
    };
    axios
      .post("https://globaltraqsdev.com/api/upVoteStory/", data, config)
      .then((res) => {
        props.loadStories();
        props.reloadUser(props.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deletePin = () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    axios.delete(`https://globaltraqsdev.com/api/pins/${id}/`, config)
    .then((res) => {
      console.log(res);
      //dispatch({ type: 'DELETE_STORY', payload: id });
      props.loadStories();
      props.reloadUser(props.username);
      props.navigation.goBack();
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const confirmDelete = () => {
    Alert.alert('', 'are you sure you want to delete this post?',
    [
      {
        text: 'cancel',
      },
      {
        text: `yes, i'm sure`,
        onPress: () => {
          deletePin();
        }
      }
    ])
  };



  const modalOptions = [
    {
      label: "suspicious or spam",
      accessibilityLabel: "suspicious or spam",
    },
    {
      label: "harassment",
      accessibilityLabel: "harassment",
    },
    {
      label: "other",
      accessibilityLabel: "other",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        onModalHide={() => setShowFlagModal(true)}
        isVisible={showOptionsModal}
        onBackdropPress={() => setShowOptionsModal(false)}
        onBackButtonPress={() => setShowOptionsModal(false)}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
        <Modal
          isVisible={showFlagModal}
          backdropColor={'transparent'}
          onBackdropPress={() => setShowFlagModal(false)}
          onBackButtonPress={() => {
            setShowFlagModal(false);
            setShowOptionsModal(true);
          }}
          avoidKeyboard={true}
          style={{ justifyContent: "flex-end", margin: 0 }}
        >
          <View style={{ backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 14 }}>
            <View>
              <RadioButtonRN
                data={modalOptions}
                selectedBtn={(e) => setFlagType(e)}
                icon={<FontAwesome name="check" size={24} color="black" />}
                boxStyle={{ borderWidth: 0 }}
              />
              <TextInput
                style={styles.box}
                placeholder="explain your reason"
                multiline
                onChangeText={(val) => {
                  setFlagReason(val);
                }}
              />
              <View style={{ flexDirection: "row-reverse" }}>
                <TouchableOpacity
                  style={{ borderRadius: 5, borderColor: "#ddd", borderWidth: 2 }}
                  onPress={() => {
                    flagStory();
                    confirmFlag();
                  }}
                >
                  <Text
                    style={{
                      paddingTop: 9,
                      paddingBottom: 9,
                      paddingLeft: 18,
                      paddingRight: 18,
                      color: "#919191",
                    }}
                  >
                    submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={{ backgroundColor: "white", borderTopLeftRadius: 10, borderTopRightRadius: 10, padding: 14 }}>
          <View>
            { story.is_anonymous_pin || props.username === story.username
              ? null
              : (
                <TouchableOpacity
                  style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
                  onPress={() => {
                    setShowOptionsModal(false);
                    bookmark();
                  }}
                >
                  <FontAwesome name="user-plus" size={24} color={colors.purple} style={{ paddingRight: 14 }}/>
                  <Text style={{ fontSize: 18, color: colors.purple }}>follow user</Text>
                </TouchableOpacity>
              )
            }

            { !props.isLoggedIn || props.username === story.username
              ? null
              : (
                <TouchableOpacity
                  style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
                  onPress={() => {
                    setShowOptionsModal(false);
                    bookmark();
                  }}
                >
                  <FontAwesome
                    name="bookmark"
                    size={24}
                    color={ colors.purple }
                    style={{ paddingRight: 14 }}
                  />
                  <Text style={{ fontSize: 18, color: colors.purple }}>bookmark post</Text>
                </TouchableOpacity>
              )
            }

            <TouchableOpacity
              style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
              onPress={() => {
                setShowFlagModal(true);
                console.log(showFlagModal);
              }}
            >
              <FontAwesome
                name="flag"
                size={24}
                color={ colors.purple }
                style={{ paddingRight: 14 }}
              />
              <Text style={{ fontSize: 18, color: colors.purple }}>flag post</Text>
            </TouchableOpacity>

            { story.owner !== undefined && story.owner !== null && !(props.username === story.username) ? (
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
                onPress={() => {
                  setShowOptionsModal(false);
                  setShowFlagModal(false);
                  return AsyncStorage.getItem("@blockedUsers").then(s => {
                    const blockedUsers = (s ? s.split(",") : []);

                    if (blockedUsers.includes(story.owner.toString())) {
                      return;
                    }

                    blockedUsers.push(story.owner);

                    return AsyncStorage.setItem("@blockedUsers", blockedUsers.join(","));
                  }).catch(console.error);
                }}
              >
                <FontAwesome
                  name="ban"
                  size={24}
                  color={ colors.purple }
                  style={{ paddingRight: 14 }}
                />
                <Text style={{ fontSize: 18, color: colors.purple }}>block user</Text>
              </TouchableOpacity>
              ) : null
			      }

            { props.isAuthenticated && (props.username === story.username) ? (
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
                onPress={() => {
                  props.navigation.navigate("EditStoryModal", {
                    id: id,
                    title: story.title,
                    category: story.category,
                    startDate: story.startDate,
                    endDate: story.endDate,
                    description: story.description,
                    username: props.username,
                  });
                  setShowOptionsModal(false);
                }}
              >
                <FontAwesome
                  name="pencil"
                  size={24}
                  color={ colors.purple }
                  style={{ paddingRight: 14 }}
                />
                <Text style={{ fontSize: 18, color: colors.purple }}>edit post</Text>
              </TouchableOpacity>
            ) : null
            }

            { props.isAuthenticated && props.username === story.username ? (
              <TouchableOpacity
                style={{ flexDirection: "row", padding: 18 , borderBottomWidth: 1, borderColor: colors.border }}
                onPress={() => {
                  setShowOptionsModal(true);
                  confirmDelete();
                }}
              >
                <FontAwesome
                  name="times"
                  size={24}
                  color={ colors.purple }
                  style={{ paddingRight: 14 }}
                />
                <Text style={{ fontSize: 18, color: colors.purple }}>delete post</Text>
              </TouchableOpacity>
            ) : null
            }
          </View>
        </View>
      </Modal>

      <ScrollView
        style={{ width: "100%" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      <ImageBackground source={{uri: imageLink}} style={{flex: 1, resizeMode: 'cover', justifyContent: 'center', backgroundColor: colors.white}}>
        <View
          style={[{
            paddingTop: "40%",
            backgroundColor: 'transparent'
          }]}
        >
          <View
            style={[{
              position: "relative",
              backgroundColor:
                story.category === 1
                  ? "#e01784"
                  : story.category == 2
                  ? "#00ce7d"
                  : "#248dc1",
              paddingTop: "10%",
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
            }]}
          >
          </View>
          <View
            style={[{
              position: "relative",
              bottom: "30%",
              paddingBottom: "-30%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor: colors.white,
              paddingTop: "10%"
            }, styles.shadow2]}
          >

          </View>
        </View>

        <View
          style={[{
            width: "100%",
            marginTop: "-10%",
            paddingLeft: "10%",
            paddingRight: "10%",
            backgroundColor: "white",
          }]}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="message" size={24} color="black" />
              <TouchableWithoutFeedback
                onPress={() => {
                  if (!story.is_anonymous_pin) {
                    props.navigation.navigate("UserProfileModal", {
                      user: story.username,
                    });
                  }
                }}
              >
                <DefaultText
                  style={{
                    paddingLeft: 5,
                    marginBottom: 12,
                    color: colors.black,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                >
                  {story.is_anonymous_pin ? "anonymous" : story.username}
                </DefaultText>
              </TouchableWithoutFeedback>
            </View>
            {/*props.isLoggedIn === true*/ true ? (
              <TouchableWithoutFeedback
                onPress={() => setShowOptionsModal(true)}>
                <FontAwesome5
                  name="ellipsis-v"
                  size={24}
                  style={{padding: 4}}
                  color={colors.purple}
                />
              </TouchableWithoutFeedback>
            ) : null}
          </View>
          <View style={{ paddingLeft: "5%" }}>
            <Text
              style={{
                color: colors.black,
                fontWeight: "bold",
                fontSize: 24,
                marginBottom: 12,
              }}
            >
              {story.title}
            </Text>
            {story.address === "" ? null : (
              <Text style={{ color: colors.black,  }}>
                {story.address}
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                paddingBottom: 5,
                marginBottom: 12,
              }}
            >
              {story.locality === "" ? null : (
                <Text style={{ color: colors.black }}>
                  {story.locality}{" "}
                </Text>
              )}
              {story.region === "" ? null : (
                <Text style={{ color: colors.black }}>
                  {story.region}
                </Text>
              )}
            </View>
            <Text style={{ paddingBottom: 5, marginBottom: 12 }}>
              posted on {story.postDate}
            </Text>
            <Text style={{ marginBottom: 12 }} selectable={true}
              selectionColor={colors.border}>{story.description}</Text>
          </View>
        </View>

        <View
          style={[{
            width: "100%",
            paddingLeft: "7%",
            paddingRight: "10%",
            backgroundColor: "white",
          }]}
        >

          <View style={{ padding: 18 }}></View>

          {comments.map((comment, i) => {
            return (
              <View
                key={i}
                style={{
                  justifyContent: "space-between",
                  padding: 14,
                  marginBottom: 48,
                }}
              >
                <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("userprofilemodal", {
                        user: comment.username,
                      })
                    }
                  >
                    <Text style={{ fontWeight: "bold", paddingBottom: 12 }}>
                      {comment.is_anonymous_comment ? "anonymous" : comment.username}
                    </Text>
                  </TouchableOpacity>
                  {/*props.isLoggedIn === true*/ true ? (
                    <View
                      style={{
                        flexDirection: "row-reverse",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity>
                        {/*<FontAwesome5 name="ellipsis-v" size={24} color={colors.purple} />*/}
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </View>
                <Text style={{ paddingBottom: 12 }} onLongPress={() => Clipboard.setString(comment.description)}>{comment.description}</Text>
              </View>
            );
          })}
        </View>
        </ImageBackground>
      </ScrollView>

      {
        props.isLoggedIn ?
        (
          <View style={{ flexDirection: "column", flex: 1, width: '100%'}}>
            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: '100%',
                borderColor: colors.border,
            }}>
              <View style={{flexDirection: 'row', backgroundColor: colors.background}}>
                <TextInput
                  style={styles.box}
                  multiline
                  placeholder="comment"
                  placeholderTextColor={colors.purple}
                  defaultValue={userComment}
                  onChangeText={(val) => {
                    setUserComment(val);
                  }}
                />
                <TouchableOpacity style={{alignItems:"center", justifyContent: "center"}}
                  onPress={() => {
                  comment();
                }}>
                  <FontAwesome name="send" size={24} color={colors.purple} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )
        : null
      }

    </SafeAreaView>
  );
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "95%",
  },
  navStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    width: Dimensions.get("window").width,
    height: "5%",
  },
  navButton: {
    flexGrow: 1,
    textAlign: "center",
  },
  body: {
    width: "85%",
  },
  box: {
    width: '90%',
    fontSize: 18,
    padding: 12,
    alignItems: "center",
  },
  profileImageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    height: 64,
    backgroundColor: "green",
  },
  profileImage: {
    resizeMode: "center",
    height: 64,
    width: 64,
  },
});

const mapStateToProps = (state) => {
  let userId =
    state.authReducer.isLoggedIn === true ? state.authReducer.user.id : -1;
  // causes issues if you're logged out, logged out users cannot set privacy settings
  return {
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error,
    isLoggedIn: state.authReducer.isLoggedIn,
    isPrivacyMode: state.authReducer.user.is_profile_private,
    userId: userId,
    profileImage: state.authReducer.user.profileurl,
    userBookmarks: state.authReducer.user.user_upvoted_stories,
    followingList: state.authReducer.followingList,
    username: state.authReducer.user.username,
    isAuthenticated: state.authReducer.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStories: () => dispatch(loadStories()),
    reloadUser: (username) => dispatch(reloadUser(username)),
    followUser: (item) => dispatch(followUser(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(storyScreen);
