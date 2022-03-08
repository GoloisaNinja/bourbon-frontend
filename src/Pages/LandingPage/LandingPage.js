import HeroSplash from '../../Components/HeroSplash/HeroSplash';
import LandingText from '../../Components/LandingText/LandingText';

const styles = {
	pink_span: {
		color: `#f826ee`,
		textShadow: 'none',
	},
};

const LandingPage = () => {
	const textLower = (
		<h1>
			Bourb<span style={styles.pink_span}>(on)</span>
		</h1>
	);
	return (
		<div>
			<HeroSplash type={`home`} textUpper='Hello' textLower={textLower} />
			<LandingText />
		</div>
	);
};

export default LandingPage;
