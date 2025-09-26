'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function Dashboard() {
  const { userProfile } = useAuth();

  if (!userProfile) return null;

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in-up">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#007367] to-[#2c2c2c] bg-clip-text text-transparent">
              🎉 Welcome to Your Dashboard
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed px-4">
              Hello, <span className="font-semibold text-[#007367]">{userProfile.type === 'student' ? 'Student' : 'Faculty Member'}</span>! 
              Ready to showcase your achievements and track your progress?
            </p>
            
            {/* Progress indicator */}
            <div className="flex flex-col sm:flex-row items-center justify-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">✓</div>
                <div className="ml-2 text-xs sm:text-sm text-gray-600">Choose Role</div>
              </div>
              <div className="w-0.5 h-8 sm:w-8 sm:h-0.5 bg-green-500 sm:block hidden"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">✓</div>
                <div className="ml-2 text-xs sm:text-sm text-gray-600">Setup Profile</div>
              </div>
              <div className="w-0.5 h-8 sm:w-8 sm:h-0.5 bg-green-500 sm:block hidden"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#007367] rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">3</div>
                <div className="ml-2 text-xs sm:text-sm text-gray-600">Start Journey</div>
              </div>
            </div>
          </div>
          
          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden touch-manipulation">
              <div className="absolute inset-0 bg-gradient-to-br from-[#007367]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">📝</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#2c2c2c] group-hover:text-[#007367] transition-colors duration-300">
                  ✨ New Submission
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {userProfile.type === 'student' 
                    ? 'Submit your latest achievements and activities for March-May 2025 reporting period'
                    : 'Document your professional activities including guest lectures, reviews, and research projects'
                  }
                </p>
                <Link 
                  href={userProfile.type === 'student' ? '/achievement-form' : '/faculty-form'}
                  className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-[#007367] to-[#008A7B] text-white px-6 py-3 rounded-xl font-semibold hover:from-[#005a52] hover:to-[#006B60] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[48px] flex items-center justify-center touch-manipulation"
                >
                  🚀 Create New Form
                </Link>
              </div>
            </div>
            
            <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden touch-manipulation">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-4xl sm:text-5xl mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">📊</div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-[#2c2c2c] group-hover:text-blue-600 transition-colors duration-300">
                  📈 View Responses
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  Browse and explore all submitted responses from the portal. Filter by categories, 
                  departments, and achievement levels to discover inspiring success stories.
                </p>
                <Link href="/responses" className="inline-block w-full sm:w-auto text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 min-h-[48px] flex items-center justify-center touch-manipulation">
                  📋 View All Responses
                </Link>
              </div>
            </div>
            
            <div className="group bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 border border-gray-100 hover:border-[#007367]/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👤</div>
                <h3 className="text-2xl font-bold mb-4 text-[#2c2c2c] group-hover:text-purple-600 transition-colors duration-300">
                  ⚙️ Manage Profile
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  View and update your profile information, preferences, and account settings. 
                  Keep your details current for accurate reporting.
                </p>
                <Link href="/profile" className="inline-block bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  🔧 Manage Profile
                </Link>
              </div>
            </div>
          </div>
          
          {/* Profile Summary Card */}
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50">
            <div className="flex items-center mb-6">
              <div className="text-3xl mr-4">📋</div>
              <h3 className="text-2xl font-bold text-[#2c2c2c]">Your Profile Summary</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-[#007367]/10 to-transparent p-6 rounded-xl border border-[#007367]/20">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🎯</span>
                  <span className="font-semibold text-gray-700">Account Type</span>
                </div>
                <p className="text-lg font-bold text-[#007367]">
                  {userProfile.type === 'student' ? '🎓 Student' : '👨‍🏫 Faculty Member'}
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent p-6 rounded-xl border border-blue-500/20">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">🏢</span>
                  <span className="font-semibold text-gray-700">Branch/Department</span>
                </div>
                <p className="text-lg font-bold text-blue-600">{userProfile.branch}</p>
              </div>
              
              {userProfile.type === 'student' && userProfile.rollNo && (
                <>
                  <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-xl border border-green-500/20">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">🆔</span>
                      <span className="font-semibold text-gray-700">Roll Number</span>
                    </div>
                    <p className="text-lg font-bold text-green-600">{userProfile.rollNo}</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-6 rounded-xl border border-orange-500/20">
                    <div className="flex items-center mb-2">
                      <span className="text-lg mr-2">📚</span>
                      <span className="font-semibold text-gray-700">Year of Study</span>
                    </div>
                    <p className="text-lg font-bold text-orange-600">{userProfile.yearOfStudy} Year</p>
                  </div>
                </>
              )}
              
              {userProfile.type === 'faculty' && (
                <>
                  {userProfile.employeeId && (
                    <div className="bg-gradient-to-br from-green-500/10 to-transparent p-6 rounded-xl border border-green-500/20">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🆔</span>
                        <span className="font-semibold text-gray-700">Employee ID</span>
                      </div>
                      <p className="text-lg font-bold text-green-600">{userProfile.employeeId}</p>
                    </div>
                  )}
                  {userProfile.department && (
                    <div className="bg-gradient-to-br from-orange-500/10 to-transparent p-6 rounded-xl border border-orange-500/20">
                      <div className="flex items-center mb-2">
                        <span className="text-lg mr-2">🏛️</span>
                        <span className="font-semibold text-gray-700">Department</span>
                      </div>
                      <p className="text-lg font-bold text-orange-600">{userProfile.department}</p>
                    </div>
                  )}
                </>
              )}
            </div>
            
            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="p-4">
                  <div className="text-2xl font-bold text-[#007367]">0</div>
                  <div className="text-sm text-gray-600">Forms Submitted</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-gray-600">Pending Reviews</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-green-600">0</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
                <div className="p-4">
                  <div className="text-2xl font-bold text-purple-600">0</div>
                  <div className="text-sm text-gray-600">Total Points</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}