import React from 'react';
import BingoCell from './BingoCell';
import { GameData } from '../services/gameApi';

interface BingoBoardProps {
  game: GameData;
}

const COLUMNS = ['B', 'I', 'N', 'G', 'O'];

const BingoBoard: React.FC<BingoBoardProps> = ({ game }) => {
  const markedSet = new Set(game.marked);
  const lastCalled = game.calledNumbers[game.calledNumbers.length - 1];

  return (
    <div className="w-full h-full select-none p-6 rounded-3xl"
      style={{ background: '#131929' }}>
      {/* Column headers */}
      <div className="grid grid-cols-5 mb-4" style={{ gap: '10px' }}>
        {COLUMNS.map((col) => (
          <div key={col} className="flex items-center justify-center text-2xl font-black tracking-widest py-2"
            style={{ color: '#6b7fd4' }}>
            {col}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5" style={{ gap: '10px' }}>
        {game.board.map((num, index) => {
          const isFree = index === 12;
          const marked = markedSet.has(index);
          const isNew = !isFree && num === lastCalled && marked;
          return (
            <BingoCell key={index} value={num} marked={marked} isFree={isFree} isNew={isNew} />
          );
        })}
      </div>
    </div>
  );
};

export default BingoBoard;
