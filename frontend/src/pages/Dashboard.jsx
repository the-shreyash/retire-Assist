import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { FiDollarSign, FiFileText, FiBell, FiCheckCircle, FiCalendar, FiTrendingUp, FiMessageCircle, FiArrowRight } from 'react-icons/fi';

export default function Dashboard() {
    const { user, API } = useAuth();
    const [pension, setPension] = useState(null);
    const [reminders, setReminders] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            API.get('/pension/status').catch(() => ({ data: null })),
            API.get('/reminders').catch(() => ({ data: [] })),
            API.get('/documents').catch(() => ({ data: [] })),
        ]).then(([p, r, d]) => {
            setPension(p.data);
            setReminders(r.data || []);
            setDocuments(d.data || []);
        }).finally(() => setLoading(false));
    }, []);

    const pendingReminders = reminders.filter(r => r.status === 'pending');
    const greeting = new Date().getHours() < 12 ? 'Good Morning' : new Date().getHours() < 17 ? 'Good Afternoon' : 'Good Evening';

    if (loading) return (
        <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary via-primary-light to-accent rounded-3xl p-8 text-white shadow-xl">
                <h1 className="text-3xl font-bold mb-1">🙏 {greeting}, {user?.name?.split(' ')[0] || 'User'}!</h1>
                <p className="text-lg text-blue-100">Here's your retirement dashboard overview</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={FiDollarSign}
                    label="Monthly Pension"
                    value={pension ? `₹${pension.monthlyAmount?.toLocaleString('en-IN')}` : '₹25,000'}
                    color="success"
                    subtitle="Active"
                />
                <StatCard
                    icon={FiFileText}
                    label="Documents"
                    value={documents.length}
                    color="info"
                    subtitle="Uploaded"
                />
                <StatCard
                    icon={FiBell}
                    label="Reminders"
                    value={pendingReminders.length}
                    color="warning"
                    subtitle="Pending"
                />
                <StatCard
                    icon={FiCheckCircle}
                    label="Pension Status"
                    value={pension?.status === 'active' ? '✅ Active' : '⏳ Pending'}
                    color="primary"
                />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pension Details */}
                <div className="card">
                    <h2 className="heading-section flex items-center gap-2">
                        <FiTrendingUp className="text-accent" /> Pension Details
                    </h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="text-text-light text-base">Pension ID</span>
                            <span className="font-bold text-lg">{pension?.pensionId || 'PEN-XXXXX'}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="text-text-light text-base">Pension Type</span>
                            <span className="font-bold">{pension?.pensionType || 'Government Pension'}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="text-text-light text-base">Last Payment</span>
                            <span className="font-bold text-success">{pension?.lastPaymentDate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-3 border-b border-border">
                            <span className="text-text-light text-base">Next Payment</span>
                            <span className="font-bold text-accent">{pension?.nextPaymentDate || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                            <span className="text-text-light text-base">Bank</span>
                            <span className="font-bold">{pension?.bankName || 'N/A'} ({pension?.bankAccount || 'XXXX'})</span>
                        </div>
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="card">
                    <h2 className="heading-section flex items-center gap-2">
                        <FiBell className="text-warning" /> Upcoming Tasks
                    </h2>
                    {pendingReminders.length === 0 ? (
                        <div className="text-center py-8">
                            <p className="text-5xl mb-3">🎉</p>
                            <p className="text-xl text-text-light">No pending tasks!</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {pendingReminders.slice(0, 4).map(r => (
                                <div key={r._id} className="flex items-center gap-4 p-4 bg-bg rounded-2xl">
                                    <div className={`w-3 h-3 rounded-full ${r.priority === 'high' ? 'bg-danger' : r.priority === 'medium' ? 'bg-warning' : 'bg-info'}`} />
                                    <div className="flex-1">
                                        <p className="font-semibold text-text-dark">{r.title}</p>
                                        <p className="text-sm text-text-light flex items-center gap-1">
                                            <FiCalendar size={12} />
                                            {new Date(r.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${r.priority === 'high' ? 'bg-danger/15 text-danger' : 'bg-warning/15 text-warning'}`}>
                                        {r.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to="/reminders" className="mt-4 btn-outline w-full flex items-center justify-center gap-2 no-underline">
                        View All Reminders <FiArrowRight />
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="heading-section">⚡ Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/assistant" className="flex items-center gap-4 p-5 bg-accent/10 rounded-2xl hover:bg-accent/20 transition-all no-underline text-text-dark">
                        <FiMessageCircle size={28} className="text-accent" />
                        <div>
                            <p className="font-bold text-lg">AI Assistant</p>
                            <p className="text-sm text-text-light">Ask questions</p>
                        </div>
                    </Link>
                    <Link to="/documents" className="flex items-center gap-4 p-5 bg-info/10 rounded-2xl hover:bg-info/20 transition-all no-underline text-text-dark">
                        <FiFileText size={28} className="text-info" />
                        <div>
                            <p className="font-bold text-lg">Upload Document</p>
                            <p className="text-sm text-text-light">Add new docs</p>
                        </div>
                    </Link>
                    <Link to="/services" className="flex items-center gap-4 p-5 bg-success/10 rounded-2xl hover:bg-success/20 transition-all no-underline text-text-dark">
                        <FiCheckCircle size={28} className="text-success" />
                        <div>
                            <p className="font-bold text-lg">Services Guide</p>
                            <p className="text-sm text-text-light">Step-by-step help</p>
                        </div>
                    </Link>
                    <Link to="/reminders" className="flex items-center gap-4 p-5 bg-warning/10 rounded-2xl hover:bg-warning/20 transition-all no-underline text-text-dark">
                        <FiBell size={28} className="text-warning" />
                        <div>
                            <p className="font-bold text-lg">Set Reminder</p>
                            <p className="text-sm text-text-light">Never miss a deadline</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
