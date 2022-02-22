import { LOGIN_USER, LOGOUT_USER, REGISTER_USER } from './types';
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
			type: LOGIN_USER,
			payload: response,
		});
		dispatch(setAlert('Login Successful!', 'success'));
		return { success: true };
	} else {
		dispatch(setAlert('Login Failed', 'danger'));
		return { success: false };
	}
};

export const logoutUser = (token) => async (dispatch) => {
	const response = await endSession(token);
	if (response === 200) {
		dispatch({
			type: LOGOUT_USER,
		});
		dispatch(setAlert('Logout Successful...', 'success'));
	} else {
		dispatch(setAlert('Something went wrong...', 'danger'));
	}
};

export const registerUser = (formData) => async (dispatch) => {
	const response = await createUser(formData);
	if (response !== undefined) {
		dispatch({
			type: REGISTER_USER,
			payload: response,
		});
		dispatch(setAlert('Account Created!', 'success'));
		return { success: true };
	} else {
		dispatch(setAlert('Something went wrong...', 'danger'));
		return { success: false };
	}
};
