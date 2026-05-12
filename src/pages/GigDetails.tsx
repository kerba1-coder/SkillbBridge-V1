import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Send, 
  Database, 
  TrendingUp, 
  FileText, 
  CheckCircle2, 
  Award,
  Clock,
  Briefcase,
  Target,
  Loader2,
  Search
} from 'lucide-react';
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';
import { gigService, applicationService } from '../services/firestoreService';
import { Gig } from '../types';
import { useAuth } from '../contexts/AuthContext';

export const GigDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [gig, setGig] = useState<Gig | null>(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  useEffect(() => {
    const fetchGig = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await gigService.getGig(id);
        if (data) {
          setGig(data);
        }
      } catch (error) {
        console.error("Error fetching gig:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGig();
    window.scrollTo(0, 0);
  }, [id]);

  const handleApply = async () => {
    if (!user || !gig) return;
    setIsApplying(true);
    try {
      await applicationService.applyForGig({
        gigId: gig.id,
        gigTitle: gig.title,
        userId: user.uid,
        applicantName: profile?.fullName || user.displayName || 'Anonymous Candidate',
        applicantPersona: profile?.persona || 'SkillBridge Learner',
        message: "I am interested in this mission and have the required competencies.",
        status: 'Applied',
        matchScore: 92, // In a real app, this would be calculated
        applicantSkills: profile?.masteredSkills?.map(s => s.name) || [],
        applicantAvatar: user.photoURL || undefined
      });
      navigate('/');
    } catch (error) {
      console.error("Application failed:", error);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-64 space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Synchronizing Node Data...</p>
      </div>
    );
  }

  if (!gig) {
    return (
      <div className="max-w-xl mx-auto py-32 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
        <div className="space-y-4">
          <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-300 mx-auto">
            <Search size={40} />
          </div>
          <h2 className="text-3xl font-black text-on-surface tracking-tighter uppercase italic">Mission not found.</h2>
          <p className="text-slate-600 font-medium italic">We couldn't locate the strategic node you're looking for. It may have been archived or completed.</p>
        </div>

        <div className="pt-8 flex flex-col gap-4">
          <button 
            onClick={() => navigate('/registry')}
            className="w-full py-4 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all uppercase tracking-widest text-[10px] italic"
          >
            Explore Active Gigs
          </button>
          <button 
            onClick={() => navigate('/')}
            className="w-full py-4 bg-white border border-slate-100 text-slate-600 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px] italic"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-8 lg:pb-32 pb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Top Navigation */}
      <div className="flex items-center gap-4">
        <Link 
          to="/" 
          className="p-3 rounded-xl bg-white border border-slate-100 text-slate-600 hover:text-primary transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft size={20} />
        </Link>
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.4em]">Gig Details • Reference: {gig.category.substring(0, 3).toUpperCase()}-{gig.id}</span>
      </div>

      {/* Main Gig Card */}
      <section className="bento-card bg-white border-slate-100 shadow-sm space-y-6 pt-12 overflow-hidden relative">
        <div className="flex flex-wrap gap-3 relative z-10">
          <span className="px-4 py-1.5 rounded-xl bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
            <TrendingUp size={12} /> {gig.type}
          </span>
          <span className="px-4 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest border border-orange-100 flex items-center gap-2">
            <Clock size={12} /> {gig.duration}
          </span>
          {gig.location && (
            <span className="px-4 py-1.5 rounded-xl bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
              <Target size={12} /> {gig.location}
            </span>
          )}
          {gig.workload && (
            <span className="px-4 py-1.5 rounded-xl bg-purple-50 text-purple-600 text-[10px] font-black uppercase tracking-widest border border-purple-100 flex items-center gap-2">
              <Database size={12} /> {gig.workload}
            </span>
          )}
        </div>

        <div className="space-y-4 relative z-10">
          <h1 className="text-4xl font-black text-on-surface tracking-tighter leading-tight italic uppercase underline decoration-primary/10 underline-offset-8">
            {gig.title}
          </h1>
          <p className="text-slate-700 text-lg leading-relaxed font-semibold italic">
            "{gig.desc}"
          </p>
        </div>
        
        <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none">
          <Target size={240} className="text-primary transform translate-x-1/4 translate-y-1/4" />
        </div>
      </section>

      {/* AI-Generated Scope */}
      <section className="bento-card border-slate-100 bg-white shadow-sm space-y-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
            <TrendingUp size={20} className="text-primary" />
          </div>
          <h2 className="text-2xl font-black text-on-surface tracking-tighter uppercase italic underline decoration-primary/20 underline-offset-8">Skill Breakdown.</h2>
        </div>

        <div className="space-y-12 relative">
          <div className="absolute left-[27px] top-10 bottom-10 w-0.5 bg-slate-50"></div>

          {gig.skills.map((skill, idx) => (
            <div key={idx} className="relative flex gap-8 group">
              <div className={cn(
                "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-sm relative z-10 transition-transform duration-500 group-hover:scale-110 bg-white border border-slate-100"
              )}>
                <span className="text-lg font-black text-primary">{idx + 1}</span>
              </div>
              <div className="space-y-2 pt-1 flex-1">
                <h4 className="text-xl font-black text-on-surface tracking-tighter uppercase italic group-hover:text-primary transition-colors">{skill}</h4>
                <p className="text-slate-700 text-sm italic font-medium leading-relaxed">
                  Apply your {skill.toLowerCase()} skills to complete high-quality deliverables for {gig.org}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills You'll Grow */}
      <section className="bento-card bg-primary/5 border-primary/10 space-y-8 shadow-sm">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-white rounded-lg shadow-sm text-primary">
            <Briefcase size={24} />
           </div>
           <h3 className="text-xl font-black text-on-surface tracking-tighter uppercase italic">Skills You'll Grow.</h3>
        </div>
        <div className="space-y-4">
          <p className="text-sm text-slate-700 font-medium italic mb-6">By completing this task, you will strengthen your experience in these key areas:</p>
          {[
            'Professional Portfolio Example',
            `Specific skill set: ${gig.category}`,
            'Verified Service Record'
          ].map((outcome) => (
            <div key={outcome} className="flex items-center gap-4 group">
              <CheckCircle2 className="text-primary/40 group-hover:text-primary transition-colors" size={20} />
              <span className="text-[10px] font-black text-on-surface uppercase tracking-widest italic">{outcome}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Your Achievements */}
      <section className="bento-card border-slate-100 bg-white shadow-sm space-y-8">
        <div className="space-y-2">
          <h3 className="text-xl font-black text-on-surface tracking-tighter uppercase italic">Your Achievements.</h3>
          <p className="text-xs text-slate-600 font-medium italic">These verified badges will be added to your profile once the project is approved:</p>
        </div>
        <div className="flex gap-12">
          {[
            { label: 'Reliability', icon: Award, color: 'text-orange-500', bg: 'bg-orange-50' },
            { label: 'Project Star', icon: CheckCircle2, color: 'text-sky-500', bg: 'bg-sky-50' }
          ].map((cred) => (
            <div key={cred.label} className="flex flex-col items-center gap-3">
              <div className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed shadow-sm group transition-all hover:scale-110",
                cred.bg,
                cred.color.replace('text', 'border')
              )}>
                <cred.icon className={cred.color} size={32} />
              </div>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest text-center">{cred.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fixed Action Button */}
      <div className="lg:fixed lg:bottom-0 lg:left-80 lg:right-0 p-6 lg:p-8 z-40 lg:bg-gradient-to-t from-white via-white/90 to-transparent flex justify-center pb-32 lg:pb-8">
        <Link 
          to={`/gig/${gig.id}/apply`}
          className="w-full max-w-xl py-5 lg:py-6 bg-primary text-white font-black rounded-2xl shadow-2xl shadow-primary/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-6 group uppercase tracking-[0.2em] text-sm overflow-hidden relative italic"
        >
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-700"></div>
          <span className="relative z-10 text-white font-black tracking-[0.4em]">Initialize application</span>
          <Send className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 text-white" size={20} />
        </Link>
      </div>
    </div>
  );
};
