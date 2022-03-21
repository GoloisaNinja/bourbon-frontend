import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addBourbontoUserCollection } from '../../Actions/collections';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './AddBourbonForm.module.scss';

const AddBourbonForm = ({
	handleModal,
	collections,
	bourbon,
	addBourbontoUserCollection,
}) => {
	const [collection, setCollection] = useState(undefined);
	const [validCollections, setValidCollections] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		if (collections.length > 0) {
			let arr = [
				{
					_id: '0',
					collection_id: 'placeholder',
					collection_name: 'select...',
				},
			];
			for (let i = 0; i < collections.length; i++) {
				if (
					!collections[i].bourbons.some(
						(userbourbon) => userbourbon.bourbon_id === bourbon._id
					)
				) {
					arr.push(collections[i]);
				}
			}
			setValidCollections(arr);
		}
	}, [bourbon._id, collections]);
	const handleSelectCollection = (e) => {
		setCollection(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		smoothscroll.polyfill();
		addBourbontoUserCollection(collection, bourbon._id);
		handleModal();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};
	return (
		<div className={styles.form_container}>
			<h1>Add Bourbon to Collection</h1>
			{validCollections.length > 1 ? (
				<form onSubmit={(e) => handleSubmit(e)}>
					<label>Select a Collection</label>
					<select
						value={collection}
						name='collection'
						onChange={(e) => handleSelectCollection(e)}>
						{validCollections.map((v_collection) => (
							<option key={v_collection._id} value={v_collection.collection_id}>
								{v_collection.collection_name}
							</option>
						))}
					</select>
					<button
						disabled={collection === undefined || collection === 'placeholder'}
						type='submit'>
						add to collection
					</button>
				</form>
			) : (
				<div className={styles.empty_container}>
					<h3>No available collections...</h3>
					<p>
						This bourbon either exists in all your collections, or you may not
						have any collections yet.
					</p>
					<button onClick={() => navigate('/collections')}>
						Manage Collections
					</button>
				</div>
			)}
		</div>
	);
};
AddBourbonForm.propTypes = {
	collections: PropTypes.array.isRequired,
	bourbon: PropTypes.object.isRequired,
	addBourbontoUserCollection: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collections: state.auth.user.collections,
	bourbon: state.bourbon.bourbon,
});
export default connect(mapStateToProps, { addBourbontoUserCollection })(
	AddBourbonForm
);
