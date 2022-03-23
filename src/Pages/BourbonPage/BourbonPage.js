import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBourbon, cleanUpBourbon } from '../../Actions/bourbon';
import { getBourbonReviews } from '../../Actions/review';
import Modal from '../../Components/Modal/Modal';
import AddBourbonForm from '../../Components/AddBourbonForm/AddBourbonForm';
import BourbonPricing from '../../Components/BourbonPageComponents/BourbonPricing/BourbonPricing';
import BourbonDetails from '../../Components/BourbonPageComponents/BourbonDetails/BourbonDetails';
import UpperReview from '../../Components/BourbonPageComponents/UpperReview/UpperReview';
import ReviewSection from '../../Components/BourbonPageComponents/BourbonBottomReview/ReviewSection/ReviewSection';
import Loading from '../../Components/Loading/Loading';
import {
	MdErrorOutline,
	MdOutlineCollectionsBookmark,
	MdStarBorder,
} from 'react-icons/md';
import styles from './BourbonPage.module.scss';

const BourbonPage = ({
	loading,
	bourbon,
	getSingleBourbon,
	cleanUpBourbon,
	reviews_loading,
	reviews,
	getBourbonReviews,
	auth,
}) => {
	const params = useParams();
	const navigate = useNavigate();
	const bourbonId = params.bourbonId;
	const [addType, setAddType] = useState('');
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (typeof window !== undefined) {
			window.scroll(0, 0);
		}
		const fetchBourbonData = async () => {
			await getSingleBourbon(bourbonId);
			await getBourbonReviews(bourbonId);
		};
		fetchBourbonData();

		// clean up function
		return () => cleanUpBourbon();
	}, [bourbonId, getSingleBourbon, getBourbonReviews, cleanUpBourbon]);

	const handleModal = (type) => {
		setAddType(type);
		setShow(!show);
	};

	return loading ? (
		<Loading />
	) : bourbon ? (
		<div className={styles.container}>
			<button onClick={(e) => navigate(-1)}>Go Back</button>
			<div className={styles.details_wrapper}>
				<h1 className={styles.title}>{bourbon.title}</h1>
				<BourbonPricing pricingArray={bourbon.price_array} />
				{auth.isAuthenticated && (
					<span className={styles.actions_group}>
						<MdOutlineCollectionsBookmark
							onClick={() => handleModal('Collection')}
						/>
						<MdStarBorder onClick={() => handleModal('Wishlist')} />
					</span>
				)}
			</div>
			<div className={styles.lower_container}>
				<div className={styles.score_container}>
					<p>Score</p>
					<p>{bourbon.review.score ? bourbon.review.score : '?'}</p>
				</div>
				<img
					src={bourbon.image}
					alt={`A bottle of ${bourbon.title} or a default whiskey background`}
				/>
				<BourbonDetails
					abv={bourbon.abv}
					age={bourbon.age}
					bottler={bourbon.bottler}
					distiller={bourbon.distiller}
				/>
				<UpperReview review={bourbon.review} />
				{reviews_loading ? (
					<div>
						<h2>loading...</h2>
					</div>
				) : (
					<ReviewSection reviews={reviews} />
				)}
			</div>
			{show && (
				<Modal
					contents={{
						component: AddBourbonForm,
						handleModal: handleModal,
						details: { type: addType },
					}}
				/>
			)}
		</div>
	) : (
		<div className={styles.not_found}>
			<button onClick={(e) => navigate(-1)}>Go Back</button>
			<h1>
				<MdErrorOutline />
				Uh oh!
			</h1>
			<h2>Bourbon not found...</h2>
		</div>
	);
};

BourbonPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	bourbon: PropTypes.object,
	getSingleBourbon: PropTypes.func.isRequired,
	cleanUpBourbon: PropTypes.func.isRequired,
	reviews_loading: PropTypes.bool.isRequired,
	reviews: PropTypes.array.isRequired,
	auth: PropTypes.object,
};

const mapStateToProps = (state) => ({
	loading: state.bourbon.loading,
	bourbon: state.bourbon.bourbon,
	reviews_loading: state.bourbon.user_reviews.loading,
	reviews: state.bourbon.user_reviews.reviews,
	auth: state.auth,
});
export default connect(mapStateToProps, {
	getSingleBourbon,
	cleanUpBourbon,
	getBourbonReviews,
})(BourbonPage);
