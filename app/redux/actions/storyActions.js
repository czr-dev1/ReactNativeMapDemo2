import axios from "axios";

const config = {
  headers: {
    "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
  },
};

export const urlConfig = (getState) => {
  if (getState().authReducer.isPrivacyMode) {
    return "https://globaltraqsdev.com";
  } else {
    return "http://192.81.130.223:8001";
  }
};

// LOAD ALL STORIES
export const loadStories = () => {
  return (dispatch, getState) => {
    dispatch({ type: "LOAD_STORIES_START" });

    axios
      .get(`${urlConfig(getState)}/api/pins`, config)
      .then((res) => {
        dispatch({ type: "LOAD_STORIES_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "LOAD_STORIES_FAILURE", payload: err.response.data });
      });
  };
};

// CHANGE STORY TO ANONYMOUS AND VICE VERSA
export const makeStoryPrivate = (id) => {
  return (dispatch, getState) => {
    //Might have to remove getState
    dispatch({ type: "MAKE_STORY_PRIVATE_START" });

    const data = {
      is_anonymous_pin: true,
    };

    axios
      .patch(`${urlConfig(getState)}/api/pins/${id}/`, data, config)
      .then((res) => {
        console.log(res);
        dispatch({ type: "MAKE_STORY_PRIVATE_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "MAKE_STORY_PRIVATE_FAILURE", payload: err });
      });
  };
};
