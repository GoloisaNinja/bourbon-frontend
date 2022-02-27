import { Link } from 'react-router-dom';
import { SiTwitter } from 'react-icons/si';
import styles from './Footer.module.scss';

const Footer = () => {
	const year = new Date().getFullYear();
	return (
		<footer className={styles.footer_container}>
			<div>
				<h3>gitur bourb(ON)</h3>
				<Link to='/'>Home</Link>
				<a
					href='https://github.com/goloisaninja'
					rel='noreferrer'
					target='_blank'>
					Github
				</a>
				<a href='https://whiskeyraiders.com' rel='noreferrer' target='_blank'>
					Whiskey Raiders
				</a>
				<p>
					Copyright <span className={styles.pink_span}>{year}</span>
				</p>
			</div>
			<div>
				<h3>
					<SiTwitter />{' '}
					<a
						href='https://twitter.com/goloisaninja'
						rel='noreferrer'
						target='_blank'>
						built by GoloisaNinja
					</a>
				</h3>
				<a href='https://jcodes.page' rel='noreferrer' target='_blank'>
					My Portfolio
				</a>
			</div>
		</footer>
	);
};
export default Footer;
