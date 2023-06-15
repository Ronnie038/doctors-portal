import { useEffect, useState } from 'react';

const UseToken = (email) => {
	const [token, setToken] = useState('');

	useEffect(() => {
		if (email) {
			fetch(`${process.env.REACT_APP_url}/jwt?email=${email}`)
				.then((res) => res.json())
				.then((data) => {
					if (data.accessToken) {
						localStorage.setItem('accessToken', data.accessToken);
						setToken(data.accessToken);
					}
				})
				.catch((err) => console.log(err));
		}
	}, [email]);

	return [token];
};

export { UseToken };

// try {
//     const res = await fetch(`${process.env.REACT_APP_url}/jwt?email=${email}`);
//     const data = await res.json();
//     if (data.accessToken) {
//         localStorage.setItem('accessToken', data.accessToken);
//         return true;
//     }
// } catch (err) {
//     console.log(err);
// }
