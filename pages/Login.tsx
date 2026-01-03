
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await authService.login(email, password);
    if (res.success && res.data) {
      login(res.data);
      onNavigate('home');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-20 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h1>
          <p className="text-slate-500">Login to your InternConnect account</p>
        </div>

        {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-xl text-sm font-medium">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="name@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">Password</label>
            <input 
              required
              type="password" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-100 transition-all flex items-center justify-center"
          >
            {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-500">
          Don't have an account? <button onClick={() => onNavigate('register')} className="text-blue-600 font-bold hover:underline">Register here</button>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-xl text-[11px] text-blue-700 leading-relaxed">
          <strong>Tip:</strong> Register as an <b>Admin</b> to post new internships, or a <b>User</b> to browse only.
        </div>
      </div>
    </div>
  );
};

export default Login;
