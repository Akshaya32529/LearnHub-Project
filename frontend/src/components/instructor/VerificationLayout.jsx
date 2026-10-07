import { useNavigate } from 'react-router-dom';
import Logo from '../common/Logo';
import { useAuth } from '../../hooks/useAuth';
export default function VerificationLayout({ children }) {
	const { user, logout } = useAuth();
	const navigate = useNavigate();
	const signOut = async () => {
		await logout();
		navigate('/login', { replace: true });
	};

	return (
		<div className="min-h-screen bg-white text-slate-900">
			<header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-8">
				<Logo size="md" />
				<div className="flex items-center gap-3">
					<div className="hidden text-right sm:block">
						<p className="text-sm font-semibold">{user?.firstName} {user?.lastName}</p>
						<p className="text-xs text-slate-500">Instructor applicant</p>
					</div>
					<button onClick={signOut} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
						Logout
					</button>
				</div>
			</header>
			<main className="p-4 sm:p-8">{children}</main>
		</div>
	);
}
