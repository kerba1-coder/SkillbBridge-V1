import React from 'react';
import { Heart, ShieldCheck, Zap, TrendingUp, Sparkles, AlertCircle, Smile, Minus, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export const LearnerHealth: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-12 pb-32 animate-in fade-in duration-700">
      <header className="px-4 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-500 border border-rose-500/20 shadow-lg shadow-rose-500/10">
            <Heart size={24} fill="currentColor" className="opacity-80" />
          </div>
          <span className="text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Personal Operational Integrity</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-on-surface tracking-tighter italic uppercase">Learner Health <br/>& <span className="text-primary italic">Sustainability.</span></h1>
        <p className="text-lg text-slate-700 font-medium italic opacity-80 max-w-2xl leading-relaxed">
          Monitor your cognitive load, emotional resilience, and project sustainability. High performance is built on foundation of deliberate wellness.
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8 px-4">
        {/* Main Stats */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bento-card border-emerald-500/20 bg-emerald-500/5 p-10 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-6 flex-1">
                <div className="flex items-center gap-3">
                   <ShieldCheck className="text-emerald-500" size={24} />
                   <h3 className="text-2xl font-bold text-on-white tracking-tight uppercase italic underline decoration-emerald-500/20 underline-offset-4">Readiness Core.</h3>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  Systems check: All vital indicators are within optimal parameters. Your current cognitive reservation is at 78%, allowing for an additional 4h of deep-work burst if required.
                </p>
                <div className="flex gap-4">
                   <div className="px-5 py-2 bg-slate-100 border border-slate-200 rounded-2xl">
                      <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest block">Status</span>
                      <span className="text-sm font-black text-emerald-600 italic">Fully Operational</span>
                   </div>
                   <div className="px-5 py-2 bg-slate-100 border border-slate-200 rounded-2xl">
                      <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest block">Resilience</span>
                      <span className="text-sm font-black text-on-surface italic">High (+4%)</span>
                   </div>
                </div>
              </div>
              
              <div className="flex flex-col items-center justify-center space-y-4 min-w-[200px]">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                       <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="364.4" strokeDashoffset="80" className="text-emerald-500 transition-all duration-1000" />
                    </svg>
                    <span className="absolute text-3xl font-black text-white italic">78%</span>
                 </div>
                 <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Overall Vibe Check</span>
              </div>
            </div>
            <Sparkles className="absolute -bottom-20 -right-20 text-emerald-500/5 scale-[5] group-hover:rotate-12 transition-transform duration-[4s]" size={400} />
          </section>

          {/* Metric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <section className="bento-card space-y-6">
                <div className="flex items-center gap-3">
                   <Zap className="text-amber-400" size={20} />
                   <h4 className="text-lg font-bold text-white uppercase italic">Cognitive Load.</h4>
                </div>
                <div className="space-y-6">
                   <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400" style={{ width: '65%' }}></div>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-xs text-slate-400 italic max-w-[160px]">Mental capacity utilized for complex deployments.</p>
                      <span className="text-2xl font-black text-white italic">65%</span>
                   </div>
                </div>
             </section>

             <section className="bento-card space-y-6">
                <div className="flex items-center gap-3">
                   <Smile className="text-sky-400" size={20} />
                   <h4 className="text-lg font-bold text-white uppercase italic">Emotional Balance.</h4>
                </div>
                <div className="space-y-6">
                   <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-sky-400" style={{ width: '82%' }}></div>
                   </div>
                   <div className="flex justify-between items-end">
                      <p className="text-xs text-slate-400 italic max-w-[160px]">Overall psychological resilience and confidence.</p>
                      <span className="text-2xl font-black text-white italic">82%</span>
                   </div>
                </div>
             </section>
          </div>

          {/* Tips for sustainability */}
          <section className="bento-card space-y-8">
             <div className="flex items-center gap-3">
                <AlertCircle className="text-primary" size={24} />
                <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">Sustainability Alerts.</h3>
             </div>
             
             <div className="space-y-4">
                {[
                  { icon: Zap, label: 'Optimization Opportunity', desc: 'Your peak mental acuity occurs between 9:00 AM - 11:30 AM. Move your complex "Intro to Selling with A.I." tasks to this window.', color: 'text-amber-400' },
                  { icon: Heart, label: 'Recovery Recommended', desc: 'You have completed 12 consecutive hours of operational work. A 30-minute cognitive disconnect is recommended.', color: 'text-rose-400' }
                ].map((tip, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-slate-950/50 rounded-3xl border border-slate-800 hover:border-slate-700 transition-all">
                     <div className={cn("mt-1", tip.color)}>
                        <tip.icon size={20} />
                     </div>
                     <div className="space-y-1">
                        <p className="text-xs font-black text-white uppercase tracking-widest">{tip.label}</p>
                        <p className="text-sm text-slate-400 italic leading-relaxed">{tip.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
           <section className="bento-card bg-slate-950 border-slate-800 space-y-6">
              <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Historical Vibe</h4>
              <div className="space-y-4">
                 {[78, 82, 75, 80, 85, 78, 80].map((val, i) => (
                   <div key={i} className="flex items-center gap-4">
                      <span className="text-[8px] font-black text-slate-700 uppercase tracking-widest w-6">Day {i+1}</span>
                      <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden">
                        <div className="h-full bg-slate-800" style={{ width: `${val}%` }}></div>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500">{val}%</span>
                   </div>
                 ))}
              </div>
           </section>

           <section className="bento-card border-primary/20 space-y-6">
              <div className="flex items-center gap-3">
                 <TrendingUp className="text-primary" size={20} />
                 <h4 className="text-sm font-bold text-white uppercase italic">Market Aligned Wellness.</h4>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                In the Engineering sector, learners with health scores above 75% report 30% higher placement rates in elite project nodes.
              </p>
           </section>
        </div>
      </div>
    </div>
  );
};
