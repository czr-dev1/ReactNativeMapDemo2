import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
		return AsyncStorage.getItem("@blockedUsers").then(s => {
			const blockedUsers = new Set(s ? s.split(",").map(Number) : []);
			
			const filtered = res.data.filter(story => !blockedUsers.has(story.owner));
			
			return dispatch({ type: "LOAD_STORIES_SUCCESS", payload: filtered });
		}).catch(console.error);
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

    axios.patch(`${urlConfig(getState)}/api/pins/${id}/`, data, config)
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

export const getStory = (id) => {
  let tempStory = props.stories.filter((i) => i.id === id);
  let regexOut = /(<([^>]+)>)/gi;
  let descModOut = tempStory[0].description.replace(regexOut, "");
  descModOut = decodeEntities(descModOut);
  tempStory[0].description = descModOut;

  // this will get over written once the axios call is completed
  // without it theres a crash
  setStory(tempStory[0]);
  setComments(tempStory[0].commentstory);
  createImageLink(tempStory[0].description);

  axios.get(`https://globaltraqsdev.com/api/pins/${id}/`, config)
  .then((res) => {
    console.log(res.data);
    console.log("Location of Image Tag: ", res.data.description.indexOf("src"));
    console.log(res.data.description[res.data.description.indexOf("src")]);
    createImageLink(res.data.description);

    // credit to https://stackoverflow.com/questions/48826533/how-to-filter-out-html-tags-from-array-and-replace-with-nothing
    let regex = /(<([^>]+)>)/gi;
    let descMod = res.data.description.replace(regex, "");
    descMod = decodeEntities(descMod);
    //console.log(descMod);
    //let descMod = `<div>${res.data.description}</div>`
    res.data.description = descMod;
    setStory(res.data);
    setComments(res.data.commentstory);
  })
  .catch((err) => {
    console.log(err);
  });
};
