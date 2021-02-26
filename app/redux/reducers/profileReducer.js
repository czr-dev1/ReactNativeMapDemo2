let initialState = {
	profileData: [],
	isLoading: true,
	error: null,
	user: '',
};

export default profile = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_PROFILE_START':
			return Object.assign({}, state, {
				isLoading: true,
			});
		case 'LOAD_PROFILE_SUCCESS':
			console.log('profile load successful');
			return Object.assign({}, state, {
				profileData: action.payload,
				isLoading: false,
			});
		case 'LOAD_PROFILE_FAILURE':
			console.log('profile load failed', action.payload);
			return Object.assign({}, state, {
				error: action.payload,
				isLoading: false,
			});
		default:
			return state;
	}
};
