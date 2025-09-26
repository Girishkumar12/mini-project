'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

export default function LoginSection() {
  const { signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <section className="py-8 min-h-[calc(100vh-80px)] flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="bg-gray-50 p-8 rounded-2xl text-center max-w-lg mx-auto my-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Welcome to GITAM Achievement Portal</h2>
          <p className="mb-6">Please sign in with your GITAM email account</p>
          
          <button
            onClick={handleSignIn}
            disabled={isSigningIn}
            className="bg-[#007367] text-white px-8 py-3 text-lg rounded-lg font-medium hover:bg-[#005a52] transition-colors duration-300 disabled:opacity-50"
          >
            {isSigningIn ? (
              <span className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </span>
            ) : (
              '🔐 Sign in with Google'
            )}
          </button>
          
          <p className="text-sm text-gray-600 mt-4">
            Valid domains: @gitam.in, @*.gitam.edu, @gitam.edu
          </p>
        </div>
      </div>
    </section>
  );
}