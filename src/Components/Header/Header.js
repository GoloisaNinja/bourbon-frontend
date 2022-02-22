import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../Actions/auth';
import styles from './Header.module.scss';

const Header = ({ isAuthenticated, token, logoutUser }) => {
	const navigte = useNavigate();
	const handleLogout = () => {
		logoutUser(token);
		navigte('/');
	};
	const guestLinks = (
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/bourbons'>Bourbons</Link>
			</li>
			<li>
				<Link to='/login'>Login</Link>
			</li>
		</ul>
	);
	const authLinks = (
		<ul>
			<li>
				<Link to='/'>Home</Link>
			</li>
			<li>
				<Link to='/bourbons'>Bourbons</Link>
			</li>
			<li onClick={(e) => handleLogout()}>Logout</li>
		</ul>
	);
	return (
		<header className={styles.header_container}>
			{isAuthenticated ? authLinks : guestLinks}
		</header>
	);
};
Header.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	token: PropTypes.string.isRequired,
	logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	token: state.auth.token,
});
export default connect(mapStateToProps, { logoutUser })(Header);
