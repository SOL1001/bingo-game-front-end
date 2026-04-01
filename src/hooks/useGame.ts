import { useState, useCallback } from 'react';
import { GameData, newGame, callNumber as apiCallNumber } from '../services/gameApi';

export function useGame() {
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startNewGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await newGame();
      setGame(data);
    } catch {
      setError('Failed to start a new game. Is the server running?');
    } finally {
      setLoading(false);
    }
  }, []);

  const callNext = useCallback(async () => {
    if (!game || game.isWinner) return;
    setCalling(true);
    setError(null);
    try {
      const updated = await apiCallNumber(game._id);
      setGame(updated);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to call number.';
      setError(msg);
    } finally {
      setCalling(false);
    }
  }, [game]);

  return { game, loading, calling, error, startNewGame, callNext };
}
