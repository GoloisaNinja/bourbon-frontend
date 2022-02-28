import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBourbon, cleanUpBourbon } from '../../Actions/bourbon';
import BourbonPagePricing from '../../Components/BourbonPagePricing/BourbonPagePricing';
import BourbonPageGrid from '../../Components/BourbonPageGrid/BourbonPageGrid';
import BourbonPageReview from '../../Components/BourbonPageReview/BourbonPageReview';
import Loading from '../../Components/Loading/Loading';
import Alert from '../../Components/Alert/Alert';
import { MdErrorOutline } from 'react-icons/md';
import styles from './BourbonPage.module.scss';

const BourbonPage = ({
	loading,
	bourbon,
	getSingleBourbon,
	cleanUpBourbon,
}) => {
	const params = useParams();
	const navigate = useNavigate();
	const bourbonId = params.bourbonId;

	useEffect(() => {
		if (typeof window !== undefined) {
			window.scroll(0, 0);
		}
		const fetchBourbon = async () => {
			await getSingleBourbon(bourbonId);
		};
		fetchBourbon();

		// clean up function
		return () => cleanUpBourbon();
	}, [bourbonId, getSingleBourbon, cleanUpBourbon]);

	return loading ? (
		<Loading />
	) : bourbon ? (
		<div className={styles.container}>
			<button onClick={(e) => navigate(-1)}>Go Back</button>
			<div className={styles.details_wrapper}>
				<h1 className={styles.title}>{bourbon.title}</h1>
				<BourbonPagePricing pricingArray={bourbon.price_array} />
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
				<BourbonPageGrid
					abv={bourbon.abv}
					age={bourbon.age}
					bottler={bourbon.bottler}
					distiller={bourbon.distiller}
				/>
				<BourbonPageReview review={bourbon.review} />
			</div>
		</div>
	) : (
		<>
			<Alert />
			<div className={styles.not_found}>
				<button onClick={(e) => navigate(-1)}>Go Back</button>
				<h1>
					<MdErrorOutline />
					Uh oh!
				</h1>
				<h2>Bourbon not found...</h2>
			</div>
		</>
	);
};

BourbonPage.propTypes = {
	loading: PropTypes.bool.isRequired,
	bourbon: PropTypes.object,
	getSingleBourbon: PropTypes.func.isRequired,
	cleanUpBourbon: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.bourbon.loading,
	bourbon: state.bourbon.bourbon,
});
export default connect(mapStateToProps, { getSingleBourbon, cleanUpBourbon })(
	BourbonPage
);
