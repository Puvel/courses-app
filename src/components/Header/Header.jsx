import { useSelector, useDispatch } from 'react-redux';

import { Logo } from './components/Logo/Logo';
import { Button } from 'common/Button/Button';
import { selectUser } from 'store/selectors';
import { onLogout } from 'store/user/actionCreator';
import { setLoading } from 'store/general/actionCreator';
import { fetchLogout } from 'helpers/fetchApi';

import style from './header.module.css';

export const Header = () => {
	const { name } = useSelector(selectUser);
	const dispatch = useDispatch();

	const logOut = async () => {
		dispatch(setLoading(true));
		const res = await fetchLogout();
		if (res) {
			dispatch(onLogout());
		}
		dispatch(setLoading(false));
	};

	return (
		<header className={style.header}>
			<Logo />

			{name && (
				<div className={style.header_user_info}>
					<p className={style.header_user_name}>{name}</p>
					<Button onClick={logOut}>Logout</Button>
				</div>
			)}
		</header>
	);
};
