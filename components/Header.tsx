'use client';

import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

export default function Header() {
  const { user, signOutUser } = useAuth();

  return (
    <header className="header">
      <div className="container">
        <h1 className="logo">GITAM Achievement Portal</h1>
        {user && (
          <div className="user-info">
            <Image 
              src={user.imageUrl} 
              alt="User Photo" 
              width={40} 
              height={40}
              className="user-photo rounded-full"
            />
            <span>{user.name}</span>
            <button onClick={signOutUser} className="btn btn-secondary">
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}