import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfiramationModal from '../../Shared/ConfirmationModal/ConfiramationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
	const [deletingDoctor, setDeletingDoctor] = useState(null);
	const closeModal = () => {
		setDeletingDoctor(null);
	};

	const {
		data: doctors = [],
		isLoading,
		refetch,
	} = useQuery({
		queryKey: ['doctors'],
		queryFn: async () => {
			try {
				const res = await fetch(`${process.env.REACT_APP_url}/doctors`, {
					headers: {
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				});

				const data = await res.json();

				return data;
			} catch (err) {
				console.log(err);
			}
		},
	});

	const handleDoctorDelete = async (doctor) => {
		try {
			const res = await fetch(
				`${process.env.REACT_APP_url}/doctors/${doctor._id}`,
				{
					method: 'delete',
					headers: {
						authorization: `Bearer ${localStorage.getItem('accessToken')}`,
					},
				}
			);

			const deletedDoctor = await res.json();

			if (deletedDoctor.acknowledged) {
				toast.success('doctor deleted successfully');
				refetch();
			}
		} catch (err) {
			console.log(err);
		}
	};

	if (isLoading) {
		return <Loading />;
	}
	return (
		<div>
			<h1 className='text-3xl'>Manage Doctors</h1>
			<div className='overflow-x-auto'>
				{/* {isLoading && <Loading />} */}
				<table className='table w-full'>
					{/* <!-- head --> */}
					<thead>
						<tr>
							<th></th>
							<th>avatar</th>
							<th>Name</th>
							<th>Specialty</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{doctors?.map((doctor, idx) => (
							<tr key={doctor._id}>
								<th>{idx + 1}</th>
								<th>
									<div className='avatar'>
										<div className='mask rounded-full w-12 h-12'>
											<img src={doctor.image} alt='Doctor avatar' />
										</div>
									</div>
								</th>
								<th>{doctor.name}</th>
								<th>{doctor.specialty}</th>
								<th>
									<label
										htmlFor='confirmation-modal'
										onClick={() => setDeletingDoctor(doctor)}
										className='btn btn-xs btn-error'
									>
										Delete
									</label>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			{deletingDoctor && (
				<ConfiramationModal
					title={`Are you sure you want to delete?`}
					message={`If you delete ${deletingDoctor.name} It cannot be recovered`}
					successAction={handleDoctorDelete}
					modalData={deletingDoctor}
					closeModal={closeModal}
					successButtonName='Delete'
				/>
			)}
		</div>
	);
};

export default ManageDoctors;
