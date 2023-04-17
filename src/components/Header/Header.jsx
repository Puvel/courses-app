import { useSelector, useDispatch } from 'react-redux';

import { Logo } from './components/Logo/Logo';
import { Button } from 'common/Button/Button';
import { selectUser } from 'store/selectors';
import { logOutThunk } from 'store/user/thunk';
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
							dispatch(logOutThunk());
						}}
					>
						Logout
					</Button>
				</div>
			)}
		</header>
	);
};
