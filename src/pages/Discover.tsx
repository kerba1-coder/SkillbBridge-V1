import { Link, useNavigate } from 'react-router-dom';
import { Search, Bell, Rocket, Lightbulb, ArrowRight, Sparkles, TrendingUp, Shield, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

export const Discover: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();

  const suggestedSkills = ['Marketing', 'Engineering', 'Process Improvement', 'Communication'];
  
  const strategicSkills = [
    { name: 'Agentic AI', growth: '+45%', tag: 'TOP GAINER', icon: Sparkles, color: 'text-primary', bg: 'bg-primary/10', link: '/opportunities/Strategy' },
    { name: 'Quantum Security', growth: '+32%', tag: 'STRATEGIC', icon: Shield, color: 'text-indigo-500', bg: 'bg-indigo-500/10', link: '/opportunities/Engineering' },
    { name: 'ESG Audit Tech', growth: '+28%', tag: 'EMERGING', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-500/10', link: '/opportunities/Process Improvement' },
  ];

  return (
    <div className="space-y-10 pb-20 animate-in fade-in duration-700">
      {/* Page Header (Matching Screenshot 3) */}
      <div className="flex items-center justify-between lg:hidden mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop" alt="Profile" />
          </div>
          <Link to="/discover">
            <h2 className="text-xl font-bold text-on-surface">Discover Your Future</h2>
          </Link>
        </div>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-slate-100">
          <Bell size={20} className="text-slate-600" />
        </button>
      </div>

      <div className="hidden lg:block space-y-2 mb-10">
        <h2 className="text-4xl font-extrabold text-on-surface">Discover Your Future</h2>
        <p className="text-slate-700 font-medium italic">Your personalized roadmap to high-impact strategic skills.</p>
      </div>

      {/* Progress Card (Matching Screenshot 3) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#f0f4ff] rounded-[2rem] p-8 lg:p-10 flex items-center justify-between border border-primary/10 shadow-sm overflow-hidden relative"
      >
        <div className="space-y-2 relative z-10">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">LEVEL 4 EXPLORER</p>
          <h3 className="text-3xl font-bold text-on-surface tracking-tight">Ready to grow?</h3>
        </div>
        <div className="relative w-24 h-24 lg:w-32 lg:h-32 flex items-center justify-center z-10 bg-white rounded-full shadow-inner p-1">
          <svg className="w-full h-full transform -rotate-90">
            <circle 
              className="text-slate-100" 
              cx="50%" cy="50%" r="42%" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="8" 
            />
            <motion.circle 
              initial={{ strokeDashoffset: 350 }}
              animate={{ strokeDashoffset: 350 * (1 - 0.75) }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-primary" 
              cx="50%" cy="50%" r="42%" 
              fill="transparent" 
              stroke="currentColor" 
              strokeWidth="8" 
              strokeDasharray="350" 
              strokeLinecap="round"
            />
          </svg>
          <span className="absolute text-xl lg:text-2xl font-black text-on-surface">75%</span>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      </motion.div>

      {/* Jump Right In (Matching Screenshot 3) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Rocket className="text-primary saturate-150" size={24} />
          <h3 className="text-xl font-bold text-on-surface">Jump Right In</h3>
        </div>
        
        <div className="bento-card bg-white border-slate-100 p-8 space-y-8">
          <div className="relative group">
            <Search className="absolute left-3 lg:left-6 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-primary transition-colors" size={20} />
            <input 
              placeholder="What skill do you want to master?" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-5 pl-12 lg:pl-16 pr-6 focus:bg-white focus:border-primary/30 transition-all outline-none font-medium text-xs lg:text-base text-on-surface placeholder:text-slate-400 shadow-sm"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/marketplace?search=${(e.target as HTMLInputElement).value}`);
                }
              }}
            />
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">SUGGESTED FOR YOU</p>
            <div className="flex flex-wrap gap-3">
              {suggestedSkills.map(skill => (
                <Link 
                  to={`/opportunities/${skill}`} 
                  key={skill} 
                  className="px-6 py-3 bg-[#e8edff] hover:bg-primary hover:text-white transition-all rounded-xl text-[10px] lg:text-xs font-black text-on-surface active:scale-95 shadow-sm uppercase tracking-widest"
                >
                  {skill}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Where to Start? (Matching Screenshot 3) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Lightbulb className="text-amber-500 saturate-150" size={24} />
          <h3 className="text-xl font-bold text-on-surface">Not Sure Where to Start?</h3>
        </div>

        <div className="bg-[#fff1e0] rounded-[2rem] p-8 lg:p-10 border border-amber-200/50 shadow-sm relative overflow-hidden group">
          <div className="space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#6d3a00] rounded-2xl text-white shadow-lg">
                <Sparkles size={20} />
              </div>
              <span className="text-lg font-bold text-[#452500]">Let AI guide you</span>
            </div>
            
            <p className="text-[#6d3a00] font-medium text-lg max-w-sm leading-relaxed">
              Assess your professional goals and interests. Our AI will architect a personalized strategic plan and map the best gigs to help you achieve them.
            </p>

            <Link 
              to="/ai-guidance"
              className="w-full lg:w-auto px-10 py-5 bg-[#944e00]/10 border border-[#944e00]/20 text-[#6d3a00] font-black rounded-[2rem] shadow-sm hover:bg-[#944e00]/20 transition-all flex items-center justify-center gap-4 group active:scale-95 uppercase tracking-widest text-xs"
            >
              Start AI Assessment <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          {/* Decorative pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* Emerging Strategic Skills (Matching Screenshot 2) */}
      <section className="space-y-8 pt-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-on-surface tracking-tighter">Emerging Strategic Skills</h2>
          <p className="text-slate-700 font-medium leading-tight">Strategic intelligence for workforce evolution and upskilling.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategicSkills.map(skill => (
            <Link 
              to={skill.link}
              key={skill.name}
              className="block"
            >
              <motion.div 
                whileHover={{ y: -5 }}
                className="bento-card bg-white border border-slate-100 p-8 space-y-6 relative overflow-hidden h-full group"
              >
                <div className="flex justify-between items-start relative z-10">
                  <span className={cn("px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md", skill.bg, skill.color )}>
                    {skill.tag}
                  </span>
                  <skill.icon className={cn("opacity-[0.05] scale-[2] absolute -right-4 -top-4 transition-transform group-hover:scale-[2.2]", skill.color)} size={80} />
                </div>

                <div className="space-y-4 relative z-10">
                  <h4 className="text-2xl font-black text-on-surface tracking-tight uppercase italic underline decoration-primary/10 group-hover:text-primary transition-colors">{skill.name}</h4>
                  <div className="flex items-end justify-between">
                    <p className="text-4xl font-black text-on-surface tracking-tighter group-hover:text-primary transition-colors">{skill.growth}</p>
                    <TrendingUp className="text-primary group-hover:translate-x-1 transition-transform" size={24} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
