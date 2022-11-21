import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';

const AllUsers = () => {
	const { data: users = [], refetch } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			try {
				const res = await fetch('http://localhost:5000/users');
				const data = await res.json();
				return data;
			} catch (err) {
				console.log(err);
			}
		},
	});
	const handleMakeAdmin = (id) => {
		fetch(`http://localhost:5000/users/addmin/${id}`, {
			method: 'put',
			headers: {
				authorization: `bearer ${localStorage.getItem('accessToken')}`,
			},
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					toast.success('Make admin successful.');
					refetch();
				}
			})
			.catch((err) => console.log(err));
		console.log(id);
	};
	const handleDelete = (id) => {
		console.log(id);
	};
	return (
		<div>
			<h1 className='text-3xl mb-5'>All Users</h1>
			<div className='overflow-x-auto'>
				{/* {isLoading && <Loading />} */}
				<table className='table w-full'>
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>email</th>
							<th>update</th>
							<th>delete</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((user, idx) => (
							<tr key={user._id}>
								<th>{idx + 1}</th>
								<th>{user.name}</th>
								<th>{user.email}</th>
								<th>
									{user?.role !== 'admin' && (
										<button
											onClick={() => handleMakeAdmin(user._id)}
											className='btn btn-xs btn-primary'
										>
											Make Admin
										</button>
									)}
								</th>
								<th>
									<button
										onClick={() => handleDelete(user._id)}
										className='btn btn-xs btn-error'
									>
										Delete
									</button>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
