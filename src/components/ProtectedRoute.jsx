import { useAuth } from '../context/AuthContextUtils.jsx';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useAuth();

    if (loading) return <div>Cargando...</div>;

    if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>;
}

export default ProtectedRoute;