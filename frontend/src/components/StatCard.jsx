export default function StatCard({ icon: Icon, label, value, color = 'accent', subtitle }) {
    const colors = {
        accent: 'bg-accent/10 text-accent',
        success: 'bg-success/10 text-success',
        info: 'bg-info/10 text-info',
        danger: 'bg-danger/10 text-danger',
        warning: 'bg-warning/10 text-warning',
        primary: 'bg-primary/10 text-primary',
    };

    return (
        <div className="card flex items-center gap-5">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${colors[color] || colors.accent}`}>
                {Icon && <Icon size={28} />}
            </div>
            <div>
                <p className="text-3xl font-bold text-text-dark">{value}</p>
                <p className="text-base text-text-light font-medium">{label}</p>
                {subtitle && <p className="text-sm text-text-light">{subtitle}</p>}
            </div>
        </div>
    );
}
