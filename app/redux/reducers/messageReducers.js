const initialState = {
	message: '',
};

export default message = (state = initialState, action) => {
	switch (action.type) {
		case 'CREATE_MESSAGE':
			return Object.assign({}, state, {
				message: action.payload
			});
		default:
			return state;
	}
}