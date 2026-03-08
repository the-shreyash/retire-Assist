import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiLogOut, FiBell, FiUser } from 'react-icons/fi';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-primary text-white shadow-xl h-20">
            <div className="flex items-center justify-between h-full px-6">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-3 no-underline">
                    <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg">
                        R
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white leading-tight">RetireAssist</h1>
                        <p className="text-xs text-blue-200 hidden sm:block">Your Pension Companion</p>
                    </div>
                </Link>

                {/* Right Section */}
                <div className="flex items-center gap-4">
                    {/* Notification Bell */}
                    <button
                        onClick={() => navigate('/reminders')}
                        className="relative w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer border-none"
                    >
                        <FiBell className="text-white" size={22} />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-danger rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
                    </button>

                    {/* User Info */}
                    <div className="hidden md:flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-2">
                        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                            <FiUser size={20} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold leading-tight">{user?.name || 'User'}</p>
                            <p className="text-xs text-blue-200">{user?.role === 'admin' ? 'Administrator' : 'Pensioner'}</p>
                        </div>
                    </div>

                    {/* Logout */}
                    <button
                        onClick={handleLogout}
                        className="btn-senior bg-white/10 text-white hover:bg-danger px-5 py-3 text-base border-none"
                        title="Logout"
                    >
                        <FiLogOut size={20} className="inline mr-2" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
