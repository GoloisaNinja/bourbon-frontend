import Hero from '../../Components/Hero/Hero';
import LandingImage from '../../Components/LandingImage/LandingImage';
import LandingText from '../../Components/LandingText/LandingText';
import Alert from '../../Components/Alert/Alert';

const LandingPage = () => {
	return (
		<div>
			<Alert />
			<Hero />
			{/* <BourbonGrid /> */}
			<LandingImage />
			<LandingText />
		</div>
	);
};

export default LandingPage;
