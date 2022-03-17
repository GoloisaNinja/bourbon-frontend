import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserReview } from '../../Actions/review';
import styles from './ConfirmCancel.module.scss';

const ConfirmCancel = ({ handleModal, details, deleteUserReview }) => {
	const { review } = details;
	const handleClick = (e) => {
		if (e.target.value === 'cancel') {
			handleModal();
		} else {
			deleteUserReview(review._id);
			handleModal();
		}
	};
	return (
		<div className={styles.container}>
			<h1>Delete Review</h1>
			<h4>
				Just checking! You really want to delete your{' '}
				<span>{review.bourbonName}</span> review?
			</h4>
			<div>
				<button value='confirm' onClick={(e) => handleClick(e)}>
					confirm
				</button>
				<button value='cancel' onClick={(e) => handleClick(e)}>
					cancel
				</button>
			</div>
		</div>
	);
};
ConfirmCancel.propTypes = {
	deleteUserReview: PropTypes.func.isRequired,
};
export default connect(null, { deleteUserReview })(ConfirmCancel);
