import React from 'react';
import { Expert } from '../types';
import { Star, MessageSquare, Clock } from 'lucide-react';

interface ExpertCardProps {
  expert: Expert;
  onBook: (expert: Expert) => void;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onBook }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      <div className="p-6 flex-1">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={expert.avatar} 
              alt={expert.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{expert.name}</h3>
              <p className="text-sm text-slate-500 font-medium">{expert.title}</p>
              <div className="flex items-center space-x-1 text-amber-500 mt-1">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold">{expert.rating}</span>
                <span className="text-xs text-slate-400">({expert.reviewCount} reviews)</span>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-4 text-slate-600 text-sm line-clamp-3 leading-relaxed">
          {expert.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {expert.skills.slice(0, 3).map(skill => (
            <span key={skill} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full">
              {skill}
            </span>
          ))}
          {expert.skills.length > 3 && (
            <span className="px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">
              +{expert.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-slate-400 font-medium uppercase">Rate</span>
          <span className="text-lg font-bold text-slate-900">${expert.hourlyRate}<span className="text-sm text-slate-500 font-normal">/hr</span></span>
        </div>
        <div className="flex space-x-2">
            <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-colors">
                <MessageSquare className="w-5 h-5" />
            </button>
            <button 
            onClick={() => onBook(expert)}
            className="flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
            <Clock className="w-4 h-4" />
            <span>Book</span>
            </button>
        </div>
      </div>
    </div>
  );
};