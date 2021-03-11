import axios from 'axios';

export const loadProfile = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOAD_PROFILE_START'});
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios.get('https://globaltraqsdev.com/api/profile/users/?username=nate', config)
    .then((res) => {
      dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data});
    }).catch((err) => {
      console.log(err);
      dispatch({ type: 'LOAD_PROFILE_FAILURE', payload: err});
    })
  }
}
