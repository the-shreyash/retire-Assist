import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiMessageCircle, FiFileText, FiBell, FiBookOpen, FiShield, FiHelpCircle } from 'react-icons/fi';

const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/assistant', icon: FiMessageCircle, label: 'AI Assistant' },
    { to: '/documents', icon: FiFileText, label: 'Documents' },
    { to: '/reminders', icon: FiBell, label: 'Reminders' },
    { to: '/services', icon: FiBookOpen, label: 'Services' },
];

export default function Sidebar({ open, onClose }) {
    const { user } = useAuth();

    const allItems = user?.role === 'admin'
        ? [...navItems, { to: '/admin', icon: FiShield, label: 'Admin Panel' }]
        : navItems;

    return (
        <>
            {/* Overlay for mobile */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/30 z-30 lg:hidden backdrop-blur-[2px]"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed left-0 top-16 bottom-0 w-60 bg-white border-r border-border z-40
                transition-transform duration-200 ease-in-out
                ${open ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                <nav className="p-3 mt-2 space-y-1">
                    {allItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.9375rem] font-medium transition-all no-underline ${isActive
                                    ? 'bg-primary/10 text-primary font-semibold'
                                    : 'text-text-light hover:bg-bg hover:text-text-dark'
                                }`
                            }
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Help Card */}
                <div className="absolute bottom-4 left-3 right-3">
                    <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
                        <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-2">
                            <FiHelpCircle size={20} />
                        </div>
                        <p className="text-sm font-semibold text-text-dark mb-0.5">Need Help?</p>
                        <p className="text-xs text-text-light mb-2">Our AI assistant is ready</p>
                        <NavLink
                            to="/assistant"
                            onClick={onClose}
                            className="inline-block bg-primary text-white px-4 py-1.5 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all no-underline"
                        >
                            Ask Now
                        </NavLink>
                    </div>
                </div>
            </aside>
        </>
    );
}
