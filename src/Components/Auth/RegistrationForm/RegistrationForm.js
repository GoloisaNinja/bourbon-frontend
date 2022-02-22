import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../../Actions/auth';
import { setAlert } from '../../../Actions/alert';
import styles from './RegistrationForm.module.scss';
import { useNavigate, Link } from 'react-router-dom';

const RegistrationForm = ({ registerUser, setAlert }) => {
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		const { username, email, password, confirmPassword } = formData;
		e.preventDefault();
		if (password !== confirmPassword) {
			window.scroll(0, 0);
			setAlert('Passwords do not match', 'danger');
		} else {
			const wasSuccess = await registerUser(username, email, password);
			if (wasSuccess.success) {
				navigate('/');
			}
		}
	};
	return (
		<div className={styles.form_wrapper}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>UserName</label>
				<input
					type='username'
					name='username'
					required
					onChange={(e) =>
						setFormData({ ...formData, [e.target.name]: e.target.value })
					}
				/>
				<label>Email</label>
				<input
					type='email'
					name='email'
					required
					onChange={(e) =>
						setFormData({ ...formData, [e.target.name]: e.target.value })
					}
				/>
				<label>Password</label>
				<input
					type='password'
					name='password'
					required
					onChange={(e) =>
						setFormData({ ...formData, [e.target.name]: e.target.value })
					}
				/>
				<label>Confirm Password</label>
				<input
					type='password'
					name='confirmPassword'
					required
					onChange={(e) =>
						setFormData({ ...formData, [e.target.name]: e.target.value })
					}
				/>
				<button type='submit'>create account</button>
			</form>
			<div>
				<p>Have an account?</p>
				<Link to='/login'>Login here</Link>
			</div>
		</div>
	);
};
RegistrationForm.propTypes = {
	registerUser: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
};

export default connect(null, { registerUser, setAlert })(RegistrationForm);
