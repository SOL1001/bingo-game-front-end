import React, { useState, useEffect, useCallback } from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import GamePage from './pages/GamePage';
import HistoryPage from './pages/HistoryPage';
import RewardsPage from './pages/RewardsPage';
import ProfilePage from './pages/ProfilePage';
import NavBar from './components/NavBar';
import { getProfile } from './services/gameApi';

type Page = 'play' | 'history' | 'rewards' | 'profile';

function AppInner() {
  const { user, loading } = useAuth();
  const [page, setPage] = useState<Page>('play');
  const [coins, setCoins] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [gamesWon, setGamesWon] = useState(0);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    try {
      const p = await getProfile();
      setCoins(p.coins);
      setGamesPlayed(p.gamesPlayed);
      setGamesWon(p.gamesWon);
    } catch { /* silent */ }
  }, [user]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  // Redirect guests away from auth-only pages
  const safePage: Page = !user && (page === 'history' || page === 'rewards' || page === 'profile') ? 'play' : page;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0F2027' }}>
        <span className="text-lg font-semibold animate-pulse" style={{ color: '#00FFD1' }}>Loading...</span>
      </div>
    );
  }

  return (
    <div style={{ background: '#0d1117', minHeight: '100vh' }}>
      <NavBar current={safePage} onChange={setPage} coins={coins} user={user} />
      <div className="pt-14">
        {safePage === 'play'    && <GamePage onGameEnd={refreshProfile} />}
        {safePage === 'history' && <HistoryPage />}
        {safePage === 'rewards' && <RewardsPage coins={coins} gamesPlayed={gamesPlayed} gamesWon={gamesWon} />}
        {safePage === 'profile' && <ProfilePage coins={coins} gamesPlayed={gamesPlayed} gamesWon={gamesWon} />}
      </div>
    </div>
  );
}

const App: React.FC = () => (
  <AuthProvider>
    <AppInner />
  </AuthProvider>
);

export default App;
