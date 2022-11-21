import React, { useContext } from 'react';
import { useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const DisplayError = () => {
	const { logout } = useContext(AuthContext);
	const error = useRouteError();

	const handleSignOut = () => {
		logout()
			.then(() => {})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<p className='text-red-500'>Something going wrong</p>
			<p className='text-red-400'>{error.statusText || error.message}</p>
			<h4 className='text-3xl'>
				{' '}
				Please <button onClick={handleSignOut}>SignOur</button> and log back in
			</h4>
		</div>
	);
};

export default DisplayError;
