import { useNavigate } from 'react-router-dom';
import styles from './DashboardReviewList.module.scss';

const DashboardReviewCard = ({ reviews, handleSetReview }) => {
	const navigate = useNavigate();
	return (
		<div className={styles.review_list}>
			{reviews.length ? (
				<>
					<h1>Review List</h1>
					{reviews.map((review) => (
						<button key={review._id} onClick={(e) => handleSetReview(review)}>
							{review.reviewTitle} <span>{review.updatedAt.slice(0, 10)}</span>
						</button>
					))}
				</>
			) : (
				<div>
					<h1 className={styles.empty_title}>No Reviews...</h1>
					<button
						className={styles.btn_explore}
						onClick={(e) => navigate('/bourbons')}>
						Go Explore!
					</button>
				</div>
			)}
		</div>
	);
};
export default DashboardReviewCard;
