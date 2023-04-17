import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';

import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { selectLoading } from 'store/selectors';

import style from './layout.module.css';

export const Layout = () => {
	const { IsLoading } = useSelector(selectLoading);
	return (
		<>
			<Header />
			<section className={style.layout}>
				<Outlet />
			</section>
			<ToastContainer theme='dark' />
			{IsLoading && <Spinner />}
		</>
	);
};
