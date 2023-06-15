import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UseToken } from '../../ApiServices/auth';
// import { getUserToken } from '../../ApiServices/auth';
import { AuthContext } from '../../contexts/AuthProvider';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { createUser, updateUser } = useContext(AuthContext);
	const [signUpError, setSignUPError] = useState('');
	const navigate = useNavigate();
	const [createdUserEmail, setCreatedUserEmail] = useState('');
	const [token] = UseToken(createdUserEmail);

	if (token) {
		navigate('/');
	}

	const handleSignUp = (data) => {
		setSignUPError('');
		createUser(data.email, data.password)
			.then((result) => {
				const user = result.user;
				console.log(user);
				toast.success('User Created Successfully.');

				const userInfo = {
					displayName: data.name,
				};
				updateUser(userInfo)
					.then(() => {
						saveUser(user.displayName, user.email);
					})
					.catch((err) => console.log(err));
			})
			.catch((error) => {
				console.log(error);
				setSignUPError(error.code);
			});
	};

	const saveUser = (name, email) => {
		const user = { name, email };
		fetch(`${process.env.REACT_APP_url}/users`, {
			method: 'post',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(user),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setCreatedUserEmail(email);
				// getUserToken(email).then(() => {
				// 	navigate('/');
				// });
			})
			.catch((err) => console.log(err));
	};

	return (
		<div className='h-[800px] flex justify-center items-center'>
			<div className='w-96 p-7'>
				<h2 className='text-xl text-center'>Sign Up</h2>
				<form onSubmit={handleSubmit(handleSignUp)}>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Name</span>
						</label>
						<input
							type='text'
							{...register('name', {
								required: 'Name is Required',
							})}
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.name && (
							<p className='text-red-500'>{errors.name.message}</p>
						)}
					</div>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Email</span>
						</label>
						<input
							type='email'
							{...register('email', {
								required: true,
							})}
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.email && (
							<p className='text-red-500'>{errors.email.message}</p>
						)}
					</div>
					<div className='form-control w-full max-w-xs'>
						<label className='label'>
							{' '}
							<span className='label-text'>Password</span>
						</label>
						<input
							type='password'
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be 6 characters long',
								},
								pattern: {
									value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
									message:
										'Password must have uppercase, number and special characters',
								},
							})}
							className='input input-bordered w-full max-w-xs'
						/>
						{errors.password && (
							<p className='text-red-500'>{errors.password.message}</p>
						)}
					</div>
					<input
						className='btn btn-accent w-full mt-4'
						value='Sign Up'
						type='submit'
					/>
					{signUpError && <p className='text-red-600'>{signUpError}</p>}
				</form>
				<p>
					Already have an account{' '}
					<Link className='text-secondary' to='/login'>
						Please Login
					</Link>
				</p>
				<div className='divider'>OR</div>
				<button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
			</div>
		</div>
	);
};

export default SignUp;
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import { Link } from 'react-router-dom';

// const SignUp = () => {
// 	const {
// 		register,
// 		handleSubmit,
// 		formState: { errors },
// 	} = useForm();

// 	const handleSignUp = (data) => {
// 		console.log(data);
// 	};

// 	return (
// 		<div className='h-[800px] flex justify-center items-center'>
// 			<div className='w-96 p-7'>
// 				<h2 className='text-xl text-center'>Login</h2>
// 				<form onSubmit={handleSubmit(handleSignUp)}>
// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							{' '}
// 							<span className='label-text'>Name</span>
// 						</label>
// 						<input
// 							placeholder='name'
// 							{...register('name', { required: 'name is required' })}
// 							type='text'
// 							className='input input-bordered w-full max-w-xs'
// 						/>
// 						{errors.name && (
// 							<p className='text-red-600'>{errors.name?.message}</p>
// 						)}
// 					</div>
// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							{' '}
// 							<span className='label-text'>Email</span>
// 						</label>
// 						<input
// 							placeholder='email'
// 							{...register('email', { required: 'email is required' })}
// 							type='email'
// 							className='input input-bordered w-full max-w-xs'
// 						/>
// 						{errors.email && (
// 							<p className='text-red-600'>{errors.email?.message}</p>
// 						)}
// 					</div>
// 					<div className='form-control w-full max-w-xs'>
// 						<label className='label'>
// 							{' '}
// 							<span className='label-text'>Password</span>
// 						</label>
// 						<input
// 							placeholder='password'
// 							{...register('password', {
// 								required: 'password is required',
// 								minLength: {
// 									value: 5,
// 									message: 'pasword should at least 6 charactor or more',
// 								},
// 								pattern: {
// 									value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
// 									message: 'password must be strong',
// 								},
// 							})}
// 							type='password'
// 							className='input input-bordered w-full max-w-xs'
// 						/>
// 						{errors.password && (
// 							<p className='text-red-600 my-2'>{errors.password?.message}</p>
// 						)}
// 					</div>
// 					<input
// 						className='btn btn-accent w-full'
// 						value='Login'
// 						type='submit'
// 					/>
// 					<div></div>
// 				</form>
// 				<p>
// 					Already have an account?{' '}
// 					<Link className='text-secondary' to='/login'>
// 						Login
// 					</Link>
// 				</p>
// 				<div className='divider'>OR</div>
// 				<button className='btn btn-outline w-full'>CONTINUE WITH GOOGLE</button>
// 			</div>
// 		</div>
// 	);
// };

// export default SignUp;
