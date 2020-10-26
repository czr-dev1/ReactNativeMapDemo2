let initialState = {
  isLoading: true,
  error: null,
  storyList: []
};

export default stories = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_STORIES_START':
      console.log('loading');
      return Object.assign({}, state, {isLoading: true});
    case 'LOAD_STORIES_SUCCESS':
      console.log('success');
      return Object.assign({}, state, { storyList: action.payload, isLoading: false });
    case 'LOAD_STORIES_FAILURE':
      console.log('failure');
      return Object.assign({}, state, { storyList: action.payload, isLoading: false });
    default:
      return state

  }
}
