import { useEffect } from 'react';
import { useRoutes, useNavigate, useLocation } from 'react-router-dom';
import { routes } from './config';
import { isAuthenticated } from '../lib/auth';

export function AppRouter() {
    const navigate = useNavigate();
    const location = useLocation();
    const router = useRoutes(routes);

    // Redirect logic
    useEffect(() => {
        if (location.pathname === '/login' && isAuthenticated()) {
            const role = localStorage.getItem('role');
            navigate(`/${role}/dashboard`, { replace: true });
            return;
        }

        if (location.pathname === '/' || location.pathname === '') {
            if (!isAuthenticated()) {
                navigate('/login', { replace: true });
            } else {
                const role = localStorage.getItem('role');
                navigate(`/${role}/dashboard`, { replace: true });
            }
        }
    }, [location.pathname]);

    return router;
}