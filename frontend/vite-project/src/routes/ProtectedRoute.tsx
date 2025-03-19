import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

export default function ProtectedRoute() {
    const authContext = useAuth();
    const user = authContext?.user;
    const loading = authContext?.loading

  // While checking authentication status, show a loading indicator or nothing
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-pink-400 border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
}