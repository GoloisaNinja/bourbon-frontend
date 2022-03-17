import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

const ScrollToTop = () => {
	const routePath = useLocation();
	useEffect(() => {
		if (typeof window !== undefined) {
			smoothscroll.polyfill();
			window.scroll({ top: 0, left: 0, behavior: 'smooth' });
		}
	}, [routePath]);

	return null;
};
export default ScrollToTop;
