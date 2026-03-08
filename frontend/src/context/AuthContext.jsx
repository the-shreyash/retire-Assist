import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const API = axios.create({ baseURL: '/api' });

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (token) {
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            API.get('/auth/profile')
                .then(res => setUser(res.data))
                .catch(() => { logout(); })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = async (email, password) => {
        const res = await API.post('/auth/login', { email, password });
        const { token: t, user: u } = res.data;
        localStorage.setItem('token', t);
        API.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        setToken(t);
        setUser(u);
        return u;
    };

    const signup = async (userData) => {
        const res = await API.post('/auth/signup', userData);
        const { token: t, user: u } = res.data;
        localStorage.setItem('token', t);
        API.defaults.headers.common['Authorization'] = `Bearer ${t}`;
        setToken(t);
        setUser(u);
        return u;
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete API.defaults.headers.common['Authorization'];
        setToken(null);
        setUser(null);
    };

    const updateProfile = async (data) => {
        const res = await API.put('/auth/profile', data);
        setUser(res.data.user);
        return res.data.user;
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, signup, logout, updateProfile, API }}>
            {children}
        </AuthContext.Provider>
    );
}
