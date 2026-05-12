import React, { useState, useMemo, useEffect } from 'react';
import { Search, Bookmark, ChevronRight, Clock, Target, ArrowLeft } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ALL_GIGS } from '../data/gigs';
import { cn } from '../lib/utils';
import { gigService } from '../services/firestoreService';
import { Gig } from '../types';

export const MarketRegistry: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true);
      try {
        const liveGigs = await gigService.getGigs() || [];
        
        // If the database is underpopulated (less than 10 gigs), 
        // we might want to seed the rest of the catalog in the background
        if (liveGigs.length < 10) {
          // Attempt to seed missing baseline gigs
          try {
            await gigService.seedGigs(ALL_GIGS);
          } catch (seedErr) {
            console.warn("Background seeding failed, using local catalog data", seedErr);
          }
          const refreshed = await gigService.getGigs() || [];
          // If we still have very few gigs (even after seeding attempt), use the local baseline
          setGigs(refreshed.length > 5 ? refreshed : ALL_GIGS as any);
        } else {
          setGigs(liveGigs);
        }
      } catch (error) {
        console.error("Error fetching gigs:", error);
        setGigs(ALL_GIGS as any);
      } finally {
        setLoading(false);
      }
    };

    fetchGigs();
  }, []);

  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(gigs.map(g => g.category).filter(Boolean)));
    return ['All', ...uniqueCats.filter(c => c !== 'All')];
  }, [gigs]);

  const filteredGigs = useMemo(() => {
    if (!gigs) return [];
    return gigs.filter(gig => {
      if (!gig) return false;
      const searchStr = searchQuery.toLowerCase().trim();
      const titleMatches = (gig.title || '').toLowerCase().includes(searchStr);
      const skillsMatch = (gig.skills || []).some(s => s.toLowerCase().includes(searchStr));
      const orgMatches = (gig.org || '').toLowerCase().includes(searchStr);
      
      const matchesSearch = !searchStr || titleMatches || skillsMatch || orgMatches;
      const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, gigs]);

  return (
    <div className="min-h-screen animate-in fade-in duration-700 space-y-12 pb-20">
      {/* Header */}
      <section className="space-y-6">
        <Link to="/" className="flex items-center gap-2 text-slate-700 hover:text-primary transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Dashboard</span>
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter uppercase italic">
            Market<span className="text-primary">place.</span>
          </h1>
          <p className="text-sm text-slate-700 font-medium italic">Comprehensive directory of all available skill-building opportunities.</p>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="space-y-8">
        <div className="relative group">
          <Search className="absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
          <input 
            className="w-full bg-slate-50 border border-slate-100 focus:border-primary/50 rounded-2xl py-3 lg:py-4 pl-12 lg:pl-16 pr-8 shadow-inner transition-all placeholder:text-slate-500 outline-none text-on-surface italic tracking-wide" 
            placeholder="Filter by title, org, or skill..." 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border",
                selectedCategory === cat 
                  ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                  : "bg-white text-slate-600 border-slate-100 hover:border-primary/20 hover:text-on-surface hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Gigs Grid */}
      <section>
        {loading ? (
          <div className="py-32 flex justify-center items-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredGigs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredGigs.map((gig, index) => (
              <motion.div
                key={`${gig.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={`/gig/${gig.id}`}
                  className="bento-card !p-0 overflow-hidden flex flex-col group hover:border-primary/30 transition-all border-slate-100 h-full shadow-sm hover:shadow-2xl bg-white"
                >
                  <div className="h-48 relative overflow-hidden">
                    <img src={gig.image} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" alt="" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>
                    <div className="absolute top-4 left-4 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
                      {gig.type}
                    </div>
                  </div>
                  <div className="p-6 lg:p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-4">
                        <h3 className="text-xl font-black text-on-surface tracking-tight uppercase italic group-hover:text-primary transition-colors underline decoration-primary/10 decoration-2 underline-offset-4">{gig.title}</h3>
                        <div className="text-left sm:text-right">
                          <p className="text-lg font-black text-on-surface tracking-tighter">${gig.price}</p>
                          <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest">Reward</p>
                        </div>
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{gig.org}</p>
                      <p className="text-xs lg:text-sm text-slate-700 mt-4 leading-relaxed line-clamp-2 italic">"{gig.desc}"</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-50">
                      <div className="flex gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
                            <Clock size={14} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{gig.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-slate-50 rounded-lg text-slate-600">
                            <Target size={14} />
                          </div>
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{gig.category}</span>
                        </div>
                      </div>
                      <span className="flex items-center justify-end gap-2 font-black text-[10px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform w-full sm:w-auto">
                        Quick apply <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center text-center space-y-6 bento-card bg-slate-50 border-dashed border-slate-200">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-100">
              <Search size={40} strokeWidth={1} />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-on-surface uppercase italic tracking-tighter">No signals found.</h3>
              <p className="text-slate-500 font-medium italic max-w-sm mx-auto">None of the currently active missions match your search query or category filters.</p>
            </div>
            <button 
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="px-8 py-3 bg-white border border-slate-200 text-primary font-black rounded-xl uppercase text-[10px] tracking-widest hover:bg-slate-50 transition-all shadow-sm active:scale-95 italic"
            >
              Reset Protocol & Show All
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
