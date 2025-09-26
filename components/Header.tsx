'use client';

import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
  const { user, signOutUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#007367] shadow-lg">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image 
                src="/gitam-logo.png" 
                alt="GITAM Logo" 
                width={32} 
                height={32}
                className="sm:w-8 sm:h-8 lg:w-10 lg:h-10 drop-shadow-md"
              />
            </div>
            <h1 className="text-white font-bold text-sm sm:text-base lg:text-xl truncate">
              GITAM Achievement Portal
            </h1>
          </div>

          {user && (
            <>
              {/* Desktop User Menu */}
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <Image 
                    src={user.imageUrl} 
                    alt="User Photo" 
                    width={36} 
                    height={36}
                    className="rounded-full ring-2 ring-white/20"
                  />
                  <div className="text-white">
                    <div className="text-sm font-medium">{user.name}</div>
                    <div className="text-xs text-blue-100">{user.email}</div>
                  </div>
                </div>
                <button 
                  onClick={signOutUser} 
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium border border-white/20 hover:border-white/40"
                >
                  Sign Out
                </button>
              </div>

              {/* Mobile Hamburger Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        {user && isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/20 py-4 animate-fade-in-up">
            <div className="flex items-center space-x-3 mb-4">
              <Image 
                src={user.imageUrl} 
                alt="User Photo" 
                width={40} 
                height={40}
                className="rounded-full ring-2 ring-white/20"
              />
              <div className="text-white">
                <div className="text-sm font-medium">{user.name}</div>
                <div className="text-xs text-blue-100">{user.email}</div>
              </div>
            </div>
            <button 
              onClick={() => {
                signOutUser();
                setIsMobileMenuOpen(false);
              }} 
              className="w-full bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg transition-all duration-200 text-sm font-medium border border-white/20 hover:border-white/40 text-left"
            >
              🚪 Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}