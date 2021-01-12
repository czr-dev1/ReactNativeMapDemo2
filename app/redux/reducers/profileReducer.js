let initialState = {
	profileData: [],
	isLoading: true,
	error: null,
};

export default profile = (state = initialState, action) => {
	switch (action.type) {
		case 'LOAD_PROFILE_SUCCESS':
			console.log('profile load successful');
			return Object.assign({}, state, {
				profileData: action.payload,
				isLoading: false,
			});
		default:
			return state;
	}
};
