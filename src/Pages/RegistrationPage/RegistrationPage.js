import RegistrationForm from '../../Components/Auth/RegistrationForm/RegistrationForm';
import Alert from '../../Components/Alert/Alert';
import styles from './RegistrationPage.module.scss';

const RegistrationPage = () => {
	return (
		<div>
			<Alert />
			<h1 className={styles.title}>Regist(er)</h1>
			<RegistrationForm />
		</div>
	);
};
export default RegistrationPage;
