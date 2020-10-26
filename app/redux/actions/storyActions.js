import axios from 'axios';

export const loadStories = () => {
  return (dispatch, getState) => {
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    axios.get('http://www.globaltraqsdev.com/api/pins', config)
    .then((res) => {
      dispatch({ type: 'LOAD_STORIES_SUCCESS', payload: res.data});
    }).catch((err) => {
      dispatch({ type: 'LOAD_STORIES_FAILURE', payload: error});
    })
  }
}
