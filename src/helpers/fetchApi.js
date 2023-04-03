import axios from 'axios';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:4000';

export const setToken = (token) => {
	axios.defaults.headers.common.Authorization = token;
};

export const clearToken = () => {
	axios.defaults.headers.common.Authorization = '';
};

// ========= AUTHORIZATION ===========
export const fetchRegister = async (body) => {
	try {
		const { status, data } = await axios.post('/register', body);

		if (status === 201) {
			toast.success(data.result);
			return true;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchLogin = async (body) => {
	try {
		const { status, data } = await axios.post('/login', body);

		if (status === 201) {
			const token = data.result;
			localStorage.setItem('token', token);
			localStorage.setItem('isLoggedIn', true);
			setToken(token);
			return data.user;
		}
	} catch ({ response: { status, statusText } }) {
		if (status === 400) {
			toast.error('Invalid email or password');
		} else {
			toast.error(statusText);
		}
	}
};
export const fetchLogout = async () => {
	try {
		const { status } = await axios.delete('/logout');
		if (status === 200) {
			localStorage.removeItem('token');
			localStorage.removeItem('isLoggedIn');
			clearToken();
			return true;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchCheckUser = async (token, setUser, setIsLogged) => {
	try {
		const { status, data } = await axios.get('/users/me', {
			headers: { Authorization: token },
		});

		if (status === 200) {
			setToken(token);
			setUser({
				name: data.result.name,
				email: data.result.email,
			});
			setIsLogged(true);
		}
	} catch ({ response: { status, statusText } }) {
		localStorage.removeItem('token');
		setIsLogged(false);
		toast.error(statusText);
	}
};
