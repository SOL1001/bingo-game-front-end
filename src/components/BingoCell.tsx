import React from 'react';

interface BingoCellProps {
  value: number;
  marked: boolean;
  isFree: boolean;
  isNew: boolean;
}

const BingoCell: React.FC<BingoCellProps> = ({ value, marked, isFree, isNew }) => {
  const label = isFree ? 'FREE' : String(value);

  let bg = '#203A43';
  let border = '#2C5364';
  let color = '#7ecfcf';
  let shadow = 'none';
  let extraClass = '';

  if (isFree) {
    bg = '#ffe60022';
    border = '#ffe600';
    color = '#ffe600';
    shadow = '0 0 10px #ffe60066';
  } else if (isNew) {
    bg = '#00FFD122';
    border = '#00FFD1';
    color = '#00FFD1';
    shadow = '0 0 14px #00FFD1';
    extraClass = 'animate-pulse';
  } else if (marked) {
    bg = '#00FFD1';
    border = '#00FFD1';
    color = '#0F2027';
    shadow = '0 0 10px #00FFD188';
  }

  return (
    <div
      aria-label={isFree ? 'Free space' : `Number ${value}${marked ? ', marked' : ''}`}
      className={'flex items-center justify-center w-full aspect-square rounded-lg font-bold select-none border-2 transition-all duration-300 text-sm ' + extraClass}
      style={{ background: bg, borderColor: border, color, boxShadow: shadow }}
    >
      {label}
    </div>
  );
};

export default BingoCell;
