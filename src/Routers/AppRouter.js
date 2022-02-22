import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../Components/Header/Header';
import LandingPage from '../Pages/LandingPage/LandingPage.js';
import LoginPage from '../Pages/LoginPage/LoginPage.js';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage.js';
import BourbonsPage from '../Pages/BourbonsPage/BourbonsPage.js';

import { Provider } from 'react-redux';
import store from '../store';

const AppRouter = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegistrationPage />} />
					<Route path='/bourbons' element={<BourbonsPage />} />
				</Routes>
			</Router>
		</Provider>
	);
};
export default AppRouter;
