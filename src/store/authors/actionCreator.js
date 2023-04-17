import { GET_AUTHORS, ADD_AUTHORS } from './actionTypes';

export const getAuthors = (authors) => {
	return {
		type: GET_AUTHORS,
		payload: authors,
	};
};

export const addAuthor = (author) => {
	console.log(author);
	return {
		type: ADD_AUTHORS,
		payload: author,
	};
};
