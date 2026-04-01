import React from 'react';

interface BingoCellProps {
  value: number;
  marked: boolean;
  isFree: boolean;
  isNew: boolean;
}

const BingoCell: React.FC<BingoCellProps> = ({ value, marked, isFree, isNew }) => {
  const label = isFree ? (
    <span className="flex flex-col items-center leading-none">
      <span style={{ fontSize: '0.5rem', letterSpacing: '0.1em', opacity: 0.7 }}>ROYALE</span>
      <span style={{ fontSize: '0.85rem' }}>FREE</span>
    </span>
  ) : String(value).padStart(2, '0');

  if (isFree) {
    return (
      <div className="flex items-center justify-center w-full aspect-square rounded-3xl font-black transition-all duration-300"
        style={{ background: 'linear-gradient(145deg,#e8c840,#c8a820)', color: '#1a1200', fontSize: '0.75rem', boxShadow: '0 4px 20px #c8a82055' }}>
        {label}
      </div>
    );
  }

  if (marked) {
    return (
      <div className={'flex items-center justify-center w-full aspect-square rounded-3xl font-black transition-all duration-300' + (isNew ? ' animate-pulse' : '')}
        style={{ background: 'linear-gradient(145deg,#2d7a3a,#1f5c2a)', color: '#ffffff', fontSize: '1.1rem', boxShadow: isNew ? '0 4px 24px #2d7a3a99' : '0 4px 16px #1f5c2a66' }}>
        {label}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full aspect-square rounded-3xl font-semibold transition-all duration-300"
      style={{ background: 'transparent', color: '#8892a4', fontSize: '1rem' }}>
      {label}
    </div>
  );
};

export default BingoCell;
