import {
	GET_COURSES,
	ADD_COURSE,
	REMOVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const coursesReducer = (state = [], { type, payload }) => {
	switch (type) {
		case GET_COURSES:
			return [...payload];
		case ADD_COURSE:
			return [...state, payload];
		case REMOVE_COURSE:
			return [...state.filter((course) => course.id !== payload)];
		case UPDATE_COURSE:
			return [
				...state.map((user) => (user.id !== payload.id ? user : payload)),
			];

		default:
			return state;
	}
};
