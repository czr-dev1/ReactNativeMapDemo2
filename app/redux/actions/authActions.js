import axios from 'axios';

const config = {
  headers: {
    'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
  },
};

export const tokenConfig = (getState) => {
  const token = getState().authReducer.token;
  const config = {
    headers: {
      'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
    },
  };

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
};

export const login = ({username, password}) => {
  return (dispatch) => {
    const user = {
      username: username,
      password: password
    }

    axios.post('https://www.globaltraqsdev.com/api/auth/login', user, config)
    .then((res) => {
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data });
      dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: err.response.data });
    });
  }
};

export const logout = () => {
  return (dispatch, getState) => {
    axios.post('https://www.globaltraqsdev.com/api/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
  }
};

export const register = ({ username, email, password, confirmPassword }) => {
	return (dispatch) => {
		const user = {
			username: username,
			email: email,
			password: password,
			confirmPassword: confirmPassword,
		};

		axios
			.post('https://www.globaltraqsdev.com/api/auth/register', user, config)
			.then((res) => {
				dispatch({ type: 'REGISTER_USER_SUCCESS', payload: res.data });
				dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: 'REGISTER_USER_FAIL', payload: err.res.data });
			});
	};
};

export const returnErrors = (msg, status) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status }
  }
};
