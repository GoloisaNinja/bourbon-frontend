import { GET_PAGINATED_SUCCESS, GET_PAGINATED_FAILURE } from './types';
import { setAlert } from './alert';
import { getPaginatedBourbons as getBourbons } from '../Api/Api';

export const getPaginatedBourbons =
	(page, search, sort) => async (dispatch) => {
		const response = await getBourbons(page, search, sort);
		if (response) {
			if (response.status === 200) {
				dispatch({
					type: GET_PAGINATED_SUCCESS,
					payload: response.data,
				});
			} else {
				dispatch({
					type: GET_PAGINATED_FAILURE,
				});
				dispatch(setAlert('Uh-oh! No bourbons!', 'danger'));
			}
		} else {
			dispatch({
				type: GET_PAGINATED_FAILURE,
			});
			dispatch(setAlert('Uh-oh! No bourbons!', 'danger'));
		}
	};
