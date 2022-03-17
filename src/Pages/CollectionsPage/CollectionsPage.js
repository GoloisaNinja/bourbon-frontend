import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
} from '../../Actions/collections';
import Loading from '../../Components/Loading/Loading';
import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import ContentList from '../../Components//ContentList/ContentList';
import CollectionDetails from '../../Components/CollectionsPageComponents/CollectionDetails';
import ScrollToTop from '../../Components/ScrollToTop/ScrollToTop';
import styles from './CollectionsPage.module.scss';

const CollectionsPage = ({
	collections: { loading, quick_look, collections },
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
}) => {
	const textLower = <h1>Collections</h1>;
	useEffect(() => {
		const fetchCollections = async () => {
			await getUserCollections();
		};
		fetchCollections();
		return () => {
			cleanupQuicklook();
		};
	}, [getUserCollections, cleanupQuicklook]);

	const handleSetQuicklook = (collection) => {
		setCollectionQuicklook(collection);
	};

	return loading ? (
		<Loading />
	) : (
		<div className={styles.collections_container}>
			<ScrollToTop />
			<HeroSplash
				type={`collections`}
				textUpper={`Your`}
				textLower={textLower}
			/>
			<section className={styles.collections_section}>
				<ContentList
					content={collections}
					handleSetContent={handleSetQuicklook}
					contentObj={{ type: 'Collections', contentLabel: 'name' }}
				/>
				<CollectionDetails collection={quick_look} />
			</section>
		</div>
	);
};

CollectionsPage.propTypes = {
	collections: PropTypes.object.isRequired,
	getUserCollections: PropTypes.func.isRequired,
	setCollectionQuicklook: PropTypes.func.isRequired,
	cleanupQuicklook: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	collections: state.collections,
});

export default connect(mapStateToProps, {
	getUserCollections,
	setCollectionQuicklook,
	cleanupQuicklook,
})(CollectionsPage);
