import axios from 'axios';
const prod = true;
const configObject = {
	prod: {
		url: 'https://bourbon-backend.herokuapp.com/api',
		apiKey: process.env.REACT_APP_BOURBON_PROD_API_KEY,
	},
	dev: {
		url: 'http://localhost:5000/api',
		apiKey: process.env.REACT_APP_BOURBONAPI_KEY,
	},
};
const baseURL = prod ? configObject.prod.url : configObject.dev.url;
const apikey = prod ? configObject.prod.apiKey : configObject.dev.apiKey;

// Bourbon Calls

// Get paginated Bourbons for the Bourbon Grid

export const getPaginatedBourbons = async (page, search, sort) => {
	try {
		const response = await axios.get(
			`${baseURL}/bourbons?search=${search}&sort=${sort}&page=${page}&apiKey=${apikey}`
		);
		if (response.data.bourbons.length > 0) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

// Get a single Bourbon by ID for the Bourbon Page

export const getSingleBourbon = async (id) => {
	try {
		const response = await axios.get(
			`${baseURL}/bourbons/${id}?apiKey=${apikey}`
		);
		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

// Reviews Calls

// Get All Reviews for the Individual Bourbon page

export const getBourbonReviews = async (id) => {
	try {
		const response = await axios.get(
			`${baseURL}/reviews/${id}?apiKey=${apikey}`
		);
		if (response.status === 200) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

// Get All Reviews for the Dashboard Reviews Page based on user ID

export const getUserBourbonReviews = async (id) => {
	try {
		const response = await axios.get(
			`${baseURL}/reviews/user/${id}?apiKey=${apikey}`
		);
		return response;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};

// Create a review for the Individual Bourbon page

export const postBourbonReview = async (formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	const body = formData;
	try {
		const response = await axios.post(
			`${baseURL}/review?apiKey=${apikey}`,
			body,
			config
		);
		if (response.status === 201) {
			return response;
		}
	} catch (error) {
		console.log(error);
	}
};

// Edit a review from the User's Dashboard Reviews page

export const editUserReview = async (id, formData) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	const body = formData;
	try {
		const response = await axios.patch(
			`${baseURL}/review/update/${id}?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete a review from the User's Dashboard Reviews Page

export const deleteUserReview = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(
			`${baseURL}/review/${id}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Collection Calls

export const getUserCollections = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.get(
			`${baseURL}/collections?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};

export const getUserCollectionById = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.get(
			`${baseURL}/collection/${id}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};

// User Auth Calls

export const loginUser = async (email, password) => {
	const config = {
		headers: {
			'Content-type': 'application/json',
		},
	};
	const body = JSON.stringify({ email, password });
	try {
		const response = await axios.post(
			`${baseURL}/user/login?apiKey=${apikey}`,
			body,
			config
		);
		if (response.status === 200) {
			localStorage.setItem('token', response.data.token);
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	const body = {};
	try {
		const response = await axios.post(
			`${baseURL}/user/logout?apiKey=${apikey}`,
			body,
			config
		);
		if (response.status === 200) {
			localStorage.removeItem('token');
			return response.status;
		}
	} catch (error) {
		console.log(error);
	}
};

export const registerUser = async (formData) => {
	const { username, email, password } = formData;
	const config = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-type': 'application/json',
		},
	};
	const body = JSON.stringify({ username, email, password });
	try {
		const response = await axios.post(
			`${baseURL}/user?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		console.log(error.response);
		return error.response;
	}
};
