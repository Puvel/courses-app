import { LOGIN, LOGOUT } from './actionTypes';

export const onLogin = (data) => {
	localStorage.setItem('token', data.token);
	localStorage.setItem('isLoggedIn', true);
	console.log(data);
	return {
		type: LOGIN,
		payload: data,
	};
};

export const onLogout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('isLoggedIn');
	return {
		type: LOGOUT,
	};
};
