'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FacultyActivity, FACULTY_ACTIVITY_TYPES, FACULTY_ACTIVITY_LEVELS } from '@/types';
import Header from '@/components/Header';

export default function FacultyForm() {
  const { user, userProfile } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    activityType: '',
    activityName: '',
    level: '',
    activityDate: '',
    venue: '',
    organizer: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile || typeof window === 'undefined' || !db) return;

    setIsSubmitting(true);
    try {
      const activity: Omit<FacultyActivity, 'id'> = {
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        userPhoto: user.imageUrl,
        type: 'faculty_activity',
        submittedAt: new Date().toISOString(),
        userProfile,
        data: formData
      };

      await addDoc(collection(db, 'faculty_activities'), activity);
      alert('Faculty activity submitted successfully!');
      router.push('/');
    } catch (error) {
      console.error('Error submitting activity:', error);
      alert('Error submitting activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user || !userProfile || userProfile.type !== 'faculty') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container py-8">
          <div className="text-center">
            <p>Access denied. Faculty profile required.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Faculty Activity Form</h2>
          <p className="text-gray-600 mb-6">Submit your professional activities</p>
          
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="form-group">
                <label htmlFor="activityType">Activity Type *</label>
                <select
                  id="activityType"
                  value={formData.activityType}
                  onChange={(e) => setFormData({...formData, activityType: e.target.value})}
                  required
                >
                  <option value="">Select Activity Type</option>
                  {FACULTY_ACTIVITY_TYPES.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="activityName">Activity Name *</label>
                <input
                  type="text"
                  id="activityName"
                  value={formData.activityName}
                  onChange={(e) => setFormData({...formData, activityName: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="level">Level *</label>
                <select
                  id="level"
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  required
                >
                  <option value="">Select Level</option>
                  {FACULTY_ACTIVITY_LEVELS.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="activityDate">Activity Date *</label>
                <input
                  type="date"
                  id="activityDate"
                  value={formData.activityDate}
                  onChange={(e) => setFormData({...formData, activityDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="venue">Venue *</label>
                <input
                  type="text"
                  id="venue"
                  value={formData.venue}
                  onChange={(e) => setFormData({...formData, venue: e.target.value})}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="organizer">Organizer *</label>
                <input
                  type="text"
                  id="organizer"
                  value={formData.organizer}
                  onChange={(e) => setFormData({...formData, organizer: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Activity Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe your activity in detail..."
                required
              />
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary text-lg px-8 py-3 mr-4"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </span>
                ) : (
                  'Submit Activity'
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push('/')}
                className="btn btn-secondary text-lg px-8 py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}