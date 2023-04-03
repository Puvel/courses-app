import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { Button } from 'common/Button/Button';
import { dateСonversion } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { authorGenerator } from 'helpers/authorGenerator';
import { CREATE_COURSE_PATH } from 'constants';
import { Context } from 'context/context';

import style from './courses.module.css';

export const Courses = () => {
	const { courses, authors } = useContext(Context);
	const [foundCourses, setFoundCourses] = useState(courses);
	const navigate = useNavigate();

	const searchCourses = (query = '') => {
		if (!query) {
			setFoundCourses(courses);
		} else {
			const regExp = new RegExp(query, 'i');
			const foundCourses = courses.filter(
				(course) => regExp.test(course.title) || regExp.test(course.id)
			);
			setFoundCourses(foundCourses);
		}
	};

	return (
		<Context.Provider value={{ searchCourses }}>
			<div className={style.coursesSearch}>
				<SearchBar />
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
					/>
				))}
			</ul>
		</Context.Provider>
	);
};
