
import React from 'react';
import { Role, User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User;
  onToggleRole: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, onToggleRole }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="sticky top-0 z-50 glass shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            IF
          </div>
          <span className="text-xl font-bold text-slate-800 tracking-tight">InternFlow</span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-indigo-600 transition-colors">Find Internships</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">My Applications</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Resources</a>
          </div>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <button 
              onClick={onToggleRole}
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                user.role === Role.RECRUITER || user.role === Role.ADMIN
                  ? 'bg-amber-100 text-amber-700' 
                  : 'bg-indigo-100 text-indigo-700'
              }`}
            >
              {user.role} Mode
            </button>
            <div className="flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-slate-800 leading-none">{user.name}</p>
                <p className="text-xs text-slate-500">{user.email}</p>
              </div>
              <img 
                src={user.profileImage} 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          </div>
        </div>
      </nav>
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="bg-slate-900 text-slate-400 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold">IF</div>
              <span className="text-lg font-bold">InternFlow</span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of tech talent through smart matching and AI-driven growth.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-400">Internships</a></li>
              <li><a href="#" className="hover:text-indigo-400">Companies</a></li>
              <li><a href="#" className="hover:text-indigo-400">Salaries</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-400">Career Blog</a></li>
              <li><a href="#" className="hover:text-indigo-400">Resume Builder</a></li>
              <li><a href="#" className="hover:text-indigo-400">AI Coach</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="text-sm space-y-2">
              <li><a href="#" className="hover:text-indigo-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-indigo-400">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-slate-800 text-center text-xs">
          © {new Date().getFullYear()} InternFlow Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;
