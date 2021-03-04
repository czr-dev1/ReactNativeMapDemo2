import axios from 'axios';
import { returnErrors } from './messageActions';

const config = {
	headers: {
		'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
	},
};

export const tokenConfig = (getState) => {
	const token = getState().authReducer.token;

	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
};

// GET ALL USERS
export const getUsers = () => {
	return (dispatch) => {
		axios.get(`https://www.globaltraqsdev.com/auth/users`, config)
		.then((res) => {
			dispatch({ type: 'GET_USERS', payload: res.data });
		})
		.catch()
	}
}

// LOGIN USER
export const login = ({ username, password }) => {
	return (dispatch) => {
		const user = {
			username: username,
			password: password,
		};
		dispatch({ type: 'LOAD_PROFILE_START' });

		axios.post(`https://www.globaltraqsdev.com/api/auth/login`, user, config)
		.then((res) => {
			dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data });
			dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: 'LOGIN_USER_FAIL', payload: err.response.data });
		})
	}
}

// LOGOUT USER
export const logout = () => {
	return (dispatch, getState) => {
		axios.post(`https://www.globaltraqsdev.com/api/auth/logout/`, null, tokenConfig(getState))
		.then(() => {
			dispatch({ type: 'LOGOUT_USER_SUCCESS' });
		})
		.catch((err) => {
			dispatch({ type: 'LOGOUT_FAIL' });
			dispatch(returnErrors(err.response.data, err.response.status));
		})
	}
}

// REGISTER NEW USER
export const register = ({ username, email, confirmPassword }) => {
	return (dispatch) => {
		const user = {
			username: username,
			email: email,
			password: confirmPassword,
		};
		dispatch({ type: 'LOAD_PROFILE_START' });

		axios.post(`https://www.globaltraqsdev.com/api/auth/register`, user, config)
		.then((res) => {
			dispatch({ type: 'REGISTER_USER_SUCCESS', payload: res.data });
			dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
		})
		.catch((err) => {
			dispatch({ type: 'REGISTER_USER_FAIL', payload: err.response.data });
		})
	}
}

// USER SELF DELETES ACCOUNT
export const userSelfDelete = () => {
	return (dispatch, getState) => {
		axios.delete(`https://www.globaltraqsdev.com/api/auth/user`, tokenConfig(getState))
		.then((res) => {
			dispatch({ type: 'USER_SELF_DELETE', payload: res.data });
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		})
	}
}

export const setPrivacyMode = (setting) => {
	return (dispatch) => {
		dispatch({ type: 'SET_PRIVACY_MODE', isPrivacyMode: setting });
	}
}
