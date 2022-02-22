import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../../Actions/auth';
import styles from './LoginForm.module.scss';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = ({ loginUser }) => {
	const [formData, setFormData] = useState({});
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		const { email, password } = formData;
		e.preventDefault();
		const wasSuccess = await loginUser(email, password);
		if (wasSuccess.success) {
			navigate('/');
		}
	};
	return (
		<div className={styles.form_wrapper}>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Email</label>
				<input
					type='email'
					required
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
				/>
				<label>Password</label>
				<input
					type='password'
					required
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
				/>
				<button type='submit'>login</button>
			</form>
			<div>
				<p>No account?</p>
				<Link to='/register'>Register here</Link>
			</div>
		</div>
	);
};
LoginForm.propTypes = {
	loginUser: PropTypes.func.isRequired,
};

export default connect(null, { loginUser })(LoginForm);
