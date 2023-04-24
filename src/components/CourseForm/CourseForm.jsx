import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import { Input, Button } from 'common';
import { AuthorsList } from './components/AuthorsList';
import { pipeDuration, fieldsValidation, fetchGetCourse } from 'helpers';
import {
	addCourseThunk,
	updateCourseThunk,
	addAuthorThunk,
	selectAuthors,
} from 'store';
import {
	INPUT_TITLE_ID,
	INPUT_DESCRIPTION_ID,
	INPUT_DURATION_ID,
	INPUT_AUTHOR_ID,
	COURSES_PATH,
	ERROR_PATH,
} from 'constants';

import style from './courseForm.module.css';

export const CourseForm = () => {
	const authors = useSelector(selectAuthors);
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');
	const [duration, setDuration] = useState('');
	const [courseAuthor, setCourseAuthor] = useState([]);
	const navigate = useNavigate();
	const { courseId } = useParams();
	const [course, setCourse] = useState(null);

	const getCourse = useCallback(async () => {
		const data = await fetchGetCourse(courseId);
		if (data) {
			setCourse(data);
			setTitle(data.title);
			setDescription(data.description);
			setDuration(data.duration);
			setCourseAuthor(
				authors.filter((author) => data.authors.includes(author.id))
			);
		} else {
			navigate(`/${ERROR_PATH}`, { replace: true });
		}
	}, [courseId, navigate, authors]);

	const inputsStates = {
		[INPUT_TITLE_ID]: setTitle,
		[INPUT_DESCRIPTION_ID]: setDescription,
		[INPUT_AUTHOR_ID]: setAuthor,
		[INPUT_DURATION_ID]: setDuration,
	};

	const setAuthorHandle = (e) => {
		const author = authors.find((author) => author.id === e.target.dataset.id);
		if (author) {
			setCourseAuthor([...courseAuthor, author]);
		}
	};

	const deleteAuthor = (e) => {
		const author = courseAuthor.find(
			(author) => author.id === e.target.dataset.id
		);
		if (author) {
			setCourseAuthor((prevList) =>
				prevList.filter((item) => item.id !== author.id)
			);
		}
	};

	const handleChange = (ukey, { target: { value } }) => {
		if (
			!/^([0-9]\d*)$/.test(value) &&
			value !== '' &&
			ukey === INPUT_DURATION_ID
		) {
			return;
		}

		inputsStates[ukey](value);
	};

	const handleCreateAuthor = () => {
		if (author.length < 3) {
			toast.warn('Author name length should be at least 2 characters!');
			return;
		} else if (/^[\s]+$/.test(author)) {
			return;
		}
		dispatch(addAuthorThunk({ name: author }));
		setAuthor('');
	};

	const createCourseHandle = () => {
		const isValid = fieldsValidation({
			title,
			description,
			duration,
			courseAuthor,
		});
		if (isValid) {
			const formData = {
				title: title,
				description: description,
				duration: +duration,
				authors: courseAuthor.map(({ id }) => id),
			};
			if (course) {
				dispatch(updateCourseThunk(course.id, formData));
			} else {
				dispatch(addCourseThunk(formData));
			}

			navigate(`/${COURSES_PATH}`);
		}
	};

	useEffect(() => {
		if (courseId) {
			getCourse();
		}
	}, [courseId, getCourse]);

	return (
		<>
			<div data-testid='CourseForm' className={style.courseFormTitleContainer}>
				<div className={style.courseFormInputTitle}>
					<Input
						id='title'
						name='title'
						labelId='title'
						type='text'
						labelText='Title'
						placeholder='Enter title...'
						value={title}
						onChange={(e) => handleChange(INPUT_TITLE_ID, e)}
					/>
				</div>

				<Button onClick={createCourseHandle}>
					{course ? 'Update course' : 'Create course'}
				</Button>
			</div>
			<div className={style.courseFormDescription}>
				<Input
					isArea={true}
					id='description'
					name='description'
					labelId='description'
					labelText='Description'
					placeholder='Enter description...'
					value={description}
					onChange={(e) => handleChange(INPUT_DESCRIPTION_ID, e)}
				/>
			</div>
			<div className={style.courseFormAuthorsWrap}>
				<div className={style.courseFormAuthors}>
					<div className={style.createAuthor}>
						<h5 className={style.createAuthorTitle}>Add author</h5>
						<div className={style.createAuthorInput}>
							<Input
								id='author'
								name='author'
								labelId='author'
								type='text'
								labelText='Author name'
								placeholder='Enter author name...'
								value={author}
								onChange={(e) => handleChange(INPUT_AUTHOR_ID, e)}
							/>
						</div>

						<Button onClick={handleCreateAuthor}>Create author</Button>
					</div>
					<div className={style.courseFormDuration}>
						<h5 className={style.courseFormDurationTitle}>Duration</h5>
						<div className={style.courseFormDurationInput}>
							<Input
								id='duration'
								name='duration'
								labelId='duration'
								type='text'
								labelText='Duration'
								placeholder='Enter duration in minutes...'
								value={duration}
								onChange={(e) => handleChange(INPUT_DURATION_ID, e)}
							/>
						</div>

						<p className={style.courseFormDurationText}>
							Duration:
							<span className={style.courseFormDurationValue}>
								{duration ? pipeDuration(duration) : '00:00'}
							</span>
							hours
						</p>
					</div>
				</div>
				<div className={style.courseFormAuthors}>
					<AuthorsList
						testsId='allAuthors'
						authorBtnClick={setAuthorHandle}
						authorBtnText='Add author'
						title='Authors'
						authors={authors.filter((author) =>
							course
								? !course.authors.includes(author.id)
								: !courseAuthor.includes(author)
						)}
					/>
					<AuthorsList
						testsId='courseAuthors'
						authorBtnClick={deleteAuthor}
						authorBtnText='Delete author'
						title='Course authors'
						authors={courseAuthor}
					/>
				</div>
			</div>
		</>
	);
};
