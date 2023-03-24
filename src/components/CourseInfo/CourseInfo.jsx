import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { dateСonversion } from 'helpers/dateGenerator';
import { pipeDuration } from 'helpers/pipeDuration';
import { authorGenerator } from 'helpers/authorGenerator';
import { COURSES_PATH } from 'constants';
import { Context } from 'context/context';

import style from './courseInfo.module.css';

export const CourseInfo = () => {
	let { courseId } = useParams();
	const { authors, courses } = useContext(Context);
	const course = courses.find((course) => course.id === courseId);
	return (
		<>
			<Link className={style.courseInfoBackBtn} to={`/${COURSES_PATH}`}>
				&#60; Back to courses
			</Link>

			<h2 className={style.courseInfoTitle}>{course.title}</h2>
			<div className={style.courseInfo}>
				<p className={style.courseInfoDescription}>{course.description}</p>
				<div className={style.courseInfoDetailsWrap}>
					<p className={style.courseInfoDetails}>
						ID: <span className={style.courseInfoDetailsText}>{course.id}</span>
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
	);
};
