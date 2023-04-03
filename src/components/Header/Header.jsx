import { useContext } from 'react';

import { Logo } from './components/Logo/Logo';
import { Button } from 'common/Button/Button';
import { Context } from 'context/context';

import style from './header.module.css';

export const Header = () => {
	const { user, logOutHandle } = useContext(Context);
	return (
		<header className={style.header}>
			<Logo />

			{user && (
				<div className={style.header_user_info}>
					<p className={style.header_user_name}>{user.name}</p>
					<Button onClick={logOutHandle}>Logout</Button>
				</div>
			)}
		</header>
	);
};
