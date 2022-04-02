import { useNavigate } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';
import styles from './FeatureCard.module.scss';

const FeatureCard = ({ feature, btnObj, borders }) => {
	const navigate = useNavigate();
	const { icon, title, content } = feature;
	const Icon = icon;
	const handleNavigate = () => {
		if (btnObj.text === 'Explore') {
			smoothscroll.polyfill();
			window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
		}
		navigate(btnObj.path);
	};
	return (
		<div className={borders ? styles.container : styles.container_noborders}>
			<div>
				<Icon />
			</div>
			<h1>{title}</h1>
			<p>{content}</p>
			{btnObj && (
				<button onClick={() => handleNavigate()}>{btnObj.text}</button>
			)}
		</div>
	);
};

export default FeatureCard;
