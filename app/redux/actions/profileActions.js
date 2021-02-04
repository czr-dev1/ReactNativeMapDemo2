import axios from 'axios';

export const urlConfig = (getState) => {
  if( getState.authReducer().isPrivacyMode ) {
    return 'https://globaltraqsdev.com';
  } else {
    return 'http://192.81.130.223:8001';
  }
};

export const loadProfile = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'LOAD_PROFILE_START'});
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios.get(`${urlConfig(getState)}/api/profile/users/?username=nate`, config)
    .then((res) => {
      dispatch({ type: 'LOAD_PROFILE_SUCCESS', payload: res.data});
    }).catch((err) => {
      console.log(err);
      dispatch({ type: 'LOAD_PROFILE_FAILURE', payload: err});
    })
  }
}
