import { LOGIN, LOGOUT } from './actionTypes';
const isLogged = localStorage.getItem('isLoggedIn');
const role = localStorage.getItem('role');
const initialState = {
	// I don't know if you can use redux-persist, so I put a condition to prevent re-linking when the page reloads.
	isAuth: isLogged ? true : false,
	name: '',
	email: '',
	token: '',
	role: role ? role : '',
};

export const userReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN:
			return {
				role: payload.name ? 'user' : 'admin',
				...payload,
				isAuth: true,
			};

		case LOGOUT:
			return initialState;

		default:
			return state;
	}
};
