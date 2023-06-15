import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import Loading from '../../Shared/Loading/Loading';

const AddDoctor = () => {
	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();
	const [loginError, setLoginError] = useState('');
	const img_host_key = process.env.REACT_APP_imgbb_key;
	const [lodingImg, setLoadingImg] = useState(false);

	const navigate = useNavigate();

	const { data: specialties = [], isLoading } = useQuery({
		queryKey: ['specialty'],
		queryFn: async () => {
			try {
				const res = await fetch(
					`${process.env.REACT_APP_url}/appointmentSpecialty`
				);
				const data = await res.json();

				return data;
			} catch (err) {
				console.log(err);
			}
		},
	});

	if (isLoading) {
		return <Loading />;
	}

	const handleAddDoctor = (data) => {
		setLoadingImg(true);
		const image = data.photo[0];
		const formData = new FormData();
		formData.append('image', image);
		const url = `https://api.imgbb.com/1/upload?key=${img_host_key}`;

		fetch(url, {
			method: 'post',
			body: formData,
		})
			.then((res) => res.json())
			.then((imgData) => {
				if (imgData.success) {
					console.log(imgData.data.url);

					const doctor = {
						name: data.name,
						email: data.email,
						specialty: data.specialty,
						image: imgData.data.url,
					};

					// save doctor inforamation to the databaSe

					fetch(`${process.env.REACT_APP_url}/doctors`, {
						method: 'post',
						headers: {
							'content-type': 'application/json',
							authorization: `Bearer ${localStorage.getItem('accessToken')}`,
						},
						body: JSON.stringify(doctor),
					})
						.then((res) => res.json())
						.then((result) => {
							if (result.acknowledged) {
								toast.success(`${data.name} is added sucessfull`);
								navigate('/dashboard/dashboard/managedoctors');
							}
						})
						.catch((err) => console.log(err))
						.finally(() => setLoadingImg(false));
				}
			})
			.catch((err) => {
				console.log(err);
			});

		setLoginError('');
	};
	return (
		<div className=' w-96'>
			<h1 className='text-3xl'> Add a Doctor</h1>

			{lodingImg && <Loading />}
			<form onSubmit={handleSubmit(handleAddDoctor)}>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						{' '}
						<span className='label-text'>Name</span>
					</label>
					<input
						type='text'
						{...register('name', {
							required: 'Name is required',
						})}
						className='input input-bordered w-full max-w-xs'
					/>
					{errors.name && (
						<p className='text-red-600'>{errors.name?.message}</p>
					)}
				</div>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						{' '}
						<span className='label-text'>Email</span>
					</label>
					<input
						type='text'
						{...register('email', {
							required: 'Email Address is required',
						})}
						className='input input-bordered w-full max-w-xs'
					/>
					{errors.email && (
						<p className='text-red-600'>{errors.email?.message}</p>
					)}
				</div>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						{' '}
						<span className='label-text'>Speacialty</span>
					</label>
					<select
						{...register('specialty')}
						className='select select-bordered w-full max-w-xs'
					>
						{specialties?.map((specialty) => (
							<option key={specialty._id} value={specialty.name}>
								{specialty.name}
							</option>
						))}
					</select>
				</div>
				<div className='form-control w-full max-w-xs'>
					<label className='label'>
						{' '}
						<span className='label-text'>Photo</span>
					</label>
					<input
						type='file'
						{...register('photo', {
							required: 'Photo is required',
						})}
						className='input input-bordered w-full max-w-xs'
					/>
					{errors.photo && (
						<p className='text-red-600'>{errors.photo?.message}</p>
					)}
				</div>
				<input
					className='btn btn-accent w-full max-w-xs'
					value='Add Doctor'
					type='submit'
				/>
				<div>{loginError && <p className='text-red-600'>{loginError}</p>}</div>
			</form>
		</div>
	);
};

/**
 * Three places to store images
 * 1.Third party image hosting server
 * 2. file system of your server
 * 3. mongodb (database)
 *
 */

export default AddDoctor;
