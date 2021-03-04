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
};

export default auth = (state = initialState, action) => {
	switch (action.type) {
		case 'GET_USERS':
			return Object.assign({}, state, {
				users: action.payload,
			});
		case 'LOGIN_USER_LOADING':
			return Object.assign({}, state, {
				isLoading: true
			});
		case 'LOGIN_USER_SUCCESS':
			console.log('LOGIN SUCCESS!');
			console.log(action.payload);
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
            isLoading: true
          });
      case 'USER_PROFILE_RELOADED':
          return Object.assign({}, state, {
            extra: action.extra,
            bio: action.extra[0].bio,
            isLoading: false
          });
      case 'USER_PROFILE_RELOAD_FAIL':
        return Object.assign({}, state, {
          isLoading: false
        });
		default:
			return state;
	}
};
