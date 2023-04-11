import { SET_LOADING } from './actionTypes';

export const setLoading = (state) => {
	return {
		type: SET_LOADING,
		payload: state,
	};
};
