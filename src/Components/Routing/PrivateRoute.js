import { Navigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ isAuthenticated }) => {
	return isAuthenticated ? <Outlet /> : <Navigate replace to='/login' />;
};
PrivateRoute.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(PrivateRoute);
