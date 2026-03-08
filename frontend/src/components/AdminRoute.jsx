import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * Session 16: Route guard that requires the ADMIN role.
 * Redirects to /dashboard if authenticated but not admin, or /login if not authenticated.
 */
function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role !== 'ADMIN' && !user.roles?.includes('ROLE_ADMIN')) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;
