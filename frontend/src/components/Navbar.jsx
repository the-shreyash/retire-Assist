import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiBell, FiUser, FiMenu, FiX, FiShield } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar({ sidebarOpen, onToggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border h-16">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
                {/* Left: Menu + Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="w-10 h-10 rounded-lg flex items-center justify-center text-text-light hover:bg-bg hover:text-primary transition-all cursor-pointer border-none bg-transparent"
                        aria-label="Toggle menu"
                    >
                        {sidebarOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                    </button>

                    <Link to="/dashboard" className="flex items-center gap-2.5 no-underline">
                        <img src="/logo.png" alt="RetireAssist" className="w-9 h-9 rounded-lg" />
                        <div>
                            <h1 className="text-lg font-bold text-text-dark leading-tight">RetireAssist</h1>
                            <p className="text-[11px] text-text-light hidden sm:block leading-tight">Your Retirement Companion</p>
                        </div>
                    </Link>

                    <span className="trust-badge hidden sm:inline-flex ml-2">
                        <FiShield size={12} /> Secured
                    </span>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-2">
                    {/* Notification Bell */}
                    <button
                        onClick={() => navigate('/reminders')}
                        className="relative w-10 h-10 rounded-lg flex items-center justify-center text-text-light hover:bg-bg hover:text-primary transition-all cursor-pointer border-none bg-transparent"
                    >
                        <FiBell size={20} />
                        <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
                    </button>

                    {/* User Info */}
                    <div className="relative">
                        <button
                            onClick={() => setShowProfile(!showProfile)}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-bg transition-all cursor-pointer border-none bg-transparent"
                        >
                            <div className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                                <FiUser size={16} />
                            </div>
                            <span className="text-sm font-semibold text-text-dark hidden md:block">
                                {user?.name?.split(' ')[0] || 'User'}
                            </span>
                        </button>

                        {showProfile && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-lg border border-border p-3 z-50 animate-slide-down">
                                    <div className="pb-3 mb-3 border-b border-border">
                                        <p className="font-semibold text-text-dark">{user?.name || 'User'}</p>
                                        <p className="text-xs text-text-light">{user?.email}</p>
                                        <span className="text-[11px] text-primary font-medium">
                                            {user?.role === 'admin' ? '🛡️ Administrator' : '👤 Pensioner'}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger rounded-lg hover:bg-danger/5 transition-all cursor-pointer border-none bg-transparent font-medium"
                                    >
                                        <FiLogOut size={16} /> Sign Out
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
