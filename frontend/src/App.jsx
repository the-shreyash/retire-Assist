import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AIAssistant from './pages/AIAssistant';
import Documents from './pages/Documents';
import Reminders from './pages/Reminders';
import Services from './pages/Services';
import AdminPanel from './pages/AdminPanel';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-bg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-xl text-text-light">Loading RetireAssist...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" />;
}

function AppLayout({ children }) {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-0 md:ml-64 mt-20 min-h-[calc(100vh-80px)]">
          <div className="max-w-6xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>} />
      <Route path="/assistant" element={<ProtectedRoute><AppLayout><AIAssistant /></AppLayout></ProtectedRoute>} />
      <Route path="/documents" element={<ProtectedRoute><AppLayout><Documents /></AppLayout></ProtectedRoute>} />
      <Route path="/reminders" element={<ProtectedRoute><AppLayout><Reminders /></AppLayout></ProtectedRoute>} />
      <Route path="/services" element={<ProtectedRoute><AppLayout><Services /></AppLayout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><AppLayout><AdminPanel /></AppLayout></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
