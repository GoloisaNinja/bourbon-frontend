import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUserBourbonReviews, cleanupReviews } from '../../Actions/review';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import DashboardReviewList from '../../Components/DashboardReviewList/DashboardReviewList';
import DashBoardReviewDetails from '../../Components/DashboardReviewDetails/DashboardReviewDetails';
import Loading from '../../Components/Loading/Loading';
import styles from './DashboardReviewsPage.module.scss';

const DashboardReviewsPage = ({
	user: { _id },
	reviews: { reviews, loading },
	getUserBourbonReviews,
	cleanupReviews,
}) => {
	const [review, setReview] = useState(reviews[0]);

	useEffect(() => {
		getUserBourbonReviews(_id);

		// clean up reviews function

		return () => cleanupReviews();
	}, [_id, getUserBourbonReviews, cleanupReviews]);

	const handleSetReview = (review) => {
		setReview(review);
	};

	const textLower = <h1>Reviews</h1>;

	return loading ? (
		<Loading />
	) : (
		<div className={styles.reviews_container}>
			<HeroSplash type={`reviews`} textUpper={`Your`} textLower={textLower} />
			<section className={styles.reviews_section}>
				<DashboardReviewList
					reviews={reviews}
					handleSetReview={handleSetReview}
				/>
				<DashBoardReviewDetails review={review} />
			</section>
		</div>
	);
};
DashboardReviewsPage.propTypes = {
	user: PropTypes.object.isRequired,
	reviews: PropTypes.object.isRequired,
	getUserBourbonReviews: PropTypes.func.isRequired,
	cleanupReviews: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	user: state.auth.user,
	reviews: state.reviews,
});
export default connect(mapStateToProps, {
	getUserBourbonReviews,
	cleanupReviews,
})(DashboardReviewsPage);
