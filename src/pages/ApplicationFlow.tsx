import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Send, 
  Clock, 
  ShieldCheck, 
  Rocket, 
  Sparkles,
  ChevronRight,
  MessageSquare,
  Loader2,
  Trash2
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import { gigService, applicationService } from '../services/firestoreService';
import { Gig } from '../types';
import { useAuth } from '../contexts/AuthContext';

type Step = 'confirm' | 'pitch' | 'success';

export const ApplicationFlow: React.FC = () => {
  const [step, setStep] = useState<Step>('confirm');
  const [pitch, setPitch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, profile, signInWithGoogle } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
      toast.success('Identity synchronized.');
    } catch (error) {
      toast.error('Identity synchronization failed.');
    }
  };

  useEffect(() => {
    const fetchGig = async () => {
      if (!id) return;
      setLoading(true);
      try {
        let data = await gigService.getGig(id);
        
        // If gig only exists locally, try to seed it to Firestore 
        // so that security rules (which check for gig existence) pass.
        if (data && id) {
          try {
            // Check if it actually exists in Firestore
            const { ALL_GIGS } = await import('../data/gigs');
            const isLocalOnly = ALL_GIGS.some(g => g.id === id);
            if (isLocalOnly) {
              await gigService.seedGigs([data]);
            }
          } catch (seedError) {
            console.error("Auto-seeding failed", seedError);
          }
        }
        
        setGig(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
    window.scrollTo(0, 0);
  }, [id]);

  const handleNext = async () => {
    if (step === 'confirm') setStep('pitch');
    else if (step === 'pitch') {
      if (!user) {
        toast.error('Identity Node not detected. Please sign in to initialize application.');
        return;
      }
      if (!gig) {
        toast.error('Mission data corrupt. Please restart application intake.');
        return;
      }

      setIsSubmitting(true);
      try {
        const appId = await applicationService.applyForGig({
          gigId: gig.id,
          gigTitle: gig.title,
          userId: user.uid,
          applicantName: profile?.fullName || user.displayName || 'Anonymous Learner',
          applicantPersona: profile?.persona || 'Skill Explorer',
          message: pitch,
          status: 'Applied',
          matchScore: 95,
          applicantSkills: profile?.masteredSkills?.map(s => s.name) || [],
          applicantAvatar: user.photoURL || null
        });
        if (appId) {
          setApplicationId(appId);
          toast.success('Strategy Node Synchronized');
          setStep('success');
        }
      } catch (error: any) {
        console.error("Submission failed", error);
        // Extract error message if it's JSON from handleFirestoreError
        let errorMessage = 'Your mission log could not be synchronized.';
        try {
          const parsed = JSON.parse(error.message);
          if (parsed.error) errorMessage = parsed.error;
        } catch (e) {
          // not JSON, use original error message
          if (error.message) errorMessage = error.message;
        }
        toast.error(`Submission failed: ${errorMessage}`);
      } finally {
        setIsSubmitting(false);
      }
    }
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
        {loading ? (
          <motion.div 
            key="loading"
            className="flex flex-col items-center justify-center py-64 space-y-4"
          >
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Synchronizing Operational Corridor...</p>
          </motion.div>
        ) : !user ? (
          <motion.div 
             key="auth-required"
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             className="text-center py-32 space-y-10"
          >
             <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary mx-auto">
               <ShieldCheck size={48} />
             </div>
             <div className="space-y-4">
               <h2 className="text-4xl font-black text-on-surface uppercase italic tracking-tighter">Identity Required.</h2>
               <p className="text-slate-500 font-medium italic max-w-sm mx-auto">To initialize this mission deployment, we must verify your talent node on the network.</p>
             </div>
             <button 
               onClick={handleLogin}
               className="px-12 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all text-xs uppercase tracking-widest italic flex items-center mx-auto gap-4"
             >
               <Rocket size={20} />
               Verify Identity Node
             </button>
          </motion.div>
        ) : !gig ? (
          <motion.div 
             key="error"
             className="text-center py-32 space-y-6"
          >
             <h2 className="text-3xl font-black text-on-surface uppercase italic">Node Missing.</h2>
             <p className="text-slate-500 font-medium italic">We couldn't initialize the application for this ID.</p>
             <button onClick={() => navigate('/registry')} className="px-8 py-3 bg-primary text-white font-black rounded-xl uppercase text-[10px] tracking-widest italic">Back to Marketplace</button>
          </motion.div>
        ) : step === 'confirm' && (
          <motion.div 
            key="confirm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            <div className="space-y-4 px-4 text-center">
              <h2 className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter italic font-medium uppercase underline decoration-primary/30 underline-offset-8 leading-tight">Verify your operational capacity for this deployment.</h2>
            </div>

            <section className="bento-card border-slate-100 space-y-10">
              <div className="space-y-6">
                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform">
                    <Clock size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-on-surface tracking-tight">Temporal Commitment</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      This project requires approximately <span className="text-on-surface font-black uppercase tracking-widest">{gig.duration}</span> at <span className="text-on-surface font-black uppercase tracking-widest">{gig.workload || 'standard'}</span> capacity.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-6 group">
                  <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600 shrink-0 group-hover:scale-110 transition-transform">
                    <ShieldCheck size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-on-surface tracking-tight">Skill Verification</h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      Your current passport levels in <span className="text-on-surface font-black uppercase tracking-widest">{gig.category}</span> exceed the baseline requirements.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100">
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
              <h2 className="text-4xl lg:text-6xl font-light text-on-surface tracking-tighter uppercase italic leading-none">
                Why are you the <span className="font-bold underline decoration-primary/30 underline-offset-8">best candidate</span> for this gig?
              </h2>
            </div>

            <section className="bento-card border-slate-100 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-end ml-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em]">Elevator Pitch</label>
                  <span className={cn("text-[10px] font-bold uppercase tracking-widest", pitch.length >= 10 ? 'text-primary' : 'text-rose-500')}>
                    {pitch.length}/500 (Min 10 chars)
                  </span>
                </div>
                <div className="relative">
                  <textarea 
                    value={pitch}
                    onChange={(e) => setPitch(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 focus:border-primary/50 focus:bg-white rounded-[1.5rem] p-8 text-lg text-on-surface transition-all resize-none shadow-sm outline-none min-h-[250px] placeholder:text-slate-400 tracking-tight" 
                    placeholder="Briefly describe your approach to this marketing challenge..." 
                  />
                  <div className="absolute top-6 right-6">
                    <MessageSquare size={20} className="text-slate-800" />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    if (pitch.length < 10) {
                      toast.error('Your pitch must be at least 10 characters long.');
                      return;
                    }
                    handleNext();
                  }}
                  disabled={isSubmitting}
                  className={cn(
                    "w-full py-6 font-bold rounded-2xl shadow-3xl transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.2em] text-sm overflow-hidden relative",
                    pitch.length >= 10 ? "bg-primary text-white hover:brightness-110 shadow-primary/20" : "bg-slate-100 text-slate-400 border border-slate-200"
                  )}
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      <span className="relative z-10">Initialize Application</span>
                      <Send className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" size={20} />
                    </>
                  )}
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
              <h2 className="text-4xl lg:text-5xl font-bold text-on-surface tracking-tighter italic uppercase">Application <br/>Synchronized.</h2>
              <p className="text-slate-500 font-medium italic text-lg leading-relaxed max-w-sm mx-auto">
                Your credentials and pitch have been uploaded to the mission center. The organization will review your profile shortly.
              </p>
            </div>

            <div className="flex flex-col w-full gap-4 pt-10">
              <Link 
                to={applicationId ? `/application/${applicationId}/status` : '/'} 
                className="w-full py-6 bg-white text-slate-950 font-bold rounded-2xl shadow-3xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm"
              >
                View Application Status
              </Link>
              <Link 
                to="/" 
                className="w-full py-6 bg-slate-900 border border-slate-800 text-slate-500 font-bold rounded-2xl hover:text-white transition-all text-center uppercase tracking-[0.2em] text-[10px]"
              >
                Back to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
