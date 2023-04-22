import { useSelector, useDispatch } from 'react-redux';

import { Logo } from './components/Logo';
import { Button } from 'common';
import { selectUser, logOutThunk, setLoading } from 'store';

import style from './header.module.css';

export const Header = () => {
	const { name, isAuth } = useSelector(selectUser);
	const dispatch = useDispatch();

	return (
		<header className={style.header}>
			<Logo />

			{isAuth && (
				<div className={style.header_user_info}>
					{name && <p className={style.header_user_name}>{name}</p>}
					<Button
						onClick={() => {
							dispatch(setLoading(true));
							dispatch(logOutThunk());
							dispatch(setLoading(false));
						}}
					>
						Logout
					</Button>
				</div>
			)}
		</header>
	);
};
