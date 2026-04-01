import axios from 'axios';

const BASE = 'https://bingo-back-end.onrender.com';

function authHeader() {
  const token = localStorage.getItem('bingo_token');
  return token ? { Authorization: 'Bearer ' + token } : {};
}

export interface GameData {
  _id: string;
  board: number[];
  marked: number[];
  calledNumbers: number[];
  isWinner: boolean;
  coinsSpent: number;
  coinsEarned: number;
  createdAt: string;
}

export interface HistoryItem {
  _id: string;
  isWinner: boolean;
  calledNumbers: number[];
  coinsSpent: number;
  coinsEarned: number;
  createdAt: string;
}

export async function newGame(): Promise<GameData> {
  const { data } = await axios.get<{ success: boolean; data: GameData }>(BASE + '/api/game/new', { headers: authHeader() });
  return data.data;
}

export async function callNumber(gameId: string): Promise<GameData> {
  const { data } = await axios.post<{ success: boolean; data: GameData }>(BASE + '/api/game/call', { gameId }, { headers: authHeader() });
  return data.data;
}

export async function checkWin(gameId: string): Promise<{ isWinner: boolean; game: GameData }> {
  const { data } = await axios.post<{ success: boolean; data: { isWinner: boolean; game: GameData } }>(BASE + '/api/game/check', { gameId }, { headers: authHeader() });
  return data.data;
}

export async function getHistory(): Promise<HistoryItem[]> {
  const { data } = await axios.get<{ success: boolean; data: HistoryItem[] }>(BASE + '/api/game/history', { headers: authHeader() });
  return data.data;
}

export async function addCoins(): Promise<number> {
  const { data } = await axios.post<{ success: boolean; coins: number }>(BASE + '/api/game/coins/add', {}, { headers: authHeader() });
  return data.coins;
}

export async function getProfile(): Promise<{ id: string; username: string; email: string; coins: number; gamesPlayed: number; gamesWon: number }> {
  const { data } = await axios.get<{ success: boolean; user: { id: string; username: string; email: string; coins: number; gamesPlayed: number; gamesWon: number } }>(BASE + '/api/auth/me', { headers: authHeader() });
  return data.user;
}
