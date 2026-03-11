import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiArrowRight, FiShield, FiCheckCircle } from 'react-icons/fi';

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
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8 animate-fade-in">
                    <img src="/logo.png" alt="RetireAssist" className="w-16 h-16 mx-auto mb-3 rounded-xl" />
                    <h1 className="text-2xl font-bold text-text-dark mb-1">RetireAssist</h1>
                    <p className="text-sm text-text-light">Your Trusted Retirement Companion</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fade-in">
                    <h2 className="text-xl font-bold text-text-dark text-center mb-5">Welcome Back</h2>

                    {error && (
                        <div className="mb-4 p-3 bg-danger/5 border border-danger/20 rounded-xl text-danger text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="label-senior">
                                <FiMail className="inline mr-1.5" size={15} />Email Address
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
                                <FiLock className="inline mr-1.5" size={15} />Password
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
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>Sign In <FiArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-border">
                        <span className="flex items-center gap-1 text-xs text-primary font-medium">
                            <FiShield size={12} /> 256-bit Encrypted
                        </span>
                        <span className="flex items-center gap-1 text-xs text-success font-medium">
                            <FiCheckCircle size={12} /> Govt. Verified
                        </span>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-sm text-text-light">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-primary font-semibold hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-4 p-3 bg-bg rounded-xl">
                        <p className="text-xs font-semibold text-text-dark mb-1.5">🔑 Demo Accounts</p>
                        <div className="space-y-1 text-xs text-text-light">
                            <p>👤 User: <code className="bg-white px-1.5 py-0.5 rounded text-text text-[11px]">ramesh@example.com</code> / <code className="bg-white px-1.5 py-0.5 rounded text-text text-[11px]">password123</code></p>
                            <p>🔒 Admin: <code className="bg-white px-1.5 py-0.5 rounded text-text text-[11px]">admin@retireassist.com</code> / <code className="bg-white px-1.5 py-0.5 rounded text-text text-[11px]">admin123</code></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
