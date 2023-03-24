import { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Header } from 'components/Header/Header';
import { Spinner } from 'components/Spinner/Spinner';
import { Context } from 'context/context';

import style from './layout.module.css';

export const Layout = () => {
	const { IsLoading } = useContext(Context);
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
