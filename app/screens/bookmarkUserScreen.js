import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  Dimensions, 
  ScrollView, 
  StyleSheet, 
  View 
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Card } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

//Icons
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import colors from '../config/colors';

//Custom story component
import StoryList from '../components/storyList';

function BookmarkUserScreen(props) {
  const navigation = useNavigation();
  
  const [selectedButton, setSelectedButton] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([])

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async () => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios.get(`https://globaltraqsdev.com/api/auth/users/`, config)
    .then((res) => {
      setData(res.data.results);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    })
  }

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <View>
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
								<Card>
									<Card.Title>{item.username}</Card.Title>
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
  storyList: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eae6e5',
    width: Dimensions.get('window').width,
    height: '100%'
  },
  navButton: {
    flexGrow: 1,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 10,
    fontSize: 10,
    width: '80%'
  },
  requiredText: {
    color: 'red'
  }
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
