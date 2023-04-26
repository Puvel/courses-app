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
			setToken(token);
			return { token: token, email: data.user.email, name: data.user.name };
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
			clearToken();
			return true;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchCheckUser = async (token) => {
	try {
		const { status, data } = await axios.get('/users/me', {
			headers: { Authorization: token },
		});

		if (status === 200) {
			setToken(token);
			return {
				name: data.result.name,
				email: data.result.email,
				role: data.result.role,
			};
		}
	} catch ({ response: { status, statusText } }) {
		toast.error(statusText);
	}
};

// ========= COURSES ===========
export const fetchCourses = async () => {
	try {
		const { data, status } = await axios.get('/courses/all');
		if (status === 200) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchGetCourse = async (id) => {
	try {
		const { data, status } = await axios.get(`/courses/${id}`);
		if (status === 200) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchAddCourse = async (body) => {
	try {
		const { data, status } = await axios.post('/courses/add', body);
		if (status === 201) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchDeleteCourse = async (id) => {
	try {
		const { status } = await axios.delete(`/courses/${id}`);
		if (status === 200) {
			return true;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchUpdateCourse = async (id, body) => {
	try {
		const { data, status } = await axios.put(`/courses/${id}`, body);
		if (status === 200) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

// ========= AUTHORS ===========
export const fetchAuthors = async () => {
	try {
		const { data, status } = await axios.get('/authors/all');
		if (status === 200) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};

export const fetchAddAuthor = async (body) => {
	try {
		const { data, status } = await axios.post('/authors/add', body);
		if (status === 201) {
			return data.result;
		}
	} catch ({ response: { statusText } }) {
		toast.error(statusText);
	}
};
