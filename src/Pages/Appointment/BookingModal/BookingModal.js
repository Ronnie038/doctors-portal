import { format } from 'date-fns';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';

const BookingModal = ({ treatment, setTreatment, selectedDate, refetch }) => {
	const { user } = useContext(AuthContext);
	// treatment is just another name of appointmentOptions with name, slots, _id

	const { name, slots, price } = treatment;
	const date = format(selectedDate, 'PP');

	const handleBooking = (event) => {
		event.preventDefault();
		const form = event.target;
		const slot = form.slot.value;
		const patientName = form.name.value;
		const email = form.email.value;
		const phone = form.phone.value;
		// [3, 4, 5].map((value, i) => console.log(value))
		const booking = {
			appointmentDate: date,
			treatment: name,
			patient: patientName,
			slot,
			email,
			phone,
			price,
		};

		// TODO: send data to the server
		// and once data is saved then close the modal
		// and display success toast

		fetch(`${process.env.REACT_APP_url}/bookings`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
			},
			body: JSON.stringify(booking),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					setTreatment(null);
					toast.success('Booking confirmed');
					refetch();
				} else {
					toast.error(data.message);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<input type='checkbox' id='booking-modal' className='modal-toggle' />
			<div className='modal'>
				<div className='modal-box relative'>
					<label
						htmlFor='booking-modal'
						className='btn btn-sm btn-circle absolute right-2 top-2'
					>
						✕
					</label>
					<h3 className='text-lg font-bold'>{name}</h3>
					<form
						onSubmit={handleBooking}
						className='grid grid-cols-1 gap-3 mt-10'
					>
						<input
							type='text'
							disabled
							value={date}
							className='input w-full input-bordered '
						/>
						<select name='slot' className='select select-bordered w-full'>
							{slots.map((slot, i) => (
								<option value={slot} key={i}>
									{slot}
								</option>
							))}
						</select>
						<input
							name='name'
							type='text'
							placeholder='Your Name'
							className='input w-full input-bordered'
							value={user?.displayName}
							disabled
						/>
						<input
							name='email'
							type='email'
							placeholder='Email Address'
							className='input w-full input-bordered'
							value={user?.email}
							disabled
						/>
						<input
							name='phone'
							type='text'
							placeholder='Phone Number'
							className='input w-full input-bordered'
						/>
						<br />
						<input
							className='btn btn-accent w-full'
							type='submit'
							value='Submit'
						/>
					</form>
				</div>
			</div>
		</>
	);
};

export default BookingModal;
