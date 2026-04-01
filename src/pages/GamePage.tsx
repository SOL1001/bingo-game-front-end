import React, { useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import BingoBoard from '../components/BingoBoard';
import CallerDisplay from '../components/CallerDisplay';
import WinBanner from '../components/WinBanner';

const GamePage: React.FC = () => {
  const { game, loading, calling, error, startNewGame, callNext } = useGame();

  useEffect(() => {
    startNewGame();
  }, [startNewGame]);

  const poolEmpty = (game?.calledNumbers.length ?? 0) >= 75;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ background: 'linear-gradient(135deg, #0F2027 0%, #203A43 50%, #2C5364 100%)' }}>

      {/* Header */}
      <div className="text-center mb-8">
        <h1
          className="text-6xl font-black tracking-widest uppercase"
          style={{ color: '#00FFD1', textShadow: '0 0 20px #00FFD1, 0 0 40px #00FFD188' }}
        >
          BINGO
        </h1>
        <p className="text-sm mt-2" style={{ color: '#7ecfcf' }}>
          Complete a row, column, or diagonal to win
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg px-4 py-3 mb-4 text-sm text-center w-full max-w-3xl border"
          style={{ background: '#1a0a0a', borderColor: '#ff4d4d', color: '#ff4d4d' }}>
          {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="text-lg font-semibold py-12 animate-pulse" style={{ color: '#00FFD1' }}>
          Loading game...
        </div>
      )}

      {!loading && game && (
        <div className="w-full max-w-3xl">
          <div className="flex flex-col md:flex-row gap-4 items-start">

            {/* Left — Bingo board */}
            <div className="flex-1 rounded-2xl p-4 border" style={{ background: '#0F2027cc', borderColor: '#2C5364' }}>
              <BingoBoard game={game} />
              <div className="flex justify-between text-xs mt-3 px-1" style={{ color: '#4a8a8a' }}>
                <span>{game.marked.length} / 25 marked</span>
                <span>#{game._id.slice(-6)}</span>
              </div>
            </div>

            {/* Right — Caller panel */}
            <div className="w-full md:w-64 flex-shrink-0">
              <CallerDisplay
                calledNumbers={game.calledNumbers}
                onCall={callNext}
                calling={calling}
                isWinner={game.isWinner}
                poolEmpty={poolEmpty}
              />
            </div>

          </div>

          {/* New Game */}
          <div className="text-center mt-6">
            <button
              onClick={startNewGame}
              disabled={loading}
              className="font-bold py-3 px-10 rounded-xl transition-all disabled:opacity-50"
              style={{ background: 'linear-gradient(90deg, #00FFD1, #00bfff)', color: '#0F2027', boxShadow: '0 0 16px #00FFD188' }}
            >
              New Game
            </button>
          </div>
        </div>
      )}

      {game?.isWinner && <WinBanner onNewGame={startNewGame} />}
    </div>
  );
};

export default GamePage;
