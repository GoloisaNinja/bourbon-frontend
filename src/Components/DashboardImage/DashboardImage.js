import styles from './DashboardImage.module.scss';

const DashboardImage = ({ username }) => {
	return (
		<div className={styles.img_container}>
			<div className={styles.img_bg}></div>
			<div className={styles.overlay}>
				<div>
					<h1>Hello</h1>
					<h1>{username}</h1>
				</div>
			</div>
		</div>
	);
};
export default DashboardImage;
