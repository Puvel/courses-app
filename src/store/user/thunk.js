import { onLogin, onLogout } from './actionCreator';
import {
	fetchRegister,
	fetchLogin,
	fetchLogout,
	fetchCheckUser,
} from 'helpers';

export const registrationThunk = (body) => async (dispatch) => {
	await fetchRegister(body);
};

export const logInThunk = (body) => async (dispatch) => {
	const data = await fetchLogin(body);
	dispatch(onLogin(data));
};

export const logOutThunk = () => async (dispatch) => {
	await fetchLogout();
	dispatch(onLogout());
};

export const chekUserThunk = (token) => async (dispatch) => {
	const user = await fetchCheckUser(token);
	if (user) {
		dispatch(onLogin({ ...user, token: token }));
	} else {
		dispatch(onLogout());
	}
};
