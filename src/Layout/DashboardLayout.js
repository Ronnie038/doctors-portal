import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAdmin from '../ApiServices/useAdmin';
import { AuthContext } from '../contexts/AuthProvider';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const DashboardLayout = () => {
	const { user } = useContext(AuthContext);
	const [isAdmin] = useAdmin(user?.email);
	console.log(isAdmin);
	return (
		<div>
			<Navbar />
			<div className='drawer drawer-mobile'>
				<input
					id='dashboard-drawer'
					type='checkbox'
					className='drawer-toggle'
				/>
				<div className='drawer-content '>
					<Outlet />
				</div>
				<div className='drawer-side'>
					<label htmlFor='dashboard-drawer' className='drawer-overlay'></label>
					<ul className='menu p-4 w-80  text-base-content'>
						<li>
							<Link to='/dashboard'>My Appointment</Link>
						</li>
						{isAdmin && (
							<>
								<li>
									<Link to='dashboard/AllUsers'>All users</Link>
								</li>
								<li>
									<Link to='dashboard/addDoctor'>Add Doctor</Link>
								</li>
								<li>
									<Link to='dashboard/managedoctors'>Manage Doctors</Link>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
			{/* <Outlet /> */}
		</div>
	);
};

export default DashboardLayout;
