import { useState } from 'react';

import { Input } from 'common/Input/Input';
import { Button } from 'common/Button/Button';

import style from './searchBar.module.css';

export const SearchBar = ({ searchCourses }) => {
	const [search, setSearch] = useState('');

	const searchChange = ({ target: { value } }) => {
		setSearch(value);
		if (!value.length) {
			searchCourses();
		}
	};

	const searchBtnClick = () => {
		if (search.length) {
			searchCourses(search);
		}
	};

	return (
		<div className={style.searchBar}>
			<div className={style.searchBarInputWrap}>
				<Input
					id='search'
					name='search'
					labelId='search'
					type='text'
					labelText='Search'
					placeholder='Enter course name or id...'
					hideLabel={true}
					value={search}
					onChange={searchChange}
				/>
			</div>

			<Button onClick={searchBtnClick}>Search</Button>
		</div>
	);
};
