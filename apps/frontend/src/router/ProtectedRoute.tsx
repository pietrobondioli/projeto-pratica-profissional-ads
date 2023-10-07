import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../config/routes';

interface ProtectedRouteProps {
	isAllowed: boolean;
}

function ProtectedRoute({ isAllowed }: ProtectedRouteProps) {
	if (!isAllowed) {
		toast.error('Você não tem permissão para acessar essa página');
		return <Navigate to={ROUTES.HOME} />;
	}

	return <Outlet />;
}

export default ProtectedRoute;
