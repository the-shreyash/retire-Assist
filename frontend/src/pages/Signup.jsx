import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiPhone, FiCreditCard, FiArrowRight, FiHash, FiShield } from 'react-icons/fi';

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

    const updateForm = (key, val) => setForm(prev => ({ ...prev, [key]: val }));
    const updateBank = (key, val) => setForm(prev => ({ ...prev, bankDetails: { ...prev.bankDetails, [key]: val } }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (step === 1) {
            if (form.password !== form.confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (form.password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
            setError('');
            setStep(2);
            return;
        }

        setError('');
        setLoading(true);
        try {
            await signup(form);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-bg flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-6 animate-fade-in">
                    <img src="/logo.png" alt="RetireAssist" className="w-14 h-14 mx-auto mb-2 rounded-xl" />
                    <h1 className="text-xl font-bold text-text-dark">Create Account</h1>
                    <p className="text-sm text-text-light">Step {step} of 2</p>
                </div>

                {/* Progress */}
                <div className="flex gap-2 mb-5">
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? 'bg-primary' : 'bg-border'}`} />
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? 'bg-primary' : 'bg-border'}`} />
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-border p-6 animate-fade-in">
                    {error && (
                        <div className="mb-4 p-3 bg-danger/5 border border-danger/20 rounded-xl text-danger text-sm text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                <h3 className="text-lg font-bold text-text-dark mb-3">Basic Information</h3>
                                <div>
                                    <label className="label-senior"><FiUser className="inline mr-1.5" size={14} />Full Name</label>
                                    <input type="text" className="input-senior" placeholder="Enter your full name" value={form.name} onChange={e => updateForm('name', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiMail className="inline mr-1.5" size={14} />Email</label>
                                    <input type="email" className="input-senior" placeholder="Enter your email" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiLock className="inline mr-1.5" size={14} />Password</label>
                                    <input type="password" className="input-senior" placeholder="Create a password (min 6 chars)" value={form.password} onChange={e => updateForm('password', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiLock className="inline mr-1.5" size={14} />Confirm Password</label>
                                    <input type="password" className="input-senior" placeholder="Confirm your password" value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} required />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3 className="text-lg font-bold text-text-dark mb-3">Pension & Bank Details</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="label-senior"><FiHash className="inline mr-1" size={14} />Age</label>
                                        <input type="number" className="input-senior" placeholder="Age" value={form.age} onChange={e => updateForm('age', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-senior"><FiPhone className="inline mr-1" size={14} />Phone</label>
                                        <input type="tel" className="input-senior" placeholder="Mobile" value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="label-senior">📋 Pension ID</label>
                                    <input type="text" className="input-senior" placeholder="e.g., PEN-2024-001234" value={form.pensionId} onChange={e => updateForm('pensionId', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-senior">🪪 Aadhaar Number</label>
                                    <input type="text" className="input-senior" placeholder="e.g., 1234 5678 9012" value={form.aadhaarNumber} onChange={e => updateForm('aadhaarNumber', e.target.value)} />
                                </div>
                                <div>
                                    <label className="label-senior">🏦 Bank Name</label>
                                    <input type="text" className="input-senior" placeholder="e.g., State Bank of India" value={form.bankDetails.bankName} onChange={e => updateBank('bankName', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="label-senior"><FiCreditCard className="inline mr-1" size={14} />Account No.</label>
                                        <input type="text" className="input-senior" placeholder="Account number" value={form.bankDetails.accountNumber} onChange={e => updateBank('accountNumber', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-senior">IFSC Code</label>
                                        <input type="text" className="input-senior" placeholder="e.g., SBIN0001234" value={form.bankDetails.ifsc} onChange={e => updateBank('ifsc', e.target.value)} />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3 pt-1">
                            {step === 2 && (
                                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                                    Back
                                </button>
                            )}
                            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                ) : step === 1 ? (
                                    <>Next <FiArrowRight size={18} /></>
                                ) : (
                                    <>Create Account <FiArrowRight size={18} /></>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Trust badge */}
                    <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-border">
                        <FiShield size={12} className="text-primary" />
                        <span className="text-xs text-text-light">Your data is encrypted and secure</span>
                    </div>

                    <p className="mt-3 text-center text-sm text-text-light">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-semibold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
