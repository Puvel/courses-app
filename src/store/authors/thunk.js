import { getAuthors, addAuthor } from './actionCreator';
import { setLoading } from '../general/actionCreator';
import { fetchAuthors, fetchAddAuthor } from 'helpers/fetchApi';

export const getAuthorsThunk = () => async (dispatch) => {
	dispatch(setLoading(true));
	const authors = await fetchAuthors();
	dispatch(getAuthors(authors));
	dispatch(setLoading(false));
};

export const addAuthorThunk = (body) => async (dispatch) => {
	dispatch(setLoading(true));
	const data = await fetchAddAuthor(body);
	dispatch(addAuthor(data));
	dispatch(setLoading(false));
};
