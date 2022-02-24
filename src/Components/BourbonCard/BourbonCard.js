import { useNavigate } from 'react-router-dom';
import styles from './BourbonCard.module.scss';

const BourbonCard = ({ bourbon }) => {
	const { _id, image, title, bottler, distiller, abv, age } = bourbon;
	const navigate = useNavigate();
	return (
		<div className={styles.card_container}>
			<div className={styles.image_container}>
				<img className={styles.image} src={image} alt={`bourbon ${title}`} />
			</div>
			<div className={styles.card_container_lower}>
				<div className={styles.card_title}>
					<h2>{title}</h2>
				</div>
				<div className={styles.card_details}>
					<table className={styles.table}>
						<thead>
							<tr>
								<th>bottler</th>
								<th>distiller</th>
								<th>abv</th>
								<th>age</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>{bottler}</td>
								<td>{distiller}</td>
								<td>{abv}</td>
								<td>{age}</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className={styles.card_button}>
					<button
						className={styles.bourbon_button}
						onClick={(e) => navigate(`/bourbons/${_id}`)}>
						See More
					</button>
				</div>
			</div>
		</div>
	);
};
export default BourbonCard;
