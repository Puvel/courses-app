import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectUser } from 'store';

export const PrivateRoute = ({ children }) => {
	const { role } = useSelector(selectUser);
	return role === 'admin' ? children : <Navigate to={'/courses'} />;
};
