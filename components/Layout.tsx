import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { UserRole } from '../types';
import { 
  LayoutDashboard, 
  Search, 
  MessageSquare, 
  User, 
  LogOut, 
  Video,
  Menu,
  X,
  CreditCard
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { userRole, toggleRole } = useContext(AppContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Search, label: 'Marketplace', path: '/marketplace' },
    { icon: MessageSquare, label: 'Messages', path: '/messages' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Nexus</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
           <div className="bg-slate-800 rounded-lg p-4 mb-4">
              <p className="text-xs text-slate-400 uppercase font-semibold mb-2">Current Mode</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{userRole === UserRole.CLIENT ? 'Client' : 'Expert'}</span>
                <button 
                  onClick={toggleRole}
                  className="text-xs bg-slate-700 hover:bg-slate-600 text-white px-2 py-1 rounded transition-colors"
                >
                  Switch
                </button>
              </div>
           </div>
           
           <div className="flex items-center p-2 space-x-3 text-slate-400 hover:text-white cursor-pointer transition-colors">
             <LogOut className="w-5 h-5" />
             <span className="text-sm">Log Out</span>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="md:hidden bg-white h-16 border-b flex items-center justify-between px-4">
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">Nexus</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-slate-900 text-white z-50 p-4 shadow-xl md:hidden">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      isActive ? 'bg-indigo-600' : 'text-slate-400'
                    }`
                  }
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
              <button 
                onClick={() => { toggleRole(); setIsMobileMenuOpen(false); }}
                className="flex items-center space-x-3 px-4 py-3 text-slate-400 w-full"
              >
                 <User className="w-5 h-5" />
                 <span>Switch to {userRole === UserRole.CLIENT ? 'Expert' : 'Client'}</span>
              </button>
            </nav>
          </div>
        )}

        <div className="flex-1 overflow-auto p-6 md:p-8">
           {children}
        </div>
      </main>
    </div>
  );
};