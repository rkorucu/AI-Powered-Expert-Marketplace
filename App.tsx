import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserRole } from './types';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Marketplace } from './pages/Marketplace';
import { SessionRoom } from './pages/SessionRoom';
import { UserProfile } from './pages/UserProfile';
import { Messages } from './pages/Messages';

// Simple global state context for the demo
interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  toggleRole: () => void;
}

export const AppContext = React.createContext<AppContextType>({
  userRole: UserRole.CLIENT,
  setUserRole: () => {},
  toggleRole: () => {},
});

const AppContent: React.FC = () => {
  const location = useLocation();
  const isSessionRoom = location.pathname.includes('/session/');

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      {isSessionRoom ? (
        <div className="flex-1 overflow-hidden">
           <Routes>
             <Route path="/session/:id" element={<SessionRoom />} />
           </Routes>
        </div>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Layout>
      )}
    </div>
  );
};

export default function App() {
  const [userRole, setUserRole] = useState<UserRole>(UserRole.CLIENT);

  const toggleRole = () => {
    setUserRole((prev) => (prev === UserRole.CLIENT ? UserRole.EXPERT : UserRole.CLIENT));
  };

  return (
    <AppContext.Provider value={{ userRole, setUserRole, toggleRole }}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </AppContext.Provider>
  );
}