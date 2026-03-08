import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ReminderCard from '../components/ReminderCard';
import { FiPlus, FiX, FiCalendar } from 'react-icons/fi';

export default function Reminders() {
    const { API } = useAuth();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [filter, setFilter] = useState('all');
    const [form, setForm] = useState({
        title: '', description: '', dueDate: '', type: 'custom', priority: 'medium'
    });

    const fetchReminders = async () => {
        try {
            const res = await API.get('/reminders');
            setReminders(res.data || []);
        } catch { }
        setLoading(false);
    };

    useEffect(() => { fetchReminders(); }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await API.post('/reminders', form);
            setForm({ title: '', description: '', dueDate: '', type: 'custom', priority: 'medium' });
            setShowForm(false);
            fetchReminders();
        } catch { }
    };

    const handleComplete = async (id) => {
        try {
            await API.put(`/reminders/${id}`, { status: 'completed' });
            fetchReminders();
        } catch { }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this reminder?')) return;
        try {
            await API.delete(`/reminders/${id}`);
            fetchReminders();
        } catch { }
    };

    const filtered = filter === 'all'
        ? reminders
        : filter === 'pending'
            ? reminders.filter(r => r.status === 'pending')
            : reminders.filter(r => r.status === 'completed');

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="heading-page flex items-center gap-3">
                        <span className="text-3xl">🔔</span> Smart Reminders
                    </h1>
                    <p className="text-text-light text-lg">Never miss important pension deadlines</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2">
                    {showForm ? <><FiX size={20} /> Cancel</> : <><FiPlus size={20} /> Add Reminder</>}
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="card mb-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-primary mb-4">📌 New Reminder</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div>
                            <label className="label-senior">Title</label>
                            <input type="text" className="input-senior" placeholder="e.g., Submit Life Certificate" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
                        </div>
                        <div>
                            <label className="label-senior">Description</label>
                            <textarea className="input-senior min-h-[100px]" placeholder="Add details..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="label-senior"><FiCalendar className="inline mr-1" size={16} /> Due Date</label>
                                <input type="date" className="input-senior" value={form.dueDate} onChange={e => setForm({ ...form, dueDate: e.target.value })} required />
                            </div>
                            <div>
                                <label className="label-senior">Type</label>
                                <select className="input-senior" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                    <option value="life_certificate">Life Certificate</option>
                                    <option value="pension_verification">Pension Verification</option>
                                    <option value="insurance_renewal">Insurance Renewal</option>
                                    <option value="bank_update">Bank Update</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div>
                                <label className="label-senior">Priority</label>
                                <select className="input-senior" value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                                    <option value="high">🔴 High</option>
                                    <option value="medium">🟡 Medium</option>
                                    <option value="low">🟢 Low</option>
                                </select>
                            </div>
                        </div>
                        <button type="submit" className="btn-primary w-full">Create Reminder</button>
                    </form>
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-3 mb-6">
                {['all', 'pending', 'completed'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-3 rounded-2xl text-base font-semibold transition-all border-none cursor-pointer ${filter === f ? 'bg-accent text-white shadow-lg' : 'bg-white text-text hover:bg-bg'
                            }`}
                    >
                        {f === 'all' ? '📋 All' : f === 'pending' ? '⏳ Pending' : '✅ Done'} ({
                            f === 'all' ? reminders.length : f === 'pending' ? reminders.filter(r => r.status === 'pending').length : reminders.filter(r => r.status === 'completed').length
                        })
                    </button>
                ))}
            </div>

            {/* Reminders List */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="card text-center py-12">
                    <p className="text-5xl mb-4">🎉</p>
                    <h3 className="text-2xl font-bold text-text-dark mb-2">
                        {filter === 'completed' ? 'No completed reminders' : 'No reminders yet'}
                    </h3>
                    <p className="text-lg text-text-light">
                        {filter === 'pending' ? 'All tasks are completed!' : 'Create your first reminder to stay on track'}
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filtered.map(r => (
                        <ReminderCard
                            key={r._id}
                            reminder={r}
                            onComplete={handleComplete}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
