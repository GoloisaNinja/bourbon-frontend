import {
	GET_BOURBON_REVIEWS_SUCCESS,
	GET_BOURBON_REVIEWS_FAILURE,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
	GET_USER_REVIEWS_SUCCESS,
	GET_USER_REVIEWS_FAILURE,
	CLEANUP_REVIEWS,
} from './types';
import { setAlert } from './alert';
import {
	getBourbonReviews as getReviews,
	postBourbonReview as postReview,
	getUserBourbonReviews as getUserReviews,
} from '../Api/Api';

export const getBourbonReviews = (id) => async (dispatch) => {
	const response = await getReviews(id);
	if (response) {
		if (response.status === 200) {
			dispatch({
				type: GET_BOURBON_REVIEWS_SUCCESS,
				payload: response.data,
			});
		} else {
			dispatch({
				type: GET_BOURBON_REVIEWS_FAILURE,
			});
		}
	} else {
		dispatch({
			type: GET_BOURBON_REVIEWS_FAILURE,
		});
	}
};

export const getUserBourbonReviews = (id) => async (dispatch) => {
	const response = await getUserReviews(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_REVIEWS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_REVIEWS_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const postBourbonReview = (formData) => async (dispatch) => {
	const response = await postReview(formData);
	if (response) {
		if (response.status === 201) {
			dispatch({
				type: CREATE_REVIEW_SUCCESS,
				payload: response.data,
			});
			dispatch(setAlert('Review Submitted!', 'success'));
		}
	} else {
		dispatch({
			type: CREATE_REVIEW_FAILURE,
		});
		dispatch(setAlert('Something went wrong...', 'danger'));
	}
};

export const cleanupReviews = () => (dispatch) => {
	dispatch({
		type: CLEANUP_REVIEWS,
	});
};
