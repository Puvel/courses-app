import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'common/Button/Button';
import { dateСonversion } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { authorGenerator } from 'helpers/authorGenerator';
import { CREATE_COURSE_PATH } from 'constants';
import { removeCourse } from 'store/courses/actionCreator';
import { selectCourses, selectAuthors } from 'store/selectors';

import style from './courses.module.css';

export const Courses = () => {
	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);
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
		dispatch(removeCourse(id));
	};

	useMemo(() => {
		setFoundCourses(courses);
	}, [courses]);

	return (
		<>
			<div className={style.coursesSearch}>
				<SearchBar searchCourses={searchCourses} />
				<Button onClick={() => navigate(`/${CREATE_COURSE_PATH}`)}>
					Add new course
				</Button>
			</div>
			<ul>
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
