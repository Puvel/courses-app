import { useCallback, useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
	dateСonversion,
	authorGenerator,
	pipeDuration,
	fetchGetCourse,
} from 'helpers';
import { COURSES_PATH, ERROR_PATH } from 'constants';
import { selectAuthors } from 'store';

import style from './courseInfo.module.css';

export const CourseInfo = () => {
	let { courseId } = useParams();
	const navigate = useNavigate();
	const authors = useSelector(selectAuthors);

	const [course, setCourse] = useState(null);

	const getCourse = useCallback(async () => {
		const data = await fetchGetCourse(courseId);
		if (data) {
			setCourse(data);
		} else {
			navigate(`/${ERROR_PATH}`, { replace: true });
		}
	}, [courseId, navigate]);

	useEffect(() => {
		if (courseId) {
			getCourse();
		}
	}, [courseId, getCourse]);

	return (
		course && (
			<>
				<Link className={style.courseInfoBackBtn} to={`/${COURSES_PATH}`}>
					&#60; Back to courses
				</Link>

				<h2 className={style.courseInfoTitle}>{course.title}</h2>
				<div className={style.courseInfo}>
					<p className={style.courseInfoDescription}>{course.description}</p>
					<div className={style.courseInfoDetailsWrap}>
						<p className={style.courseInfoDetails}>
							ID:{' '}
							<span className={style.courseInfoDetailsText}>{course.id}</span>
						</p>
						<p className={style.courseInfoDetails}>
							Duration:{' '}
							<span className={style.courseInfoDetailsText}>
								{pipeDuration(course.duration)} hours
							</span>
						</p>
						<p className={style.courseInfoDetails}>
							Created:{' '}
							<span className={style.courseInfoDetailsText}>
								{dateСonversion(course.creationDate)}
							</span>
						</p>

						<ul className={style.courseInfoDetails}>
							<li>
								<p>Authors:</p>
							</li>
							{authorGenerator(authors, course.authors).map((author, idx) => (
								<li key={idx}>
									<span className={style.courseInfoDetailsText}>{author}</span>
								</li>
							))}
						</ul>
					</div>
				</div>
			</>
		)
	);
};
