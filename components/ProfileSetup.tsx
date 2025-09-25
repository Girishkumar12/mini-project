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
    <section className="section">
      <div className="container">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">
            Complete Your {userType === 'student' ? 'Student' : 'Faculty'} Profile
          </h2>
          
          <form onSubmit={handleSubmit}>
            {userType === 'student' ? (
              <>
                <div className="form-group">
                  <label htmlFor="rollNo">Roll Number *</label>
                  <input
                    type="text"
                    id="rollNo"
                    value={formData.rollNo}
                    onChange={(e) => setFormData({...formData, rollNo: e.target.value})}
                    placeholder="e.g., CS21B1001"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="yearOfStudy">Year of Study *</label>
                  <select
                    id="yearOfStudy"
                    value={formData.yearOfStudy}
                    onChange={(e) => setFormData({...formData, yearOfStudy: e.target.value})}
                    required
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="employeeId">Employee ID *</label>
                  <input
                    type="text"
                    id="employeeId"
                    value={formData.employeeId}
                    onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                    placeholder="Employee ID"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <input
                    type="text"
                    id="department"
                    value={formData.department}
                    onChange={(e) => setFormData({...formData, department: e.target.value})}
                    placeholder="e.g., Computer Science and Engineering"
                    required
                  />
                </div>
              </>
            )}
            
            <div className="form-group">
              <label htmlFor="branch">Branch *</label>
              <select
                id="branch"
                value={formData.branch}
                onChange={(e) => setFormData({...formData, branch: e.target.value})}
                required
              >
                <option value="">Select Branch</option>
                {BRANCHES.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-lg px-8 py-3"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating Profile...
                  </span>
                ) : (
                  'Create Profile'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}