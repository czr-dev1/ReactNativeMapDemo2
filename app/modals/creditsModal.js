import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Linking,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { FontAwesome5, Entypo } from "@expo/vector-icons";

import Text from "../components/text";
import colors from "../config/colors";

function creditsModal(props) {
   const [showModal, setShowModal] = useState(false);

   useEffect(() => {
      const backAction = () => {
         if (props.route.params.isMapScreen) {
            // console.log("maps");
            // fun bug where on the map screen it wasn't routing correctly
            // you still the other navigation because it handles routing oddly
            // if you don't do that in the profile screen
         } else {
            // console.log("not maps");
            props.navigation.goBack();
         }
      }
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => backHandler.remove();
   }, [])

   const data = [
      {
         year: "2019",
         members:
            "Developers:\nFadi Haddad, Klaudia Hernandez, Nathaniel Suarez, Tony Truong, Justine West\n\nArt Director: Liz Sweeny\n\nArt Designers: Angie Strong, Laura Torres\n\nPublic Relations Team: Andrea Estrada, Aliyah Johnson, Laytyn MacKinnon, Nicholas Ochoa, Pamela Sanchez, Maryah Rendon, Members of Zenith Experiential, Los Angeles (ZENX-LA)",
      },
      {
         year: "2020",
         members:
            "Developers:\nRandy Arruda, Balarama Carter, Richard Cruz-Silva, Abram Flores, Carlos Larios-Solis, Khang Le, Brandon Lee, Casandra Pahed, Evelyn Ramirez"
      },
      {
         year: "2021",
         members:
            "Developers:\nMatthew Frias, Jesus Gonzalez, Kevin Kazaryan, Daniel Lee, Stewart McKenzie, Erica Payne, Erica Santos, Leslie Segovia, Bryan Sosa, Elio Vences"
      },
   ];

   return (
      <SafeAreaView style={styles.container}>
         <View
            style={[styles.shadow2, {
               flexDirection: "row",
               justifyContent: "space-between",
               backgroundColor: colors.purple,
               width: "100%",
            }]}
         >
            <Entypo
               onPress={() => {
                  props.navigation.goBack();
               }}
               style={{ padding: 24 }}
               name="chevron-left"
               size={28}
               color={colors.white}
            />
            <Text
               style={{
                  fontSize: 18,
                  padding: 24,
                  color: colors.white,
                  fontWeight: "bold",
               }}
            >
               credits
            </Text>
            <Entypo
               style={{ padding: 24 }}
               name="cross"
               size={28}
               color={colors.purple}
            />
         </View>
         <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => {
               return (
                  <View style={[styles.shadow2, styles.box]}>
                     <Text style={styles.itemTitle}>{item.year}</Text>

                     <Text style={styles.description}>
                        {item.members}
                     </Text>
                  </View>
               );
            }}
         />
      </SafeAreaView>
   );
}

function elevationShadowStyle(elevation) {
   return {
      elevation: 4,
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
      height: "100%",
   },
   box: {
      borderRadius: 36,
      paddingTop: 18,
      paddingBottom: 18,
      paddingHorizontal: 32,
      marginHorizontal: 24,
      marginVertical: 12,
      backgroundColor: colors.white,
   },
   itemTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: colors.black,
   },
   description: {
      color: colors.black,
      fontSize: 12,
   },
});

export default creditsModal;
