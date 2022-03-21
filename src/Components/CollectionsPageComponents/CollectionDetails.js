import { useState } from 'react';

import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import CollectionForm from './CollectionForm';
import Modal from '../Modal/Modal';
import ConfirmCancel from '../Modal/ConfirmCancel';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './CollectionDetails.module.scss';

const CollectionDetails = ({ collection }) => {
	const [show, setShow] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [showDelete, setShowDelete] = useState(false);
	const [bourbonToDelete, setBourbonToDelete] = useState({});
	const handleModal = () => {
		setShow(!show);
	};
	const handleEditModal = () => {
		setShowEdit(!showEdit);
	};
	const handleDeleteBourbonModal = () => {
		setShowDelete(!showDelete);
	};
	const handleDeleteBourbon = (id, title) => {
		setBourbonToDelete({ id, title });
		handleDeleteBourbonModal();
	};
	const scrollToTop = () => {
		smoothscroll.polyfill();
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};
	return (
		<div className={styles.container}>
			{collection ? (
				<>
					<div>
						<h1>Quick Look</h1>
						<div>
							<HiOutlinePencil onClick={() => handleEditModal()} />
							<HiOutlineTrash onClick={() => handleModal()} />
						</div>
					</div>
					<div className={styles.details_container}>
						<div>
							<div>
								<p>{collection.bourbons.length}</p>
							</div>
							<Link
								className={
									collection.bourbons.length > 0
										? styles.active
										: styles.disabled
								}
								to={`/collections/${collection._id}`}
								onClick={() => scrollToTop()}>
								Go To Collection
							</Link>
						</div>
						<div>
							<h3>{collection.name}</h3>
							{collection.bourbons.length > 0 ? (
								<ul>
									{collection.bourbons.map((bourbon) => (
										<li key={bourbon._id}>
											<Link to={`/bourbons/${bourbon._id}`}>
												{bourbon.title}
											</Link>
											<HiOutlineTrash
												onClick={() =>
													handleDeleteBourbon(bourbon._id, bourbon.title)
												}
											/>
										</li>
									))}
								</ul>
							) : (
								<>
									<p>Collection is empty! Go add some bourbons!</p>
									<Link
										className={styles.btn_explore}
										onClick={() => scrollToTop()}
										to={`/bourbons`}>
										Go Explore!
									</Link>
								</>
							)}
						</div>
					</div>
				</>
			) : (
				<div>
					<h1>Select a collection from your list...</h1>
				</div>
			)}
			{show && (
				<Modal
					contents={{
						component: ConfirmCancel,
						handleModal: handleModal,
						details: {
							content: {
								type: 'Collection',
								id: collection._id,
								name: collection.name,
							},
						},
					}}
				/>
			)}
			{showEdit && (
				<Modal
					contents={{
						component: CollectionForm,
						handleModal: handleEditModal,
						details: { isEdit: true },
					}}
				/>
			)}
			{showDelete && (
				<Modal
					contents={{
						component: ConfirmCancel,
						handleModal: handleDeleteBourbonModal,
						details: {
							content: {
								type: 'Bourbon',
								id: bourbonToDelete.id,
								name: bourbonToDelete.title,
							},
						},
					}}
				/>
			)}
		</div>
	);
};

export default CollectionDetails;
