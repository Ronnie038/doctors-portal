import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../../ApiServices/useAdmin';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../../Pages/Shared/Loading/Loading';

const AdminRoute = ({ children }) => {
	const { user, loading } = useContext(AuthContext);
	const location = useLocation();
	const [isAdmin, isAdminLoading] = useAdmin(user?.email);

	if (isAdminLoading || loading) {
		return <Loading />;
	}

	if (user && isAdmin) {
		return children;
	}

	return <Navigate to='/login' state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
