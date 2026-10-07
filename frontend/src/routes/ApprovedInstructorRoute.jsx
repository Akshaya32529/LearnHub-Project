import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ApprovedInstructorRoute({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className="min-h-screen grid place-items-center"><div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" /></div>;
    }

    if (!user || user.role !== 'instructor') {
        return <Navigate to="/login" replace />;
    }

    return children;
}
