'use client';

import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Image from 'next/image';

export default function Profile() {
  const { user, userProfile } = useAuth();

  if (!user || !userProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <p>Please complete your profile to view this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Profile Information</h2>
          
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="flex items-start gap-6 mb-8">
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={100}
                height={100}
                className="rounded-full"
              />
              <div>
                <h3 className="text-2xl font-bold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-1">{user.email}</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  userProfile.type === 'student' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {userProfile.type === 'student' ? 'Student' : 'Faculty'}
                </span>
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-xl font-bold mb-4">Profile Details</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <p className="text-gray-900 capitalize">{userProfile.type}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Branch
                  </label>
                  <p className="text-gray-900">{userProfile.branch}</p>
                </div>
                
                {userProfile.type === 'student' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Roll Number
                      </label>
                      <p className="text-gray-900">{userProfile.rollNo}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Year of Study
                      </label>
                      <p className="text-gray-900">{userProfile.yearOfStudy} Year</p>
                    </div>
                  </>
                )}
                
                {userProfile.type === 'faculty' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee ID
                      </label>
                      <p className="text-gray-900">{userProfile.employeeId}</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department
                      </label>
                      <p className="text-gray-900">{userProfile.department}</p>
                    </div>
                  </>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Created
                  </label>
                  <p className="text-gray-900">
                    {new Date(userProfile.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t pt-6 mt-6">
              <h4 className="text-xl font-bold mb-4">Account Information</h4>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Email Domain Verification:</strong> Your email {user.email} is verified 
                  as a valid GITAM domain email address.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}