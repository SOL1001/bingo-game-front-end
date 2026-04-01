import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(username, email, password);
      }
      onClose();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: '#0F2027cc', backdropFilter: 'blur(6px)' }}
    >
      <div
        className="w-full max-w-sm rounded-2xl p-8 border relative"
        style={{ background: '#203A43', borderColor: '#2C5364', boxShadow: '0 0 40px #00FFD122' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm px-2 py-1 rounded-lg transition-all"
          style={{ color: '#4a8a8a' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-xl font-black mb-1" style={{ color: '#00FFD1' }}>
          {mode === 'login' ? 'Sign in to play' : 'Create account'}
        </h2>
        <p className="text-xs mb-5" style={{ color: '#4a8a8a' }}>
          You need an account to call numbers and win coins.
        </p>

        {/* Tabs */}
        <div className="flex rounded-xl overflow-hidden mb-5 border" style={{ borderColor: '#2C5364' }}>
          {(['login', 'register'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(''); }}
              className="flex-1 py-2 text-sm font-bold transition-all capitalize"
              style={{ background: mode === m ? '#00FFD1' : 'transparent', color: mode === m ? '#0F2027' : '#7ecfcf' }}
            >
              {m === 'login' ? 'Sign In' : 'Register'}
            </button>
          ))}
      
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {mode === 'register' && (
            <div>
              <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: '#7ecfcf' }}>Username</label>
              <input
                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                required minLength={3} placeholder="coolplayer"
                className="w-full rounded-lg px-4 py-2 text-sm outline-none border"
                style={{ background: '#0F2027', borderColor: '#2C5364', color: '#fff' }}
              />
            </div>
          )}
          <div>
            <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: '#7ecfcf' }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              required placeholder="you@example.com"
              className="w-full rounded-lg px-4 py-2 text-sm outline-none border"
              style={{ background: '#0F2027', borderColor: '#2C5364', color: '#fff' }}
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest mb-1 block" style={{ color: '#7ecfcf' }}>Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              required minLength={6} placeholder="••••••••"
              className="w-full rounded-lg px-4 py-2 text-sm outline-none border"
              style={{ background: '#0F2027', borderColor: '#2C5364', color: '#fff' }}
            />
          </div>

          {error && (
            <p className="text-xs text-center rounded-lg py-2 px-3 border" style={{ color: '#ff4d4d', background: '#1a0a0a', borderColor: '#ff4d4d44' }}>
              {error}
            </p>
          )}

          <button
            type="submit" disabled={loading}
            className="font-bold py-3 rounded-xl transition-all disabled:opacity-50 mt-1"
            style={{ background: 'linear-gradient(90deg, #00FFD1, #00bfff)', color: '#0F2027', boxShadow: '0 0 16px #00FFD188' }}
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Sign In & Play' : 'Register & Play'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
