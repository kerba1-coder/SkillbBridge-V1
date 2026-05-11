import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Target, 
  Briefcase, 
  ArrowRight, 
  BrainCircuit, 
  MessageSquare, 
  Search, 
  RefreshCw,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Zap,
  TrendingUp,
  Layout
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI, Type } from "@google/genai";
import { cn } from '../lib/utils';

// Model definition
const AI_MODEL = "gemini-3-flash-preview";

interface CareerPath {
  title: string;
  description: string;
  steps: {
    title: string;
    description: string;
    skills: string[];
  }[];
  recommendedGigs: {
    title: string;
    category: string;
    alignment: string;
  }[];
}

export const AIGuidance: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'intro' | 'assessment' | 'loading' | 'results'>('intro');
  const [interests, setInterests] = useState('');
  const [goals, setGoals] = useState('');
  const [plan, setPlan] = useState<CareerPath | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGeneratePlan = async () => {
    setIsGenerating(true);
    setStep('loading');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `Based on the following user interests and professional goals, generate a strategic career path and professional development plan.
      
      User Interests: ${interests}
      User Goals: ${goals}
      
      The plan should include:
      1. A professional title for the path.
      2. A brief overview of the strategy.
      3. 3-4 specific milestones/steps, each with a title, description, and key skills to acquire.
      4. 3 hypothetical gig titles that would help the user gain the necessary experience for this path.
      
      Return the data strictly as JSON.`;

      const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              steps: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                    skills: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["title", "description", "skills"]
                }
              },
              recommendedGigs: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    category: { type: Type.STRING },
                    alignment: { type: Type.STRING }
                  },
                  required: ["title", "category", "alignment"]
                }
              }
            },
            required: ["title", "description", "steps", "recommendedGigs"]
          }
        }
      });

      const result = JSON.parse(response.text);
      setPlan(result);
      setStep('results');
    } catch (error) {
      console.error("AI Generation failed:", error);
      // Fallback or error state
      setStep('assessment');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 md:py-10 px-4 md:px-0 space-y-8 md:space-y-12">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bento-card border-none bg-gradient-to-br from-primary/5 via-white to-sky-50 shadow-2xl p-6 md:p-12 lg:p-20 text-center space-y-8 md:space-y-10 relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 p-8 opacity-10 hidden sm:block">
                <BrainCircuit size={300} strokeWidth={0.5} className="text-primary animate-pulse" />
             </div>
             
             <div className="relative z-10 space-y-4 md:space-y-6">
                <div className="inline-flex items-center gap-3 px-4 md:px-6 py-2 bg-primary/10 rounded-full text-primary text-[10px] md:text-xs font-black uppercase tracking-[0.3em] mb-2 md:mb-4">
                  <Sparkles size={14} /> Strategic AI Architect
                </div>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-on-surface tracking-tighter italic uppercase leading-[1.1] md:leading-[0.9]">
                  Architect Your <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Legacy.</span>
                </h1>
                <p className="text-base md:text-xl text-slate-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
                  Beyond finding work—we're here to build your strategic evolution. Tell us your goals, and our AI will map the exact professional milestones and gigs needed to reach them.
                </p>
             </div>

             <div className="relative z-10 pt-6 md:pt-10">
               <button 
                 onClick={() => setStep('assessment')}
                 className="group w-full sm:w-auto px-8 md:px-12 py-5 md:py-6 bg-primary text-white font-black rounded-2xl md:rounded-3xl shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 md:gap-6 mx-auto uppercase tracking-widest italic text-[11px] md:text-sm"
               >
                 Begin Strategic Mapping <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
             </div>
          </motion.div>
        )}

        {step === 'assessment' && (
          <motion.div 
            key="assessment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8 md:space-y-10"
          >
             <div className="flex items-center gap-4 px-2">
                <div className="p-2 md:p-3 bg-primary/10 rounded-xl md:rounded-2xl text-primary">
                  <Target size={20} className="md:w-6 md:h-6" />
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-on-surface tracking-tighter uppercase italic">Strategic Assessment.</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <section className="bento-card border-slate-100 p-6 md:p-10 space-y-6 md:space-y-8 bg-white/50 backdrop-blur-sm">
                   <div className="flex items-center gap-3">
                      <Lightbulb className="text-amber-500" size={18} />
                      <h3 className="text-base md:text-lg font-bold text-on-surface uppercase italic underline decoration-amber-100 decoration-4 underline-offset-4">Your Interests.</h3>
                   </div>
                   <p className="text-[11px] md:text-xs text-slate-500 italic opacity-80 leading-relaxed">
                     What nodes of technology or business excite you? (e.g., GenAI, Sustainable Supply Chains, FinTech security)
                   </p>
                   <textarea 
                     value={interests}
                     onChange={(e) => setInterests(e.target.value)}
                     className="w-full h-40 md:h-48 bg-slate-50 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-on-surface italic font-medium focus:bg-white focus:border-primary/30 transition-all outline-none resize-none shadow-inner"
                     placeholder="I'm interested in how agentic workflows can optimize logistics..."
                   />
                </section>

                <section className="bento-card border-slate-100 p-6 md:p-10 space-y-6 md:space-y-8 bg-white/50 backdrop-blur-sm">
                   <div className="flex items-center gap-3">
                      <TrendingUp className="text-primary" size={18} />
                      <h3 className="text-base md:text-lg font-bold text-on-surface uppercase italic underline decoration-primary/10 decoration-4 underline-offset-4">Career Trajectory.</h3>
                   </div>
                   <p className="text-[11px] md:text-xs text-slate-500 italic opacity-80 leading-relaxed">
                     Where do you want to be in 2 years? What kind of high-impact roles or specialized paths are you targeting?
                   </p>
                   <textarea 
                     value={goals}
                     onChange={(e) => setGoals(e.target.value)}
                     className="w-full h-40 md:h-48 bg-slate-50 border border-slate-100 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 text-sm md:text-base text-on-surface italic font-medium focus:bg-white focus:border-primary/30 transition-all outline-none resize-none shadow-inner"
                     placeholder="I want to lead a product team at a climate-tech firm..."
                   />
                </section>
             </div>

             <div className="flex justify-center pt-4">
                <button 
                  disabled={!interests || !goals}
                  onClick={handleGeneratePlan}
                  className="group w-full md:w-auto px-10 py-5 bg-primary disabled:opacity-30 text-white font-black rounded-xl md:rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 uppercase tracking-widest text-[10px] md:text-xs italic"
                >
                  <RefreshCw size={18} className={cn(isGenerating && "animate-spin")} />
                  {isGenerating ? "Synthesizing Strategic Nodes..." : "Architect My Career Plan"}
                </button>
             </div>
          </motion.div>
        )}

        {step === 'loading' && (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-[500px] flex flex-col items-center justify-center space-y-10 text-center"
          >
             <div className="relative">
                <div className="w-32 h-32 rounded-full border-8 border-primary/10 border-t-primary animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles size={40} className="text-primary animate-pulse" />
                </div>
             </div>
             <div className="space-y-4">
                <h3 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Synthesizing Your Path...</h3>
                <p className="text-slate-500 italic font-medium max-w-sm mx-auto">
                  Our Career Architect is analyzing market demands and your goals to build a high-fidelity development roadmap.
                </p>
             </div>
          </motion.div>
        )}

        {step === 'results' && plan && (
          <motion.div 
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 md:space-y-12 pb-20"
          >
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-600 rounded-md text-[9px] font-black uppercase tracking-widest italic border border-emerald-500/20">
                    <CheckCircle2 size={12} /> Strategic Synthesis Complete
                  </div>
                  <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-on-surface tracking-tighter uppercase italic leading-none">
                    Your Strategic <span className="text-primary underline decoration-primary/20 underline-offset-8">Blueprint.</span>
                  </h2>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4 w-full md:w-auto">
                   <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                      <Zap size={24} className="text-primary" />
                   </div>
                   <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recommended Role</p>
                      <p className="text-sm font-black text-on-surface italic">{plan.title}</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
                {/* Roadmap Column */}
                <div className="lg:col-span-12 space-y-6 md:space-y-8">
                   <div className="bento-card bg-white border-slate-100 p-6 md:p-10 space-y-8 md:space-y-10 shadow-xl overflow-hidden relative">
                      <div className="absolute top-0 right-0 p-10 opacity-[0.03] scale-150 rotate-12 pointer-events-none hidden sm:block">
                        <TrendingUp size={300} />
                      </div>

                      <div className="space-y-4 md:space-y-6 relative z-10 text-center md:text-left">
                        <h3 className="text-xl md:text-2xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/10 decoration-4 underline-offset-4">Strategic Roadmap.</h3>
                        <p className="text-sm md:text-lg text-slate-600 font-medium italic leading-relaxed max-w-3xl">
                          {plan.description}
                        </p>
                      </div>

                      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                         {plan.steps.map((step, i) => (
                           <div key={i} className="group p-6 md:p-8 bg-slate-50/50 border border-slate-100 rounded-[2rem] md:rounded-[2.5rem] hover:bg-white hover:border-primary/20 transition-all shadow-sm">
                              <div className="flex items-center gap-4 mb-4 md:mb-6">
                                 <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary text-white font-black flex items-center justify-center text-xs md:text-sm italic group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                                   0{i+1}
                                 </div>
                                 <h4 className="text-lg md:text-xl font-bold text-on-surface tracking-tight uppercase group-hover:text-primary transition-colors">{step.title}</h4>
                              </div>
                              <p className="text-[13px] md:text-sm text-slate-500 font-medium italic leading-relaxed mb-4 md:mb-6">
                                {step.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                 {step.skills.map(skill => (
                                   <span key={skill} className="px-2 md:px-3 py-1 bg-white border border-slate-100 rounded-md text-[8px] md:text-[9px] font-bold text-slate-400 uppercase tracking-widest italic group-hover:text-primary group-hover:border-primary/10 transition-colors">
                                     {skill}
                                   </span>
                                 ))}
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Recommended Gigs Column */}
                <div className="lg:col-span-12 space-y-6 md:space-y-10">
                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-2">
                     <div className="flex items-center gap-3">
                        <Briefcase size={20} className="text-primary md:w-6 md:h-6" />
                        <h3 className="text-xl md:text-2xl font-black text-on-surface tracking-tighter uppercase italic">Aligned Opportunity Hub.</h3>
                     </div>
                     <button 
                       onClick={() => navigate('/projects')}
                       className="text-[10px] md:text-xs font-black text-primary uppercase tracking-widest italic flex items-center gap-2 hover:translate-x-1 transition-transform"
                     >
                       Explore All Market Gigs <ChevronRight size={14} />
                     </button>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {plan.recommendedGigs.map((gig, i) => (
                        <div 
                          key={i} 
                          className="bento-card bg-white border border-slate-100 p-6 md:p-8 space-y-6 hover:shadow-2xl transition-all cursor-pointer group"
                          onClick={() => navigate('/projects')}
                        >
                           <div className="flex justify-between items-start">
                              <span className="px-2 py-1 bg-primary/5 text-primary text-[8px] font-black uppercase tracking-widest rounded-md border border-primary/10 leading-none">
                                {gig.category}
                              </span>
                              <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                                <Search size={12} />
                              </div>
                           </div>
                           <div className="space-y-3 md:space-y-4 text-center md:text-left">
                              <h4 className="text-lg md:text-xl font-bold text-on-surface tracking-tight leading-tight group-hover:text-primary transition-colors italic uppercase">{gig.title}</h4>
                              <div className="pt-4 border-t border-slate-100 italic space-y-1">
                                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">Alignment Node</p>
                                <p className="text-[11px] md:text-xs font-bold text-primary">{gig.alignment}</p>
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                   
                   <div className="flex justify-center pt-4 md:pt-8">
                     <button 
                       onClick={() => setStep('assessment')}
                       className="w-full md:w-auto px-10 py-4 bg-slate-100 border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/20 font-black rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase tracking-[0.3em] transition-all italic flex items-center justify-center gap-3"
                     >
                       <RefreshCw size={14} /> Re-Architect Path
                     </button>
                   </div>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
