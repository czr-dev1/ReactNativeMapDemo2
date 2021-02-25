let initialState = {
    token: '',
    isLoggedIn: false,
    isAuthenticated: false,
    isPrivacyMode: false,
    isLoading: false,
    loginFail: false,
    guest_user: true,
};

export default login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER_LOADING':
            console.log('loading user');
            return Object.assign({}, state, { isLoading: true });
        case 'LOGIN_USER_SUCCESS':
            console.log('successfully logged in');
            return Object.assign({}, state, {
              token: action.payload.token,
              username: action.payload.user.username,
              bio: action.payload.user.bio,
              userStories: action.payload.user.userStories,
              bookmarkedStories: action.payload.user.user_upvoted_stories,
              isLoggedIn: true,
              isAuthenticated: true,
              isLoading: false,
              loginFail: false,
              guest_user: false,
              extra: action.extra
            });
        case 'LOGIN_USER_FAIL':
            console.log('failed to login');
            return Object.assign({}, state, { loginFail: true, guest_user: true });
        case 'LOGOUT_USER_SUCCESS':
            return Object.assign({}, state, {
              token: null,
              isLoggedIn: false,
              isAuthenticated: false,
              guest_user: true
            });
        case 'SET_PRIVACY_MODE':
            return Object.assign({}, state, {isPrivacyMode: action.isPrivacyMode});
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
            return state
    }
}
