import React from 'react';

const Loading = () => {
	return (
		<div className='flex justify-center border-green-700  items-center'>
			<div className='flex justify-center items-center space-x-2'>
				<div
					className='
					spinner-border
					animate-spin
					inline-block
					w-14
					h-14
					border-4
					rounded-full
					text-green-500 
		
					
					'
					role='status'
				>
					<span className='visually-hidden'> </span>
				</div>
			</div>
		</div>
	);
};

export default Loading;
