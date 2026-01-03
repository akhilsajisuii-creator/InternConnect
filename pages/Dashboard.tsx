
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { internshipService } from '../services/api';
import { Internship } from '../types';

interface DashboardProps {
  onNavigate: (page: string, id?: string | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const res = await internshipService.getAll();
    if (res.success) {
      // In a real app, we would filter by createdBy
      setJobs(res.data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this listing permanently? All applications will be lost.')) return;
    const res = await internshipService.delete(id, user?.token || '');
    if (res.success) {
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 mb-1 tracking-tight">Management Hub</h1>
          <p className="text-slate-500 font-medium">Control your active internship listings and monitor growth.</p>
        </div>
        <button 
          onClick={() => onNavigate('add')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest px-10 py-5 rounded-[1.75rem] shadow-2xl shadow-indigo-100 flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02]"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          New Internship
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Live Postings</p>
          <p className="text-5xl font-black text-slate-900">{jobs.length}</p>
        </div>
        <div className="bg-indigo-600 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-100 text-white transform hover:scale-[1.02] transition-all">
          <p className="text-[10px] text-indigo-200 font-black uppercase tracking-widest mb-2">Potential Talent</p>
          <p className="text-5xl font-black">240+</p>
        </div>
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all hover:shadow-xl">
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Engagements</p>
          <p className="text-5xl font-black text-slate-900">1.8k</p>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] border border-slate-100 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-100">
                <th className="px-10 py-7 text-[10px] font-black text-slate-400 uppercase tracking-widest">Job Identity</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-400 uppercase tracking-widest">Compensation</th>
                <th className="px-10 py-7 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobs.map(job => (
                <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-10 py-7">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center p-2 border border-slate-200">
                        <img src={job.companyLogo} className="w-full h-full object-contain" alt="Logo" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-lg leading-tight">{job.title}</p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{job.companyName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-7">
                    <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${
                      job.type === 'Remote' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                    }`}>{job.type}</span>
                  </td>
                  <td className="px-10 py-7 text-sm font-black text-slate-800">
                    {job.stipend}
                  </td>
                  <td className="px-10 py-7 text-right">
                    <div className="flex justify-end gap-3">
                      <button 
                        onClick={() => onNavigate('edit', job.id)}
                        className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-100"
                        title="Edit Listing"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(job.id)}
                        className="p-3 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all shadow-sm bg-white border border-slate-100"
                        title="Delete Listing"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {jobs.length === 0 && !loading && (
                <tr>
                  <td colSpan={4} className="px-10 py-32 text-center text-slate-300">
                    <div className="flex flex-col items-center">
                      <svg className="w-20 h-20 mb-4 opacity-10" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                      <p className="italic text-lg font-medium">No active internship postings. Build something great!</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
