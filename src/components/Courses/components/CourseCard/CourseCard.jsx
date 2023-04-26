import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from 'common';
import { selectUser } from 'store';

import style from './courseCard.module.css';

export const CourseCard = ({
	id,
	title,
	description,
	author,
	duration,
	date,
	deleteCourse = null,
}) => {
	let navigate = useNavigate();
	const { role } = useSelector(selectUser);
	return (
		<li className={style.course} data-testid='CourseCard'>
			<div className={style.course_description_wrap}>
				{title && <h4 className={style.course_title}>{title}</h4>}
				{description && <p>{description}</p>}
			</div>
			<div className={style.course_info_wrap}>
				{author && <p className={style.course_author}>Authors: {author}</p>}
				{duration && (
					<p className={style.course_duration}>Duration: {duration} hours</p>
				)}
				{date && <p className={style.course_date}>Created: {date}</p>}
				<div className={style.course_btn_wrap}>
					<Button onClick={() => navigate(`/courses/${id}`)}>
						Show course
					</Button>

					{role === 'admin' && (
						<>
							<button
								onClick={() => navigate(`/courses/update/${id}`)}
								className={style.course_edit}
								type='button'
							>
								&#9998;
							</button>
							<button
								onClick={() => {
									deleteCourse(id);
								}}
								className={style.course_remove}
								type='button'
							>
								&#128465;
							</button>
						</>
					)}
				</div>
			</div>
		</li>
	);
};
