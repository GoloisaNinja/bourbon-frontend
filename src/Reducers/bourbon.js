import {
	GET_BOURBON_FAILURE,
	GET_BOURBON_SUCCESS,
	CLEANUP_BOURBON,
} from '../Actions/types';

const initialState = {
	loading: true,
	bourbon: null,
	bourbonUserReviews: [],
};

export default function bourbon(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_BOURBON_SUCCESS:
			return {
				...state,
				loading: false,
				bourbon: payload,
			};
		case CLEANUP_BOURBON:
			return {
				...state,
				loading: true,
				bourbon: null,
				bourbonUserReviews: [],
			};
		case GET_BOURBON_FAILURE:
			return {
				...state,
				loading: false,
				bourbon: null,
				bourbonUserReviews: [],
			};
		default:
			return state;
	}
}
