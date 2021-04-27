import React, {useState, useEffect} from 'react';
import { SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import {SearchBar, Card} from 'react-native-elements';

const SearchScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

    useEffect(() => {
        fetch('http://www.globaltraqsdev.com/api/pins', {
            method: 'GET',
            headers: {
              'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1'
            }
          })    
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchFilterFunction = (text) => {
    
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
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

  const ItemView = ({item}) => {
    return (
      <Text
        style={styles.itemStyle}
        onPress={() => getItem(item)}>
          {item.title.toUpperCase()}
      </Text>
    );
  };
  // {item.id}
  // {'.'}

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'black',
        }}
      />
    );
  };

  const getItem = (item) => {
    Alert.alert(
      item.title,
      item.description,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );
    // <View>
    //   <Text>item.description</Text>
    // </View>
    
    //alert(item.title + item.description);
    // {search ?
    //   <ActivityIndicator /> :
    //   <ScrollView>
    //   {data.map((item, i) => {
    //     return(
    //       <TouchableWithoutFeedback key={i} onPress={() => {
    //         props.navigation.navigate('Story', {
    //           title: item.title,
    //           description: item.description
    //         });}}>
    //         <Card>
    //           <Card.Title>{item.title}</Card.Title>
    //         </Card>
    //       </TouchableWithoutFeedback>
    //     )
    //   })}
    //   </ScrollView>
    // }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <SearchBar
          round
          searchIcon={{size: 24}}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction('')}
          placeholder="Type Here..."
          value={search}
        />
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  itemStyle: {
    padding: 25,
  },
});

export default SearchScreen;


// import React, {useState, useEffect} from 'react';
// import { SafeAreaView,
//   Text,
//   StyleSheet,
//   View,
//   FlatList
// } from 'react-native';
// import {SearchBar} from 'react-native-elements';

// const SearchScreen = () => {
//   const [search, setSearch] = useState('');
//   const [filteredDataSource, setFilteredDataSource] = useState([]);
//   const [masterDataSource, setMasterDataSource] = useState([]);

//     useEffect(() => {
//         fetch('http://www.globaltraqsdev.com/api/pins', {
//             method: 'GET',
//             headers: {
//               'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1'
//             }
//           })    
//       .then((response) => response.json())
//       .then((responseJson) => {
//         setFilteredDataSource(responseJson);
//         setMasterDataSource(responseJson);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, []);

//   const searchFilterFunction = (text) => {
    
//     if (text) {
//       const newData = masterDataSource.filter(function (item) {
//         const itemData = item.title
//           ? item.title.toUpperCase()
//           : ''.toUpperCase();
//         const textData = text.toUpperCase();
//         return itemData.indexOf(textData) > -1;
//       });
//       setFilteredDataSource(newData);
//       setSearch(text);
//     } else {
//       setFilteredDataSource(masterDataSource);
//       setSearch(text);
//     }
//   };

//   const ItemView = ({item}) => {
//     return (
//       <Text
//         style={styles.itemStyle}
//         onPress={() => getItem(item)}>
//           {item.id}
//           {'.'}
//           {item.title.toUpperCase()}
//       </Text>
//     );
//   };

//   const ItemSeparatorView = () => {
//     return (
//       // Flat List Item Separator
//       <View
//         style={{
//           height: 0.5,
//           width: '100%',
//           backgroundColor: 'black',
//         }}
//       />
//     );
//   };

//   const getItem = (item) => {
//     alert(item.title + item.description);
//   };

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <View style={styles.container}>
//         <SearchBar
//           round
//           searchIcon={{size: 24}}
//           onChangeText={(text) => searchFilterFunction(text)}
//           onClear={(text) => searchFilterFunction('')}
//           placeholder="Type Here..."
//           value={search}
//         />
//         <FlatList
//           data={filteredDataSource}
//           keyExtractor={(item, index) => index.toString()}
//           ItemSeparatorComponent={ItemSeparatorView}
//           renderItem={ItemView}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: 'white',
//   },
//   itemStyle: {
//     padding: 10,
//   },
// });

// export default SearchScreen;