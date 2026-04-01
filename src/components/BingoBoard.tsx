import React from 'react';
import BingoCell from './BingoCell';
import { GameData } from '../services/gameApi';

interface BingoBoardProps {
  game: GameData;
}

const COLUMNS = ['B', 'I', 'N', 'G', 'O'];

const COL_COLOR = ['#00bfff', '#ff6ec7', '#ffe600', '#00FFD1', '#ff9900'];

const BingoBoard: React.FC<BingoBoardProps> = ({ game }) => {
  const markedSet = new Set(game.marked);
  const lastCalled = game.calledNumbers[game.calledNumbers.length - 1];

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Column headers */}
      <div className="grid grid-cols-5 gap-2 mb-2">
        {COLUMNS.map((col, i) => (
          <div
            key={col}
            className="flex items-center justify-center text-2xl font-black py-1"
            style={{ color: COL_COLOR[i], textShadow: '0 0 10px ' + COL_COLOR[i] }}
          >
            {col}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-2">
        {game.board.map((num, index) => {
          const isFree = index === 12;
          const marked = markedSet.has(index);
          const isNew = !isFree && num === lastCalled && marked;
          return (
            <BingoCell
              key={index}
              value={num}
              marked={marked}
              isFree={isFree}
              isNew={isNew}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BingoBoard;
