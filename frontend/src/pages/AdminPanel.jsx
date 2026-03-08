import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatCard from '../components/StatCard';
import { FiUsers, FiFileText, FiBell, FiActivity, FiSend, FiSearch } from 'react-icons/fi';

export default function AdminPanel() {
    const { API, user } = useAuth();
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [announcement, setAnnouncement] = useState({ title: '', message: '' });
    const [announcementSent, setAnnouncementSent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (user?.role !== 'admin') return;
        Promise.all([
            API.get('/admin/stats').catch(() => ({ data: null })),
            API.get('/admin/users').catch(() => ({ data: [] })),
            API.get('/admin/documents').catch(() => ({ data: [] })),
        ]).then(([s, u, d]) => {
            setStats(s.data);
            setUsers(u.data || []);
            setDocuments(d.data || []);
        }).finally(() => setLoading(false));
    }, []);

    const sendAnnouncement = async (e) => {
        e.preventDefault();
        try {
            await API.post('/admin/announcements', announcement);
            setAnnouncementSent(true);
            setAnnouncement({ title: '', message: '' });
            setTimeout(() => setAnnouncementSent(false), 3000);
        } catch { }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="card text-center py-12">
                <p className="text-5xl mb-4">🔒</p>
                <h2 className="text-2xl font-bold text-text-dark">Access Denied</h2>
                <p className="text-lg text-text-light">You need admin privileges to access this panel.</p>
            </div>
        );
    }

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
    );

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const tabs = [
        { id: 'overview', label: '📊 Overview' },
        { id: 'users', label: '👥 Users' },
        { id: 'documents', label: '📄 Documents' },
        { id: 'announcements', label: '📢 Announcements' },
    ];

    return (
        <div>
            <div className="mb-6">
                <h1 className="heading-page flex items-center gap-3">
                    <span className="text-3xl">🛡️</span> Admin Panel
                </h1>
                <p className="text-text-light text-lg">Manage users, documents, and platform activity</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-6 py-3 rounded-2xl text-base font-semibold transition-all border-none cursor-pointer whitespace-nowrap ${activeTab === tab.id ? 'bg-primary text-white shadow-lg' : 'bg-white text-text hover:bg-bg'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard icon={FiUsers} label="Total Users" value={stats?.totalUsers || 0} color="primary" />
                        <StatCard icon={FiFileText} label="Documents" value={stats?.totalDocuments || 0} color="info" />
                        <StatCard icon={FiBell} label="Pending Reminders" value={stats?.pendingReminders || 0} color="warning" />
                        <StatCard icon={FiActivity} label="Active Users" value={stats?.activeUsers || 0} color="success" />
                    </div>
                    <div className="card">
                        <h3 className="text-xl font-bold text-primary mb-4">📈 Platform Health</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="p-4 bg-success/10 rounded-2xl text-center">
                                <p className="text-2xl font-bold text-success">{stats?.platformHealth || 'Good'}</p>
                                <p className="text-sm text-text-light">System Status</p>
                            </div>
                            <div className="p-4 bg-info/10 rounded-2xl text-center">
                                <p className="text-2xl font-bold text-info">{stats?.totalDocuments || 0}</p>
                                <p className="text-sm text-text-light">Total Files</p>
                            </div>
                            <div className="p-4 bg-accent/10 rounded-2xl text-center">
                                <p className="text-2xl font-bold text-accent">{new Date(stats?.lastUpdated).toLocaleDateString('en-IN')}</p>
                                <p className="text-sm text-text-light">Last Updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
                <div className="animate-fade-in">
                    <div className="mb-4">
                        <div className="relative">
                            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-light" size={20} />
                            <input
                                type="text"
                                className="input-senior pl-12"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="card overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-border">
                                    <th className="py-4 px-3 text-base font-bold text-primary">Name</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Email</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Pension ID</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Status</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => (
                                    <tr key={u._id} className="border-b border-border/50 hover:bg-bg transition-all">
                                        <td className="py-4 px-3 font-semibold">{u.name}</td>
                                        <td className="py-4 px-3 text-text-light">{u.email}</td>
                                        <td className="py-4 px-3">{u.pensionId || '—'}</td>
                                        <td className="py-4 px-3">
                                            <span className={u.pensionStatus === 'active' ? 'badge-success' : 'badge-warning'}>
                                                {u.pensionStatus || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-4 px-3">{u.age || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <p className="text-center text-text-light py-8">No users found</p>
                        )}
                    </div>
                </div>
            )}

            {/* Documents */}
            {activeTab === 'documents' && (
                <div className="animate-fade-in">
                    <div className="card overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-border">
                                    <th className="py-4 px-3 text-base font-bold text-primary">User</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Type</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">File</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Status</th>
                                    <th className="py-4 px-3 text-base font-bold text-primary">Uploaded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(d => (
                                    <tr key={d._id} className="border-b border-border/50 hover:bg-bg transition-all">
                                        <td className="py-4 px-3 font-semibold">{d.userId?.name || 'Unknown'}</td>
                                        <td className="py-4 px-3">{d.documentType}</td>
                                        <td className="py-4 px-3 text-text-light">{d.fileName}</td>
                                        <td className="py-4 px-3">
                                            <span className={d.status === 'verified' ? 'badge-success' : 'badge-warning'}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-3 text-text-light">
                                            {new Date(d.uploadedAt).toLocaleDateString('en-IN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {documents.length === 0 && (
                            <p className="text-center text-text-light py-8">No documents found</p>
                        )}
                    </div>
                </div>
            )}

            {/* Announcements */}
            {activeTab === 'announcements' && (
                <div className="card animate-fade-in">
                    <h3 className="text-xl font-bold text-primary mb-4">📢 Send Announcement</h3>
                    {announcementSent && (
                        <div className="mb-4 p-4 bg-success/10 border border-success/30 rounded-2xl text-success font-semibold">
                            ✅ Announcement sent successfully to all users!
                        </div>
                    )}
                    <form onSubmit={sendAnnouncement} className="space-y-4">
                        <div>
                            <label className="label-senior">Title</label>
                            <input
                                type="text"
                                className="input-senior"
                                placeholder="Announcement title..."
                                value={announcement.title}
                                onChange={e => setAnnouncement({ ...announcement, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="label-senior">Message</label>
                            <textarea
                                className="input-senior min-h-[150px]"
                                placeholder="Type your announcement message..."
                                value={announcement.message}
                                onChange={e => setAnnouncement({ ...announcement, message: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary flex items-center gap-2">
                            <FiSend size={20} /> Send to All Users
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
