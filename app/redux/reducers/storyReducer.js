let initialState = {
  isLoading: true,
  error: null,
  storyList: []
};

export default stories = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_STORIES_START':
      console.log('loading stories');
      return Object.assign({}, state, { isLoading: true });
    case 'LOAD_STORIES_SUCCESS':
      console.log('successfully loaded stories');
      return Object.assign({}, state, { storyList: action.payload, isLoading: false });
    case 'LOAD_STORIES_FAILURE':
      console.log('failed to load stories');
      return Object.assign({}, state, { storyList: action.payload, isLoading: false });
    case 'MAKE_STORY_PRIVATE_START':
      console.log('loading stories');
      return Object.assign({}, state, { isLoading: true });
    case 'MAKE_STORY_PRIVATE_SUCCESS':
      console.log('successfully loaded stories');
      return Object.assign({}, state, { isLoading: false });
    case 'MAKE_STORY_PRIVATE_FAILURE':
      console.log('failed to load stories');
      return Object.assign({}, state, { isLoading: false });
    default:
      return state
  }
}
