import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, Bookmark, Search, Clock, Target, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { ALL_GIGS } from '../data/gigs';

export const SkillOpportunities: React.FC = () => {
  const { skillName } = useParams<{ skillName: string }>();
  
  const gigs = React.useMemo(() => {
    if (!skillName) return [];
    return ALL_GIGS.filter(gig => gig.category === skillName);
  }, [skillName]);

  return (
    <div className="min-h-screen animate-in fade-in duration-700 space-y-12 pb-20">
      {/* Header */}
      <section className="space-y-6">
        <Link to="/insights" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group px-4">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Insights</span>
        </Link>
        <div className="px-4 space-y-2">
          <h1 className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter uppercase italic">
            {skillName} <span className="text-primary font-light">Deployments.</span>
          </h1>
          <p className="text-sm text-slate-700 font-medium italic">Available gig opportunities to cultivate your {skillName} proficiency.</p>
        </div>
      </section>

      {/* Stats Mini Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Active Tasks', value: gigs.length, icon: Zap },
          { label: 'Skill Reward', value: 'Pro Bono', icon: Target },
          { label: 'Market Demand', value: 'High', icon: Search },
          { label: 'Level Req', value: 'Sophomore+', icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="bento-card !p-4 flex items-center gap-4 border-slate-200 shadow-sm">
            <div className="p-2 bg-slate-100 rounded-lg text-primary">
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[8px] font-black text-slate-700 uppercase tracking-widest">{stat.label}</p>
              <p className="text-sm font-bold text-on-surface">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Gig List */}
      <section className="space-y-6">
        <div className="space-y-4 px-4">
           {gigs.length > 0 ? (
             <div className="grid grid-cols-1 gap-6">
               {gigs.map((gig, index) => (
                 <motion.div
                   key={gig.id}
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: index * 0.1 }}
                 >
                   <Link 
                    to={`/gig/${gig.id}`}
                    className="bento-card !p-0 overflow-hidden flex flex-col md:flex-row group hover:border-primary/30 transition-all border-slate-800/50"
                   >
                     <div className="w-full md:w-64 h-48 md:h-auto relative overflow-hidden">
                       <img src={gig.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100" alt="" />
                       <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent"></div>
                       <div className="absolute top-4 left-4">
                         <span className="px-3 py-1 bg-primary text-slate-950 text-[8px] font-black uppercase tracking-widest rounded-full">
                           {gig.type}
                         </span>
                       </div>
                     </div>
                     <div className="flex-1 p-8 space-y-6">
                       <div className="flex justify-between items-start">
                         <div>
                           <h3 className="text-2xl font-bold text-on-surface tracking-tight uppercase italic group-hover:text-primary transition-colors">{gig.title}</h3>
                           <p className="text-[10px] font-bold text-slate-700 uppercase tracking-widest mt-1">{gig.org}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-2xl font-bold text-on-surface tracking-tighter">${gig.price}</p>
                           <p className="text-[8px] font-black text-slate-600 uppercase tracking-widest italic">Proj. Reward</p>
                         </div>
                       </div>
                       
                       <p className="text-sm text-slate-700 font-medium leading-relaxed max-w-2xl line-clamp-2">
                         {gig.desc}
                       </p>

                       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-slate-200">
                         <div className="flex gap-4">
                           <div className="flex items-center gap-2">
                             <Clock size={14} className="text-slate-600" />
                             <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{gig.duration}</span>
                           </div>
                           <div className="flex items-center gap-2">
                             <Target size={14} className="text-slate-600" />
                             <span className="text-[10px] font-bold text-slate-700 uppercase tracking-widest">{gig.category}</span>
                           </div>
                         </div>
                         <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                           <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700 hover:text-primary transition-all shadow-sm">
                             <Bookmark size={18} />
                           </button>
                           <span className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform">
                             Quick apply <ChevronRight size={14} />
                           </span>
                         </div>
                       </div>
                     </div>
                   </Link>
                 </motion.div>
               ))}
             </div>
           ) : (
             <div className="py-20 text-center bento-card">
               <p className="text-slate-500 font-medium italic">No active deployments found for {skillName}.</p>
               <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] mt-2">Check back shortly as new mission nodes synchronize.</p>
             </div>
           )}
        </div>
      </section>
    </div>
  );
};
