let initialState = {
	token: '',
	isAuthenticated: null,
	isLoggedIn: false,
	isPrivacyMode: false,
	isLoading: false,
	loginFail: false,
	registerFail: false,
	guest_user: true,
	user: '',
	users: [],
	username: '',
	expoPushToken: '',
	followingList: [],
	notificationList: [],
};

export default auth = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_USER_LOADING':
			return Object.assign({}, state, {
				isLoading: true
			});
		case 'LOGIN_USER_SUCCESS':
			console.log('LOGIN SUCCESS!');
			return Object.assign({}, state, {
				token: action.payload.token,
				user: action.payload.user,
				user_upvoted_stories: action.payload.user_upvoted_stories,
				username: action.payload.username,
				isAuthenticated: true,
				isLoggedIn: true,
				guest_user: false,
			});
		case 'LOGIN_USER_FAIL':
			console.log('LOGIN FAILED!');
			return Object.assign({}, state, {
				loginFail: true,
			});
		case 'LOGOUT_USER_SUCCESS':
			console.log('LOGOUT SUCCESSFUL');
			return Object.assign({}, state, {
				token: null,
				guest_user: true,
			});
		case 'REGISTER_USER_SUCCESS':
			console.log('USER REGISTERED!');
			return Object.assign({}, state, {
				token: action.payload.token,
				isAuthenticated: true,
				isLoggedIn: true,
				guest_user: false,
			});
		case 'REGISTER_USER_FAIL':
			console.log('FAILED TO REGISTER USER!');
			return Object.assign({}, state, {
				loginFail: true,
				registerFail: true,
			});
		case 'USER_SELF_DELETE':
			console.log('ACCOUNT DELETED');
			return Object.assign({}, state, {
				token: null
			});
		case 'SET_PRIVACY_MODE':
			return Object.assign({}, state, {
				isPrivacyMode: action.isPrivacyMode,
			});
		case 'USER_PROFILE_RELOADING':
			return Object.assign({}, state, {
				isLoading: true,
			});
		case 'USER_PROFILE_RELOADED':
			return Object.assign({}, state, {
				user: action.extra,
				user_upvoted_stories: action.extra.user_upvoted_stories,
				bio: action.extra.bio,
				isLoading: false,
			});
		case 'USER_PROFILE_RELOAD_FAIL':
			return Object.assign({}, state, {
				isLoading: false,
			});
		case 'SET_EXPO_PUSH_TOKEN':
			return Object.assign({}, state, {
				expoPushToken: action.payload,
			})
			break;
		case 'SET_NOTIFICATIONS_FOLLOWING_LISTS':
			return Object.assign({}, state, {
				followingList: action.payload.followingList,
				notificationList: action.payload.notificationList,
			})
			break;
		case 'FOLLOW_USER':
			return Object.assign({}, state, {
				followingList: action.payload,
			})
			break;
		case 'UNFOLLOW_USER':
			console.log('ar: ', action.payload);
			return Object.assign({}, state, {
				followingList: action.payload,
			})
			break;
		case 'RESET_STATE':
			console.log('resetting now');
			return Object.assign({}, state, {
				token: '',
				isAuthenticated: null,
				isLoggedIn: false,
				isPrivacyMode: false,
				isLoading: false,
				loginFail: false,
				registerFail: false,
				guest_user: true,
				user: '',
				users: [],
				username: '',
				expoPushToken: '',
				followingList: [],
				notificationList: [],
			});
		default:
			return state;
	}
};
