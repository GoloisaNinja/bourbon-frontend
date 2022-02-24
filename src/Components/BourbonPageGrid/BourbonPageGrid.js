import FeatureCard from '../../Components/FeatureCard/FeatureCard';
import { GiCellarBarrels, GiSquareBottle } from 'react-icons/gi';
import { FaGlassWhiskey, FaRegCalendarAlt } from 'react-icons/fa';
import styles from './BourbonPageGrid.module.scss';

const BourbonPageGrid = ({ abv, age, bottler, distiller }) => {
	return (
		<div className={styles.card_grid}>
			<FeatureCard
				feature={{
					icon: FaGlassWhiskey,
					title: abv,
					content: 'ABV',
				}}
			/>
			<FeatureCard
				feature={{
					icon: FaRegCalendarAlt,
					title: age,
					content: 'Age',
				}}
			/>
			<FeatureCard
				feature={{
					icon: GiSquareBottle,
					title: bottler,
					content: 'Bottled By',
				}}
			/>
			<FeatureCard
				feature={{
					icon: GiCellarBarrels,
					title: distiller,
					content: 'The Distiller',
				}}
			/>
		</div>
	);
};
export default BourbonPageGrid;
