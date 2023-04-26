import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testRender } from 'helpers';
import { Courses } from '../Courses';
import { mockedCoursesList, mockedAuthorsList } from '../../../constants';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedUsedNavigate,
}));

test('Courses should display amount of CourseCard equal length of courses array', () => {
	testRender(<Courses />, {
		courses: mockedCoursesList,
		authors: mockedAuthorsList,
	});

	expect(screen.getAllByTestId('CourseCard')).toHaveLength(2);
});

test('Courses should display Empty container if courses array length is 0', () => {
	testRender(<Courses />);

	expect(screen.getByTestId('coursesList')).toBeEmptyDOMElement();
});

test('CourseForm should be showed after a click on a button "Add new course"', async () => {
	testRender(<Courses />, {
		user: {
			role: 'admin',
		},
		courses: mockedCoursesList,
		authors: mockedAuthorsList,
	});

	userEvent.click(screen.getByText('Add new course'));
	await waitFor(() =>
		expect(mockedUsedNavigate).toBeCalledWith('/courses/add')
	);
});
