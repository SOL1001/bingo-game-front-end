import axios from 'axios';

const api = axios.create({ baseURL: '/api/game' });

export interface GameData {
  _id: string;
  board: number[];          // 25 numbers, row-major; 0 = FREE center
  marked: number[];         // indices of marked cells
  calledNumbers: number[];  // numbers called so far
  isWinner: boolean;
  createdAt: string;
}

export async function newGame(): Promise<GameData> {
  const { data } = await api.get<{ success: boolean; data: GameData }>('/new');
  return data.data;
}

/** Ask the caller to draw the next number */
export async function callNumber(gameId: string): Promise<GameData> {
  const { data } = await api.post<{ success: boolean; data: GameData }>('/call', { gameId });
  return data.data;
}

export async function checkWin(gameId: string): Promise<{ isWinner: boolean; game: GameData }> {
  const { data } = await api.post<{ success: boolean; data: { isWinner: boolean; game: GameData } }>('/check', { gameId });
  return data.data;
}
