import React, { useState } from 'react';
import { v4 as uIdv4 } from 'uuid';

import { SearchBar } from './components/SearchBar/SearchBar';
import { CourseCard } from './components/CourseCard/CourseCard';
import { CreateCourse } from 'components/CreateCourse/CreateCourse';
import { Button } from 'common/Button/Button';
import { Context } from 'context/context';
import { dateСonversion } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { authorGenerator } from 'helpers/authorGenerator';
import { mockedCoursesList, mockedAuthorsList } from 'constants';

import style from './courses.module.css';

export const Courses = () => {
	const [courses, setCourses] = useState(mockedCoursesList);
	const [foundCourses, setFoundCourses] = useState(courses);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [creationMode, setMode] = useState(false);

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

	const createAuthor = (author) => {
		const newAuthor = { id: uIdv4(), name: author };
		setAuthors([...authors, newAuthor]);
		return newAuthor;
	};

	const createCourse = (data) => {
		const newCourse = { ...data, id: uIdv4() };
		setCourses([...courses, newCourse]);
		setFoundCourses([...courses, newCourse]);
		setMode(false);
	};

	return (
		<Context.Provider
			value={{ searchCourses, createAuthor, createCourse, authors }}
		>
			{!creationMode && (
				<section className={style.courses}>
					<div className={style.coursesSearch}>
						<SearchBar />
						<Button onClick={() => setMode(true)}>Add new course</Button>
					</div>
					<ul>
						{foundCourses.map((course) => (
							<CourseCard
								key={course.id}
								title={course.title}
								description={course.description}
								date={dateСonversion(course.creationDate)}
								duration={pipeDuration(course.duration)}
								author={authorGenerator(authors, course.authors)}
							/>
						))}
					</ul>
				</section>
			)}
			{creationMode && <CreateCourse />}
		</Context.Provider>
	);
};
