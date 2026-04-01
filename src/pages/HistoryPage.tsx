import React, { useEffect, useState } from 'react';
import { getHistory, HistoryItem } from '../services/gameApi';

const HistoryPage: React.FC = () => {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHistory().then(setItems).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black mb-6" style={{ color: '#00FFD1' }}>Game History</h2>

      {loading && <p className="animate-pulse text-sm" style={{ color: '#7ecfcf' }}>Loading...</p>}

      {!loading && items.length === 0 && (
        <div className="rounded-xl p-8 text-center border" style={{ background: '#0F2027cc', borderColor: '#2C5364' }}>
          <p className="text-4xl mb-3">🎲</p>
          <p style={{ color: '#7ecfcf' }}>No games played yet. Start playing!</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <div
            key={item._id}
            className="rounded-xl p-4 border flex items-center justify-between"
            style={{ background: '#0F2027cc', borderColor: item.isWinner ? '#00FFD144' : '#2C5364' }}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{item.isWinner ? '🏆' : '🎮'}</span>
              <div>
                <p className="text-sm font-bold" style={{ color: item.isWinner ? '#00FFD1' : '#7ecfcf' }}>
                  {item.isWinner ? 'WIN' : 'No Win'} — Game #{items.length - i}
                </p>
                <p className="text-xs" style={{ color: '#4a8a8a' }}>
                  {new Date(item.createdAt).toLocaleDateString()} · {item.calledNumbers.length} numbers called
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold" style={{ color: '#ffe600' }}>
                {item.isWinner ? '+' + item.coinsEarned : '-' + item.coinsSpent} 🪙
              </p>
              <p className="text-xs" style={{ color: '#4a8a8a' }}>
                {item.isWinner ? 'earned' : 'spent'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
