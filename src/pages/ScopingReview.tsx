import React, { useState } from 'react';
import { 
  Rocket, 
  BarChart3, 
  Archive, 
  GripVertical, 
  Lightbulb, 
  X, 
  Plus, 
  Info, 
  Send,
  Sparkles,
  Loader2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { gigService } from '../services/firestoreService';
import { useAuth } from '../contexts/AuthContext';

export const ScopingReview: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!user) return;
    setIsDeploying(true);
    try {
      await gigService.createGig({
        title: 'Generative AI Market Research',
        desc: 'Alignment protocol, persona mapping, and stakeholder ingestion. Predictive modeling and market resonance synthesis.',
        org: profile?.displayName || 'Independent Intelligence Org',
        type: 'Paid',
        price: 850,
        valuation: '$850.00',
        duration: '4 Weeks',
        category: 'Market Intelligence',
        status: 'Active',
        skills: ['Generative AI', 'Market Research', 'Data Viz'],
        postedBy: user.uid,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80'
      });
      navigate('/poster-dashboard');
    } catch (error) {
      console.error("Deployment failed:", error);
    } finally {
      setIsDeploying(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-48 animate-in fade-in duration-1000">
      {/* Header Section */}
      <div className="space-y-4 px-4">
        <h2 className="text-4xl lg:text-7xl font-light text-on-surface tracking-tighter uppercase italic leading-none">
          Intelligence <span className="font-bold underline decoration-primary/30 underline-offset-8 text-primary">Review.</span>
        </h2>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] italic mt-2 decoration-primary/10 underline underline-offset-8">Quantified Parameter Verification • Session: 492-X</p>
      </div>

      {/* Focus Zone: AI Status */}
      <section className="bento-card group border-emerald-400/20 bg-slate-950">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="relative w-32 h-32 group-hover:scale-110 transition-transform duration-1000">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-slate-900" cx="64" cy="64" r="56" fill="transparent" stroke="currentColor" strokeWidth="12"></circle>
              <circle 
                className="text-emerald-400 transition-all duration-1000 animate-pulse" 
                cx="64" cy="64" r="56" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="12" 
                strokeDasharray="351.85" 
                strokeDashoffset={351.85 * (1 - 0.85)} 
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-3xl tracking-tighter">85%</div>
          </div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="bg-emerald-500/10 text-emerald-400 px-6 py-2 rounded-full inline-flex items-center gap-3 border border-emerald-500/20">
              <Sparkles size={18} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Model: Cerebro-V4 • Status: Verified</span>
            </div>
            <p className="text-2xl font-bold text-white leading-tight italic">"The target scope satisfies all identified market research points."</p>
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end px-4">
          <h3 className="text-2xl font-bold text-on-surface tracking-tight uppercase italic underline decoration-primary/30 underline-offset-4">Operational Milestones.</h3>
          <div className="bg-amber-500/10 text-amber-400 px-6 py-2 rounded-full flex items-center gap-3 border border-amber-500/20 animate-pulse">
            <Lightbulb size={18} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Tip: Temporal flexibility recommended</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[
            { title: 'Kickoff', week: 'Week 1', desc: 'Alignment protocol, persona mapping, and stakeholder ingestion.', icon: Rocket, color: 'text-primary' },
            { title: 'Analysis', week: 'Week 2-3', desc: 'Predictive modeling and market resonance synthesis.', icon: BarChart3, color: 'text-emerald-500' },
            { title: 'Final Delivery', week: 'Week 4', desc: 'Verified deployment report and high-fidelity artifact handoff.', icon: Archive, color: 'text-amber-500' }
          ].map((mile) => (
            <div key={mile.title} className="bento-card !border-l-8 !border-l-primary flex gap-8 items-start group hover:bg-slate-50 transition-all duration-300 cursor-move border-slate-100">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner group-hover:scale-110 transition-transform">
                <mile.icon className={mile.color} size={32} />
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="text-2xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tighter italic">{mile.title}.</h4>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{mile.week}</span>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed italic opacity-90 font-medium">{mile.desc}</p>
              </div>
              <GripVertical className="text-slate-300 self-center opacity-40 hover:opacity-100 transition-opacity" size={24} />
            </div>
          ))}
        </div>
      </section>

      {/* Suggested Skills */}
      <section className="space-y-8 bento-card border-slate-100">
        <h3 className="text-xl font-bold text-on-surface px-2 tracking-tight uppercase">Required Competencies.</h3>
        <div className="flex flex-wrap gap-4 px-2">
          {['Generative AI', 'Market Research', 'Data Viz'].map((skill) => (
            <span key={skill} className="bg-primary/5 text-primary px-6 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-3 border border-primary/10 hover:bg-primary hover:text-white transition-all cursor-default">
              {skill} <X size={16} className="cursor-pointer hover:scale-110 transition-transform" />
            </span>
          ))}
          <button className="border-2 border-dashed border-slate-200 text-slate-400 px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest hover:border-primary hover:text-primary transition-all flex items-center gap-3 group">
            <Plus size={20} className="group-hover:rotate-90 transition-transform" /> Add Skill
          </button>
        </div>
      </section>

      {/* Fair Rate Range */}
      <section className="bento-card space-y-12 border-slate-100 bg-white">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <h3 className="text-2xl font-bold text-on-surface tracking-tight uppercase">Quantified Fair Rate.</h3>
          <div className="flex bg-slate-50 rounded-2xl p-2 gap-2 shadow-inner border border-slate-100">
            <button className="px-8 py-3 rounded-xl text-[10px] font-bold bg-white text-on-surface shadow-sm tracking-[0.2em] uppercase transition-all active:scale-95">Currency</button>
            <button className="px-8 py-3 rounded-xl text-[10px] font-bold text-slate-500 hover:text-primary transition-all tracking-[0.2em] uppercase opacity-80">Log-Hours</button>
          </div>
        </div>

        <div className="px-6 space-y-10 group">
          <div className="relative w-full h-4 bg-slate-100 rounded-full shadow-inner border border-slate-200">
            <div className="absolute left-1/4 right-1/4 h-full bg-primary rounded-full group-hover:scale-y-125 transition-transform origin-center duration-500"></div>
            <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 border-slate-50 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-all"></div>
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border-4 border-slate-50 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition-all"></div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">$25/H</span>
            <span className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter italic drop-shadow-sm">$45 - $75/H</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">$150/H</span>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-[2.5rem] flex gap-8 items-start border border-slate-100 italic group shadow-inner">
          <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
             <Info className="text-primary" size={24} />
          </div>
          <p className="text-lg text-slate-600 font-medium opacity-90 leading-relaxed italic">
            "Range calibrated against high-fidelity Generative AI benchmarks in Tier-1 technological hubs."
          </p>
        </div>
      </section>

      {/* Fixed Footer Action */}
      <div className="fixed bottom-0 left-0 lg:left-80 w-full lg:w-[calc(100%-320px)] bg-slate-950/80 backdrop-blur-3xl p-6 lg:p-10 z-50 border-t border-slate-800">
        <div className="max-w-5xl mx-auto flex gap-8">
           <button className="flex-1 bg-slate-900 border border-slate-800 text-slate-500 font-bold py-6 rounded-2xl hover:text-white transition-all active:scale-95 uppercase tracking-[0.4em] text-[10px]">
             Save Draft
           </button>
           <button 
             onClick={handleDeploy}
             disabled={isDeploying}
             className="flex-[2] bg-white text-slate-950 font-bold py-6 rounded-2xl shadow-2xll hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center gap-6 group uppercase tracking-[0.2em] text-sm disabled:opacity-50"
           >
             {isDeploying ? (
               <Loader2 className="animate-spin" size={24} />
             ) : (
               <>
                 Deploy Project
                 <Send className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={24} />
               </>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

