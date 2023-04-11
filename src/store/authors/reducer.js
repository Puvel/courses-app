import { GET_AUTHORS, ADD_AUTHORS } from './actionTypes';

export const authorsReducer = (state = [], { type, payload }) => {
	switch (type) {
		case GET_AUTHORS:
			return [...payload];
		case ADD_AUTHORS:
			return [...state, payload];
		default:
			return state;
	}
};
