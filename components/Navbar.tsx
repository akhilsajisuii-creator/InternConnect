
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  onNavigate: (page: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate }) => {
  const { isAuthenticated, isRecruiter, user, logout } = useAuth();

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b sticky top-0 z-[60]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">IC</div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">InternConnect</span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('home')}
            className="text-slate-600 hover:text-blue-600 font-bold text-sm px-3 py-2 transition-colors"
          >
            Explore
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              {isRecruiter && (
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800"
                >
                  Dashboard
                </button>
              )}
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900">{user?.name}</p>
                <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{user?.role}</p>
              </div>
              <button 
                onClick={() => { logout(); onNavigate('login'); }}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                title="Logout"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => onNavigate('login')}
                className="text-slate-600 hover:text-blue-600 font-bold text-sm px-4 py-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('register')}
                className="bg-blue-600 text-white font-bold text-sm px-5 py-2 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
              >
                Join Now
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
