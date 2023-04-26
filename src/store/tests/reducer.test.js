import { coursesReducer } from '../courses/reducer';
import { addCourse, getCourses } from '../courses/actionCreator';
import { TEST_COURSE, mockedCoursesList } from '../../constants';

test('Reducer should return the initial state', () => {
	expect(coursesReducer(undefined, { type: undefined })).toEqual([]);
});

test('Reducer should handle ADD_COURSE and returns new state', () => {
	expect(coursesReducer([], addCourse(TEST_COURSE))).toEqual([TEST_COURSE]);
});

test('Reducer should handle GET_COURSES and returns new state', () => {
	expect(coursesReducer([], getCourses(mockedCoursesList))).toEqual(
		mockedCoursesList
	);
});
