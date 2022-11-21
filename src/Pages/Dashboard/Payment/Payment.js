import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutPage from './CheckoutPage';
import { Elements } from '@stripe/react-stripe-js';
import Loading from '../../Shared/Loading/Loading';

const stripePromise = loadStripe(`${process.env.REACT_APP_stipe_pk}`);
console.log(stripePromise);

const Payment = () => {
	const booking = useLoaderData();
	const navigation = useNavigation();
	const { price, patient, treatement, appointmentDate, slot } = booking;
	// console.log(booking);
	if (navigation.state === 'loading') {
		return <Loading />;
	}
	return (
		<div className='px-5'>
			<h2 className='text-3xl mb-5'>Payment for {treatement}</h2>
			<p className='text-xl '>
				{' '}
				Please pay <strong>${price}</strong> for your appointment on{' '}
				{appointmentDate} at {slot}{' '}
			</p>
			<div className=' w-96 my-12'>
				<Elements stripe={stripePromise}>
					<CheckoutPage booking={booking} />
				</Elements>
			</div>
		</div>
	);
};

export default Payment;
