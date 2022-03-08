import { Link } from 'react-router-dom';
import styles from './DashboardReviewDetails.module.scss';

const DashBoardReviewDetails = ({ review }) => {
	return (
		<div className={styles.details_wrapper}>
			{review ? (
				<div>
					<h1>Review Details</h1>
					<div>
						<div className={styles.details_upper_card}>
							<p>Bourbon</p>
							<p>
								<Link
									className={styles.bourbon_link}
									to={`/bourbons/${review._id}`}>
									{review.bourbonName}
								</Link>
							</p>
						</div>
						<div className={styles.details_upper_card}>
							<p>Title</p>
							<p>{review.reviewTitle}</p>
						</div>
						<div className={`${styles.details_upper_card} ${styles.score}`}>
							<p>Score</p>
							<p>{review.reviewScore}</p>
						</div>
					</div>
					<div className={styles.details_lower_card}>
						<p>What you said</p>
						<p>{review.reviewText}</p>
					</div>
				</div>
			) : (
				<div>
					<h1>Select a review...</h1>
				</div>
			)}
		</div>
	);
};
export default DashBoardReviewDetails;
