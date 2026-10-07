import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';
import Logo from '../components/common/Logo';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(''); // Reset error
        try {
            const user = await login(formData.email, formData.password);
            toast.success(`Welcome back, ${user.firstName}!`);
            const destination = user.role === 'instructor'
                ? '/instructor/dashboard'
                : user.role === 'reviewer' ? '/reviewer/dashboard'
                    : user.role === 'mentor' ? '/mentor/dashboard'
                        : user.role === 'admin' ? '/admin/dashboard'
                            : '/student';
            navigate(destination);
        } catch (err) {
            const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex relative overflow-hidden bg-white text-slate-900 selection:bg-teal-600 selection:text-white">

            {/* Centered Premium Form */}
            <div className="flex-1 flex items-center justify-center p-6 lg:p-12 relative z-10">
                <div className="w-full max-w-md animate-slide-up">
                    <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-2xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.5)] p-8 lg:p-10 border border-white/50 dark:border-slate-700/50 relative overflow-hidden group">
                        
                        {/* Inner glowing highlight */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 dark:from-white/5 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"></div>

                        <div className="lg:hidden text-center mb-10">
                            <Logo size="lg" className="justify-center" />
                        </div>

                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-3xl font-extrabold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent drop-shadow-sm">
                                Welcome Back
                            </h2>
                            <p className="text-base text-slate-500 dark:text-slate-400">
                                Sign in to continue your learning journey
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                            {error && (
                                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded-xl animate-shake backdrop-blur-sm">
                                    <div className="flex">
                                        <div className="flex-shrink-0 text-red-500">⚠️</div>
                                        <div className="ml-3">
                                            <p className="text-sm font-bold text-red-800 dark:text-red-200">
                                                {error}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="group/input">
                                <label className="block text-sm font-bold mb-2 transition-colors text-slate-600 dark:text-slate-300">
                                    📧 Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:scale-[1.02] hover:shadow-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div className="group/input">
                                <label className="block text-sm font-bold mb-2 transition-colors text-slate-600 dark:text-slate-300">
                                    🔒 Password
                                </label>
                                <input
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full px-4 py-3.5 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2 focus:ring-purple-500 focus:scale-[1.02] hover:shadow-md bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="relative w-full py-4 rounded-xl text-base font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.6)] overflow-hidden group/btn mt-4"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                                <div className="relative flex items-center justify-center gap-2">
                                    {loading && <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />}
                                    {loading ? 'Signing in...' : '✨ Sign In'}
                                </div>
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400 relative z-10">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="font-bold bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent hover:from-purple-700 dark:hover:from-purple-300 hover:to-indigo-700 dark:hover:to-indigo-300 transition-all drop-shadow-sm"
                            >
                                Sign up now →
                            </Link>
                        </p>
                    </div>

                    <div className="mt-6 flex items-center justify-center gap-6 text-slate-600 dark:text-white/60 text-xs">
                        <div className="flex items-center gap-1">
                            <span>🔒</span>
                            <span>Secure Login</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>⚡</span>
                            <span>Fast Access</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span>🌟</span>
                            <span>Premium Experience</span>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            `}</style>
        </div>
    );
}
