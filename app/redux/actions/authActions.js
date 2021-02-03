import axios from 'axios';

const config = {
	headers: {
		'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
	},
};

// LOAD ALL USER
export const loadUsers = () => {
	return (dispatch) => {
		axios
			.get('https://www.globaltraqsdev.com/auth/users', config)
			.then((res) => {
				dispatch({ type: 'LOAD_USERS', payload: res.data});
			})
			.catch ();
	}
};

// LOGIN USER
export const login = ({ username, password }) => {
	return (dispatch) => {
		const user = {
			username: username,
			password: password,
		};

		axios
			.post('https://www.globaltraqsdev.com/api/auth/login', user, config)
			.then((res) => {
				dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data });
				dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: 'LOGIN_USER_FAIL' });
			});
	};
};

// LOGOUT USER
export const logout = () => {
	return (dispatch, getState) => {
		axios
			.post('https://www.globaltraqsdev.com/api/auth/logout/', null, tokenConfig(getState))
			.then(() => {
				dispatch({ type: 'LOGOUT_USER_SUCCESS' });
			})
			.catch((err) => {
				dispatch({ type: 'LOGOUT_FAIL' });
			});
	};
};

// REGISTER NEW USER
export const register = ({ username, email, confirmPassword }) => {
	return (dispatch) => {
		const user = {
			username: username,
			email: email,
			password: confirmPassword,
		};

		axios
			.post('https://www.globaltraqsdev.com/api/auth/register', user, config)
			.then((res) => {
				dispatch({ type: 'REGISTER_USER_SUCCESS', payload: res.data });
				dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: 'REGISTER_USER_FAIL' });
			});
	};
};

export const tokenConfig = (getState) => {
	const token = getState().authReducer.token;
	const config = {
		headers: {
			'Content-Type': 'application/json',
			'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
		},
	};

	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
};

export const returnErrors = (msg, status) => {
	return {
		type: 'GET_ERRORS',
		payload: { msg, status },
	};
};
