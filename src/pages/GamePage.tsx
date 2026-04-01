import React, { useEffect, useState } from 'react';
import { useGame } from '../hooks/useGame';
import { useAuth } from '../hooks/useAuth';
import BingoBoard from '../components/BingoBoard';
import CallerDisplay from '../components/CallerDisplay';
import WinBanner from '../components/WinBanner';
import AuthModal from '../components/AuthModal';

interface GamePageProps {
  onGameEnd?: () => void;
}

const GamePage: React.FC<GamePageProps> = ({ onGameEnd }) => {
  const { user } = useAuth();
  const { game, loading, calling, error, noCoins, addingCoins, startNewGame, callNext, topUpCoins } = useGame();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => { startNewGame(); }, [startNewGame]);
  useEffect(() => { if (game?.isWinner && onGameEnd) onGameEnd(); }, [game?.isWinner, onGameEnd]);

  const handleAuthSuccess = () => { setShowAuth(false); startNewGame(); };
  const guardedCall = () => { if (!user) { setShowAuth(true); return; } callNext(); };
  const guardedNewGame = () => {
    if (!user) { setShowAuth(true); return; }
    startNewGame();
    if (onGameEnd) onGameEnd();
  };
  const handleTopUp = () => topUpCoins(() => { if (onGameEnd) onGameEnd(); });
  const poolEmpty = (game?.calledNumbers.length ?? 0) >= 75;

  // No coins screen
  if (noCoins && user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#0d1117' }}>
        <div className="rounded-3xl p-10 text-center max-w-sm w-full"
          style={{ background: '#131929', border: '1px solid #c8a82033' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(145deg,#c8a820,#a88010)', boxShadow: '0 0 30px #c8a82044' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h2 className="text-2xl font-black mb-2" style={{ color: '#fff' }}>Out of Coins</h2>
          <p className="text-sm mb-1" style={{ color: '#8892a4' }}>You need <span style={{ color: '#c8a820', fontWeight: 700 }}>10 coins</span> to play.</p>
          <p className="text-xs mb-8" style={{ color: '#4a5568' }}>Claim your free top-up and keep playing.</p>
          <button onClick={handleTopUp} disabled={addingCoins}
            className="w-full font-black py-4 rounded-2xl transition-all disabled:opacity-50 mb-3 text-sm tracking-widest uppercase"
            style={{ background: 'linear-gradient(90deg,#c8a820,#a88010)', color: '#fff', boxShadow: '0 4px 20px #c8a82044' }}>
            {addingCoins ? 'Adding...' : 'Claim 50 Free Coins'}
          </button>
          <button onClick={guardedNewGame}
            className="w-full text-sm py-3 rounded-2xl transition-all"
            style={{ background: '#1e2a3a', color: '#8892a4' }}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 56px)', background: '#0d1117' }}>

      {/* Top stats bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 border-b"
        style={{ borderColor: '#1e2a3a' }}>
        <div className="flex items-center gap-6">
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>Progress</p>
            <p className="text-sm font-black" style={{ color: '#e2e8f0' }}>
              {game ? game.marked.length : 0}
              <span style={{ color: '#4a5568' }}>/25 marked</span>
            </p>
          </div>
          <div className="w-px h-8" style={{ background: '#1e2a3a' }} />
          <div>
            <p className="text-xs uppercase tracking-widest" style={{ color: '#4a5568' }}>Called</p>
            <p className="text-sm font-black" style={{ color: '#e2e8f0' }}>
              {game ? game.calledNumbers.length : 0}
              <span style={{ color: '#4a5568' }}>/75</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {!user && (
            <button onClick={() => setShowAuth(true)}
              className="text-xs font-bold px-4 py-2 rounded-xl transition-all"
              style={{ background: 'linear-gradient(90deg,#7c6fe0,#5b4fcf)', color: '#fff', boxShadow: '0 4px 14px #7c6fe044' }}>
              Sign In to Play
            </button>
          )}
          <button onClick={guardedNewGame} disabled={loading}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-xl transition-all disabled:opacity-50"
            style={{ background: '#1e2a3a', color: '#8892a4' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35A7.958 7.958 0 0 0 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0 1 12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            New Game {user && '· 10 coins'}
          </button>
        </div>
      </div>

      {error && (
        <div className="flex-shrink-0 mx-6 mt-3 rounded-xl px-4 py-3 text-sm text-center"
          style={{ background: '#2a0a0a', border: '1px solid #ff4d4d33', color: '#ff6b6b' }}>
          {error}
        </div>
      )}

      {loading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 rounded-full border-4 border-t-transparent animate-spin"
              style={{ borderColor: '#1e2a3a', borderTopColor: '#7c6fe0' }} />
            <p className="text-sm" style={{ color: '#4a5568' }}>Setting up your card...</p>
          </div>
        </div>
      )}

      {!loading && game && (
        <div className="flex-1 flex overflow-hidden">

          {/* Board — left */}
          <div className="flex-1 flex items-center justify-center p-4 lg:p-6 overflow-auto">
            <div className="w-full" style={{ maxWidth: '520px' }}>
              <BingoBoard game={game} />
            </div>
          </div>

          {/* Right panel */}
          <div className="flex-shrink-0 border-l overflow-y-auto"
            style={{ width: '280px', borderColor: '#1e2a3a', background: '#0d1117' }}>
            <CallerDisplay
              calledNumbers={game.calledNumbers}
              onCall={guardedCall}
              calling={calling}
              isWinner={game.isWinner}
              poolEmpty={poolEmpty}
              isGuest={!user}
            />
          </div>

        </div>
      )}

      {game?.isWinner && <WinBanner onNewGame={guardedNewGame} />}
      {showAuth && <AuthModal onClose={handleAuthSuccess} />}
    </div>
  );
};

export default GamePage;
