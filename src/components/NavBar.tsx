import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';

type Page = 'play' | 'history' | 'rewards' | 'profile';

interface NavBarProps {
  current: Page;
  onChange: (p: Page) => void;
  coins: number;
  user: { username: string } | null;
}

const icons: Record<Page, React.ReactNode> = {
  play: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  ),
  history: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  rewards: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
    </svg>
  ),
  profile: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};

const CoinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <text x="12" y="16" textAnchor="middle" fontSize="10" fill="#0F2027" fontWeight="bold">$</text>
  </svg>
);

const SignOutIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const NAV: { id: Page; label: string }[] = [
  { id: 'play',    label: 'Play'    },
  { id: 'history', label: 'History' },
  { id: 'rewards', label: 'Rewards' },
  { id: 'profile', label: 'Profile' },
];

const NavBar: React.FC<NavBarProps> = ({ current, onChange, coins, user }) => {
  const { logout } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-5 py-2 border-b"
      style={{ background: '#0d1117', borderColor: '#1e2a3a', backdropFilter: 'blur(10px)', height: '56px' }}
    >
      {/* Logo */}
      <span className="text-lg font-black tracking-widest" style={{ color: '#fff' }}>
        Bingo <span style={{ color: '#7c6fe0' }}>Royale</span>
      </span>

      {/* Nav links */}
      <nav className="flex items-center gap-1">
        {NAV.map((n) => {
          const active = current === n.id;
          return (
            <button
              key={n.id}
              onClick={() => onChange(n.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: active ? '#7c6fe022' : 'transparent',
                color: active ? '#a89fe8' : '#4a5568',
              }}
            >
              {icons[n.id]}
              <span className="hidden sm:inline">{n.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right */}
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold"
              style={{ background: '#1e2a3a', color: '#c8a820' }}>
              <CoinIcon />
              {coins}
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold"
              style={{ background: '#1e2a3a', color: '#8892a4' }}>
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs"
                style={{ background: 'linear-gradient(145deg,#7c6fe0,#5b4fcf)', color: '#fff' }}>
                {user.username[0].toUpperCase()}
              </div>
              <span className="hidden sm:inline">{user.username}</span>
            </div>
            <button onClick={logout}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl transition-all"
              style={{ background: '#1e2a3a', color: '#4a5568' }}>
              <SignOutIcon />
            </button>
          </>
        ) : (
          <button onClick={() => setShowAuth(true)}
            className="text-sm font-bold px-4 py-2 rounded-xl transition-all"
            style={{ background: 'linear-gradient(90deg,#7c6fe0,#5b4fcf)', color: '#fff', boxShadow: '0 4px 14px #7c6fe044' }}>
            Sign In
          </button>
        )}
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default NavBar;
