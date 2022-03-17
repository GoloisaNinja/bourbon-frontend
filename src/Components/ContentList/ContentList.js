import { useNavigate } from 'react-router-dom';
import styles from './ContentList.module.scss';

const ContentList = ({ content, handleSetContent, contentObj }) => {
	const navigate = useNavigate();
	return (
		<div className={styles.content_list}>
			{content.length ? (
				<>
					<h1>{`${contentObj.type} List`}</h1>
					{content.map((item) => (
						<button key={item._id} onClick={(e) => handleSetContent(item)}>
							{item[contentObj.contentLabel]}{' '}
							<span>{item.updatedAt.slice(0, 10)}</span>
						</button>
					))}
				</>
			) : contentObj.type === 'Reviews' ? (
				<div>
					<h1 className={styles.empty_title}>No Reviews...</h1>
					<button
						className={styles.btn_explore}
						onClick={(e) => navigate('/bourbons')}>
						Go Explore!
					</button>
				</div>
			) : (
				<div>
					<h1 className={styles.empty_title}>{`No ${contentObj.type}`}</h1>
					<button
						className={styles.btn_explore}
						onClick={(e) => navigate('/bourbons')}>
						Create One!
					</button>
				</div>
			)}
		</div>
	);
};
export default ContentList;
