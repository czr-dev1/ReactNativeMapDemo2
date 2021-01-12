import axios from 'axios';

const config = {
	headers: {
		'X-Arqive-Api-Key': '4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1',
	},
};

export const loadProfile = (username) => {
  return (dispatch) => {
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
}
