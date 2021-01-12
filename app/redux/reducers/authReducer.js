let initialState = {
    token: '',
    isLoggedIn: false,
    isAuthenticated: false,
    isLoading: false,
    loginFail: false,
    guest_user: true,
};

export default login = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_USER_SUCCESS':
			console.log('LOGIN SUCCESS!');
			return Object.assign({}, state, {
				token: action.payload.token,
				isLoggedIn: true,
				isAuthenticated: true,
				isLoading: false,
				loginFail: false,
				guest_user: false,
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
        case 'REGISTER_USER_SUCCESS':
			console.log('USER REGISTERED!');
			return Object.assign({}, state, {
				token: action.payload.token,
				isLoggedIn: true,
				isAuthenticated: true,
				isLoading: false,
				loginFail: false,
				guest_user: false,
			});
		case 'REGISTER_USER_FAIL':
			console.log('FAILED TO REGISTER USER!');
			return Object.assign({}, state, { loginFail: true, guest_user: true });
        default:
            return state
    }
}
