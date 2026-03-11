import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import { FiDollarSign, FiFileText, FiBell, FiCheckCircle, FiCalendar, FiTrendingUp, FiMessageCircle, FiArrowRight, FiShield } from 'react-icons/fi';

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
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="space-y-5">
            {/* Welcome Banner */}
            <div className="bg-white rounded-xl border border-border p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-text-dark mb-0.5">
                            🙏 {greeting}, {user?.name?.split(' ')[0] || 'User'}!
                        </h1>
                        <p className="text-sm text-text-light">Here's your retirement dashboard overview</p>
                    </div>
                    <span className="trust-badge hidden sm:inline-flex">
                        <FiShield size={12} /> All data secured
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Pension Details */}
                <div className="card">
                    <h2 className="heading-section flex items-center gap-2">
                        <FiTrendingUp className="text-primary" size={18} /> Pension Details
                    </h2>
                    <div className="space-y-0">
                        {[
                            ['Pension ID', pension?.pensionId || 'PEN-XXXXX', 'text-text-dark'],
                            ['Pension Type', pension?.pensionType || 'Government Pension', ''],
                            ['Last Payment', pension?.lastPaymentDate || 'N/A', 'text-success'],
                            ['Next Payment', pension?.nextPaymentDate || 'N/A', 'text-primary'],
                            ['Bank', `${pension?.bankName || 'N/A'} (${pension?.bankAccount || 'XXXX'})`, ''],
                        ].map(([label, value, cls], i) => (
                            <div key={i} className={`flex justify-between items-center py-2.5 ${i < 4 ? 'border-b border-border/50' : ''}`}>
                                <span className="text-sm text-text-light">{label}</span>
                                <span className={`text-sm font-semibold ${cls}`}>{value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Tasks */}
                <div className="card">
                    <h2 className="heading-section flex items-center gap-2">
                        <FiBell className="text-warning" size={18} /> Upcoming Tasks
                    </h2>
                    {pendingReminders.length === 0 ? (
                        <div className="text-center py-6">
                            <p className="text-3xl mb-2">🎉</p>
                            <p className="text-sm text-text-light">No pending tasks!</p>
                        </div>
                    ) : (
                        <div className="space-y-2">
                            {pendingReminders.slice(0, 4).map(r => (
                                <div key={r._id} className="flex items-center gap-3 p-3 bg-bg rounded-lg">
                                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${r.priority === 'high' ? 'bg-danger' : r.priority === 'medium' ? 'bg-warning' : 'bg-info'}`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-text-dark truncate">{r.title}</p>
                                        <p className="text-xs text-text-light flex items-center gap-1">
                                            <FiCalendar size={10} />
                                            {new Date(r.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                        </p>
                                    </div>
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${r.priority === 'high' ? 'bg-danger/10 text-danger' : 'bg-warning/10 text-warning'}`}>
                                        {r.priority}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                    <Link to="/reminders" className="mt-3 btn-outline w-full flex items-center justify-center gap-2 no-underline text-sm py-2 min-h-[40px]">
                        View All Reminders <FiArrowRight size={14} />
                    </Link>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h2 className="heading-section">⚡ Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {[
                        { to: '/assistant', icon: FiMessageCircle, label: 'AI Assistant', desc: 'Ask questions', color: 'text-primary bg-primary/5' },
                        { to: '/documents', icon: FiFileText, label: 'Upload Document', desc: 'Add new docs', color: 'text-info bg-info/5' },
                        { to: '/services', icon: FiCheckCircle, label: 'Services Guide', desc: 'Step-by-step help', color: 'text-success bg-success/5' },
                        { to: '/reminders', icon: FiBell, label: 'Set Reminder', desc: 'Never miss a deadline', color: 'text-warning bg-warning/5' },
                    ].map(item => (
                        <Link key={item.to} to={item.to} className={`flex items-center gap-3 p-4 rounded-xl hover:shadow-sm transition-all no-underline ${item.color}`}>
                            <item.icon size={22} />
                            <div>
                                <p className="font-semibold text-sm text-text-dark">{item.label}</p>
                                <p className="text-xs text-text-light">{item.desc}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
