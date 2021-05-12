import React, { Component } from 'react';
import {
  BackHandler,
  Switch,
  ScrollView,
  Alert,
  StyleSheet,
  Text as DefaultText,
  View,
  TouchableOpacity,
} from 'react-native';
import Text from "../components/text";
import Constants from 'expo-constants';
import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome, Entypo } from "@expo/vector-icons";

import colors from "../config/colors";

const BACON_IPSUM =
  'Bacon ipsum dolor amet chuck turducken landjaeger tongue spare ribs. Picanha beef prosciutto meatball turkey shoulder shank salami cupim doner jowl pork belly cow. Chicken shankle rump swine tail frankfurter meatloaf ground round flank ham hock tongue shank andouille boudin brisket. ';

const CONTENT = [
    {
        "id": 33,
        "faqQuestionDesc": "What is The arqive?",
        "faqAnswerDesc": "The arqive is a place to learn more about queer experiences and serves as a resource for members of the queer community. Check out our About Us page for more info!"
    },
    {
        "id": 35,
        "faqQuestionDesc": "Can we change our passwords?",
        "faqAnswerDesc": "Of course! When logging in, there is a “reset password” option. All you have to do is insert the email used for the platform, then check your email for instructions on how to change your password."
    },
    {
        "id": 37,
        "faqQuestionDesc": "How can I access The arqive?",
        "faqAnswerDesc": "On any browser, either on a desktop or laptop, or on your phone."
    },
    {
        "id": 38,
        "faqQuestionDesc": "Is this app free?",
        "faqAnswerDesc": "Totally. There is no cost to posting or participating whatsoever."
    },
    {
        "id": 41,
        "faqQuestionDesc": "Is there a “change language” option?",
        "faqAnswerDesc": "Not yet, but we are working on offering different languages in the future."
    },
    {
        "id": 42,
        "faqQuestionDesc": "Is there an age requirement for this platform?",
        "faqAnswerDesc": "You must be 13 or older to register."
    },
    {
        "id": 43,
        "faqQuestionDesc": "If I don’t know the exact address, can the platform pinpoint my location?",
        "faqAnswerDesc": "Yes it can! The site automatically pinpoints your location when you first access it. If you have moved, refresh the site. It should pin a story to your current location, and you’re good to go."
    },
    {
        "id": 44,
        "faqQuestionDesc": "Are the posts on The arqive moderated?",
        "faqAnswerDesc": "Currently, creators on the platform are able to report posts for things like spam, trolling, and false/inappropriate information (see rules). We hope to have community moderators in the future as well."
    },
    {
        "id": 45,
        "faqQuestionDesc": "What are some things I should NOT post?",
        "faqAnswerDesc": "Trolling posts, racist, sexist, or homophobic language, solicitations for sex."
    },
    {
        "id": 40,
        "faqQuestionDesc": "Can this platform be used anywhere in the world?",
        "faqAnswerDesc": "Yep. As long as you have internet access, you can reach us.  Depending on your location and personal situation,  it may be a very good idea to protect your privacy by using TOR."
    }
];

const SELECTORS = [
  {
    title: 'First',
    value: 0,
  },
  {
    title: 'Third',
    value: 2,
  },
  {
    title: 'None',
  },
];

export default class App extends Component {
  backAction = () => {
    console.log(this.props.route.params.isMapScreen);
    if (this.props.route.params.isMapScreen) {
      this.props.navigation.navigate("Map");
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  constructor(props) {
    super(props);
    console.log(props.route.params);
  }

  componentDidMount(props) {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }
  state = {
    activeSections: [],
    collapsed: true,
    multipleSelect: false,
  };

  toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  setSections = (sections) => {
    this.setState({
      activeSections: sections.includes(undefined) ? [] : sections,
    }, () => {
      console.log(this.state.activeSections);
    });
  };

  renderHeader = (section, _, isActive) => {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        {
          isActive ?
            <FontAwesome name="minus" size={24} color="black" />
            :
            <FontAwesome name="plus" size={24} color="black" />
        }
        <Text style={styles.headerText}>{section.faqQuestionDesc.toLowerCase()}</Text>
      </Animatable.View>
    );
  };

  renderContent(section, _, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'fadeIn' : undefined}>
          {section.faqAnswerDesc}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  render() {
    const { multipleSelect, activeSections } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{}}>
        <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              backgroundColor: colors.white,
              width: "100%",
              elevation: 4
            }}
          >
            <Entypo
              onPress={() => {
                this.props.navigation.goBack();
              }}
              style={{ padding: 24 }}
              name="chevron-left"
              size={28}
              color={colors.purple}
            />
            <Text
              style={{
                fontSize: 18,
                padding: 24,
                color: colors.purple,
                fontWeight: "bold",
              }}
            >
              facts & questions
            </Text>
            <Entypo
              style={{ padding: 24}}
              name="chevron-left"
              size={28}
              color={colors.white}
            />
          </View>

          <View style={{width: '90%', justifyContent: 'center', alignSelf: 'center', flex: 1}}>
          <Accordion
            activeSections={activeSections}
            sections={CONTENT}
            touchableComponent={TouchableOpacity}
            expandMultiple={multipleSelect}
            renderHeader={this.renderHeader}
            renderContent={this.renderContent}
            duration={400}
            onChange={this.setSections}
            renderAsFlatList={false}
          />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.purple,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20,
  },
  header: {
    backgroundColor: colors.purple,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    marginTop: 10,
    elevation: 4,
  },
  headerText: {
    fontSize: 16,
    paddingLeft: 24,
    paddingRight: 24,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
    elevation: 4,
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  active: {
    backgroundColor: colors.white,
  },
  inactive: {
    backgroundColor: colors.border,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
});