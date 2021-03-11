let initialState = {
  profileData: [],
  isLoading: true,
  error: null
}

export default profile = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_PROFILE_START':
      console.log('loading profile');
      return Object.assign({}, state, { isLoading: true });
    case 'LOAD_PROFILE_SUCCESS':
      console.log('success profile');
      return Object.assign({}. state, { profile: action.payload, isLoading: false });
    case 'LOAD_PROFILE_FAILURE':
      console.log('failure profile', action.payload);
      return Object.assign({}, state, { error: action.payload, isLoading: false });
    default:
      return state;
  }
}
