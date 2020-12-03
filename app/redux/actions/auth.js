import axios from 'axios';

const config = {
  headers: {
    'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
  },
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
};

export const login = ({username, password}) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER_LOADING' });

    const user = {
      username: username,
      password: password
    }

    axios.post('https://www.globaltraqsdev.com/api/auth/login', user, config)
    .then((res) => {
      dispatch({ type: 'LOGIN_USER_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: 'LOGIN_USER_FAIL', payload: err.response.data });
    });
  }
};

export const logout = () => {
  return (dispatch, getState) => {
    axios.post('https://www.globaltraqsdev.com/auth/logout', null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: 'LOGOUT_USER_SUCCESS' });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
  }
};

export const returnErrors = (msg, status) => {
  return {
    type: 'GET_ERRORS',
    payload: { msg, status }
  }
};
