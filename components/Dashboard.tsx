'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Dashboard() {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Welcome to your {userProfile.type === 'student' ? 'Student' : 'Faculty'} Dashboard
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">New Form</h3>
              <p className="text-gray-600 mb-4">
                {userProfile.type === 'student' 
                  ? 'Submit achievement forms for March-May 2025'
                  : 'Submit guest lectures, reviews, and projects'
                }
              </p>
              <Link 
                href={userProfile.type === 'student' ? '/achievement-form' : '/faculty-form'}
                className="btn btn-primary"
              >
                Create New Form
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-2">View Responses</h3>
              <p className="text-gray-600 mb-4">
                Browse and filter all submitted responses from the portal
              </p>
              <Link href="/responses" className="btn btn-primary">
                View All Responses
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <p className="text-gray-600 mb-4">
                View and manage your profile information
              </p>
              <Link href="/profile" className="btn btn-primary">
                Manage Profile
              </Link>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">Your Profile Summary</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Type:</strong> {userProfile.type === 'student' ? 'Student' : 'Faculty'}
              </div>
              <div>
                <strong>Branch:</strong> {userProfile.branch}
              </div>
              {userProfile.type === 'student' && userProfile.rollNo && (
                <>
                  <div>
                    <strong>Roll Number:</strong> {userProfile.rollNo}
                  </div>
                  <div>
                    <strong>Year:</strong> {userProfile.yearOfStudy} Year
                  </div>
                </>
              )}
              {userProfile.type === 'faculty' && (
                <>
                  {userProfile.employeeId && (
                    <div>
                      <strong>Employee ID:</strong> {userProfile.employeeId}
                    </div>
                  )}
                  {userProfile.department && (
                    <div>
                      <strong>Department:</strong> {userProfile.department}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}