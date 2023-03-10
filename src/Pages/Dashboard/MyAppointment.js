import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../Shared/Loading/Loading';

const MyAppointment = () => {
	const { user, logOut } = useContext(AuthContext);

	const url = `https://doctors-portals-server-chi.vercel.app/bookings?email=${user?.email}`;

	const { data: bookings = [], isLoading } = useQuery({
		queryKey: ['bookings', user?.email],
		queryFn: async () => {
			try {
				const res = await fetch(url, {
					headers: {
						authorization: `bearer ${localStorage.getItem('accessToken')}`,
					},
				});
				if (res.status === 403 || res.status === 401) {
					logOut();
				}
				const data = (await res).json();
				return data;
			} catch (err) {
				console.log(err);
			}
		},
	});
	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			<h1 className='text-2xl  mb-5'>My Appointment</h1>
			<div className='overflow-x-auto'>
				<table className='table w-full'>
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Treatment</th>
							<th>Date</th>
							<th>Time</th>
							<th>Pay</th>
						</tr>
					</thead>
					<tbody>
						{bookings?.map((book, idx) => (
							<tr key={book._id}>
								<th>{idx + 1}</th>
								<td>{book.patient}</td>
								<td>{book.treatment}</td>
								<td>{book.appointmentDate}</td>
								<td>{book.slot}</td>
								<td>
									{book.price && !book.paid && (
										<Link to={`/dashboard/payment/${book._id}`}>
											<button className='btn btn-primary btn-xs'>Pay</button>
										</Link>
									)}

									{book.price && book.paid && (
										<span className=' text-green-400 font-bold'>Paid </span>
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyAppointment;
