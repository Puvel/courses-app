import {
	getCourses,
	addCourse,
	removeCourse,
	updateCourse,
} from './actionCreator';
import {
	fetchCourses,
	fetchAddCourse,
	fetchDeleteCourse,
	fetchUpdateCourse,
} from 'helpers';

export const getCoursesThunk = () => async (dispatch) => {
	const courses = await fetchCourses();
	dispatch(getCourses(courses));
};

export const addCourseThunk = (body) => async (dispatch) => {
	const data = await fetchAddCourse(body);
	dispatch(addCourse(data));
};

export const deleteCourseThunk = (id) => async (dispatch) => {
	const result = await fetchDeleteCourse(id);
	if (result) {
		dispatch(removeCourse(id));
	}
};

export const updateCourseThunk = (id, body) => async (dispatch) => {
	const data = await fetchUpdateCourse(id, body);
	dispatch(updateCourse(data));
};
