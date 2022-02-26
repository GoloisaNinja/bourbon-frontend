import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bourbons from './bourbons';

export default combineReducers({
	alert,
	auth,
	bourbons,
});
