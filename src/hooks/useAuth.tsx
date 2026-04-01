import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { AuthUser, login as apiLogin, register as apiRegister } from '../services/authApi';

interface AuthContextValue {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('bingo_token'));
  const [loading, setLoading] = useState(true);

  // Attach token to all axios requests
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      localStorage.setItem('bingo_token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('bingo_token');
    }
  }, [token]);

  // Restore session on mount
  useEffect(() => {
    const stored = localStorage.getItem('bingo_token');
    const storedUser = localStorage.getItem('bingo_user');
    if (stored && storedUser) {
      setToken(stored);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    localStorage.setItem('bingo_token', res.token);
    localStorage.setItem('bingo_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  }, []);

  const register = useCallback(async (username: string, email: string, password: string) => {
    const res = await apiRegister(username, email, password);
    localStorage.setItem('bingo_token', res.token);
    localStorage.setItem('bingo_user', JSON.stringify(res.user));
    setToken(res.token);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('bingo_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
