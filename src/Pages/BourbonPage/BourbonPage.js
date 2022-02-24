import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleBourbon } from '../../Api/Api';
import BourbonPagePricing from '../../Components/BourbonPagePricing/BourbonPagePricing';
import BourbonPageGrid from '../../Components/BourbonPageGrid/BourbonPageGrid';
import BourbonPageReview from '../../Components/BourbonPageReview/BourbonPageReview';
import Loading from '../../Components/Loading/Loading';
import styles from './BourbonPage.module.scss';

const BourbonPage = () => {
	const params = useParams();
	const navigate = useNavigate();
	const bourbonId = params.bourbonId;
	const [bourbon, setBourbon] = useState({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (typeof window !== undefined) {
			window.scroll(0, 0);
		}
		const fetchBourbon = async () => {
			const response = await getSingleBourbon(bourbonId);
			if (response !== null) {
				setBourbon(response);
			}
			setIsLoading(false);
		};
		fetchBourbon();
	}, [bourbonId]);

	return isLoading ? (
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
					<p>{bourbon.review.score ? bourbon.review.score : 'NA'}</p>
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
		<div className={styles.container}>
			<h1>Bourbon not found...</h1>
		</div>
	);
};
export default BourbonPage;
