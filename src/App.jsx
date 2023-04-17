import { useEffect, useCallback } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Courses } from './components/Courses/Courses';
import { Registration } from './components/Registration/Registration';
import { Login } from 'components/Login/Login';
import { Layout } from 'components/Layout/Layout';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { CourseForm } from './components/CourseForm/CourseForm';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import { fetchCourses, fetchCheckUser } from 'helpers/fetchApi';
import { selectUser } from 'store/selectors';
import { setLoading } from 'store/general/actionCreator';
import { onLogin, onLogout } from 'store/user/actionCreator';
import { getCourses } from 'store/courses/actionCreator';
import { getAuthorsThunk } from 'store/authors/thunk';
import {
	LOGIN_PATH,
	REGISTRATION_PATH,
	COURSES_PATH,
	COURSE_PATH,
	ERROR_PATH,
	CREATE_COURSE_PATH,
} from 'constants';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export const App = () => {
	const { isAuth } = useSelector(selectUser);
	const dispatch = useDispatch();

	const getCoursesDate = useCallback(async () => {
		const courseRes = await fetchCourses();
		dispatch(getCourses(courseRes));
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	const chekUser = useCallback(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			const user = await fetchCheckUser(token);
			if (user) {
				dispatch(onLogin({ ...user, token: token }));
			} else {
				dispatch(onLogout());
			}
		}
	}, [dispatch]);

	useEffect(() => {
		dispatch(setLoading(true));
		chekUser();
		getCoursesDate();
		dispatch(setLoading(false));
	}, [dispatch, chekUser, getCoursesDate]);

	return (
		<>
			<Routes>
				<Route path='/' element={<Layout />}>
					<Route
						index
						element={<Navigate to={`/${LOGIN_PATH}`} replace={true} />}
					/>
					<Route
						path={REGISTRATION_PATH}
						element={
							!isAuth ? (
								<Registration />
							) : (
								<Navigate to={`/${COURSES_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={LOGIN_PATH}
						element={
							!isAuth ? (
								<Login />
							) : (
								<Navigate to={`/${COURSES_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={COURSES_PATH}
						element={
							isAuth ? (
								<Courses />
							) : (
								<Navigate to={`/${LOGIN_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={CREATE_COURSE_PATH}
						element={
							isAuth ? (
								<PrivateRoute>
									<CourseForm />
								</PrivateRoute>
							) : (
								<Navigate to={`/${LOGIN_PATH}`} replace={true} />
							)
						}
					/>
					<Route
						path={`${COURSES_PATH}/${COURSE_PATH}`}
						element={
							isAuth ? (
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
		</>
	);
};
