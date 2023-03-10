import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../../Layout/DashboardLayout';
import Main from '../../Layout/Main';
import Appointment from '../../Pages/Appointment/Appointment/Appointment';
import AddDoctor from '../../Pages/Dashboard/AddDoctor/AddDoctor';
import Dashboard from '../../Pages/Dashboard/Dashboard/Dashboard';
import ManageDoctors from '../../Pages/Dashboard/ManageDoctors/ManageDoctors';
import MyAppointment from '../../Pages/Dashboard/MyAppointment';
import Payment from '../../Pages/Dashboard/Payment/Payment';
import AllUsers from '../../Pages/Dashboard/Users/AllUsers';
import Users from '../../Pages/Dashboard/Users/AllUsers';
import Home from '../../Pages/Home/Home/Home';
import Login from '../../Pages/Login/Login';
import DisplayError from '../../Pages/Shared/DisplayErrror/DisplayError';
import SignUp from '../../Pages/SignUp/SignUp';
import AdminRoute from '../PrivateRoute/AdminRoute/AdminRoute';
import PrivateRoute from '../PrivateRoute/PrivateRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Main></Main>,
		errorElement: <DisplayError />,
		children: [
			{
				path: '/',
				element: <Home></Home>,
			},
			{
				path: '/login',
				element: <Login></Login>,
			},
			{
				path: '/signup',
				element: <SignUp></SignUp>,
			},
			{
				path: '/appointment',
				element: <Appointment></Appointment>,
			},
		],
	},
	{
		path: '/dashboard',
		element: (
			<PrivateRoute>
				<DashboardLayout />
			</PrivateRoute>
		),
		errorElement: <DisplayError />,
		children: [
			{
				path: '/dashboard',
				element: <MyAppointment />,
			},
			{
				path: 'dashboard/AllUsers',
				element: (
					<AdminRoute>
						<AllUsers />
					</AdminRoute>
				),
			},
			{
				path: 'dashboard/addDoctor',
				element: (
					<AdminRoute>
						<AddDoctor />
					</AdminRoute>
				),
			},
			{
				path: 'dashboard/managedoctors',
				element: (
					<AdminRoute>
						<ManageDoctors />
					</AdminRoute>
				),
			},
			{
				path: '/dashboard/payment/:id',
				element: <Payment />,
				loader: ({ params }) =>
					fetch(
						`https://doctors-portals-server-chi.vercel.app/booking/${params.id}`
					),
			},
		],
	},
]);

export default router;
