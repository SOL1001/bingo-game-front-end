import React from 'react';

interface WinBannerProps {
  onNewGame: () => void;
}

const WinBanner: React.FC<WinBannerProps> = ({ onNewGame }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ background: '#0F2027cc', backdropFilter: 'blur(6px)' }}>
    <div className="rounded-2xl p-8 text-center max-w-sm w-full border" style={{ background: '#203A43', borderColor: '#00FFD1', boxShadow: '0 0 40px #00FFD155' }}>
      <div className="text-6xl mb-4">🎉</div>
      <h2
        className="text-4xl font-black mb-2 tracking-widest"
        style={{ color: '#00FFD1', textShadow: '0 0 20px #00FFD1' }}
      >
        BINGO!
      </h2>
      <p className="mb-6 text-sm" style={{ color: '#7ecfcf' }}>You completed a pattern. Well played!</p>
      <button
        onClick={onNewGame}
        className="font-bold py-3 px-8 rounded-xl transition-all"
        style={{ background: 'linear-gradient(90deg, #00FFD1, #00bfff)', color: '#0F2027', boxShadow: '0 0 16px #00FFD188' }}
      >
        Play Again
      </button>
    </div>
  </div>
);

export default WinBanner;
