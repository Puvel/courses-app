import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { Button } from 'common/Button/Button';
import { selectUser } from 'store/selectors';

import style from './courseCard.module.css';

export const CourseCard = ({
	id,
	title,
	description,
	author,
	duration,
	date,
	deleteCourse,
}) => {
	let navigate = useNavigate();
	const { role } = useSelector(selectUser);
	return (
		<li className={style.course}>
			<div className={style.course_description_wrap}>
				<h4 className={style.course_title}>{title}</h4>
				<p>{description}</p>
			</div>
			<div className={style.course_info_wrap}>
				<p className={style.course_author}>Authors: {author}</p>
				<p className={style.course_duration}>Duration: {duration} hours</p>
				<p className={style.course_date}>Created: {date}</p>
				<div className={style.course_btn_wrap}>
					<Button onClick={() => navigate(`/courses/${id}`)}>
						Show course
					</Button>

					{role === 'admin' && (
						<>
							<button className={style.course_edit} type='button'>
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
