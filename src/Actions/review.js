import {
	GET_BOURBON_REVIEWS_SUCCESS,
	GET_BOURBON_REVIEWS_FAILURE,
	CREATE_REVIEW_SUCCESS,
	CREATE_REVIEW_FAILURE,
} from './types';
import { setAlert } from './alert';
import {
	getBourbonReviews as getReviews,
	postBourbonReview as postReview,
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
