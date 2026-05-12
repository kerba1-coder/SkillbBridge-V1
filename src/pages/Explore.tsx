import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Upload, 
  FileText, 
  Smartphone, 
  ArrowRight, 
  Zap, 
  BarChart3, 
  Brain, 
  Briefcase, 
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  Clock,
  Sparkles,
  Link as LinkIcon,
  Globe,
  Quote,
  TrendingUp,
  Camera,
  Image as ImageIcon,
  ArrowLeft,
  X,
  Plus,
  Trash2,
  History
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { geminiService, AnalysisResult } from '../services/geminiService';

interface RecHistory {
  title: string;
  description: string;
  type: string;
  timestamp: string;
}

export const Explore: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'HOME' | 'URL' | 'PDF' | 'IMAGE' | 'RESULTS'>('HOME');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [recentGigs, setRecentGigs] = useState<RecHistory[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('GIG_RECOMMENDATION_HISTORY');
    if (saved) {
      try {
        setRecentGigs(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history", e);
      }
    }
  }, []);

  const saveToHistory = (recs: AnalysisResult['recommendations']) => {
    const gigRecs = recs
      .filter(r => r.type === 'Gig')
      .map(r => ({ ...r, timestamp: new Date().toISOString() }));
    
    if (gigRecs.length > 0) {
      const existing = JSON.parse(localStorage.getItem('GIG_RECOMMENDATION_HISTORY') || '[]');
      const combined = [...gigRecs, ...existing]
        .filter((v, i, a) => a.findIndex(t => t.title === v.title) === i)
        .slice(0, 2);
      
      setRecentGigs(combined);
      localStorage.setItem('GIG_RECOMMENDATION_HISTORY', JSON.stringify(combined));
    }
  };

  const handleAnalyze = async () => {
    if (!input && !selectedFile && !isAnalyzing) return;
    setIsAnalyzing(true);
    setResults(null);
    
    try {
      if (step === 'URL') {
        const data = await geminiService.analyzeContent(input, 'url');
        setResults(data);
        saveToHistory(data.recommendations);
      } else if (step === 'PDF' && selectedFile) {
        // Simple Base64 read for the demo
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target?.result as string;
          const data = await geminiService.analyzeContent(base64, 'text');
          setResults(data);
          saveToHistory(data.recommendations);
          setIsAnalyzing(false);
          setStep('RESULTS');
        };
        reader.readAsDataURL(selectedFile);
        return; // handle finish in onload
      } else if (step === 'IMAGE' && selectedFile) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64 = e.target?.result as string;
          const data = await geminiService.analyzeImage(base64);
          setResults(data);
          saveToHistory(data.recommendations);
          setIsAnalyzing(false);
          setStep('RESULTS');
        };
        reader.readAsDataURL(selectedFile);
        return; // handle finish in onload
      }
      setStep('RESULTS');
    } catch (error) {
      console.error("Analysis failed:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    if (file.type.startsWith('image/')) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  const resetAll = () => {
    setStep('HOME');
    setResults(null);
    setInput('');
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const iconMap: Record<string, any> = {
    Zap, Brain, BarChart3, Briefcase, Globe, Sparkles, TrendingUp
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 mb-20 px-4 animate-in fade-in duration-700">
      {/* Header */}
      <section className="space-y-4 pt-8">
        <h2 className="text-3xl lg:text-4xl font-black text-on-surface tracking-tighter italic uppercase underline decoration-primary/20 underline-offset-8">
          A.I. Skills <span className="text-primary italic">Explorer.</span>
        </h2>
        <p className="text-sm text-slate-500 font-medium italic leading-relaxed">
          Add real-world content you’re already reading, business articles, LinkedIn posts etc., and we’ll convert that content into a personalized skill pathway.
        </p>
      </section>

      <AnimatePresence mode="wait">
        {step === 'HOME' && (
          <motion.div 
            key="home"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {recentGigs.length > 0 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-1000">
                <div className="flex items-center gap-3 px-2">
                   <History size={14} className="text-primary" />
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Recent Gig Matches</h4>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {recentGigs.map((gig, idx) => (
                    <button 
                      key={idx}
                      onClick={() => navigate(`/registry?search=${encodeURIComponent(gig.title)}`)}
                      className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                           <Briefcase size={20} />
                        </div>
                        <div>
                          <p className="text-xs font-black text-on-surface uppercase italic tracking-tight line-clamp-1">{gig.title}</p>
                          <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Matched via AI Signal</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                         Apply to Gig <ArrowUpRight size={12} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {/* Card 1: Paste Article Link */}
              <button 
                onClick={() => setStep('URL')}
                className="w-full bento-card bg-white p-8 border-slate-100 flex flex-col items-center text-center gap-6 group hover:border-primary/20 hover:shadow-xl transition-all"
              >
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                <LinkIcon size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">📎 Paste Article Link</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">Automated analysis of news and trends</p>
              </div>
            </button>

            {/* Card 2: Upload PDF */}
            <button 
              onClick={() => setStep('PDF')}
              className="w-full bento-card bg-white p-8 border-slate-100 flex flex-col items-center text-center gap-6 group hover:border-primary/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                <FileText size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">📄 Upload PDF</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">Deep dive into reports & briefings</p>
              </div>
            </button>

            {/* Card 3: Upload Screenshot/Image */}
            <button 
              onClick={() => setStep('IMAGE')}
              className="w-full bento-card bg-white p-8 border-slate-100 flex flex-col items-center text-center gap-6 group hover:border-primary/20 hover:shadow-xl transition-all"
            >
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <Camera size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">📸 Upload Screenshot/Image</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-loose">OCR extraction from visuals & news clips</p>
              </div>
            </button>
          </div>
        </motion.div>
      )}

        {step === 'URL' && (
          <motion.div 
            key="url"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setStep('HOME')} className="p-4 bg-slate-100 rounded-2xl text-slate-600">
                <ArrowLeft size={20} />
              </button>
              <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter underline underline-offset-4 decoration-primary/20">Analyze Link.</h3>
            </div>

            <div className="bento-card bg-white p-8 space-y-8 border-slate-100">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Paste URL Node</label>
                <div className="relative group">
                  <LinkIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={20} />
                  <input 
                    autoFocus
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-6 pl-16 pr-6 text-sm font-bold text-on-surface placeholder:text-slate-300 outline-none focus:border-primary/30 transition-all"
                    placeholder="https://techcrunch.com/strategic-report..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </div>
              </div>

              {input && (
                <div className="p-6 bg-blue-50 border border-blue-100 rounded-2xl space-y-3 animate-in zoom-in duration-500">
                  <div className="flex items-center gap-3 text-blue-600">
                    <Globe size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Metadata Sync Ready</span>
                  </div>
                  <p className="text-[10px] text-blue-500 font-bold italic line-clamp-1">{input}</p>
                </div>
              )}

              <button 
                onClick={handleAnalyze}
                disabled={!input || isAnalyzing}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 italic"
              >
                {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Analyze Content</>}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'PDF' && (
          <motion.div 
            key="pdf"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setStep('HOME')} className="p-4 bg-slate-100 rounded-2xl text-slate-600">
                <ArrowLeft size={20} />
              </button>
              <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">Document Intake.</h3>
            </div>

            <div 
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                "bento-card bg-white p-12 border-2 border-dashed flex flex-col items-center text-center gap-6 cursor-pointer group transition-all",
                selectedFile ? "border-emerald-500 bg-emerald-50/10" : "border-slate-100 hover:border-primary/20"
              )}
            >
              <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={handleFileSelect} />
              
              {selectedFile ? (
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg shadow-emerald-500/20">
                    <FileText size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-on-surface uppercase italic">{selectedFile.name}</p>
                    <p className="text-[10px] font-bold text-emerald-500/60 uppercase">Ready for AI parsing</p>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                    className="p-3 bg-white border border-slate-100 rounded-xl text-rose-500 hover:bg-rose-50 transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:text-primary transition-all">
                    <Upload size={32} />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-black text-slate-600 uppercase italic">Drop or Select PDF</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest underline underline-offset-4">Browse Files</p>
                  </div>
                </>
              )}
            </div>

            {selectedFile && (
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 active:scale-95 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3 italic animate-in slide-in-from-bottom-4 duration-500"
              >
                {isAnalyzing ? <Loader2 size={18} className="animate-spin" /> : <><Sparkles size={18} /> Parse Document</>}
              </button>
            )}
          </motion.div>
        )}

        {step === 'IMAGE' && (
          <motion.div 
            key="image"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4">
              <button onClick={() => setStep('HOME')} className="p-4 bg-slate-100 rounded-2xl text-slate-600">
                <ArrowLeft size={20} />
              </button>
              <h3 className="text-xl font-black text-on-surface uppercase italic tracking-tighter">Visual OCR.</h3>
            </div>

            <div className="bento-card bg-white p-6 border-slate-100 space-y-6">
              {previewUrl ? (
                <div className="space-y-6">
                  <div className="aspect-square w-full rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 relative group">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="p-4 bg-white/90 backdrop-blur-sm rounded-full text-primary font-black text-[10px] uppercase tracking-widest">Crop & Refine</div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                      className="flex-1 py-4 border border-slate-100 rounded-2xl text-slate-400 font-black text-[10px] uppercase tracking-widest"
                    >
                      Dismiss
                    </button>
                    <button 
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      className="flex-[2] py-4 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 italic"
                    >
                      {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : 'OCR Extract'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center gap-4 group hover:bg-white transition-all shadow-inner"
                  >
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <ImageIcon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-600">Gallery</span>
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex flex-col items-center gap-4 group hover:bg-white transition-all shadow-inner"
                  >
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                      <Camera size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase text-slate-600">Camera</span>
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-[0.2em] italic">AI will detect and extract text from the vision node.</p>
          </motion.div>
        )}

        {step === 'RESULTS' && results && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center">
              <button onClick={resetAll} className="p-4 bg-slate-100 rounded-2xl text-slate-600">
                <ArrowLeft size={20} />
              </button>
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 px-6 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                <CheckCircle2 size={16} /> Analysis Finished
              </span>
            </div>

            <div className="space-y-12">
               {/* Analysis Summary */}
               <section className="space-y-8">
                  <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end gap-4">
                    <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/20 underline-offset-8">Market Signals.</h3>
                  </div>
                  <div className="bg-white p-8 lg:p-12 rounded-[2.5rem] lg:rounded-[4rem] shadow-sm border border-slate-100 space-y-12 relative overflow-hidden group">
                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-4 text-primary">
                        <Zap size={24} className="fill-primary" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Strategic Summary</span>
                      </div>
                      <p className="text-lg lg:text-2xl text-on-surface italic leading-relaxed font-medium">
                        {results.summary}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 pt-12 border-t border-slate-50 relative z-10">
                      {results.skills.map((skill, idx) => {
                        const IconComp = iconMap[skill.icon] || Zap;
                        return (
                          <button 
                            key={idx}
                            onClick={() => navigate(`/registry?search=${encodeURIComponent(skill.label)}`)}
                            className="w-full text-left p-8 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4 group/skill hover:bg-primary transition-all duration-500 group"
                          >
                             <div className="flex justify-between items-center">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-primary group-hover/skill:scale-110 transition-transform">
                                   <IconComp size={24} />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-black text-primary group-hover/skill:text-white transition-colors">{Math.round(skill.relevanceScore * 100)}% Match</span>
                                  <ArrowUpRight size={14} className="text-primary group-hover/skill:text-white transition-colors opacity-0 group-hover/skill:opacity-100" />
                                </div>
                             </div>
                             <div className="space-y-2">
                               <h4 className="text-xl font-black text-on-surface uppercase tracking-tight group-hover/skill:text-white transition-colors">{skill.label}</h4>
                               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed group-hover/skill:text-white/70 transition-colors">
                                 {skill.reasoning}
                               </p>
                               <div className="pt-4 flex items-center gap-2 text-[8px] font-black text-primary uppercase tracking-[0.2em] opacity-0 group-hover/skill:opacity-100 transition-opacity">
                                 <Briefcase size={12} /> View Available Gigs
                               </div>
                             </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
               </section>

               <h3 className="text-2xl lg:text-3xl font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/20 underline-offset-8 text-center lg:text-left">Execution Pathways.</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {results.recommendations.map((rec, idx) => (
                  <Link 
                    key={idx}
                    to="/registry"
                    className="group bg-white p-10 lg:p-14 rounded-[3rem] lg:rounded-[4rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:scale-[1.01] transition-all duration-700 overflow-hidden relative flex flex-col justify-between"
                  >
                    <div className="space-y-8 relative z-10">
                      <div className="flex justify-between items-start">
                        <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-[1.5rem] lg:rounded-[2rem] bg-slate-50 flex items-center justify-center text-primary border border-slate-100 shadow-sm group-hover:scale-110 transition-transform group-hover:bg-primary group-hover:text-white">
                          {rec.type === 'Gig' ? <Briefcase size={32} /> : <TrendingUp size={32} />}
                        </div>
                        <span className={cn(
                          "px-6 lg:px-8 py-2 lg:py-2.5 rounded-full text-[8px] lg:text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm",
                          rec.type === 'Gig' ? "bg-primary/10 text-primary border-primary/20" : 
                          "bg-emerald-50 text-emerald-600 border-emerald-100"
                        )}>
                          {rec.type}
                        </span>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-3xl lg:text-4xl font-black text-on-surface group-hover:text-primary transition-colors italic tracking-tighter uppercase underline decoration-primary/10 group-hover:decoration-primary/30 underline-offset-8 decoration-8 leading-tight">
                          {rec.title}
                        </h4>
                        <p className="text-sm lg:text-lg text-slate-500 italic leading-relaxed font-medium mt-4 line-clamp-3">
                          {rec.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-10 lg:pt-12 mt-auto relative z-10">
                      <div className="space-y-2">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Match Confidence</span>
                        <div className="flex items-center gap-4">
                          <div className="w-24 lg:w-32 h-2.5 lg:h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${rec.matchScore * 100}%` }}
                              className="h-full bg-primary rounded-full shadow-sm"
                            />
                          </div>
                          <span className="text-xs lg:text-sm font-black text-primary italic">%{Math.round(rec.matchScore * 100)}</span>
                        </div>
                      </div>
                      <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border-2 border-slate-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:translate-x-2 transition-all">
                        <ArrowRight size={24} />
                      </div>
                    </div>

                    {/* Subtle BG Graphic */}
                    <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.02] text-primary rotate-12 group-hover:scale-110 pointer-events-none transition-transform hidden lg:block">
                       {rec.type === 'Gig' ? <Briefcase size={200} /> : <Zap size={200} />}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
