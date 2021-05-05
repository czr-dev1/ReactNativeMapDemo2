import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-map-clustering";
import {
  Marker,
  MAP_TYPES,
  PROVIDER_DEFAULT,
  UrlTile,
} from "react-native-maps";
import * as Location from "expo-location";
import { connect } from "react-redux";
import { SearchBar } from "react-native-elements";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Thumbnail } from "native-base";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import Modal from "react-native-modal";
import SideMenu from 'react-native-side-menu-updated';

import Text from "../components/text";

import colors from "../config/colors";
import { loadStories } from "../redux/actions/storyActions";

const PERSONAL_PIN =
  "data:image/png;base64,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";
const HISTORICAL_PIN =
  "data:image/png;base64,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cchQXbQgKuKoVShChVArtOpg8tI/aNKQpLg4Cq4FB38Wqw4uzro6uAqC4A+Ik6OToouUeF9SaBHjhcf7OO+ew3v3Af56malmxzigapaRSsSFTHZVCL6iGxH4MIBRiZn6nCgm4Vlf99RJdRfjWd59f1avkjMZ4BOIZ5luWMQbxNObls55nzjMipJCfE48ZtAFiR+5Lrv8xrngsJ9nho10ap44TCwU2lhuY1Y0VOIp4qiiapTvz7iscN7irJarrHlP/sJQTltZ5jqtISSwiCWIECCjihLKsBCjXSPFRIrO4x7+iOMXySWTqwRGjgVUoEJy/OB/8Hu2Zn5ywk0KxYHOF9v+GAaCu0CjZtvfx7bdOAECz8CV1vJX6sDMJ+m1lhY9Avq2gYvrlibvAZc7wOCTLhmSIwVo+fN54P2MvikL9N8CPWvu3JrnOH0A0jSr5A1wcAiMFCh73ePdXe1z+7enOb8faQNyo2hc4HgAAADnUExURRNWAEdwTP////////////////////////////////////////////////////////////////////////////////////////////////////////////b6/P////n8/f////f7/f///////////////////////yaMwFyp0Mnj7/L4+zSTxJPG4Nfq80+izK7U6EGayOXx93i32Gqw1IW/3KHN5Lzb6/D3+/f7/eby+O72+uTx9+v0+ejz+Pb6/Pj7/ev1+efz+Or0+XGz1qLO5GWu0vT5/Pn8/U2gy9Po8uHv9mau04FriMAAAAABdFJOUwBA5thmAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB+QJGgEbLgeXitwAAAHRSURBVHja7drBboJAEAbgzbyH4bqsoFC67IG06aG1qdv3f54aq7DWQxkZGJv+/xkznzhkyYzGIAiCIAiCIAiCIAjyR0IyUS5/K4Fko1yeTSDSFRDpCoh0BcknuuC3dkrqpopswVC+tBJpIk/QX+xqK5S37BZAZeXiGYL++1vJlGzAQyEKsGGs4HxdI1vf1iseIFrpVDxAKw7IeYBcHGCfxgm+L1rJ17duFOD8DAAAAAAAAAAAAAAAAAAAAACgBjgJuhkAGw6AannAmgUoxevvePOBvfaEJJOeUBTrsWOymW5BRUyA8JSoydiDysxL1n9nzGp7gdyT0LJmxcm0eitS3jOn5cm+IHN+4sT2w4du0sbicCzE37JPkK8xbtwhIQTn9nG9zM4mJCNhna1V0q5RZW/3kl+P5aeuLnmCWFxtJqYvb29rg1xrfd23QSdXnoXoj08nV5oHPC+Z2gVrX96hUxs8Lg0wP9tgpSbIdpy331naoOa8/M3xIxy3rX55wGUbFKQoOLZBVAD0gud6OI90/vLkhvNI6U9Xpf1QAQxt8Dl2STtfGzhdALlWB5AcS0qAoQ1IW/B/AUYdYNQB5r5ugdG+BUZbYJQFxqgKDIIg95wvVim3Qbb+QTsAAAAASUVORK5CYII=";
const COMMUNITY_PIN =
  "data:image/png;base64,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uS67/Ma54LCfZ4aNdGqeOEwsFNpYbmNWNFTiKeKoomqU78+4rHDe4qyWq6x5T/7CUE5bWeY6rSEksIgliBAgo4oSyrAQo10jxUSKzuMe/ojjF8klk6sERo4FVKBCcvzgf/B7tmZ+csJNCsWBzhfb/hgGgrtAo2bb38e23TgBAs/AldbyV+rAzCfptZYWPQL6toGL65Ym7wGXO8Dgky4ZkiMFaPnzeeD9jL4pC/TfAj1r7tya5zh9ANI0q+QNcHAIjBQoe93j3V3tc/u3pzm/H2kDcqNoXOB4AAABF1BMVEU1MDlHcEz///////////////////////////////////////////////////////////////////////////////8kznskznskznv///8kznv///8kznskznskznskznskznskznskznskznskznskznskznv////////////7/v3y/Pf3/fr////0/fnu+/X////////////////////////////////////r+/OC47RV2Zkkznv///9b2pyS573y/Pcy0YPJ895N15Tk+e/X9ud24K2t7c4/1Iy78NaE5LVp3aSg6sb3/frw/Pbu+/Xm+fDr+/Pt+/T4/fvn+vH2/fro+vFl3aJl3KLj+e7p+vKE47Wg6sUwwadwAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQfkCRoBHDS1tOVhAAAB1ElEQVR42u3awW6CQBAG4M08xD4ENnrXRAMG2I1JY0o0buH9n6OmxQXbQxkcGJv+/8ETZj43E8EZjUEQBEEQBEEQBEEQ5I+EZKJcfiyBZKNcnk0g0hUQ6QqIdAW9d7z6emMfiSvKwBbEy1c7K5Ei8ATx4sxZoZTJGIC3cllXwwXx81vJ7NiAdycKsNlQwe26Wra+dSceIFjpeB6gFAdseYCLOMC+DRN8XZTI149tOAhwVAMQAAAAAAAAAAAAAAAAAADAkwCCGqAVLCcABA6A9vKAJQuwE69/4M0Hcu0JifiEwi2GjskmOoKSmABqROuvE/agMpEc1BUnxqw2CuTOoKlY4/JuWr0VKV8zp+W9fUGS1eljxfe1Xz20sbjel8JvydL+biDk2TXe++trWMyzs+kN9p3O1qr3xb1Q2du9XH6O5eddXYbYBo3c8nZcG2y11texDRK58ixEdWuDXK40D3hM72978//JoV2zFXMDzPc2IDVB2wbH2QFdGzjOw99kbVDPD7hvg5QUBZ9tsFIARMHZDf4ROF0bNBqATtDYjQqge5g+2EpXcHa5LoCyUgfQEygBjPCTiIDg/wGMOsCoA8xzHYHRPgKjLTDKAmNUBQZBkGfOB4QXreasl7fqAAAAAElFTkSuQmCC";

function LightMapScreen(props) {
  const [gotLocation, setGotLocation] = useState(false);
  const [location, setLocation] = useState({
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 8.5,
    longitudeDelta: 8.5,
  });
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const urlTemplate = "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
  const urlTemplateDark = "https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png";
  const INITIAL_REGION = {
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.5,
    longitudeDelta: 0.5,
  };
  const [showModal, setShowModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [modalData, setModalData] = useState({});
  const [selectedButton, setSelectedButton] = useState(0);

  useEffect(() => {
    props.loadStories();
    getLocation();
    searchData();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      //handle error here
    }

    let loc = await Location.getCurrentPositionAsync({});
    const { latitudeDelta, longitudeDelta } = location;
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
    setGotLocation(true);
  };

  const searchData = async () => {
    fetch("http://www.globaltraqsdev.com/api/pins", {
      method: "GET",
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const HideKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );

  const searchFilterFunction = (text) => {
    if (text.length > 0) {
      setShowSearchResults(true);
    } else {
      setShowSearchResults(false);
    }
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({ item }) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => {
          //Need to send user to the searched post on the map
          // props.navigation.navigate("Story", {
          //   title: item.title,
          //   description: item.description,
          // });
          Alert.alert("Should display search item");
        }}
      >
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: "100%",
          backgroundColor: "black",
        }}
      />
    );
  };

  const loadData = async () => {
    try {
      setLoading(true);
      let response = await fetch("http://www.globaltraqsdev.com/api/pins", {
        method: "GET",
        headers: {
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      });
      let json = await response.json();
      console.log(json);
      setData(json);
      setLoading(false);
      return;
    } catch (error) {
      console.error(error);
    }

    let loc = await Location.getCurrentPositionAsync({});
    const { latitudeDelta, longitudeDelta } = location;
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
    setGotLocation(true);
  };

  const renderPersonal = () => {
    return props.stories.map((item, i) => {
      //console.log(item.category);
      if (item.category == 1) {
        console.log(item.title);
      }
    });
    //console.log(filteredDataSource);
  };
  const renderResources = () => {
    return props.stories.map((item, i) => {
      //console.log(item.category);
      if (item.category == 2) {
        console.log(item.title);
      }
    });
    //console.log(filteredDataSource);
  };
  const renderHistorical = () => {
    return props.stories.map((item, i) => {
      //console.log(item.category);
      if (item.category == 3) {
        console.log(item.title);
      }
    });
    //console.log(filteredDataSource);
  };

  const renderPins = () => {
    let selectedStories = props.stories;
    switch (selectedButton) {
      case 1:
        selectedStories = props.personalStories;
        break;
      case 2:
        selectedStories = props.resourcesStories;
        break;
      case 3:
        selectedStories = props.historicalStories;
        break;
    }

    return selectedStories.map((item, i) => {
      // Removing images completely including
      // the case made it run
      // expo moves assets to the cloud, figure out how to keep
      // https://docs.expo.io/guides/preloading-and-caching-assets/
      // UPDATE: ended up keeping them by converting to a base64 string
      // and passing that in as an argument
      let pinType = "";
      switch (item.category) {
        case 1:
          pinType = PERSONAL_PIN;
          //pinType = '#6a0dad';
          break;
        case 2:
          pinType = COMMUNITY_PIN;
          //pinType = '#00FF00';
          break;
        default:
          pinType = HISTORICAL_PIN;
        //pinType = '#0000FF';
      }
      return (
        <Marker
          key={i}
          coordinate={{
            latitude: parseFloat(item.latitude),
            longitude: parseFloat(item.longitude),
          }}
          image={pinType}
          onPress={() => {
            console.log(item);
            setModalData({
              title: item.title,
              description: item.description,
              id: item.id,
              postDate: item.postDate,
              category: item.category,
            });
            setShowModal(true);
            /*
            props.navigation.navigate('Story', {
              title: item.title,
              description: item.description,
              id: item.id
            }); */
          }}
        ></Marker>
      );
    });
  };

  const menu = (
    <View style={{backgroundColor: colors.purple, width: '100%', height: '100%'}}>
      <Text style={{}}>Hello Menu</Text>
    </View>
  );

  return (
    <SideMenu
    menu={menu}
    bounceBackOnOverdraw={false}
    openMenuOffset={Dimensions.get("window").width * .80}
    isOpen={showDrawer}
    overlayColor={'hsla(0, 0%, 0%, 0.7)'}
    onChange={isOpen => setShowDrawer(isOpen)}
    menuPosition={'right'}
    >
      <SafeAreaView style={(styles.container, { flex: 1 })}>
        <View style={styles.containerStyle}>
          <Modal
            isVisible={showModal}
            onBackdropPress={() => setShowModal(false)}
            onBackButtonPress={() => setShowModal(false)}
            hasBackdrop={true}
            backdropOpacity={0}
            style={{ justifyContent: "flex-end", marginBottom: "17%" }}
          >
            <View
              style={[{
                backgroundColor:
                  modalData.category === 1
                    ? colors.personal
                    : modalData.category === 2
                    ? colors.community
                    : colors.historical,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                height: 15,
              }]}
            ></View>
            <View
              style={[styles.shadow2, {
                backgroundColor: "white",
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                height: "12%",
              }]}
            >
              <TouchableWithoutFeedback
                onPress={() => {
                  props.navigation.navigate("Story", {
                    title: modalData.title,
                    description: modalData.description,
                    id: modalData.id,
                  });
                  setShowModal(false);
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: 10,
                    height: "100%",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    {modalData.title}
                  </Text>
                  <Text style={{ fontSize: 12 }}>
                    posted on {modalData.postDate}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </Modal>

          <View style={[{backgroundColor: colors.purple}, styles.shadow2]}>
            <View style={{flexDirection: 'row', width: '90%'}}>
              <SearchBar
                round
                searchIcon={{ size: 24 }}
                onChangeText={(text) => {
                  searchFilterFunction(text);
                }}
                onClear={(text) => searchFilterFunction("")}
                lightTheme={true}
                containerStyle={{
                  backgroundColor: colors.purple,
                  borderBottomColor: "transparent",
                  borderTopColor: "transparent",
                  width: '100%'
                }}
                inputContainerStyle={{
                  borderRadius: 50,
                  backgroundColor: colors.white,
                  borderWidth: 0,
                }}
                inputStyle={{ fontSize: 18 }}
                placeholder="search"
                placeholderTextColor={colors.purple}
                value={search}
              />
              <TouchableWithoutFeedback onPress={() => setShowDrawer(true)}>
                <View style={{justifyContent: 'center', alignItems: 'center', width: '10%'}}>
                  <FontAwesome5 name="ellipsis-v" size={24} color={colors.white} />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <HideKeyboard>
              <View
                style={[{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                  paddingBottom: 10,
                  paddingRight: 15,
                  backgroundColor: colors.purple,
                }]}
              >
                <TouchableOpacity
                  style={
                    selectedButton === 0
                      ? styles.HeaderButtonStyle
                      : styles.UnselectedHeaderButtonStyle
                  }
                  activeOpacity={0.5}
                  onPress={() => {
                    //render all stories list
                    setSelectedButton(0);
                  }}
                >
                  <Text style={styles.TextStyle}>all</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedButton === 1
                      ? styles.HeaderButtonStyle
                      : styles.UnselectedHeaderButtonStyle
                  }
                  activeOpacity={0.5}
                  //onPress={(() => setSelectedCategoryButton(1))}
                  onPress={() => {
                    renderPersonal();
                    setSelectedButton(1);
                  }}
                >
                  <Text style={styles.TextStyle}>personal</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedButton === 3
                      ? styles.HeaderButtonStyle
                      : styles.UnselectedHeaderButtonStyle
                  }
                  activeOpacity={0.5}
                  onPress={() => {
                    renderHistorical();
                    setSelectedButton(3);
                  }}
                >
                  <Text style={styles.TextStyle}>historical</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={
                    selectedButton === 2
                      ? styles.HeaderButtonStyle
                      : styles.UnselectedHeaderButtonStyle
                  }
                  activeOpacity={0.5}
                  onPress={() => {
                    renderResources();
                    setSelectedButton(2);
                  }}
                >
                  <Text style={styles.TextStyle}>resources</Text>
                </TouchableOpacity>
              </View>
          </HideKeyboard>
          </View>

          {showSearchResults ? (
            <FlatList
              data={filteredDataSource}
              //data={filteredDataSource.slice(0,5)}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              maxToRenderPerBatch={15}
              //windowSize={5}
              renderItem={ItemView}
            />
          ) : null}
        </View>

        {props.isLoading ? (
          <ActivityIndicator style={styles.mapStyle} />
        ) : (
          <MapView
            style={styles.mapStyle}
            provider={PROVIDER_DEFAULT}
            mapType={MAP_TYPES.NONE}
            initialRegion={INITIAL_REGION}
            rotateEnabled={false}
            clusterColor={"#FFA500"}
            clusterTextColor={"#000000"}
            maxZoomLevel={21}
            minZoomLevel={1}
            minZoom={0}
            maxZoom={19}
            minPoints={5}
            flex={1}
          >
            <UrlTile
              urlTemplate={ props.is_anonymous_active ? urlTemplateDark : urlTemplate}
              shouldReplaceMapContent={true}
              maximumZ={19}
              minimumZ={0}
              maxZoomLevel={19}
              minZoomLevel={0}
              zIndex={1}
            />
            {renderPins()}
          </MapView>
        )}
      </SafeAreaView>
    </SideMenu>
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
  containerStyle: {
    backgroundColor: colors.purple,
    alignItems: "stretch",
  },
  itemStyle: {
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    backgroundColor: colors.white,
    elevation: 0
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
  screenContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "black",
  },
  containerPicker: {
    flex: 1,
    //backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "95%",
  },
  SubmitButtonStyle: {
    marginTop: 10,
    marginBottom: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginLeft: 25,
    marginRight: 25,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    height: 50,
    width: 80,
  },
  OptionButtonStyle: {
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    height: 60,
    width: 140,
  },
  UnselectedHeaderButtonStyle: {
    marginTop: 1,
    marginBottom: 1,
    //marginLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    //marginRight: 5,
    backgroundColor: colors.purple,
    height: 30,
    width: 75,
  },
  HeaderButtonStyle: {
    marginTop: 1,
    marginBottom: 1,
    //marginLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    //marginRight: 5,
    backgroundColor: colors.purple,
    borderBottomWidth: 5,
    borderColor: colors.orange,
    height: 30,
    width: 75,
  },
  TextStyle: {
    color: colors.white,
    textAlign: "center",
  },
  TextStyleSortInner: {
    color: colors.black,
    textAlign: "center",
  },
  SortTextStyle: {
    marginTop: 10,
    marginLeft: 25,
    fontSize: 20,
    flex: 1,
  },
  appButtonText: {
    fontSize: 12,
    color: "black",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
//Personal, Historical, Resources
const mapStateToProps = (state) => {
  let personalCategorical = state.storyReducer.storyList.filter(
    (story) => story.category === 1
  );
  let historicalCategorical = state.storyReducer.storyList.filter(
    (story) => story.category === 3
  );
  let resourcesCategorical = state.storyReducer.storyList.filter(
    (story) => story.category === 2
  );
  return {
    personalStories: personalCategorical,
    historicalStories: historicalCategorical,
    resourcesStories: resourcesCategorical,
    is_anonymous_active: state.authReducer.user.is_profile_private,
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStories: () => dispatch(loadStories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LightMapScreen);
