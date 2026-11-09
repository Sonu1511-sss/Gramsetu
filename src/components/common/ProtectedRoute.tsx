import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login if not authenticated
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

