import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';
import CollectionForm from '../CollectionsPageComponents/CollectionForm';
import Modal from '../Modal/Modal';
import styles from './ContentList.module.scss';

const ContentList = ({ content, handleSetContent, contentObj }) => {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const handleModal = () => {
		setShow(!show);
	};
	return (
		<div className={styles.content_list}>
			{content.length ? (
				<>
					<div>
						<h1>{`${contentObj.type} List`}</h1>
						{contentObj.type !== 'Reviews' && (
							<div>
								<HiOutlinePlus onClick={() => handleModal()} />
							</div>
						)}
					</div>
					{content.map((item) => (
						<button key={item._id} onClick={(e) => handleSetContent(item)}>
							{item[contentObj.contentLabel]}{' '}
							<span>{item.updatedAt.slice(0, 10)}</span>
						</button>
					))}
				</>
			) : (
				<div>
					<h1 className={styles.empty_title}>{`No ${contentObj.type}`}</h1>
					{content.type === 'Reviews' ? (
						<button
							className={styles.btn_explore}
							onClick={(e) => navigate('/bourbons')}>
							Go Explore!
						</button>
					) : (
						<button
							className={styles.btn_explore}
							onClick={(e) => navigate('/bourbons')}>
							Create One!
						</button>
					)}
				</div>
			)}
			{show && (
				<Modal
					contents={{
						component: CollectionForm,
						handleModal: handleModal,
						details: { isEdit: false },
					}}
				/>
			)}
		</div>
	);
};

export default ContentList;
