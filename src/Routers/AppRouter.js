import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Alert from '../Components/Alert/Alert';
import Header from '../Components/Header/Header';
import Footer from '../Components/Footer/Footer';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegistrationPage from '../Pages/RegistrationPage/RegistrationPage';
import BourbonsPage from '../Pages/BourbonsPage/BourbonsPage';
import BourbonPage from '../Pages/BourbonPage/BourbonPage';
import DashboardPage from '../Pages/Dashboard/DashboardPage';
import DashboardReviewsPage from '../Pages/Dashboard/DashboardReviewsPage';
import PrivateRoute from '../Components/Routing/PrivateRoute';

import { Provider } from 'react-redux';
import store from '../store';

const AppRouter = () => {
	return (
		<Provider store={store}>
			<Router>
				<Header />
				<Alert />
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegistrationPage />} />
					<Route path='/bourbons' element={<BourbonsPage />} />
					<Route path='/bourbons/:bourbonId' element={<BourbonPage />} />
					<Route path='/dashboard' element={<PrivateRoute />}>
						<Route path='/dashboard' element={<DashboardPage />} />
						<Route
							path='/dashboard/reviews'
							element={<DashboardReviewsPage />}
						/>
					</Route>
				</Routes>
				<Footer />
			</Router>
		</Provider>
	);
};
export default AppRouter;
