import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DashboardImage from '../DashboardImage/DashboardImage';
import DashboardGrid from '../DashboardGrid/DashboardGrid';
import { logoutUser } from '../../Actions/auth';
import styles from './Dashboard.module.scss';

const Dashboard = ({ user, logoutUser }) => {
	return (
		<div className={styles.container}>
			<DashboardImage username={user.username} />
			<DashboardGrid />
			<div className={styles.leaving}>
				<h2>Leaving us so soon? Hurry back, ok?</h2>
				<button onClick={(e) => logoutUser()}>Logout</button>
			</div>
		</div>
	);
};
Dashboard.propTypes = {
	user: PropTypes.object.isRequired,
	logoutUser: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
});
export default connect(mapStateToProps, { logoutUser })(Dashboard);
