import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPaginatedBourbons } from '../../Actions/bourbons';
import BourbonCard from '../BourbonCard/BourbonCard';
import Search from '../Search/Search';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Loading from '../Loading/Loading';
import styles from './BourbonGrid.module.scss';

const BourbonGrid = ({
	loading,
	bourbons,
	last_page,
	getPaginatedBourbons,
}) => {
	const [currentPage, setCurrentPage] = useState(1);
	const location = useLocation();
	const navigate = useNavigate();

	const returnParams = useCallback(async () => {
		const params = new URLSearchParams(location.search);
		let page = 1;
		if (params.get('page')) {
			page = params.get('page');
		}
		let search = '';
		if (params.get('search')) {
			search = params.get('search');
		}
		let sort = 'title_asc';
		if (params.get('sort')) {
			let sortArr = params.get('sort').split('_');
			if (sortArr[1]) {
				sort = params.get('sort');
			} else {
				sort = `${sortArr[0]}_asc`;
			}
		}
		return { page, search, sort };
	}, [location]);

	const handlePage = async (direction) => {
		const pageParams = await returnParams();
		const { search, sort } = pageParams;
		let baseLocation = `/bourbons?`;
		if (search) {
			baseLocation = `/bourbons?search=${search}&`;
		}
		if (direction) {
			setCurrentPage(currentPage + 1);
			navigate(`${baseLocation}sort=${sort}&page=${currentPage + 1}`);
		} else {
			setCurrentPage(currentPage - 1);
			navigate(`${baseLocation}sort=${sort}&page=${currentPage - 1}`);
		}
		window.scroll({ top: 0, left: 0, behavior: 'smooth' });
	};

	const handleSearch = (searchTerm) => {
		navigate(`/bourbons?search=${searchTerm}`);
	};

	useEffect(() => {
		const fetchBourbons = async () => {
			const pageParams = await returnParams();
			const { page, search, sort } = pageParams;
			try {
				await getPaginatedBourbons(page, search, sort);
				setCurrentPage(parseInt(page));
			} catch (error) {
				console.log(error);
			}
		};
		fetchBourbons();
	}, [location.search, returnParams, getPaginatedBourbons]);
	return loading ? (
		<Loading />
	) : (
		<>
			<div className={styles.grid_label}>
				<h1>
					Find your next obsession <span> 🥃</span>
				</h1>
				<Search handleSearch={handleSearch} />
			</div>
			{bourbons.length > 0 ? (
				<>
					<div className={styles.grid}>
						{bourbons.map((bourbon) => (
							<BourbonCard key={bourbon._id} bourbon={bourbon} />
						))}
					</div>

					<div className={styles.btn_group}>
						<button
							disabled={currentPage <= 1}
							onClick={(e) => handlePage(false)}>
							<BsChevronLeft />
						</button>
						<button
							disabled={currentPage === last_page}
							onClick={(e) => handlePage(true)}>
							<BsChevronRight />
						</button>
					</div>
					<div className={styles.pages}>
						<p>
							Page {currentPage} of {last_page}
						</p>
					</div>
				</>
			) : (
				<div className={styles.no_bourbons_container}>
					<div>
						<h1>No bourbons found...</h1>
						<h3>Maybe try searching for:</h3>
					</div>

					<ul>
						<li>A bourbon by distiller</li>
						<li>A bourbon by bottler</li>
						<li>Try a common search term like "bond"</li>
					</ul>
				</div>
			)}
		</>
	);
};

BourbonGrid.propTypes = {
	loading: PropTypes.bool.isRequired,
	bourbons: PropTypes.array.isRequired,
	last_page: PropTypes.number.isRequired,
	getPaginatedBourbons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	loading: state.bourbons.loading,
	bourbons: state.bourbons.bourbons,
	last_page: state.bourbons.last_page,
});
export default connect(mapStateToProps, { getPaginatedBourbons })(BourbonGrid);
