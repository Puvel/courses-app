import { SET_LOADING } from './actionTypes';

export const systemReducer = (
	state = { isLoading: false },
	{ type, payload }
) => {
	switch (type) {
		case SET_LOADING:
			return { ...state, isLoading: payload };

		default:
			return state;
	}
};
