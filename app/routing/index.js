import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';

import DarkMapScreen from '../screens/darkMapScreen';
import LightMapScreen from '../screens/lightMapScreen';
import BookmarkPostScreen from '../screens/bookmarkPostScreen';
import BookmarkUserScreen from '../screens/bookmarkUserScreen';
import StoryListScreen from '../screens/storyListScreen';
import StoryScreen from '../screens/storyScreen';
import StoryPostScreen from '../screens/storyPostScreen';
import LoginRegisterScreen from '../screens/loginRegisterScreen';
import LoginScreen from '../screens/loginScreen';
import RegisterScreen from '../screens/registerScreen';
import ProfileScreen from '../screens/profileScreen';
import BadgeScreen from '../screens/badgeScreen';
import FollowingProfileScreen from '../screens/followingProfileScreen';

import AnonToggleSwitch from '../components/anonToggleSwitch';
import ModalOpener from '../components/modalOpener';

import ContactUsModal from '../modals/contactUsModal';
import HelpAndHotlineModal from '../modals/helpAndHotlineModal';
import SupportUsModal from '../modals/supportUsModal';

const AnonMapStack = createStackNavigator();
function AnonMapStackScreen() {
	return (
		<AnonMapStack.Navigator screenOptions={{ headerShown: false }}>
			<AnonMapStack.Screen name='Map' component={ DarkMapScreen } />
			<AnonMapStack.Screen name='Story' component={ StoryScreen } />
		</AnonMapStack.Navigator>
	);
}

const UserMapStack = createStackNavigator();
function UserMapStackScreen() {
	return (
		<UserMapStack.Navigator screenOptions={{ headerShown: false }}>
			<UserMapStack.Screen name='Map' component={ LightMapScreen } />
			<UserMapStack.Screen name='Story' component={ StoryScreen } />
		</UserMapStack.Navigator>
	);
}

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
	return (
		<StoriesStack.Navigator screenOptions={{ headerShown: false }}>
			<StoriesStack.Screen name='StoryList' component={ StoryListScreen } />
			<StoriesStack.Screen name='Story' component={ StoryScreen } />
		</StoriesStack.Navigator>
	);
}

const BookmarkedUsersStack = createStackNavigator();
function BookmarkedUsersStackScreen() {
	return (
    <BookmarkedUsersStack.Navigator>
      <BookmarkedUsersStack.Screen name='UserList' options={{header: () => null}} component={ BookmarkUserScreen } />
      <BookmarkedUsersStack.Screen name='UserProfile' options={{header: () => null}} component={ FollowingProfileScreen } />
      <BookmarkedUsersStack.Screen name ='Story' options={{header: () => null}} component={ StoryScreen } />
    </BookmarkedUsersStack.Navigator>
  );
}

const BookmarkedTopTab = createMaterialTopTabNavigator();
function BookmarkedTopTabScreen() {
	return (
		<BookmarkedTopTab.Navigator style={styles.container}>
			<BookmarkedTopTab.Screen name='Stories' component={ BookmarkPostScreen } />
			<BookmarkedTopTab.Screen name='Users' component={ BookmarkedUsersStackScreen } />
		</BookmarkedTopTab.Navigator>
	);
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
	return (
		<LoginStack.Navigator screenOptions={{ headerShown: false }}>
			<LoginStack.Screen name='Initial' component={ LoginRegisterScreen } />
			<LoginStack.Screen name='Login' component={ LoginScreen } />
			<LoginStack.Screen name='Register' component={ RegisterScreen } />
		</LoginStack.Navigator>
	);
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
	return (
		<ProfileStack.Navigator>
			<ProfileStack.Screen name='Profile' options={{ headerRight: () => (
					<MaterialIcons 
						name='menu' 
						style={{paddingRight: 10 }} 
						size={24} 
						color='black' 
						onPress={() => navigation.openDrawer()} 
					/>
				)}} 
				component={ ProfileScreen } />
			<ProfileStack.Screen name='Story' options={{ header: () => null }} component={ StoryScreen } />
			<ProfileStack.Screen name='Badge' options={{ header: () => null }} component={ BadgeScreen } />
		</ProfileStack.Navigator>
	);
}

const MenuDrawer = createDrawerNavigator();
function MenuDrawerScreen() {
	return (
		<MenuDrawer.Navigator
			drawerPosition='right'
			drawerType='slide'
			drawerStyle={{ width: '80%' }}
			drawerContent={(props) => {
				return (
					<DrawerContentScrollView {...props}>
						<AnonToggleSwitch {...props} />
						<ModalOpener {...props} name='help & hotline' navigateTo={ HelpAndHotlineModal } />
						<ModalOpener {...props} name='support us' navigateTo='SupportUsModal' />
						<ModalOpener {...props} name='contact us' navigateTo='ContactUsModal' />
						<ModalOpener {...props} name='log out' navigateTo='LogoutUserModal' />
					</DrawerContentScrollView>
				);
			}}>
				<MenuDrawer.Screen name='Home' component={ ProfileStackScreen } />
		</MenuDrawer.Navigator>
	);
}

// WILL DISPLAY IS USER IS ANONYMOUS
const NeedAuthTab = createBottomTabNavigator();
function NeedAuthTabScreen() {
	return (
		<NeedAuthTab.Navigator
			initialRouteName='Map'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;
					if (route.name === 'Map') {
						iconName = 'map';
					} else if (route.name === 'Stories') {
						iconName = 'list';
					} else if (route.name === 'Post') {
						iconName = 'plus-square';
					} else if (route.name === 'Profile') {
						iconName = 'user';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
			})}
		>
			<NeedAuthTab.Screen name='Map' component={ AnonMapStackScreen } />
			<NeedAuthTab.Screen name='Stories' component={ StoriesStackScreen } />
			<NeedAuthTab.Screen name='Post' component={ StoryPostScreen } />
			<NeedAuthTab.Screen name='Profile' component={ LoginStackScreen } options={{ tabBarVisible: false }} />
		</NeedAuthTab.Navigator>
	);
}

// WILL DISPLAY IF USER HAS SUCCESSFULLY LOGGED IN
const AppTab = createBottomTabNavigator();
function AppTabScreen() {
	return (
		<AppTab.Navigator
			initialRouteName='Map'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color, size }) => {
					let iconName;
					if (route.name === 'Map') {
						iconName = 'map';
					} else if (route.name === 'Bookmarks') {
						iconName = 'list';
					} else if (route.name === 'Post') {
						iconName = 'plus-square';
					} else if (route.name === 'Profile') {
						iconName = 'user';
					}
					return <FontAwesome5 name={iconName} size={size} color={color} />;
				},
			})}
		>
			<AppTab.Screen name='Map' component={ UserMapStackScreen } />
			<AppTab.Screen name='Bookmarks' component={ BookmarkedTopTabScreen } />
			<AppTab.Screen name='Post' component={ StoryPostScreen } />
			<AppTab.Screen name='Profile' component={ MenuDrawerScreen } />
		</AppTab.Navigator>
	);
}

const Stack = createStackNavigator();
function StackScreen({ hasAuth }) {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}>
				{!hasAuth ? (
					<Stack.Screen name='Auth' component={ NeedAuthTabScreen } />
				) : (
					<Stack.Screen name='App' component={ AppTabScreen } />
				)}
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
		marginTop: 20,
	},
});

const mapStateToProps = (state) => ({
	hasAuth: state.authReducer.isAuthenticated,
});

export default connect(mapStateToProps)(StackScreen);
