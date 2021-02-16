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

// LOAD ALL INFO ABOUT USER
export const loadProfile = (username) => {
  return (dispatch) => {
		dispatch({ type: 'LOAD_PROFILE_START' });
		
    //username can be changed if you want
    axios.get(`https://globaltraqsdev.com/api/profile/users/?username=${username}`, config)
    .then((res) => {
      dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: 'LOAD_PROFILE_FAILURE', payload: err.res.data });
    });
  }
};

// SEARCH FOR USER BY USERNAME
export const searchUsers = (username) => {
	return (dispatch) => {
		axios.get(`https://www.globaltraqsdev.com/profile/users?search=${username}`, config)
		.then((res) => {
			dispatch({ type: 'SEARCH_USER', payload: res.data });
		})
		.catch();
	};
};
