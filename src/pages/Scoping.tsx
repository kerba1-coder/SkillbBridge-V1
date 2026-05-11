import React, { useState, useRef } from 'react';
import { 
  Rocket, 
  BarChart3, 
  Archive, 
  GripVertical, 
  Info, 
  ArrowRight, 
  Send,
  Sparkles,
  Lightbulb,
  Zap,
  Brain,
  Loader2,
  FileText,
  Link as LinkIcon,
  Plus,
  CheckCircle2,
  AlertCircle,
  Eye,
  Globe,
  Users,
  Clock,
  DollarSign,
  ChevronRight,
  ArrowLeft,
  LayoutDashboard,
  Target
} from 'lucide-react';
import { cn } from '../lib/utils';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

type Step = 'INITIATION' | 'ANALYSIS' | 'REVIEW' | 'SETTINGS' | 'PREVIEW' | 'PUBLISH';

export const Scoping: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('INITIATION');
  const [problemStatement, setProblemStatement] = useState('');
  const [isScoping, setIsScoping] = useState(false);
  const [scopedResult, setScopedResult] = useState<any>(null);
  const [inputMethod, setInputMethod] = useState<'scratch' | 'template' | 'upload'>('scratch');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInitializeScoping = async () => {
    if (!problemStatement.trim()) return;
    
    setIsScoping(true);
    try {
      // Step 3 & 4 in flow: AI Analyzes and Generates Draft
      const result = await geminiService.generateGigScope(problemStatement);
      setScopedResult(result);
      setCurrentStep('ANALYSIS');
    } catch (error) {
      console.error('Scoping failed:', error);
    } finally {
      setIsScoping(false);
    }
  };

  const applyTemplate = (template: string) => {
    const templates: { [key: string]: string } = {
      'Process Automation': 'Automate weekly inventory reporting infrastructure using Python and SQL to reduce manual processing time by 80%.',
      'Intelligence Center': 'Build a customer sentiment analysis dashboard that synthesizes social media data into actionable marketing insights.'
    };
    setProblemStatement(templates[template] || '');
    setInputMethod('template');
    
    // Scroll to input
    setTimeout(() => {
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      textareaRef.current?.focus();
    }, 100);
  };

  const steps: { key: Step; label: string; sub: string }[] = [
    { key: 'INITIATION', label: 'Inputs', sub: 'Problem context' },
    { key: 'ANALYSIS', label: 'AI Review', sub: 'System analysis' },
    { key: 'REVIEW', label: 'Refine', sub: 'Edit draft' },
    { key: 'SETTINGS', label: 'Nodes', sub: 'Set constraints' },
    { key: 'PREVIEW', label: 'Verify', sub: 'Final check' },
    { key: 'PUBLISH', label: 'Deploy', sub: 'Live market' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-24 animate-in fade-in duration-1000 overflow-x-hidden w-full px-2">
      {/* 17-Step Process Header (Phase Tracking) */}
      <div className="space-y-6 px-2 lg:px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-2xl lg:text-7xl font-black text-on-surface tracking-tighter uppercase italic leading-none">
              Gig <span className="text-primary underline decoration-primary/20 underline-offset-8">Creation.</span>
            </h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] italic mt-2">Professional Node Generation • Session: Active</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.3em]">Phase {steps.findIndex(s => s.key === currentStep) + 1} / {steps.length}</span>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{steps.find(s => s.key === currentStep)?.label}</p>
            </div>
          </div>
        </div>
        
        {/* Step Indicator */}
        <div className="grid grid-cols-6 gap-1 lg:gap-2">
          {steps.map((s, i) => {
            const isActive = steps.findIndex(step => step.key === currentStep) >= i;
            return (
              <div key={s.key} className="space-y-1 lg:space-y-2">
                <div className={cn(
                  "h-1 lg:h-1.5 rounded-full transition-all duration-700",
                  isActive ? "bg-primary shadow-[0_0_10px_rgba(99,102,241,0.2)]" : "bg-slate-100"
                )} />
                <p className={cn("text-[6px] lg:text-[8px] font-black uppercase tracking-tighter text-center truncate px-1", isActive ? "text-primary" : "text-slate-400")}>{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === 'INITIATION' && (
          <motion.div 
            key="init"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-12"
          >
            {/* Steps 1 & 2 in Flow */}
            <div className="bento-card bg-white border-slate-100 space-y-10 group shadow-sm">
              <div className="space-y-4">
                <h2 className="text-2xl lg:text-4xl font-black text-on-surface tracking-tight italic uppercase underline decoration-primary/10 underline-offset-8">Launch New Gig.</h2>
                <p className="text-sm lg:text-lg text-slate-500 italic leading-relaxed font-medium max-w-2xl">Choose your entry point for AI scoping assistance.</p>
              </div>

              {/* Input Method Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                {[
                  { id: 'scratch', label: 'Scratch', icon: Plus, desc: 'Conceptual start' },
                  { id: 'template', label: 'Template', icon: Grid, desc: 'Standard nodes' },
                  { id: 'upload', label: 'Import', icon: FileText, desc: 'Link or PDF' }
                ].map((method) => (
                  <button 
                    key={method.id}
                    onClick={() => setInputMethod(method.id as any)}
                    className={cn(
                      "p-4 lg:p-6 rounded-2xl lg:rounded-3xl border transition-all flex flex-row sm:flex-col gap-4 items-center sm:items-start text-left group/btn shadow-sm",
                      inputMethod === method.id 
                        ? "bg-primary text-white border-primary" 
                        : "bg-white border-slate-100 text-slate-400 hover:border-primary/20 hover:bg-slate-50"
                    )}
                  >
                    <method.icon size={20} className={cn(inputMethod === method.id ? "text-white" : "text-slate-300 group-hover/btn:text-primary")} />
                    <div className="space-y-0.5 lg:space-y-1">
                      <p className="font-bold uppercase tracking-widest text-[8px] lg:text-[10px]">{method.label}</p>
                      <p className="hidden lg:block text-[10px] font-medium italic opacity-60">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-end ml-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                    {inputMethod === 'upload' ? 'Upload Context / Link' : 'Input Problem statement'}
                  </label>
                  <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest opacity-40 italic">AI-Synch Enabled</span>
                </div>
                <div className="relative">
                  <textarea 
                    ref={textareaRef}
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 focus:border-primary/50 focus:bg-white rounded-[1.5rem] lg:rounded-[2.5rem] p-4 pb-24 lg:p-10 lg:pb-10 text-sm lg:text-xl text-on-surface transition-all resize-none shadow-inner outline-none min-h-[220px] lg:min-h-[350px] placeholder:text-slate-200 tracking-tight italic" 
                    placeholder={inputMethod === 'upload' ? "Paste URL or drag file here..." : "e.g. Automate weekly inventory reporting infrastructure..."} 
                  />

                  {/* Initialize Scoping Button (Overlayed/Bottom Right) */}
                  <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 flex w-[calc(100%-3rem)] lg:w-auto">
                    <button 
                      onClick={handleInitializeScoping}
                      disabled={isScoping || !problemStatement.trim()}
                      className="w-full lg:w-auto px-6 lg:px-12 py-4 lg:py-5 font-black bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all flex items-center justify-center gap-3 lg:gap-6 group uppercase tracking-widest text-[10px] lg:text-xs"
                    >
                      {isScoping ? (
                        <>
                          Synthesizing...
                          <Loader2 className="animate-spin" size={18} />
                        </>
                      ) : (
                        <>
                          Initialize Creation
                          <Send className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Templates Section (Only if in initiation) */}
              <div className="flex flex-col gap-8 pt-10 border-t border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center">
                    <Lightbulb className="text-primary" size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rapid Launch Templates</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[
                    { title: 'Process Automation', desc: 'Streamline repetitive operational tasks into reproducible code.', icon: Zap, color: 'text-primary' },
                    { title: 'Intelligence Center', desc: 'Synthesize raw data sets into actionable domain insights.', icon: Brain, color: 'text-emerald-500' }
                  ].map((prompt) => (
                    <button 
                      key={prompt.title} 
                      onClick={() => applyTemplate(prompt.title)}
                      className="flex items-start text-left p-8 bg-white border border-slate-100 rounded-[2rem] hover:bg-slate-50 hover:border-primary/20 transition-all shadow-sm active:scale-[0.98] group"
                    >
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-3">
                          <prompt.icon className={cn("transition-transform group-hover:scale-110", prompt.color)} size={20} />
                          <p className="font-black text-on-surface tracking-tighter text-xl uppercase italic underline decoration-primary/10 transition-colors group-hover:text-primary">{prompt.title}</p>
                        </div>
                        <p className="text-sm text-slate-500 italic leading-relaxed font-medium group-hover:text-slate-600 transition-colors">{prompt.desc}</p>
                      </div>
                      <ArrowRight className="text-slate-200 group-hover:text-primary group-hover:translate-x-3 transition-all self-center ml-4" size={28} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'ANALYSIS' && (
          <motion.div 
            key="analysis"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Step 3 & 4: AI Analyzes & Generates Draft */}
            <div className="bento-card bg-white border-slate-100 shadow-sm space-y-6 lg:space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                <div className="space-y-2">
                  <span className="bg-primary/5 text-primary px-3 py-1 rounded-md text-[8px] font-black uppercase tracking-widest italic border border-primary/10">AI Draft Generated</span>
                  <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10">Gig Blueprint.</h3>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button onClick={() => setCurrentStep('INITIATION')} className="p-4 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary transition-all shadow-sm">
                    <ArrowLeft size={20} />
                  </button>
                  <button onClick={() => setCurrentStep('REVIEW')} className="flex-1 sm:flex-none px-6 lg:px-8 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-[10px] lg:text-xs uppercase tracking-widest flex items-center justify-center gap-3 italic">
                    Refine <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="space-y-6">
                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl space-y-4 shadow-inner">
                    <label className="text-[10px] font-black text-primary uppercase tracking-widest italic">Extracted Deliverables</label>
                    <ul className="space-y-3">
                      {[
                        'Automated reporting scripts',
                        'Data visualization dashboard',
                        'Process documentation'
                      ].map((d, i) => (
                        <li key={i} className="flex items-center gap-3 text-slate-500 italic font-semibold">
                          <CheckCircle2 size={14} className="text-emerald-500" />
                          <span className="text-xs lg:text-sm">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl space-y-4 shadow-inner">
                    <label className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic">Skill Nodes Targeted</label>
                    <div className="flex flex-wrap gap-2">
                      {['Python', 'SQL', 'Data Orchestration', 'Business Intel'].map(s => (
                        <span key={s} className="px-3 py-1 bg-white border border-slate-100 text-slate-500 text-[8px] lg:text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 lg:p-8 bg-white border border-slate-100 rounded-[1.5rem] lg:rounded-[2.5rem] space-y-4 relative overflow-hidden group shadow-sm">
                    <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:scale-110 transition-transform">
                      <Brain size={80} className="text-primary lg:hidden" />
                      <Brain size={120} className="text-primary hidden lg:block" />
                    </div>
                    <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic">Strategic Context</label>
                    <h4 className="text-lg lg:text-xl font-black text-on-surface tracking-tighter uppercase italic group-hover:text-primary transition-colors">Operational Efficiency Node</h4>
                    <p className="text-xs lg:text-sm text-slate-500 italic font-semibold leading-relaxed">
                      This gig addresses the organizational bottleneck in inventory synchronization. By automating this node, we enable mid-tier managers to reallocate 8+ hours/week to strategic forecasting.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'REVIEW' && (
          <motion.div 
            key="review"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            className="space-y-8"
          >
            {/* Step 5-7: Poster Reviews & AI Quality Check */}
            <div className="bento-card bg-white border-slate-100 shadow-sm space-y-8 lg:space-y-12">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-1">
                  <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10">Refinement Phase.</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 3: Editor Deployment</p>
                </div>
                <button onClick={() => setCurrentStep('SETTINGS')} className="w-full sm:w-auto px-6 lg:px-10 py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-[10px] lg:text-xs uppercase tracking-widest flex items-center justify-center gap-3 italic">
                  Lock Specs <ArrowRight size={18} />
                </button>
              </div>

              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 lg:ml-4">Gig Title</label>
                      <input 
                        defaultValue="Inventory Flow Automation System"
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-base lg:text-xl font-bold text-on-surface italic outline-none focus:border-primary/50 transition-all shadow-inner"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 lg:ml-4">Full Gig Brief</label>
                      <textarea 
                        defaultValue={problemStatement}
                        className="w-full bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl p-4 lg:p-8 text-xs lg:text-sm italic text-slate-500 font-medium leading-relaxed min-h-[150px] lg:min-h-[250px] outline-none focus:border-primary/50 transition-all shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 lg:p-6 bg-rose-50 border border-rose-100 rounded-2xl lg:rounded-3xl space-y-4">
                      <div className="flex items-center gap-2 text-rose-600">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Pulse</span>
                      </div>
                      <p className="text-[10px] lg:text-xs text-slate-600 italic font-semibold leading-relaxed">
                        Scope identified as <span className="text-rose-600 font-black">Aggressive</span>. Recommend adding a checkpoint.
                      </p>
                    </div>

                    <div className="p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl space-y-6 shadow-inner">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Milestones</label>
                      <div className="space-y-4">
                        {[
                          { t: 'Architecture Draft', s: 'Sync Complete' },
                          { t: 'Integration Layer', s: 'Pending' },
                          { t: 'Final Validation', s: 'Pending' }
                        ].map((m, i) => (
                          <div key={i} className="flex items-center gap-4 group">
                             <div className="w-2 h-2 rounded-full bg-primary" />
                             <div className="flex-1">
                               <p className="text-[10px] lg:text-xs font-bold text-on-surface uppercase tracking-tight">{m.t}</p>
                               <p className="text-[8px] lg:text-[9px] text-slate-400 font-black uppercase italic">{m.s}</p>
                             </div>
                             <GripVertical size={14} className="text-slate-300 group-hover:text-slate-500 transition-colors cursor-move" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'SETTINGS' && (
          <motion.div 
            key="settings"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Step 8: Configuration */}
            <div className="bento-card bg-white border-slate-100 shadow-sm space-y-8 lg:space-y-12">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10">Network Protocol.</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 4: Application Logic</p>
                  </div>
                  <button onClick={() => setCurrentStep('PREVIEW')} className="w-full sm:w-auto px-6 lg:px-10 py-4 lg:py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-xs lg:text-sm uppercase tracking-widest italic group justify-center flex items-center">
                    Preview <Eye className="inline ml-3 animate-pulse" size={16} />
                  </button>
               </div>

               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8">
                  <div className="space-y-4 p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl hover:border-primary/20 transition-all group shadow-inner">
                     <Users className="text-primary group-hover:scale-110 transition-transform" size={28} />
                     <div className="space-y-1">
                        <p className="text-base lg:text-lg font-black text-on-surface italic tracking-tight">Assignment Type</p>
                        <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Assignment structure</p>
                     </div>
                     <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-primary text-white text-[10px] font-black uppercase italic rounded-xl shadow-sm">Solo</button>
                        <button className="flex-1 py-3 bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase italic rounded-xl">Squad</button>
                     </div>
                  </div>

                  <div className="space-y-4 p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl hover:border-primary/20 transition-all group shadow-inner">
                     <Globe className="text-emerald-600 group-hover:scale-110 transition-transform" size={28} />
                     <div className="space-y-1">
                        <p className="text-base lg:text-lg font-black text-on-surface italic tracking-tight">Visibility</p>
                        <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Availability status</p>
                     </div>
                     <div className="flex gap-2">
                        <button className="flex-1 py-3 bg-emerald-500 text-white text-[10px] font-black uppercase italic rounded-xl shadow-sm">Public</button>
                        <button className="flex-1 py-3 bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase italic rounded-xl">Private</button>
                     </div>
                  </div>

                  <div className="space-y-4 p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-3xl hover:border-primary/20 transition-all group shadow-inner sm:col-span-2 lg:col-span-1">
                     <DollarSign className="text-amber-600 group-hover:scale-110 transition-transform" size={28} />
                     <div className="space-y-1">
                        <p className="text-base lg:text-lg font-black text-on-surface italic tracking-tight">Compensation</p>
                        <p className="text-[8px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Base bracket</p>
                     </div>
                     <div className="relative">
                        <input type="text" defaultValue="$850.00" className="w-full bg-white border border-slate-100 rounded-xl p-4 text-sm lg:text-base text-on-surface font-black italic shadow-sm outline-none focus:border-amber-400/50 transition-all" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase tracking-widest">USD</span>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'PREVIEW' && (
          <motion.div 
            key="preview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Step 9-11: Final Review & Validation */}
            <div className="bento-card bg-white border-slate-100 shadow-sm space-y-8 lg:space-y-12">
               <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                  <div className="space-y-1">
                    <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10">Market Preview.</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Step 5: Final Check</p>
                  </div>
                  <button onClick={() => setCurrentStep('PUBLISH')} className="w-full sm:w-auto px-6 lg:px-12 py-4 lg:py-5 bg-emerald-500 text-white font-black rounded-xl lg:rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-95 transition-all text-[10px] lg:text-xs uppercase tracking-[0.2em] italic group justify-center flex items-center gap-3">
                    Sync & Publish <CheckCircle2 size={18} />
                  </button>
               </div>

               {/* Mock Student-Facing Preview */}
               <div className="border border-slate-100 rounded-2xl lg:rounded-[3rem] bg-white p-5 lg:p-12 space-y-8 lg:space-y-10 relative overflow-hidden shadow-sm">
                  <div className="absolute top-0 right-0 w-32 h-32 lg:w-64 lg:h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl lg:blur-3xl" />
                  
                  <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-0 relative z-10">
                    <div className="space-y-2 lg:space-y-4">
                       <span className="px-2 lg:px-3 py-1 bg-primary text-white text-[8px] lg:text-[10px] font-black uppercase tracking-widest rounded-md italic">Active Opportunity</span>
                       <h4 className="text-2xl lg:text-5xl font-black text-on-surface tracking-tighter italic uppercase underline decoration-primary/10 underline-offset-4 lg:underline-offset-8">Inventory Flow Automation.</h4>
                    </div>
                    <div className="p-4 lg:p-8 bg-slate-50 rounded-2xl lg:rounded-[2rem] border border-slate-100 text-center space-y-1 lg:space-y-2 w-full sm:w-fit shadow-inner">
                       <p className="text-[9px] lg:text-[10px] font-black text-slate-400 uppercase tracking-widest">Est. Reward</p>
                       <p className="text-xl lg:text-3xl font-black text-on-surface tracking-tighter">$850.00</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
                    <div className="space-y-6 lg:space-y-8">
                       <div className="space-y-3">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Business Context</label>
                          <p className="text-xs lg:text-sm text-slate-500 font-medium italic leading-relaxed">This gig deploys you into the core inventory logic of Nexus Data Systems. You will solve the recurring data-lock that currently restricts mid-market operational flow.</p>
                       </div>
                       <div className="space-y-4">
                          <label className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-2 italic">
                             <Target size={14} /> Skills
                          </label>
                          <div className="flex flex-wrap gap-2">
                             {['Python', 'SQL', 'Logic'].map(s => (
                               <span key={s} className="px-3 py-1.5 bg-slate-50 border border-slate-100 text-slate-500 text-[9px] lg:text-[10px] font-black uppercase tracking-widest rounded-lg lg:rounded-xl hover:border-primary/20 transition-all cursor-default shadow-sm">{s}</span>
                             ))}
                          </div>
                       </div>
                    </div>
                    
                    <div className="space-y-6 lg:space-y-8">
                       <div className="p-6 lg:p-8 bg-slate-50 border border-slate-100 rounded-2xl lg:rounded-[2rem] space-y-6 shadow-inner">
                          <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-amber-600 uppercase tracking-widest italic">Timeline</label>
                            <span className="text-on-surface text-[10px] font-black uppercase italic">14 Days Sprint</span>
                          </div>
                          <div className="space-y-3">
                             {[
                               { label: 'Application', days: '2 Days' },
                               { label: 'Execution', days: '10 Days' },
                               { label: 'Audit', days: '2 Days' }
                             ].map((t, i) => (
                               <div key={i} className="flex justify-between items-center">
                                  <span className="text-[10px] lg:text-xs text-slate-400 italic font-medium">{t.label}</span>
                                  <span className="text-[10px] lg:text-xs font-black text-on-surface uppercase tracking-tighter">{t.days}</span>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        )}

        {currentStep === 'PUBLISH' && (
          <motion.div 
            key="publish"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 space-y-12 text-center overflow-hidden relative"
          >
            {/* Step 12-13: Published */}
            <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full animate-pulse" />
            
            <div className="relative">
               <div className="w-32 h-32 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)] animate-bounce relative z-10">
                  <Rocket size={64} className="text-slate-950" />
               </div>
               <div className="absolute -inset-10 bg-emerald-500/20 blur-2xl rounded-full animate-ping" />
            </div>

            <div className="space-y-6 relative z-10">
              <h2 className="text-6xl lg:text-8xl font-black text-on-surface tracking-tighter uppercase italic leading-none">Published to <span className="text-primary underline decoration-primary/10">Market.</span></h2>
              <p className="text-lg text-slate-500 italic max-w-xl mx-auto leading-relaxed font-semibold">
                Gig Node: <span className="text-primary font-black uppercase">#NDS-9920</span> is now visible to the Elite Talent network. Applications will begin synchronizing shortly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 relative z-10 pt-8">
               <button onClick={() => setCurrentStep('INITIATION')} className="px-12 py-5 bg-white border border-slate-100 text-slate-400 font-bold rounded-2xl hover:text-primary hover:border-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest italic shadow-sm">
                  Launch Another Gig
               </button>
               <button 
                  onClick={() => navigate('/poster-dashboard')} 
                  className="px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95 text-xs uppercase tracking-widest italic flex items-center gap-3"
               >
                  Access Poster Dashboard <LayoutDashboard size={18} />
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistence Area (Only visible in early steps) */}
      {currentStep === 'INITIATION' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-8 pt-8 px-6"
        >
          <button className="px-12 py-5 font-black text-slate-400 hover:text-primary transition-all rounded-full active:scale-95 uppercase tracking-[0.3em] text-[10px] bg-white border border-slate-100 shadow-sm">
            Cache Parameters
          </button>
          <div className="flex items-center gap-4 text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] italic">
            Proceed to Verification Node <ArrowRight size={14} />
          </div>
        </motion.div>
      )}
    </div>
  );
};

const Grid = ({ size, className }: { size: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

