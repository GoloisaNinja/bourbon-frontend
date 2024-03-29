import axios from 'axios';
const prod = true;
const configObject = {
	prod: {
		url: 'https://bourbon-backend.onrender.com/api',
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
		return error.response;
	}
};

// Get a single Bourbon by ID for the Bourbon Page

export const getSingleBourbon = async (id) => {
	try {
		const response = await axios.get(
			`${baseURL}/bourbons/${id}?apiKey=${apikey}`
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Reviews Calls

// Get All Reviews for the Individual Bourbon page

export const getBourbonReviews = async (id) => {
	try {
		const response = await axios.get(
			`${baseURL}/reviews/${id}?apiKey=${apikey}`
		);
		return response;
	} catch (error) {
		return error.response;
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
		return response;
	} catch (error) {
		return error.response;
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

// Create a new user Collection
export const postUserCollection = async (formData) => {
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
			`${baseURL}/collection?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Get all Collections based on authenticated user
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
		return error.response;
	}
};

// Get single collection for auth user with collection id
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
		return error.response;
	}
};

// Edit a Collection Name and possibly the privacy flag
export const editUserCollection = async (id, formData) => {
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
			`${baseURL}/collection/update/${id}?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Add a bourbon to user collection based on auth, collection ID and bourbon ID
export const addBourbonToUserCollection = async (collectionId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-typd': 'application/json',
			Authorization: token,
		},
	};
	const body = { bourbonId };
	try {
		const response = await axios.post(
			`${baseURL}/collection/add/${collectionId}?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete a bourbon from user collection based on auth, collection ID and bourbon ID
export const deleteBourbonFromUserCollection = async (
	collectionId,
	bourbonId
) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-typd': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(
			`${baseURL}/collection/delete/${collectionId}/${bourbonId}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete an entire user collection based on user auth and collection ID
export const deleteUserCollection = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(
			`${baseURL}/collection/${id}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Wishlist Calls

// Create a new user Wishlist
export const postUserWishlist = async (formData) => {
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
			`${baseURL}/wishlist?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Get all Wishlists based on authenticated user
export const getUserWishlists = async () => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.get(
			`${baseURL}/wishlists?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Get single wishlist for auth user with wishlist id
export const getUserWishlistById = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.get(
			`${baseURL}/wishlist/${id}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Edit a Wishlist Name and possibly the privacy flag
export const editUserWishlist = async (id, formData) => {
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
			`${baseURL}/wishlist/update/${id}?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Add a bourbon to user wishlist based on auth, wishlist ID and bourbon ID
export const addBourbonToUserWishlist = async (wishlistId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-typd': 'application/json',
			Authorization: token,
		},
	};
	const body = { bourbonId };
	try {
		const response = await axios.post(
			`${baseURL}/wishlist/add/${wishlistId}?apiKey=${apikey}`,
			body,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete a bourbon from user wishlist based on auth, wishlist ID and bourbon ID
export const deleteBourbonFromUserWishlist = async (wishlistId, bourbonId) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-typd': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(
			`${baseURL}/wishlist/delete/${wishlistId}/${bourbonId}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
		return error.response;
	}
};

// Delete an entire user wishlist based on user auth and wishlist ID
export const deleteUserWishlist = async (id) => {
	const token = localStorage.getItem('token');
	const config = {
		headers: {
			'Content-type': 'application/json',
			Authorization: token,
		},
	};
	try {
		const response = await axios.delete(
			`${baseURL}/wishlist/${id}?apiKey=${apikey}`,
			config
		);
		return response;
	} catch (error) {
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
		return response;
	} catch (error) {
		return error.response;
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
			return response;
		}
	} catch (error) {
		return error.response;
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
		return error.response;
	}
};
