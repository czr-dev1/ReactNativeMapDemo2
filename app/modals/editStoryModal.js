import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text as DefaultText,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Calendar } from "react-native-calendars";
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import Modal from "react-native-modal";
import axios from 'axios';
import { useDispatch } from 'react-redux';

import { getStory } from '../redux/actions/storyActions';

import Text from "../components/text";
import colors from "../config/colors";

function EditStoryModal(props) {
  const dispatch = useDispatch();
  const { id, startDate, endDate } = props.route.params;

  const [title, setTitle] = useState(props.route.params.title);
  const [category, setCategory] = useState(props.route.params.category);
  const [description, setDescription] = useState(props.route.params.description);
  const [newStartDate, setNewStartDate] = useState(props.route.params.startDate);
  const [newEndDate, setNewEndDate] = useState(props.route.params.endDate);

  const [isShowing, setShowing] = useState(false);
  const [isPickingStartDate, setIsPickingStartDate] = useState(false);
  const [isPickingEndDate, setIsPickingEndDate] = useState(false);
  const [hasPickStart, setHasPickStart] = useState(false);
  const [hasPickEnd, setHasPickEnd] = useState(false);

  const onSubmit = (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };
    let data = {
      title: title,
      description: description,
      category: category,
      startDate: newStartDate,
      endDate: newEndDate,
    };

    axios.patch(
      `https://globaltraqsdev.com/api/pins/${id}/`,
      data,
      config
    )
    .then((response) => {
      props.navigation.navigate('Profile');
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.headerContainer}>
          <Entypo
            onPress={() => {
              props.navigation.goBack();
            }}
            style={{ padding: 24 }}
            name="cross"
            size={28}
            color={colors.purple}
          />
          <Text style={styles.header}>
            edit profile
          </Text>
          <TouchableOpacity onPress={() => {
            onSubmit();
          }}>
            <Text style={styles.doneBtn}>done</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{ fontSize: 18 }}> title </Text>
            <View style={styles.inputContainer}>
              <TextInput 
                style={{
                  fontFamily: 'Arial',
                  fontSize: 16,
                  color: colors.purple,
                  marginLeft: 10,
                  width: '90%',
                }}
                value={title}
                placeholder={title}
                placeholderTextColor={colors.purple}
                onChangeText={(val) => setTitle(val)}
              />
            </View>
          </View>

          <View 
            style={{
              flexDirection: "row",
              borderColor: colors.border,
              borderBottomWidth: 1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 5,
              width: '90%'
            }}
          >
            <Text 
              style={{
                alignSelf: 'flex-start', 
                fontSize: 18, 
                marginLeft: 7
              }}
            > 
              category 
            </Text>
            <Collapse
              isCollapsed={isShowing}
              onToggle={() => setShowing(!isShowing)}
            >
              <CollapseHeader>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: colors.purple,
                    borderRadius: 8,
                    padding: 4,
                  }}
                >
                  <Text style={{ color: '#fff', paddingRight: 3 }}>
                    {category === 1
                      ? 'personal'
                      : category === 2
                      ? 'community'
                      : 'historical'}
                  </Text>
                  <FontAwesome5
                    name={isShowing ? 'chevron-up' : 'chevron-down'}
                    size={24}
                    color={colors.white}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <TouchableOpacity
                  style={{ borderRadius: 8, backgroundColor: colors.purple }}
                  onPress={() => {
                    setCategory(1);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: '#fff' }}>personal</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ borderRadius: 8, backgroundColor: colors.purple }}
                  onPress={() => {
                    setCategory(3);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: '#fff' }}>historical</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ borderRadius: 8, backgroundColor: colors.purple }}
                  onPress={() => {
                    setCategory(2);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: '#fff' }}>community</Text>
                  </View>
                </TouchableOpacity>
              </CollapseBody>
            </Collapse>
          </View>

          <View style={styles.contentContainer}>
            <View
              style={{
                flexDirection: "row",
                borderColor: colors.border,
                borderBottomWidth: 1,
                justifyContent: "space-around",
                alignItems: "center",
                padding: 9,
                width: '90%',
                marginBottom: 3,
              }}
            >
              <TouchableWithoutFeedback
                onPress={() => setIsPickingStartDate(true)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={{ fontSize: 16, color: colors.border, paddingRight: 8 }}>
                    {!hasPickStart ? startDate
                      : newStartDate.toISOString().slice(0, 10)
                    }
                  </Text>
                  <FontAwesome5
                    name="calendar-week"
                    size={24}
                    color={colors.purple}
                  />
                </View>
              </TouchableWithoutFeedback>
              <Text style={{ color: colors.border }}> to </Text>
              <TouchableWithoutFeedback onPress={() => setIsPickingEndDate(true)}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={{ fontSize: 16, color: colors.border, padding: 8 }}>
                    {!hasPickEnd ? endDate
                      : newEndDate.toISOString().slice(0, 10)
                    }
                  </Text>
                  
                  <FontAwesome5
                    name="calendar-week"
                    size={24}
                    color={colors.purple}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <Modal
              backdropColor="#ddd"
              isVisible={isPickingStartDate}
              onBackdropPress={() => setIsPickingStartDate(false)}
              onBackButtonPress={() => setIsPickingStartDate(false)}
              animationIn="fadeIn"
              animationOut="fadeOut"
            >
              <Calendar
                current={startDate}
                markedDates={{
                  tempStart: {
                    selected: true,
                    marked: true,
                    selectedColor: "blue",
                  },
                }}
                onDayPress={(day) => {
                  let temp = new Date(day.year, day.month - 1, day.day);
                  setNewStartDate(temp);
                  setIsPickingStartDate(!isPickingStartDate);
                  setHasPickStart(true);
                }}
                enableSwipeMonths={true}
              />
            </Modal>
            <Modal
              backdropColor="#ddd"
              isVisible={isPickingEndDate}
              onBackdropPress={() => setIsPickingEndDate(false)}
              onBackButtonPress={() => setIsPickingEndDate(false)}
              animationIn="fadeIn"
              animationOut="fadeOut"
            >
              <Calendar
                current={endDate}
                markedDates={{
                  tempStart: {
                    selected: true,
                    marked: true,
                    selectedColor: "blue",
                  },
                }}
                onDayPress={(day) => {
                  let temp = new Date(day.year, day.month - 1, day.day);
                  setNewEndDate(temp);
                  setIsPickingEndDate(!isPickingEndDate);
                  setHasPickEnd(true);
                }}
              />
            </Modal>
          </View>

          <View 
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <View 
              style={{
                borderBottomWidth: 1,
                borderColor: colors.border,
                height: '100%',
                width: '90%',
              }}
            >
              <TextInput 
                style={{
                  color: colors.purple,
                  marginTop: 10,
                  marginBottom: 10,
                  padding: 5,
                  width: '100%',
                }}
                value={description}
                multiline
                placeholder={description}
                placeholderTextColor={colors.purple}
                onChangeText={(val) => setDescription(val)}
              />
            </View>
          </View>
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
	},
  headerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.purple,
  },
  doneBtn: {
    fontSize: 16, 
    color: colors.purple, 
    padding: 24,
  },
  contentContainer: {
    flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
  },
  inputContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderWidth: 1,
		borderColor: colors.border, // Hex is '#B6ADCC'
		fontFamily: 'Arial',
		fontSize: 16,
		color: colors.purple,
    marginBottom: 3,
		paddingLeft: 5,
		height: 40,
		width: '80%',
  },
  inputs: {
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 30,
    height: 30,
    width: '80%',
  },
});

export default EditStoryModal;
