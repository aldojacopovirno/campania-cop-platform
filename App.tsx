import React, { useState, lazy, Suspense } from 'react';
import Login from './components/Login';
import { UserRole, User, DashboardState } from './types';

const Dashboard = lazy(() => import('./components/Dashboard'));

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dashboardState, setDashboardState] = useState<DashboardState>({
    location: "Napoli, Campania",
    temperature: 32,
    weatherRisk: "moderate",
    healthRisk: "medium"
  });

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const updateDashboardState = (newState: Partial<DashboardState>) => {
    setDashboardState(prev => ({ ...prev, ...newState }));
  };

  return (
    <div className="antialiased text-slate-900 bg-slate-50 min-h-screen">
      {!currentUser ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-[#020617] text-indigo-400">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="font-mono text-sm animate-pulse">CARICAMENTO SISTEMA...</p>
            </div>
          </div>
        }>
          <Dashboard
            user={currentUser}
            onLogout={handleLogout}
            dashboardState={dashboardState}
            onUpdateState={updateDashboardState}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
