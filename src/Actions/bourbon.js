import {
	GET_BOURBON_SUCCESS,
	GET_BOURBON_FAILURE,
	CLEANUP_BOURBON,
} from './types';
import { setAlert } from './alert';
import { getSingleBourbon as getBourbon } from '../Api/Api';

export const getSingleBourbon = (id) => async (dispatch) => {
	const response = await getBourbon(id);
	if (response) {
		if (response.status === 200) {
			dispatch({
				type: GET_BOURBON_SUCCESS,
				payload: response.data,
			});
		} else {
			dispatch({
				type: GET_BOURBON_FAILURE,
			});
			dispatch(setAlert('Failed to load bourbon...', 'danger'));
		}
	} else {
		dispatch({
			type: GET_BOURBON_FAILURE,
		});
		dispatch(setAlert('Failed to load bourbon...', 'danger'));
	}
};

// CLEANUP FUNCTION TO RESTORE BOURBON STATE AFTER SINGLE BOURBON PAGE IS UNMOUNTED

export const cleanUpBourbon = () => (dispatch) => {
	dispatch({
		type: CLEANUP_BOURBON,
	});
};
