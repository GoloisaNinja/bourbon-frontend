import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getUserCollectionById,
	cleanupCollection,
} from '../../Actions/collections';
import Loading from '../../Components/Loading/Loading';
import BourbonsGrid from '../../Components/BourbonsGrid/BourbonsGrid';
import styles from './CollectionPage.module.scss';

const CollectionPage = ({
	collections: {
		collection: { loading, collection },
	},
	getUserCollectionById,
	cleanupCollection,
}) => {
	const params = useParams();
	const collectionId = params.collectionId;
	useEffect(() => {
		getUserCollectionById(collectionId);
		return () => {
			cleanupCollection();
		};
	}, [getUserCollectionById, collectionId, cleanupCollection]);
	return loading ? (
		<Loading />
	) : (
		<div className={styles.container}>
			<h1>
				{collection.name} <span> 🥃</span>
			</h1>
			<BourbonsGrid bourbons={collection.bourbons} />
		</div>
	);
};
CollectionPage.propTypes = {
	collections: PropTypes.object.isRequired,
	getUserCollectionById: PropTypes.func.isRequired,
	cleanupCollection: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collections: state.collections,
});
export default connect(mapStateToProps, {
	getUserCollectionById,
	cleanupCollection,
})(CollectionPage);
