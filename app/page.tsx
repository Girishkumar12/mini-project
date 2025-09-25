'use client';

import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import LoginSection from '@/components/LoginSection';
import UserTypeSelection from '@/components/UserTypeSelection';
import ProfileSetup from '@/components/ProfileSetup';
import Dashboard from '@/components/Dashboard';
import { useState } from 'react';

export default function Home() {
  const { user, userProfile, loading } = useAuth();
  const [showUserTypeSelection, setShowUserTypeSelection] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState<'student' | 'faculty' | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="main">
        {!user ? (
          <LoginSection />
        ) : !userProfile && !showUserTypeSelection && !showProfileSetup ? (
          <UserTypeSelection 
            onSelectType={(type) => {
              setShowUserTypeSelection(false);
              setShowProfileSetup(type);
            }}
          />
        ) : showProfileSetup ? (
          <ProfileSetup 
            userType={showProfileSetup}
            onComplete={() => {
              setShowProfileSetup(null);
            }}
          />
        ) : userProfile ? (
          <Dashboard />
        ) : (
          <UserTypeSelection 
            onSelectType={(type) => {
              setShowUserTypeSelection(false);
              setShowProfileSetup(type);
            }}
          />
        )}
      </main>
    </div>
  );
}
