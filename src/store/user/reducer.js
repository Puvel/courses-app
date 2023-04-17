import { LOGIN, LOGOUT } from './actionTypes';
const initialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN:
			return {
				...payload,
				isAuth: true,
			};

		case LOGOUT:
			return initialState;

		default:
			return state;
	}
};
