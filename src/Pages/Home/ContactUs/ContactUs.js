import React from 'react';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import bg from '../../../assets/images/appointment.png';

const ContactUs = () => {
	return (
		<section style={{ background: `url(${bg})` }} className='p-8'>
			<div className='max-w-md mx-auto text-center'>
				<h4 className='text-primary'>Contact Us</h4>
				<h1 className='text-2xl text-white font-bold'>
					Stay connected with us
				</h1>
				<form>
					<input
						type='text'
						placeholder='Type here'
						className='input input-bordered mt-5 w-full max-w-xs md:max-w-md'
					/>
					<input
						type='text'
						placeholder='Type here'
						className='input input-bordered mt-5 w-full max-w-xs md:max-w-md'
					/>
					<textarea
						id='txtid'
						name='txtname'
						rows='4'
						// cols='37'
						maxLength='200'
						className='border rounded mt-5 w-full max-w-xs md:max-w-md'
					></textarea>
					<br />
					<div className='text-center my-5 max-w-md'>
						<PrimaryButton>Submit</PrimaryButton>
					</div>
				</form>
			</div>
		</section>
	);
};

export default ContactUs;
