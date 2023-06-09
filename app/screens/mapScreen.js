import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  PixelRatio,
  Platform,
  StatusBar,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
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
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { loadStories } from "../redux/actions/storyActions";
import StoryList from "../components/storyList";

//Custom icons
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";

const PERSONAL_PIN = require("../assets/personal_128x128.png");
const HISTORICAL_PIN = require("../assets/historical_128x128.png");
const COMMUNITY_PIN = require("../assets/community_128x128.png");

function MapScreen(props) {
  const [gotLocation, setGotLocation] = useState(false);
  const [location, setLocation] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCategorySearchResults, setShowCategorySearchResults] =
    useState(false);
  const [filteredCategoryDataSource, setFilteredCategoryDataSource] = useState(
    [],
  );
  const [searchCategory, setSearchCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  //const urlTemplate = 'https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';
  const urlTemplate =
    "https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}.png";
  const INITIAL_REGION = {
    latitude: 34.0522,
    longitude: -118.2437,
    latitudeDelta: 0.3,
    longitudeDelta: 0.3,
  };

  useEffect(() => {
    props.loadStories();
    getLocation();
    searchData();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
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
    fetch("https://api.thearqive.com/api/pins/", {
      method: "GET",
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        //setFilteredCategoryDataSource(responseJson); ///////
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //ISSUE: searches the original list but not on the category list when you press a button
  const searchFilterFunction = (text) => {
    let temp;
    switch (searchCategory) {
      case 0:
        temp = masterDataSource;
        break;
      default:
        temp = filteredCategoryDataSource;
    }
    //only when search text is not blank do the flatlists appear
    if (text.length > 0) {
      setShowSearchResults(true); //<-- Flatlists appear
    } else {
      //setShowSearchResults(false);
      setShowSearchResults(false);
    }

    //filter the masterDataSource and update FilteredDataSource
    if (text) {
      //apply filter for the search text
      const newData = temp.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      //update useState
      //setFilteredCategoryDataSource(newData); ////
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      //the search text is blank
      //update useState
      /* setFilteredCategoryDataSource(
        filteredCategoryDataSource.filter(function (item) {
          const itemData = item.title
            ? item.title.toUpperCase()
            : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        })
      ); */ ////
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
          props.navigation.navigate("Story", {
            title: item.title,
            description: item.description,
            id: item.id,
          });
        }}>
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
      let response = await fetch("https://api.thearqive.com/api/pins/", {
        method: "GET",
        headers: {
          "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
        },
      });
      let json = await response.json();
      // console.log(json);
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

  /* const AppButton = ({ onPress, title }) => (
    <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
      <Text style={styles.appButtonText}>{title}</Text>
    </TouchableOpacity>
  ); */

  /* this.state = {
    radiusSize: "placeholder",
  }; */

  //Pink = personal(1), Green = Resources(2), Blue = Historical(3)

  const renderPersonal = () => {
    const catArray = [];
    return props.stories.map((item, i) => {
      //console.log(item.category);

      if (item.category === 1) {
        // console.log(item.title);
        catArray.push({
          id: item.id,
          title: item.title,
          description: item.description,
        });
      }
      //console.log(catArray);
      setSearchCategory(1);
      setFilteredCategoryDataSource(catArray);
      searchFilterFunction(searchTerm);
      //setShowCategorySearchResults(true);
    });
  };
  const renderResources = () => {
    const catArray = [];
    return props.stories.map((item, i) => {
      //console.log(item.category);
      if (item.category === 2) {
        //console.log(item.title);
        catArray.push({
          id: item.id,
          title: item.title,
          description: item.description,
        });
      }
      setSearchCategory(2);
      setFilteredCategoryDataSource(catArray);
      searchFilterFunction(searchTerm);
      //setShowCategorySearchResults(true);
    });
  };
  const renderHistorical = () => {
    const catArray = [];
    return props.stories.map((item, i) => {
      //console.log(item.category);
      if (item.category === 3) {
        //console.log(item.title);
        catArray.push({
          id: item.id,
          title: item.title,
          description: item.description,
        });
      }
      setSearchCategory(3);
      setFilteredCategoryDataSource(catArray);
      searchFilterFunction(searchTerm);
      //setShowCategorySearchResults(true);
    });
  };
  const renderRandom = () => {
    const catArray = [];
    return props.stories.map((item, i) => {
      catArray.push({
        id: item.id,
        title: item.title,
        description: item.description,
      });
      setSearchCategory(0);
      setFilteredCategoryDataSource(catArray);
      searchFilterFunction(searchTerm);
      //setShowCategorySearchResults(true);
    });
  };

  const Separator = () => <View style={styles.separator} />;

  //Custom icons
  const Icon = createIconSetFromIcoMoon(
    require("../assets/fonts/selection.json"),
    "IcoMoon",
    "icomoon.ttf",
  );

  //Custom icons
  const [fontsLoaded] = useFonts({
    IcoMoon: require("../assets/fonts/icomoon.ttf"),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={(styles.container, { flex: 1 })}>
      <View style={styles.containerStyle}>
        <SearchBar
          round
          //searchIcon={{ size: 24 }}
          searchIcon={false}
          onChangeText={(text) => {
            searchFilterFunction(text);
            setSearchTerm(text);
          }}
          onClear={(text) => {
            searchFilterFunction("");
            setSearchTerm("");
          }}
          lightTheme={true}
          placeholder='search'
          value={search}
        />

        <Collapse>
          <CollapseHeader
            style={{
              flexDirection: "row",
              alignItems: "center",
              padding: 10,
              backgroundColor: "#FFFFFF",
            }}>
            <View style={{ width: "15%", alignItems: "center" }}>
              {/* <Thumbnail
                source={{
                  uri:
                    "https://cdn.icon-icons.com/icons2/1993/PNG/512/filter_filters_funnel_list_navigation_sort_sorting_icon_123212.png",
                }}
              /> */}
              <MaterialIcons name='sort' size={32} color='black' />

              {/* <Icon name="badges_hightlighted" size={25} color="#4D4185" /> */}
            </View>

            <View style={styles.screenContainer}>
              <TouchableOpacity
                style={styles.HeaderButtonStyle}
                activeOpacity={0.5}
                onPress={() => renderRandom()} /////
              >
                <Text style={styles.TextStyle}> random </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.HeaderButtonStyle}
                activeOpacity={0.5}
                //onPress={(() => setSelectedCategoryButton(1))}
                onPress={() => renderPersonal()}>
                <Text style={styles.TextStyle}> personal </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.HeaderButtonStyle}
                activeOpacity={0.5}
                onPress={() => renderHistorical()}>
                <Text style={styles.TextStyle}> historical </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.HeaderButtonStyle}
                activeOpacity={0.5}
                onPress={() => renderResources()}>
                <Text style={styles.TextStyle}> resources </Text>
              </TouchableOpacity>
            </View>
          </CollapseHeader>
          <CollapseBody
            //Styles the body portion
            style={{
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              backgroundColor: "#EDEDED",
            }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.SortTextStyle}> sort by </Text>
            </View>

            <Separator />
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.OptionButtonStyle}
                activeOpacity={0.5}
                //onPress={() => Alert.alert("Cannot press this one")}
              >
                <Text style={styles.TextStyle}> any </Text>
              </TouchableOpacity>
            </View>
            <Separator />
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.OptionButtonStyle}
                activeOpacity={0.5}
                //onPress={() => Alert.alert("Cannot press this one")}
              >
                <Text style={styles.TextStyle}> relevance </Text>
              </TouchableOpacity>
            </View>
            <Separator />
            {/* <DropDownPicker
              items={[
                {
                  label: "radius",
                  value: "placeholder",
                  //hidden: true,
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
              ]}
              defaultValue={this.state.radiusSize}
              containerStyle={{
                width: 140,
                height: 60,
                marginTop: 5,
                marginBottom: 5,
              }}
              style={{ backgroundColor: "#FFFFFF" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#FFFFFF" }}
              onChangeItem={(item) =>
                this.setState({
                  radiusSize: item.value,
                })
              }
            />
            <Separator />
            <DropDownPicker
              items={[
                {
                  label: "continent",
                  value: "placeholder",
                  //hidden: true,
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
              ]}
              defaultValue={this.state.radiusSize}
              containerStyle={{
                width: 140,
                height: 60,
                marginTop: 5,
                marginBottom: 5,
              }}
              style={{ backgroundColor: "#FFFFFF" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#FFFFFF" }}
              onChangeItem={(item) =>
                this.setState({
                  radiusSize: item.value,
                })
              }
            />
            <Separator />
            <DropDownPicker
              items={[
                {
                  label: "date",
                  value: "placeholder",
                  //hidden: true,
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
                {
                  label: "placeholder",
                  value: "placeholder",
                },
              ]}
              defaultValue={this.state.radiusSize}
              containerStyle={{
                width: 140,
                height: 60,
                marginTop: 5,
                marginBottom: 5,
              }}
              style={{ backgroundColor: "#FFFFFF" }}
              itemStyle={{
                justifyContent: "flex-start",
              }}
              dropDownStyle={{ backgroundColor: "#FFFFFF" }}
              onChangeItem={(item) =>
                this.setState({
                  radiusSize: item.value,
                })
              }
            /> */}
            <Separator />
            <View style={styles.fixToText}>
              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                //onPress={this.ButtonClickCheckFunction}
              >
                <Text style={styles.TextStyle}> clear </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.SubmitButtonStyle}
                activeOpacity={0.5}
                //onPress={this.ButtonClickCheckFunction}
              >
                <Text style={styles.TextStyle}> apply </Text>
              </TouchableOpacity>
            </View>
          </CollapseBody>
        </Collapse>

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
        {showCategorySearchResults ? (
          <FlatList
            data={filteredCategoryDataSource} //CHANGE
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
        <View style={styles.mapStyle}>
          <Image
            source={require("../assets/02_thearqive_loading_screen_.gif")}
            style={styles.loadingIcon}
          />
          <Text style={styles.loadingText}>
            fetching stories... placing pins...
          </Text>
        </View>
      ) : (
        <MapView
          style={styles.mapStyle}
          provider={PROVIDER_DEFAULT}
          mapType={MAP_TYPES.NONE}
          initialRegion={gotLocation ? location : INITIAL_REGION}
          rotateEnabled={false}
          clusterColor={"#FFA500"}
          clusterTextColor={"#000000"}
          maxZoomLevel={19}
          minZoomLevel={1}
          minZoom={0}
          maxZoom={17}
          minPoints={5}
          flex={1}>
          <UrlTile
            urlTemplate={urlTemplate}
            shouldReplaceMapContent={true}
            maximumZ={19}
            minimumZ={0}
            maxZoomLevel={19}
            minZoomLevel={0}
            zIndex={1}
          />
          {props.stories.map((item, i) => {
            let pinType = "";
            switch (item.category) {
              case 1:
                pinType = PERSONAL_PIN;
                break;
              case 2:
                pinType = COMMUNITY_PIN;
                break;
              default:
                pinType = HISTORICAL_PIN;
            }
            return (
              <Marker
                key={i}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
                title={item.title}
                image={pinType}
                onPress={() => {
                  props.navigation.navigate("Story", {
                    title: item.title,
                    description: item.description,
                  });
                }}
              />
            );
          })}
        </MapView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    textAlign: "center",
    marginTop: 10,
  },
  loadingIcon: {
    height: 50,
    width: 60,
    resizeMode: "contain",
  },
  indiContainer: {
    flex: 1,
    justifyContent: "center",
  },
  indhorizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  containerStyle: {
    backgroundColor: "white",
    alignItems: "stretch",
  },
  itemStyle: {
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
    height: "125%",
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
  HeaderButtonStyle: {
    marginTop: 1,
    marginBottom: 1,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    height: 30,
    width: 75,
  },
  TextStyle: {
    color: "#000000",
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

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
