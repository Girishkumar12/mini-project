'use client';

import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Header() {
  const { user, signOutUser } = useAuth();

  return (
    <header className="bg-[#007367] text-white py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">GITAM Achievement Portal</h1>
          {user && (
            <div className="flex items-center gap-4">
              <Image 
                src={user.imageUrl} 
                alt="User Photo" 
                width={40} 
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-white">{user.name}</span>
              <button 
                onClick={signOutUser} 
                className="bg-[#2c2c2c] text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}