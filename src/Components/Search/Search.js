import { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import styles from './Search.module.scss';

const Search = ({ handleSearch }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const handleClick = () => {
		let search = searchTerm.trim().toLowerCase();
		handleSearch(search);
	};
	return (
		<div className={styles.search_container}>
			<input
				type='text'
				value={searchTerm}
				placeholder='Search'
				onChange={(e) => setSearchTerm(e.target.value)}
			/>
			<button onClick={(e) => handleClick()}>
				<GoSearch />
			</button>
		</div>
	);
};
export default Search;
