
import React from 'react';
import { Job, Role } from '../types';

interface JobCardProps {
  job: Job;
  userRole: Role;
  onEdit?: (job: Job) => void;
  onDelete?: (id: string) => void;
  onView?: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, userRole, onEdit, onDelete, onView }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-4">
          <img 
            src={job.companyLogo} 
            alt={job.companyName} 
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-slate-500 font-medium">{job.companyName}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
          job.type === 'Remote' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
        }`}>
          {job.type}
        </span>
      </div>
      
      <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-grow">
        {job.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {job.skills.map(skill => (
          <span key={skill} className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-semibold rounded">
            {skill}
          </span>
        ))}
      </div>
      
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {job.location}
        </span>
        
        <div className="flex gap-2">
          {userRole === Role.RECRUITER || userRole === Role.ADMIN ? (
            <>
              <button 
                onClick={() => onEdit?.(job)}
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button 
                onClick={() => onDelete?.(job.id)}
                className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          ) : (
            <button 
              onClick={() => onView?.(job)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors shadow-sm"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobCard;
