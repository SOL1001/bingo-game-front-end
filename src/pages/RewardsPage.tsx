import React from 'react';

interface RewardsPageProps {
  gamesPlayed: number;
  gamesWon: number;
  coins: number;
}

const MILESTONES = [
  { games: 1,  label: 'First Game',    icon: '🎮', reward: 0  },
  { games: 5,  label: '5 Games',       icon: '🔥', reward: 20 },
  { games: 10, label: '10 Games',      icon: '⚡', reward: 50 },
  { games: 25, label: '25 Games',      icon: '💎', reward: 100 },
  { games: 50, label: 'Veteran',       icon: '👑', reward: 200 },
];

const WIN_MILESTONES = [
  { wins: 1,  label: 'First Win',   icon: '🏆', reward: 0  },
  { wins: 3,  label: '3 Wins',      icon: '🌟', reward: 30 },
  { wins: 10, label: '10 Wins',     icon: '🚀', reward: 100 },
  { wins: 25, label: 'Champion',    icon: '💫', reward: 250 },
];

const RewardsPage: React.FC<RewardsPageProps> = ({ gamesPlayed, gamesWon, coins }) => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black mb-2" style={{ color: '#00FFD1' }}>Rewards</h2>
      <p className="text-sm mb-6" style={{ color: '#7ecfcf' }}>
        Each game costs 10 🪙 · Each win earns 50 🪙 · New players start with 100 🪙
      </p>

      {/* Coin balance */}
      <div
        className="rounded-2xl p-5 mb-6 border flex items-center gap-4"
        style={{ background: '#ffe60011', borderColor: '#ffe60044' }}
      >
        <span className="text-4xl">🪙</span>
        <div>
          <p className="text-3xl font-black" style={{ color: '#ffe600' }}>{coins}</p>
          <p className="text-xs" style={{ color: '#7ecfcf' }}>Current Balance</p>
        </div>
      </div>

      {/* Games played milestones */}
      <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#7ecfcf' }}>Games Played</h3>
      <div className="flex flex-col gap-2 mb-6">
        {MILESTONES.map((m) => {
          const done = gamesPlayed >= m.games;
          return (
            <div
              key={m.games}
              className="rounded-xl px-4 py-3 border flex items-center justify-between"
              style={{ background: done ? '#00FFD111' : '#0F2027cc', borderColor: done ? '#00FFD144' : '#2C5364', opacity: done ? 1 : 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: done ? '#00FFD1' : '#7ecfcf' }}>{m.label}</p>
                  <p className="text-xs" style={{ color: '#4a8a8a' }}>{gamesPlayed} / {m.games} games</p>
                </div>
              </div>
              <span className="text-sm font-bold" style={{ color: '#ffe600' }}>
                {done ? '✓ Unlocked' : m.reward > 0 ? '+' + m.reward + ' 🪙' : '—'}
              </span>
            </div>
          );
        })}
      </div>

      {/* Wins milestones */}
      <h3 className="text-sm font-bold uppercase tracking-widest mb-3" style={{ color: '#7ecfcf' }}>Wins</h3>
      <div className="flex flex-col gap-2">
        {WIN_MILESTONES.map((m) => {
          const done = gamesWon >= m.wins;
          return (
            <div
              key={m.wins}
              className="rounded-xl px-4 py-3 border flex items-center justify-between"
              style={{ background: done ? '#00FFD111' : '#0F2027cc', borderColor: done ? '#00FFD144' : '#2C5364', opacity: done ? 1 : 0.5 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{m.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: done ? '#00FFD1' : '#7ecfcf' }}>{m.label}</p>
                  <p className="text-xs" style={{ color: '#4a8a8a' }}>{gamesWon} / {m.wins} wins</p>
                </div>
              </div>
              <span className="text-sm font-bold" style={{ color: '#ffe600' }}>
                {done ? '✓ Unlocked' : m.reward > 0 ? '+' + m.reward + ' 🪙' : '—'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RewardsPage;
