import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteUserReview } from '../../Actions/review';
import {
	deleteUserCollection,
	deleteBourbonFromUserCollection,
} from '../../Actions/collections';
import styles from './ConfirmCancel.module.scss';

const ConfirmCancel = ({
	handleModal,
	details,
	deleteUserReview,
	deleteUserCollection,
	deleteBourbonFromUserCollection,
	collection,
}) => {
	const { content } = details;
	const handleClick = (e) => {
		if (e.target.value === 'cancel') {
			handleModal();
		} else {
			if (content.type === 'Review') {
				deleteUserReview(content.id);
			} else if (content.type === 'Collection') {
				deleteUserCollection(content.id);
			} else if (content.type === 'Bourbon') {
				deleteBourbonFromUserCollection(collection._id, content.id);
			} else {
				//deleteUserWishlist(content.id)
				console.log('wishlist here');
			}
			handleModal();
		}
	};
	return (
		<div className={styles.container}>
			<h1>{`Delete ${content.type}`}</h1>
			{content.type === 'Bourbon' ? (
				<h4>
					Just checking! You really want to delete <span>{content.name}</span>
					{` from your ${content.type.toLowerCase()}?`}
				</h4>
			) : (
				<h4>
					Just checking! You really want to delete your{' '}
					<span>{content.name}</span>
					{` ${content.type.toLowerCase()}?`}
				</h4>
			)}

			<div>
				<button value='confirm' onClick={(e) => handleClick(e)}>
					confirm
				</button>
				<button value='cancel' onClick={(e) => handleClick(e)}>
					cancel
				</button>
			</div>
		</div>
	);
};
ConfirmCancel.propTypes = {
	deleteUserReview: PropTypes.func.isRequired,
	deleteUserCollection: PropTypes.func.isRequired,
	deleteBourbonFromUserCollection: PropTypes.func.isRequired,
	collection: PropTypes.object,
};
const mapStateToProps = (state) => ({
	collection: state.collections.quick_look,
});
export default connect(mapStateToProps, {
	deleteUserReview,
	deleteUserCollection,
	deleteBourbonFromUserCollection,
})(ConfirmCancel);
