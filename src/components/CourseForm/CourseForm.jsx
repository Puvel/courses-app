import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uIdv4 } from 'uuid';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { AuthorsList } from './components/AuthorsList/AuthorsList';
import { pipeDuration } from 'helpers/pipeDuration';
import { dateGenerator } from 'helpers/dateGenerator';
import { fieldsValidation } from 'helpers/fieldsValidation';
import { selectAuthors } from 'store/selectors';
import { addAuthorThunk } from 'store/authors/thunk';
import { addCourse } from 'store/courses/actionCreator';
import {
	INPUT_TITLE_ID,
	INPUT_DESCRIPTION_ID,
	INPUT_DURATION_ID,
	INPUT_AUTHOR_ID,
	COURSES_PATH,
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
	const [availableAuthors, setAvailableAuthors] = useState(authors);
	const navigate = useNavigate();

	useEffect(() => {
		setAvailableAuthors(
			authors.filter((author) => !courseAuthor.includes(author.id))
		);
	}, [authors, courseAuthor]);

	const inputsStates = {
		[INPUT_TITLE_ID]: setTitle,
		[INPUT_DESCRIPTION_ID]: setDescription,
		[INPUT_AUTHOR_ID]: setAuthor,
		[INPUT_DURATION_ID]: setDuration,
	};

	const setAuthorHandle = (e) => {
		const author = availableAuthors.find(
			(author) => author.id === e.target.dataset.id
		);
		if (author) {
			setCourseAuthor([...courseAuthor, author]);
			// setAvailableAuthors((prevList) =>
			// 	prevList.filter((item) => item.id !== author.id)
			// );
		}
	};

	const deleteAuthor = (e) => {
		const author = courseAuthor.find(
			(author) => author.id === e.target.dataset.id
		);
		if (author) {
			// setAvailableAuthors([...availableAuthors, author]);
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

		// setAvailableAuthors([...availableAuthors, newAuthor]);
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
			dispatch(
				addCourse({
					id: uIdv4(),
					title,
					description,
					creationDate: dateGenerator(new Date(), '/'),
					duration: +duration,
					authors: courseAuthor.map(({ id }) => id),
				})
			);

			navigate(`/${COURSES_PATH}`);
		}
	};

	return (
		<>
			<div className={style.courseFormTitleContainer}>
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

				<Button onClick={createCourseHandle}>Create course</Button>
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
						authorBtnClick={setAuthorHandle}
						authorBtnText='Add author'
						title='Authors'
						authors={availableAuthors}
					/>
					<AuthorsList
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
