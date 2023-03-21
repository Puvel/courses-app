import React from 'react';

import logo from './logo.png';

import style from './logo.module.css';

export const Logo = () => (
	<img className={style.logo} src={logo} alt='Courses Logo' />
);
