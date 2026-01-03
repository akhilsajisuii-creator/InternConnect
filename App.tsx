
import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ManageInternship from './pages/ManageInternship';

const AppContent: React.FC = () => {
  const { isAuthenticated, isRecruiter } = useAuth();
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register' | 'dashboard' | 'add' | 'edit'>('home');
  const [activeInternshipId, setActiveInternshipId] = useState<string | null>(null);

  const navigate = (page: any, id: string | null = null) => {
    // Role-based route protection
    if ((page === 'dashboard' || page === 'add' || page === 'edit') && !isRecruiter) {
      setCurrentPage('home');
      return;
    }
    if ((page === 'login' || page === 'register') && isAuthenticated) {
      setCurrentPage('home');
      return;
    }
    setCurrentPage(page);
    if (id) setActiveInternshipId(id);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar onNavigate={navigate} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {currentPage === 'home' && <Home />}
        {currentPage === 'login' && <Login onNavigate={navigate} />}
        {currentPage === 'register' && <Register onNavigate={navigate} />}
        {currentPage === 'dashboard' && <Dashboard onNavigate={navigate} />}
        {currentPage === 'add' && <ManageInternship onNavigate={navigate} />}
        {currentPage === 'edit' && activeInternshipId && (
          <ManageInternship internshipId={activeInternshipId} onNavigate={navigate} />
        )}
      </main>

      <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} InternFlow. Designed for excellence.
      </footer>
    </div>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <AppContent />
  </AuthProvider>
);

export default App;
