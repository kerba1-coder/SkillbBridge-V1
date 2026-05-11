import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Clock, 
  Target, 
  ChevronRight,
  Briefcase,
  Zap,
  TrendingUp,
  Award
} from 'lucide-react';
import { cn } from '../lib/utils';

export const ActiveProjects: React.FC = () => {
  const activeMissions = [
    { 
      id: 1, 
      title: 'Strategic Market Analysis', 
      org: 'Nexus Data Systems', 
      progress: 65,
      role: 'Market Intelligence Lead',
      deadline: '4 days left',
      value: 'High Impact',
      status: 'On Track'
    },
    { 
      id: 2, 
      title: 'UX Ecosystem Research', 
      org: 'EcoFlow Solutions', 
      progress: 24,
      role: 'Lead UX Researcher',
      deadline: '12 days left',
      value: 'Skill Validation',
      status: 'In Progress'
    },
    { 
      id: 3, 
      title: 'AI Prompt Engineering', 
      org: 'Future Forge', 
      progress: 92,
      role: 'Prompt Architect',
      deadline: 'Tomorrow',
      value: 'Elite Tier',
      status: 'Review Phase'
    }
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000 overflow-x-hidden w-full">
      {/* Header */}
      <section className="space-y-6">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors group w-fit">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Dashboard</span>
        </Link>
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-7xl font-light text-slate-900 tracking-tighter uppercase italic">
            Active <span className="font-bold underline decoration-primary/30 underline-offset-8">Projects.</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium italic mt-4">Complete registry of mission deployments currently assigned to your profile.</p>
        </div>
      </section>

      {/* Stats Mini Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 lg:px-0">
        {[
          { label: 'Active Missions', value: activeMissions.length, color: 'text-primary', icon: Briefcase },
          { label: 'Avg. Progress', value: '60%', color: 'text-emerald-500', icon: TrendingUp },
          { label: 'Near Deadline', value: '1', color: 'text-amber-500', icon: Clock },
          { label: 'Verified Nodes', value: '4', color: 'text-sky-500', icon: Award }
        ].map((stat) => (
          <div key={stat.label} className="bento-card flex items-start justify-between py-4 md:py-6">
            <div className="space-y-1">
              <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</p>
              <p className={cn("text-xl md:text-3xl font-bold tracking-tighter", stat.color)}>{stat.value}</p>
            </div>
            <div className={cn("p-1.5 md:p-2 rounded-xl bg-slate-50 border border-slate-200", stat.color)}>
              <stat.icon size={16} className="md:w-5 md:h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Projects List */}
      <section className="space-y-6 px-4 lg:px-0">
        <div className="grid grid-cols-1 gap-6">
          {activeMissions.map((mission, index) => (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="bento-card group hover:border-primary/30 transition-all p-0 overflow-hidden relative border-slate-100 shadow-sm bg-white">
                <div className="flex flex-col lg:flex-row h-full">
                  <div className="p-6 md:p-8 lg:p-12 flex-1 space-y-6 md:space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-slate-50 border border-slate-100 text-slate-500 text-[8px] font-black uppercase tracking-widest rounded-md italic">
                            {mission.status}
                          </span>
                          <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{mission.value}</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tighter uppercase italic mt-2">
                          <Link to={`/application/${mission.id}/dashboard`} className="text-slate-900 hover:text-primary transition-colors">
                            {mission.title}.
                          </Link>
                        </h3>
                        <p className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest leading-relaxed">{mission.org} • {mission.role}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="flex items-center justify-end gap-2 text-rose-500">
                          <Clock size={14} className="md:w-4 md:h-4" />
                          <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest">{mission.deadline}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 md:gap-0">
                        <div className="space-y-1">
                          <p className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Current Synchronization</p>
                          <p className="text-3xl md:text-4xl font-bold text-on-surface tracking-tighter">{mission.progress}%</p>
                        </div>
                        <Link 
                          to={`/application/${mission.id}/dashboard`}
                          className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-primary group-hover:translate-x-2 transition-transform mb-2"
                        >
                          Access Core Dashboard <ChevronRight size={14} />
                        </Link>
                      </div>
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-[1px]">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${mission.progress}%` }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className="h-full bg-primary rounded-full shadow-sm"
                        ></motion.div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/application/${mission.id}/dashboard`}
                    className="lg:w-48 bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-100 hover:bg-primary transition-all duration-500 flex items-center justify-center group/btn py-8 lg:py-0 shadow-inner"
                  >
                    <LayoutDashboard size={32} className="text-slate-400 group-hover/btn:text-white group-hover/btn:scale-125 transition-all" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Empty State / More info */}
      <section>
        <div className="bento-card border-dashed border-slate-800 text-center py-16 space-y-4">
          <Briefcase className="mx-auto text-slate-700" size={48} />
          <div className="space-y-1">
            <p className="text-slate-500 font-medium italic">All active project nodes are currently synchronized.</p>
            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.2em] uppercase">Need more work? <Link to="/registry" className="text-primary hover:underline">Return to Marketplace.</Link></p>
          </div>
        </div>
      </section>
    </div>
  );
};
