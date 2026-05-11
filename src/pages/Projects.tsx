import React, { useState, useMemo } from 'react';
import { 
  Clock, 
  MapPin, 
  Search, 
  Filter, 
  ChevronRight, 
  Sparkles,
  Zap,
  Bookmark,
  Info,
  LayoutDashboard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ALL_GIGS } from '../data/gigs';

export const Projects: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredBadge, setHoveredBadge] = useState<number | null>(null);

  const getMatchPercentage = (id: number) => {
    const matches = [94, 88, 92, 85, 90, 82, 96, 89];
    return matches[id % matches.length];
  };

  const getReasoning = (gig: any) => {
    const match = getMatchPercentage(gig.id);
    const base = `Based on your recent skill node validations, this ${gig.category.toLowerCase()} project aligns with your verified growth path. `;
    
    if (gig.category === 'Engineering') {
      return base + `Your high proficiency in algorithm design and system logic matches the technical complexity required for this mission. We've identified a ${match}% overlap between your technical profile and this specific deployment.`;
    }
    if (gig.category === 'Design') {
      return base + `The aesthetic requirements and UX challenges presented here directly engage your top-tier creative attributes. Your previous successful completions in visual architecture suggest you'll deliver exceptional results for this brief.`;
    }
    return base + `Your demonstrated capability in strategic analysis and professional communication makes you a prime candidate for this project. The scope is uniquely tailored to build upon your existing professional verified record.`;
  };

  const featuredGig = useMemo(() => {
    return ALL_GIGS.find(g => g.id === 11);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(ALL_GIGS.map(g => g.category))];
  }, []);

  const filteredGigs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    return ALL_GIGS.filter(gig => {
      const matchesSearch = query === '' || 
                          gig.title.toLowerCase().includes(query) ||
                          gig.org.toLowerCase().includes(query) ||
                          gig.category.toLowerCase().includes(query) ||
                          gig.skills.some(s => s.toLowerCase().includes(query)) ||
                          gig.desc.toLowerCase().includes(query);
      const matchesCategory = selectedCategory === 'All' || gig.category === selectedCategory;
      return matchesSearch && matchesCategory && gig.id !== 11; // Exclude featured gig from grid
    });
  }, [searchQuery, selectedCategory]);

  const showFeatured = useMemo(() => {
    if (searchQuery.trim() !== '' || selectedCategory !== 'All') return false;
    return true;
  }, [searchQuery, selectedCategory]);

  const activeMissions = [
    { id: 1, title: 'Strategic Analysis', org: 'Nexus Data', progress: 65 },
    { id: 2, title: 'UX Research', org: 'EcoFlow', progress: 24 },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000 overflow-x-hidden w-full">
      {/* Header with Search & Filter */}
      <div className="space-y-8 px-4 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-7xl font-extrabold text-on-surface tracking-tighter uppercase italic leading-none">
              My <span className="text-primary underline decoration-primary/20 underline-offset-8">Projects.</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] italic mt-2">Verified Skill-Match Corridor • Session: Active</p>
          </div>

          <div className="space-y-4 w-full md:w-auto overflow-hidden">
            <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">ACTIVE Projects</h3>
            {/* Active Missions Quick Access */}
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-1 scroll-smooth">
              {activeMissions.map((mission) => (
              <Link 
                key={mission.id}
                to={`/application/${mission.id}/dashboard`}
                className="flex-shrink-0 w-64 p-5 bg-white border border-slate-100 hover:border-primary/30 rounded-2xl transition-all group relative overflow-hidden shadow-sm"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full flex items-center justify-center translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform">
                  <LayoutDashboard size={14} className="text-primary mt-4 mr-4" />
                </div>
                <div className="space-y-3 relative z-10">
                  <div className="flex justify-between items-start">
                    <h4 className="text-sm font-bold text-on-surface tracking-tight uppercase line-clamp-1 group-hover:text-primary transition-colors">{mission.title}</h4>
                  </div>
                  <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">{mission.org}</p>
                  <div className="space-y-1.5 focus-zone">
                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-slate-600">
                      <span>Sync Status</span>
                      <span className="text-primary">{mission.progress}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-[1px]">
                      <div className="h-full bg-primary rounded-full" style={{ width: `${mission.progress}%` }}></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-8 px-4 lg:px-0">
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-96 group">
              <Search className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Query opportunities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 md:pl-16 pr-4 md:pr-6 py-4 md:py-5 bg-white border border-slate-100 rounded-2xl shadow-sm outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all text-sm font-bold tracking-tight text-on-surface placeholder:text-slate-400 italic"
              />
            </div>
            <button className="p-4 md:p-5 bg-white border border-slate-100 rounded-2xl shadow-sm text-slate-600 hover:text-primary transition-all active:scale-90 group h-fit self-center">
               <Filter size={20} className="md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Featured Insight Card */}
      {featuredGig && showFeatured && (
        <section className="mx-4 lg:mx-0 bento-card !p-0 bg-[#f0f4ff] min-h-[300px] md:min-h-[400px] flex items-center relative overflow-hidden group border-primary/10 shadow-sm">
          <div className="p-6 md:p-10 lg:p-16 relative z-10 max-w-2xl space-y-6 md:space-y-8">
             <div className="flex items-center gap-4 px-4 py-1.5 bg-white border border-primary/20 text-primary rounded-full w-fit font-bold text-[8px] md:text-[10px] uppercase tracking-widest shadow-sm">
                <Zap size={12} className="md:w-3.5 md:h-3.5 fill-primary" /> HIGH PRIORITY GIG
             </div>
             <h3 className="text-3xl md:text-4xl lg:text-7xl font-black text-on-surface leading-none tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">
               {featuredGig.title.split(' ').slice(0, 2).join(' ')} <br className="hidden md:block" />
               <span className="text-primary"> {featuredGig.title.split(' ').slice(2).join(' ')}.</span>
             </h3>
             <p className="text-sm md:text-lg lg:text-xl text-slate-500 font-medium leading-relaxed italic opacity-90">{featuredGig.desc} <Link to={`/gig/${featuredGig.id}`} className="font-bold text-on-surface border-b-2 border-primary hover:text-primary cursor-pointer transition-colors not-italic whitespace-nowrap">Quick apply.</Link></p>
             <div className="flex flex-wrap gap-4 md:gap-8 items-center bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl w-fit border border-slate-100 shadow-md">
               <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-xl text-primary">
                    <Clock size={16} className="md:w-5 md:h-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-600 uppercase tracking-widest">Temporal: {featuredGig.duration}</span>
               </div>
               <div className="hidden md:block w-px h-8 bg-slate-100"></div>
               <div className="text-lg md:text-2xl font-black text-on-surface tracking-tighter uppercase">{featuredGig.type}</div>
             </div>
          </div>
          
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          <Sparkles className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 text-primary/10 scale-[3] md:scale-[5] group-hover:rotate-12 transition-transform duration-[4s] pointer-events-none" size={400} />
        </section>
      )}

      {/* Recommended for you title */}
      <div className="space-y-6">
        <div className="flex justify-between items-end px-4">
          <h3 className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">
            {searchQuery.trim() !== '' ? `Search Results (${filteredGigs.length})` : 'Recommended for you'}
          </h3>
          {searchQuery.trim() !== '' && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline underline-offset-4 decoration-2"
            >
              Clear Search
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-3 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border shadow-sm",
                selectedCategory === cat 
                  ? "bg-primary/10 text-primary border-primary/20 shadow-sm scale-105" 
                  : "bg-white text-slate-600 border-slate-100 hover:border-primary/20 hover:text-on-surface hover:bg-slate-50"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gig List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-0">
        {filteredGigs.length > 0 ? (
          filteredGigs.map((gig) => (
            <Link 
              key={gig.id} 
              to={`/gig/${gig.id}`}
              className="bento-card !p-0 flex flex-col group hover:translate-y-[-8px] transition-all duration-700 h-full border-slate-100 hover:border-primary/30 hover:shadow-2xl overflow-hidden mx-4 md:mx-0"
            >
              <div className="h-48 md:h-56 relative">
                 <div className="absolute inset-0 overflow-hidden">
                   <img src={gig.image} alt={gig.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3s]" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>
                 <div className="absolute top-6 right-6">
                   <button className="bg-white/90 backdrop-blur-md p-3 rounded-2xl text-slate-700 hover:text-primary hover:bg-white transition-all shadow-xl active:scale-95 border border-slate-100" onClick={(e) => { e.preventDefault(); /* Bookmark logic */ }}>
                      <Bookmark size={18} />
                   </button>
                 </div>
                 <div 
                   className="absolute bottom-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-md text-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-2xl flex items-center gap-2 cursor-help group/badge z-20 border border-slate-200"
                   onMouseEnter={() => setHoveredBadge(gig.id)}
                   onMouseLeave={() => setHoveredBadge(null)}
                 >
                   {getMatchPercentage(gig.id)}% Match
                   <Info size={12} className="opacity-60" />
                   
                   <AnimatePresence>
                     {hoveredBadge === gig.id && (
                       <motion.div 
                         initial={{ opacity: 0, y: 10, scale: 0.95 }}
                         animate={{ opacity: 1, y: 0, scale: 1 }}
                         exit={{ opacity: 0, y: 10, scale: 0.95 }}
                         className="absolute bottom-full left-0 mb-4 w-72 p-6 bg-white border border-slate-100 rounded-[2rem] shadow-2xl z-[100] pointer-events-none"
                       >
                         <div className="space-y-3">
                           <div className="flex items-center gap-2">
                             <Sparkles size={14} className="text-primary" />
                             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-primary">Match Intelligence Report</span>
                           </div>
                           <p className="text-xs text-slate-500 leading-relaxed font-semibold italic normal-case tracking-normal">
                             {getReasoning(gig)}
                           </p>
                         </div>
                         <div className="absolute top-full left-6 w-3 h-3 bg-white border-r border-b border-slate-100 transform rotate-45 -translate-y-1/2"></div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
              </div>
              <div className="p-6 md:p-8 space-y-4 md:space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100 w-fit block italic">
                    Domain: {gig.category}
                  </span>
                  <h4 className="text-xl md:text-2xl font-black text-on-surface line-clamp-1 group-hover:text-primary transition-colors tracking-tighter italic underline decoration-transparent group-hover:decoration-primary/20 transition-all underline-offset-8 uppercase">{gig.title}</h4>
                  <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">{gig.org}</p>
                  <p className="text-sm text-slate-700 line-clamp-2 italic mt-2 opacity-80 group-hover:opacity-100 transition-opacity leading-relaxed">"{gig.desc}"</p>
                </div>
                
                <div className="space-y-4 md:space-y-6">
                  <div className="flex justify-between items-center bg-slate-50/50 p-4 md:p-6 rounded-2xl border border-slate-100 shadow-inner">
                    <div className="space-y-1">
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Stipend</p>
                      <p className={cn(
                        "text-lg md:text-xl font-black tracking-tighter uppercase",
                        gig.price === '0' || gig.type === 'Pro Bono' ? "text-slate-600 italic font-medium" : "text-on-surface"
                      )}>{gig.price === '0' ? 'Pro-Bono' : `$${gig.price}`}</p>
                    </div>
                    <div className="w-px h-10 bg-slate-200"></div>
                    <div className="space-y-1 text-right">
                      <p className="text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">Temporal</p>
                      <p className="text-xs font-black text-on-surface tracking-tighter uppercase">{gig.duration}</p>
                    </div>
                  </div>

                  <div className="w-full py-5 bg-white border border-slate-100 text-on-surface font-black text-[10px] uppercase tracking-[0.4em] rounded-2xl group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 active:scale-95 group/btn italic">
                    Quick apply
                    <ChevronRight size={14} className="group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bento-card border-dashed border-slate-200 bg-slate-50/50">
             <p className="text-slate-600 font-bold italic uppercase tracking-widest">No mission profiles match your current decryption query.</p>
          </div>
        )}
      </div>
    </div>
  );
};
