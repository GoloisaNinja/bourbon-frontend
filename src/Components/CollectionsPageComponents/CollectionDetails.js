import { Link } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './CollectionDetails.module.scss';

const CollectionDetails = ({ collection }) => {
	const scrollToTop = () => {
		smoothscroll.polyfill();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};
	return collection ? (
		<div className={styles.container}>
			<div>
				<h1>Quick Look</h1>
				<p>{collection.bourbons.length}</p>
			</div>
			{collection.bourbons.length > 0 ? (
				<div className={styles.details_container}>
					<Link
						to={`/collections/${collection._id}`}
						onClick={() => scrollToTop()}>
						Go To Collection
					</Link>
					<div>
						<ul>
							{collection.bourbons.map((bourbon) => (
								<li key={bourbon._id}>
									<Link to={`/bourbons/${bourbon.bourbon_id}`}>
										{bourbon.title}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			) : (
				<div className={styles.empty_container}>
					<p>Collection is empty! Go add some bourbons!</p>
					<Link onClick={() => scrollToTop()} to={`/bourbons`}>
						Go Explore!
					</Link>
				</div>
			)}
		</div>
	) : (
		<div>
			<h1>Select a collection from your list...</h1>
		</div>
	);
};
export default CollectionDetails;
