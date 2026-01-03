
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { internshipService } from '../services/api';
import { generateJobDescription } from '../services/geminiService';
import { Internship } from '../types';

interface ManageProps {
  internshipId?: string;
  onNavigate: (page: string) => void;
}

const ManageInternship: React.FC<ManageProps> = ({ internshipId, onNavigate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [formData, setFormData] = useState<Partial<Internship>>({
    title: '',
    companyName: '',
    location: '',
    stipend: '',
    duration: '',
    description: '',
    skills: [],
    industry: '',
    type: 'Remote'
  });
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (internshipId) {
      fetchItem();
    }
  }, [internshipId]);

  const fetchItem = async () => {
    const res = await internshipService.getById(internshipId!);
    if (res.success && res.data) setFormData(res.data);
  };

  const handleAISuggest = async () => {
    if (!formData.title || !formData.industry) {
      alert('Required: Role Title and Industry are needed for the AI hiring manager.');
      return;
    }
    setAiGenerating(true);
    const desc = await generateJobDescription(formData.title, formData.industry, formData.skills || []);
    setFormData(prev => ({ ...prev, description: desc }));
    setAiGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = internshipId 
      ? await internshipService.update(internshipId, formData, user?.token || '')
      : await internshipService.create({ ...formData, createdBy: user?.id }, user?.token || '');
    
    if (res.success) {
      onNavigate('dashboard');
    } else {
      alert(res.message);
    }
    setLoading(false);
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (skill && !formData.skills?.includes(skill)) {
      setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), skill] }));
      setSkillInput('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in zoom-in-95 duration-500 pb-20">
      <div className="flex items-center gap-6 mb-12">
        <button onClick={() => onNavigate('dashboard')} className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
           <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">
            {internshipId ? 'Refine Listing' : 'Publish Opportunity'}
          </h1>
          <p className="text-slate-500 font-medium">Standardize the expectations for your new intern.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[3rem] border border-slate-100 p-12 shadow-2xl space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Role Title</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
              placeholder="e.g. Backend Engineering Intern"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
              placeholder="e.g. Acme Corp"
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Global Industry</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
              placeholder="e.g. Fintech / Web3"
              value={formData.industry}
              onChange={e => setFormData({...formData, industry: e.target.value})}
            />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Office Location</label>
            <input 
              required
              type="text" 
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
              placeholder="e.g. Remote / Bangalore"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monthly Stipend</label>
              <input 
                required
                type="text" 
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
                placeholder="e.g. 35k/mo"
                value={formData.stipend}
                onChange={e => setFormData({...formData, stipend: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contract Length</label>
              <input 
                required
                type="text" 
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800"
                placeholder="e.g. 6 Months"
                value={formData.duration}
                onChange={e => setFormData({...formData, duration: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Working Model</label>
              <select 
                className="w-full px-6 py-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-bold text-slate-800 bg-white"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mission & Description</label>
            <button 
              type="button"
              onClick={handleAISuggest}
              disabled={aiGenerating}
              className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-100 disabled:opacity-50 transition-all shadow-sm"
            >
              <svg className={`w-4 h-4 ${aiGenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              {aiGenerating ? 'Processing...' : 'Auto-Draft with AI'}
            </button>
          </div>
          <textarea 
            required
            rows={8}
            className="w-full px-6 py-5 rounded-[2rem] border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none font-medium text-slate-600"
            placeholder="What will this intern accomplish? What is the daily workflow?"
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Key Skill Requirements</label>
          <div className="flex gap-3">
            <input 
              type="text" 
              className="flex-1 px-6 py-4 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-bold"
              placeholder="Add a skill..."
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            />
            <button type="button" onClick={addSkill} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Add Skill</button>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {formData.skills?.map(s => (
              <span key={s} className="px-5 py-2.5 bg-indigo-50 text-indigo-600 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 border border-indigo-100 transition-all hover:border-indigo-300">
                {s}
                <button type="button" onClick={() => setFormData(p => ({...p, skills: p.skills?.filter(sk => sk !== s)}))} className="hover:text-rose-600 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black uppercase tracking-widest py-6 rounded-[2rem] shadow-2xl shadow-indigo-100 transition-all transform hover:scale-[1.01] active:scale-[0.98]"
        >
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto"></div> : (internshipId ? 'Update Role Requirements' : 'Go Live with Internship')}
        </button>
      </form>
    </div>
  );
};

export default ManageInternship;
