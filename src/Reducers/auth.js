import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from '../Actions/types';

const initialState = {
	isAuthenticated: false,
	user: {},
	token: '',
};

export default function auth(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case LOGIN_USER:
		case REGISTER_USER:
			return {
				...state,
				isAuthenticated: true,
				user: payload.user,
				token: payload.token,
			};
		case LOGOUT_USER:
			return {
				isAuthenticated: false,
				user: {},
				token: '',
			};
		default:
			return state;
	}
}
