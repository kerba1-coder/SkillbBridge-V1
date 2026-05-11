import React, { useState } from 'react';
import { 
  Award, 
  Clock, 
  BadgeCheck, 
  ChevronRight, 
  Star, 
  Download, 
  MapPin, 
  Target, 
  Trophy,
  History,
  X,
  Zap,
  CheckCircle2,
  Brain
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export const Passport: React.FC = () => {
  const { profile } = useAuth();
  const [selectedGig, setSelectedGig] = useState<any>(null);
  const [showGraph, setShowGraph] = useState(false);

  const completedGigs = [
    { 
      id: 1,
      title: 'Market Entry Research', 
      org: 'TechCorp Global', 
      hours: '15h', 
      score: '5.0', 
      logo: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop',
      feedback: "Alex delivered exceptional research points. The depth of the consumer behavioral analysis was beyond our expectations.",
      skillsGained: ['Market Analysis', 'Consumer Psychology', 'Strategic Planning']
    },
    { 
      id: 2,
      title: 'UX Audit & Wireframing', 
      org: 'GreenEco Startup', 
      hours: '32h', 
      score: '4.9', 
      logo: 'https://images.unsplash.com/photo-1572021335469-31716248e15c?w=100&h=100&fit=crop',
      feedback: "Great eye for detail. The wireframes were intuitive and ready for immediate engineering takeoff.",
      skillsGained: ['UX Design', 'Wireframing', 'User Research']
    },
    { 
      id: 3,
      title: 'Social Media Strategy', 
      org: 'EduNet Media', 
      hours: '20h', 
      score: '5.0', 
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=100&h=100&fit=crop',
      feedback: "Highly creative approach to our social corridors. Engagement increased by 40% in just two weeks.",
      skillsGained: ['Social Marketing', 'Content Strategy', 'Analytics']
    }
  ];

  return (
    <div className="space-y-12 pb-24 animate-in fade-in duration-1000">
      {/* Header */}
      <header className="flex justify-between items-center px-4">
        <h2 className="text-4xl lg:text-7xl font-extrabold text-on-surface tracking-tighter uppercase italic">
          Skill <span className="text-primary">Passport.</span>
        </h2>
        <button className="p-5 bg-white border border-slate-100 shadow-sm rounded-2xl text-slate-600 hover:text-primary hover:scale-110 active:scale-90 transition-all">
          <History size={24} />
        </button>
      </header>

      {/* Focus Zone / Hero Stats */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Elite Talent Status Ring */}
        <div className="md:col-span-12 lg:col-span-5 bento-card flex flex-col items-center justify-center text-center space-y-10 min-h-[440px] relative overflow-hidden group bg-white border-slate-100 shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
          
          <div className="relative w-64 h-64 group-hover:scale-110 transition-transform duration-1000">
            <svg className="w-full h-full transform -rotate-90">
              <circle className="text-slate-300" cx="128" cy="128" r="110" fill="transparent" stroke="currentColor" strokeWidth="20"></circle>
              <circle 
                className="text-primary transition-all duration-1000" 
                cx="128" cy="128" r="110" 
                fill="transparent" 
                stroke="currentColor" 
                strokeWidth="20" 
                strokeDasharray="691.15" 
                strokeDashoffset={691.15 * (1 - 0.85)} 
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-7xl font-black text-on-surface tracking-tighter">85%</span>
              <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em] opacity-90 mt-1">Efficiency</span>
            </div>
          </div>
          <div className="space-y-3 relative z-10">
            <h3 className="text-3xl font-black text-on-surface tracking-tight underline decoration-primary/20 underline-offset-8 uppercase italic">Elite Talent.</h3>
            <p className="text-xs font-bold text-slate-600 uppercase tracking-widest leading-relaxed max-w-xs mx-auto">
              System verified. Top 5% of global learner cohort.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000 text-primary">
            <Trophy size={180} />
          </div>
        </div>

        {/* Stats Overview */}
        <div className="md:col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bento-card flex items-center gap-8 group hover:bg-slate-50 bg-white border-slate-100 shadow-sm">
            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-primary shadow-inner group-hover:scale-110 transition-transform">
              <Clock size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Gig Hrs. Logged</p>
              <p className="text-5xl font-black text-on-surface tracking-tighter">{profile?.experienceHours || 120}H</p>
            </div>
          </div>

          <div className="bento-card flex items-center gap-8 group hover:bg-slate-50 bg-white border-slate-100 shadow-sm">
            <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex items-center justify-center text-emerald-500 shadow-inner group-hover:scale-110 transition-transform">
              <BadgeCheck size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Verified Proof</p>
              <p className="text-5xl font-black text-on-surface tracking-tighter">{profile?.credentialsEarned || 8}</p>
            </div>
          </div>

          {/* Next Badge Unlock */}
          <div className="sm:col-span-2 bento-card border-slate-100 bg-[#f0f4ff] flex flex-col justify-between overflow-hidden group shadow-sm">
            <div className="relative z-10 space-y-2">
              <h3 className="text-2xl font-black text-on-surface tracking-tight italic uppercase">Strategic Planner II.</h3>
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">Next System Unlock • 3/4 tasks complete</p>
            </div>
            <div className="mt-8 space-y-4 relative z-10">
              <div className="h-6 w-full bg-white rounded-full shadow-inner overflow-hidden flex items-center px-1">
                <div className="h-4 bg-primary rounded-full w-3/4 shadow-lg group-hover:scale-x-105 transition-transform origin-left duration-1000"></div>
              </div>
            </div>
            <Award className="absolute -bottom-10 -right-10 text-primary opacity-[0.05] rotate-12 scale-[3] pointer-events-none group-hover:scale-[4] group-hover:rotate-0 transition-all duration-1000" />
          </div>
        </div>
      </section>

      {/* Mastered Skills Section */}
      <section className="space-y-8">
        <div className="flex justify-between items-end px-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-on-surface tracking-tight uppercase italic">Quantified Proficiencies.</h2>
            <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest opacity-80">AI Verified Skills</p>
          </div>
          <button 
            onClick={() => setShowGraph(true)}
            className="text-xs font-bold text-primary uppercase tracking-[0.2em] hover:brightness-125 transition-all"
          >
            View Full Graph
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(profile?.masteredSkills || []).map((skill, idx) => (
            <div key={idx} className="bento-card flex items-start gap-6 group hover:translate-y-[-4px] bg-white border-slate-100 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-md">
                <Target size={28} />
              </div>
              <div className="flex-1 space-y-4">
                <h4 className="text-lg font-black text-on-surface leading-tight group-hover:text-primary transition-colors italic">{skill.name}</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 text-slate-700 text-[8px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest border border-slate-200">{skill.level}</span>
                  {skill.tags.map(tag => (
                    <span key={tag} className="bg-primary/10 text-primary text-[8px] px-3 py-1 rounded-lg font-bold uppercase tracking-widest border border-primary/20">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gig History */}
      <section className="space-y-8">
        <div className="space-y-1 px-4">
          <h2 className="text-2xl font-black text-on-surface tracking-tight uppercase italic">completed gigs.</h2>
          <p className="text-[10px] font-extrabold text-slate-600 uppercase tracking-widest opacity-80">Ledger of completed work</p>
        </div>
        
        <div className="bento-card !p-0 overflow-hidden bg-white border-slate-100 shadow-sm">
          <div className="divide-y divide-slate-100">
            {completedGigs.map((gig, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedGig(gig)}
                className="p-6 lg:p-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 hover:bg-slate-50 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-md group-hover:scale-110 transition-transform duration-500">
                    <img alt={gig.org} className="w-full h-full object-cover" src={gig.logo} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-on-surface group-hover:text-primary transition-colors tracking-tight italic">{gig.title}</h3>
                    <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{gig.org} • {gig.hours}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3 bg-slate-100 px-6 py-2.5 rounded-full border border-slate-200 shadow-inner">
                    <Star className="text-primary fill-primary" size={16} />
                    <span className="font-extrabold text-on-surface text-sm tracking-tighter">{gig.score}</span>
                  </div>
                  <ChevronRight className="text-slate-600 group-hover:text-primary group-hover:translate-x-3 transition-all" size={28} />
                </div>
              </div>
            ))}
          </div>
          <div className="p-10 text-center bg-slate-50 border-t border-slate-100">
            <button className="flex items-center gap-4 mx-auto font-bold text-[10px] uppercase tracking-[0.4em] text-slate-600 hover:text-primary transition-all group">
              <Download size={18} className="group-hover:-translate-y-1 transition-transform" />
              Verified Skill Export (.PDF)
            </button>
          </div>
        </div>
      </section>

      {/* Gig Details Modal */}
      <AnimatePresence>
        {selectedGig && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGig(null)}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-lg bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-3xl relative z-10"
            >
              <div className="p-6 lg:p-10 space-y-8">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                      <img src={selectedGig.logo} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/20 underline-offset-4">{selectedGig.title}</h3>
                      <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{selectedGig.org}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelectedGig(null)} className="p-2 text-slate-600 hover:text-primary transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="text-primary fill-primary" size={16} />
                    <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Hiring Org Feedback</h4>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 italic">
                    <p className="text-slate-600 text-sm leading-relaxed font-medium">"{selectedGig.feedback}"</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="text-primary" size={16} />
                    <h4 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.3em]">Skills Gained</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {selectedGig.skillsGained.map((skill: string) => (
                      <span key={skill} className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl border border-primary/20">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedGig(null)}
                  className="w-full py-5 bg-primary text-white font-black rounded-2xl hover:brightness-110 transition-all uppercase tracking-[0.2em] text-xs shadow-xl active:scale-95 shadow-primary/20"
                >
                  Close Review
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Skill Graph Modal */}
      <AnimatePresence>
        {showGraph && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGraph(false)}
              className="absolute inset-0 bg-slate-50/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl h-[80vh] flex flex-col relative z-20 space-y-8"
            >
              <div className="flex justify-between items-center px-4">
                <div className="space-y-1 text-left">
                  <h3 className="text-3xl lg:text-5xl font-black text-on-surface tracking-tighter uppercase italic">Skills <span className="text-primary">Graph.</span></h3>
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-[0.4em]">Visualizing your professional evolution</p>
                </div>
                <button onClick={() => setShowGraph(false)} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-600 hover:text-primary shadow-sm transition-all">
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 bg-white rounded-[4rem] border border-slate-100 relative overflow-hidden flex items-center justify-center min-h-[500px] shadow-2xl">
                {/* Simulated Graph Concept */}
                <div className="absolute inset-0 opacity-10">
                  <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,186,242,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                </div>
                
                <div className="relative w-full h-full p-4 lg:p-20 flex items-center justify-center scale-75 lg:scale-100">
                    {/* Central Point */}
                    <motion.div 
                      animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-24 h-24 lg:w-32 lg:h-32 bg-primary rounded-full flex items-center justify-center shadow-xl z-10"
                    >
                      <Brain size={32} className="text-white lg:hidden" />
                      <Brain size={48} className="text-white hidden lg:block" />
                    </motion.div>

                    {/* Surrounding Points */}
                    {[
                    { name: 'Analytics', angle: 0, dist: 160, distDesktop: 260, color: 'bg-primary' },
                      { name: 'Marketing', angle: 45, dist: 140, distDesktop: 220, color: 'bg-emerald-500' },
                      { name: 'Strategy', angle: 100, dist: 180, distDesktop: 280, color: 'bg-rose-500' },
                      { name: 'UX Design', angle: 155, dist: 150, distDesktop: 240, color: 'bg-amber-500' },
                      { name: 'Automation', angle: 210, dist: 170, distDesktop: 270, color: 'bg-indigo-500' },
                      { name: 'AI Safety', angle: 265, dist: 145, distDesktop: 230, color: 'bg-primary' },
                      { name: 'Research', angle: 315, dist: 155, distDesktop: 250, color: 'bg-emerald-500' }
                    ].map((point, i) => {
                      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
                      const distance = isMobile ? point.dist : point.distDesktop;
                      const rad = (point.angle * Math.PI) / 180;
                      const x = Math.cos(rad) * distance;
                      const y = Math.sin(rad) * distance;
                      
                      return (
                        <div key={i} className="absolute">
                          {/* Connection Line */}
                          <motion.div 
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ delay: i * 0.1, duration: 1 }}
                            className="absolute bg-slate-100 h-1 origin-left rounded-full"
                            style={{ 
                              width: distance, 
                              transform: `rotate(${point.angle}deg)`,
                              top: 0,
                              left: 0
                            }}
                          />
                          
                          <motion.div 
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="absolute flex flex-col items-center gap-2 lg:gap-3 z-20"
                            style={{ 
                              transform: `translate(${x}px, ${y}px)`
                            }}
                          >
                            <div className={cn("w-4 h-4 lg:w-6 lg:h-6 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.05)]", point.color)}></div>
                            <span className="text-[8px] lg:text-[10px] font-black text-on-surface uppercase tracking-widest whitespace-nowrap bg-white border border-slate-100 px-3 lg:px-4 py-1.5 lg:py-2 rounded-lg lg:rounded-xl shadow-lg">
                              {point.name}
                            </span>
                          </motion.div>
                        </div>
                      )
                    })}
                </div>
                
                <div className="absolute bottom-12 lg:bottom-16 left-12 lg:left-16 text-left space-y-2 lg:space-y-4 max-w-[280px] lg:max-w-sm">
                   <div className="flex items-center gap-3">
                     <CheckCircle2 size={24} className="text-emerald-500" />
                     <p className="text-[10px] lg:text-sm font-black text-on-surface tracking-widest uppercase italic border-b-2 border-primary/20 pb-1">Verified Skill Map</p>
                   </div>
                   <p className="text-[10px] lg:text-sm font-medium text-slate-600 leading-relaxed uppercase tracking-tight italic">
                     Your work history shows strong proficiency across these interconnected areas.
                   </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
