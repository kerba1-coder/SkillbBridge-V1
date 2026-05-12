import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Briefcase, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  MessageSquare, 
  FileText, 
  Zap, 
  Target, 
  TrendingUp, 
  BookOpen, 
  History, 
  Heart, 
  Award, 
  Sparkles,
  ChevronRight,
  Upload,
  ExternalLink,
  MessageCircle,
  BarChart3,
  Lightbulb,
  Plus
} from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { ALL_GIGS } from '../data/gigs';

export const ProjectDashboard: React.FC = () => {
  const { id } = useParams();
  const gig = ALL_GIGS.find(g => String(g.id) === id) || ALL_GIGS[0];
  
  const [activeTab, setActiveTab] = useState<'overview' | 'work' | 'support' | 'growth'>('overview');
  const [showJournalForm, setShowJournalForm] = useState(false);
  const [journalEntries, setJournalEntries] = useState([
    { date: 'Mar 10', entry: 'Completed baseline mapping for the secondary domain. Identified clear overlap with Q3 objectives.', workload: 2, confidence: 4 },
    { date: 'Mar 08', entry: 'Initial alignment session with organization leads. Defined success criteria and scope boundaries.', workload: 3, confidence: 5 }
  ]);
  const [newEntry, setNewEntry] = useState('');
  const [wellnessValues, setWellnessValues] = useState({ workload: 3, confidence: 4 });

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }).replace(',', '');
    setJournalEntries([{ date, entry: newEntry, ...wellnessValues }, ...journalEntries]);
    setNewEntry('');
    setShowJournalForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      {/* 1. Header / Overview Section */}
      <section className="col-span-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-4 mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Link to="/projects" className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-primary transition-all mr-2 shadow-sm">
                <ArrowLeft size={16} />
              </Link>
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">Active Deployment</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-on-surface tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">
              {gig.title}.
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-slate-700 font-medium italic flex items-center gap-2">
                <Plus size={14} className="text-primary" /> {gig.org} • Phase 1: Initiation
              </p>
              <button 
                onClick={() => {
                  setActiveTab('overview');
                  setShowJournalForm(true);
                  // Scroll to bottom where the form is
                  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }}
                className="px-4 py-1.5 bg-white border border-slate-200 text-slate-600 hover:text-primary rounded-lg text-[9px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm"
              >
                Update progress journal
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
             <div className="bento-card !py-3 !px-6 flex flex-col items-center justify-center border-emerald-500/20 bg-emerald-100/50">
                <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest">Progress</span>
                <span className="text-xl font-black text-on-surface italic">24%</span>
             </div>
             <div className="bento-card !py-3 !px-6 flex flex-col items-center justify-center border-slate-200">
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-widest">Temporal</span>
                <span className="text-xl font-black text-on-surface italic">{gig.duration}</span>
             </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
           {[
             { label: 'Next Milestone', val: 'Mar 15', icon: Calendar, color: 'text-primary' },
             { label: 'Stipend', val: gig.price === '0' ? 'Pro-Bono' : `$${gig.price}`, icon: Award, color: 'text-amber-400' },
             { label: 'Time Allocated', val: '12h / 40h', icon: Clock, color: 'text-sky-400' },
             { label: 'Status', val: 'On Track', icon: CheckCircle2, color: 'text-emerald-400' }
           ].map((stat, i) => (
              <div key={i} className="bento-card !p-4 flex items-center gap-4 border-slate-100 bg-white shadow-sm">
                <div className={cn("p-2 rounded-xl bg-slate-50", stat.color)}>
                  <stat.icon size={18} />
                </div>
                <div>
                  <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xs font-black text-on-surface italic">{stat.val}</p>
                </div>
              </div>
           ))}
        </div>
      </section>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-12 gap-8 px-4">
        
        {/* LEFT COLUMN: The Core Work */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          
          {/* 2. Project Scope & Objectives */}
          <section className="bento-card space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Target className="text-primary" size={24} />
                <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic underline decoration-primary/20 underline-offset-4">Mission Parameters.</h3>
              </div>
              <span className="text-[8px] font-bold text-slate-700 uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-slate-200 bg-slate-50">Baseline Locked</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic opacity-60">Objective Profile</p>
                <div className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] italic">
                   <p className="text-sm text-slate-600 leading-relaxed">
                     "{gig.desc}"
                   </p>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest italic opacity-60">Success Criteria</p>
                <ul className="space-y-3">
                  {[
                    '95% data accuracy in final report',
                    'Strategic alignment with Q3 goals',
                    'Verified delivery of all assets'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-xs text-slate-300 font-medium italic">
                      <div className="w-1 h-1 rounded-full bg-primary"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 3 & 10. Deliverables & Revision Center */}
          <section className="bento-card space-y-6">
            <div className="flex items-center gap-3">
              <FileText className="text-sky-600" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Deliverable Protocol.</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Initial Research Draft', status: 'Approved', date: '2 days ago', version: 'v1.2' },
                { name: 'System Architecture Diagram', status: 'Revisions Requested', date: 'Today', version: 'v2.0' },
                { name: 'Final Strategy Presentation', status: 'Pending', date: 'Due in 5 days', version: 'N/A' }
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-white rounded-3xl border border-slate-100 hover:border-primary/20 transition-all group shadow-sm">
                  <div className="flex items-center gap-5">
                    <div className={cn(
                      "p-3 rounded-2xl",
                      file.status === 'Approved' ? "bg-emerald-50 text-emerald-600" :
                      file.status === 'Revisions Requested' ? "bg-rose-50 text-rose-600" : "bg-slate-50 text-slate-600"
                    )}>
                      <FileText size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface flex items-center gap-2">
                        {file.name} 
                        <span className="text-[8px] opacity-40 font-mono tracking-tighter">{file.version}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{file.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={cn(
                      "text-[8px] font-bold uppercase tracking-widest px-3 py-1 rounded-lg border",
                      file.status === 'Approved' ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5" :
                      file.status === 'Revisions Requested' ? "border-rose-500/20 text-rose-500 bg-rose-500/5" : "border-slate-800 text-slate-500"
                    )}>
                      {file.status}
                    </span>
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <Upload size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 4. Milestones & Timeline */}
          <section className="bento-card space-y-6">
            <div className="flex items-center gap-3">
              <History className="text-amber-600" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Milestones.</h3>
            </div>
            
            <div className="relative pl-8 space-y-12 before:absolute before:left-3 before:top-4 before:bottom-4 before:w-px before:bg-slate-800">
               {[
                 { title: 'Kickoff & Alignment', date: 'March 1', done: true },
                 { title: 'Infrastructure Validation', date: 'March 8', done: true },
                 { title: 'Draft Submission', date: 'March 15', done: false, active: true },
                 { title: 'Final Review', date: 'March 22', done: false }
               ].map((m, i) => (
                 <div key={i} className="relative">
                    <div className={cn(
                      "absolute -left-[1.65rem] top-1 w-6 h-6 rounded-full border-4 border-white z-10 flex items-center justify-center",
                      m.done ? "bg-emerald-500" : m.active ? "bg-primary animate-pulse" : "bg-slate-200"
                    )}>
                      {m.done && <CheckCircle2 size={12} className="text-white" />}
                    </div>
                    <div className="space-y-1">
                      <p className={cn(
                        "text-sm font-bold uppercase tracking-tight",
                        m.done ? "text-slate-400" : m.active ? "text-primary" : "text-slate-400"
                      )}>{m.title}</p>
                      <p className="text-[10px] text-slate-500 font-bold italic">{m.date}</p>
                    </div>
                 </div>
               ))}
            </div>
          </section>

          {/* 12. Time Tracking & Work Log */}
          <section className="bento-card space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="text-indigo-600" size={24} />
                <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Operational Log.</h3>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-500/20 transition-all active:scale-95">
                <Plus size={14} /> Log Session
              </button>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
               <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: '30%' }}></div>
               </div>
               
               <div className="space-y-4">
                 {[
                   { date: 'Mar 10', task: 'Domain Research', hours: '2.5h' },
                   { date: 'Mar 09', task: 'Internal Sync', hours: '1.0h' },
                   { date: 'Mar 08', task: 'Baseline Mapping', hours: '4.2h' }
                 ].map((log, i) => (
                   <div key={i} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                      <p className="text-xs font-bold text-on-surface italic">{log.task}</p>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] text-slate-500 font-black tracking-widest uppercase">{log.date}</span>
                        <span className="text-xs font-black text-indigo-600 italic">{log.hours}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN: Support, AI & Growth */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          
          {/* 5. AI Project Coach */}
          <section className="bento-card border-primary/20 bg-primary/5 space-y-6 relative overflow-hidden group">
            <div className="flex items-center gap-3 relative z-10">
              <div className="p-2 rounded-xl bg-primary/20 text-primary">
                <Zap size={20} />
              </div>
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Intelligence Hub.</h3>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="p-4 bg-white/80 rounded-2xl border border-primary/20 italic text-[11px] text-slate-700 leading-relaxed shadow-sm">
                "Alex, based on the current milestone, I recommend prioritizing the System Logic diagrams. Your previous work on similar nodes suggests this is where you can excel the most. Need a breakdown?"
              </div>
              <div className="flex flex-col gap-2">
                {[
                  'Break down next task',
                  'Draft email to supervisor',
                  'Identify potential blockers'
                ].map((action, i) => (
                  <button key={i} className="text-left py-3 px-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 text-[10px] font-bold text-slate-400 hover:text-white transition-all italic tracking-tight">
                    {action}
                  </button>
                ))}
              </div>
            </div>
            
            <Sparkles className="absolute -bottom-10 -right-10 text-primary/5 scale-[3] pointer-events-none group-hover:rotate-12 transition-transform duration-[4s]" size={100} />
          </section>

          {/* 6. Communication Hub */}
          <section className="bento-card space-y-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="text-on-surface" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Nexus Comm.</h3>
            </div>
            
              <div className="space-y-4">
                 <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-primary shadow-sm">
                      <Zap size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-on-surface">Sarah (Lead)</p>
                      <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">Online</p>
                    </div>
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <MessageCircle size={18} />
                    </button>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-[2rem] hover:border-primary/20 transition-all shadow-sm">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Office Hours</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-[2rem] hover:border-primary/20 transition-all shadow-sm">
                      <History size={18} className="text-primary" />
                      <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Meeting Notes</span>
                    </button>
                 </div>
              </div>
          </section>

          {/* 7, 15. Learning & Skill Growth */}
          <section className="bento-card space-y-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="text-emerald-600" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic">Growth Metrics.</h3>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-4">
                 <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest italic">Skills in Deployment</p>
                 <div className="flex flex-wrap gap-2">
                   {gig.skills.map((skill, i) => (
                     <div key={i} className="px-4 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl text-[9px] font-black uppercase tracking-widest italic">
                       {skill}
                     </div>
                   ))}
                 </div>
               </div>
               
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                   <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Market Relevance</p>
                   <p className="text-[11px] text-slate-600 leading-relaxed italic">
                     These specific nodes are currently trending with +12% demand in the {gig.category} sector this quarter.
                   </p>
                </div>
            </div>
          </section>

          {/* 8, 14. Career & Portfolio */}
           <section className="bento-card border-indigo-400/20 space-y-6">
            <div className="flex items-center gap-3">
              <Award className="text-indigo-600" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic underline decoration-indigo-100 underline-offset-4">Market Value.</h3>
            </div>
            
            <p className="text-[10px] text-slate-600 font-medium italic leading-relaxed">
              This deployment quantifies your expertise for high-demand roles. We're tracking how this project increases your visibility to organizations hiring for similar strategic skill nodes.
            </p>

            <div className="space-y-4 text-center">
               <div className="p-6 bg-slate-50 rounded-[3rem] border border-indigo-100 space-y-4">
                  <p className="text-xs font-bold text-slate-500 italic">Portfolio entry draft auto-generating...</p>
                  <div className="w-full h-12 bg-white border border-dashed border-indigo-200 rounded-2xl flex items-center justify-center">
                    <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest italic animate-pulse">Processing Evidence</span>
                  </div>
               </div>
               
               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest italic">
                 Aligned Pathways: <span className="text-indigo-600">Junior Architect, Data Strategist</span>
               </p>
            </div>
          </section>

          {/* 11. Resource Center */}
          <section className="bento-card space-y-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-sky-600" size={24} />
              <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic underline decoration-sky-100 underline-offset-4">Asset Library.</h3>
            </div>
            
            <p className="text-[10px] text-slate-600 font-medium italic leading-relaxed">
              Standardized templates and organizational briefs optimized for your workflow. Access these mission-critical documents to maintain alignment with organization protocols.
            </p>

            <div className="grid grid-cols-1 gap-3">
               {[
                 { name: 'Organization Background', type: 'PDF' },
                 { name: 'Project Template', type: 'Design' },
                 { name: 'Workflow Best Practices', type: 'Link' }
               ].map((res, i) => (
                 <button key={i} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-sky-200 transition-all text-left group shadow-sm">
                    <div className="flex items-center gap-4">
                      <FileText size={16} className="text-sky-600" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-on-surface transition-colors">{res.name}</span>
                    </div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{res.type}</span>
                 </button>
               ))}
            </div>
          </section>

          {/* 9, 13. Wellness & Reflection */}
          <section className="bento-card space-y-6">
             <div className="flex items-center gap-3">
                <Heart className="text-rose-500" size={24} />
                <h3 className="text-xl font-bold text-on-surface tracking-tight uppercase italic underline decoration-rose-100 underline-offset-4">Learner Health.</h3>
             </div>
             
             <p className="text-[10px] text-slate-600 font-medium italic leading-relaxed">
               Biometric and qualitative feedback loops to ensure sustainable growth. We monitor your workload and confidence levels to optimize the difficulty of future mission deployments.
             </p>

             <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Workload</p>
                      <div className="flex gap-1">
                         {[1,2,3,4,5].map(i => <div key={i} className={cn("h-1.5 flex-1 rounded-full", i <= journalEntries[0].workload ? "bg-emerald-500" : "bg-slate-100")}></div>)}
                      </div>
                   </div>
                   <div className="space-y-2 text-right">
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest italic">Confidence</p>
                      <div className="flex gap-1 justify-end">
                         {[1,2,3,4,5].map(i => <div key={i} className={cn("h-1.5 w-full flex-1 rounded-full", i <= journalEntries[0].confidence ? "bg-primary" : "bg-slate-100")}></div>)}
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   {journalEntries.slice(0, 2).map((entry, i) => (
                      <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 shadow-sm">
                         <div className="flex justify-between items-center">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{entry.date}</span>
                            <div className="flex gap-1">
                               <div className="w-1 h-1 rounded-full bg-primary/40"></div>
                               <div className="w-1 h-1 rounded-full bg-emerald-400/40"></div>
                            </div>
                         </div>
                         <p className="text-[11px] text-slate-700 line-clamp-2 italic leading-relaxed">"{entry.entry}"</p>
                      </div>
                   ))}
                </div>
                
                {showJournalForm ? (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-4 pt-4 border-t border-slate-100"
                  >
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">Update Progress Journal Active...</p>
                    <textarea 
                      value={newEntry}
                      onChange={(e) => setNewEntry(e.target.value)}
                      placeholder="Reflect on today's accomplishments, challenges, and growth..."
                      className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs text-on-surface placeholder:text-slate-400 outline-none focus:border-primary/50 transition-all min-h-[120px] italic shadow-inner"
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-2">
                          <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Self-Assessed Workload</label>
                          <select 
                            value={wellnessValues.workload}
                            onChange={(e) => setWellnessValues({...wellnessValues, workload: Number(e.target.value)})}
                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] text-on-surface outline-none"
                          >
                            <option value="1">Minimal Load</option>
                            <option value="2">Sustainable</option>
                            <option value="3">Full Load</option>
                            <option value="4">Heavy Load</option>
                            <option value="5">Overcapacity</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <label className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Self-Assessed Confidence</label>
                          <select 
                             value={wellnessValues.confidence}
                             onChange={(e) => setWellnessValues({...wellnessValues, confidence: Number(e.target.value)})}
                             className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-[10px] text-on-surface outline-none"
                          >
                             <option value="1">Low Confidence</option>
                             <option value="2">Growing</option>
                             <option value="3">Steady</option>
                             <option value="4">High Confidence</option>
                             <option value="5">Total Mastery</option>
                          </select>
                       </div>
                    </div>

                    <div className="flex gap-2">
                      <button 
                        onClick={handleAddEntry}
                        className="flex-1 py-3 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded-xl hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary/20"
                      >
                        Submit Reflection
                      </button>
                      <button 
                        onClick={() => setShowJournalForm(false)}
                        className="px-4 py-3 bg-white border border-slate-200 text-slate-400 font-bold text-[10px] uppercase tracking-widest rounded-xl hover:text-on-surface transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <button 
                    onClick={() => setShowJournalForm(true)}
                    className="w-full py-4 bg-slate-50 border border-dashed border-slate-200 rounded-3xl text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-primary hover:border-primary/20 transition-all"
                  >
                    Update Progress- Learner Health journal
                  </button>
                )}
             </div>
          </section>

        </div>
      </div>
    </div>
  );
};
