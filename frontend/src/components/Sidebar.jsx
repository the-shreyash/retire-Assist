import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, FileText, Bot, Bell, BookOpen, Shield, User, LogOut, Send, FolderOpen, X } from 'lucide-react';

const navItems = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/requests', icon: Send, label: 'My Requests' },
    { to: '/services', icon: BookOpen, label: 'Services' },
    { to: '/documents', icon: FolderOpen, label: 'Document Vault' },
    { to: '/assistant', icon: Bot, label: 'AI Assistant' },
    { to: '/notifications', icon: Bell, label: 'Notifications' },
    { to: '/profile', icon: User, label: 'Profile' },
];

export default function Sidebar({ open, onClose }) {
    const { user, logout } = useAuth();

    const allItems = user?.role === 'admin'
        ? [...navItems, { to: '/admin', icon: Shield, label: 'Admin Panel' }]
        : navItems;

    return (
        <>
            {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-[2px]" onClick={onClose} />}

            <aside className={`
                fixed left-0 top-0 bottom-0 w-64 bg-bg-sidebar z-40
                transition-transform duration-200 ease-in-out flex flex-col
                ${open ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0
            `}>
                {/* Logo */}
                <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-light to-accent rounded-lg flex items-center justify-center">
                            <Shield size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-white leading-tight">RetireAssist</h1>
                            <p className="text-[10px] text-gray-500 leading-tight">Secure Pension Platform</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white cursor-pointer bg-transparent border-none">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
                    {allItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all no-underline ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                                }`
                            }
                        >
                            <item.icon size={18} />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* User Info */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary-light to-accent rounded-full flex items-center justify-center">
                            <User size={16} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name || 'User'}</p>
                            <p className="text-[11px] text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button onClick={logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-all cursor-pointer border-none bg-transparent font-medium">
                        <LogOut size={16} /> Sign Out
                    </button>
                </div>
            </aside>
        </>
    );
}
