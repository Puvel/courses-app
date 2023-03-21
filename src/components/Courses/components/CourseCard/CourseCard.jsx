import React from 'react';

import { Button } from 'common/Button/Button';

import style from './courseCard.module.css';

export const CourseCard = ({ title, description, author, duration, date }) => (
	<li className={style.course}>
		<div className={style.course_description_wrap}>
			<h4 className={style.course_title}>{title}</h4>
			<p>{description}</p>
		</div>
		<div className={style.course_info_wrap}>
			<p className={style.course_author}>Authors: {author}</p>
			<p className={style.course_duration}>Duration: {duration} hours</p>
			<p className={style.course_date}>Created: {date}</p>
			<Button>Show course</Button>
		</div>
	</li>
);
