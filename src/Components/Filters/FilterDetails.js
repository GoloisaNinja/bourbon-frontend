import styles from './FilterDetails.module.scss';

const FilterDetails = ({ searchTerm, sorts }) => {
	const sortsArray = sorts.split('_');
	return (
		<div className={styles.search_details}>
			<h4>Showing results for</h4>
			<p>
				query | sorted: <span>{searchTerm ? searchTerm : 'no query...'}</span> &{' '}
				<span>{`${sortsArray[0]} ${sortsArray[1]}`}</span>
			</p>
		</div>
	);
};
export default FilterDetails;
