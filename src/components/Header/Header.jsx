import React from 'react';

import { Logo } from './components/Logo/Logo';
import { Button } from 'common/Button/Button';

import style from './header.module.css';

export const Header = () => (
	<header className={style.header}>
		<Logo />

		<div className={style.header_user_info}>
			<p className={style.header_user_name}>Pavel</p>
			<Button>Logout</Button>
		</div>
	</header>
);
