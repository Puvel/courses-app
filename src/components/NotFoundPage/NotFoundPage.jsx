import image from './not_found.jpeg';

import style from './notFoundPage.module.css';

export const NotFoundPage = () => (
	<div className={style.notFoundWrap}>
		<img className={style.notFoundImage} src={image} alt='Not found' />
		<div className={style.notFoundTextWrap}>
			<h2 className={style.notFoundTitle}>AWWW...DON&#39;T CRY.</h2>
			<p>
				It's just a 404 Error! <br />
				What you&#39;re looking for may have been misplaced in Long Term Memory.
			</p>
		</div>
	</div>
);
