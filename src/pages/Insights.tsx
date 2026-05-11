import React from 'react';
import { Megaphone, RefreshCw, MessageSquare, TrendingUp, Info } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export const Insights: React.FC = () => {
  const skills = [
    {
      id: 1,
      name: "Marketing",
      title: "Digital Marketing",
      percentage: "+45%",
      badge: "TOP GAINER",
      badgeColor: "bg-primary/10 text-primary border-primary/20",
      textColor: "text-on-surface",
      icon: Megaphone,
      desc: "Data-driven storytelling and digital presence optimization for global markets."
    },
    {
      id: 2,
      name: "Process Improvement",
      title: "Lean Operations",
      percentage: "+32%",
      badge: "STRATEGIC",
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-100",
      textColor: "text-on-surface",
      icon: RefreshCw,
      desc: "Identifying bottlenecks and streamlining workflows to maximize output."
    },
    {
      id: 3,
      name: "Communication",
      title: "Cross-functional Comms",
      percentage: "+28%",
      badge: "EMERGING",
      badgeColor: "bg-amber-50 text-amber-600 border-amber-100",
      textColor: "text-on-surface",
      icon: MessageSquare,
      desc: "Translating complex ideas across teams to ensure alignment and clarity."
    }
  ];

  return (
    <div className="animate-in fade-in duration-700">
      <div className="max-w-2xl mx-auto space-y-12">
        {/* Header */}
        <div className="space-y-4 px-4">
          <h1 className="text-4xl lg:text-6xl font-black text-on-surface tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">Emerging <span className="text-primary">Skills.</span></h1>
          <p className="text-slate-500 font-medium leading-relaxed italic text-lg">
            Real-time market signals curated from global demand to help you navigate high-growth sectors.
          </p>
        </div>

        {/* Skill Cards */}
        <div className="space-y-8 px-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/opportunities/${encodeURIComponent(skill.name)}`}
                className="block bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-2xl transition-all cursor-pointer hover:border-primary/20 hover:-translate-y-1"
              >
                <div className="relative z-10 space-y-8">
                  <div className="flex justify-between items-start">
                    <span className={cn("px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border", skill.badgeColor)}>
                      {skill.badge}
                    </span>
                    <TrendingUp className={cn("opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all", skill.textColor)} size={24} />
                  </div>

                  <div className="space-y-2">
                    <h2 className={cn("text-4xl font-black tracking-tighter italic uppercase group-hover:text-primary transition-colors", skill.textColor)}>{skill.title}</h2>
                    <p className={cn("text-6xl font-black tracking-tighter", skill.textColor)}>{skill.percentage}</p>
                  </div>

                  <div className="pt-8 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-[0.3em] italic">
                      {skill.desc}
                    </p>
                  </div>
                </div>

                {/* Background Watermark Icon */}
                <div className="absolute right-[-40px] bottom-[-40px] opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 pointer-events-none group-hover:scale-110 group-hover:rotate-12 text-primary">
                  <skill.icon size={250} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Info Box */}
        <div className="bg-[#f0f4ff] border border-primary/10 p-8 rounded-[2.5rem] flex gap-6 items-start shadow-sm mx-4">
          <div className="p-3 bg-white rounded-2xl shadow-sm text-primary">
            <Info size={24} />
          </div>
          <div className="space-y-2">
            <h4 className="text-lg font-black text-on-surface uppercase italic tracking-tight">Why these skills matter?</h4>
            <p className="text-sm text-slate-500 leading-relaxed font-medium italic">
              We curate this list by analyzing thousands of active project registries and high-growth job sectors. Mastering these identifies you as a high-potential asset, unlocking elite deployments.
            </p>
          </div>
        </div>

        {/* Market Dynamics Section */}
        <section className="px-4 pb-12">
          <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 italic">
            <h4 className="text-xs font-black text-emerald-600 uppercase tracking-[0.3em] mb-3">Market Dynamics Protocol</h4>
            <p className="text-emerald-900/60 text-sm font-semibold leading-relaxed">
              Our curation engine continuously scans project intake signals, venture capital allocation, and industry-specific demand trends to ensure genuine high-value opportunities.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};
