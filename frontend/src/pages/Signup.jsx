import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiUser, FiMail, FiLock, FiPhone, FiCreditCard, FiArrowRight, FiHash } from 'react-icons/fi';

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
        <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-primary-light flex items-center justify-center p-4">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <div className="text-center mb-6 animate-fade-in">
                    <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-2xl mb-3">
                        R
                    </div>
                    <h1 className="text-3xl font-bold text-white">Create Account</h1>
                    <p className="text-lg text-blue-200">Step {step} of 2</p>
                </div>

                {/* Progress */}
                <div className="flex gap-2 mb-6">
                    <div className={`h-2 flex-1 rounded-full ${step >= 1 ? 'bg-accent' : 'bg-white/30'}`} />
                    <div className={`h-2 flex-1 rounded-full ${step >= 2 ? 'bg-accent' : 'bg-white/30'}`} />
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 animate-fade-in">
                    {error && (
                        <div className="mb-4 p-4 bg-danger/10 border border-danger/30 rounded-2xl text-danger text-center font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {step === 1 && (
                            <>
                                <h3 className="text-xl font-bold text-primary-dark mb-4">Basic Information</h3>
                                <div>
                                    <label className="label-senior"><FiUser className="inline mr-2" size={16} />Full Name</label>
                                    <input type="text" className="input-senior" placeholder="Enter your full name" value={form.name} onChange={e => updateForm('name', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiMail className="inline mr-2" size={16} />Email</label>
                                    <input type="email" className="input-senior" placeholder="Enter your email" value={form.email} onChange={e => updateForm('email', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiLock className="inline mr-2" size={16} />Password</label>
                                    <input type="password" className="input-senior" placeholder="Create a password (min 6 chars)" value={form.password} onChange={e => updateForm('password', e.target.value)} required />
                                </div>
                                <div>
                                    <label className="label-senior"><FiLock className="inline mr-2" size={16} />Confirm Password</label>
                                    <input type="password" className="input-senior" placeholder="Confirm your password" value={form.confirmPassword} onChange={e => updateForm('confirmPassword', e.target.value)} required />
                                </div>
                            </>
                        )}

                        {step === 2 && (
                            <>
                                <h3 className="text-xl font-bold text-primary-dark mb-4">Pension & Bank Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-senior"><FiHash className="inline mr-2" size={16} />Age</label>
                                        <input type="number" className="input-senior" placeholder="Your age" value={form.age} onChange={e => updateForm('age', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-senior"><FiPhone className="inline mr-2" size={16} />Phone</label>
                                        <input type="tel" className="input-senior" placeholder="Mobile number" value={form.phone} onChange={e => updateForm('phone', e.target.value)} />
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
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="label-senior"><FiCreditCard className="inline mr-2" size={16} />Account No.</label>
                                        <input type="text" className="input-senior" placeholder="Account number" value={form.bankDetails.accountNumber} onChange={e => updateBank('accountNumber', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="label-senior">IFSC Code</label>
                                        <input type="text" className="input-senior" placeholder="e.g., SBIN0001234" value={form.bankDetails.ifsc} onChange={e => updateBank('ifsc', e.target.value)} />
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex gap-3 pt-2">
                            {step === 2 && (
                                <button type="button" onClick={() => setStep(1)} className="btn-outline flex-1">
                                    Back
                                </button>
                            )}
                            <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50">
                                {loading ? (
                                    <span className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                ) : step === 1 ? (
                                    <>Next <FiArrowRight size={20} /></>
                                ) : (
                                    <>Create Account <FiArrowRight size={20} /></>
                                )}
                            </button>
                        </div>
                    </form>

                    <p className="mt-5 text-center text-lg text-text-light">
                        Already have an account?{' '}
                        <Link to="/login" className="text-accent font-bold hover:underline">Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
