import React, { useState, useMemo, useEffect } from 'react';
import { Search, Bookmark, Share2, Clock, CheckCircle2, XCircle, ChevronRight, Zap, Target, Database, Briefcase, TrendingUp, Award, Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';
import { ALL_GIGS } from '../data/gigs';
import { applicationService } from '../services/firestoreService';
import { Application } from '../types';

export const Home: React.FC = () => {
  const { profile, user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);

  useEffect(() => {
    const fetchApps = async () => {
      if (!user) return;
      setLoadingApps(true);
      try {
        const data = await applicationService.getLearnerApplications(user.uid);
        if (data) setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoadingApps(false);
      }
    };
    fetchApps();
  }, [user]);

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return ALL_GIGS.filter(gig => 
      gig.title.toLowerCase().includes(query) ||
      gig.category.toLowerCase().includes(query) ||
      gig.org.toLowerCase().includes(query) ||
      gig.desc.toLowerCase().includes(query) ||
      gig.skills.some(s => s.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const demoApps: Application[] = [
    { id: '2', gigTitle: 'Growth Gig Analysis', status: 'Accepted', gigId: 'g2', userId: user?.uid || '', applicantName: 'Alex', applicantSkills: [], matchScore: 92, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '3', gigTitle: 'Legacy Data Port', status: 'Rejected', gigId: 'g3', userId: user?.uid || '', applicantName: 'Alex', applicantSkills: [], matchScore: 78, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    { id: '1', gigTitle: 'Global Logistics Sync', status: 'Applied', gigId: 'g1', userId: user?.uid || '', applicantName: 'Alex', applicantSkills: [], matchScore: 85, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  ];

  const displayApplications = useMemo(() => {
    const combined = [...applications];
    // Add demo apps if they aren't already there (by ID)
    demoApps.forEach(demo => {
      if (!combined.some(app => app.id === demo.id)) {
        combined.push(demo);
      }
    });
    return combined;
  }, [applications]);

  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8 min-h-screen">
      {/* Welcome & Focus Zone (8 cols) */}
      <section className="col-span-12 lg:col-span-8 bento-card relative overflow-hidden group min-h-[320px] flex flex-col justify-center bg-white border-slate-100 shadow-sm">
        <div className="relative z-10 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold uppercase tracking-wider border border-emerald-100">Active Path</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-4xl lg:text-5xl font-extrabold text-on-surface leading-tight underline decoration-primary/20 underline-offset-8"
            >
              Let's find a <span className="text-primary">Gig.</span>
            </motion.h2>
          </div>
          
          <p className="text-slate-600 text-lg max-w-md leading-relaxed italic">
            Welcome back, <span className="text-on-surface font-semibold not-italic">{profile?.fullName?.split(' ')[0] || profile?.displayName?.split(' ')[0] || 'Explorer'}</span>. You’re making great strides in your strategic path.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/explore"
              className="px-8 py-3 rounded-full bg-primary text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-3 animate-pulse"
            >
              <Sparkles size={16} /> A.I. Skills Explorer
            </Link>
            <div className="px-6 py-3 rounded-full bg-slate-100 border border-slate-200 text-[10px] font-black text-slate-700 uppercase tracking-widest">
              Level {profile?.level || 4}
            </div>
          </div>
        </div>
        
        {/* Decorative blur */}
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-all duration-700"></div>
      </section>

      {/* Progress Metric (4 cols) */}
      <section className="col-span-12 lg:col-span-4 bento-card p-0 overflow-hidden bg-white border-slate-100">
        <Link to="/passport" className="flex flex-col items-center justify-between text-center py-10 w-full h-full group transition-all hover:bg-slate-50">
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle 
                className="text-slate-200" 
                cx="96" cy="96" r="80" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="12" 
              />
              <motion.circle 
                initial={{ strokeDashoffset: 502.6 }}
                animate={{ strokeDashoffset: 502.6 * (1 - 0.8) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-primary" 
                cx="96" cy="96" r="80" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="12" 
                strokeDasharray="502.6" 
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-5xl font-black text-on-surface tracking-tighter group-hover:scale-110 transition-transform">80%</span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Market Ready</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-slate-600 text-sm font-medium uppercase tracking-widest">Next Benchmark</p>
            <p className="text-on-surface font-extrabold tracking-tight text-lg group-hover:text-primary transition-colors">Sr. Product Specialist</p>
          </div>
        </Link>
      </section>

      {/* Search Bar (12 cols) */}
      <div className="col-span-12 relative group z-[60]">
        <Search className="absolute left-6 lg:left-8 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" size={24} />
        <input 
          className="w-full bg-white border border-slate-100 focus:border-primary/20 rounded-[2.5rem] py-4 lg:py-6 pl-14 lg:pl-20 pr-8 shadow-sm focus:ring-4 focus:ring-primary/5 transition-all text-base lg:text-xl placeholder:text-slate-400 outline-none text-on-surface font-medium italic" 
          placeholder="Search Skills, Gigs, or Market Insights..." 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        {/* Search Results Overlay */}
        <AnimatePresence>
          {searchQuery.trim() !== '' && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              className="absolute left-0 right-0 top-full mt-4 bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden backdrop-blur-xl z-[70] max-h-[500px] flex flex-col"
            >
              <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">Search Results ({filteredResults.length})</h4>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="text-[10px] font-bold text-primary uppercase tracking-widest hover:brightness-125 transition-all"
                >
                  Clear search
                </button>
              </div>
              
              <div className="overflow-y-auto p-4 custom-scrollbar">
                {filteredResults.length > 0 ? (
                  <div className="space-y-4">
                    {filteredResults.map((gig) => (
                      <Link 
                        key={gig.id} 
                        to={`/gig/${gig.id}`}
                        onClick={() => setSearchQuery('')}
                        className="group flex items-center justify-between p-6 bg-slate-50/50 hover:bg-slate-100 border border-slate-100 rounded-2xl transition-all"
                      >
                        <div className="flex items-center gap-6">
                          <div className="w-16 h-16 rounded-xl overflow-hidden border border-slate-200 bg-white group-hover:scale-105 transition-all">
                            <img src={gig.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100" alt="" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <span className="text-[8px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20">{gig.type}</span>
                              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{gig.category}</span>
                            </div>
                            <h5 className="text-on-surface font-extrabold text-lg group-hover:text-primary transition-colors italic tracking-tight">{gig.title}</h5>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                             <p className="text-on-surface font-bold font-display">${gig.price}</p>
                             <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Est. Reward</p>
                          </div>
                          <ChevronRight size={20} className="text-slate-500 group-hover:text-primary transition-all transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 flex flex-col items-center justify-center text-center space-y-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300">
                      <Search size={40} strokeWidth={1} />
                    </div>
                    <div className="space-y-2">
                      <p className="text-slate-600 font-medium italic">No matches found for "{searchQuery}"</p>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Try searching by category or specific skill</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-8 bg-slate-50 border-t border-slate-100 text-center">
                <Link to="/marketplace" onClick={() => setSearchQuery('')} className="text-[10px] font-bold text-slate-500 hover:text-primary uppercase tracking-[0.5em] transition-all">
                  Browse full marketplace
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Discover Future Section Link (New) */}
      <section className="col-span-12">
        <Link to="/discover" className="block group">
          <div className="bg-[#f0f4ff] rounded-[2rem] p-8 lg:p-10 flex items-center justify-between border border-primary/10 shadow-sm overflow-hidden relative transition-all group-hover:border-primary/30 group-hover:shadow-lg">
            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary" size={20} />
                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Personalized Roadmap</span>
              </div>
              <h3 className="text-3xl font-black text-on-surface tracking-tight italic uppercase underline decoration-primary/20 underline-offset-8">Discover Your Future.</h3>
              <p className="text-slate-600 font-medium text-sm lg:text-lg max-w-md italic">Ready to level up? We've analyzed your potential paths.</p>
            </div>
            <div className="p-6 bg-white rounded-full text-primary shadow-sm group-hover:scale-110 transition-transform hidden md:block">
              <ArrowRight size={32} />
            </div>
            <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
          </div>
        </Link>
      </section>

      {/* Stats Mini Grid */}
      <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Projects', value: '3', color: 'text-primary', to: '/active-projects', icon: Briefcase },
          { label: 'Verified Skills', value: '12', color: 'text-emerald-500', to: '/passport', icon: Target },
          { label: 'Path Progress', value: '68%', color: 'text-amber-500', to: '/passport', icon: TrendingUp },
        ].map((stat) => (
          <Link 
            key={stat.label} 
            to={stat.to || "#"}
            className="bento-card flex items-start justify-between py-6 group hover:border-primary/30 transition-all active:scale-95 duration-200"
          >
            <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest group-hover:text-primary transition-colors">{stat.label}</p>
              <p className={cn("text-3xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
            </div>
            <div className={cn("p-2 rounded-xl bg-slate-50 border border-slate-100 transition-all group-hover:bg-primary/10 group-hover:border-primary/20", stat.color)}>
              <stat.icon size={20} />
            </div>
          </Link>
        ))}
      </div>

      {/* Marketplace Quick Access */}
      <section className="col-span-12 bento-card relative overflow-hidden group bg-[#f0f4ff] border-primary/20 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 py-4">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Briefcase size={16} className="text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Skill Infrastructure</span>
            </div>
            <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10">Full Marketplace.</h3>
            <p className="text-slate-600 text-sm font-medium italic font-semibold">Access the complete database of 100+ gigs.</p>
          </div>
          <Link 
            to="/marketplace" 
            className="px-12 py-5 bg-primary text-white font-black rounded-2xl text-[10px] lg:text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap italic"
          >
            Enter Marketplace
          </Link>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
      </section>

      {/* Applied Gigs Tracker (12 cols) */}
      <section className="col-span-12 space-y-6">
        <div className="flex justify-between items-end px-4">
          <h3 className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.4em]">Applied Gigs Tracker</h3>
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden md:inline">Live Sync: Active</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loadingApps ? (
            <div className="col-span-3 flex justify-center py-12">
               <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : displayApplications.length > 0 ? (
            displayApplications.slice(0, 3).map((app) => (
              <Link 
                key={app.id} 
                to={`/application/${app.id}/status`}
                className="bento-card group flex flex-col justify-between hover:bg-slate-50 transition-all border-slate-100 hover:border-primary/20"
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-black text-on-surface group-hover:text-primary transition-colors tracking-tight italic">{app.gigTitle}</h4>
                  <div className={cn(
                    "p-2 rounded-lg",
                    app.status === 'Applied' ? 'bg-amber-50' : 
                    app.status === 'Shortlisted' || app.status === 'Accepted' ? 'bg-emerald-50' : 'bg-rose-50'
                  )}>
                    {app.status === 'Applied' ? <Clock size={18} className="text-amber-500" /> : 
                     app.status === 'Shortlisted' || app.status === 'Accepted' ? <CheckCircle2 size={18} className="text-emerald-500" /> :
                     <XCircle size={18} className="text-rose-500" />}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border shadow-sm",
                    app.status === 'Applied' ? 'text-amber-500 bg-amber-50 border-amber-100' : 
                    app.status === 'Shortlisted' || app.status === 'Accepted' ? 'text-emerald-500 bg-emerald-50 border-emerald-100' : 
                    'text-rose-600 bg-rose-50 border-rose-100'
                  )}>
                    {app.status === 'Rejected' ? 'Denied' : app.status}
                  </span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 bento-card text-center py-12 bg-slate-50 border-dashed border-slate-200">
              <p className="text-sm text-slate-500 italic">No active applications currently.</p>
              <Link to="/marketplace" className="text-[10px] font-black text-primary uppercase tracking-widest hover:underline mt-2 inline-block">Find your first mission</Link>
            </div>
          )}
        </div>
      </section>

      {/* Explore by Skill Grid */}
      <section className="col-span-12 space-y-6">
        <div className="flex justify-between items-end px-4">
          <h3 className="text-[10px] font-extrabold text-slate-600 uppercase tracking-[0.4em]">search by skill</h3>
          <Link to="/marketplace" className="text-primary text-xs font-bold uppercase tracking-widest hover:underline underline-offset-8 transition-all">view all</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Marketing', icon: Zap, color: 'bg-primary/5 text-primary border-primary/10', desc: 'Brand positioning' },
            { name: 'Engineering', icon: Database, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', desc: 'System architecture' },
            { name: 'Design', icon: Target, color: 'bg-amber-50 text-amber-600 border-amber-100', desc: 'Human interfaces' }
          ].map((skill) => (
            <div 
              key={skill.name} 
              onClick={() => setSearchQuery(skill.name)}
              className="bento-card flex items-center gap-6 group cursor-pointer border-slate-100 hover:border-primary/20 bg-white"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center border", skill.color)}>
                <skill.icon size={28} />
              </div>
              <div>
                <h4 className="text-lg font-black text-on-surface group-hover:text-primary transition-colors">{skill.name}</h4>
                <p className="text-[10px] uppercase font-bold text-slate-600 tracking-widest">{skill.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
