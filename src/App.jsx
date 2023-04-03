import { useState, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { Login } from 'components/Login/Login';
import { Layout } from 'components/Layout/Layout';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { Context } from 'context/context';
import { fetchLogout, fetchCheckUser } from 'helpers/fetchApi';
import {
	LOGIN_PATH,
	REGISTRATION_PATH,
	COURSES_PATH,
	COURSE_PATH,
	ERROR_PATH,
	CREATE_COURSE_PATH,
	mockedCoursesList,
	mockedAuthorsList,
} from 'constants';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const App = () => {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(
		!!localStorage.getItem('isLoggedIn')
	);
	const [courses, setCourses] = useState(mockedCoursesList);
	const [authors, setAuthors] = useState(mockedAuthorsList);

	const logOutHandle = async () => {
		setIsLoading(true);
		const res = await fetchLogout();
		if (res) {
			setIsLoggedIn(false);
			setUser(null);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			fetchCheckUser(token, setUser, setIsLoggedIn);
		}
	}, []);

	return (
		<Context.Provider
			value={{
				user,
				setUser,
				logOutHandle,
				isLoggedIn,
				setIsLoggedIn,
				isLoading,
				setIsLoading,
				courses,
				setCourses,
				authors,
				setAuthors,
			}}
		>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						index
						element={<Navigate to={`/${LOGIN_PATH}`} replace={true} />}
					/>
					<Route
						path={REGISTRATION_PATH}
						element={
							!isLoggedIn ? (
								<Registration />
							) : (
								<Navigate to={`/${COURSES_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={LOGIN_PATH}
						element={
							!isLoggedIn ? (
								<Login />
							) : (
								<Navigate to={`/${COURSES_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={COURSES_PATH}
						element={
							isLoggedIn ? (
								<Courses />
							) : (
								<Navigate to={`/${LOGIN_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={CREATE_COURSE_PATH}
						element={
							isLoggedIn ? (
								<CreateCourse />
							) : (
								<Navigate to={`/${LOGIN_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={`${COURSES_PATH}/${COURSE_PATH}`}
						element={
							isLoggedIn ? (
								<CourseInfo />
							) : (
								<Navigate to={`/${LOGIN_PATH}`} replace={true} />
							)
						}
					/>
					<Route path={`/${ERROR_PATH}`} element={<NotFoundPage />} />
					<Route
						path='*'
						element={<Navigate to={`/${ERROR_PATH}`} replace={true} />}
					/>
				</Route>
			</Routes>
		</Context.Provider>
	);
};
