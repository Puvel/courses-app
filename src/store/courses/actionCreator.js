import {
	GET_COURSES,
	ADD_COURSE,
	REMOVE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

export const getCourses = (courses) => {
	return {
		type: GET_COURSES,
		payload: courses,
	};
};

export const addCourse = (course) => {
	return {
		type: ADD_COURSE,
		payload: course,
	};
};

export const removeCourse = (id) => {
	return {
		type: REMOVE_COURSE,
		payload: id,
	};
};

export const updateCourse = (course) => {
	return {
		type: UPDATE_COURSE,
		payload: course,
	};
};
