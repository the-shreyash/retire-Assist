import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiHome, FiMessageCircle, FiFileText, FiBell, FiBookOpen, FiShield, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

const navItems = [
    { to: '/dashboard', icon: FiHome, label: 'Dashboard' },
    { to: '/assistant', icon: FiMessageCircle, label: 'AI Assistant' },
    { to: '/documents', icon: FiFileText, label: 'Documents' },
    { to: '/reminders', icon: FiBell, label: 'Reminders' },
    { to: '/services', icon: FiBookOpen, label: 'Services' },
];

export default function Sidebar() {
    const { user } = useAuth();
    const [open, setOpen] = useState(false);

    const allItems = user?.role === 'admin'
        ? [...navItems, { to: '/admin', icon: FiShield, label: 'Admin Panel' }]
        : navItems;

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 z-50 md:hidden w-16 h-16 bg-accent text-white rounded-full shadow-2xl flex items-center justify-center text-2xl border-none cursor-pointer hover:bg-accent-dark transition-all"
            >
                {open ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>

            {/* Overlay */}
            {open && <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={() => setOpen(false)} />}

            {/* Sidebar */}
            <aside className={`fixed left-0 top-20 bottom-0 w-64 bg-white shadow-xl z-40 transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <nav className="p-4 space-y-2 mt-4">
                    {allItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-5 py-4 rounded-2xl text-lg font-medium transition-all no-underline ${isActive
                                    ? 'bg-accent text-white shadow-lg'
                                    : 'text-text hover:bg-bg hover:text-primary'
                                }`
                            }
                        >
                            <item.icon size={24} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Quick Help */}
                <div className="absolute bottom-6 left-4 right-4">
                    <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl p-5 text-white text-center">
                        <p className="text-lg font-bold mb-1">Need Help?</p>
                        <p className="text-sm text-blue-100 mb-3">Our AI assistant is ready</p>
                        <NavLink to="/assistant" onClick={() => setOpen(false)} className="inline-block bg-white text-primary px-6 py-2 rounded-xl font-semibold text-sm hover:bg-accent hover:text-white transition-all no-underline">
                            Ask Now
                        </NavLink>
                    </div>
                </div>
            </aside>
        </>
    );
}
