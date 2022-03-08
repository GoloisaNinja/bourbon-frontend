import { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import RegistrationForm from '../../Components/Auth/RegistrationForm/RegistrationForm';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = ({ isAuthenticated }) => {
	const navigate = useNavigate();
	useEffect(() => {
		if (isAuthenticated) {
			navigate('/dashboard');
		}
	}, [isAuthenticated, navigate]);
	return (
		<div>
			<h1 className={styles.title}>Regist(er)</h1>
			<RegistrationForm />
		</div>
	);
};
RegistrationPage.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(RegistrationPage);
