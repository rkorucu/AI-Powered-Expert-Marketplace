import React, { useState } from 'react';
import { Search, Sparkles, Filter, X } from 'lucide-react';
import { MOCK_EXPERTS } from '../constants';
import { ExpertCard } from '../components/ExpertCard';
import { findBestMatches } from '../services/geminiService';
import { Expert } from '../types';
import { BookingModal } from '../components/BookingModal';

export const Marketplace: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMatching, setIsMatching] = useState(false);
  const [filteredExperts, setFilteredExperts] = useState<Expert[]>(MOCK_EXPERTS);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
        setFilteredExperts(MOCK_EXPERTS);
        setActiveFilter(null);
        return;
    }

    setIsMatching(true);
    setActiveFilter('AI Matched');
    
    // Call Gemini Service
    try {
        const matchedIds = await findBestMatches(searchQuery, MOCK_EXPERTS);
        const matches = MOCK_EXPERTS.filter(ex => matchedIds.includes(ex.id));
        // Sort matches based on the order returned by AI
        matches.sort((a, b) => matchedIds.indexOf(a.id) - matchedIds.indexOf(b.id));
        setFilteredExperts(matches);
    } catch (err) {
        console.error(err);
        // Fallback simple search
        const lowerQ = searchQuery.toLowerCase();
        setFilteredExperts(MOCK_EXPERTS.filter(ex => 
            ex.name.toLowerCase().includes(lowerQ) || 
            ex.skills.some(s => s.toLowerCase().includes(lowerQ))
        ));
    } finally {
        setIsMatching(false);
    }
  };

  const clearFilter = () => {
    setSearchQuery('');
    setFilteredExperts(MOCK_EXPERTS);
    setActiveFilter(null);
  }

  const handleBook = (expert: Expert) => {
      setSelectedExpert(expert);
      setIsBookingOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Find an Expert</h1>
           <p className="text-slate-500 mt-1">Describe what you need, and our AI will find the perfect match.</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="E.g., 'I need help preparing for a Calculus exam next week' or 'Looking for a nutrition plan'"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <button 
                type="submit"
                disabled={isMatching}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isMatching ? (
                    <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     <span>Analyzing...</span>
                    </>
                ) : (
                    <>
                     <Sparkles className="w-5 h-5" />
                     <span>AI Match</span>
                    </>
                )}
            </button>
        </form>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-800">
              {activeFilter ? `Top Matches for "${searchQuery}"` : 'Recommended Experts'}
          </h2>
          {activeFilter && (
              <button onClick={clearFilter} className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center">
                  <X className="w-4 h-4 mr-1" /> Clear Search
              </button>
          )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {filteredExperts.map(expert => (
             <ExpertCard key={expert.id} expert={expert} onBook={handleBook} />
         ))}
      </div>

      {filteredExperts.length === 0 && (
          <div className="text-center py-20">
              <p className="text-slate-400 text-lg">No experts found. Try a different query.</p>
          </div>
      )}

      {/* Booking Modal */}
      <BookingModal 
        expert={selectedExpert} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </div>
  );
};
