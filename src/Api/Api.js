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
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};

export const logoutUser = async (token) => {
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
			'Content-type': 'application/json',
		},
	};
	const body = JSON.stringify({ username, email, password });
	try {
		const response = await axios.post(`${baseURL}/user`, body, config);
		if (response.status === 201) {
			return response.data;
		}
	} catch (error) {
		console.log(error);
	}
};
