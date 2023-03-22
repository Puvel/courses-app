import { ToastContainer } from 'react-toastify';

import { Header } from 'components/Header/Header';
import { Courses } from './components/Courses/Courses';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const App = () => (
	<>
		<Header />
		<Courses />
		<ToastContainer theme='dark' />
	</>
);
