import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import smoothscroll from 'smoothscroll-polyfill';

const ScrollToTop = () => {
	const routePath = useLocation();

	useEffect(() => {
		if (typeof window !== undefined) {
			smoothscroll.polyfill();
			setTimeout(() => {
				window.scroll({
					top: routePath.state ? routePath.state : 0,
					left: 0,
					behavior: 'smooth',
				});
			}, 500);
		}
	}, [routePath]);

	return null;
};
export default ScrollToTop;
