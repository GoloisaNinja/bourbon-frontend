import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bourbons from './bourbons';
import bourbon from './bourbon';

export default combineReducers({
	alert,
	auth,
	bourbons,
	bourbon,
});
