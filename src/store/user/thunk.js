import { onLogin, onLogout } from './actionCreator';
import { setLoading } from '../general/actionCreator';
import { fetchRegister, fetchLogin, fetchLogout } from 'helpers/fetchApi';

export const registrationThunk = (body) => async (dispatch) => {
	dispatch(setLoading(true));
	await fetchRegister(body);
	dispatch(setLoading(false));
};

export const logInThunk = (body) => async (dispatch) => {
	dispatch(setLoading(true));
	const data = await fetchLogin(body);
	dispatch(onLogin(data));
	dispatch(setLoading(false));
};

export const logOutThunk = () => async (dispatch) => {
	dispatch(setLoading(true));
	await fetchLogout();
	dispatch(onLogout());
	dispatch(setLoading(false));
};
