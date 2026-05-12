import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { UserProfile } from '../types';
import { userService } from '../services/firestoreService';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isLearner: boolean;
  isPoster: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isLearner: false,
  isPoster: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    let unsubscribeProfile: (() => void) | undefined;

    const unsubscribeAuth = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (unsubscribeProfile) unsubscribeProfile();

      if (u) {
        try {
          // Setting up real-time listener for profile
          unsubscribeProfile = userService.onProfileSnapshot(u.uid, (p) => {
            if (p) {
              setProfile(p);
            } else {
              // Initialize default profile if none exists
              const newProfile: UserProfile = {
                userId: u.uid,
                displayName: u.displayName || 'Anonymous Explorer',
                email: u.email || '',
                role: 'learner',
                persona: 'Strategic Explorer',
                level: 4,
                experienceHours: 120,
                credentialsEarned: 8,
                efficiency: 85,
                masteredSkills: [
                  { name: 'Project Management', level: 'Expert', tags: ['AGILE'] },
                  { name: 'Strategic Analysis', level: 'Advanced', tags: ['DATA'] },
                  { name: 'Digital Marketing', level: 'Verified', tags: ['SEO'] }
                ],
                createdAt: new Date().toISOString()
              };
              userService.createUserProfile(newProfile).then(() => setProfile(newProfile));
            }
            setLoading(false);
          });
        } catch (error) {
          console.error("Error loading profile:", error);
          setLoading(false);
        }
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeProfile) unsubscribeProfile();
    };
  }, []);

  const value = {
    user,
    profile,
    loading,
    isLearner: profile?.role === 'learner' || !profile?.role,
    isPoster: profile?.role === 'poster',
    signInWithGoogle,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
