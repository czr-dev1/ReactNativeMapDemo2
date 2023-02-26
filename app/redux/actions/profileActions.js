import axios from 'axios';

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

export const urlConfig = (getState) => {
	if (getState.authReducer().isPrivacyMode) {
		return 'https://api.thearqive.com';
	} else {
		return 'https://https://api.thearqive.com';
	}
};

// LOAD ALL INFO ABOUT USER
export const loadProfile = (username) => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOAD_PROFILE_START' });

    //username can be changed if you want
    axios.get(`${urlConfig(getState)}/api/profile/users/?username=${username}`, config)
    .then((res) => {
      dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'LOAD_PROFILE_FAILURE', payload: err.res.data });
    })
  }
}
