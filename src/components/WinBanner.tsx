import React from 'react';

interface WinBannerProps {
  onNewGame: () => void;
}

const WinBanner: React.FC<WinBannerProps> = ({ onNewGame }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 p-4"
    style={{ background: '#0d111acc', backdropFilter: 'blur(16px)' }}>
    <div className="rounded-3xl p-10 text-center max-w-sm w-full"
      style={{ background: '#131929', border: '1px solid #7c6fe044', boxShadow: '0 0 80px #7c6fe033' }}>

      <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
        style={{ background: 'linear-gradient(145deg,#7c6fe0,#5b4fcf)', boxShadow: '0 0 40px #7c6fe066' }}>
        <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="6" />
          <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
        </svg>
      </div>

      <h2 className="text-5xl font-black tracking-widest mb-2" style={{ color: '#fff' }}>BINGO!</h2>
      <p className="text-sm mb-1" style={{ color: '#8892a4' }}>Pattern complete</p>
      <p className="text-xs mb-8" style={{ color: '#4a5568' }}>+50 coins added to your balance</p>

      <button onClick={onNewGame}
        className="w-full font-black py-4 rounded-2xl transition-all text-sm tracking-widest uppercase"
        style={{ background: 'linear-gradient(90deg,#7c6fe0,#5b4fcf)', color: '#fff', boxShadow: '0 4px 24px #7c6fe066' }}>
        Play Again
      </button>
    </div>
  </div>
);

export default WinBanner;
