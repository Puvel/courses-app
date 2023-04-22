import { LOGIN, LOGOUT } from './actionTypes';

export const onLogin = (data) => {
	localStorage.setItem('token', data.token);
	localStorage.setItem('isLoggedIn', true);
	localStorage.setItem('role', !data.name ? 'admin' : 'user');

	return {
		type: LOGIN,
		payload: data,
	};
};

export const onLogout = () => {
	localStorage.clear();
	return {
		type: LOGOUT,
	};
};
