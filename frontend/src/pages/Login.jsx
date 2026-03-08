import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const user = await login(form.email, form.password);
            navigate(user.role === 'admin' ? '/admin' : '/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in">
                    <div className="w-20 h-20 bg-accent rounded-3xl flex items-center justify-center text-4xl font-bold text-white mx-auto shadow-2xl mb-4">
                        R
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">RetireAssist</h1>
                    <p className="text-xl text-blue-200">Your Pension Companion</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
                    <h2 className="text-2xl font-bold text-primary-dark text-center mb-6">Welcome Back</h2>

                    {error && (
                        <div className="mb-4 p-4 bg-danger/10 border border-danger/30 rounded-2xl text-danger text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="label-senior">
                                <FiMail className="inline mr-2" size={18} />Email Address
                            </label>
                            <input
                                type="email"
                                className="input-senior"
                                placeholder="Enter your email"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="label-senior">
                                <FiLock className="inline mr-2" size={18} />Password
                            </label>
                            <input
                                type="password"
                                className="input-senior"
                                placeholder="Enter your password"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? (
                                <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Sign In <FiArrowRight size={20} /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-lg text-text-light">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-accent font-bold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-bg rounded-2xl">
                        <p className="text-sm font-semibold text-primary mb-2">🔑 Demo Accounts</p>
                        <div className="space-y-1 text-sm text-text-light">
                            <p>👤 User: <code className="bg-white px-2 py-0.5 rounded text-text">ramesh@example.com</code> / <code className="bg-white px-2 py-0.5 rounded text-text">password123</code></p>
                            <p>🔒 Admin: <code className="bg-white px-2 py-0.5 rounded text-text">admin@retireassist.com</code> / <code className="bg-white px-2 py-0.5 rounded text-text">admin123</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
