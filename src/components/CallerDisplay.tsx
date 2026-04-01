import React from 'react';

interface CallerDisplayProps {
  calledNumbers: number[];
  onCall: () => void;
  calling: boolean;
  isWinner: boolean;
  poolEmpty: boolean;
  isGuest?: boolean;
}

function columnLetter(n: number): string {
  if (n <= 15) return 'B';
  if (n <= 30) return 'I';
  if (n <= 45) return 'N';
  if (n <= 60) return 'G';
  return 'O';
}

const CallerDisplay: React.FC<CallerDisplayProps> = ({
  calledNumbers, onCall, calling, isWinner, poolEmpty, isGuest = false,
}) => {
  const last = calledNumbers[calledNumbers.length - 1];
  const recent = [...calledNumbers].reverse().slice(0, 5);
  const canCall = !calling && !isWinner && !poolEmpty;

  return (
    <div className="flex flex-col gap-3 p-4 h-full overflow-y-auto"
      style={{ scrollbarWidth: 'none' }}>

      {/* Last Called card */}
      <div className="rounded-2xl p-5 flex flex-col items-center gap-4"
        style={{ background: '#131929' }}>
        <p className="text-xs uppercase tracking-widest font-semibold" style={{ color: '#4a5568' }}>
          Last Called
        </p>

        {/* Big circle */}
        <div className="w-24 h-24 rounded-full flex items-center justify-center"
          style={{ background: last !== undefined ? 'linear-gradient(145deg,#7c6fe0,#5b4fcf)' : '#1e2a3a', boxShadow: last !== undefined ? '0 0 30px #7c6fe055' : 'none' }}>
          <span className="font-black" style={{ fontSize: '2.4rem', color: '#fff' }}>
            {last !== undefined ? String(last).padStart(2, '0') : '—'}
          </span>
        </div>

        {/* Call button */}
        <button onClick={onCall} disabled={calling || isWinner || poolEmpty}
          className="w-full font-black py-3 rounded-xl tracking-widest text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase"
          style={{ background: canCall || isGuest ? 'linear-gradient(90deg,#7c6fe0,#5b4fcf)' : '#1e2a3a', color: '#fff', boxShadow: canCall || isGuest ? '0 4px 20px #7c6fe055' : 'none' }}>
          {isGuest ? 'Sign In to Play' : calling ? 'Calling...' : isWinner ? 'You Won!' : poolEmpty ? 'All Called' : 'Call Next Number'}
        </button>
      </div>

      {/* Ball History card */}
      <div className="rounded-2xl p-4" style={{ background: '#131929' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#e2e8f0' }}>Ball History</p>
          <p className="text-xs" style={{ color: '#4a5568' }}>Recently Called</p>
        </div>
        <div className="flex gap-2 justify-start">
          {recent.length === 0 && (
            <p className="text-xs" style={{ color: '#4a5568' }}>No numbers called yet</p>
          )}
          {recent.map((n, i) => (
            <div key={i}
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ background: i === 0 ? 'linear-gradient(145deg,#7c6fe0,#5b4fcf)' : '#1e2a3a', color: '#fff', boxShadow: i === 0 ? '0 0 12px #7c6fe066' : 'none' }}>
              {String(n).padStart(2, '0')}
            </div>
          ))}
        </div>
      </div>

      {/* Progress card */}
      <div className="rounded-2xl p-4" style={{ background: '#131929' }}>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#e2e8f0' }}>Progress</p>
          <p className="text-xs font-bold" style={{ color: '#7c6fe0' }}>{calledNumbers.length} / 75</p>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#1e2a3a' }}>
          <div className="h-full rounded-full transition-all duration-500"
            style={{ width: ((calledNumbers.length / 75) * 100) + '%', background: 'linear-gradient(90deg,#7c6fe0,#5b4fcf)' }} />
        </div>
      </div>

      {/* Full history */}
      {calledNumbers.length > 0 && (
        <div className="rounded-2xl p-4 flex-1" style={{ background: '#131929' }}>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: '#e2e8f0' }}>All Called</p>
          <div className="flex flex-wrap gap-1.5">
            {[...calledNumbers].reverse().map((n, i) => (
              <span key={i}
                className="text-xs font-bold px-2 py-1 rounded-lg"
                style={{ background: i === 0 ? '#7c6fe0' : '#1e2a3a', color: i === 0 ? '#fff' : '#8892a4' }}>
                {columnLetter(n)}{String(n).padStart(2, '0')}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CallerDisplay;
