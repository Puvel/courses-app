import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';

import { CourseCard } from '../CourseCard';
import { TEST_COURSE, TEST_AUTHORS } from '../../../../../constants';
import {
	testRender,
	pipeDuration,
	authorGenerator,
	dateСonversion,
} from 'helpers';

const state = {
	authors: TEST_AUTHORS,
};

test('CourseCard should display title', () => {
	testRender(
		<CourseCard id={TEST_COURSE.id} title={TEST_COURSE.title} />,
		state
	);

	expect(screen.getByRole('heading', { level: 4 })).toHaveTextContent(
		'Test course'
	);
});

test('CourseCard should display description', () => {
	testRender(
		<CourseCard id={TEST_COURSE.id} description={TEST_COURSE.description} />,
		state
	);

	expect(screen.getByText('Test course description')).toBeInTheDocument();
});

test('CourseCard should display duration in the correct format', () => {
	testRender(
		<CourseCard
			id={TEST_COURSE.id}
			duration={pipeDuration(TEST_COURSE.duration)}
		/>,
		state
	);

	expect(screen.getByText('Duration: 02:05 hours')).toBeInTheDocument();
});

test('CourseCard should display authors list', () => {
	testRender(
		<CourseCard
			id={TEST_COURSE.id}
			author={authorGenerator(state.authors, TEST_COURSE.authors).join(', ')}
		/>,
		state
	);

	expect(
		screen.getByText('Authors: Test author1, Test author3')
	).toBeInTheDocument();
});

test('CourseCard should display created date in the correct format', () => {
	testRender(
		<CourseCard
			id={TEST_COURSE.id}
			date={dateСonversion(TEST_COURSE.creationDate)}
		/>,
		state
	);

	expect(screen.getByText('Created: 18.04.2023')).toBeInTheDocument();
});
