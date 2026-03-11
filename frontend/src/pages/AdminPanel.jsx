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
            <div className="card text-center py-10">
                <p className="text-3xl mb-3">🔒</p>
                <h2 className="text-lg font-bold text-text-dark">Access Denied</h2>
                <p className="text-sm text-text-light">You need admin privileges to access this panel.</p>
            </div>
        );
    }

    if (loading) return (
        <div className="flex justify-center py-16">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin"></div>
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
            <div className="mb-4">
                <h1 className="heading-page flex items-center gap-2">
                    <span className="text-2xl">🛡️</span> Admin Panel
                </h1>
                <p className="text-text-light text-sm">Manage users, documents, and platform activity</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border cursor-pointer whitespace-nowrap ${activeTab === tab.id
                            ? 'bg-primary text-white border-primary'
                            : 'bg-white text-text-light border-border hover:border-primary/30'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Overview */}
            {activeTab === 'overview' && (
                <div className="space-y-4 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        <StatCard icon={FiUsers} label="Total Users" value={stats?.totalUsers || 0} color="primary" />
                        <StatCard icon={FiFileText} label="Documents" value={stats?.totalDocuments || 0} color="info" />
                        <StatCard icon={FiBell} label="Pending Reminders" value={stats?.pendingReminders || 0} color="warning" />
                        <StatCard icon={FiActivity} label="Active Users" value={stats?.activeUsers || 0} color="success" />
                    </div>
                    <div className="card">
                        <h3 className="text-base font-bold text-text-dark mb-3">📈 Platform Health</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 bg-success/5 rounded-lg text-center">
                                <p className="text-lg font-bold text-success">{stats?.platformHealth || 'Good'}</p>
                                <p className="text-xs text-text-light">System Status</p>
                            </div>
                            <div className="p-3 bg-info/5 rounded-lg text-center">
                                <p className="text-lg font-bold text-info">{stats?.totalDocuments || 0}</p>
                                <p className="text-xs text-text-light">Total Files</p>
                            </div>
                            <div className="p-3 bg-primary/5 rounded-lg text-center">
                                <p className="text-lg font-bold text-primary">{new Date(stats?.lastUpdated).toLocaleDateString('en-IN')}</p>
                                <p className="text-xs text-text-light">Last Updated</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
                <div className="animate-fade-in">
                    <div className="mb-3">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={16} />
                            <input
                                type="text"
                                className="input-senior pl-10"
                                placeholder="Search users by name or email..."
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="card overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Name</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Email</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Pension ID</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Status</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map(u => (
                                    <tr key={u._id} className="border-b border-border/50 hover:bg-bg transition-all">
                                        <td className="py-3 px-3 text-sm font-semibold">{u.name}</td>
                                        <td className="py-3 px-3 text-sm text-text-light">{u.email}</td>
                                        <td className="py-3 px-3 text-sm">{u.pensionId || '—'}</td>
                                        <td className="py-3 px-3">
                                            <span className={u.pensionStatus === 'active' ? 'badge-success' : 'badge-warning'}>
                                                {u.pensionStatus || 'N/A'}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-sm">{u.age || '—'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredUsers.length === 0 && (
                            <p className="text-center text-text-light text-sm py-6">No users found</p>
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
                                <tr className="border-b border-border">
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">User</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Type</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">File</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Status</th>
                                    <th className="py-3 px-3 text-xs font-bold text-text-light uppercase">Uploaded</th>
                                </tr>
                            </thead>
                            <tbody>
                                {documents.map(d => (
                                    <tr key={d._id} className="border-b border-border/50 hover:bg-bg transition-all">
                                        <td className="py-3 px-3 text-sm font-semibold">{d.userId?.name || 'Unknown'}</td>
                                        <td className="py-3 px-3 text-sm">{d.documentType}</td>
                                        <td className="py-3 px-3 text-sm text-text-light">{d.fileName}</td>
                                        <td className="py-3 px-3">
                                            <span className={d.status === 'verified' ? 'badge-success' : 'badge-warning'}>
                                                {d.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-3 text-sm text-text-light">
                                            {new Date(d.uploadedAt).toLocaleDateString('en-IN')}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {documents.length === 0 && (
                            <p className="text-center text-text-light text-sm py-6">No documents found</p>
                        )}
                    </div>
                </div>
            )}

            {/* Announcements */}
            {activeTab === 'announcements' && (
                <div className="card animate-fade-in">
                    <h3 className="text-base font-bold text-text-dark mb-3">📢 Send Announcement</h3>
                    {announcementSent && (
                        <div className="mb-3 p-3 bg-success/5 border border-success/20 rounded-lg text-success text-sm font-medium">
                            ✅ Announcement sent successfully to all users!
                        </div>
                    )}
                    <form onSubmit={sendAnnouncement} className="space-y-3">
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
                                className="input-senior min-h-[120px]"
                                placeholder="Type your announcement message..."
                                value={announcement.message}
                                onChange={e => setAnnouncement({ ...announcement, message: e.target.value })}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-primary flex items-center gap-2 text-sm">
                            <FiSend size={16} /> Send to All Users
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
