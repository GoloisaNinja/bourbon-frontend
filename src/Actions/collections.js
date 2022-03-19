import {
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	CLEANUP_QUICKLOOK,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	EDIT_COLLECTION_SUCCESS,
	EDIT_COLLECTION_FAILURE,
	DELETE_COLLECTION_SUCCESS,
	DELETE_COLLECTION_FAILURE,
	CLEANUP_COLLECTION,
} from './types';
import {
	getUserCollections as getCollections,
	getUserCollectionById as getCollection,
	editUserCollection as editCollection,
	deleteUserCollection as deleteCollection,
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

export const editUserCollection = (id, formData) => async (dispatch) => {
	const response = await editCollection(id, formData);
	if (response.status === 200) {
		dispatch({
			type: EDIT_COLLECTION_SUCCESS,
			payload: response.data,
		});
		dispatch(setAlert('Collection updated!', 'success'));
	} else {
		dispatch({
			type: EDIT_COLLECTION_FAILURE,
		});
		dispatch(setAlert(response.data.message, 'danger'));
	}
};

export const deleteUserCollection = (id) => async (dispatch) => {
	const response = await deleteCollection(id);
	if (response.status === 200) {
		dispatch({
			type: DELETE_COLLECTION_SUCCESS,
			payload: id,
		});
		dispatch(setAlert('Deleted Collection!', 'success'));
	} else {
		dispatch({
			type: DELETE_COLLECTION_FAILURE,
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
