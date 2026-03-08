import { FiClock, FiCheckCircle, FiAlertTriangle, FiTrash2 } from 'react-icons/fi';

export default function ReminderCard({ reminder, onComplete, onDelete }) {
    const priorityColors = {
        high: 'border-l-danger',
        medium: 'border-l-warning',
        low: 'border-l-info',
    };

    const typeLabels = {
        life_certificate: '📋 Life Certificate',
        pension_verification: '💰 Pension Verification',
        insurance_renewal: '🏥 Insurance Renewal',
        bank_update: '🏦 Bank Update',
        custom: '📌 Custom',
    };

    const isOverdue = new Date(reminder.dueDate) < new Date() && reminder.status !== 'completed';
    const dueDate = new Date(reminder.dueDate).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    return (
        <div className={`card border-l-4 ${priorityColors[reminder.priority] || 'border-l-info'} ${reminder.status === 'completed' ? 'opacity-60' : ''}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm">{typeLabels[reminder.type] || '📌'}</span>
                        {isOverdue && <span className="badge-danger text-xs">⚠️ Overdue</span>}
                        {reminder.status === 'completed' && <span className="badge-success text-xs">✅ Done</span>}
                    </div>
                    <h3 className="text-xl font-bold text-text-dark">{reminder.title}</h3>
                    <p className="text-text-light text-base mt-1">{reminder.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-text-light">
                        <FiClock size={14} />
                        <span>Due: {dueDate}</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    {reminder.status !== 'completed' && (
                        <button onClick={() => onComplete?.(reminder._id)} className="btn-senior bg-success text-white px-5 py-3 text-base border-none">
                            <FiCheckCircle className="inline mr-1" size={18} /> Done
                        </button>
                    )}
                    <button onClick={() => onDelete?.(reminder._id)} className="btn-senior bg-danger/10 text-danger px-4 py-3 text-base border-none hover:bg-danger hover:text-white">
                        <FiTrash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}
