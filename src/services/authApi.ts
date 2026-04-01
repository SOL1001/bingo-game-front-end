import axios from 'axios';

const api = axios.create({ baseURL: 'https://bingo-back-end-dpn1.vercel.app/api/auth' });

export interface AuthUser {
  id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

export async function register(username: string, email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<{ success: boolean } & AuthResponse>('/register', { username, email, password });
  return data;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const { data } = await api.post<{ success: boolean } & AuthResponse>('/login', { email, password });
  return data;
}
