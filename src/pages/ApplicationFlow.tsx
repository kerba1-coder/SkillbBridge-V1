import React, { useState } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  Clock, 
  ShieldCheck, 
  Rocket, 
  Sparkles,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Step = 'confirm' | 'pitch' | 'success';

export const ApplicationFlow: React.FC = () => {
  const [step, setStep] = useState<Step>('confirm');
  const [pitch, setPitch] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNext = () => {
    if (step === 'confirm') setStep('pitch');
    else if (step === 'pitch') setStep('success');
  };

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <button 
          onClick={() => {
            if (step === 'success') {
              navigate('/');
            } else if (step === 'pitch') {
              setStep('confirm');
            } else {
              navigate(-1);
            }
          }}
          className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-all shadow-xl active:scale-95"
          style={{ display: step === 'success' ? 'none' : 'block' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">
            {step === 'confirm' ? 'Step 01: Intake' : step === 'pitch' ? 'Step 02: Pitch' : 'Mission: Initialized'}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 'confirm' && (
          <motion.div 
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4 px-4 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter italic font-medium uppercase underline decoration-primary/30 underline-offset-8 leading-tight">Verify your operational capacity for this deployment.</h2>
            </div>

            <section className="bento-card border-slate-800 space-y-10">
              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <Clock size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Temporal Commitment</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      This project requires approximately <span className="text-white">15-20 hours</span> over the next 3 weeks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">Skill Verification</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Your current passport levels in <span className="text-white">Marketing & Design</span> exceed the baseline requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <button 
                  onClick={handleNext}
                  className="w-full py-6 bg-white text-slate-950 font-bold rounded-2xl shadow-3xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.2em] text-sm"
                >
                  Confirm Capacity
                  <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </section>
          </motion.div>
        )}

        {step === 'pitch' && (
          <motion.div 
            key="pitch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4 px-4">
              <h2 className="text-4xl lg:text-6xl font-light text-white tracking-tighter uppercase italic leading-none">
                Why are you the <span className="font-bold underline decoration-primary/30 underline-offset-8">best candidate</span> for this gig?
              </h2>
            </div>

            <section className="bento-card border-slate-800 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end ml-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Elevator Pitch</label>
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", pitch.length > 20 ? 'text-primary' : 'text-slate-700')}>
                    {pitch.length}/500
                  </span>
                </div>
                <div className="relative">
                  <textarea 
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 focus:border-primary/50 focus:bg-slate-950 rounded-[1.5rem] p-8 text-lg text-white transition-all resize-none shadow-2xl outline-none min-h-[250px] placeholder:text-slate-700 tracking-tight" 
                    placeholder="Briefly describe your approach to this marketing challenge..." 
                  />
                  <div className="absolute top-6 right-6">
                    <MessageSquare size={20} className="text-slate-800" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={handleNext}
                  disabled={pitch.length < 10}
                  className={cn(
                    "w-full py-6 font-bold rounded-2xl shadow-3xl transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.2em] text-sm overflow-hidden relative",
                    pitch.length >= 10 ? "bg-primary text-white hover:brightness-110" : "bg-slate-900 text-slate-600 border border-slate-800 cursor-not-allowed"
                  )}
                >
                  <span className="relative z-10">Initialize Application</span>
                  <Send className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={20} />
                </button>
              </div>
            </section>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 px-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary blur-[100px] opacity-20 animate-pulse"></div>
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-950 border border-slate-800 flex items-center justify-center text-primary shadow-3xl relative z-10 scale-125">
                <CheckCircle2 size={64} strokeWidth={1} />
              </div>
              <Sparkles className="absolute -top-4 -right-4 text-amber-400 animate-bounce" size={32} />
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white tracking-tighter italic">Application <br/>Synchronized.</h2>
              <p className="text-slate-400 font-medium italic text-lg leading-relaxed max-w-sm mx-auto">
                Your credentials and pitch have been uploaded to the mission center. The organization will review your profile shortly.
              </p>
            </div>

            <div className="flex flex-col w-full gap-4 pt-10">
              <Link 
                to="/" 
                className="w-full py-6 bg-white text-slate-950 font-bold rounded-2xl shadow-3xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm"
              >
                Back to Dashboard
              </Link>
              <Link 
                to="/projects" 
                className="w-full py-6 bg-slate-900 border border-slate-800 text-slate-500 font-bold rounded-2xl hover:text-white transition-all text-center uppercase tracking-[0.2em] text-[10px]"
              >
                View More Markets
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
