import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import styles from './BourbonPageReview.module.scss';

const BourbonPageReview = ({ review }) => {
	const noData = `This section of the review is incomplete or has not been reviewed yet...`;
	let { author, intro, nose, taste, finish, overall } = review;

	// LOOKS FOR NULL SECTIONS OF REVIEW DATA AND
	// OVERWRITES WITH A NOT REVIEWED STRING

	for (const [key] of Object.entries(review)) {
		if (review[key] === null) {
			review[key] = noData;
		}
	}

	return (
		<div className={styles.review_container}>
			<h1>
				<ImQuotesLeft /> {intro} <ImQuotesRight />{' '}
				{author !==
					'This section of the review is incomplete or has not been reviewed yet...' && (
					<span className={styles.credit}>{`Reviewed by ${author}`}</span>
				)}
			</h1>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>NOSE </span>
				{nose}
			</h2>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>TASTE </span>
				{taste}
			</h2>
			<h2 className={styles.section_text}>
				<span className={styles.section_label}>FINISH </span>
				{finish}
			</h2>
			<h2 className={styles.section_text}>
				<span className={`${styles.section_label} ${styles.overall}`}>
					OVERALL{' '}
				</span>
				{overall}
			</h2>
		</div>
	);
};
export default BourbonPageReview;
