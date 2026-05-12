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
  const [hoveredBadge, setHoveredBadge] = useState<string | null>(null);

  const getMatchPercentage = (id: string) => {
    const matches = [94, 88, 92, 85, 90, 82, 96, 89];
    const numericId = parseInt(id) || 0;
    return matches[numericId % matches.length];
  };

  const getReasoning = (gig: any) => {
    const match = getMatchPercentage(gig.id);
    const base = `Based on your recent skill node validations, this ${gig.category.toLowerCase()} project aligns with your verified growth path. `;
    
    if (gig.category === 'Computer Science' || gig.category === 'Data Analytics') {
      return base + `Your high proficiency in algorithm design and system logic matches the technical complexity required for this mission. We've identified a ${match}% overlap between your technical profile and this specific deployment.`;
    }
    if (gig.category === 'Graphic Design' || gig.category === 'Arts') {
      return base + `The aesthetic requirements and UX challenges presented here directly engage your top-tier creative attributes. Your previous successful completions in visual architecture suggest you'll deliver exceptional results for this brief.`;
    }
    if (gig.category === 'Business' || gig.category === 'Finance' || gig.category === 'Marketing') {
      return base + `Your strategic thinking and market awareness align perfectly with this mission. Your growth record in ${gig.category.toLowerCase()} signals high potential for this specific engagement.`;
    }
    return base + `Your demonstrated capability in strategic analysis and professional communication makes you a prime candidate for this project. The scope is uniquely tailored to build upon your existing professional verified record.`;
  };

  const featuredGig = useMemo(() => {
    return ALL_GIGS.find(g => String(g.id) === '11');
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
      return matchesSearch && matchesCategory && String(gig.id) !== '11'; // Exclude featured gig from grid
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
      {/* My Projects Header Section */}
      <section className="space-y-8 px-4 lg:px-0">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 text-left">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-on-surface tracking-tighter uppercase italic leading-none">
              My <span className="text-primary underline decoration-primary/20 underline-offset-8 text-left">Projects.</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em] italic mt-2">Personal workflow and active mission tracking corridor.</p>
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
      </section>

      {/* Redirect to Marketplace Card */}
      <section className="px-4 lg:px-0">
        <div className="bg-[#f0f4ff] rounded-[2rem] p-8 lg:p-12 flex flex-col md:flex-row items-center justify-between border border-primary/10 shadow-sm relative overflow-hidden group">
          <div className="space-y-4 relative z-10 text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="text-primary" size={20} />
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Discovery Mode</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-on-surface tracking-tighter italic uppercase">
              Looking for <span className="text-primary">Missions?</span>
            </h2>
            <p className="text-slate-600 font-medium text-sm lg:text-lg max-w-md italic">
              Access the complete SkillBridge Marketplace to find new projects that match your profile.
            </p>
          </div>
          <Link 
            to="/marketplace" 
            className="mt-8 md:mt-0 px-12 py-5 bg-primary text-white font-black rounded-2xl text-[10px] lg:text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-xl shadow-primary/20 active:scale-95 whitespace-nowrap italic relative z-10"
          >
            Enter Marketplace
          </Link>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"></div>
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all duration-1000"></div>
        </div>
      </section>
    </div>
  );
};
