import { getAuthors, addAuthor } from './actionCreator';
import { fetchAuthors, fetchAddAuthor } from 'helpers';

export const getAuthorsThunk = () => async (dispatch) => {
	const authors = await fetchAuthors();
	dispatch(getAuthors(authors));
};

export const addAuthorThunk = (body) => async (dispatch) => {
	const data = await fetchAddAuthor(body);
	dispatch(addAuthor(data));
};
