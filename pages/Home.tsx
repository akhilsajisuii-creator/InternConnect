
import React, { useState, useEffect } from 'react';
import { internshipService } from '../services/api';
import { Internship } from '../types';
import InternshipCard from '../components/InternshipCard';

const Home: React.FC = () => {
  const [jobs, setJobs] = useState<Internship[]>([]);
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Internship | null>(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    const res = await internshipService.getAll();
    if (res.success) setJobs(res.data || []);
    setLoading(false);
  };

  const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));

  const filtered = jobs.filter(j => {
    const matchesSearch = j.title.toLowerCase().includes(search.toLowerCase()) || 
                          j.companyName.toLowerCase().includes(search.toLowerCase()) ||
                          j.industry.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = locationFilter === 'All' || j.location === locationFilter;
    const matchesType = typeFilter === 'All' || j.type === typeFilter;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="bg-indigo-600 -mx-4 -mt-8 py-20 px-4 text-center text-white rounded-b-[4rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tighter">Dream Internships. <span className="text-indigo-200 underline decoration-indigo-400">Simplified.</span></h1>
          <p className="text-indigo-100 max-w-2xl mx-auto text-lg mb-12 font-medium">
            Connect with industry leaders and innovative startups looking for your unique skills.
          </p>
          
          <div className="max-w-5xl mx-auto bg-white p-3 rounded-3xl shadow-2xl flex flex-col lg:flex-row gap-3">
            <div className="flex-1 flex items-center px-4 bg-slate-50 rounded-2xl border border-slate-100">
              <svg className="w-5 h-5 text-slate-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              <input 
                type="text" 
                placeholder="Search by role, company or industry..." 
                className="w-full py-4 bg-transparent text-slate-800 focus:outline-none font-medium"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                className="px-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl focus:outline-none border border-slate-100 min-w-[160px]"
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
              >
                <option value="All">All Locations</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
              <select 
                className="px-6 py-4 bg-slate-50 text-slate-600 font-bold rounded-2xl focus:outline-none border border-slate-100 min-w-[160px]"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value)}
              >
                <option value="All">All Types</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Latest Opportunities</h2>
        <span className="text-slate-400 text-sm font-semibold">{filtered.length} internships found</span>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map(i => <div key={i} className="h-72 bg-white rounded-3xl animate-pulse shadow-sm"></div>)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(job => (
            <div key={job.id} onClick={() => setSelectedJob(job)} className="cursor-pointer transform hover:-translate-y-1 transition-transform">
              <InternshipCard internship={job} />
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-24 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-xl font-bold text-slate-400">No matching internships found.</p>
              <button onClick={() => {setSearch(''); setLocationFilter('All'); setTypeFilter('All');}} className="mt-4 text-indigo-600 font-bold hover:underline">Clear all filters</button>
            </div>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="relative h-48 bg-indigo-600">
              <button 
                onClick={() => setSelectedJob(null)}
                className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-xl transition-all z-20"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <div className="absolute -bottom-12 left-10 p-2 bg-white rounded-2xl shadow-xl">
                <img src={selectedJob.companyLogo} className="w-24 h-24 rounded-xl object-cover" alt="Logo" />
              </div>
            </div>
            <div className="px-10 pt-16 pb-12">
              <div className="mb-8">
                <h2 className="text-4xl font-black text-slate-900 mb-2 leading-tight">{selectedJob.title}</h2>
                <p className="text-indigo-600 font-bold text-lg">{selectedJob.companyName} • {selectedJob.location}</p>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Stipend</p>
                  <p className="font-bold text-slate-900">{selectedJob.stipend}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Duration</p>
                  <p className="font-bold text-slate-900">{selectedJob.duration}</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 col-span-2 sm:col-span-1">
                  <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Work Type</p>
                  <p className="font-bold text-slate-900">{selectedJob.type}</p>
                </div>
              </div>

              <div className="mb-10">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Job Description</h4>
                <p className="text-slate-600 leading-relaxed text-sm font-medium whitespace-pre-wrap">{selectedJob.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-12">
                {selectedJob.skills.map(s => (
                  <span key={s} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-widest rounded-xl border border-indigo-100">{s}</span>
                ))}
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]">
                Start Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
