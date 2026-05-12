import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare, 
  UserPlus, 
  Sparkles,
  Search,
  Filter,
  ChevronRight,
  MoreVertical,
  Briefcase,
  Zap,
  Target,
  BrainCircuit,
  Loader2,
  Plus,
  Globe,
  Rocket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { gigService, applicationService } from '../services/firestoreService';
import { Gig, Application } from '../types';

export const PosterDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedGigId, setSelectedGigId] = useState<string | null>(null);
  const [view, setView] = useState<'active' | 'historic'>('active');
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [appsLoading, setAppsLoading] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const liveGigs = await gigService.getPosterGigs(user.uid);
        if (liveGigs) {
          setGigs(liveGigs);
          if (liveGigs.length > 0) {
            setSelectedGigId(liveGigs[0].id);
          }
        }
      } catch (error) {
        console.error("Error fetching poster gigs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGigs();
  }, [user]);

  useEffect(() => {
    const fetchApps = async () => {
      if (!selectedGigId) {
        setApplications([]);
        setAppsLoading(false);
        return;
      }
      setAppsLoading(true);
      try {
        const apps = await applicationService.getGigApplications(selectedGigId);
        if (apps) {
          setApplications(apps);
        } else {
          setApplications([]);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
        setApplications([]);
      } finally {
        setAppsLoading(false);
      }
    };
    fetchApps();
  }, [selectedGigId]);

  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeedGig = async () => {
    if (!user) return;
    setIsSeeding(true);
    try {
      await gigService.seedGigs([{
        title: 'Global Logistics Sync',
        desc: 'Analyzing and optimizing international shipping corridors using predictive AI modules. High impact mission with multi-node coordination required.',
        postedBy: user.uid,
        status: 'Active',
        valuation: '$4,200',
        duration: '4-6 Weeks',
        skills: ['Data Ops', 'Logistics AI', 'Supply Chain Strategy']
      }]);
      // Refetch
      const liveGigs = await gigService.getPosterGigs(user.uid);
      if (liveGigs) {
        setGigs(liveGigs);
        if (liveGigs.length > 0) {
          setSelectedGigId(liveGigs[0].id);
        }
      }
    } catch (e) {
      console.error("Seeding failed", e);
    } finally {
      setIsSeeding(false);
    }
  };

  const activeGigs = gigs.filter(g => g.status === 'Active' || g.status === 'Draft');
  const historicGigs = gigs.filter(g => g.status === 'Completed');
  const displayedGigs = view === 'active' ? activeGigs : historicGigs;

  const currentGig = gigs.find(g => g.id === selectedGigId);

  const [activeTab, setActiveTab] = useState<'overview' | 'discovery' | 'talent' | 'insights'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLearner, setSelectedLearner] = useState<any | null>(null);

  const stats = [
    { label: 'Active Gigs', value: activeGigs.length, icon: Briefcase, color: 'text-primary', bg: 'bg-primary/5' },
    { label: 'Pending Apps', value: applications.length, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Invitations', value: 12, icon: UserPlus, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Pipeline', value: 45, icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const mockLearners = [
    {
      id: 'l1',
      name: 'Sarah Chen',
      school: 'Stanford University',
      major: 'Computer Science & HCI',
      skills: ['React', 'D3.js', 'User Research'],
      strategicSkills: ['AI Literacy', 'Design Thinking'],
      completedGigs: 4,
      portfolio: 'sarah-designs.io',
      availability: 'Available (15h/week)',
      matchScore: 98,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      bio: 'Passionate about bridging the gap between complex data systems and human-centric design.',
      insights: ['Strong communication feedback across previous gigs.', 'Rapidly developing analytics-related skills.']
    },
    {
      id: 'l2',
      name: 'Marcus Weber',
      school: 'Georgia Tech',
      major: 'Data Science',
      skills: ['Python', 'SQL', 'TensorFlow'],
      strategicSkills: ['Predictive Modeling', 'Ethics in AI'],
      completedGigs: 2,
      portfolio: 'mweber.dev',
      availability: 'Limited (Internship)',
      matchScore: 92,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      bio: 'Focusing on operational efficiency through machine learning skills.',
      insights: ['High alignment with healthcare operations projects.', 'Exceeded technical benchmarks in last 2 tasks.']
    },
    {
      id: 'l3',
      name: 'Elena Rodriguez',
      school: 'RISD',
      major: 'Graphic Design',
      skills: ['Figma', 'Motion Design', 'Branding'],
      strategicSkills: ['Visual Communication', 'Creative Leadership'],
      completedGigs: 7,
      portfolio: 'elena-visuals.com',
      availability: 'Available (Full-time)',
      matchScore: 88,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      bio: 'Crafting brand narratives and high-fidelity prototypes for tech startups.',
      insights: ['Top 5% for reliability and response time.', 'Strong peer endorsement for UX strategy.']
    }
  ];

  const trendingSkills = [
    { label: 'AI Literacy', growth: '+34%', category: 'Technical' },
    { label: 'Healthcare Analytics', growth: '+22%', category: 'Domain' },
    { label: 'Sustainability Reporting', growth: '+18%', category: 'Strategic' },
    { label: 'Logic Design', growth: '+15%', category: 'Foundational' },
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000 overflow-x-hidden w-full px-1 lg:px-4 text-on-surface">
      {/* Poster Header */}
      <div className="px-3 lg:px-0 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-3xl lg:text-7xl font-black text-on-surface tracking-tighter uppercase italic">
            Poster <span className="text-primary underline decoration-primary/20 underline-offset-8">Workspace.</span>
          </h2>
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] italic mt-2">Talent Discovery • Phase: Active Orchestration</p>
        </div>
        
        <div className="flex gap-4">
          <Link 
            to="/scoping" 
            className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest italic"
          >
            <Zap size={18} /> Launch Gig
          </Link>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="px-4">
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'discovery', label: 'Talent Discovery', icon: Search },
            { id: 'talent', label: 'Talent Pool', icon: Target },
            { id: 'insights', label: 'Workforce Insights', icon: BrainCircuit },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all",
                activeTab === tab.id ? "bg-white text-primary shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-700"
              )}
            >
              <tab.icon size={16} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-12"
            >
              {/* Stats Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bento-card py-8 px-6 bg-white border border-slate-100 shadow-sm flex flex-col justify-between h-40 group hover:border-primary/20 transition-all">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</p>
                    <div className="flex items-end justify-between">
                      <p className={cn("text-4xl font-black tracking-tighter", stat.color)}>{stat.value}</p>
                      <div className={cn("p-2 rounded-xl group-hover:scale-110 transition-transform", stat.bg, stat.color)}>
                        <stat.icon size={22} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Active Gigs Control */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-on-surface tracking-tighter uppercase italic">Gig Control Center.</h3>
                    <div className="flex gap-2">
                       <button onClick={() => setView('active')} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", view === 'active' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500')}>Active</button>
                       <button onClick={() => setView('historic')} className={cn("px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all", view === 'historic' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500')}>Historic</button>
                    </div>
                  </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {displayedGigs.length > 0 ? (
                      displayedGigs.slice(0, 4).map((gig: any) => (
                        <button 
                          key={gig.id}
                          onClick={() => { setSelectedGigId(gig.id); setActiveTab('overview'); }}
                          className={cn(
                            "bento-card p-8 bg-white border text-left space-y-6 group hover:shadow-xl transition-all relative overflow-hidden",
                            selectedGigId === gig.id ? "border-primary/50 ring-1 ring-primary/10" : "border-slate-100"
                          )}
                        >
                          <div className="relative z-10 space-y-4">
                            <div className="flex justify-between items-start">
                              <span className="px-2 py-1 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest rounded transition-all">{gig.status}</span>
                              <p className="text-xl font-black text-on-surface tracking-tighter italic">{gig.valuation}</p>
                            </div>
                            <h4 className="text-xl font-black text-on-surface leading-tight uppercase italic group-hover:text-primary transition-colors line-clamp-1">{gig.title}</h4>
                            <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                              <span className="flex items-center gap-1.5"><Users size={12} /> {gig.applicantsCount || 8} Applicants</span>
                              <span className="flex items-center gap-1.5"><Clock size={12} /> {gig.duration || '2-4 Weeks'}</span>
                            </div>
                          </div>
                          <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-primary rotate-12 scale-150 group-hover:scale-175 transition-transform duration-1000">
                             <Zap size={64} />
                          </div>
                        </button>
                      ))
                    ) : (
                      <div className="col-span-2 p-12 text-center bg-slate-50 rounded-[2rem] border border-dashed border-slate-200 flex flex-col items-center gap-6">
                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest italic">No gigs deployed in this sector.</p>
                        <button 
                          onClick={handleSeedGig}
                          disabled={isSeeding}
                          className="px-8 py-4 bg-primary/10 text-primary border border-primary/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all italic flex items-center gap-3 disabled:opacity-50"
                        >
                          {isSeeding ? <Loader2 className="animate-spin" size={16} /> : <Rocket size={16} />}
                          Deploy Initial Mission
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Spotlight Talent */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-black text-on-surface tracking-tighter uppercase italic">AI Talent Spotlight.</h3>
                    <Sparkles className="text-amber-500 animate-pulse" size={20} />
                  </div>
                  
                  <div className="space-y-4">
                    {mockLearners.slice(0, 2).map((learner) => (
                      <div 
                        key={learner.id}
                        className="bento-card p-6 bg-white border border-slate-100 space-y-6 group hover:border-primary/30 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-slate-100 p-0.5 shadow-md bg-white">
                            <img src={learner.avatar} className="w-full h-full object-cover rounded-[inherit]" alt={learner.name} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-lg font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/10 decoration-2 underline-offset-4">{learner.name}</h4>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{learner.school}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs font-black italic">
                          <span className="text-primary">{learner.matchScore}% Strategic Match</span>
                          <span className="text-emerald-500">{learner.completedGigs} Gigs Done</span>
                        </div>
                        <button 
                          onClick={() => setSelectedLearner(learner)}
                          className="w-full py-3 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all italic"
                        >
                          Review Profile
                        </button>
                      </div>
                    ))}
                    <button 
                      onClick={() => setActiveTab('discovery')}
                      className="w-full py-4 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all italic"
                    >
                      View All Recommended Candidates
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'discovery' && (
            <motion.div 
              key="discovery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-10"
            >
              {/* AI Search Bar */}
              <div className="bento-card bg-primary p-12 border-none relative overflow-hidden">
                <div className="relative z-10 space-y-6 max-w-2xl">
                  <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tighter italic uppercase">AI Talent Skill <span className="text-white/50">Discovery.</span></h3>
                  <div className="relative group">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-primary" size={24} />
                    <input 
                      className="w-full bg-white rounded-[2rem] pl-16 pr-4 py-8 text-lg font-bold text-on-surface placeholder:text-slate-300 outline-none shadow-2xl shadow-primary/20 italic" 
                      placeholder="Find students interested in healthcare operations with analytics experience..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-primary text-white rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/30">
                      <Sparkles size={20} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['Python', 'Healthcare', 'UX Design', 'Internship Ready', 'Stanford'].map(tag => (
                      <span key={tag} className="px-4 py-2 bg-white/10 text-white/80 text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/20 cursor-pointer transition-all">{tag}</span>
                    ))}
                  </div>
                </div>
                <Users className="absolute -bottom-20 -right-20 text-white/5 rotate-12 scale-[4] pointer-events-none" />
              </div>

              {/* Discovery Sidebar & Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-3 space-y-8">
                  <div className="bento-card p-8 bg-white border border-slate-100 space-y-8 shadow-sm h-fit">
                    <div className="space-y-6">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter Matrix</label>
                      
                      <div className="space-y-4">
                        <p className="text-[11px] font-black text-on-surface uppercase tracking-tighter">Strategic Skills</p>
                        <div className="space-y-3">
                          {['AI Literacy', 'Design Thinking', 'Data Viz'].map(s => (
                            <label key={s} className="flex items-center gap-3 cursor-pointer group">
                              <div className="w-5 h-5 rounded-md border-2 border-slate-100 group-hover:border-primary transition-colors flex items-center justify-center">
                                <CheckCircle2 className="text-primary opacity-0 group-has-[:checked]:opacity-100" size={14} />
                                <input type="checkbox" className="hidden" />
                              </div>
                              <span className="text-xs text-slate-600 font-bold group-hover:text-primary transition-colors">{s}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <p className="text-[11px] font-black text-on-surface uppercase tracking-tighter">Engagement Level</p>
                        <div className="flex flex-wrap gap-2">
                           {['Available', 'Busy', 'Intern', 'Alumni'].map(e => (
                             <button key={e} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-[9px] font-black uppercase text-slate-500 rounded-lg hover:border-primary/40 transition-all">{e}</button>
                           ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-9 space-y-8">
                  <div className="flex justify-between items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{mockLearners.length} verified talents found</p>
                    <div className="flex items-center gap-3 text-xs font-bold text-slate-600 italic">
                      Sort by: <span className="text-primary font-black cursor-pointer uppercase tracking-widest text-[10px]">Strategic Match</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mockLearners.map(learner => (
                      <div 
                        key={learner.id}
                        className="bento-card p-10 bg-white border border-slate-100 flex flex-col justify-between group hover:border-primary/20 hover:shadow-2xl transition-all relative overflow-hidden"
                      >
                         <div className="absolute top-0 right-0 p-8 opacity-[0.02] text-primary rotate-45 group-hover:rotate-90 transition-all duration-1000 scale-[2]">
                            <Target size={120} />
                         </div>

                        <div className="space-y-8 relative z-10">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-6">
                              <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden border border-slate-100 p-1 bg-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <img src={learner.avatar} className="w-full h-full object-cover rounded-[inherit]" alt="" />
                              </div>
                              <div className="space-y-1">
                                <h4 className="text-2xl font-black text-on-surface italic uppercase tracking-tighter">{learner.name}</h4>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{learner.school}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-black text-primary tracking-tighter">{learner.matchScore}%</p>
                              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Match</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Core Intel Bundle</p>
                            <div className="flex flex-wrap gap-2">
                              {learner.skills.map(s => (
                                <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl italic group-hover:bg-primary/5 transition-all">{s}</span>
                              ))}
                            </div>
                          </div>

                          <div className="p-6 bg-slate-50 border border-slate-100 rounded-[1.5rem] space-y-4 shadow-inner">
                            <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest italic leading-none">
                               <span className="text-emerald-600 flex items-center gap-2"><Briefcase size={12} /> {learner.completedGigs} Gigs</span>
                               <span className="text-amber-600 flex items-center gap-2"><Target size={12} /> {learner.strategicSkills[0]}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-4 mt-10 relative z-10">
                           <button 
                            onClick={() => setSelectedLearner(learner)}
                            className="flex-1 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-[10px] uppercase tracking-widest italic"
                           >
                             Invite to Apply
                           </button>
                           <button 
                            onClick={() => setSelectedLearner(learner)}
                            className="p-4 bg-white border border-slate-100 text-slate-400 hover:text-primary rounded-2xl transition-all shadow-sm"
                           >
                             <ArrowUpRight size={20} />
                           </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'talent' && (
             <motion.div 
               key="talent"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-12"
             >
                <div className="flex justify-between items-center">
                   <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/20 underline-offset-8">Talent Pipeline Builder.</h3>
                   <button className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 rounded-xl text-slate-600 hover:text-primary transition-all shadow-sm">
                      <Plus size={18} /> New Pipeline
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[
                     { label: 'Future Marketing Talent', count: 12, color: 'text-primary', bg: 'bg-primary/5', tags: ['Strategy', 'SEO'] },
                     { label: 'Healthcare Analytics', count: 8, color: 'text-emerald-600', bg: 'bg-emerald-50', tags: ['Python', 'BioTech'] },
                     { label: 'Community Engagement', count: 25, color: 'text-amber-600', bg: 'bg-amber-50', tags: ['Social', 'NPO'] },
                   ].map((pool, i) => (
                     <div key={i} className="bento-card p-10 bg-white border border-slate-100 space-y-8 group hover:border-primary/20 transition-all cursor-pointer">
                        <div className="flex justify-between items-start">
                           <div className={cn("p-4 rounded-3xl group-hover:scale-110 transition-transform shadow-sm", pool.bg, pool.color)}>
                              <Users size={32} />
                           </div>
                           <div className="text-right">
                              <p className={cn("text-3xl font-black tracking-tighter", pool.color)}>{pool.count}</p>
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Candidates</p>
                           </div>
                        </div>
                        <div className="space-y-2">
                           <h4 className="text-xl font-black text-on-surface uppercase italic underline decoration-slate-100 group-hover:decoration-primary/20 group-hover:text-primary transition-all">{pool.label}</h4>
                           <div className="flex gap-2">
                              {pool.tags.map(t => <span key={t} className="text-[9px] font-bold text-slate-400 uppercase italic">#{t}</span>)}
                           </div>
                        </div>
                        <button className="w-full py-4 border border-slate-50 bg-slate-50/50 hover:bg-white hover:border-slate-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all italic">Manage Pipeline</button>
                     </div>
                   ))}
                </div>
             </motion.div>
          )}

          {activeTab === 'insights' && (
             <motion.div 
               key="insights"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -20 }}
               className="space-y-12"
             >
                <div className="bento-card !bg-[#0f172a] p-12 lg:p-20 !border-none relative overflow-hidden">
                   <div className="relative z-10 space-y-8 max-w-3xl">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/60 text-[10px] font-black uppercase tracking-widest backdrop-blur-sm">
                         <Sparkles size={14} className="text-amber-400" /> Strategic Intelligence Mode
                      </div>
                      <h3 className="text-2xl lg:text-6xl font-black text-white tracking-tighter italic uppercase underline decoration-primary/30 decoration-4 underline-offset-12">Workforce <span className="text-primary italic">Signal</span> Intelligence.</h3>
                      <p className="text-lg lg:text-xl text-slate-400 font-medium italic leading-relaxed">
                         The platform identifies emerging skills and skill gaps in the student landscape. Deploy gigs to capture these growth sectors.
                      </p>
                   </div>
                   <BarChart3 className="absolute -bottom-20 -right-20 text-white/5 rotate-12 scale-[5] pointer-events-none" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                   <div className="bento-card p-10 bg-white border border-slate-100 space-y-8">
                      <h4 className="text-2xl font-black text-on-surface uppercase italic tracking-tighter underline decoration-primary/10">Trending Skills.</h4>
                      <div className="space-y-6">
                         {trendingSkills.map((skill, i) => (
                           <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-primary/20 transition-all">
                              <div className="space-y-1">
                                 <p className="text-xl font-black text-on-surface uppercase italic group-hover:text-primary transition-colors">{skill.label}</p>
                                 <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{skill.category}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-2xl font-black text-emerald-500 tracking-tighter">{skill.growth}</p>
                                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Growth</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bento-card p-10 !bg-slate-900 !border-none space-y-8 text-white relative overflow-hidden group">
                      <div className="relative z-10 space-y-8">
                         <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter underline decoration-white/10">Strategic Alerts.</h4>
                         <div className="space-y-6">
                            {[
                              "AI literacy interest increased 34% this month.",
                              "Healthcare workflow optimization skills are trending.",
                              "Students are increasingly exploring sustainability reporting."
                            ].map((msg, i) => (
                              <div key={i} className="flex gap-6 p-6 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-white/10 transition-all backdrop-blur-md">
                                 <Zap size={24} className="text-amber-400 shrink-0" />
                                 <p className="text-sm font-medium italic italic leading-relaxed text-slate-300">{msg}</p>
                              </div>
                            ))}
                         </div>
                      </div>
                      <Globe className="absolute -bottom-20 -right-20 text-white/5 rotate-12 scale-[4] opacity-20 pointer-events-none group-hover:rotate-45 transition-transform duration-[10s]" />
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Learner Profile Modal */}
      <AnimatePresence>
        {selectedLearner && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedLearner(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-lg"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] shadow-3xl overflow-hidden border border-white/20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Identity Skill */}
                <div className="p-10 lg:p-16 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-12 bg-slate-50/50">
                  <div className="space-y-8 text-center lg:text-left">
                    <div className="relative inline-block group mx-auto lg:mx-0">
                      <div className="absolute -inset-4 bg-primary/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-40 h-40 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl p-1 bg-white">
                        <img src={selectedLearner.avatar} className="w-full h-full object-cover rounded-[2.5rem]" alt="" />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center font-black text-lg border-4 border-white shadow-lg">
                        {selectedLearner.matchScore}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-4xl font-black text-on-surface italic uppercase tracking-tighter underline decoration-primary/20 decoration-4 underline-offset-8 leading-none">
                        {selectedLearner.name}.
                      </h3>
                      <p className="text-xs font-black text-slate-500 uppercase tracking-widest">{selectedLearner.school} • {selectedLearner.major}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                     <p className="text-lg lg:text-xl text-slate-700 italic font-medium leading-relaxed">
                        "{selectedLearner.bio}"
                     </p>
                     <div className="flex flex-wrap gap-2">
                        {selectedLearner.skills.map((s: string) => (
                           <span key={s} className="px-4 py-2 bg-white border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest rounded-xl italic shadow-sm">{s}</span>
                        ))}
                     </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-center">
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Gigs</p>
                        <p className="text-2xl font-black text-on-surface">{selectedLearner.completedGigs}</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Reliability</p>
                        <p className="text-2xl font-black text-emerald-500">100%</p>
                     </div>
                     <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Feedback</p>
                        <p className="text-2xl font-black text-amber-500">5.0</p>
                     </div>
                  </div>
                </div>

                {/* Right: AI Insights & Comms */}
                <div className="p-10 lg:p-16 space-y-12">
                   <div className="space-y-8">
                      <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest italic">
                        <Zap size={14} className="animate-pulse" /> AI Synthesis Pulse
                      </div>
                      
                      <div className="space-y-6">
                         {selectedLearner.insights.map((insight: string, i: number) => (
                           <div key={i} className="flex gap-6 p-6 bg-slate-50 border border-slate-100 rounded-[2rem] group hover:border-primary/20 hover:bg-white transition-all shadow-inner">
                              <Sparkles size={20} className="text-amber-500 shrink-0" />
                              <p className="text-sm font-semibold italic text-slate-600 leading-relaxed">{insight}</p>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] space-y-4">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Personalized Invitation suggestion</label>
                         <p className="text-xs text-slate-600 font-medium italic leading-relaxed">"We noticed your interest in <span className="text-primary font-black uppercase">{selectedLearner.strategicSkills[0]}</span> and thought this project may align with your career goals."</p>
                      </div>

                      <div className="flex gap-4">
                         <button className="flex-1 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest italic">
                            Send Sync Request
                         </button>
                         <button className="px-8 py-5 bg-white border border-slate-200 text-slate-600 font-black rounded-2xl shadow-sm hover:bg-slate-50 transition-all text-xs uppercase tracking-widest italic flex items-center justify-center">
                            Save
                         </button>
                      </div>
                      <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest italic">Invitation sent via the AI Talent Channel</p>
                   </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedLearner(null)}
                className="absolute top-8 right-8 p-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl text-slate-400 hover:text-rose-500 transition-all shadow-xl"
              >
                <ChevronRight className="rotate-90 sm:rotate-0" size={24} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
