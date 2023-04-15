import axios from "axios";

const config = {
  headers: {
    "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
  },
};

export const tokenConfig = (getState) => {
  const token = getState().auth.token;

  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
};

export const login = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: "LOGIN_USER_LOADING" });

    const user = {
      username: username,
      password: password,
    };

    axios
      .post("https://api.thearqive.com/api/auth/login", user, config)
      .then((res) => {
        axios
          .get(
            `https://api.thearqive.com/api/profile/users/?username=${res.data.user.username}`,
            config
          )
          .then((userInfo) => {
            // console.log(userInfo);
            dispatch({
              type: "LOGIN_USER_SUCCESS",
              payload: res.data,
              extra: userInfo.data,
            });
          })
          .catch((err) => {
            console.log(err);
            dispatch({ type: "LOGIN_USER_FAIL", payload: err.response });
          });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "LOGIN_USER_FAIL", payload: err.response.data });
      });
  };
};

export const reloadUser = (username) => {
  return (dispatch) => {
    dispatch({ type: "USER_PROFILE_RELOADING" });
    // NOTE: The slashes at the end of the URL play a BIG ROLE
    // If you're going to copy the URL make sure to copy it exactly w/ w/o slashes
    axios
      .get(
        `https://api.thearqive.com/api/profile/users/?username=${username}`,
        config
      )
      .then((res) => {
        // console.log(res.data[0]);
        dispatch({ type: "USER_PROFILE_RELOADED", extra: res.data[0] });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "USER_PROFILE_RELOAD_FAIL", payload: err });
      });
  };
};

export const logout = () => {
 /* return (dispatch, getState) => {
    axios
      .post(
        "https://api.thearqive.com/auth/logout",
      null,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: "LOGOUT_USER_SUCCESS" });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };
*/

  return (dispatch, getState) => {
    axios
      .post(
        "https://api.thearqive.com/auth/logout",
        null,
        tokenConfig(getState)
      )
      .then((res) => {
        dispatch({ type: "LOGOUT_USER_SUCCESS" });
        dispatch({ type: CLEAR_DATA });

        // Reset the navigation stack and navigate to the login screen
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };



};

export const setPrivacyMode = (setting) => {
  return (dispatch, getState) => {
    dispatch({ type: "SET_PRIVACY_MODE", isPrivacyMode: setting });
  };
};

export const returnErrors = (msg, status) => {
  return {
    type: "GET_ERRORS",
    payload: { msg, status },
  };
};
