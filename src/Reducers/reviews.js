import {
	GET_USER_REVIEWS_SUCCESS,
	GET_USER_REVIEWS_FAILURE,
	CLEANUP_REVIEWS,
} from '../Actions/types';

const initialState = {
	loading: true,
	reviews: [],
};

export default function reviews(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_REVIEWS_SUCCESS:
			return {
				...state,
				loading: false,
				reviews: payload,
			};
		case GET_USER_REVIEWS_FAILURE:
			return {
				...state,
				loading: false,
				reviews: [],
			};
		case CLEANUP_REVIEWS:
			return {
				...state,
				loading: true,
				reviews: [],
			};
		default:
			return state;
	}
}
