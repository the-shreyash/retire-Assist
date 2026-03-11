import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Bell, Search, Menu, Shield, ChevronDown, LogOut, User, Settings } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ onToggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [showProfile, setShowProfile] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 lg:left-64 z-30 bg-white/80 backdrop-blur-md border-b border-border h-16">
            <div className="flex items-center justify-between h-full px-4 lg:px-6">
                <div className="flex items-center gap-3">
                    <button onClick={onToggleSidebar} className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-text-light hover:bg-bg transition-all cursor-pointer border-none bg-transparent">
                        <Menu size={20} />
                    </button>
                    <div className="hidden sm:flex items-center gap-2 bg-bg rounded-lg px-3 py-2 w-64">
                        <Search size={16} className="text-text-muted" />
                        <input type="text" placeholder="Search services, documents..." className="bg-transparent border-none outline-none text-sm w-full text-text placeholder:text-text-muted" />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className="trust-badge hidden md:inline-flex"><Shield size={12} /> Secure Platform</span>

                    <button onClick={() => navigate('/notifications')} className="relative w-10 h-10 rounded-lg flex items-center justify-center text-text-light hover:bg-bg transition-all cursor-pointer border-none bg-transparent">
                        <Bell size={18} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-danger rounded-full"></span>
                    </button>

                    <div className="relative">
                        <button onClick={() => setShowProfile(!showProfile)} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-bg transition-all cursor-pointer border-none bg-transparent">
                            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                                <User size={14} className="text-white" />
                            </div>
                            <span className="text-sm font-semibold text-text-dark hidden md:block">{user?.name?.split(' ')[0]}</span>
                            <ChevronDown size={14} className="text-text-muted hidden md:block" />
                        </button>

                        {showProfile && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
                                <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-border p-2 z-50 animate-slide-down">
                                    <div className="px-3 py-2 mb-1">
                                        <p className="font-semibold text-sm text-text-dark">{user?.name}</p>
                                        <p className="text-xs text-text-muted">{user?.email}</p>
                                    </div>
                                    <hr className="border-border my-1" />
                                    <button onClick={() => { navigate('/profile'); setShowProfile(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-light rounded-lg hover:bg-bg transition-all cursor-pointer border-none bg-transparent font-medium">
                                        <User size={14} /> Profile
                                    </button>
                                    <button onClick={() => { navigate('/notifications'); setShowProfile(false); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-text-light rounded-lg hover:bg-bg transition-all cursor-pointer border-none bg-transparent font-medium">
                                        <Settings size={14} /> Settings
                                    </button>
                                    <hr className="border-border my-1" />
                                    <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-danger rounded-lg hover:bg-red-50 transition-all cursor-pointer border-none bg-transparent font-medium">
                                        <LogOut size={14} /> Sign Out
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
