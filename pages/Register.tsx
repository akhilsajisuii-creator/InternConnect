
import React, { useState } from 'react';
import { authService } from '../services/api';
import { Role } from '../types';

interface RegisterProps {
  onNavigate: (page: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: Role.APPLICANT });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await authService.register(formData.name, formData.email, formData.password, formData.role);
    if (res.success) {
      alert('Registration successful! Welcome to InternFlow.');
      onNavigate('login');
    } else {
      setError(res.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto py-12 animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-indigo-600 rounded-3xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-xl shadow-indigo-100">IF</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium">Join the next generation of talent.</p>
        </div>

        {error && <div className="mb-6 p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl text-sm font-bold">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
            <input 
              required
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
              placeholder="Alex Rivera"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
            <input 
              required
              type="email"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Password</label>
            <input 
              required
              type="password"
              className="w-full px-5 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none font-medium transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Account Type</label>
            <div className="grid grid-cols-2 gap-4">
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: Role.APPLICANT})}
                className={`py-4 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${formData.role === Role.APPLICANT ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
              >
                Applicant
              </button>
              <button 
                type="button"
                onClick={() => setFormData({...formData, role: Role.RECRUITER})}
                className={`py-4 rounded-2xl border-2 font-black text-xs uppercase tracking-widest transition-all ${formData.role === Role.RECRUITER ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200'}`}
              >
                Recruiter
              </button>
            </div>
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Register Account'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account? <button onClick={() => onNavigate('login')} className="text-indigo-600 font-bold hover:underline">Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
