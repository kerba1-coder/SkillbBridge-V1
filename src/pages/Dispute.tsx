import React from 'react';
import { 
  BarChart3, 
  Rocket, 
  Scale, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Hourglass, 
  Edit3, 
  User, 
  Lightbulb,
  Maximize2 
} from 'lucide-react';
import { cn } from '../lib/utils';

export const Dispute: React.FC = () => {
  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
      {/* Top Bar (Context Specific) */}
      <header className="flex justify-between items-center px-4">
        <div className="flex items-center gap-8">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-primary shadow-2xl">
            <Scale size={32} />
          </div>
          <div className="space-y-1">
            <h2 className="text-4xl lg:text-6xl font-light text-white tracking-tighter uppercase italic leading-none">
              Resolution <span className="font-bold underline decoration-primary/30 underline-offset-8">Center.</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] italic mt-2">Mediated Conflict Resolution • Node: RC-Alpha</p>
          </div>
        </div>
        <nav className="hidden xl:flex gap-12 items-center">
          {['Active Cases', 'Guidelines', 'Security'].map(link => (
            <a key={link} href="#" className="text-[10px] font-bold text-slate-500 hover:text-white transition-all uppercase tracking-[0.3em] opacity-80 hover:opacity-100">{link}</a>
          ))}
        </nav>
      </header>

      {/* Dashboard Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Active Resolutions & Philosophy */}
        <div className="flex-1 space-y-8">
          {/* Philosophy Card */}
          <section className="bento-card !bg-gradient-to-br from-indigo-950/40 via-slate-950 to-slate-950 relative overflow-hidden group border-primary/20">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-4 px-6 py-2 bg-primary/10 border border-primary/30 text-primary rounded-full w-fit font-bold text-[10px] uppercase tracking-widest">
                 System Philosophy
              </div>
              <h3 className="text-4xl font-bold text-white leading-tight tracking-tighter italic shadow-primary/10 drop-shadow-xl">Operational <br/>Growth Junction.</h3>
              <p className="text-xl text-slate-400 leading-relaxed italic opacity-90 font-medium">
                Disputes are processed as high-fidelity development moments. Mediation is engineered to amplify collaborative proficiency and domain alignment.
              </p>
              <div className="flex items-center gap-6 text-primary font-bold group-hover:translate-x-6 transition-all duration-700 cursor-pointer text-xs uppercase tracking-widest">
                <span>Investigate Trust Architecture</span>
                <ArrowRight size={20} />
              </div>
            </div>
            {/* Decorative Element */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] group-hover:scale-125 transition-transform duration-1000"></div>
          </section>

          {/* Active Resolutions List */}
          <section className="space-y-8">
            <div className="flex items-center justify-between px-6">
              <h3 className="text-xl font-bold text-white tracking-tight uppercase italic underline decoration-primary/30 underline-offset-4">Active Deployments.</h3>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Load: 03 Units</span>
            </div>
            
            <div className="space-y-6">
              {[
                { title: 'Sustainable UX Framework', case: '#8829', org: 'TechCorp', status: 'Revision Phase', color: 'border-l-primary', icon: BarChart3, iconColor: 'text-primary' },
                { title: 'API Documentation Standards', case: '#7104', org: 'DevCloud', status: 'Mediator Assigned', color: 'border-l-emerald-400', icon: CheckCircle2, iconColor: 'text-emerald-400', opacity: 'opacity-70' },
                { title: 'Marketing Ethics Project', case: '#9021', org: 'BrandWise', status: 'Final Intake', color: 'border-l-amber-400', icon: MessageSquare, iconColor: 'text-amber-400', opacity: 'opacity-70' }
              ].map((res) => (
                <div key={res.title} className={cn(
                  "bento-card !border-l-8 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-slate-900 transition-all duration-500 cursor-pointer gap-8",
                  res.color,
                  res.opacity
                )}>
                  <div className="flex items-center gap-8">
                    <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center shadow-inner">
                      <res.icon className={res.iconColor} size={28} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-white tracking-tight">{res.title}.</p>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">Reference {res.case} • {res.org}</p>
                    </div>
                  </div>
                  <span className="px-8 py-3 bg-slate-900 border border-slate-800 rounded-xl text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors">{res.status}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Specific Case View */}
        <div className="lg:w-[480px] flex flex-col gap-8">
          <section className="bento-card border-primary/20 bg-slate-950 flex flex-col h-full space-y-10 relative group shadow-2xl shadow-primary/5">
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold text-primary tracking-[0.4em] uppercase">Context Detail.</h3>
                <button className="text-slate-700 hover:text-white transition-all">
                  <Maximize2 size={20} />
                </button>
              </div>
              <h4 className="text-4xl font-bold text-white leading-none tracking-tighter group-hover:text-primary transition-all duration-700 italic">Sustainable <br/>UX Framework.</h4>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-2 bg-primary/10 text-primary rounded-xl font-bold text-[10px] uppercase tracking-widest border border-primary/20">High Priority</span>
                <span className="px-6 py-2 bg-slate-900 text-slate-500 rounded-xl font-bold text-[10px] uppercase tracking-widest border border-slate-800 italic">UI/UX Track</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex-1 space-y-12 relative px-2">
              <div className="absolute left-[13px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-slate-800/40 to-transparent"></div>
              
              {[
                { title: 'Case Initialize', time: 'Oct 24, 09:15', status: 'done', icon: CheckCircle2 },
                { title: 'Org Response', time: 'Oct 25, 14:30', desc: '"System requires enhanced accessibility parameters for valid iteration."', status: 'active', icon: MessageSquare },
                { title: 'Revision Queue', time: 'Awaiting Intake', status: 'pending', icon: Hourglass }
              ].map((step, idx) => (
                <div key={idx} className="relative flex gap-10 group/item">
                  <div className={cn(
                    "w-7 h-7 rounded-full flex items-center justify-center relative z-10 shadow-2xl transition-all duration-700 group-hover/item:scale-125",
                    step.status === 'done' ? "bg-primary text-white border-4 border-slate-950" : 
                    step.status === 'active' ? "bg-primary text-white border-4 border-slate-950 animate-pulse" : 
                    "bg-slate-900 text-slate-700 border-4 border-slate-950"
                  )}>
                    <step.icon size={14} />
                  </div>
                  <div className="space-y-1 pt-1 opacity-80 group-hover/item:opacity-100 transition-opacity">
                    <p className="font-bold text-white text-lg tracking-tight leading-none">{step.title}.</p>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{step.time}</p>
                    {step.desc && (
                      <div className="mt-6 p-6 bg-slate-900/40 rounded-2xl border border-slate-800/50 shadow-inner group-hover/item:bg-slate-900 transition-all">
                         <p className="text-xs text-slate-400 italic leading-relaxed font-medium">"{step.desc}"</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-10 border-t border-slate-800/50">
              <button className="w-full py-6 bg-primary text-white font-bold text-xs uppercase tracking-[0.3em] rounded-2xl shadow-2xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-6 group overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
                <Edit3 size={20} className="relative z-10" />
                <span className="relative z-10">Request Revision</span>
              </button>
              <button className="w-full py-6 bg-slate-900 border border-slate-800 text-slate-500 font-bold text-xs uppercase tracking-[0.3em] rounded-2xl hover:text-white transition-all active:scale-95 flex items-center justify-center gap-6">
                <User size={20} />
                Intake Mediator
              </button>
            </div>
          </section>

          {/* Guidance Mini-Card */}
          <div className="bento-card !border-amber-400/20 bg-slate-950 flex items-start gap-8 group">
            <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center justify-center text-amber-400 group-hover:rotate-12 transition-transform duration-500 shadow-amber-500/10 shadow-2xl">
              <Lightbulb size={24} />
            </div>
            <div className="space-y-2">
              <p className="font-bold text-amber-400/80 text-[10px] uppercase tracking-widest">Protocol Tip.</p>
              <p className="text-sm text-slate-500 font-medium italic leading-relaxed">High-fidelity commentary accelerates resolution velocity by ~40%.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
