import React from 'react';

interface CallerDisplayProps {
  calledNumbers: number[];
  onCall: () => void;
  calling: boolean;
  isWinner: boolean;
  poolEmpty: boolean;
}

function columnLetter(n: number): string {
  if (n <= 15) return 'B';
  if (n <= 30) return 'I';
  if (n <= 45) return 'N';
  if (n <= 60) return 'G';
  return 'O';
}

const LETTER_COLOR: Record<string, string> = {
  B: '#00bfff',
  I: '#ff6ec7',
  N: '#ffe600',
  G: '#00FFD1',
  O: '#ff9900',
};

const BADGE_BG: Record<string, string> = {
  B: '#00bfff22',
  I: '#ff6ec722',
  N: '#ffe60022',
  G: '#00FFD122',
  O: '#ff990022',
};

const CallerDisplay: React.FC<CallerDisplayProps> = ({
  calledNumbers,
  onCall,
  calling,
  isWinner,
  poolEmpty,
}) => {
  const last = calledNumbers[calledNumbers.length - 1];
  const canCall = !calling && !isWinner && !poolEmpty;
  const letter = last !== undefined ? columnLetter(last) : null;

  return (
    <div className="rounded-2xl p-4 flex flex-col gap-4 border" style={{ background: '#0F2027cc', borderColor: '#2C5364' }}>

      {/* Last called */}
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#4a8a8a' }}>Last Called</p>
        <div className="rounded-xl py-5 px-2 flex flex-col items-center justify-center min-h-24 border"
          style={{ background: '#203A43', borderColor: '#2C5364' }}>
          {letter ? (
            <>
              <span style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1, color: LETTER_COLOR[letter], textShadow: '0 0 12px ' + LETTER_COLOR[letter] }}>
                {letter}
              </span>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1, color: '#ffffff', marginTop: 4 }}>
                {last}
              </span>
            </>
          ) : (
            <span style={{ color: '#2C5364', fontSize: '2rem', fontWeight: 700 }}>—</span>
          )}
        </div>
      </div>

      {/* Call button */}
      <button
        onClick={onCall}
        disabled={!canCall}
        className="font-bold py-2 px-4 rounded-xl transition-all w-full disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ background: canCall ? 'linear-gradient(90deg, #00FFD1, #00bfff)' : '#2C5364', color: '#0F2027', boxShadow: canCall ? '0 0 12px #00FFD166' : 'none' }}
      >
        {calling ? 'Calling...' : poolEmpty ? 'No More Numbers' : 'Call Next'}
      </button>

      {/* History */}
      {calledNumbers.length > 0 && (
        <div>
          <p className="text-xs uppercase tracking-widest mb-2 text-center" style={{ color: '#4a8a8a' }}>
            Called ({calledNumbers.length}/75)
          </p>
          <div className="flex flex-wrap gap-1 justify-center max-h-40 overflow-y-auto">
            {[...calledNumbers].reverse().map((n, i) => {
              const l = columnLetter(n);
              const isLatest = i === 0;
              return (
                <span
                  key={i}
                  className="text-xs font-bold px-1.5 py-0.5 rounded"
                  style={{
                    background: isLatest ? LETTER_COLOR[l] : BADGE_BG[l],
                    color: isLatest ? '#0F2027' : LETTER_COLOR[l],
                    boxShadow: isLatest ? '0 0 8px ' + LETTER_COLOR[l] : 'none',
                  }}
                >
                  {l}{n}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallerDisplay;
