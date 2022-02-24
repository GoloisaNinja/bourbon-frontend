import styles from './FeatureCard.module.scss';

const FeatureCard = ({ feature }) => {
	const { icon, title, content } = feature;
	const Icon = icon;
	return (
		<div className={styles.container}>
			<div>
				<Icon />
			</div>
			<h1>{title}</h1>
			<p>{content}</p>
		</div>
	);
};

export default FeatureCard;
