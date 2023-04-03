import { Button } from 'common/Button/Button';

import style from './authorsList.module.css';

export const AuthorsList = ({
	title,
	authorBtnClick,
	authorBtnText,
	authors = [],
}) => (
	<div className={style.authors}>
		<h5 className={style.authorsTitle}>{title}</h5>
		{authors.length ? (
			<ul className={style.authorsList}>
				{authors.map((author) => (
					<li key={author.id} className={style.authorsItem}>
						<p>{author.name}</p>
						<Button onClick={authorBtnClick} data-id={author.id}>
							{authorBtnText}
						</Button>
					</li>
				))}
			</ul>
		) : (
			<p className={style.authorsEmpty}>Author list is empty</p>
		)}
	</div>
);
