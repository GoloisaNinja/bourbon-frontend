import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { postBourbonReview } from '../../Actions/review';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './BourbonPageReviewForm.module.scss';

const BourbonPageReviewForm = ({
	bourbon_id,
	title,
	postBourbonReview,
	handleModal,
}) => {
	const [formData, setFormData] = useState({
		review_title: '',
		review_score: '1',
		review_text: '',
	});
	const { review_title, review_score, review_text } = formData;

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		smoothscroll.polyfill();
		const cleanReviewTitle = review_title.trim();
		const cleanReviewText = review_text.trim();
		const reviewObj = {
			bourbon_id,
			bourbonName: title,
			reviewTitle: cleanReviewTitle,
			reviewScore: review_score,
			reviewText: cleanReviewText,
		};
		postBourbonReview(reviewObj);
		handleModal();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<div className={styles.form_container}>
			<h1>Create a Review</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Review Title</label>
				<input
					type='text'
					name='review_title'
					maxLength='50'
					value={review_title}
					required
					onChange={(e) => handleChange(e)}
				/>
				<div className={styles.title_chars}>{50 - review_title.length}</div>
				<label>Score (1-Bad 10-Perfect)</label>
				<select
					name='review_score'
					value={review_score}
					onChange={(e) => handleChange(e)}
					required>
					<option value='1'>1</option>
					<option value='2'>2</option>
					<option value='3'>3</option>
					<option value='4'>4</option>
					<option value='5'>5</option>
					<option value='6'>6</option>
					<option value='7'>7</option>
					<option value='8'>8</option>
					<option value='9'>9</option>
					<option value='10'>10</option>
				</select>
				<label>Review Text</label>
				<textarea
					name='review_text'
					required
					cols='10'
					rows='12'
					maxLength='500'
					value={review_text}
					onChange={(e) => handleChange(e)}
				/>
				<div className={styles.review_chars}>{500 - review_text.length}</div>
				<button type='submit'>submit</button>
			</form>
		</div>
	);
};
BourbonPageReviewForm.propTypes = {
	bourbon_id: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	postBourbonReview: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	bourbon_id: state.bourbon.bourbon._id,
	title: state.bourbon.bourbon.title,
});
export default connect(mapStateToProps, { postBourbonReview })(
	BourbonPageReviewForm
);
