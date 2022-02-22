import LoginForm from '../../Components/Auth/LoginForm/LoginForm';
import Alert from '../../Components/Alert/Alert';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
	return (
		<div>
			<Alert />
			<h1 className={styles.title}>Log(IN)</h1>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
