import { useState, useCallback } from 'react';
import axios from 'axios';
import { GameData, newGame, callNumber as apiCallNumber, addCoins as apiAddCoins } from '../services/gameApi';

export function useGame() {
  const [game, setGame] = useState<GameData | null>(null);
  const [loading, setLoading] = useState(false);
  const [calling, setCalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noCoins, setNoCoins] = useState(false);
  const [addingCoins, setAddingCoins] = useState(false);

  // Always allowed — works for guests too
  const startNewGame = useCallback(async () => {
    setLoading(true);
    setError(null);
    setNoCoins(false);
    try {
      const data = await newGame();
      setGame(data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message === 'Not enough coins to start a game') {
        setNoCoins(true);
      } else {
        setError('Failed to start a new game. Is the server running?');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Requires auth — caller handles showing modal if not logged in
  const callNext = useCallback(async () => {
    if (!game || game.isWinner) return;
    setCalling(true);
    setError(null);
    try {
      const updated = await apiCallNumber(game._id);
      setGame(updated);
    } catch (err: unknown) {
      const msg = axios.isAxiosError(err) ? err.response?.data?.message : 'Failed to call number.';
      setError(msg || 'Failed to call number.');
    } finally {
      setCalling(false);
    }
  }, [game]);

  const topUpCoins = useCallback(async (onSuccess: () => void) => {
    setAddingCoins(true);
    try {
      await apiAddCoins();
      setNoCoins(false);
      onSuccess();
      await startNewGame();
    } catch {
      setError('Failed to add coins.');
    } finally {
      setAddingCoins(false);
    }
  }, [startNewGame]);

  return { game, loading, calling, error, noCoins, addingCoins, startNewGame, callNext, topUpCoins };
}
