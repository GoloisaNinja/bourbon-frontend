import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from '../Actions/types';

const initialState = {
	loading: true,
	isAuthenticated: false,
	user: {},
	token: '',
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_SUCCESS:
		case REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: payload.user,
				token: payload.token,
			};
		case LOGIN_FAILURE:
		case REGISTER_FAILURE:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: {},
				token: '',
			};
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: {},
				token: '',
			};
		case LOGOUT_FAILURE:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
}
