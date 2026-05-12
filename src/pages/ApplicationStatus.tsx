import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  ArrowRight, 
  FileText, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  Clock,
  ExternalLink,
  Target,
  LayoutGrid,
  Database,
  Rocket,
  Loader2,
  Sparkles
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'react-hot-toast';
import { cn } from '../lib/utils';
import { applicationService } from '../services/firestoreService';
import { Application } from '../types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

export const ApplicationStatus: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [acceptedStep, setAcceptedStep] = useState<'decision' | 'terms' | 'onboarding'>('decision');
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    const syncApp = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const docRef = doc(db, 'applications', id);
        const { getDoc } = await import('firebase/firestore');
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          setApplication({ ...snap.data(), id: snap.id } as Application);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    syncApp();
  }, [id]);

  const handleSimulateAccept = async () => {
    if (!id || !application) return;
    setIsSimulating(true);
    try {
      const docRef = doc(db, 'applications', id);
      await updateDoc(docRef, { status: 'Accepted' });
      setApplication(prev => prev ? { ...prev, status: 'Accepted' } : null);
      toast.success('Simulation: Candidate Selected');
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-64 space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Retrieving Application Protocol...</p>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="text-center py-32 space-y-6">
        <h2 className="text-3xl font-black text-on-surface uppercase italic">Record Not Found.</h2>
        <p className="text-slate-500 font-medium italic">The application ID provided does not match any known deployments.</p>
        <button onClick={() => navigate('/')} className="px-8 py-3 bg-primary text-white font-black rounded-xl uppercase text-[10px] tracking-widest italic">Back to Dashboard</button>
      </div>
    );
  }

  const status = application.status;

  return (
    <div className="max-w-xl mx-auto space-y-8 pb-32 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex items-center justify-between px-2">
        <Link 
          to="/" 
          className="p-3 rounded-xl bg-white border border-slate-100 text-slate-600 hover:text-primary transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="text-right">
          <span className="text-[10px] font-bold text-slate-700 uppercase tracking-[0.4em]">
            Application Status • Ref: {id}
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'Accepted' && (
          <motion.div 
            key="accepted"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-8"
          >
            {acceptedStep === 'decision' && (
              <div className="space-y-8">
                <div className="space-y-6 px-4">
                  <div className="w-20 h-20 rounded-[2rem] bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-2xl">
                    <CheckCircle2 size={40} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter italic">Mission <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Accepted.</span></h2>
                    <p className="text-slate-500 font-medium italic">Congratulations! You have been selected for the {application.gigTitle} project.</p>
                  </div>
                </div>

                <section className="bento-card border-emerald-400/20 space-y-8">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Confirmation Steps</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Digital Contract', icon: ShieldCheck, status: 'Pending' },
                        { title: 'Onboarding Kit', icon: FileText, status: 'Locked' },
                        { title: 'Slack Access', icon: MessageSquare, status: 'Locked' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-4">
                            <item.icon className="text-slate-400" size={20} />
                            <span className="text-sm font-bold text-on-surface uppercase tracking-tight">{item.title}</span>
                          </div>
                          <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest bg-white px-3 py-1 rounded-lg border border-slate-100">
                            {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button 
                    onClick={() => setAcceptedStep('terms')}
                    className="w-full py-6 bg-emerald-500 text-white font-bold rounded-2xl shadow-3xl hover:brightness-110 transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.2em] text-sm"
                  >
                    Standardize Agreement
                    <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </section>
              </div>
            )}

            {acceptedStep === 'terms' && (
              <div className="space-y-8">
                <div className="space-y-4 px-4 text-center">
                  <h2 className="text-3xl font-black text-on-surface tracking-tighter italic uppercase underline decoration-primary/10 underline-offset-8">Formal Acceptance.</h2>
                  <p className="text-slate-700 text-sm italic font-medium">Review and sign the digital partnership agreement.</p>
                </div>
                <section className="bento-card border-slate-100 space-y-8 bg-white shadow-sm">
                  <div className="h-64 bg-slate-50 rounded-2xl p-6 overflow-y-auto text-[10px] text-slate-700 font-medium leading-relaxed font-mono border border-slate-100">
                    <p className="mb-4">SECTION 1.1: PROJECT TERMS</p>
                    <p className="mb-4">This agreement (the "Protocol") defines the operational relationship between the Learner (Alex) and the Organization (TechCorp)...</p>
                    <p className="mb-4">The Learner agrees to maintain confidentiality regarding all proprietary data assets accessed during the deployment...</p>
                    <p className="mb-4">Payment and Experience credits will be released upon verification of key milestones as defined in the Scoping Review document...</p>
                    <p>Intellectual Property created during this session remains the property of TechCorp...</p>
                  </div>
                  <button 
                    onClick={() => setAcceptedStep('onboarding')}
                    className="w-full py-6 bg-primary text-white font-bold rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all flex items-center justify-center gap-4 group uppercase tracking-[0.2em] text-sm"
                  >
                    Digital Signature Verified
                    <ShieldCheck size={20} />
                  </button>
                </section>
              </div>
            )}

            {acceptedStep === 'onboarding' && (
              <div className="space-y-8">
                <div className="space-y-6 px-4 text-center">
                  <div className="w-20 h-20 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary mx-auto animate-pulse">
                    <Rocket size={40} />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black text-on-surface tracking-tighter italic uppercase">Initiate <span className="text-primary underline decoration-primary/10">Deployment.</span></h2>
                    <p className="text-slate-500 text-sm italic font-medium">Onboarding materials initialized. You are cleared for kickoff.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 px-4">
                  {[
                    { title: 'Project Board', desc: 'Sync your tasks in the Cerebro Canvas', icon: LayoutGrid, link: '#' },
                    { title: 'Data Warehouse', desc: 'Access the raw telemetry data', icon: Database, link: '#' },
                    { title: 'Communication Hub', desc: 'Join the TechCorp Engineering Slack', icon: MessageSquare, link: '#' }
                  ].map((tool, idx) => (
                    <button key={idx} className="bento-card flex items-center justify-between group hover:bg-slate-50 transition-all text-left bg-white border-slate-100 shadow-sm">
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform shadow-sm">
                          <tool.icon size={24} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface uppercase tracking-tight">{tool.title}</p>
                          <p className="text-[10px] text-slate-600 font-bold italic">{tool.desc}</p>
                        </div>
                      </div>
                      <ExternalLink size={18} className="text-slate-600 group-hover:text-primary transition-colors" />
                    </button>
                  ))}
                </div>

                <div className="px-4">
                  <Link 
                    to={`/application/${id}/dashboard`} 
                    className="w-full py-6 bg-primary text-white font-bold rounded-2xl shadow-3xl hover:brightness-110 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm"
                  >
                    View Project Dashboard
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {status === 'Rejected' && (
          <motion.div 
            key="denied"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            <div className="space-y-8 px-4">
              <div className="w-20 h-20 rounded-[2rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 shadow-2xl">
                <XCircle size={40} />
              </div>
              <div className="space-y-2 text-center flex flex-col items-center">
                <h2 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter italic uppercase">Feedback <span className="text-rose-500 underline decoration-rose-500/20 underline-offset-8">Report.</span></h2>
                <p className="text-slate-500 font-medium italic">Your application for 'Legacy Data Port' was not selected for this session.</p>
              </div>
            </div>

            <section className="bento-card border-rose-500/10 space-y-6 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
                  <MessageSquare size={18} />
                </div>
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Hiring Org Commentary</h3>
              </div>
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 italic">
                <p className="text-slate-500 leading-relaxed font-semibold italic">
                  "While Alex's Marketing passport is highly impressive, this specific deployment requires deeper experience with legacy COBOL architecture mapping. We recommend Alex focuses on 'Structural Systems' credentials to better align with our future requirements."
                </p>
              </div>
            </section>

            <section className="space-y-8">
              <div className="px-4">
                <h3 className="text-xl font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/20 underline-offset-8">Similar Opportunities.</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] italic mt-2">AI-Recalibrated Market Recommendations</p>
              </div>

              <div className="grid grid-cols-1 gap-6 px-4">
                {[
                  { title: 'Brand Continuity Audit', match: '98%', type: 'Marketing', desc: 'Focus on high-level identity alignment across social corridors.', icon: Zap, color: 'text-primary' },
                  { title: 'Audience Segment Sync', match: '94%', type: 'Strategy', desc: 'Synthesize consumer behavioral patterns for regional expansion.', icon: Target, color: 'text-emerald-500' }
                ].map((gig, idx) => (
                  <Link key={idx} to="/projects" className="bento-card flex items-center justify-between group hover:bg-slate-50 transition-all border-slate-100 hover:border-primary/20 bg-white shadow-sm">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <gig.icon className={gig.color} size={28} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-lg font-black text-on-surface tracking-tight group-hover:text-primary transition-colors">{gig.title}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{gig.type} • {gig.match} Match</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-slate-300 group-hover:text-primary transition-all group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>

            <div className="px-4 pt-10">
              <Link 
                to="/projects" 
                className="w-full py-6 bg-white text-slate-950 font-bold rounded-2xl shadow-3xl hover:bg-slate-200 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm"
              >
                Scan for other gig opportunities
                <ChevronRight size={20} />
              </Link>
            </div>
          </motion.div>
        )}

        {(status === 'Applied' || status === 'Shortlisted') && (
          <motion.div 
            key="under-review"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-10 px-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400 blur-[100px] opacity-10 animate-pulse"></div>
              <div className="w-32 h-32 rounded-[2.5rem] bg-slate-950 border border-slate-800 flex items-center justify-center text-amber-400 shadow-3xl relative z-10 scale-125">
                <Clock size={64} strokeWidth={1} />
              </div>
              <div className="absolute -top-4 -right-4 bg-slate-950 border border-slate-800 p-3 rounded-2xl shadow-2xl animate-bounce">
                <span className="text-[10px] font-black text-amber-400 uppercase tracking-widest">In Queue</span>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-black text-on-surface tracking-tighter italic uppercase underline decoration-amber-400/20 underline-offset-8">Review <span className="text-amber-500">Pending.</span></h2>
              <p className="text-slate-500 font-medium italic text-lg leading-relaxed max-w-sm mx-auto">
                The organization is currently evaluating your operational profile and pitch for <span className="text-on-surface font-bold">"{application.gigTitle}"</span>.
              </p>
            </div>

            <div className="flex flex-col w-full gap-4 pt-10">
              <button 
                onClick={handleSimulateAccept}
                disabled={isSimulating}
                className="w-full py-6 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-sm group"
              >
                {isSimulating ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <>
                    Simulate Selection <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </button>
              <Link 
                to="/" 
                className="w-full py-6 bg-white border border-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-50 transition-all text-center uppercase tracking-[0.2em] text-[10px] shadow-sm"
              >
                Return to Dashboard
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
