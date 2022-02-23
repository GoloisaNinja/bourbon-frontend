import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import BourbonCard from '../BourbonCard/BourbonCard';
import { getPaginatedBourbons } from '../../Api/Api';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loading from '../Loading/Loading';
import styles from './BourbonGrid.module.scss';

const BourbonGrid = () => {
	const [bourbons, setBourbons] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState('title');
	const [lastPage, setLastPage] = useState(20);
	const location = useLocation();
	const navigate = useNavigate();

	const handlePage = (direction) => {
		if (direction) {
			setCurrentPage(currentPage + 1);
			navigate(`/bourbons?page=${currentPage + 1}`);
		} else {
			setCurrentPage(currentPage - 1);
			navigate(`/bourbons?page=${currentPage - 1}`);
		}
		window.scroll(0, 0);
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		let page = params.get('page');
		const fetchBourbons = async () => {
			if (page === null) {
				page = 1;
			}
			try {
				const result = await getPaginatedBourbons(page, sortBy);
				setCurrentPage(parseInt(page));
				setBourbons(result.bourbons);
				setLastPage(Math.ceil(result.total_records / 20));
			} catch (error) {
				console.log(error);
			}
		};
		fetchBourbons();
	}, [location.search, sortBy]);
	return bourbons.length > 0 ? (
		<>
			<div className={styles.grid_label}>
				<h1>
					Find your next obsession <span>🥃</span>
				</h1>
			</div>
			<div className={styles.grid}>
				{bourbons.map((bourbon) => (
					<BourbonCard
						key={bourbon._id}
						title={bourbon.title}
						image={bourbon.image}
						bottler={bourbon.bottler}
						distiller={bourbon.distiller}
						abv={bourbon.abv}
						age={bourbon.age}
					/>
				))}
			</div>
			<div className={styles.btn_group}>
				<button disabled={currentPage <= 1} onClick={(e) => handlePage(false)}>
					<BsChevronLeft />
				</button>
				<button
					disabled={currentPage === lastPage}
					onClick={(e) => handlePage(true)}>
					<BsChevronRight />
				</button>
			</div>
		</>
	) : (
		<Loading />
	);
};
export default BourbonGrid;
