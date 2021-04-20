import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Card } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import axios from 'axios';

// Icons
import { FontAwesome } from '@expo/vector-icons';

import colors from '../config/colors';

const PROFILE_PIC = require('../assets/profile_blank.png');

function BookmarkUserScreen(props) {
  const navigation = useNavigation();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    getUsers();
    // console.log(props.followingList);
  }, [])

  const getUsers = async () => {
    const config = {
      headers: {
        'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
      },
    };

    axios.get(`https://globaltraqsdev.com/api/auth/users/`, config)
    .then((res) => {
      // console.log(res);
      let temp = res.data;

      temp = temp.filter((item) => {
        if (props.followingList.includes(item.id)) {
          return true;
        } else {
          return false;
        }
      });

      // console.log('following user list: ', temp);
      setData(temp);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  if (isLoading) {
    return <ActivityIndicator style={{ marginTop: 330 }} />;
  } else {
    return (
      <View style={styles.container}>
        <ScrollView>
          {data.map((item, i) => {
            return (
							<TouchableWithoutFeedback 
                key={i}
                onPress={() => {
                  navigation.navigate('UserProfile', {
                    user: item.username,
                  });
                }}
              >
								<Card containerStyle={{ borderRadius: 14 }}>
									<View 
                    style={{
                      flexDirection: 'row', 
                      justifyContent: 'space-between', 
                      alignItems: 'center'
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image 
                        style={{ borderRadius: 200, height: 48, width: 48 }}
                        source={(data.profileurl !== null) ? {uri: item.profileurl} : PROFILE_PIC}
                      />
                      <Text style={{ paddingLeft: 12, fontSize: 18 }}>{item.username}</Text>
                    </View>
                    <View>
                      <FontAwesome name='bookmark' size={24} color='black' />
                    </View>
                  </View>
								</Card>
							</TouchableWithoutFeedback>
						);
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  profileStoryButtons: {
    width: Dimensions.get('window').width,
    borderTopWidth: 1,
    borderTopColor: '#eae6e5',
    paddingTop: '2%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  profileStorySelectedButton: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    alignItems: 'center',
    flexGrow: 1,
    paddingBottom: '2%'
  },
  profileStoryUnselectedButton: {
    alignItems: 'center',
    flexGrow: 1
  },
})

const mapStateToProps = (state) => {
  return {
    isLoading: state.storyReducer.isLoading,
    users: state.authReducer.users,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error
  }
}

export default connect(mapStateToProps)(BookmarkUserScreen);
