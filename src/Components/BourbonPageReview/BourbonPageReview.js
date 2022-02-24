import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import styles from './BourbonPageReview.module.scss';

const BourbonPageReview = ({ review }) => {
	const noData = `Not reviewed yet...`;
	let { author, intro, nose, taste, finish, overall } = review;

	for (let i = 0; i < Object.keys(review).length; i++) {
		if (review[Object.keys(review)[i]] === null) {
			review[Object.keys(review)[i]] = noData;
		}
	}

	return (
		<div className={styles.review_container}>
			<h1>
				<ImQuotesLeft /> {intro} <ImQuotesRight />{' '}
				{author !== 'Not reviewed yet...' && (
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
