import {
	GET_USER_COLLECTIONS_SUCCESS,
	GET_USER_COLLECTIONS_FAILURE,
	GET_USER_COLLECTION_SUCCESS,
	GET_USER_COLLECTION_FAILURE,
	SET_COLLECTION_QUICKLOOK,
	CLEANUP_QUICKLOOK,
	CLEANUP_COLLECTION,
} from '../Actions/types';

const initialState = {
	loading: true,
	collection: {
		loading: true,
		collection: null,
	},
	collections: [],
	quick_look: null,
};

export default function collections(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_USER_COLLECTION_SUCCESS:
			return {
				...state,
				collection: { loading: false, collection: payload },
			};
		case GET_USER_COLLECTION_FAILURE:
			return {
				...state,
				collection: { loading: false, collection: null },
			};
		case GET_USER_COLLECTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				collections: payload,
			};
		case CLEANUP_COLLECTION:
			return {
				...state,
				collection: { loading: true, collection: null },
			};
		case GET_USER_COLLECTIONS_FAILURE:
			return {
				...state,
				loading: false,
				collections: [],
			};
		case SET_COLLECTION_QUICKLOOK:
			return {
				...state,
				loading: false,
				quick_look: payload,
			};
		case CLEANUP_QUICKLOOK:
			return {
				...state,
				loading: true,
				collections: [],
				quick_look: null,
			};
		default:
			return state;
	}
}
