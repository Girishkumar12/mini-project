'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile, BRANCHES } from '@/types';

interface ProfileSetupProps {
  userType: 'student' | 'faculty';
  onComplete: () => void;
}

export default function ProfileSetup({ userType, onComplete }: ProfileSetupProps) {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    rollNo: '',
    yearOfStudy: '',
    branch: '',
    employeeId: '',
    department: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsSubmitting(true);
    try {
      const profile: UserProfile = {
        userId: user.id,
        type: userType,
        branch: formData.branch,
        createdAt: new Date().toISOString(),
        ...(userType === 'student' && {
          rollNo: formData.rollNo,
          yearOfStudy: formData.yearOfStudy
        }),
        ...(userType === 'faculty' && {
          employeeId: formData.employeeId,
          department: formData.department
        })
      };

      await updateUserProfile(profile);
      onComplete();
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Error creating profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50/30 flex items-center justify-center relative overflow-hidden py-12">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-[#007367] rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-[#007367] to-[#2c2c2c] bg-clip-text text-transparent">
              🛠️ Complete Your Profile
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Just a few more details to personalize your{' '}
              <span className="font-semibold text-[#007367]">
                {userType === 'student' ? 'Student' : 'Faculty'}
              </span>{' '}
              experience and get you started!
            </p>
            
            {/* Progress indicator */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                <div className="ml-2 text-sm text-gray-600">Choose Role</div>
              </div>
              <div className="w-8 h-0.5 bg-green-500"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#007367] rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                <div className="ml-2 text-sm text-gray-600">Setup Profile</div>
              </div>
              <div className="w-8 h-0.5 bg-gray-300"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-bold">3</div>
                <div className="ml-2 text-sm text-gray-500">Start Journey</div>
              </div>
            </div>
          </div>
          
          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl border border-gray-200/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              {userType === 'student' ? (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="rollNo" className="block text-sm font-semibold text-gray-700">
                        🎓 Roll Number *
                      </label>
                      <input
                        type="text"
                        id="rollNo"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                        placeholder="e.g., CS21B1001"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium placeholder-gray-400 focus:outline-none focus:border-[#007367] focus:ring-2 focus:ring-[#007367]/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="yearOfStudy" className="block text-sm font-semibold text-gray-700">
                        📚 Year of Study *
                      </label>
                      <select
                        id="yearOfStudy"
                        value={formData.yearOfStudy}
                        onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium focus:outline-none focus:border-[#007367] focus:ring-2 focus:ring-[#007367]/20 transition-all duration-300"
                      >
                        <option value="">Select Your Year</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700">
                        🆔 Employee ID *
                      </label>
                      <input
                        type="text"
                        id="employeeId"
                        value={formData.employeeId}
                        onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                        placeholder="Enter your Employee ID"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium placeholder-gray-400 focus:outline-none focus:border-[#007367] focus:ring-2 focus:ring-[#007367]/20 transition-all duration-300"
                      />
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="department" className="block text-sm font-semibold text-gray-700">
                        🏢 Department *
                      </label>
                      <input
                        type="text"
                        id="department"
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        placeholder="e.g., Computer Science and Engineering"
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium placeholder-gray-400 focus:outline-none focus:border-[#007367] focus:ring-2 focus:ring-[#007367]/20 transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}
              
              {/* Branch Selection - Common for both */}
              <div className="space-y-3">
                <label htmlFor="branch" className="block text-sm font-semibold text-gray-700">
                  🎯 Branch/Program *
                </label>
                <select
                  id="branch"
                  value={formData.branch}
                  onChange={(e) => setFormData({...formData, branch: e.target.value})}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg font-medium focus:outline-none focus:border-[#007367] focus:ring-2 focus:ring-[#007367]/20 transition-all duration-300"
                >
                  <option value="">Select Your Branch/Program</option>
                  {BRANCHES.map(branch => (
                    <option key={branch} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>
              
              {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-semibold text-blue-800 mb-1">Quick Setup Tip</h3>
                    <p className="text-sm text-blue-600">
                      Make sure all information is accurate as this will be used for your forms and reports. 
                      You can update some details later from your profile settings.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group bg-gradient-to-r from-[#007367] to-[#008A7B] text-white px-12 py-4 rounded-xl font-bold text-lg hover:from-[#005a52] hover:to-[#006B60] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  {isSubmitting ? (
                    <span className="flex items-center justify-center relative z-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      🔄 Creating Your Profile...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center relative z-10">
                      🚀 Complete Profile Setup
                    </span>
                  )}
                </button>
                
                <p className="text-sm text-gray-500 mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy
                </p>
              </div>
            </form>
          </div>
          
          {/* Additional Help */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Need help? Contact support at{' '}
              <a href="mailto:support@gitam.edu" className="text-[#007367] hover:underline font-medium">
                support@gitam.edu
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}