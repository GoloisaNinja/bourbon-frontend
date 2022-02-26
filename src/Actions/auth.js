import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	LOGOUT_SUCCESS,
	LOGOUT_FAILURE,
	REGISTER_SUCCESS,
	REGISTER_FAILURE,
} from './types';
import {
	loginUser as getUser,
	logoutUser as endSession,
	registerUser as createUser,
} from '../Api/Api';
import { setAlert } from './alert';

export const loginUser = (email, password) => async (dispatch) => {
	const response = await getUser(email, password);
	if (response !== undefined) {
		dispatch({
			type: LOGIN_SUCCESS,
			payload: response,
		});
		dispatch(setAlert('Login Successful!', 'success'));
		return { success: true };
	} else {
		dispatch({
			type: LOGIN_FAILURE,
		});
		dispatch(setAlert('Login Failed', 'danger'));
		return { success: false };
	}
};

export const logoutUser = (token) => async (dispatch) => {
	const response = await endSession(token);
	if (response === 200) {
		dispatch({
			type: LOGOUT_SUCCESS,
		});
		dispatch(setAlert('Logout Successful...', 'success'));
	} else {
		dispatch({
			type: LOGOUT_FAILURE,
		});
		dispatch(setAlert('Something went wrong...', 'danger'));
	}
};

export const registerUser = (formData) => async (dispatch) => {
	const response = await createUser(formData);
	if (response !== undefined) {
		dispatch({
			type: REGISTER_SUCCESS,
			payload: response,
		});
		dispatch(setAlert('Account Created!', 'success'));
		return { success: true };
	} else {
		dispatch({
			type: REGISTER_FAILURE,
		});
		dispatch(setAlert('Something went wrong...', 'danger'));
		return { success: false };
	}
};
