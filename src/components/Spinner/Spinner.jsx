import { Blocks } from 'react-loader-spinner';

import style from './spinner.module.css';

export const Spinner = () => (
	<div className={style.spinnerOverlay}>
		<Blocks
			visible={true}
			height='80'
			width='80'
			ariaLabel='blocks-loading'
			wrapperClass='spinnerOverlay'
		/>
	</div>
);
