import { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
	editUserCollection,
	postUserCollection,
} from '../../Actions/collections';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './CollectionForm.module.scss';

const CollectionForm = ({
	collection: { name, _id },
	handleModal,
	editUserCollection,
	postUserCollection,
	details,
}) => {
	const [collectionName, setCollectionName] = useState(
		details.isEdit ? name : ''
	);
	const handleChange = (e) => {
		setCollectionName(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		smoothscroll.polyfill();
		const cleanCollectionName = collectionName.trim();
		const editObj = {
			name: cleanCollectionName,
			isPrivate: true,
		};
		if (details.isEdit) {
			editUserCollection(_id, editObj);
		} else {
			postUserCollection(editObj);
		}
		handleModal();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};

	return (
		<div className={styles.form_container}>
			<h1>{details.isEdit ? 'Edit Collection' : 'Create Collection'}</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Collection Name</label>
				<input
					type='text'
					name='name'
					maxLength='50'
					value={collectionName}
					required
					onChange={(e) => handleChange(e)}
				/>
				<div className={styles.title_chars}>{50 - collectionName.length}</div>
				<button type='submit'>
					{details.isEdit ? 'submit edit' : 'submit'}
				</button>
			</form>
		</div>
	);
};
CollectionForm.propTypes = {
	collection: PropTypes.object,
	editUserCollection: PropTypes.func.isRequired,
	postUserCollection: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
	collection: state.collections.quick_look,
});
export default connect(mapStateToProps, {
	editUserCollection,
	postUserCollection,
})(CollectionForm);
