import { useState, useEffect, useCallback } from 'react';
import { getPaginatedBourbons } from '../../Actions/bourbons';
import { useNavigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
import Search from '../../Components/Search/Search';
import Loading from '../../Components/Loading/Loading';
import smoothscroll from 'smoothscroll-polyfill';
import BourbonsGrid from '../../Components/BourbonsGrid/BourbonsGrid';
import styles from './BourbonsPage.module.scss';

const BourbonsPage = ({
	bourbons: { loading, bourbons, last_page },
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
		smoothscroll.polyfill();
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
		<div>
			<div className={styles.intro}>
				<h1>
					Find your next obsession <span> 🥃</span>
				</h1>
			</div>
			<Search handleSearch={handleSearch} />
			<BourbonsGrid bourbons={bourbons} />
			{bourbons.length > 0 && (
				<>
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
			)}
		</div>
	);
};

BourbonsPage.propTypes = {
	bourbons: PropTypes.object.isRequired,
	getPaginatedBourbons: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	bourbons: state.bourbons,
});

export default connect(mapStateToProps, { getPaginatedBourbons })(BourbonsPage);
