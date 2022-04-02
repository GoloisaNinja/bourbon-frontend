import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';
import smoothscroll from 'smoothscroll-polyfill';
import ContentForm from '../ContentForm/ContentForm';
import Modal from '../Modal/Modal';
import styles from './ContentList.module.scss';

const ContentList = ({ content, handleSetContent, contentObj }) => {
	const [show, setShow] = useState(false);
	const navigate = useNavigate();
	const handleModal = () => {
		setShow(!show);
	};
	const handleNavigate = () => {
		smoothscroll.polyfill();
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		navigate('/bourbons?sort=title_asc');
	};
	return (
		<div className={styles.content_list}>
			{content.length ? (
				<>
					<div className={styles.main_content}>
						<h1>{`${contentObj.type}s List`}</h1>
						{contentObj.type !== 'Review' && (
							<div>
								<HiOutlinePlus onClick={() => handleModal()} />
							</div>
						)}
					</div>
					{content.map((item) => (
						<button
							className={styles.main_content_btn}
							key={item._id}
							onClick={(e) => handleSetContent(item)}>
							{item[contentObj?.contentLabel]}{' '}
							<span>{item.updatedAt.slice(0, 10)}</span>
						</button>
					))}
				</>
			) : (
				<div className={styles.empty_div}>
					<h1>{`No ${contentObj.type}s`}</h1>
					{contentObj.type === 'Review' ? (
						<button onClick={() => handleNavigate()}>Go Explore!</button>
					) : (
						<button onClick={() => handleModal()}>Create One!</button>
					)}
				</div>
			)}
			{show && (
				<Modal
					contents={{
						component: ContentForm,
						handleModal: handleModal,
						details: { isEdit: false, type: contentObj.type },
					}}
				/>
			)}
		</div>
	);
};

export default ContentList;
