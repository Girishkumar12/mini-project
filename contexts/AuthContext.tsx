'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  GoogleAuthProvider
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { User, UserProfile, VALID_DOMAINS } from '@/types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (profile: UserProfile) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const isValidGitamEmail = (email: string): boolean => {
    const emailLower = email.toLowerCase();
    return VALID_DOMAINS.some(domain => 
      emailLower.endsWith(`@${domain}`) || 
      emailLower.includes(`.${domain}`)
    );
  };

  const signInWithGoogle = async () => {
    if (typeof window === 'undefined' || !auth || !googleProvider || !db) {
      throw new Error('Authentication not available');
    }

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      if (!isValidGitamEmail(firebaseUser.email || '')) {
        await signOut(auth);
        throw new Error('Please use a valid GITAM email address (@gitam.in, @gitam.edu)');
      }
      
      const userData: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'Unknown User',
        email: firebaseUser.email || '',
        imageUrl: firebaseUser.photoURL || '/default-avatar.png',
        signedIn: true
      };
      
      setUser(userData);
      
      // Check if user profile exists
      if (db) {
        const profileDoc = await getDoc(doc(db, 'profiles', firebaseUser.uid));
        if (profileDoc.exists()) {
          setUserProfile(profileDoc.data() as UserProfile);
        }
      }
      
    } catch (error: any) {
      console.error('Error signing in:', error);
      if (error.message.includes('GITAM email')) {
        alert(error.message);
      } else {
        alert('Error signing in. Please try again.');
      }
    }
  };

  const signOutUser = async () => {
    if (typeof window === 'undefined' || !auth) {
      return;
    }

    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateUserProfile = async (profile: UserProfile) => {
    if (!user || typeof window === 'undefined' || !db) return;
    
    try {
      await setDoc(doc(db, 'profiles', user.id), profile);
      setUserProfile(profile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined' || !auth || !db) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser && isValidGitamEmail(firebaseUser.email || '')) {
        const userData: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'Unknown User',
          email: firebaseUser.email || '',
          imageUrl: firebaseUser.photoURL || '/default-avatar.png',
          signedIn: true
        };
        
        setUser(userData);
        
        // Load user profile
        try {
          if (db) {
            const profileDoc = await getDoc(doc(db, 'profiles', firebaseUser.uid));
            if (profileDoc.exists()) {
              setUserProfile(profileDoc.data() as UserProfile);
            }
          }
        } catch (error) {
          console.error('Error loading profile:', error);
        }
      } else {
        setUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    user,
    userProfile,
    loading,
    signInWithGoogle,
    signOutUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}