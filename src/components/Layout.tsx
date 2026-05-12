import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { 
  Compass, 
  Briefcase, 
  BadgeCheck, 
  BarChart3, 
  Zap,
  User as UserIcon, 
  Search, 
  BrainCircuit, 
  TrendingUp, 
  Gavel, 
  Settings, 
  Bell,
  Menu,
  Heart,
  X,
  LayoutDashboard,
  Repeat
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import { userService } from '../services/firestoreService';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, isLearner, isPoster, user, signInWithGoogle, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isSwitching, setIsSwitching] = React.useState(false);

  const toggleRole = async () => {
    if (!user || !profile) return;
    setIsSwitching(true);
    try {
      const newRole = profile.role === 'learner' ? 'poster' : 'learner';
      console.log(`Switching role from ${profile.role} to ${newRole}`);
      await userService.updateUserProfile(user.uid, { role: newRole as any });
      
      // Navigate to the respective dashboard
      navigate(newRole === 'poster' ? '/poster-dashboard' : '/');
    } catch (error) {
      console.error("Error switching roles:", error);
    } finally {
      setIsSwitching(false);
    }
  };

  const learnerItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/discover", icon: Compass, label: "Discovery" },
    { to: "/explore", icon: BrainCircuit, label: "A.I. Skills Explorer" },
    { to: "/marketplace", icon: Search, label: "Marketplace" },
    { to: "/projects", icon: Briefcase, label: "Projects" },
    { to: "/passport", icon: BadgeCheck, label: "Passport" },
  ];

  const posterItems = [
    { to: "/poster-dashboard", icon: LayoutDashboard, label: "Gig Posting Dashboard" },
    { to: "/scoping", icon: Zap, label: "AI Gig Builder" },
    { to: "/marketplace", icon: Search, label: "Network" },
    { to: "/insights", icon: BarChart3, label: "Strategic Ops" },
  ];

  const navItems = isPoster ? posterItems : learnerItems;

  return (
    <div className="flex min-h-screen bg-background text-on-background selection:bg-primary/20 overflow-x-hidden">
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-80 p-8 gap-6 bg-white border-r border-slate-100 z-[70] flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-2">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                    <BrainCircuit className="text-white" size={24} />
                  </div>
                  <span className="text-xl font-black tracking-tighter text-on-surface uppercase italic underline decoration-primary/10 underline-offset-4">SkillBridge AI</span>
                </Link>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <nav className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-5 py-2">Learner Experience</p>
                {learnerItems.map((item) => (
                  <NavLink 
                    key={item.to}
                    to={item.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-4 px-5 py-4 text-slate-600 hover:text-on-surface hover:bg-slate-50 transition-all rounded-2xl border border-transparent group",
                      isActive && !isPoster && "bg-slate-50 text-on-surface border-slate-100 shadow-sm"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={20} className={cn("transition-colors", (isActive && !isPoster) ? "text-primary" : "group-hover:text-primary")} />
                        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}

                <div className="my-4 border-t border-slate-100" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] px-5 py-2">Gig Poster Tools</p>
                {posterItems.map((item) => (
                  <NavLink 
                    key={item.to}
                    to={item.to} 
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => cn(
                      "flex items-center gap-4 px-5 py-4 text-slate-600 hover:text-on-surface hover:bg-slate-50 transition-all rounded-2xl border border-transparent group",
                      isActive && isPoster && "bg-slate-50 text-on-surface border-slate-100 shadow-sm"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={20} className={cn("transition-colors", (isActive && isPoster) ? "text-primary" : "group-hover:text-primary")} />
                        <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                ))}
                
                {/* Mobile Toggle */}
                <button 
                  onClick={toggleRole}
                  disabled={isSwitching}
                  className="flex items-center gap-4 px-5 py-4 mt-8 bg-primary text-white hover:brightness-110 transition-all rounded-2xl shadow-xl shadow-primary/20 group"
                >
                  <Repeat size={20} className={cn(isSwitching && "animate-spin")} />
                  <div className="text-left font-black uppercase italic tracking-tighter">
                    <p className="text-sm">Switch to {isLearner ? 'Gig Poster' : 'Learner Role'}</p>
                  </div>
                </button>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* NavigationDrawer (Desktop) */}
      <aside className="hidden lg:flex flex-col h-screen w-80 p-8 gap-6 bg-white border-r border-slate-100 fixed left-0 top-0 z-40">
        <div className="flex flex-col gap-6 mb-4">
          <Link to="/" className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <BrainCircuit className="text-white" size={24} />
            </div>
            <span className="text-xl font-black tracking-tighter text-on-surface uppercase italic underline decoration-primary/10 underline-offset-4">SkillBridge AI</span>
          </Link>

          {!user ? (
            <button 
              onClick={handleLogin}
              className="flex items-center gap-4 bg-primary text-white p-5 rounded-3xl shadow-xl shadow-primary/20 hover:brightness-110 active:scale-95 transition-all mt-2 group"
            >
              <div className="p-2 bg-white/20 rounded-xl">
                <UserIcon size={20} />
              </div>
              <span className="font-black uppercase italic tracking-tighter text-sm">Sync Identity</span>
            </button>
          ) : (
            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 mt-2 relative group/profile">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white border border-slate-200">
                <img 
                  alt={profile?.fullName || "User"} 
                  className="w-full h-full object-cover" 
                  src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"}
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="font-semibold text-sm text-on-surface truncate">{profile?.fullName || profile?.displayName || "Anonymous User"}</h3>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest truncate">{isPoster ? "Gig Poster" : "Elite Learner"}</p>
              </div>
              
              <button 
                onClick={logout}
                className="absolute -right-2 -top-2 p-2 bg-white border border-slate-200 rounded-full text-slate-400 hover:text-rose-500 opacity-0 group-hover/profile:opacity-100 transition-all shadow-sm"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>

        <nav className="flex flex-col gap-1 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-8">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-5 py-4">Learner Experience</p>
          {learnerItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-5 py-3 text-slate-600 hover:text-on-surface hover:bg-slate-50 transition-all rounded-2xl border border-transparent group",
                isActive && !isPoster && "bg-slate-100 text-on-surface border-slate-200 shadow-sm"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={cn("transition-colors", (isActive && !isPoster) ? "text-primary" : "group-hover:text-primary")} />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}

          <div className="my-4 border-t border-slate-100" />
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] px-5 py-4">Gig Poster Tools</p>
          {posterItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-5 py-3 text-slate-600 hover:text-on-surface hover:bg-slate-50 transition-all rounded-2xl border border-transparent group",
                isActive && isPoster && "bg-slate-100 text-on-surface border-slate-200 shadow-sm"
              )}
            >
              {({ isActive }) => (
                <>
                  <item.icon size={18} className={cn("transition-colors", (isActive && isPoster) ? "text-primary" : "group-hover:text-primary")} />
                  <span className="text-sm font-semibold tracking-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="pt-6 border-t border-slate-100">
           <button 
             onClick={toggleRole}
             disabled={isSwitching}
             className="w-full flex items-center gap-4 px-6 py-5 bg-primary text-white hover:brightness-110 transition-all rounded-[2rem] shadow-xl shadow-primary/20 group active:scale-95 text-left"
           >
              <div className={cn("p-2 rounded-xl bg-white/20 backdrop-blur-sm", isSwitching && "animate-spin")}>
                <Repeat size={20} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Switch Account</p>
                <p className="text-xs font-black uppercase tracking-tight italic mt-1">To {isLearner ? 'Gig Poster' : 'Learner'}</p>
              </div>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen relative lg:ml-80 pb-24 lg:pb-0">
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md flex justify-between items-center w-full px-4 lg:px-8 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 bg-white border border-slate-200 rounded-xl active:scale-95 duration-100 shadow-sm"
              >
                <Menu size={24} className="text-on-surface" />
              </button>
              {/* Profile Icon under Burger */}
              {!user ? (
                <button 
                  onClick={handleLogin}
                  className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-sm active:scale-90"
                >
                  <UserIcon size={18} />
                </button>
              ) : (
                <Link to="/passport" className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
                  <img 
                    alt="Profile" 
                    className="w-full h-full object-cover" 
                    src={user.photoURL || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop"}
                  />
                </Link>
              )}
            </div>
            <div className="flex flex-col lg:hidden">
              <h1 className="text-lg font-black text-on-surface uppercase italic tracking-tighter">SkillBridge AI</h1>
              <p className="text-[8px] font-black text-primary uppercase tracking-widest lg:hidden">Elite Learner</p>
            </div>
          </div>
          
          <div className="flex bg-white border border-slate-100 rounded-full px-6 py-2 gap-8 text-[11px] font-bold uppercase tracking-widest text-slate-700 hidden md:flex shadow-sm">
             <span className="text-on-surface">Live Network</span>
             <span className="flex items-center gap-2 text-slate-700"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Status: Stable</span>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-on-surface transition-all active:scale-95 shadow-sm">
              <Bell size={20} />
            </button>
          </div>
        </header>

        <section className="p-4 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
          {children}
        </section>

        {/* BottomNavBar (Mobile) */}
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 z-50 flex justify-around items-center px-4 py-2 bg-white/95 backdrop-blur-xl border border-slate-100 shadow-2xl rounded-full overflow-x-auto no-scrollbar gap-2">
          {navItems.map((item) => (
            <NavLink 
              key={item.to}
              to={item.to} 
              className={({ isActive }) => cn(
                "flex flex-col items-center gap-1 p-3 rounded-full transition-all active:scale-90",
                isActive ? "bg-primary text-white scale-110 px-6 shadow-lg shadow-primary/20" : "text-slate-500"
              )}
            >
              <item.icon size={20} />
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
};
