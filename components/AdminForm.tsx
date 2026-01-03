
import React, { useState, useEffect } from 'react';
import { Job } from '../types';
import { generateJobDescription } from '../services/geminiService';

interface AdminFormProps {
  initialJob?: Job | null;
  onSave: (job: Partial<Job>) => void;
  onCancel: () => void;
}

const AdminForm: React.FC<AdminFormProps> = ({ initialJob, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Partial<Job>>({
    title: '',
    companyName: '',
    description: '',
    industry: '',
    type: 'Internship',
    location: '',
    skills: [],
    companyLogo: `https://picsum.photos/seed/${Math.random()}/100/100`
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (initialJob) {
      setFormData(initialJob);
    }
  }, [initialJob]);

  const handleAIHelp = async () => {
    if (!formData.title || !formData.industry) {
      alert("Please fill in Role Title and Industry first for AI generation.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateJobDescription(
      formData.title || '', 
      formData.industry || '', 
      formData.skills || []
    );
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...(prev.skills || []), skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills?.filter(s => s !== skillToRemove) }));
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl max-w-2xl mx-auto border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">
        {initialJob ? 'Edit Internship' : 'Post New Internship'}
      </h2>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Internship Title</label>
            <input 
              type="text"
              value={formData.title}
              onChange={e => setFormData({...formData, title: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Software Engineer Intern"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Company Name</label>
            <input 
              type="text"
              value={formData.companyName}
              onChange={e => setFormData({...formData, companyName: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Acme Corp"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Industry</label>
            <input 
              type="text"
              value={formData.industry}
              onChange={e => setFormData({...formData, industry: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Technology"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
            <input 
              type="text"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Remote or San Francisco"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-semibold text-slate-700">Job Description</label>
            <button 
              type="button"
              onClick={handleAIHelp}
              disabled={isGenerating}
              className="text-xs font-bold text-indigo-600 flex items-center gap-1 hover:text-indigo-800 disabled:opacity-50"
            >
              <svg className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isGenerating ? 'AI Generating...' : 'Magic Write with AI'}
            </button>
          </div>
          <textarea 
            rows={5}
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none"
            placeholder="Describe the role, responsibilities, and perks..."
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Required Skills</label>
          <div className="flex gap-2 mb-2">
            <input 
              type="text"
              value={skillInput}
              onChange={e => setSkillInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addSkill()}
              className="flex-1 px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="e.g. Python, React..."
            />
            <button 
              onClick={addSkill}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.skills?.map(skill => (
              <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-full flex items-center gap-1">
                {skill}
                <button onClick={() => removeSkill(skill)} className="hover:text-rose-600 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button 
            onClick={() => onSave(formData)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200"
          >
            {initialJob ? 'Update Internship' : 'Publish Internship'}
          </button>
          <button 
            onClick={onCancel}
            className="px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminForm;
