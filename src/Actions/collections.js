import {
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	CLEANUP_QUICKLOOK,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	CLEANUP_COLLECTION,
} from './types';
import {
	getUserCollections as getCollections,
	getUserCollectionById as getCollection,
} from '../Api/Api';
import { setAlert } from './alert';

export const getUserCollections = () => async (dispatch) => {
	const response = await getCollections();
	if (response.status === 200) {
		dispatch({
			type: GET_USER_COLLECTIONS_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_COLLECTIONS_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const getUserCollectionById = (id) => async (dispatch) => {
	const response = await getCollection(id);
	if (response.status === 200) {
		dispatch({
			type: GET_USER_COLLECTION_SUCCESS,
			payload: response.data,
		});
	} else {
		dispatch({
			type: GET_USER_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const setCollectionQuicklook = (collection) => (dispatch) => {
	dispatch({
		type: SET_COLLECTION_QUICKLOOK,
		payload: collection,
	});
};

export const cleanupQuicklook = () => (dispatch) => {
	dispatch({
		type: CLEANUP_QUICKLOOK,
	});
};

export const cleanupCollection = () => (dispatch) => {
	dispatch({
		type: CLEANUP_COLLECTION,
	});
};
