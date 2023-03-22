import React from 'react';

import style from './button.module.css';

export const Button = ({
	children,
	buttonType = 'button',
	buttonClick = null,
	...otherProps
}) => (
	<button className={style.button} type={buttonType} {...otherProps}>
		{children}
	</button>
);
