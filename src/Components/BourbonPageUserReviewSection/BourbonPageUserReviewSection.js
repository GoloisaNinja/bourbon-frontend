import { useState } from 'react';
import UserReview from './UserReview';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BourbonPageReviewForm from '../BourbonPageUserReviewSection/BourbonPageReviewForm';
import Modal from '../../Components/Modal/Modal';
import { MdAddCircleOutline, MdLaptopMac } from 'react-icons/md';
import styles from './BourbonPageUserReviewSection.module.scss';

const BourbonPageUserReviewSection = ({ reviews, userId, isAuthenticated }) => {
	const alreadyReviewed = reviews.filter((review) => review.user.id === userId);
	const [show, setShow] = useState(false);
	const handleModal = () => {
		setShow(!show);
	};
	return (
		<>
			<section className={styles.user_review_container}>
				<div>
					<h1 className={styles.user_review_header}>
						User Reviews <MdLaptopMac />
					</h1>
					{isAuthenticated && !alreadyReviewed.length && (
						<button onClick={(e) => handleModal()}>
							<MdAddCircleOutline /> Review
						</button>
					)}
				</div>
				{reviews.length ? (
					reviews.map((review) => (
						<UserReview key={review._id} review={review} />
					))
				) : (
					<h2>No user reviews...</h2>
				)}
				{show && (
					<Modal contents={{ component: BourbonPageReviewForm, handleModal }} />
				)}
			</section>
		</>
	);
};

BourbonPageUserReviewSection.propTypes = {
	userId: PropTypes.string,
	isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
	userId: state.auth.user._id,
	isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(BourbonPageUserReviewSection);
