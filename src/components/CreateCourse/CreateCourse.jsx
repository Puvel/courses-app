import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';

import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';
import { AuthorsList } from './components/AuthorsList/AuthorsList';
import { pipeDuration } from 'helpers/pipeDuration';
import { dateGenerator } from 'helpers/dateGenerator';
import { fieldsValidation } from 'helpers/fieldsValidation';
import { Context } from 'context/context';

import style from './createCourse.module.css';

export const CreateCourse = () => {
	const { createAuthor, createCourse, authors } = useContext(Context);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [author, setAuthor] = useState('');
	const [duration, setDuration] = useState('');
	const [courseAuthor, setCourseAuthor] = useState([]);
	const [availableAuthors, setAvailableAuthors] = useState(authors);

	const addAuthor = (e) => {
		const author = availableAuthors.find(
			(author) => author.id === e.target.dataset.id
		);
		if (author) {
			setCourseAuthor((prevState) => [...prevState, author]);
			setAvailableAuthors((prevList) =>
				prevList.filter((item) => item.id !== author.id)
			);
		}
	};

	const deleteAuthor = (e) => {
		const author = courseAuthor.find(
			(author) => author.id === e.target.dataset.id
		);
		if (author) {
			setAvailableAuthors((prevState) => [...prevState, author]);
			setCourseAuthor((prevList) =>
				prevList.filter((item) => item.id !== author.id)
			);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;

		switch (name) {
			case 'title':
				setTitle(value);
				break;
			case 'description':
				setDescription(value);
				break;
			case 'author':
				setAuthor(value);
				break;
			case 'duration':
				if (!/^([0-9]\d*)$/.test(value) && value !== '') {
					return;
				}
				setDuration(value);
				break;

			default:
				return;
		}
	};

	const handleCreateAuthor = () => {
		if (author.length < 3) {
			toast.warn('Author name length should be at least 2 characters!');
			return;
		}
		const newAuthor = createAuthor(author);
		setAvailableAuthors((prevState) => [...prevState, newAuthor]);
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
			createCourse({
				title,
				description,
				creationDate: dateGenerator(new Date(), '/'),
				duration: +duration,
				authors: courseAuthor.map(({ id }) => id),
			});
		}
	};

	return (
		<section className={style.createCourse}>
			<div className={style.createCourseTitleContainer}>
				<div className={style.createCourseInputTitle}>
					<Input
						id='title'
						name='title'
						labelId='title'
						type='text'
						labelText='Title'
						placeholder='Enter title...'
						value={title}
						onChange={handleChange}
					/>
				</div>

				<Button onClick={createCourseHandle}>Create course</Button>
			</div>
			<div className={style.createCourseDescription}>
				<Input
					isArea={true}
					id='description'
					name='description'
					labelId='description'
					labelText='Description'
					placeholder='Enter description...'
					value={description}
					onChange={handleChange}
				/>
			</div>
			<div className={style.createCourseAuthorsWrap}>
				<div className={style.createCourseAuthors}>
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
								onChange={handleChange}
							/>
						</div>

						<Button onClick={handleCreateAuthor}>Create author</Button>
					</div>
					<div className={style.createCourseDuration}>
						<h5 className={style.createCourseDurationTitle}>Duration</h5>
						<div className={style.createCourseDurationInput}>
							<Input
								id='duration'
								name='duration'
								labelId='duration'
								type='text'
								labelText='Duration'
								placeholder='Enter duration in minutes...'
								value={duration}
								onChange={handleChange}
							/>
						</div>

						<p className={style.createCourseDurationText}>
							Duration:
							<span className={style.createCourseDurationValue}>
								{duration ? pipeDuration(duration) : '00:00'}
							</span>
							hours
						</p>
					</div>
				</div>
				<div className={style.createCourseAuthors}>
					<AuthorsList
						authorBtnClick={addAuthor}
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
		</section>
	);
};
