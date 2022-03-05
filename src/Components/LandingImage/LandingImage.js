import styles from './LandingImage.module.scss';

const LandingImage = () => {
	return (
		<div className={styles.img_container}>
			<div className={styles.img_bg}></div>
			<div className={styles.overlay}>
				<h1>Hello</h1>
				<h1>
					Bourb<span className={styles.pink_span}>(on)</span>
				</h1>
			</div>
		</div>
	);
};
export default LandingImage;
