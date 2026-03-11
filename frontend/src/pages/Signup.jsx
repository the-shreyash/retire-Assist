import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Phone, CreditCard, ArrowRight, Hash, Shield, CheckCircle } from 'lucide-react';

export default function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        age: '', pensionId: '', aadhaarNumber: '', phone: '',
        bankDetails: { accountNumber: '', ifsc: '', bankName: '' }
    });

    const updateForm = (k, v) => setForm(p => ({ ...p, [k]: v }));
    const updateBank = (k, v) => setForm(p => ({ ...p, bankDetails: { ...p.bankDetails, [k]: v } }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (form.password !== form.confirmPassword) { setError('Passwords do not match'); return; }
            if (form.password.length < 6) { setError('Password must be at least 6 characters'); return; }
            setError(''); setStep(2); return;
        }
        setError(''); setLoading(true);
        try { await signup(form); navigate('/dashboard'); }
        catch (err) { setError(err.response?.data?.message || 'Signup failed'); }
        finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-lg">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Shield size={24} className="text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-text-dark">Create Account</h1>
                    <p className="text-sm text-text-muted">Step {step} of 2</p>
                </div>
                <div className="flex gap-2 mb-5">
                    <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-border'}`} />
                    <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-primary to-secondary' : 'bg-border'}`} />
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
                    {error && <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg text-danger text-sm text-center font-medium">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                <h3 className="text-lg font-bold text-text-dark">Basic Information</h3>
                                <div><label className="label"><User className="inline mr-1" size={13} />Full Name</label><input className="input" placeholder="Enter your full name" value={form.name} onChange={e => updateForm('name', e.target.value)} required /></div>
                                <div><label className="label"><Mail className="inline mr-1" size={13} />Email</label><input type="email" className="input" placeholder="Enter your email" value={form.email} onChange={e => updateForm('email', e.target.value)} required /></div>
                                <div><label className="label"><Lock className="inline mr-1" size={13} />Password</label><input type="password" className="input" placeholder="Create a password (min 6 chars)" value={form.password} onChange={e => updateForm('password', e.target.value)} required /></div>
                                <div><label className="label"><Lock className="inline mr-1" size={13} />Confirm Password</label><input type="password" className="input" placeholder="Confirm your password" value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} required /></div>
                            </>
                        )}
                        {step === 2 && (
                            <>
                                <h3 className="text-lg font-bold text-text-dark">Pension & Bank Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="label"><Hash className="inline mr-1" size={13} />Age</label><input type="number" className="input" placeholder="Age" value={form.age} onChange={e => updateForm('age', e.target.value)} /></div>
                                    <div><label className="label"><Phone className="inline mr-1" size={13} />Phone</label><input type="tel" className="input" placeholder="Mobile" value={form.phone} onChange={e => updateForm('phone', e.target.value)} /></div>
                                </div>
                                <div><label className="label">📋 Pension ID</label><input className="input" placeholder="e.g., PEN-2024-001234" value={form.pensionId} onChange={e => updateForm('pensionId', e.target.value)} /></div>
                                <div><label className="label">🪪 Aadhaar Number</label><input className="input" placeholder="e.g., 1234 5678 9012" value={form.aadhaarNumber} onChange={e => updateForm('aadhaarNumber', e.target.value)} /></div>
                                <div><label className="label">🏦 Bank Name</label><input className="input" placeholder="e.g., State Bank of India" value={form.bankDetails.bankName} onChange={e => updateBank('bankName', e.target.value)} /></div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="label"><CreditCard className="inline mr-1" size={13} />Account No.</label><input className="input" placeholder="Account number" value={form.bankDetails.accountNumber} onChange={e => updateBank('accountNumber', e.target.value)} /></div>
                                    <div><label className="label">IFSC Code</label><input className="input" placeholder="e.g., SBIN0001234" value={form.bankDetails.ifsc} onChange={e => updateBank('ifsc', e.target.value)} /></div>
                                </div>
                            </>
                        )}
                        <div className="flex gap-3 pt-1">
                            {step === 2 && <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">Back</button>}
                            <button type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-50">
                                {loading ? <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : step === 1 ? <>Next <ArrowRight size={16} /></> : <>Create Account <ArrowRight size={16} /></>}
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-border">
                        <Shield size={12} className="text-accent" /><span className="text-xs text-text-muted">Your data is encrypted and secure</span>
                    </div>
                    <p className="mt-3 text-center text-sm text-text-light">Already have an account? <Link to="/login" className="text-primary-light font-semibold hover:underline">Sign In</Link></p>
                </div>
            </motion.div>
        </div>
    );
}
