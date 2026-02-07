import React, { useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserRole, User, DashboardState } from './types';

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
        <Dashboard
          user={currentUser}
          onLogout={handleLogout}
          dashboardState={dashboardState}
          onUpdateState={updateDashboardState}
        />
      )}
    </div>
  );
}

export default App;
