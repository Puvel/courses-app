import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchBar, CourseCard } from './components';
import { Button } from 'common';
import { pipeDuration, authorGenerator, dateСonversion } from 'helpers';
import {
	selectCourses,
	selectAuthors,
	selectUser,
	setLoading,
	deleteCourseThunk,
} from 'store';

import style from './courses.module.css';

export const Courses = () => {
	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);
	const { role } = useSelector(selectUser);
	const [foundCourses, setFoundCourses] = useState(courses);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const searchCourses = (query = '') => {
		if (!query) {
			setFoundCourses(courses);
		} else {
			const regExp = new RegExp(query, 'i');
			const filteredCourses = courses.filter(
				(course) => regExp.test(course.title) || regExp.test(course.id)
			);
			setFoundCourses(filteredCourses);
		}
	};

	const deleteCourse = (id) => {
		dispatch(setLoading(true));
		dispatch(deleteCourseThunk(id));
		dispatch(setLoading(false));
	};

	useMemo(() => {
		setFoundCourses(courses);
	}, [courses]);

	return (
		<>
			<div className={style.coursesSearch}>
				<SearchBar searchCourses={searchCourses} />
				{role === 'admin' && (
					<Button
						onClick={() => {
							navigate(`/courses/add`);
						}}
					>
						Add new course
					</Button>
				)}
			</div>
			<ul data-testid='coursesList'>
				{foundCourses.map((course) => (
					<CourseCard
						key={course.id}
						id={course.id}
						title={course.title}
						description={course.description}
						date={dateСonversion(course.creationDate)}
						duration={pipeDuration(course.duration)}
						author={authorGenerator(authors, course.authors).join(', ')}
						deleteCourse={deleteCourse}
					/>
				))}
			</ul>
		</>
	);
};
