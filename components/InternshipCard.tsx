
import React from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ internship, onEdit, onDelete, isAdmin }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-xl hover:border-blue-200 transition-all group relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 p-4">
        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          internship.location.toLowerCase().includes('remote') 
          ? 'bg-emerald-50 text-emerald-600' 
          : 'bg-blue-50 text-blue-600'
        }`}>
          {internship.location}
        </span>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
          {internship.title}
        </h3>
        <p className="text-sm font-semibold text-slate-500">{internship.companyName}</p>
      </div>

      <div className="flex gap-4 mb-6 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {internship.stipend}
        </div>
        <div className="flex items-center gap-1">
          <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {internship.duration}
        </div>
      </div>

      <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow leading-relaxed">
        {internship.description}
      </p>

      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {internship.skills.slice(0, 2).map(skill => (
            <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded">
              {skill}
            </span>
          ))}
          {internship.skills.length > 2 && <span className="text-[10px] text-slate-400">+{internship.skills.length - 2} more</span>}
        </div>

        {isAdmin ? (
          <div className="flex gap-2">
            <button onClick={() => onEdit?.(internship.id)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button onClick={() => onDelete?.(internship.id)} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ) : (
          <button className="text-blue-600 text-sm font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details 
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default InternshipCard;
