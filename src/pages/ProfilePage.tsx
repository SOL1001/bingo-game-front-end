import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface ProfilePageProps {
  coins: number;
  gamesPlayed: number;
  gamesWon: number;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ coins, gamesPlayed, gamesWon }) => {
  const { user, logout } = useAuth();
  const winRate = gamesPlayed > 0 ? Math.round((gamesWon / gamesPlayed) * 100) : 0;

  const stats = [
    { label: 'Coins',        value: coins,       icon: '🪙', color: '#ffe600' },
    { label: 'Games Played', value: gamesPlayed, icon: '🎮', color: '#00bfff' },
    { label: 'Games Won',    value: gamesWon,    icon: '🏆', color: '#00FFD1' },
    { label: 'Win Rate',     value: winRate + '%', icon: '📈', color: '#ff6ec7' },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h2 className="text-2xl font-black mb-6" style={{ color: '#00FFD1' }}>Profile</h2>

      {/* Avatar + info */}
      <div
        className="rounded-2xl p-6 border mb-6 flex items-center gap-5"
        style={{ background: '#0F2027cc', borderColor: '#2C5364' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-black border-2"
          style={{ background: '#203A43', borderColor: '#00FFD1', color: '#00FFD1', boxShadow: '0 0 12px #00FFD144' }}
        >
          {user?.username?.[0]?.toUpperCase()}
        </div>
        <div>
          <p className="text-xl font-black" style={{ color: '#fff' }}>{user?.username}</p>
          <p className="text-sm" style={{ color: '#4a8a8a' }}>{user?.email}</p>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-4 border text-center"
            style={{ background: '#0F2027cc', borderColor: '#2C5364' }}
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-2xl font-black" style={{ color: s.color }}>{s.value}</p>
            <p className="text-xs mt-1" style={{ color: '#4a8a8a' }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Sign out */}
      <button
        onClick={logout}
        className="w-full py-3 rounded-xl font-bold border transition-all"
        style={{ borderColor: '#ff4d4d44', color: '#ff4d4d', background: '#ff4d4d11' }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default ProfilePage;
