import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Shield, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

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
        <div className="min-h-screen gradient-bg flex">
            {/* Left Branding */}
            <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 text-center max-w-md">
                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <Shield size={40} className="text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">Retire Assist</h2>
                    <p className="text-blue-200 text-lg mb-8">Secure Digital Pension Management</p>
                    <div className="space-y-3 text-left">
                        {['AI-Powered Assistance', 'Secure Document Vault', 'Smart Reminders'].map((t, i) => (
                            <div key={i} className="flex items-center gap-3 text-blue-100">
                                <CheckCircle size={18} className="text-accent-light" />
                                <span>{t}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Form */}
            <div className="flex-1 flex items-center justify-center p-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="text-center mb-8 lg:hidden">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                            <Shield size={28} className="text-white" />
                        </div>
                        <h1 className="text-xl font-bold text-text-dark">Retire Assist</h1>
                        <p className="text-sm text-text-muted">Secure Digital Pension Management</p>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-3 lg:block hidden">
                                <Shield size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-text-dark">Welcome Back</h2>
                            <p className="text-sm text-text-muted mt-1">Please enter your details to sign in.</p>
                        </div>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-danger text-sm text-center font-medium">{error}</div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="label"><Mail className="inline mr-1" size={13} />Email Address</label>
                                <input type="email" className="input" placeholder="Enter Your E-mail..." value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                            </div>
                            <div>
                                <label className="label"><Lock className="inline mr-1" size={13} />Password</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} className="input pr-10" placeholder="Password ••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text cursor-pointer bg-transparent border-none">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 rounded border-border" />
                                    <span className="text-text-light">Remember Me</span>
                                </label>
                                <a className="text-primary-light font-medium hover:underline cursor-pointer">Forgot Password?</a>
                            </div>

                            <button type="submit" disabled={loading} className="btn-primary w-full !py-3 disabled:opacity-50">
                                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <>Sign in <ArrowRight size={16} /></>}
                            </button>
                        </form>

                        <p className="mt-5 text-center text-sm text-text-light">
                            Don't have an account yet? <Link to="/signup" className="text-primary-light font-semibold hover:underline">Sign Up</Link>
                        </p>

                        {/* Trust Footer */}
                        <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-border">
                            <span className="flex items-center gap-1 text-xs text-accent font-medium"><Shield size={12} /> 256-bit Encrypted</span>
                            <span className="flex items-center gap-1 text-xs text-primary font-medium"><CheckCircle size={12} /> Govt. Verified</span>
                        </div>

                        {/* Demo */}
                        <div className="mt-4 p-3 bg-bg rounded-lg">
                            <p className="text-xs font-semibold text-text-dark mb-1">🔑 Demo Accounts</p>
                            <div className="space-y-0.5 text-xs text-text-muted">
                                <p>User: <code className="bg-white px-1 py-0.5 rounded text-[11px]">ramesh@example.com</code> / <code className="bg-white px-1 py-0.5 rounded text-[11px]">password123</code></p>
                                <p>Admin: <code className="bg-white px-1 py-0.5 rounded text-[11px]">admin@retireassist.com</code> / <code className="bg-white px-1 py-0.5 rounded text-[11px]">admin123</code></p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
